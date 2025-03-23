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


/**
 * Process contact form submission
 */
function obx_process_contact_form() {
    check_ajax_referer('obx_contact_nonce', 'nonce');

    $response = array(
        'success' => false,
        'message' => '',
    );

    $name = sanitize_text_field($_POST['name']);
    $email = sanitize_email($_POST['email']);
    $message = sanitize_textarea_field($_POST['message']);
    $receivers = sanitize_text_field($_POST['receivers']);
    $messageTitle = sanitize_text_field($_POST['messageTitle']);

    if (empty($name) || empty($email) || empty($message)) {
        $response['message'] = __('Please fill in all required fields.', 'obx-blocks');
        wp_send_json($response);
    }

    if (!is_email($email)) {
        $response['message'] = __('Please enter a valid email address.', 'obx-blocks');
        wp_send_json($response);
    }

    $to = !empty($receivers) ? array_map('trim', explode(',', $receivers)) : get_option('admin_email');
    $subject = !empty($messageTitle) ? $messageTitle : __('New Contact Form Submission', 'obx-blocks');
    
    $body = sprintf(
        "Name: %s\nEmail: %s\n\nMessage:\n%s",
        $name,
        $email,
        $message
    );
    
    $headers = array(
        'Content-Type: text/plain; charset=UTF-8',
        'From: ' . $name . ' <' . $email . '>',
        'Reply-To: ' . $email,
    );

    $sent = wp_mail($to, $subject, $body, $headers);

    if ($sent) {
        $response['success'] = true;
        $response['message'] = __('Thank you! Your message has been sent successfully.', 'obx-blocks');
    } else {
        $response['message'] = __('Sorry, there was an error sending your message. Please try again.', 'obx-blocks');
    }

    wp_send_json($response);
}
add_action('wp_ajax_obx_contact_form', 'obx_process_contact_form');
add_action('wp_ajax_nopriv_obx_contact_form', 'obx_process_contact_form');