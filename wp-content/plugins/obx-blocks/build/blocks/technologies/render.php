<?php
/**
 * Server-side rendering of the Technologies block
 *
 * @package OBX_Blocks
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

// Extract attributes with defaults
$heading = $attributes['heading'] ?? '';
$subheading = $attributes['subheading'] ?? '';
$intro_text = $attributes['introText'] ?? '';
$technologies = $attributes['technologies'] ?? [];
$align = !empty($attributes['align']) ? $attributes['align'] : 'full';
$background_color = !empty($attributes['backgroundColor']) ? $attributes['backgroundColor'] : '#ffffff';
$text_color = !empty($attributes['textColor']) ? $attributes['textColor'] : '';
$anchor = !empty($attributes['anchor']) ? $attributes['anchor'] : '';
$content_width = !empty($attributes['contentWidth']) ? $attributes['contentWidth'] : 80;

// Build the class names
$class_names = 'obx-technologies';
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
if (!empty($content_width)) {
    $block_style .= "--content-width: {$content_width}%;";
}

// Output the HTML
?>
<div class="<?php echo esc_attr($class_names); ?>"
    <?php echo !empty($anchor) ? ' id="' . esc_attr($anchor) . '"' : ''; ?>
    <?php echo !empty($block_style) ? ' style="' . esc_attr($block_style) . '"' : ''; ?>>
    <div class="obx-technologies__container">
        <div class="obx-technologies__header container">
            <?php if (!empty($heading)) : ?>
                <h2 class="obx-technologies__heading"><?php echo wp_kses_post($heading); ?></h2>
            <?php endif; ?>
            
            <?php if (!empty($subheading)) : ?>
                <h3 class="obx-technologies__subheading"><?php echo wp_kses_post($subheading); ?></h3>
            <?php endif; ?>
            
            <?php if (!empty($intro_text)) : ?>
                <div class="obx-technologies__intro"><?php echo wp_kses_post($intro_text); ?></div>
            <?php endif; ?>
        </div>
        
        <?php if (!empty($technologies)) : ?>
            <div class="obx-technologies__grid">
                <?php foreach ($technologies as $tech) : ?>
                    <div class="obx-technologies__item">
                        <div class="obx-technologies__item-logo">
                            <?php if (!empty($tech['logoImage']['url'])) : ?>
                                <?php if (strtolower(pathinfo($tech['logoImage']['url'], PATHINFO_EXTENSION)) === 'svg') : ?>
                                    <div class="obx-technologies__item-logo-svg" style="background-image: url('<?php echo esc_url($tech['logoImage']['url']); ?>')" aria-label="<?php echo esc_attr($tech['name']); ?>"></div>
                                <?php else : ?>
                                    <img 
                                        src="<?php echo esc_url($tech['logoImage']['url']); ?>" 
                                        alt="<?php echo esc_attr($tech['name']); ?>" 
                                        class="obx-technologies__item-logo-img"
                                        loading="lazy"
                                    >
                                <?php endif; ?>
                            <?php endif; ?>
                        </div>
                        <div class="obx-technologies__item-content">
                            <div class="obx-technologies__item-name"><?php echo wp_kses_post($tech['name']); ?></div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
</div> 