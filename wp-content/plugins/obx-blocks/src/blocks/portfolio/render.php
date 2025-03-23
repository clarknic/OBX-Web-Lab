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
$anchor = !empty($attributes['anchor']) ? $attributes['anchor'] : '';

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

// Container style with content width
$container_style = "max-width: {$content_width}%;";

// Output the HTML
?>
<div class="<?php echo esc_attr($class_names); ?>"
    <?php echo !empty($anchor) ? ' id="' . esc_attr($anchor) . '"' : ''; ?>
    <?php echo !empty($block_style) ? ' style="' . esc_attr($block_style) . '"' : ''; ?>>
    <div class="obx-portfolio__container" style="<?php echo esc_attr($container_style); ?>">
        <div class="obx-portfolio__header" style="text-align: <?php echo esc_attr($text_align); ?>">
            <?php if (!empty($tagline)) : ?>
                <div class="obx-portfolio__tagline"><?php echo wp_kses_post($tagline); ?></div>
            <?php endif; ?>
            
            <?php if (!empty($heading)) : ?>
                <h2 class="obx-portfolio__heading">
                    <?php echo wp_kses_post($heading); ?>
                </h2>
            <?php endif; ?>
        </div>
        
        <?php if (!empty($portfolio_items)) : ?>
            <div class="obx-portfolio__content">
                <!-- Project List (Left Side) -->
                <div class="obx-portfolio__project-list">
                    <?php foreach ($portfolio_items as $index => $item) : ?>
                        <div class="obx-portfolio__project-item <?php echo $index === 0 ? 'active' : ''; ?>" 
                             data-project-index="<?php echo esc_attr($index); ?>">
                            <h3 class="obx-portfolio__project-title"><?php echo wp_kses_post($item['name']); ?></h3>
                        </div>
                    <?php endforeach; ?>
                </div>

                <!-- Project Details (Right Side) -->
                <div class="obx-portfolio__project-details">
                    <?php foreach ($portfolio_items as $index => $item) : ?>
                        <div class="obx-portfolio__project-content <?php echo $index === 0 ? 'active' : ''; ?>"
                             data-project-index="<?php echo esc_attr($index); ?>">
                            <?php if (!empty($item['imageUrl'])) : ?>
                                <div class="obx-portfolio__project-image">
                                    <img src="<?php echo esc_url($item['imageUrl']); ?>" 
                                         alt="<?php echo esc_attr($item['imageAlt']); ?>" />
                                </div>
                            <?php endif; ?>
                            <h3 class="obx-portfolio__project-name"><?php echo wp_kses_post($item['name']); ?></h3>
                            <?php if (!empty($item['description'])) : ?>
                                <div class="obx-portfolio__project-description">
                                    <?php echo wp_kses_post($item['description']); ?>
                                </div>
                            <?php endif; ?>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        <?php endif; ?>
    </div>
</div> 