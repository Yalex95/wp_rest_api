<?php

// style and scripts
add_action('wp_enqueue_scripts', 'bootscore_child_enqueue_styles');
function bootscore_child_enqueue_styles() {
  // style.css
  wp_enqueue_style('parent-style', get_template_directory_uri() . '/style.css');

  // Compiled main.css
  $modified_bootscoreChildCss = date('YmdHi', filemtime(get_stylesheet_directory() . '/css/main.css'));
  wp_enqueue_style('main', get_stylesheet_directory_uri() . '/css/main.css', array('parent-style'), $modified_bootscoreChildCss);

  // custom.js
  wp_enqueue_script('custom-js', get_stylesheet_directory_uri() . '/js/custom.js', false, '', true);
  wp_enqueue_script('index', get_theme_file_uri('/build/index.js'), array('jquery'), '1.0', true);
  
  // export data
  $var= array(
    'root_url' => get_site_url( ), // site url
    'nonce' => wp_create_nonce( 'wp_rest' )
  );

  wp_localize_script( 'index', 'siteData', $var );
}


//  REdirect subscriber account out of admin and onto home page
add_action( 'admin_init', 'redirectSubsToFrontend' );

function redirectSubsToFrontend(){
  $currentUser = wp_get_current_user(  );

  if(count($currentUser->roles)==1 and $currentUser->roles[0] == 'subscriber'){
    wp_redirect( home_url() );
    exit;
  }
}
// 
add_action( 'wp_loaded', 'noSubsAdminBar' );

function noSubsAdminBar(){
  $currentUser = wp_get_current_user(  );

  if(count($currentUser->roles)==1 and $currentUser->roles[0] == 'subscriber'){
    show_admin_bar( false );
  }
}
// Formce Gallery Post to be private
add_filter('wp_insert_post_data','makeGalleryPrivate');
function makeGalleryPrivate($data){
  if($data['post_type'] == 'note'){
    $data['post_title'] = sanitize_text_field( $data['post_title'] );
    
  }
  if($data['post_type'] == 'gallery' AND $data['post_status'] != 'trash'){
    $data['post_status'] = 'private';
  }
  return $data;
}


