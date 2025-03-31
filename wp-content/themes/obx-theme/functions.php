<?php
/**
 * OBX Web Lab Theme functions
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// Include SVG support
require_once get_template_directory() . '/inc/svg-support.php';

/**
 * Enqueue styles and scripts
 */
function obx_theme_scripts() {
    // Enqueue main CSS with preload and media="print" + onload
    if (file_exists(get_template_directory() . '/dist/css/main.css')) {
        // Add preload link for main CSS
        add_action('wp_head', function() {
            ?>
            <link rel="preload" href="<?php echo esc_url(get_template_directory_uri() . '/dist/css/main.css'); ?>" as="style">
            <?php
        }, 1);

        // Enqueue main CSS with media="print" and onload switch
        wp_enqueue_style(
            'obx-theme-main-style',
            get_template_directory_uri() . '/dist/css/main.css',
            array(),
            wp_get_theme()->get('Version')
        );
        wp_style_add_data('obx-theme-main-style', 'media', 'print');
        wp_script_add_data('obx-theme-main-style', 'onload', "this.media='all'");
    } else {
        // Fallback to the original stylesheet
        wp_enqueue_style(
            'obx-theme-style',
            get_stylesheet_uri(),
            array(),
            wp_get_theme()->get('Version')
        );
    }
    
    // Enqueue compiled JS if it exists
    if (file_exists(get_template_directory() . '/dist/js/main.js')) {
        wp_enqueue_script(
            'obx-theme-script',
            get_template_directory_uri() . '/dist/js/main.js',
            array(),
            wp_get_theme()->get('Version'),
            true
        );

        wp_localize_script('obx-theme-script', 'obxContact', array(
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('obx_contact_nonce'),
        ));
    }
}
add_action('wp_enqueue_scripts', 'obx_theme_scripts');

/**
 * Enqueue admin scripts and styles
 */
function obx_theme_admin_scripts() {
    if (file_exists(get_template_directory() . '/dist/js/admin.js')) {
        wp_enqueue_script(
            'obx-theme-admin-script',
            get_template_directory_uri() . '/dist/js/admin.js',
            array('wp-api'),
            wp_get_theme()->get('Version'),
            true
        );
    }
}
add_action('admin_enqueue_scripts', 'obx_theme_admin_scripts');

/**
 * Enqueue Google Fonts with preload and display swap
 */
function obx_enqueue_google_fonts() {
    // Preload critical fonts
    add_action('wp_head', function() {
        ?>
        <!-- Preload critical fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Merriweather:wght@700&family=Outfit:wght@400&display=swap" as="style">
        <link rel="preload" href="https://fonts.gstatic.com/s/merriweather/v30/u-440qyriQwlOrhSvowK_l5-fCZM.ttf" as="font" type="font/ttf" crossorigin>
        <link rel="preload" href="https://fonts.gstatic.com/s/outfit/v6/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC0O4a0Ew.woff2" as="font" type="font/woff2" crossorigin>
        <?php
    }, 1);

    // Load all fonts with display swap and media="print" + onload
    wp_enqueue_style(
        'obx-google-fonts',
        'https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700&family=Merriweather:wght@300;400;700;900&family=Outfit:wght@300;400;500;600;700&display=swap',
        array(),
        null
    );
    wp_style_add_data('obx-google-fonts', 'media', 'print');
    wp_script_add_data('obx-google-fonts', 'onload', "this.media='all'");
}
add_action('wp_enqueue_scripts', 'obx_enqueue_google_fonts');

/**
 * Add theme support
 */
function obx_theme_setup() {
    // Add default posts and comments RSS feed links to head
    add_theme_support('automatic-feed-links');

    // Let WordPress manage the document title
    add_theme_support('title-tag');

    // Enable support for Post Thumbnails on posts and pages
    add_theme_support('post-thumbnails');

    // Add support for custom logo
    add_theme_support('custom-logo', array(
        'height'      => 70,
        'width'       => 375,
        'flex-height' => true,
        'flex-width'  => false,
        'header-text' => array('site-title', 'site-description'),
    ));

    // Switch default core markup to output valid HTML5
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ));

    // Register navigation menus
    register_nav_menus(array(
        'primary' => esc_html__('Primary Menu', 'obx-theme'),
        'footer' => esc_html__('Footer Menu', 'obx-theme'),
    ));
}
add_action('after_setup_theme', 'obx_theme_setup');

/**
 * Add custom image sizes
 */
function obx_add_image_sizes() {
    add_image_size('portfolio', 400, 300, true);
}
add_action('after_setup_theme', 'obx_add_image_sizes');

/**
 * Register widget areas
 */
function obx_theme_widgets_init() {
    register_sidebar(
        array(
            'name'          => esc_html__('Sidebar', 'obx-theme'),
            'id'            => 'sidebar-1',
            'description'   => esc_html__('Add widgets here to appear in your sidebar.', 'obx-theme'),
            'before_widget' => '<section id="%1$s" class="widget %2$s">',
            'after_widget'  => '</section>',
            'before_title'  => '<h2 class="widget-title">',
            'after_title'   => '</h2>',
        )
    );
    
    register_sidebar(
        array(
            'name'          => esc_html__('Footer 1', 'obx-theme'),
            'id'            => 'footer-1',
            'description'   => esc_html__('Add widgets here to appear in the first footer column.', 'obx-theme'),
            'before_widget' => '<section id="%1$s" class="widget %2$s">',
            'after_widget'  => '</section>',
            'before_title'  => '<h4 class="widget-title">',
            'after_title'   => '</h4>',
        )
    );
    
    register_sidebar(
        array(
            'name'          => esc_html__('Footer 2', 'obx-theme'),
            'id'            => 'footer-2',
            'description'   => esc_html__('Add widgets here to appear in the second footer column.', 'obx-theme'),
            'before_widget' => '<section id="%1$s" class="widget %2$s">',
            'after_widget'  => '</section>',
            'before_title'  => '<h4 class="widget-title">',
            'after_title'   => '</h4>',
        )
    );
    
    register_sidebar(
        array(
            'name'          => esc_html__('Footer 3', 'obx-theme'),
            'id'            => 'footer-3',
            'description'   => esc_html__('Add widgets here to appear in the third footer column.', 'obx-theme'),
            'before_widget' => '<section id="%1$s" class="widget %2$s">',
            'after_widget'  => '</section>',
            'before_title'  => '<h4 class="widget-title">',
            'after_title'   => '</h4>',
        )
    );
}
add_action('widgets_init', 'obx_theme_widgets_init');

/**
 * Filter the custom logo to set width attribute to 150px
 */
function obx_custom_logo_output($html) {
    // Replace the width and height attributes with our custom values
    $html = preg_replace('/(width|height)="\d+"/', '', $html);
    $html = str_replace('<img', '<img width="150" height="auto"', $html);
    
    return $html;
}
add_filter('get_custom_logo', 'obx_custom_logo_output');