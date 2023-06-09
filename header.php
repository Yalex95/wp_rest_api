<?php

/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Bootscore
 * 
 * @version 5.2.0.0
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>

<head>
    <!-- Favicons, touch icons, Safari pinned tab icon and theme colors -->
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <!-- Favicons -->
    <link rel="apple-touch-icon" sizes="120x120"
        href="<?php echo get_stylesheet_directory_uri(); ?>/img/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32"
        href="<?php echo get_stylesheet_directory_uri(); ?>/img/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16"
        href="<?php echo get_stylesheet_directory_uri(); ?>/img/favicon/favicon-16x16.png">
    <link rel="manifest" href="<?php echo get_stylesheet_directory_uri(); ?>/img/favicon/site.webmanifest">
    <link rel="mask-icon" href="<?php echo get_stylesheet_directory_uri(); ?>/img/favicon/safari-pinned-tab.svg"
        color="#5bbad5">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <?php wp_body_open(  ); ?>

    <div id="page" class="site">

        <header id="masthead" class="site-header">
            <!-- change bg color and position here -->
            <div class="fixed-top bg-light py-2">
                <div class="position-relative">
                     <!-- change breakpoints and nav color here. add navbar-dark class to turn nav-links into white -->
                        <nav class="navbar-expand-lg">

                            <div class="container">

                                <a class="navbar-brand">
                                    <!-- Logo(s) -->
                                </a>

                                <!-- Offcanvas Navbar -->
                                <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvas-navbar">
                                    <div class="offcanvas-header bg-light">
                                        <span class="h5 mb-0 d-none"><?php esc_html_e('Menu', 'bootscore'); ?></span>
                                        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"
                                            aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
                                    </div>
                                    <div class="offcanvas-body">
                                        <!-- Bootstrap 5 Nav Walker Main Menu -->
                                        <?php
                                            wp_nav_menu(array(
                                            'theme_location' => 'main-menu',
                                            'container' => false,
                                            'menu_class' => '',
                                            'fallback_cb' => '__return_false',
                                            'items_wrap' => '<ul id="bootscore-navbar" class="navbar-nav mx-3  %2$s">%3$s</ul>',
                                            'depth' => 2,
                                            'walker' => new bootstrap_5_wp_nav_menu_walker()
                                            ));
                                            ?>
                                        <!-- Bootstrap 5 Nav Walker Main Menu End -->
                                    </div>
                                </div>

                                <div class="header-actions d-flex align-items-center">

                                    <!-- Top Nav Widget -->
                                    <div class="top-nav-widget">
                                        <?php if (is_active_sidebar('top-nav')) : ?>
                                        <div>
                                            <?php dynamic_sidebar('top-nav'); ?>
                                        </div>
                                        <?php endif; ?>
                                    </div>

                                    <!-- Searchform Large -->
                                    <div class="d-none d-lg-block ms-1 ms-md-2 top-nav-search-lg">
                                        <?php if (is_active_sidebar('top-nav-search')) : ?>
                                        <div>
                                            <?php dynamic_sidebar('top-nav-search'); ?>
                                        </div>
                                        <?php endif; ?>
                                    </div>

                                    <!-- Search Toggler Mobile -->
                                    <button class="btn btn-outline-secondary d-lg-none ms-1 ms-md-2 top-nav-search-md"
                                        type="button" data-bs-toggle="collapse" data-bs-target="#collapse-search"
                                        aria-expanded="false" aria-controls="collapse-search">
                                        <i class="fa-solid fa-magnifying-glass"></i><span
                                            class="visually-hidden-focusable">Search</span>
                                    </button>

                                    <!-- Navbar Toggler -->
                                    <button class="btn btn-outline-secondary d-lg-none ms-1 ms-md-2" type="button"
                                        data-bs-toggle="offcanvas" data-bs-target="#offcanvas-navbar"
                                        aria-controls="offcanvas-navbar">
                                        <i class="fa-solid fa-bars"></i><span class="visually-hidden-focusable">Menu</span>
                                    </button>

                                </div><!-- .header-actions -->

                            </div>

                            </nav>
                                <div class="site-header__util position-absolute top-0 end-0">
                                <?php if(is_user_logged_in(  )):?>
                                    <a href="<?php echo esc_url(site_url('/gallery' ) ) ?>" class="btn btn-primary  me-3">Gallery</a>
                                    <a href="<?php echo wp_logout_url(home_url( )); ?>" class="btn btn-primary  me-3">Log Out</a>
                                <?php else:?>
                                <a href="<?php echo wp_login_url();?>" class="btn btn-primary  me-3">Login</a>
                                <a href="<?php echo wp_registration_url();?>" class="btn btn-primary  me-3">Sign Up</a>
                                <?php endif; ?>
                                </div>

                                <!-- Top Nav Search Mobile Collapse -->
                                <div class="collapse container d-lg-none" id="collapse-search">
                                <?php if (is_active_sidebar('top-nav-search')) : ?>
                                <div class="mb-2">
                                    <?php dynamic_sidebar('top-nav-search'); ?>
                                </div>
                                <?php endif; ?>
                                </div>
                </div>
            </div>
        </header>