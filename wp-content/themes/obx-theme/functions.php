<?php
/**
 * OBX Web Lab Theme functions
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Enqueue styles and scripts
 */
function obx_theme_scripts() {
    // Enqueue theme stylesheet
    if (file_exists(get_template_directory() . '/dist/js/main.js')) {
        // If we have a compiled main.js file, use it
        wp_enqueue_script(
            'obx-theme-script',
            get_template_directory_uri() . '/dist/js/main.js',
            array(),
            wp_get_theme()->get('Version'),
            true
        );
    } else {
        // Fallback to the original stylesheet
        wp_enqueue_style(
            'obx-theme-style',
            get_stylesheet_uri(),
            array(),
            wp_get_theme()->get('Version')
        );
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
 * Add theme support
 */
function obx_theme_setup() {
    // Add default posts and comments RSS feed links to head
    add_theme_support('automatic-feed-links');

    // Let WordPress manage the document title
    add_theme_support('title-tag');

    // Enable support for Post Thumbnails on posts and pages
    add_theme_support('post-thumbnails');

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