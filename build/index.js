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
        jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
          url: `${siteData.root_url}/wp-json/wp/v2/gallery/${thisGallery.data("id")}`,
          method: 'GET',
          dataType: 'json',
          success: response => {
            console.log('added to the gallery');
            var galleryData = response;
            // add image to gallery data
            galleryData.acf.gallery.push(imgId);
            // update the gallery with the modified data
            jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
              url: `${siteData.root_url}/wp-json/wp/v2/gallery/${thisGallery.data("id")}`,
              method: 'PUT',
              dataType: 'json',
              data: JSON.stringify(galleryData),
              contentType: 'application/json',
              beforeSend: xhr => {
                xhr.setRequestHeader('X-WP-Nonce', siteData.nonce);
              },
              success: response => {
                console.log('added to gallery');
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