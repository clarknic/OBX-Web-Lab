<?php
/**
 * Server-side rendering of the Portfolio block
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
$portfolio_items = $attributes['portfolioItems'] ?? [];
$align = !empty($attributes['align']) ? $attributes['align'] : 'full';
$text_align = !empty($attributes['textAlign']) ? $attributes['textAlign'] : 'center';
$background_color = !empty($attributes['backgroundColor']) ? $attributes['backgroundColor'] : '#ffffff';
$text_color = !empty($attributes['textColor']) ? $attributes['textColor'] : '';
$accent_color = !empty($attributes['accentColor']) ? $attributes['accentColor'] : '#a7d1fb';
$content_width = !empty($attributes['contentWidth']) ? $attributes['contentWidth'] : 80;

// Build the class names
$class_names = 'obx-portfolio';
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
    <div class="obx-portfolio__container" style="<?php echo esc_attr($container_style); ?>">
        <div class="obx-portfolio__header" style="text-align: <?php echo esc_attr($text_align); ?>">
            <?php if (!empty($tagline)) : ?>
                <div class="obx-portfolio__tagline"><?php echo wp_kses_post($tagline); ?></div>
            <?php endif; ?>
            
            <?php if (!empty($heading)) : ?>
                <h2 class="obx-portfolio__heading" <?php echo !empty($heading_style) ? 'style="' . esc_attr($heading_style) . '"' : ''; ?>>
                    <?php echo wp_kses_post($heading); ?>
                </h2>
            <?php endif; ?>
        </div>
        
        <?php if (!empty($portfolio_items)) : ?>
            <div class="obx-portfolio__items">
                <?php foreach ($portfolio_items as $item) : ?>
                    <div class="obx-portfolio__item">
                        <?php if (!empty($item['imageUrl'])) : ?>
                            <div class="obx-portfolio__item-image-container">
                                <img 
                                    src="<?php echo esc_url($item['imageUrl']); ?>" 
                                    alt="<?php echo esc_attr($item['imageAlt']); ?>" 
                                    class="obx-portfolio__item-image"
                                />
                            </div>
                        <?php endif; ?>
                        
                        <div class="obx-portfolio__item-content">
                            <?php if (!empty($item['name'])) : ?>
                                <h3 class="obx-portfolio__item-name"><?php echo wp_kses_post($item['name']); ?></h3>
                            <?php endif; ?>
                            
                            <?php if (!empty($item['description'])) : ?>
                                <div class="obx-portfolio__item-description"><?php echo wp_kses_post($item['description']); ?></div>
                            <?php endif; ?>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
</div> 