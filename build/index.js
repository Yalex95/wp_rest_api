/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/gallery.js":
/*!********************************!*\
  !*** ./src/modules/gallery.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

class Gallery {
  constructor() {
    this.events();
  }
  events() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(".delete-item").on("click", this.deleteItem.bind(this));
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.upload-item').on('click', this.UploadItem.bind(this));
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.create-item').on('click', this.createGallery.bind(this));
  }

  // Methods
  deleteItem(e) {
    var thisGallery = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parents('.gallery-wrap');
    var thisItem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parents('.gallery-wrap');
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      url: `${siteData.root_url}/wp-json/wp/v2/gallery/${thisGallery.data("id")}`,
      method: 'GET',
      dataType: 'json',
      success: response => {
        var galleryData = response;
        galleryData.acf.gallery = galleryData.acf.gallery.filter(function (item) {
          return item !== thisItem.data('imgid');
        });
        // Update the gallery with the modified data                 
        jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
          beforeSend: xhr => {
            xhr.setRequestHeader("X-WP-NONCE", siteData.nonce);
          },
          url: `${siteData.root_url}/wp-json/wp/v2/gallery/${thisGallery.data("id")}`,
          method: 'PUT',
          dataType: 'json',
          data: JSON.stringify(galleryData),
          contentType: 'application/json',
          success: response => {
            // remove 
            thisItem.fadeOut();
            console.log("Removed succesfully: " + response);
          },
          error: error => {
            console.log("error: " + error);
          }
        });
      },
      error: error => {
        console.log('Error:');
        console.log(error);
      }
    });
  }
  UploadItem(e) {
    var thisGallery = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parents('.form-wrap');
    // thisGallery.data("id")

    let imgFile = document.getElementById('formFile').files[0];
    // Create a FormData object and append the image file
    var formData = new FormData();
    formData.append('file', imgFile);

    //Make the AJAX request to upload the image
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      url: `${siteData.root_url}/wp-json/wp/v2/media`,
      method: 'POST',
      processData: false,
      contentType: false,
      data: formData,
      beforeSend: xhr => {
        xhr.setRequestHeader('X-WP-Nonce', siteData.nonce);
      },
      success: response => {
        var imgId = response.id;
        var img_url = response.media_details.sizes.thumbnail.source_url;
        jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
          url: `${siteData.root_url}/wp-json/wp/v2/gallery/${thisGallery.data("id")}`,
          method: 'GET',
          dataType: 'json',
          success: response => {
            var galleryData = response;
            // add image to gallery data
            galleryData.acf.gallery.push(imgId);
            console.log(galleryData);
            // update the gallery with the modified data
            jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
              beforeSend: xhr => {
                xhr.setRequestHeader('X-WP-NONCE', siteData.nonce);
              },
              url: `${siteData.root_url}/wp-json/wp/v2/gallery/${thisGallery.data("id")}`,
              method: 'PUT',
              dataType: 'json',
              data: JSON.stringify(galleryData),
              contentType: 'application/json',
              success: response => {
                jquery__WEBPACK_IMPORTED_MODULE_0___default()('#formFile').val('');
                jquery__WEBPACK_IMPORTED_MODULE_0___default()(`
                                <div class="gallery-wrap  " data-id="${response.id}" data-imgId="${imgId}">
                                    <a class="item-img text-center" href="${img_url}">
                                        <img class="img-thumbnail" src="${img_url}" />
                                    </a>
                                    <span class="btn btn-danger delete-item  rounded-circle"><i class="fa-solid fa-trash-can " aria-hidden="true"></i></span>
                                </div>
                                `).apendTo('#gallery-' + response.id).hide().slideDown();
              },
              error: error => {
                console.log("Error uploading to gallery:" + error);
              }
            });
          },
          error: error => {
            console.log("Error uploading media:" + error);
          }
        });
      },
      error: () => {}
    });
  }
  createGallery(e) {
    let title = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.gallery-title').val();
    let imgFile = document.getElementById('formFileMultiple').files[0];
    // Create a FormData object and append the image file
    var formData = new FormData();
    formData.append('file', imgFile);

    //Make the AJAX request to upload the image
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      url: `${siteData.root_url}/wp-json/wp/v2/media`,
      method: 'POST',
      processData: false,
      contentType: false,
      data: formData,
      beforeSend: xhr => {
        xhr.setRequestHeader('X-WP-Nonce', siteData.nonce);
      },
      success: response => {
        var imgId = response.id;
        var newGallery = {
          title: title,
          status: 'publish',
          content: '',
          acf: {
            gallery: [imgId]
          }
          // 'content': formData
        };

        var img_url = response.media_details.sizes.thumbnail.source_url;
        jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
          beforeSend: xhr => {
            xhr.setRequestHeader('X-WP-Nonce', siteData.nonce);
          },
          url: `${siteData.root_url}/wp-json/wp/v2/gallery/`,
          method: 'POST',
          dataType: 'json',
          data: newGallery,
          success: response => {
            console.log('success' + response);
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(`
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
          error: error => {
            console.log('Error' + error);
          }
        });
      },
      error: error => {
        console.log('ERROR:' + error);
      }
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gallery);

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ ((module) => {

module.exports = window["jQuery"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_gallery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/gallery */ "./src/modules/gallery.js");

const gallery = new _modules_gallery__WEBPACK_IMPORTED_MODULE_0__["default"]();
})();

/******/ })()
;
//# sourceMappingURL=index.js.map