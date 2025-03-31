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

/**
 * @var array $attributes Block attributes.
 * @var array $content Block content.
 * @var array $block Block instance.
 */

$tagline = $attributes['tagline'] ?? '';
$heading = $attributes['heading'] ?? '';
$intro_text = $attributes['introText'] ?? '';
$team_members = $attributes['teamMembers'] ?? [];
$background_color = $attributes['backgroundColor'] ?? '';
$text_color = $attributes['textColor'] ?? '';
$accent_color = $attributes['accentColor'] ?? '';
$text_align = $attributes['textAlign'] ?? 'left';
$content_width = $attributes['contentWidth'] ?? 100;
$anchor = $attributes['anchor'] ?? '';
$align = $attributes['align'] ?? '';

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'obx-about align' . $align,
    'id' => $anchor,
    'style' => sprintf(
        'text-align: %s; --content-width: %s%%; --background-color: %s; --text-color: %s; --accent-color: %s;',
        esc_attr($text_align),
        esc_attr($content_width),
        esc_attr($background_color),
        esc_attr($text_color),
        esc_attr($accent_color)
    ),
]);
?>

<div <?php echo $wrapper_attributes; ?>>
    <div class="obx-about__content">
        <?php if (!empty($tagline)) : ?>
            <div class="obx-about__tagline"><?php echo wp_kses_post($tagline); ?></div>
        <?php endif; ?>

        <?php if (!empty($heading)) : ?>
            <h2 class="obx-about__heading"><?php echo wp_kses_post($heading); ?></h2>
        <?php endif; ?>

        <?php if (!empty($intro_text)) : ?>
            <div class="obx-about__intro-text"><?php echo wp_kses_post($intro_text); ?></div>
        <?php endif; ?>

        <?php if (!empty($team_members)) : ?>
            <div class="obx-about__team">
                <?php foreach ($team_members as $member) : ?>
                    <div class="obx-about__team-member">
                        <?php if (!empty($member['imageUrl'])) : ?>
                            <div class="obx-about__team-member-image">
                                <img 
                                    src="<?php echo esc_url($member['imageUrl']); ?>" 
                                    alt="<?php echo esc_attr($member['imageAlt']); ?>"
                                    loading="lazy"
                                >
                            </div>
                        <?php endif; ?>
                        <div class="obx-about__team-member-content">
                            <?php if (!empty($member['name'])) : ?>
                                <h3 class="obx-about__team-member-name"><?php echo wp_kses_post($member['name']); ?>, <span><?php echo wp_kses_post($member['position']); ?></span></h3>
                            <?php endif; ?>
                            <?php if (!empty($member['description'])) : ?>
                                <div class="obx-about__team-member-description"><?php echo wp_kses_post($member['description']); ?></div>
                            <?php endif; ?>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
</div> 