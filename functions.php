/**
 * Enqueue Google Fonts
 */
function obx_enqueue_google_fonts() {
    wp_enqueue_style(
        'obx-google-fonts',
        'https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700&family=Merriweather:wght@300;400;700;900&family=Outfit:wght@300;400;500;600;700&display=swap',
        array(),
        null
    );
}
add_action('wp_enqueue_scripts', 'obx_enqueue_google_fonts'); 