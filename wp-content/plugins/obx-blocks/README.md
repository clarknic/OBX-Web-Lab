# OBX Blocks

Custom Gutenberg blocks for OBX Web Lab themes.

## Description

OBX Blocks is a collection of custom Gutenberg blocks designed specifically for OBX Web Lab themes. These blocks feature a modern glass-like design and are built to be fully responsive and customizable.

## Blocks Included

1. **Hero Section** - A full-width hero section with background image, heading, and call-to-action buttons.
2. **Feature Grid** - A grid layout for showcasing features or services.
3. **Testimonial** - A stylish testimonial block with quote, author, and optional image.

## Block Architecture

Each block follows a modular architecture:

- **index.js** - Main block registration
- **edit.js** - Editor interface component
- **render.php** - Server-side rendering
- **block.json** - Block configuration
- **style.scss** - Frontend and editor styles
- **editor.scss** - Editor-only styles

This separation of concerns makes the blocks more maintainable and allows for server-side rendering.

## Adding New Blocks

The plugin is designed for easy expansion:

1. Create a new block folder in `src/blocks/your-block-name/`
2. Add the necessary files (block.json, index.js, edit.js, render.php, style.scss, etc.)
3. Run `npm run build`

That's it! The webpack configuration automatically detects all blocks in the src/blocks directory, and the plugin automatically registers all blocks found in the build/blocks directory. No need to manually update any configuration files when adding new blocks.

## Installation

1. Upload the `obx-blocks` folder to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Use the blocks in the Gutenberg editor

## Development

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Setup

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm start` to start the development server
4. Run `npm run build` to build the production version

### File Structure

```
obx-blocks/
├── build/                  # Compiled files (generated)
├── src/                    # Source files
│   ├── blocks/             # Block definitions
│   │   ├── hero/           # Hero block
│   │   ├── feature-grid/   # Feature Grid block
│   │   └── testimonial/    # Testimonial block
│   └── css/                # Global styles
├── obx-blocks.php          # Main plugin file
├── package.json            # npm package configuration
└── webpack.config.js       # Webpack configuration
```

## Customization

Each block comes with a variety of customization options available in the block inspector panel. These include:

- Background colors and images
- Text colors and alignment
- Spacing and layout options
- Content editing

## License

GPL-2.0+ 