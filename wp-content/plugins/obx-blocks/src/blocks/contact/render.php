<?php
/**
 * Server-side rendering of the Contact Us block
 *
 * @package OBX_Blocks
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Render the block
 * 
 * @param array $attributes Block attributes.
 * @return string HTML content.
 */
$heading = $attributes['heading'] ?? '';
$intro_text = $attributes['introText'] ?? '';
$email_config = $attributes['emailConfig'] ?? array();
$background_color = $attributes['backgroundColor'] ?? '';
$text_color = $attributes['textColor'] ?? '';
$accent_color = $attributes['accentColor'] ?? '';
$text_align = $attributes['textAlign'] ?? 'left';
$content_width = $attributes['contentWidth'] ?? 100;
$anchor = $attributes['anchor'] ?? '';
$align = $attributes['align'] ?? '';

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'obx-contact align' . $align,
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
    <div class="obx-contact__content">
        <div class="obx-contact__info">
            <?php if (!empty($heading)) : ?>
                <h2 class="obx-contact__heading"><?php echo wp_kses_post($heading); ?></h2>
            <?php endif; ?>

            <?php if (!empty($intro_text)) : ?>
                <div class="obx-contact__intro-text"><?php echo wp_kses_post($intro_text); ?></div>
            <?php endif; ?>
        </div>
        
        <div class="obx-contact__form-preview">
            <form class="obx-contact__form" method="post">
                <?php wp_nonce_field('obx_contact_nonce', 'nonce'); ?>
                <input type="hidden" name="messageTitle" value="<?php echo esc_attr($email_config['messageTitle'] ?? ''); ?>">
                <input type="hidden" name="receivers" value="<?php echo esc_attr($email_config['receivers'] ?? ''); ?>">
                
                <div class="obx-contact__form-field">
                    <label for="obx-contact-name"><?php _e('Name', 'obx-blocks'); ?></label>
                    <input type="text" id="obx-contact-name" name="name" required>
                </div>
                
                <div class="obx-contact__form-field">
                    <label for="obx-contact-email"><?php _e('Email', 'obx-blocks'); ?></label>
                    <input type="email" id="obx-contact-email" name="email" required>
                </div>
                
                <div class="obx-contact__form-field">
                    <label for="obx-contact-message"><?php _e('Message', 'obx-blocks'); ?></label>
                    <textarea id="obx-contact-message" name="message" rows="5" required></textarea>
                </div>
                
                <button type="submit" class="obx-contact__form-submit">
                    <?php _e('Send Message', 'obx-blocks'); ?>
                </button>

                <div class="obx-contact__message obx-contact__message--success" style="display: none;">
                    <?php echo esc_html($email_config['successMessage'] ?? __('Thank you! Your message has been sent successfully.', 'obx-blocks')); ?>
                </div>
                
                <div class="obx-contact__message obx-contact__message--error" style="display: none;">
                    <?php echo esc_html($email_config['errorMessage'] ?? __('Sorry, there was an error sending your message. Please try again.', 'obx-blocks')); ?>
                </div>
            </form>
        </div>
    </div>
</div>