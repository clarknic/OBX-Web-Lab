<?php
/**
 * SVG Support Functions
 * 
 * @package OBX_Theme
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Enable SVG support
 */
function obx_enable_svg_upload($mimes) {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'obx_enable_svg_upload');

/**
 * Fix SVG display in Media Library
 */
function obx_fix_svg_display($response, $attachment, $meta) {
    if ($response['mime'] === 'image/svg+xml') {
        $response['sizes'] = array(
            'full' => array(
                'url' => $response['url'],
                'width' => $meta['width'],
                'height' => $meta['height'],
                'orientation' => $meta['width'] > $meta['height'] ? 'landscape' : 'portrait'
            )
        );
    }
    return $response;
}
add_filter('wp_prepare_attachment_for_js', 'obx_fix_svg_display', 10, 3);

/**
 * Fix SVG dimensions
 */
function obx_fix_svg_dimensions($data, $file, $filename, $mimes) {
    if (isset($data['ext']) && $data['ext'] === 'svg') {
        if (isset($data['type']) && $data['type'] === 'image/svg+xml') {
            $svg_file_data = file_get_contents($file);
            $xml = simplexml_load_string($svg_file_data);
            
            if ($xml) {
                $attributes = $xml->attributes();
                if (isset($attributes->width) && isset($attributes->height)) {
                    $data['width'] = intval($attributes->width);
                    $data['height'] = intval($attributes->height);
                } else if (isset($attributes->viewBox)) {
                    $viewbox = explode(' ', $attributes->viewBox);
                    if (count($viewbox) === 4) {
                        $data['width'] = intval($viewbox[2]);
                        $data['height'] = intval($viewbox[3]);
                    }
                }
            }
        }
    }
    return $data;
}
add_filter('wp_check_filetype_and_ext', 'obx_fix_svg_dimensions', 10, 4);

/**
 * Add SVG CSS for admin
 */
function obx_add_svg_styles() {
    echo '<style>
        .attachment-266x266, .thumbnail img {
            width: 100% !important;
            height: auto !important;
        }
    </style>';
}
add_action('admin_head', 'obx_add_svg_styles'); 