const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');
const fs = require('fs');

// Automatically detect all blocks in the src/blocks directory
const getBlockEntries = () => {
    const entries = {};
    const blocksDir = path.resolve(__dirname, 'src/blocks');
    
    // Check if blocks directory exists
    if (fs.existsSync(blocksDir)) {
        // Get all subdirectories (each should be a block)
        const blockFolders = fs.readdirSync(blocksDir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);
        
        // Add each block's index.js to entries
        blockFolders.forEach(blockName => {
            const indexFile = path.resolve(blocksDir, blockName, 'index.js');
            if (fs.existsSync(indexFile)) {
                entries[`blocks/${blockName}/index`] = `./src/blocks/${blockName}/index.js`;
            }
        });
    }
    
    return entries;
};

// Get all block entries
const blockEntries = getBlockEntries();

// Add CSS entries
const cssEntries = {
    'css/editor': './src/css/editor.scss',
    'css/style': './src/css/style.scss',
};

// Combine all entries
const entries = {
    ...blockEntries,
    ...cssEntries,
};

const BLOCKS = [
    'hero',
    'services',
    'technologies',
    'process',
    'portfolio',
    'about',
    'contact',
    // Add more blocks here
];

module.exports = {
    ...defaultConfig,
    entry: entries,
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
    },
}; 