<?php

/**
 * Template part for displaying page content in page.php
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package OBX_Theme
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<?php if (!has_block('obx-blocks/hero')) : ?>
		<header class="entry-header">
			<?php the_title('<h1 class="entry-title">', '</h1>'); ?>
		</header><!-- .entry-header -->

		<?php if (has_post_thumbnail()) : ?>
			<div class="post-thumbnail">
				<?php the_post_thumbnail('large'); ?>
			</div><!-- .post-thumbnail -->
		<?php endif; ?>
	<?php endif; ?>

	<div class="entry-content">
		<?php
		the_content();

		if (!is_home() && !is_front_page()) {
			wp_link_pages(
				array(
					'before' => '<div class="page-links">' . esc_html__('Pages:', 'obx-theme'),
					'after'  => '</div>',
				)
			);
		}
		?>
	</div><!-- .entry-content -->
</article><!-- #post-<?php the_ID(); ?> -->