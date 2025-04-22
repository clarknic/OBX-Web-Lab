#!/bin/bash

# Display usage information
show_usage() {
  echo "WordPress Docker Launcher"
  echo ""
  echo "Usage: ./launch.sh <project-name> [options]"
  echo ""
  echo "Options:"
  echo "  -d, --domain <domain>      Domain name (default: <project-name>.loc)"
  echo "  -wp, --wp-port <port>      WordPress port (default: 80)"
  echo "  -pma, --pma-port <port>    phpMyAdmin port (default: 8080)"
  echo "  -f, --fresh                Start with a fresh database (removes existing data)"
  echo "  -h, --help                 Show this help message"
  echo ""
  echo "Examples:"
  echo "  ./launch.sh myproject                          # Basic setup with defaults"
  echo "  ./launch.sh myproject -wp 8081 -pma 8181       # Custom ports"
  echo "  ./launch.sh myproject -d example.com -f        # Custom domain, fresh install"
  exit 1
}

# Check for project name
if [ -z "$1" ] || [[ "$1" == -* ]]; then
  show_usage
fi

# Parse arguments
PROJECT_NAME=$1
shift

DOMAIN="${PROJECT_NAME}.loc"
WP_PORT=80
PMA_PORT=8080
FRESH=false

while (( "$#" )); do
  case "$1" in
    -d|--domain)
      DOMAIN="$2"
      shift 2
      ;;
    -wp|--wp-port)
      WP_PORT="$2"
      shift 2
      ;;
    -pma|--pma-port)
      PMA_PORT="$2"
      shift 2
      ;;
    -f|--fresh)
      FRESH=true
      shift
      ;;
    -h|--help)
      show_usage
      ;;
    *)
      echo "Error: Unknown option: $1"
      show_usage
      ;;
  esac
done

# Data directory for port tracking
mkdir -p .data 2>/dev/null
PREVIOUS_PORT_FILE=".data/${PROJECT_NAME}_wp_port.txt"

# Get previous port if available
PREVIOUS_PORT=0
if [ -f "$PREVIOUS_PORT_FILE" ]; then
  PREVIOUS_PORT=$(cat "$PREVIOUS_PORT_FILE")
  echo "Previous WordPress port was: $PREVIOUS_PORT"
fi

# Check if ports are available and find next available if busy
check_port() {
  local port=$1
  local port_type=$2
  local max_attempts=10
  local attempts=0
  
  while nc -z localhost $port 2>/dev/null; do
    attempts=$((attempts+1))
    echo "Port $port is already in use for $port_type, trying port $((port+1))..." >&2
    port=$((port+1))
    
    if [ $attempts -ge $max_attempts ]; then
      echo "Error: Could not find an available port after $max_attempts attempts." >&2
      exit 1
    fi
  done
  
  # Return the available port - ONLY the number
  echo "$port"
}

WP_PORT=$(check_port $WP_PORT "WordPress")
PMA_PORT=$(check_port $PMA_PORT "phpMyAdmin")

echo "Starting WordPress project: $PROJECT_NAME"
echo "  Domain: $DOMAIN"
echo "  WordPress port: $WP_PORT"
echo "  phpMyAdmin port: $PMA_PORT"

# Determine site URL
if [ "$WP_PORT" -eq 80 ]; then
  SITE_URL="http://$DOMAIN"
else
  SITE_URL="http://$DOMAIN:$WP_PORT"
fi

# Save current port for future reference
echo "$WP_PORT" > "$PREVIOUS_PORT_FILE"

# Check if containers are already running
check_containers_running() {
  local project=$1
  local count=$(docker ps --filter "name=${project}-" --format '{{.Names}}' | wc -l)
  if [ $count -gt 0 ]; then
    return 0  # true in bash
  else
    return 1  # false in bash
  fi
}

# First, check if containers are already running
if check_containers_running "$PROJECT_NAME" && [ "$FRESH" != true ]; then
  echo "Project containers are already running!"
  
  # Check if we need to restart due to port changes
  if [ "$PREVIOUS_PORT" -ne 0 ] && [ "$PREVIOUS_PORT" -ne "$WP_PORT" ]; then
    echo "Port changed from $PREVIOUS_PORT to $WP_PORT, restarting containers..."
    docker-compose down
    NEEDS_RESTART=true
  else
    echo "No configuration changes detected. Containers will continue running."
    echo "Use './launch.sh $PROJECT_NAME -f' if you need to remove containers and start from scratch."
    
    echo ""
    echo "WordPress: $SITE_URL"
    echo "phpMyAdmin: http://localhost:$PMA_PORT"
    
    echo ""
    echo "Add this to your /etc/hosts file:"
    echo "127.0.0.1 $DOMAIN"
    
    echo ""
    echo "To run WP-CLI commands:"
    echo "docker exec -it ${PROJECT_NAME}-cli wp <command>"
    echo ""
    echo "Example - Search & Replace domain for migration:"
    echo "docker exec -it ${PROJECT_NAME}-cli wp search-replace 'production.domain' '$DOMAIN'"
    exit 0
  fi
elif [ "$FRESH" = true ]; then
  echo "Starting with fresh database (removing volumes)..."
  docker-compose down -v
  # If fresh, no need to check previous port
  PREVIOUS_PORT=0
  NEEDS_RESTART=true
else
  echo "Maintaining existing database..."
  docker-compose down
  NEEDS_RESTART=true
fi

# Export environment variables for docker-compose
export PROJECT_NAME=$PROJECT_NAME
export DB_NAME=$PROJECT_NAME
export DB_USER=admin
export DB_PASSWORD=password
export DB_ROOT_PASSWORD=password
export WP_PORT=$WP_PORT
export PMA_PORT=$PMA_PORT
export WORDPRESS_DEBUG=true
export WP_MEMORY_LIMIT=256M

# Start the containers only if they need to be restarted
if [ "$NEEDS_RESTART" = true ]; then
  # Start the containers
  docker-compose up -d

  echo ""
  echo "Started $PROJECT_NAME with domain $DOMAIN"

  echo "WordPress: $SITE_URL"
  echo "phpMyAdmin: http://localhost:$PMA_PORT"

  echo ""
  echo "Add this to your /etc/hosts file:"
  echo "127.0.0.1 $DOMAIN"

  # Handle port change for existing sites
  if [ "$PREVIOUS_PORT" -ne 0 ] && [ "$PREVIOUS_PORT" -ne "$WP_PORT" ] && [ "$FRESH" != true ]; then
    echo ""
    echo "Port changed from $PREVIOUS_PORT to $WP_PORT"
    echo "Waiting for WordPress to start..."
    sleep 5
    
    # Determine previous URL
    if [ "$PREVIOUS_PORT" -eq 80 ]; then
      PREVIOUS_URL="http://$DOMAIN"
    else
      PREVIOUS_URL="http://$DOMAIN:$PREVIOUS_PORT"
    fi
    
    echo "Updating database URLs from $PREVIOUS_URL to $SITE_URL..."
    docker exec -it ${PROJECT_NAME}-cli wp search-replace "$PREVIOUS_URL" "$SITE_URL" --all-tables --skip-columns=guid
    
    # Check for HTTPS URLs as well
    if [ "$PREVIOUS_PORT" -eq 80 ]; then
      PREVIOUS_HTTPS_URL="https://$DOMAIN"
    else
      PREVIOUS_HTTPS_URL="https://$DOMAIN:$PREVIOUS_PORT"
    fi
    
    echo "Checking for HTTPS URLs..."
    docker exec -it ${PROJECT_NAME}-cli wp search-replace "$PREVIOUS_HTTPS_URL" "$SITE_URL" --all-tables --skip-columns=guid
    
    echo "URL replacement completed."
  fi

  echo ""
  echo "To run WP-CLI commands:"
  echo "docker exec -it ${PROJECT_NAME}-cli wp <command>"
  echo ""
  echo "Example - Search & Replace domain for migration:"
  echo "docker exec -it ${PROJECT_NAME}-cli wp search-replace 'production.domain' '$DOMAIN'" 
fi 