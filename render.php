<?php

/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

// Get block attributes with defaults
$title = $attributes['title'] ?? 'Block Title';
$show_title = $attributes['showTitle'] ?? true;
$title_color = $attributes['titleTextColor'] ?? '#1a202c';
$title_size = $attributes['titleFontSize'] ?? 3;

$content = $attributes['content'] ?? 'Add your content here...';
$content_color = $attributes['contentColor'] ?? '#4a5568';
$content_size = $attributes['contentFontSize'] ?? 1;

$background_color = $attributes['backgroundColor'] ?? '#ffffff';
$padding = $attributes['padding'] ?? [
    'top' => 2,
    'bottom' => 2,
    'left' => 2,
    'right' => 2,
];
$alignment = $attributes['alignment'] ?? 'center';
?>

<section <?php echo get_block_wrapper_attributes(['class' => "test-block"]); ?> style="padding: <?php echo esc_attr($padding['top']); ?>rem <?php echo esc_attr($padding['right']); ?>rem <?php echo esc_attr($padding['bottom']); ?>rem <?php echo esc_attr($padding['left']); ?>rem; background-color: <?php echo esc_attr($background_color); ?>; align-items: <?php echo esc_attr($alignment); ?>;">
    <h2 style="color: <?php echo esc_attr($title_color); ?>; font-size: <?php echo esc_attr($title_size); ?>rem;"><?php echo esc_html($title); ?></h2>
    <p style="color: <?php echo esc_attr($content_color); ?>; font-size: <?php echo esc_attr($content_size); ?>rem;"><?php echo esc_html($content); ?></p>
</section>