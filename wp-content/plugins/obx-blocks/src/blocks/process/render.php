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
$heading = $attributes['heading'] ?? '';
$intro_text = $attributes['introText'] ?? '';
$steps = $attributes['steps'] ?? [];
$cta_text = $attributes['ctaText'] ?? '';
$cta_url = $attributes['ctaUrl'] ?? '#';
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
    $block_style .= "--block-color: {$text_color};";
}

// Container style with content width
$container_style = "max-width: {$content_width}%;";

// Output the HTML
?>
<div class="<?php echo esc_attr($class_names); ?>" <?php echo !empty($block_style) ? 'style="' . esc_attr($block_style) . '"' : ''; ?>>
    <div class="obx-process__container" style="<?php echo esc_attr($container_style); ?>">
        <div class="obx-process__header" style="text-align: <?php echo esc_attr($text_align); ?>">

            <?php if (!empty($heading)) : ?>
                <h2 class="obx-process__heading">
                    <?php echo wp_kses_post($heading); ?>
                </h2>
            <?php endif; ?>
            <?php if (!empty($cta_text)) : ?>
                <div class="obx-process__cta-container" style="text-align: <?php echo esc_attr($text_align); ?>">
                    <a href="<?php echo esc_url($cta_url); ?>" class="obx-process__cta-button">
                        <?php echo esc_html($cta_text); ?>
                    </a>
                </div>
            <?php endif; ?>
        </div>

        <div class="obx-process__content">
            <?php if (!empty($intro_text)) : ?>
                <div class="obx-process__intro">
                    <?php echo wp_kses_post($intro_text); ?>
                </div>
            <?php endif; ?>
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
        </div>
    </div>
</div>