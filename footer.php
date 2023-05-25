<?php

/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Bootscore
 *
 * @version 5.2.0.0
 */

?>

<footer class="z2">
<!-- Bootscore Footer -->
<div class="bootscore-footer">
    <div class="top-widgets container-fluid">
        <!-- Top Footer Widget -->
        <?php if (is_active_sidebar('top-footer')) : ?>
        <div>
            <?php dynamic_sidebar('top-footer'); ?>
        </div>
        <?php endif; ?>
    </div>
    
    <div class="bottom-widgets container-fluid">
        <div class="row align-items-center">

            <!-- Footer 1 Widget -->
            <div class="col-lg-3 col-md-3 col-12 footer-widgets-1 text-center d-none d-lg-block d-md-none">
                <?php if (is_active_sidebar('footer-1')) : ?>
                    <div>
                        <?php dynamic_sidebar('footer-1'); ?>
                    </div>
                <?php endif; ?>
            </div>

            <!-- Footer 2 Widget -->
            <div class="col-lg-6 col-md-12 col-12 footer-widgets-2 text-center order-1 order-md-2 order-lg-1">
                <?php if (is_active_sidebar('footer-2')) : ?>
                <div>
                    <?php dynamic_sidebar('footer-2'); ?>
                </div>
                <?php endif; ?>
            </div>

             <!-- Footer Mobile 1 Widget -->
             <div class="col-lg-3 col-md-12 col-12 footer-widgets-1 text-center d-block d-lg-none d-md-block mt-5 order-2 order-md-1 order-lg-2">
                <?php if (is_active_sidebar('footer-1')) : ?>
                    <div>
                        <?php dynamic_sidebar('footer-1'); ?>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </div> 
</div>
</footer>

</div><!-- #page -->

<?php wp_footer(); ?>

</body>

</html>
