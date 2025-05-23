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
$phone = $attributes['phone'] ?? '';
$email = $attributes['email'] ?? '';
$email_config = $attributes['emailConfig'] ?? array();
$background_color = $attributes['backgroundColor'] ?? '';
$text_color = $attributes['textColor'] ?? '';
$accent_color = $attributes['accentColor'] ?? '';
$text_align = $attributes['textAlign'] ?? 'left';
$content_width = $attributes['contentWidth'] ?? 100;
$anchor = $attributes['anchor'] ?? '';
$align = $attributes['align'] ?? '';

// Define constant random strings for form field names
define('OBX_CONTACT_NAME_FIELD', 'x7k9m2p4');
define('OBX_CONTACT_EMAIL_FIELD', 'v3n5b8h1');
define('OBX_CONTACT_MESSAGE_FIELD', 't6w9y2z5');
define('OBX_CONTACT_RECEIVERS_FIELD', 'q4s7u1x3');
define('OBX_CONTACT_TITLE_FIELD', 'a2d5g8j1');

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

// Get block attributes
$title = $attributes['title'] ?? '';
$description = $attributes['description'] ?? '';
$receivers = $attributes['receivers'] ?? '';
$messageTitle = $attributes['messageTitle'] ?? '';

// Encode sensitive data with base64
$encodedReceivers = !empty($receivers) ? base64_encode($receivers) : '';
$encodedMessageTitle = !empty($messageTitle) ? base64_encode($messageTitle) : '';

// Get alignment classes
$alignment = $attributes['alignment'] ?? 'center';
$alignmentClass = 'text-' . $alignment;

// Get background color
$backgroundColorClass = !empty($background_color) ? 'has-' . $background_color . '-background-color' : '';

// Get text color
$textColorClass = !empty($text_color) ? 'has-' . $text_color . '-color' : '';

// Get custom class
$className = $attributes['className'] ?? '';

// Combine classes
$classes = array(
    'obx-contact',
    $alignmentClass,
    $backgroundColorClass,
    $textColorClass,
    $className,
);
$classString = implode(' ', array_filter($classes));
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

            <?php if (!empty($phone) || !empty($email)) : ?>
                <div class="obx-contact__contact-info">
                    <?php if (!empty($phone)) : ?>
                        <?php 
                        // Format phone number for tel: link by removing non-numeric characters
                        $tel_number = preg_replace('/[^0-9+]/', '', $phone);
                        ?>
                        <div class="obx-contact__contact-item">
                            <svg class="obx-contact__contact-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.97 18.33C21.97 18.69 21.89 19.06 21.72 19.42C21.55 19.78 21.33 20.12 21.04 20.44C20.55 20.98 20.01 21.37 19.4 21.62C18.8 21.87 18.15 22 17.45 22C16.43 22 15.34 21.76 14.19 21.27C13.04 20.78 11.89 20.12 10.75 19.29C9.6 18.45 8.51 17.52 7.47 16.49C6.44 15.45 5.51 14.36 4.68 13.22C3.86 12.08 3.2 10.94 2.72 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C11.27 13.75 11.79 14.24 12.32 14.69C12.84 15.13 13.27 15.43 13.61 15.61C13.66 15.63 13.72 15.66 13.79 15.69C13.87 15.72 13.95 15.73 14.04 15.73C14.21 15.73 14.34 15.67 14.45 15.56L15.21 14.81C15.46 14.56 15.7 14.37 15.93 14.25C16.16 14.11 16.39 14.04 16.64 14.04C16.83 14.04 17.03 14.08 17.25 14.17C17.47 14.26 17.7 14.39 17.95 14.56L21.26 16.91C21.52 17.09 21.7 17.31 21.81 17.55C21.91 17.8 21.97 18.05 21.97 18.33Z" fill="currentColor"/>
                            </svg>
                            <a href="tel:<?php echo esc_attr($tel_number); ?>" class="obx-contact__contact-link"><?php echo esc_html($phone); ?></a>
                        </div>
                    <?php endif; ?>
                    
                    <?php if (!empty($email)) : ?>
                        <div class="obx-contact__contact-item">
                            <svg class="obx-contact__contact-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M22 6L12 13L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <a href="mailto:<?php echo esc_attr($email); ?>" class="obx-contact__contact-link"><?php echo esc_html($email); ?></a>
                        </div>
                    <?php endif; ?>
                </div>
            <?php endif; ?>
        </div>
        
        <div class="obx-contact__form-preview">
            <form class="obx-contact__form" id="obx-contact-form" method="post">
                <input type="hidden" name="<?php echo OBX_CONTACT_RECEIVERS_FIELD; ?>" value="<?php echo esc_attr($encodedReceivers); ?>">
                <input type="hidden" name="<?php echo OBX_CONTACT_TITLE_FIELD; ?>" value="<?php echo esc_attr($encodedMessageTitle); ?>">
                <input type="hidden" name="action" value="obx_contact_form">
                <input type="hidden" name="nonce" value="<?php echo wp_create_nonce('obx_contact_nonce'); ?>">
                
                <div class="obx-contact__form-field">
                    <label for="obx-contact-name"><?php _e('Name', 'obx-blocks'); ?></label>
                    <input type="text" id="obx-contact-name" name="<?php echo OBX_CONTACT_NAME_FIELD; ?>" required>
                </div>
                
                <div class="obx-contact__form-field">
                    <label for="obx-contact-email"><?php _e('Email', 'obx-blocks'); ?></label>
                    <input type="email" id="obx-contact-email" name="<?php echo OBX_CONTACT_EMAIL_FIELD; ?>" required>
                </div>
                
                <div class="obx-contact__form-field">
                    <label for="obx-contact-message"><?php _e('Message', 'obx-blocks'); ?></label>
                    <textarea id="obx-contact-message" name="<?php echo OBX_CONTACT_MESSAGE_FIELD; ?>" rows="5" required></textarea>
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