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
                var img_url = response.media_details.sizes.thumbnail.source_url;           
                
                $.ajax({
                    url: `${siteData.root_url}/wp-json/wp/v2/gallery/${thisGallery.data("id")}`,
                    method: 'GET',
                    dataType: 'json',
                    success: (response)=>{
                        var galleryData = response;
                        // add image to gallery data
                        galleryData.acf.gallery.push(imgId);
                        console.log(galleryData)
                        // update the gallery with the modified data
                        $.ajax({
                            beforeSend: (xhr)=>{
                                xhr.setRequestHeader('X-WP-NONCE', siteData.nonce);
                            },
                            url: `${siteData.root_url}/wp-json/wp/v2/gallery/${thisGallery.data("id")}`,
                            method: 'PUT',
                            dataType: 'json',
                            data: JSON.stringify(galleryData),
                            contentType: 'application/json',
                            success: (response)=>{
                                $('#formFile').val('');
                                $(`
                                <div class="gallery-wrap  " data-id="${response.id}" data-imgId="${imgId}">
                                    <a class="item-img text-center" href="${img_url}">
                                        <img class="img-thumbnail" src="${img_url}" />
                                    </a>
                                    <span class="btn btn-danger delete-item  rounded-circle"><i class="fa-solid fa-trash-can " aria-hidden="true"></i></span>
                                </div>
                                `).apendTo('#gallery-'+response.id).hide().slideDown();
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
                
                var img_url = response.media_details.sizes.thumbnail.source_url; 
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
                   $(`
                    <h3 class="mb-3">${response.title.rendered}</h3>
                    <div class="container">
                        <div class="row">
                            <label for="formFile" class="form-label mb-0">Add to ${response.title.rendered} gallery</label>
                            <form class="mb-3 form-wrap row g-3 mt-0" data-id="${response.id}">
                            <div class="col-auto">
                                <input class="form-control d-inline-block" type="file" id="formFile"> 
                            </div>
                            <div class="col-auto">
                                <span class="btn btn-success upload-item"><i class="fa fa-pencil me-2" aria-hidden="true"></i>Upload</span></div>
                                    
                            </form>
                        </div>
                    </div>
                    <div class="container">
                        <div class="row gallery border border-2 rounded p-5" id="gallery-${response.id}">
                        <div class="gallery-wrap  " data-id="${response.id}" data-imgId="${imgId}">
                            <a class="item-img text-center" href="${img_url}">
                                <img class="img-thumbnail" src="${img_url}"  />
                            </a>
                            <span class="btn btn-danger delete-item  rounded-circle"><i class="fa-solid fa-trash-can " aria-hidden="true"></i></span>
                        </div>
                        </div>
                    </div>
                                       
                   `).prependTo('#galleries').hide().slideDown();
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