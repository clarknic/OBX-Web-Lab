/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@wordpress/icons/build-module/library/plus.js":
/*!********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/plus.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const plus = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M11 12.5V17.5H12.5V12.5H17.5V11H12.5V6H11V11H6V12.5H11Z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plus);
//# sourceMappingURL=plus.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/quote.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/quote.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const quote = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M13 6v6h5.2v4c0 .8-.2 1.4-.5 1.7-.6.6-1.6.6-2.5.5h-.3v1.5h.5c1 0 2.3-.1 3.3-1 .6-.6 1-1.6 1-2.8V6H13zm-9 6h5.2v4c0 .8-.2 1.4-.5 1.7-.6.6-1.6.6-2.5.5h-.3v1.5h.5c1 0 2.3-.1 3.3-1 .6-.6 1-1.6 1-2.8V6H4v6z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (quote);
//# sourceMappingURL=quote.js.map

/***/ }),

/***/ "./src/blocks/about/block.json":
/*!*************************************!*\
  !*** ./src/blocks/about/block.json ***!
  \*************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"obx-blocks/about","version":"1.0.0","title":"About Us","category":"obx-blocks","icon":"groups","description":"Display your team members with images, names, positions, descriptions, and quotes.","supports":{"html":false,"align":["wide","full"],"anchor":true},"attributes":{"anchor":{"type":"string","default":""},"tagline":{"type":"string","default":""},"heading":{"type":"string","default":""},"introText":{"type":"string","default":""},"teamMembers":{"type":"array","default":[]},"align":{"type":"string","default":"full"},"backgroundColor":{"type":"string","default":"#ffffff"},"textColor":{"type":"string","default":""},"accentColor":{"type":"string","default":"#a7d1fb"},"textAlign":{"type":"string","default":"center"},"contentWidth":{"type":"number","default":80}},"textdomain":"obx-blocks","editorScript":"file:./index.js","editorStyle":"file:./editor.css","style":"file:./style-index.css","render":"file:./render.php"}');

/***/ }),

/***/ "./src/blocks/about/edit.js":
/*!**********************************!*\
  !*** ./src/blocks/about/edit.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/quote.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/plus.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor.scss */ "./src/blocks/about/editor.scss");

/**
 * WordPress dependencies
 */






/**
 * Internal dependencies
 */


/**
 * Edit function for the About Us block
 */
function Edit({
  attributes,
  setAttributes
}) {
  const {
    tagline,
    heading,
    introText,
    teamMembers,
    backgroundColor,
    textColor,
    accentColor,
    align,
    textAlign
  } = attributes;
  const [activeMember, setActiveMember] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(null);
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)({
    className: `obx-about align${align || 'none'} text-${textAlign || 'center'}`,
    style: {
      backgroundColor,
      color: textColor
    }
  });
  const addTeamMember = () => {
    const newMembers = [...teamMembers];
    newMembers.push({
      id: `member-${Date.now()}`,
      imageUrl: '',
      imageId: 0,
      imageAlt: '',
      name: '',
      position: '',
      description: '',
      quote: ''
    });
    setAttributes({
      teamMembers: newMembers
    });
  };
  const removeTeamMember = index => {
    const newMembers = [...teamMembers];
    newMembers.splice(index, 1);
    setAttributes({
      teamMembers: newMembers
    });
    setActiveMember(null);
  };
  const updateTeamMember = (index, property, value) => {
    const newMembers = [...teamMembers];
    newMembers[index] = {
      ...newMembers[index],
      [property]: value
    };
    setAttributes({
      teamMembers: newMembers
    });
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.BlockControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.BlockAlignmentToolbar, {
    value: align,
    onChange: newAlign => setAttributes({
      align: newAlign
    }),
    controls: ['wide', 'full']
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.AlignmentToolbar, {
    value: textAlign,
    onChange: newAlign => setAttributes({
      textAlign: newAlign
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('About Us Settings', 'obx-blocks')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "components-base-control"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "components-base-control__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background Color', 'obx-blocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.ColorPalette, {
    value: backgroundColor,
    onChange: color => setAttributes({
      backgroundColor: color
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "components-base-control"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "components-base-control__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Text Color', 'obx-blocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.ColorPalette, {
    value: textColor,
    onChange: color => setAttributes({
      textColor: color
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "components-base-control"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "components-base-control__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Accent Color', 'obx-blocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.ColorPalette, {
    value: accentColor,
    onChange: color => setAttributes({
      accentColor: color
    })
  })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...blockProps
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "obx-about__container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "obx-about__header",
    style: {
      textAlign
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText, {
    tagName: "div",
    className: "obx-about__tagline",
    value: tagline,
    onChange: value => setAttributes({
      tagline: value
    }),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('OUR TEAM', 'obx-blocks')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText, {
    tagName: "h2",
    className: "obx-about__heading",
    value: heading,
    onChange: value => setAttributes({
      heading: value
    }),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Meet the people behind our success', 'obx-blocks'),
    style: {
      backgroundImage: accentColor ? `linear-gradient(transparent 60%, ${accentColor} 60%)` : 'none'
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText, {
    tagName: "div",
    className: "obx-about__intro-text",
    value: introText,
    onChange: value => setAttributes({
      introText: value
    }),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add an introduction about your team or company...', 'obx-blocks'),
    allowedFormats: ['core/bold', 'core/italic', 'core/link']
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "obx-about__team"
  }, teamMembers.map((member, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: member.id,
    className: `obx-about__member ${activeMember === index ? 'is-selected' : ''}`,
    onClick: () => setActiveMember(index)
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "obx-about__member-image-container"
  }, member.imageUrl ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: member.imageUrl,
    alt: member.imageAlt,
    className: "obx-about__member-image"
  }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "obx-about__member-image-placeholder"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUploadCheck, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUpload, {
    onSelect: media => {
      updateTeamMember(index, 'imageUrl', media.url);
      updateTeamMember(index, 'imageId', media.id);
      updateTeamMember(index, 'imageAlt', media.alt || '');
    },
    allowedTypes: ['image'],
    value: member.imageId,
    render: ({
      open
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
      onClick: open,
      className: "obx-about__member-image-button"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add Image', 'obx-blocks'))
  }))), member.imageUrl && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "obx-about__member-image-actions"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUploadCheck, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUpload, {
    onSelect: media => {
      updateTeamMember(index, 'imageUrl', media.url);
      updateTeamMember(index, 'imageId', media.id);
      updateTeamMember(index, 'imageAlt', media.alt || '');
    },
    allowedTypes: ['image'],
    value: member.imageId,
    render: ({
      open
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
      onClick: open,
      variant: "secondary",
      isSmall: true
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Replace', 'obx-blocks'))
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    onClick: () => {
      updateTeamMember(index, 'imageUrl', '');
      updateTeamMember(index, 'imageId', 0);
      updateTeamMember(index, 'imageAlt', '');
    },
    variant: "secondary",
    isSmall: true,
    isDestructive: true
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Remove', 'obx-blocks')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "obx-about__member-content"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText, {
    tagName: "h3",
    className: "obx-about__member-name",
    value: member.name,
    onChange: value => updateTeamMember(index, 'name', value),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Team Member Name', 'obx-blocks'),
    allowedFormats: ['core/bold', 'core/italic']
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText, {
    tagName: "div",
    className: "obx-about__member-position",
    value: member.position,
    onChange: value => updateTeamMember(index, 'position', value),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Position', 'obx-blocks'),
    allowedFormats: ['core/bold', 'core/italic']
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText, {
    tagName: "div",
    className: "obx-about__member-description",
    value: member.description,
    onChange: value => updateTeamMember(index, 'description', value),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Short description...', 'obx-blocks'),
    allowedFormats: ['core/bold', 'core/italic', 'core/link']
  }), member.quote && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "obx-about__member-quote-container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "obx-about__member-quote-icon",
    style: {
      color: accentColor
    }
  }, _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__["default"]), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText, {
    tagName: "div",
    className: "obx-about__member-quote",
    value: member.quote,
    onChange: value => updateTeamMember(index, 'quote', value),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Personal quote...', 'obx-blocks'),
    allowedFormats: ['core/bold', 'core/italic']
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "obx-about__member-actions"
  }, !member.quote && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    variant: "secondary",
    onClick: e => {
      e.stopPropagation();
      updateTeamMember(index, 'quote', '');
    },
    className: "obx-about__member-add-quote",
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__["default"]
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add Quote', 'obx-blocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    isDestructive: true,
    onClick: e => {
      e.stopPropagation();
      removeTeamMember(index);
    },
    className: "obx-about__member-remove"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Remove Member', 'obx-blocks')))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    className: "obx-about__add-button",
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__["default"],
    onClick: addTeamMember
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add Team Member', 'obx-blocks'))))));
}

/***/ }),

/***/ "./src/blocks/about/editor.scss":
/*!**************************************!*\
  !*** ./src/blocks/about/editor.scss ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/blocks/about/index.js":
/*!***********************************!*\
  !*** ./src/blocks/about/index.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit */ "./src/blocks/about/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block.json */ "./src/blocks/about/block.json");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ "./src/blocks/about/style.scss");
/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */




/**
 * Register the block
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_2__.name, {
  edit: _edit__WEBPACK_IMPORTED_MODULE_1__["default"],
  save: () => null // Server-side rendering with render.php
});

/***/ }),

/***/ "./src/blocks/about/style.scss":
/*!*************************************!*\
  !*** ./src/blocks/about/style.scss ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/primitives":
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["primitives"];

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"blocks/about/index": 0,
/******/ 			"blocks/about/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkobx_blocks"] = globalThis["webpackChunkobx_blocks"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["blocks/about/style-index"], () => (__webpack_require__("./src/blocks/about/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map