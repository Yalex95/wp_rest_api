<?php
/**
* Template Name: Gallery Template
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Bootscore
*/
if(!is_user_logged_in(  )):
    wp_redirect( esc_url( site_url( '/' ) ) );
    exit;
endif;
get_header();
?>
<?php  ?>
<div id="content" class="site-content">
    <div id="primary" class="content-area">

        <!-- Hook to add something nice -->
        <?php bs_after_primary(); ?>
        
        <main id="main" class="site-main">
            <div class="entry-content pt-5">
                <div class="container mt-5">
                    <div class="row mb-5">
                            <h3>Create a New Gallery</h3>
                            <form action="" class="row g-3 mt-0">
                                <div class="col-auto">
                                    <input placeholder="Gallery Title Here" type="text" class="gallery-title  form-control">
                                </div>
                                <div class="col-auto">
                                     <input class="form-control " type="file" id="formFileMultiple" >
                                </div>
                                <div class="col-auto">
                                     <span class="btn btn-success create-item ">OK</span>
                                </div>
                            </form>  
                    </div>
                    <div class="row">
                        <div class="col-12" id="galleries">
                            <?php 
                            $userGallery = new WP_Query(array(
                                'post_type' => 'gallery',
                                'post_per_page' => -1,
                                'author' => get_current_user_id(  )
                            ));

                            while ($userGallery -> have_posts(  )) {
                                $userGallery ->the_post();
                                $images = get_field('gallery');
                                
                                if(!empty($images)):
                                ?>
                                <h3 class="mb-3"><?php the_title(); ?></h3>
                                <div class="container">
                                    <div class="row">
                                        <label for="formFile" class="form-label mb-0">Add to <?php the_title(); ?> gallery</label>
                                        <form class="mb-3 form-wrap row g-3 mt-0" data-id="<?php the_ID(  ); ?>">
                                        <div class="col-auto">
                                            <input class="form-control d-inline-block" type="file" id="formFile"> 
                                        </div>
                                        <div class="col-auto">
                                            <span class="btn btn-success upload-item"><i class="fa fa-pencil me-2" aria-hidden="true"></i>Upload</span></div>
                                                
                                        </form>
                                    </div>
                                </div>
                                <div class="container">
                                    <div class="row gallery border border-2 rounded p-5" id="gallery-<?php the_ID(  ); ?>">
                                        <?php foreach( $images as $image ): ?>
                                            <div class="gallery-wrap  " data-id="<?php the_ID( ); ?>" data-imgId="<?php  echo $image['ID']; ?>">
                                                <a class="item-img text-center" href="<?php echo esc_url($image['url']); ?>">
                                                    <img class="img-thumbnail" src="<?php echo esc_url($image['sizes']['thumbnail']); ?>" alt="<?php echo esc_attr($image['alt']); ?>" />
                                                </a>
                                                <span class="btn btn-danger delete-item  rounded-circle"><i class="fa-solid fa-trash-can " aria-hidden="true"></i></span>
                                            </div>
                                        <?php endforeach; ?>
                                    </div>
                                </div>
                                <?php
                                endif;
                            }
                            ?>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</div>
<?php 
get_footer();
?>