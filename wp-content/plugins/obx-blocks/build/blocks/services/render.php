<?php
/**
 * Server-side rendering of the Services block
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
$services = $attributes['services'] ?? [];
$cta_text = $attributes['ctaText'] ?? '';
$cta_url = $attributes['ctaUrl'] ?? '';
$align = !empty($attributes['align']) ? $attributes['align'] : 'full';
$background_color = !empty($attributes['backgroundColor']) ? $attributes['backgroundColor'] : '#ffffff';
$text_color = !empty($attributes['textColor']) ? $attributes['textColor'] : '';
$anchor = !empty($attributes['anchor']) ? $attributes['anchor'] : '';
$content_width = !empty($attributes['contentWidth']) ? $attributes['contentWidth'] : 80;

// Build the class names
$class_names = 'obx-services';
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
$block_style .= "--content-width: {$content_width}%;";

// Output the HTML
?>
<div class="<?php echo esc_attr($class_names); ?>"
    <?php echo !empty($anchor) ? ' id="' . esc_attr($anchor) . '"' : ''; ?>
    <?php echo !empty($block_style) ? ' style="' . esc_attr($block_style) . '"' : ''; ?>>
    <div class="obx-services__container container">
        <div class="obx-services__left">
            <?php if (!empty($heading)) : ?>
                <h2 class="obx-services__heading"><?php echo wp_kses_post($heading); ?></h2>
            <?php endif; ?>
            
            <?php if (!empty($cta_text) && !empty($cta_url)) : ?>
                <div class="obx-services__cta">
                    <a 
                        href="<?php echo esc_url($cta_url); ?>" 
                        class="obx-services__cta-link"
                    >
                        <?php echo wp_kses_post($cta_text); ?>
                    </a>
                </div>
            <?php endif; ?>
        </div>
        
        <div class="obx-services__right">
            <?php if (!empty($intro_text)) : ?>
                <div class="obx-services__intro"><?php echo wp_kses_post($intro_text); ?></div>
            <?php endif; ?>
            
            <?php if (!empty($services)) : ?>
                <div class="obx-services__grid">
                    <?php foreach ($services as $service) : ?>
                        <div class="obx-services__item">
                            <h3 class="obx-services__item-title"><?php echo obx_render_service_icon($service); ?> <?php echo wp_kses_post($service['title']); ?></h3>
                            <p class="obx-services__item-description"><?php echo wp_kses_post($service['description']); ?></p>
                            <?php if (!empty($service['iconImage']['url'])) : ?>
                                <div class="obx-services__item-icon">
                                    <img 
                                        src="<?php echo esc_url($service['iconImage']['url']); ?>" 
                                        alt="<?php echo esc_attr($service['title']); ?>"
                                        loading="lazy"
                                    >
                                </div>
                            <?php endif; ?>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </div>
    </div>
</div>