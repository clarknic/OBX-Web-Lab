<?php
/**
 * Server-side rendering of the Process block
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
$steps = $attributes['steps'] ?? [];
$cta_text = $attributes['ctaText'] ?? '';
$cta_url = $attributes['ctaUrl'] ?? '#';
$image_url = $attributes['imageUrl'] ?? '';
$image_alt = $attributes['imageAlt'] ?? '';
$align = !empty($attributes['align']) ? $attributes['align'] : 'full';
$text_align = !empty($attributes['textAlign']) ? $attributes['textAlign'] : 'center';
$background_color = !empty($attributes['backgroundColor']) ? $attributes['backgroundColor'] : '#ffffff';
$text_color = !empty($attributes['textColor']) ? $attributes['textColor'] : '';
$accent_color = !empty($attributes['accentColor']) ? $attributes['accentColor'] : '#a7d1fb';
$content_width = !empty($attributes['contentWidth']) ? $attributes['contentWidth'] : 80;

// Build the class names
$class_names = 'obx-process';
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

// Output the HTML
?>
<div class="<?php echo esc_attr($class_names); ?>" <?php echo !empty($block_style) ? 'style="' . esc_attr($block_style) . '"' : ''; ?>>
    <div class="obx-process__container" style="<?php echo esc_attr($container_style); ?>">
        <div class="obx-process__header" style="text-align: <?php echo esc_attr($text_align); ?>">
            <?php if (!empty($tagline)) : ?>
                <div class="obx-process__tagline"><?php echo wp_kses_post($tagline); ?></div>
            <?php endif; ?>
            
            <?php if (!empty($heading)) : ?>
                <h2 class="obx-process__heading" <?php echo !empty($heading_style) ? 'style="' . esc_attr($heading_style) . '"' : ''; ?>>
                    <?php echo wp_kses_post($heading); ?>
                </h2>
            <?php endif; ?>
        </div>
        
        <div class="obx-process__content">
            <?php if (!empty($steps)) : ?>
                <div class="obx-process__steps">
                    <?php foreach ($steps as $step) : ?>
                        <div class="obx-process__step">
                            <div class="obx-process__step-number" style="background-color: <?php echo esc_attr($accent_color); ?>">
                                <?php echo esc_html($step['number']); ?>
                            </div>
                            <div class="obx-process__step-content">
                                <?php if (!empty($step['title'])) : ?>
                                    <h3 class="obx-process__step-title"><?php echo wp_kses_post($step['title']); ?></h3>
                                <?php endif; ?>
                                
                                <?php if (!empty($step['description'])) : ?>
                                    <div class="obx-process__step-description"><?php echo wp_kses_post($step['description']); ?></div>
                                <?php endif; ?>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
            
            <div class="obx-process__image-container">
                <?php if (!empty($image_url)) : ?>
                    <img src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr($image_alt); ?>" class="obx-process__image" />
                <?php endif; ?>
                
                <?php if (!empty($cta_text)) : ?>
                    <div class="obx-process__cta-container" style="text-align: <?php echo esc_attr($text_align); ?>">
                        <a href="<?php echo esc_url($cta_url); ?>" class="obx-process__cta-button">
                            <?php echo esc_html($cta_text); ?>
                        </a>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div> 