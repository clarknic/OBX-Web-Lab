<?php

/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package OBX_Theme
 */
global $wpdb;

?>
<!doctype html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">

    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <?php wp_body_open(); ?>
    <div id="page" class="site">
        <header id="masthead" class="site-header">
            <div class="container">
                <div class="site-branding">
                    <?php
                    $custom_logo_id = get_theme_mod('custom_logo');
                    if ($custom_logo_id) :
                        ?>
                        <a href="<?php echo esc_url(home_url('/')); ?>" rel="home" class="custom-logo-link">
                            <?php echo wp_get_attachment_image($custom_logo_id, 'full', false, array(
                                'class' => 'custom-logo',
                                'width' => 300,
                                'height' => null,
                                'loading' => 'eager'
                            )); ?>
                        </a>
                    <?php else : ?>
                        <a href="<?php echo esc_url(home_url('/')); ?>" rel="home" class="site-logo">
                            <img src="<?php echo get_template_directory_uri(); ?>/assets/img/obx-web-lab-logo-temp.png" alt="<?php bloginfo('name'); ?>" width="300">
                        </a>
                    <?php endif; ?>
                </div><!-- .site-branding -->

                <nav id="site-navigation" class="main-navigation">
                    <button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false">
                        <span class="screen-reader-text"><?php esc_html_e('Menu', 'obx-theme'); ?></span>
                        <span class="menu-burger"></span>
                    </button>
                    <?php
                    // get nav items from the database using $wpdb
                    $nav_items = $wpdb->get_results("SELECT * FROM wp_posts WHERE post_type = 'nav_menu_item'");
                    if (!empty($nav_items)) : ?>
                        <ul>
                            <?php foreach ($nav_items as $nav_item) :
                                $nav_item_meta = get_post_meta($nav_item->ID, '_menu_item_url', true); ?>
                                <li class="menu-item">
                                    <a title="<?php echo $nav_item->post_title; ?>" href="<?php echo $nav_item_meta; ?>"><?php echo $nav_item->post_title; ?></a>
                                </li>
                            <?php endforeach; ?>
                            <!-- Contact Us Button -->
                            <li class="menu-item menu-item-contact-button">
                                <a href="#contact-us" class="contact-button">Contact Us</a>
                            </li>
                        </ul>
                    <?php endif;
                    ?>
                </nav><!-- #site-navigation -->
            </div><!-- .container -->
        </header><!-- #masthead -->

        <div id="content" class="site-content">