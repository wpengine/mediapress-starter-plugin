/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "@wordpress/core-data"
/*!**********************************!*\
  !*** external ["wp","coreData"] ***!
  \**********************************/
(module) {

module.exports = window["wp"]["coreData"];

/***/ },

/***/ "@wordpress/data"
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["data"];

/***/ },

/***/ "@wordpress/dom-ready"
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
(module) {

module.exports = window["wp"]["domReady"];

/***/ },

/***/ "@wordpress/editor"
/*!********************************!*\
  !*** external ["wp","editor"] ***!
  \********************************/
(module) {

module.exports = window["wp"]["editor"];

/***/ },

/***/ "@wordpress/hooks"
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
(module) {

module.exports = window["wp"]["hooks"];

/***/ }

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
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/editor */ "@wordpress/editor");
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_4__);





const TAXONOMY_SLUG = 'workflow_status';
const COMMENT_TYPE = 'mediapress_review';
_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default()(() => {
  (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__.addAction)('mediaPressReviews.reviewAdded', 'mediaPress/starterPlugin/updateWordflowStatusAfterReview', updateWorkflowStatusAfterReview);
});

/**
 * Custom checklist check: block publishing if there are no approved reviews.
 *
 * Queries all top-level reviews for the current post and checks if at least
 * one has an 'approved' review status.
 */
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__.addFilter)('mediaPress.checklist.item', 'mediaPress/starterPlugin/checkApprovedReview', item => {
  if (item.name !== 'has_approved_review') {
    return item;
  }
  const postId = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.select)(_wordpress_editor__WEBPACK_IMPORTED_MODULE_3__.store).getCurrentPostId();
  const reviews = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.select)(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_4__.store).getEntityRecords('root', 'comment', {
    post: postId,
    type: COMMENT_TYPE,
    per_page: -1,
    parent: 0
  });

  // If reviews haven't loaded yet, show as blocking until resolved.
  if (!reviews) {
    return {
      ...item,
      status: 'BLOCKING',
      message: 'Checking for approved reviews…'
    };
  }
  const approvedReviews = reviews.filter(r => r.mediapress_reviews_last_updated === 'approved');
  if (approvedReviews.length === 0) {
    return {
      ...item,
      status: 'BLOCKING',
      message: 'Must have at least one approved review'
    };
  }
  return {
    ...item,
    status: 'COMPLETED',
    message: 'Has at least one approved review'
  };
});

/**
 * Update the workflow status after a review is added.
 *
 * If the review is rejected, set the workflow status to 'requires-changes'.
 * If all top-level reviews are approved, set the workflow status to 'ready'.
 *
 * @param {Object} review The review comment object.
 */
async function updateWorkflowStatusAfterReview(review) {
  const reviewStatus = review.meta.review_status;
  if (reviewStatus === 'rejected') {
    await setWorkflowStatusBySlug('requires-changes');
    return;
  }

  // Get all top-level reviews for this post.
  const postId = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.select)(_wordpress_editor__WEBPACK_IMPORTED_MODULE_3__.store).getCurrentPostId();
  const reviews = await (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.select)(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_4__.store).getEntityRecords('root', 'comment', {
    post: postId,
    type: COMMENT_TYPE,
    per_page: -1,
    parent: 0
  });
  if (!reviews || reviews.length === 0) {
    return;
  }

  // Check if all top-level reviews are approved.
  const allApproved = reviews.every(r => r.meta.latest_review_status === 'approved');
  if (allApproved) {
    setWorkflowStatusBySlug('approved');
  }
  return;
}

/**
 * Set the workflow status by term slug.
 *
 * Looks up the workflow_status taxonomy term by slug and stages the change
 * via editPost() so it appears immediately in the editor UI.
 *
 * @param {string} slug The workflow status term slug.
 */
async function setWorkflowStatusBySlug(slug) {
  const terms = await (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.resolveSelect)(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_4__.store).getEntityRecords('taxonomy', TAXONOMY_SLUG, {
    per_page: 100,
    slug
  });
  console.log(terms);
  if (!terms || terms.length === 0) {
    return;
  }
  const term = terms[0];
  (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.dispatch)(_wordpress_editor__WEBPACK_IMPORTED_MODULE_3__.store).editPost({
    [TAXONOMY_SLUG]: [term.id]
  });
}
})();

/******/ })()
;
//# sourceMappingURL=index.js.map