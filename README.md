# OBX Web Lab - WordPress Docker

A simple, powerful Docker setup for WordPress development.

## Features

- Quick WordPress setup with a single command
- MariaDB, phpMyAdmin, and WP-CLI included
- Automatic port management and domain configuration
- Database persistence between restarts
- Easy domain migration with search-replace

## Requirements

- Docker and Docker Compose
- Bash shell (Mac/Linux, or WSL on Windows)

## Quick Start

```bash
# Basic usage (creates myproject.loc site)
./launch.sh myproject

# With custom domain
./launch.sh myproject -d example.com

# With specific ports
./launch.sh myproject -wp 8081 -pma 8181

# Start fresh (new database)
./launch.sh myproject -f
```

After launching, follow the instructions to add the domain to your hosts file.

## Command Options

```
Usage: ./launch.sh <project-name> [options]

Options:
  -d, --domain <domain>      Domain name (default: <project-name>.loc)
  -wp, --wp-port <port>      WordPress port (default: 80)
  -pma, --pma-port <port>    phpMyAdmin port (default: 8080)
  -f, --fresh                Start with a fresh database (removes existing data)
  -h, --help                 Show this help message
```

## Host File Setup

### macOS / Linux
```bash
sudo nano /etc/hosts
```
Add: `127.0.0.1 myproject.loc`

### Windows
1. Edit as Administrator: `C:\Windows\System32\drivers\etc\hosts`
2. Add: `127.0.0.1 myproject.loc`

## Using WP-CLI

Each project includes a CLI container for WordPress management:

```bash
# List plugins
docker exec -it myproject-cli wp plugin list

# Search and replace domain for migration
docker exec -it myproject-cli wp search-replace 'olddomain.com' 'myproject.loc'

# Export database
docker exec -it myproject-cli wp db export

# Interactive shell
docker exec -it myproject-cli bash
```

## Database Details

- Host: `db`
- Database: Same as project name
- User: `admin`
- Password: `password`
- Root Password: `password`

## Container Structure

- `<project-name>-wordpress`: WordPress web server (PHP 8.2)
- `<project-name>-db`: MariaDB database (10.5.8)
- `<project-name>-phpmyadmin`: phpMyAdmin (latest)
- `<project-name>-cli`: WP-CLI (PHP 8.2)

## Automatic Port & URL Handling

The launch script:
- Tracks previous port usage to detect changes
- Automatically updates database URLs when ports change
- Automatically finds available ports if requested ports are busy
- Handles both HTTP and HTTPS URL updates
- Intelligently detects already running containers to avoid unnecessary restarts

## Project Data

All project data is stored in Docker volumes for persistence:
- Database: `<project-name>_db_data` volume
- Files: Mounted from the current directory

## License

MIT 