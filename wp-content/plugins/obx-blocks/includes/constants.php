<?php
/**
 * Plugin Constants
 *
 * @package OBX_Blocks
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin paths
define('OBX_BLOCKS_PATH', plugin_dir_path(__DIR__));
define('OBX_BLOCKS_INCLUDES_PATH', OBX_BLOCKS_PATH . 'includes/');
define('OBX_BLOCKS_SRC_PATH', OBX_BLOCKS_PATH . 'src/'); 