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

/***/ "./src/blocks/portfolio/block.json":
/*!*****************************************!*\
  !*** ./src/blocks/portfolio/block.json ***!
  \*****************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"obx-blocks/portfolio","version":"1.0.0","title":"Portfolio","category":"obx-blocks","icon":"portfolio","description":"Display your portfolio items with images, names, and descriptions.","supports":{"html":false,"align":["wide","full"],"anchor":true},"attributes":{"anchor":{"type":"string","default":""},"tagline":{"type":"string","default":""},"heading":{"type":"string","default":""},"portfolioItems":{"type":"array","default":[],"items":{"type":"object","properties":{"id":{"type":"string"},"imageUrl":{"type":"string"},"imageId":{"type":"number"},"imageAlt":{"type":"string"},"name":{"type":"string"},"description":{"type":"string"}}}},"align":{"type":"string","default":"full"},"backgroundColor":{"type":"string","default":"#ffffff"},"textColor":{"type":"string","default":""},"accentColor":{"type":"string","default":"#a7d1fb"},"textAlign":{"type":"string","default":"center"},"contentWidth":{"type":"number","default":80}},"textdomain":"obx-blocks","editorScript":"file:./index.js","editorStyle":"file:./editor.css","style":"file:./style-index.css","render":"file:./render.php"}');

/***/ }),

/***/ "./src/blocks/portfolio/edit.js":
/*!**************************************!*\
  !*** ./src/blocks/portfolio/edit.js ***!
  \**************************************/
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
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/plus.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor.scss */ "./src/blocks/portfolio/editor.scss");

/**
 * WordPress dependencies
 */






/**
 * Internal dependencies
 */


/**
 * Edit function for the Portfolio block
 */
function Edit({
  attributes,
  setAttributes
}) {
  const {
    tagline,
    heading,
    portfolioItems,
    backgroundColor,
    textColor,
    accentColor,
    align,
    textAlign,
    contentWidth,
    anchor
  } = attributes;
  const [isAddingItem, setIsAddingItem] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
  const [editingItemId, setEditingItemId] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(null);
  const [newItem, setNewItem] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)({
    id: '',
    imageUrl: '',
    imageId: 0,
    imageAlt: '',
    name: '',
    description: ''
  });
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)({
    className: `obx-portfolio align${align || 'none'} text-${textAlign || 'center'}`,
    style: {
      backgroundColor,
      color: textColor
    }
  });
  const addPortfolioItem = () => {
    const newItems = [...portfolioItems, {
      id: `portfolio-${portfolioItems.length + 1}`,
      imageUrl: '',
      imageId: 0,
      imageAlt: '',
      name: '',
      description: ''
    }];
    setAttributes({
      portfolioItems: newItems
    });
    setIsAddingItem(true);
    setEditingItemId(newItems[newItems.length - 1].id);
    setNewItem(newItems[newItems.length - 1]);
  };
  const removePortfolioItem = itemId => {
    const updatedItems = portfolioItems.filter(item => item.id !== itemId);
    setAttributes({
      portfolioItems: updatedItems
    });
    if (editingItemId === itemId) {
      setIsAddingItem(false);
      setEditingItemId(null);
      setNewItem({
        id: '',
        imageUrl: '',
        imageId: 0,
        imageAlt: '',
        name: '',
        description: ''
      });
    }
  };
  const updatePortfolioItem = (itemId, field, value) => {
    const updatedItems = portfolioItems.map(item => {
      if (item.id === itemId) {
        if (field === 'image') {
          return {
            ...item,
            imageUrl: value ? value.url : '',
            imageId: value ? value.id : 0,
            imageAlt: value ? value.alt : ''
          };
        }
        return {
          ...item,
          [field]: value
        };
      }
      return item;
    });
    setAttributes({
      portfolioItems: updatedItems
    });
  };
  const editPortfolioItem = item => {
    setIsAddingItem(true);
    setEditingItemId(item.id);
    setNewItem(item);
  };
  const savePortfolioItem = () => {
    const updatedItems = portfolioItems.map(item => {
      if (item.id === editingItemId) {
        return newItem;
      }
      return item;
    });
    setAttributes({
      portfolioItems: updatedItems
    });
    setIsAddingItem(false);
    setEditingItemId(null);
    setNewItem({
      id: '',
      imageUrl: '',
      imageId: 0,
      imageAlt: '',
      name: '',
      description: ''
    });
  };
  const cancelEdit = () => {
    setIsAddingItem(false);
    setEditingItemId(null);
    setNewItem({
      id: '',
      imageUrl: '',
      imageId: 0,
      imageAlt: '',
      name: '',
      description: ''
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
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Portfolio Settings', 'obx-blocks')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Tagline', 'obx-blocks'),
    value: tagline,
    onChange: value => setAttributes({
      tagline: value
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Heading', 'obx-blocks'),
    value: heading,
    onChange: value => setAttributes({
      heading: value
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Content Width (%)', 'obx-blocks'),
    value: contentWidth,
    onChange: value => setAttributes({
      contentWidth: value
    }),
    min: 50,
    max: 100,
    step: 5,
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Controls the width of the content container on desktop. Mobile will always be 100%.', 'obx-blocks')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "components-base-control"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "components-base-control__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background Color', 'obx-blocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ColorPicker, {
    color: backgroundColor,
    onChange: value => setAttributes({
      backgroundColor: value
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "components-base-control"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "components-base-control__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Text Color', 'obx-blocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ColorPicker, {
    color: textColor,
    onChange: value => setAttributes({
      textColor: value
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "components-base-control"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "components-base-control__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Accent Color', 'obx-blocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ColorPicker, {
    color: accentColor,
    onChange: value => setAttributes({
      accentColor: value
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "components-base-control"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "components-base-control__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Text Alignment', 'obx-blocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    value: textAlign,
    onChange: e => setAttributes({
      textAlign: e.target.value
    }),
    className: "components-select-control__input"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "left"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Left', 'obx-blocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "center"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Center', 'obx-blocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "right"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Right', 'obx-blocks')))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...blockProps
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "obx-portfolio__container",
    style: {
      maxWidth: `${contentWidth}%`
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "obx-portfolio__header",
    style: {
      textAlign
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText, {
    tagName: "div",
    className: "obx-portfolio__tagline",
    value: tagline,
    onChange: value => setAttributes({
      tagline: value
    }),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enter a section subheading', 'obx-blocks')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText, {
    tagName: "h2",
    className: "obx-portfolio__heading",
    value: heading,
    onChange: value => setAttributes({
      heading: value
    }),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enter a section heading', 'obx-blocks'),
    style: {
      backgroundImage: accentColor ? `linear-gradient(transparent 60%, ${accentColor} 60%)` : 'none'
    }
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "obx-portfolio__items"
  }, portfolioItems.map(item => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: item.id,
    className: "obx-portfolio__item"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "obx-portfolio__item-image-container"
  }, item.imageUrl ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: item.imageUrl,
    alt: item.imageAlt || item.name,
    className: "obx-portfolio__item-image"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "obx-portfolio__item-image-actions"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUploadCheck, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUpload, {
    onSelect: media => {
      updatePortfolioItem(item.id, 'image', media);
    },
    allowedTypes: ['image'],
    value: item.imageId,
    render: ({
      open
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
      onClick: open,
      variant: "secondary",
      isSmall: true
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Replace', 'obx-blocks'))
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    onClick: () => {
      updatePortfolioItem(item.id, 'image', null);
    },
    variant: "secondary",
    isSmall: true,
    isDestructive: true
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Remove', 'obx-blocks')))) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "obx-portfolio__item-image-placeholder"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUploadCheck, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUpload, {
    onSelect: media => {
      updatePortfolioItem(item.id, 'image', media);
    },
    allowedTypes: ['image'],
    value: item.imageId,
    render: ({
      open
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
      onClick: open,
      className: "obx-portfolio__item-image-button",
      icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__["default"]
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add Image', 'obx-blocks'))
  })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "obx-portfolio__item-content"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText, {
    tagName: "h3",
    className: "obx-portfolio__item-name",
    value: item.name,
    onChange: value => updatePortfolioItem(item.id, 'name', value),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Project Name', 'obx-blocks'),
    allowedFormats: ['core/bold', 'core/italic']
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText, {
    tagName: "div",
    className: "obx-portfolio__item-description",
    value: item.description,
    onChange: value => updatePortfolioItem(item.id, 'description', value),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Project description...', 'obx-blocks'),
    allowedFormats: ['core/bold', 'core/italic', 'core/link']
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "obx-portfolio__item-actions"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    isSmall: true,
    onClick: () => editPortfolioItem(item),
    className: "components-button is-secondary"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Edit', 'obx-blocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    isSmall: true,
    onClick: () => removePortfolioItem(item.id),
    className: "components-button is-destructive"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Remove', 'obx-blocks')))))), isAddingItem && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "obx-portfolio__edit-form"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, editingItemId ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Edit Portfolio Item', 'obx-blocks') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add New Portfolio Item', 'obx-blocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "components-base-control"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "components-base-control__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Image', 'obx-blocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "obx-portfolio__image-preview"
  }, newItem.imageUrl ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: newItem.imageUrl,
    alt: newItem.imageAlt || newItem.name,
    className: "obx-portfolio__item-image"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    isDestructive: true,
    onClick: () => setNewItem({
      ...newItem,
      imageUrl: '',
      imageId: 0,
      imageAlt: ''
    }),
    className: "components-button",
    style: {
      marginTop: '10px'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Remove Image', 'obx-blocks'))) : null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUploadCheck, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUpload, {
    onSelect: media => setNewItem({
      ...newItem,
      imageUrl: media.url,
      imageId: media.id,
      imageAlt: media.alt || media.title || ''
    }),
    allowedTypes: ['image'],
    value: newItem.imageId,
    render: ({
      open
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
      onClick: open,
      className: "components-button is-secondary",
      style: {
        marginTop: newItem.imageUrl ? '10px' : 0
      }
    }, newItem.imageUrl ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Change Image', 'obx-blocks') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select Image', 'obx-blocks'))
  })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Name', 'obx-blocks'),
    value: newItem.name,
    onChange: value => setNewItem({
      ...newItem,
      name: value
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextareaControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Description', 'obx-blocks'),
    value: newItem.description,
    onChange: value => setNewItem({
      ...newItem,
      description: value
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "obx-portfolio__form-actions"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    isPrimary: true,
    onClick: savePortfolioItem,
    className: "components-button"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Save', 'obx-blocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    isSecondary: true,
    onClick: cancelEdit,
    className: "components-button"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Cancel', 'obx-blocks')))), !isAddingItem && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    isPrimary: true,
    onClick: addPortfolioItem,
    className: "components-button"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add Portfolio Item', 'obx-blocks'))))));
}

/***/ }),

/***/ "./src/blocks/portfolio/editor.scss":
/*!******************************************!*\
  !*** ./src/blocks/portfolio/editor.scss ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/blocks/portfolio/index.js":
/*!***************************************!*\
  !*** ./src/blocks/portfolio/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit */ "./src/blocks/portfolio/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block.json */ "./src/blocks/portfolio/block.json");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ "./src/blocks/portfolio/style.scss");
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

/***/ "./src/blocks/portfolio/style.scss":
/*!*****************************************!*\
  !*** ./src/blocks/portfolio/style.scss ***!
  \*****************************************/
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
/******/ 			"blocks/portfolio/index": 0,
/******/ 			"blocks/portfolio/style-index": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["blocks/portfolio/style-index"], () => (__webpack_require__("./src/blocks/portfolio/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map