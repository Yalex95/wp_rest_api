<?php
/**
* Template Name: Home Template
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Bootscore
*/

get_header();
?>

<div id="content" class="site-content">
    <div id="primary" class="content-area">

        <!-- Hook to add something nice -->
        <?php bs_after_primary(); ?>

        <main id="main" class="site-main">
            <div class="entry-content pt-5">
                <div class="mt-5">
                    <h5><?php echo the_title();?></h5>
                </div>
            </div>
        </main>
    </div>
</div>
<?php 
get_footer();
?>