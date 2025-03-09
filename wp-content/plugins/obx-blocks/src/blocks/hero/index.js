/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Edit from './edit';
import './style.scss';

/**
 * Register the block
 */
registerBlockType('obx-blocks/hero', {
    /**
     * @see ./edit.js
     */
    edit: Edit,
    
    /**
     * We're using server-side rendering via render.php
     * so we return null here
     */
    save: () => null,
}); 