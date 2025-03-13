<?php
/**
 * Server-side rendering of the About Us block
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
$team_members = $attributes['teamMembers'] ?? [];
$align = !empty($attributes['align']) ? $attributes['align'] : 'full';
$text_align = !empty($attributes['textAlign']) ? $attributes['textAlign'] : 'center';
$background_color = !empty($attributes['backgroundColor']) ? $attributes['backgroundColor'] : '#ffffff';
$text_color = !empty($attributes['textColor']) ? $attributes['textColor'] : '';
$accent_color = !empty($attributes['accentColor']) ? $attributes['accentColor'] : '#a7d1fb';
$content_width = !empty($attributes['contentWidth']) ? $attributes['contentWidth'] : 80;

// Build the class names
$class_names = 'obx-about';
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
    <div class="obx-about__container" style="<?php echo esc_attr($container_style); ?>">
        <div class="obx-about__header" style="text-align: <?php echo esc_attr($text_align); ?>">
            <?php if (!empty($tagline)) : ?>
                <div class="obx-about__tagline"><?php echo wp_kses_post($tagline); ?></div>
            <?php endif; ?>
            
            <?php if (!empty($heading)) : ?>
                <h2 class="obx-about__heading" <?php echo !empty($heading_style) ? 'style="' . esc_attr($heading_style) . '"' : ''; ?>>
                    <?php echo wp_kses_post($heading); ?>
                </h2>
            <?php endif; ?>
            
            <?php if (!empty($intro_text)) : ?>
                <div class="obx-about__intro-text"><?php echo wp_kses_post($intro_text); ?></div>
            <?php endif; ?>
        </div>
        
        <?php if (!empty($team_members)) : ?>
            <div class="obx-about__team">
                <?php foreach ($team_members as $member) : ?>
                    <div class="obx-about__member">
                        <?php if (!empty($member['imageUrl'])) : ?>
                            <div class="obx-about__member-image-container">
                                <img 
                                    src="<?php echo esc_url($member['imageUrl']); ?>" 
                                    alt="<?php echo esc_attr($member['imageAlt']); ?>" 
                                    class="obx-about__member-image"
                                />
                            </div>
                        <?php endif; ?>
                        
                        <div class="obx-about__member-content">
                            <?php if (!empty($member['name'])) : ?>
                                <h3 class="obx-about__member-name"><?php echo wp_kses_post($member['name']); ?></h3>
                            <?php endif; ?>
                            
                            <?php if (!empty($member['position'])) : ?>
                                <div class="obx-about__member-position"><?php echo wp_kses_post($member['position']); ?></div>
                            <?php endif; ?>
                            
                            <?php if (!empty($member['description'])) : ?>
                                <div class="obx-about__member-description"><?php echo wp_kses_post($member['description']); ?></div>
                            <?php endif; ?>
                            
                            <?php if (!empty($member['quote'])) : ?>
                                <div class="obx-about__member-quote-container">
                                    <div class="obx-about__member-quote-icon" style="color: <?php echo esc_attr($accent_color); ?>">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                            <path d="M13 6v6h5.2v4c0 .8-.2 1.4-.5 1.7-.3.4-.8.5-1.5.5H16v2h.7c1.6 0 2.8-.4 3.6-1.2.8-.8 1.2-2 1.2-3.5V6H13zm-9 6h5.2v4c0 .8-.2 1.4-.5 1.7-.3.4-.8.5-1.5.5H7v2h.7c1.6 0 2.8-.4 3.6-1.2.8-.8 1.2-2 1.2-3.5V6H4v6z" fill="currentColor"/>
                                        </svg>
                                    </div>
                                    <div class="obx-about__member-quote"><?php echo wp_kses_post($member['quote']); ?></div>
                                </div>
                            <?php endif; ?>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
</div> 