import $ from 'jquery';
class Gallery{

    constructor(){
        this.events();
    }
    
    events(){
        $(".delete-item").on("click",this.deleteItem.bind(this));
        $('.upload-item').on('click',this.UploadItem.bind(this));
        $('.create-item').on('click',this.createGallery.bind(this));
    }

    // Methods
    deleteItem(e){
        var thisGallery = $(e.target).parents('.gallery-wrap');
        var thisItem = $(e.target).parents('.gallery-wrap');
        $.ajax({
            url: `${siteData.root_url}/wp-json/wp/v2/gallery/${thisGallery.data("id")}`,
            method: 'GET',
            dataType: 'json',
            success: (response) =>{

                var galleryData = response;
                
                galleryData.acf.gallery = galleryData.acf.gallery.filter(function(item) {
                    return item !== thisItem.data('imgid');
                  });
                  // Update the gallery with the modified data                 
                  $.ajax({
                    beforeSend: (xhr)=>{
                        xhr.setRequestHeader("X-WP-NONCE",siteData.nonce)
                    },
                    url:`${siteData.root_url}/wp-json/wp/v2/gallery/${thisGallery.data("id")}`,
                    method: 'PUT',
                    dataType: 'json',
                    data: JSON.stringify(galleryData),
                    contentType: 'application/json',
                    success: (response)=>{
                        // remove 
                        thisItem.fadeOut();
                        console.log("Removed succesfully: "+response);
                    },
                    error: (error)=>{
                        console.log("error: "+error)
                    }
                  });
            },
            error: (error) => {
                console.log('Error:')
                console.log(error);
            }
        });
    }

    UploadItem(e){
        
        var thisGallery = $(e.target).parents('.form-wrap');
        // thisGallery.data("id")

        let imgFile = document.getElementById('formFile').files[0];
        // Create a FormData object and append the image file
        var formData = new FormData();
        formData.append('file', imgFile);

        //Make the AJAX request to upload the image
        $.ajax({
            url: `${siteData.root_url}/wp-json/wp/v2/media`,
            method: 'POST',
            processData: false,
            contentType: false,
            data: formData,
            beforeSend: (xhr)=>{
                xhr.setRequestHeader('X-WP-Nonce', siteData.nonce );
            },
            success: (response)=>{
                var imgId = response.id;               
                
                $.ajax({
                    url: `${siteData.root_url}/wp-json/wp/v2/gallery/${thisGallery.data("id")}`,
                    method: 'GET',
                    dataType: 'json',
                    success: (response)=>{
                        console.log('added to the gallery');
                        var galleryData = response;
                        // add image to gallery data
                        galleryData.acf.gallery.push(imgId);
                        // update the gallery with the modified data
                        $.ajax({
                            url: `${siteData.root_url}/wp-json/wp/v2/gallery/${thisGallery.data("id")}`,
                            method: 'PUT',
                            dataType: 'json',
                            data: JSON.stringify(galleryData),
                            contentType: 'application/json',
                            beforeSend: (xhr)=>{
                                xhr.setRequestHeader('X-WP-Nonce', siteData.nonce);
                            },
                            success: (response)=>{
                                console.log('added to gallery');
                            },
                            error: (error)=>{
                                console.log("Error uploading to gallery:"+error)
                            }
                        })
                    },
                    error: (error)=>{
                        console.log("Error uploading media:"+error)
                    }
                });

            },
            error: ()=>{

            }

        });
    }

    createGallery(e){
        let title = $('.gallery-title').val();
        let imgFile = document.getElementById('formFileMultiple').files[0];
        // Create a FormData object and append the image file
        var formData = new FormData();
        formData.append('file', imgFile);
        
        //Make the AJAX request to upload the image
        $.ajax({
            url: `${siteData.root_url}/wp-json/wp/v2/media`,
            method: 'POST',
            processData: false,
            contentType: false,
            data: formData,
            beforeSend: (xhr)=>{
                xhr.setRequestHeader('X-WP-Nonce', siteData.nonce );
            },
            success: (response)=>{
                var imgId = response.id;               
                var newGallery = {
                    title : title,
                    status: 'publish',
                    content: '',
                    acf: {gallery:[imgId] }
                    // 'content': formData
                }
            $.ajax({
                beforeSend: (xhr)=>{
                    xhr.setRequestHeader('X-WP-Nonce', siteData.nonce);
                },
                url: `${siteData.root_url}/wp-json/wp/v2/gallery/`,
                method: 'POST',
                dataType: 'json',
                data: newGallery,
                success: (response)=>{
                   console.log('success'+ response)
                },
                error: (error)=>{
                    console.log('Error'+error)
                }
            });
    },
    error: (error)=>{
        console.log('ERROR:'+error);
    }
});


    }
}
export default Gallery;