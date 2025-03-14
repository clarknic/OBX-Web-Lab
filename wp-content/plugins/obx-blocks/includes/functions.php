<?php
/**
 * Global functions for OBX Blocks plugin
 *
 * @package OBX_Blocks
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Render a service icon based on the provided service data
 *
 * @param array $service The service data containing iconImage
 * @return string HTML markup for the icon
 */
function obx_render_service_icon($service) {
    if (!empty($service['iconImage']) && !empty($service['iconImage']['url'])) {
        $url = esc_url($service['iconImage']['url']);
        $alt = !empty($service['title']) ? esc_attr(strip_tags($service['title'])) : esc_attr__('Service icon', 'obx-blocks');
        // Check if it's an SVG
        $is_svg = pathinfo($url, PATHINFO_EXTENSION) === 'svg';
        
        if ($is_svg) {
            // For SVGs, use as background image with data URI
            $svg_content = wp_remote_get($url);
            if (!is_wp_error($svg_content) && !empty($svg_content['body'])) {
                // Generate a unique ID for this SVG
                $svg_id = 'svg-' . md5($url);
                
                // Add the SVG as a background image via inline style
                $style = sprintf(
                    '<style>.%s{background-image: url("data:image/svg+xml,%s");}</style>',
                    $svg_id,
                    rawurlencode($svg_content['body'])
                );
                
                // Return a div with the SVG as background
                return $style . sprintf(
                    '<div class="obx-services__item-icon-svg %s" aria-label="%s"></div>',
                    $svg_id,
                    $alt
                );
            }
        }
        
        // Fallback to regular image
        return sprintf('<img src="%s" alt="%s" class="obx-services__item-icon-img" />', $url, $alt);
    }
    
    // Default placeholder if no icon
    return '';
} 