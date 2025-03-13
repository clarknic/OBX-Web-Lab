<?php
/**
 * Server-side rendering of the Contact Us block
 *
 * @package OBX_Blocks
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

// Extract attributes with defaults
$tagline = $attributes['tagline'] ?? '';
$heading = $attributes['heading'] ?? '';
$intro_text = $attributes['introText'] ?? '';
$contact_info = $attributes['contactInfo'] ?? [];
$form_shortcode = $attributes['formShortcode'] ?? '';
$align = !empty($attributes['align']) ? $attributes['align'] : 'full';
$text_align = !empty($attributes['textAlign']) ? $attributes['textAlign'] : 'center';
$background_color = !empty($attributes['backgroundColor']) ? $attributes['backgroundColor'] : '#ffffff';
$text_color = !empty($attributes['textColor']) ? $attributes['textColor'] : '';
$accent_color = !empty($attributes['accentColor']) ? $attributes['accentColor'] : '#a7d1fb';
$content_width = !empty($attributes['contentWidth']) ? $attributes['contentWidth'] : 80;

// Build the class names
$class_names = 'obx-contact';
if (!empty($align)) {
    $class_names .= ' align' . $align;
}
$class_names .= ' text-' . $text_align;

// Build the inline styles
$block_style = '';
if (!empty($background_color)) {
    $block_style .= "background-color: {$background_color};";
}
if (!empty($text_color)) {
    $block_style .= "color: {$text_color};";
}

// Heading style with accent color
$heading_style = '';
if (!empty($accent_color)) {
    $heading_style = "background-image: linear-gradient(transparent 60%, {$accent_color} 60%);";
}

// Container style with content width
$container_style = "max-width: {$content_width}%;";

// Helper function to get the icon SVG
function obx_contact_get_icon_svg($type) {
    switch ($type) {
        case 'phone':
            return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M16.18 21.3a15.54 15.54 0 0 1-6.17-3.32 15.54 15.54 0 0 1-3.32-6.17 4.42 4.42 0 0 1 1.37-4.08l.71-.7a2.67 2.67 0 0 1 3.77 0l.71.71a2.67 2.67 0 0 1 0 3.77l-.35.36a13.11 13.11 0 0 0 2.54 2.54l.36-.35a2.67 2.67 0 0 1 3.77 0l.71.71a2.67 2.67 0 0 1 0 3.77l-.7.71a4.42 4.42 0 0 1-4.08 1.37z" fill="currentColor"/></svg>';
        case 'email':
            return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm17 4.238l-7.928 7.1L4 7.216V19h16V7.238zM4.511 5l7.55 6.662L19.502 5H4.511z" fill="currentColor"/></svg>';
        case 'address':
            return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M12 20.9l4.95-4.95a7 7 0 1 0-9.9 0L12 20.9zm0 2.828l-6.364-6.364a9 9 0 1 1 12.728 0L12 23.728zM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 2a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" fill="currentColor"/></svg>';
        case 'website':
            return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-2.29-2.333A17.9 17.9 0 0 1 8.027 13H4.062a8.008 8.008 0 0 0 5.648 6.667zM10.03 13c.151 2.439.848 4.73 1.97 6.752A15.905 15.905 0 0 0 13.97 13h-3.94zm9.908 0h-3.965a17.9 17.9 0 0 1-1.683 6.667A8.008 8.008 0 0 0 19.938 13zM4.062 11h3.965A17.9 17.9 0 0 1 9.71 4.333 8.008 8.008 0 0 0 4.062 11zm5.969 0h3.938A15.905 15.905 0 0 0 12 4.248 15.905 15.905 0 0 0 10.03 11zm4.259-6.667A17.9 17.9 0 0 1 15.973 11h3.965a8.008 8.008 0 0 0-5.648-6.667z" fill="currentColor"/></svg>';
        default:
            return '';
    }
}

// Output the HTML
?>
<div class="<?php echo esc_attr($class_names); ?>" <?php echo !empty($block_style) ? 'style="' . esc_attr($block_style) . '"' : ''; ?>>
    <div class="obx-contact__container" style="<?php echo esc_attr($container_style); ?>">
        <div class="obx-contact__header" style="text-align: <?php echo esc_attr($text_align); ?>">
            <?php if (!empty($tagline)) : ?>
                <div class="obx-contact__tagline"><?php echo wp_kses_post($tagline); ?></div>
            <?php endif; ?>
            
            <?php if (!empty($heading)) : ?>
                <h2 class="obx-contact__heading" <?php echo !empty($heading_style) ? 'style="' . esc_attr($heading_style) . '"' : ''; ?>>
                    <?php echo wp_kses_post($heading); ?>
                </h2>
            <?php endif; ?>
            
            <?php if (!empty($intro_text)) : ?>
                <div class="obx-contact__intro-text"><?php echo wp_kses_post($intro_text); ?></div>
            <?php endif; ?>
        </div>
        
        <div class="obx-contact__content">
            <?php if (!empty($contact_info)) : ?>
                <div class="obx-contact__info">
                    <h3 class="obx-contact__info-heading" style="text-align: <?php echo esc_attr($text_align); ?>"><?php echo esc_html__('Contact Information', 'obx-blocks'); ?></h3>
                    
                    <div class="obx-contact__info-items">
                        <?php foreach ($contact_info as $item) : ?>
                            <div class="obx-contact__info-item">
                                <div class="obx-contact__info-icon" style="color: <?php echo esc_attr($accent_color); ?>">
                                    <?php echo obx_contact_get_icon_svg($item['type']); ?>
                                </div>
                                <div class="obx-contact__info-content">
                                    <?php if (!empty($item['label'])) : ?>
                                        <div class="obx-contact__info-label"><?php echo wp_kses_post($item['label']); ?></div>
                                    <?php endif; ?>
                                    
                                    <?php if (!empty($item['value'])) : ?>
                                        <?php if (!empty($item['link'])) : ?>
                                            <a href="<?php echo esc_url($item['link']); ?>" class="obx-contact__info-value" <?php echo $item['type'] === 'address' ? 'target="_blank" rel="noopener noreferrer"' : ''; ?>>
                                                <?php echo wp_kses_post($item['value']); ?>
                                            </a>
                                        <?php else : ?>
                                            <div class="obx-contact__info-value"><?php echo wp_kses_post($item['value']); ?></div>
                                        <?php endif; ?>
                                    <?php endif; ?>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            <?php endif; ?>
            
            <?php if (!empty($form_shortcode)) : ?>
                <div class="obx-contact__form">
                    <h3 class="obx-contact__form-heading" style="text-align: <?php echo esc_attr($text_align); ?>"><?php echo esc_html__('Send Us a Message', 'obx-blocks'); ?></h3>
                    <div class="obx-contact__form-container">
                        <?php echo do_shortcode($form_shortcode); ?>
                    </div>
                </div>
            <?php endif; ?>
        </div>
    </div>
</div> 