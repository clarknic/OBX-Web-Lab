# OBX Web Lab Theme

A custom WordPress theme for Staged.

## Development Setup

This theme uses modern build tools to optimize styles and scripts. Follow these steps to set up your development environment:

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Navigate to the theme directory:
   ```
   cd wp-content/themes/obx-theme
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Development Workflow

#### Start Development Server

This will start a development server with hot reloading:

```
npm start
```

#### Build for Production

This will create optimized production files in the `dist` directory:

```
npm run build
```

### File Structure

```
obx-theme/
├── dist/                  # Compiled assets (generated)
├── src/                   # Source files
│   ├── js/                # JavaScript files
│   │   ├── main.js        # Main frontend script
│   │   └── admin.js       # Admin script
│   ├── scss/              # SCSS files
│   │   ├── abstracts/     # Variables, mixins, etc.
│   │   ├── base/          # Base styles
│   │   ├── components/    # UI components
│   │   ├── layout/        # Layout components
│   │   ├── pages/         # Page-specific styles
│   │   ├── utilities/     # Utility classes
│   │   ├── main.scss      # Main stylesheet
│   │   └── admin.scss     # Admin stylesheet
│   └── images/            # Images
├── functions.php          # Theme functions
├── index.php              # Main template file
├── style.css              # Theme information
├── package.json           # npm dependencies
└── webpack.config.js      # Webpack configuration
```

### Adding New Styles

1. Create or edit SCSS files in the appropriate directory under `src/scss/`
2. Import them in `src/scss/main.scss` or `src/scss/admin.scss`
3. Run `npm start` to see changes in real-time or `npm run build` to compile for production

### Adding New Scripts

1. Create or edit JavaScript files in `src/js/`
2. Import them in `src/js/main.js` or `src/js/admin.js`
3. Run `npm start` to see changes in real-time or `npm run build` to compile for production

## Linting

- To lint CSS: `npm run lint:css`
- To lint JavaScript: `npm run lint:js`

## Updating Dependencies

To update all dependencies to their latest versions:

```
npm run packages-update
``` 