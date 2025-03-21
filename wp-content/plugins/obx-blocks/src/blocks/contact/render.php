<?php
/**
 * Server-side rendering of the Contact block
 *
 * @package OBX_Blocks
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

// Include plugin constants and utilities
require_once plugin_dir_path(dirname(dirname(dirname(__FILE__)))) . 'includes/constants.php';
require_once OBX_BLOCKS_INCLUDES_PATH . 'icons.php';

// Extract attributes with defaults
$tagline = $attributes['tagline'] ?? '';
$heading = $attributes['heading'] ?? '';
$intro_text = $attributes['introText'] ?? '';
$contact_info = $attributes['contactInfo'] ?? [];
$form_shortcode = $attributes['formShortcode'] ?? '';
$align = !empty($attributes['align']) ? $attributes['align'] : 'full';
$background_color = !empty($attributes['backgroundColor']) ? $attributes['backgroundColor'] : '#ffffff';
$text_color = !empty($attributes['textColor']) ? $attributes['textColor'] : '';
$accent_color = !empty($attributes['accentColor']) ? $attributes['accentColor'] : '#a7d1fb';
$text_align = !empty($attributes['textAlign']) ? $attributes['textAlign'] : 'center';
$anchor = !empty($attributes['anchor']) ? $attributes['anchor'] : '';

// Build the class names
$class_names = 'obx-contact';
if (!empty($align)) {
    $class_names .= ' align' . $align;
}

// Build the inline styles
$block_style = '';
if (!empty($background_color)) {
    $block_style .= "background-color: {$background_color};";
}
if (!empty($text_color)) {
    $block_style .= "color: {$text_color};";
}

// Output the HTML
?>
<div class="<?php echo esc_attr($class_names); ?>"
    <?php echo !empty($anchor) ? ' id="' . esc_attr($anchor) . '"' : ''; ?>
    <?php echo !empty($block_style) ? ' style="' . esc_attr($block_style) . '"' : ''; ?>>
    <div class="obx-contact__container">
        <div class="obx-contact__header" style="text-align: <?php echo esc_attr($text_align); ?>">
            <?php if (!empty($tagline)) : ?>
                <div class="obx-contact__tagline"><?php echo wp_kses_post($tagline); ?></div>
            <?php endif; ?>
            
            <?php if (!empty($heading)) : ?>
                <h2 class="obx-contact__heading" style="background-image: linear-gradient(transparent 60%, <?php echo esc_attr($accent_color); ?> 60%);">
                    <?php echo wp_kses_post($heading); ?>
                </h2>
            <?php endif; ?>
            
            <?php if (!empty($intro_text)) : ?>
                <div class="obx-contact__intro"><?php echo wp_kses_post($intro_text); ?></div>
            <?php endif; ?>
        </div>
        
        <div class="obx-contact__content">
            <?php if (!empty($contact_info)) : ?>
                <div class="obx-contact__info">
                    <?php foreach ($contact_info as $info) : ?>
                        <div class="obx-contact__info-item">
                            <div class="obx-contact__info-icon">
                                <?php echo obx_get_icon_svg($info['icon']); ?>
                            </div>
                            <div class="obx-contact__info-content">
                                <h3 class="obx-contact__info-title"><?php echo wp_kses_post($info['title']); ?></h3>
                                <div class="obx-contact__info-text"><?php echo wp_kses_post($info['text']); ?></div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
            
            <?php if (!empty($form_shortcode)) : ?>
                <div class="obx-contact__form">
                    <?php echo do_shortcode($form_shortcode); ?>
                </div>
            <?php endif; ?>
        </div>
    </div>
</div> 