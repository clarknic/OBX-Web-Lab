<?php
/**
 * Server-side rendering of the Hero block
 *
 * @package OBX_Blocks
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

// WordPress passes $attributes, $content, and $block to this file

// Extract attributes with defaults
$title = $attributes['title'] ?? '';
$content_text = $attributes['content'] ?? '';
$background_image = $attributes['backgroundImage'] ?? [];
$overlay_color = $attributes['overlayColor'] ?? '';
$primary_button_text = $attributes['primaryButtonText'] ?? '';
$primary_button_url = $attributes['primaryButtonUrl'] ?? '';
$secondary_button_text = !empty($attributes['secondaryButtonText']) ? $attributes['secondaryButtonText'] : '';
$secondary_button_url = !empty($attributes['secondaryButtonUrl']) ? $attributes['secondaryButtonUrl'] : '#contact-us';
$align = !empty($attributes['align']) ? $attributes['align'] : 'full';
$text_align = !empty($attributes['textAlign']) ? $attributes['textAlign'] : 'center';
$content_width = !empty($attributes['contentWidth']) ? $attributes['contentWidth'] : 80;

// Build the class names
$class_names = 'obx-hero';
if (!empty($align)) {
    $class_names .= ' align' . $align;
}

// Build the inline styles
$background_style = '';
if (!empty($background_image['url'])) {
    $background_style = "background-image: url({$background_image['url']}); background-size: cover; background-position: center;";
}

$overlay_style = '';
if (!empty($overlay_color)) {
    $overlay_style = "background-color: {$overlay_color}; backdrop-filter: blur(4px);";
}

// Output the HTML
?>
<div class="<?php echo esc_attr($class_names); ?>">
    <?php if (!empty($background_style) || !empty($overlay_style)) : ?>
        <div class="obx-hero__background" <?php echo !empty($background_style) ? 'style="' . esc_attr($background_style) . '"' : ''; ?>>
            <?php if (!empty($overlay_style)) : ?>
                <div class="obx-hero__overlay" style="<?php echo esc_attr($overlay_style); ?>"></div>
            <?php endif; ?>
        </div>
    <?php endif; ?>
    
    <div class="obx-hero__content container text-<?php echo esc_attr($text_align); ?>" 
         style="text-align: <?php echo esc_attr($text_align); ?>; max-width: <?php echo esc_attr($content_width); ?>%;"
    >
        <h1 class="obx-hero__title" <?php echo !empty($text_color) ? 'style="color: ' . esc_attr($text_color) . ';"' : ''; ?>>
            <?php echo wp_kses_post($title); ?>
        </h1>
        
        <p class="obx-hero__text" <?php echo !empty($text_color) ? 'style="color: ' . esc_attr($text_color) . ';"' : ''; ?>>
            <?php echo wp_kses_post($content_text); ?>
        </p>
        
        <div class="obx-hero__buttons">
            <?php if (!empty($primary_button_text)) : ?>
                <div class="wp-block-button">
                    <a href="<?php echo esc_url($primary_button_url); ?>" class="wp-block-button__link obx-button">
                        <?php echo esc_html($primary_button_text); ?>
                    </a>
                </div>
            <?php endif; ?>
            
            <?php if (!empty($secondary_button_text)) : ?>
                <div class="wp-block-button">
                    <a href="<?php echo esc_url($secondary_button_url); ?>" class="wp-block-button__link obx-button obx-button-ghost">
                        <?php echo esc_html($secondary_button_text); ?>
                    </a>
                </div>
            <?php endif; ?>
        </div>
    </div>
</div> 