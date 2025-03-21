/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/components/header.js":
/*!*************************************!*\
  !*** ./src/js/components/header.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ initHeader)
/* harmony export */ });
/**
 * Header functionality
 */

function initHeader() {
  var header = document.querySelector('.site-header');
  if (!header) return;
  var lastScrollTop = 0;
  var scrollThreshold = 100; // Adjust this value to control when the floating effect starts

  function handleScroll() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add floating class when scrolled past threshold
    if (scrollTop > scrollThreshold) {
      header.classList.add('is-floating');
    } else {
      header.classList.remove('is-floating');
    }
    lastScrollTop = scrollTop;
  }

  // Initial check
  handleScroll();

  // Add scroll listener
  window.addEventListener('scroll', handleScroll, {
    passive: true
  });
}

/***/ }),

/***/ "./src/js/components/navigation.js":
/*!*****************************************!*\
  !*** ./src/js/components/navigation.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */
var navigation = function navigation() {
  var siteNavigation = document.getElementById('site-navigation');

  // Return early if the navigation doesn't exist.
  if (!siteNavigation) {
    return;
  }
  var button = siteNavigation.querySelector('.menu-toggle');

  // Return early if the button doesn't exist.
  if (!button) {
    return;
  }
  var menu = siteNavigation.getElementsByTagName('ul')[0];

  // Hide menu toggle button if menu is empty and return early.
  if (!menu) {
    button.style.display = 'none';
    return;
  }
  if (!menu.classList.contains('nav-menu')) {
    menu.classList.add('nav-menu');
  }

  // Toggle the .toggled class and the aria-expanded value each time the button is clicked.
  button.addEventListener('click', function () {
    siteNavigation.classList.toggle('toggled');
    if (button.getAttribute('aria-expanded') === 'true') {
      button.setAttribute('aria-expanded', 'false');
    } else {
      button.setAttribute('aria-expanded', 'true');
    }
  });

  // Remove the .toggled class and set aria-expanded to false when the user clicks outside the navigation.
  document.addEventListener('click', function (event) {
    var isClickInside = siteNavigation.contains(event.target);
    if (!isClickInside) {
      siteNavigation.classList.remove('toggled');
      button.setAttribute('aria-expanded', 'false');
    }
  });

  // Get all the link elements within the menu.
  var links = menu.getElementsByTagName('a');

  // Get all the link elements with children within the menu.
  var linksWithChildren = menu.querySelectorAll('.menu-item-has-children > a, .page_item_has_children > a');

  // Toggle focus each time a menu link is focused or blurred.
  var _iterator = _createForOfIteratorHelper(links),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var link = _step.value;
      link.addEventListener('focus', toggleFocus, true);
      link.addEventListener('blur', toggleFocus, true);
    }

    // Toggle focus each time a menu link with children receive a touch event.
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  var _iterator2 = _createForOfIteratorHelper(linksWithChildren),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _link = _step2.value;
      _link.addEventListener('touchstart', toggleFocus, false);
    }

    /**
     * Sets or removes .focus class on an element.
     */
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  function toggleFocus() {
    if (event.type === 'focus' || event.type === 'blur') {
      var self = this;
      // Move up through the ancestors of the current link until we hit .nav-menu.
      while (!self.classList.contains('nav-menu')) {
        // On li elements toggle the class .focus.
        if (self.tagName.toLowerCase() === 'li') {
          self.classList.toggle('focus');
        }
        self = self.parentNode;
      }
    }
    if (event.type === 'touchstart') {
      var menuItem = this.parentNode;
      event.preventDefault();
      var _iterator3 = _createForOfIteratorHelper(menuItem.parentNode.children),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var link = _step3.value;
          if (menuItem !== link) {
            link.classList.remove('focus');
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      menuItem.classList.toggle('focus');
    }
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (navigation);

/***/ }),

/***/ "./src/scss/main.scss":
/*!****************************!*\
  !*** ./src/scss/main.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/main.scss */ "./src/scss/main.scss");
/* harmony import */ var _components_navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/navigation */ "./src/js/components/navigation.js");
/* harmony import */ var _components_header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/header */ "./src/js/components/header.js");
/**
 * Main frontend JavaScript file
 */

// Import styles


// Import components



// Mobile menu functionality
function initMobileMenu() {
  var menuToggle = document.querySelector('.menu-toggle');
  var mainNav = document.querySelector('.main-navigation');
  var navMenu = mainNav === null || mainNav === void 0 ? void 0 : mainNav.querySelector('ul');
  var body = document.body;
  if (menuToggle && mainNav && navMenu) {
    menuToggle.addEventListener('click', function () {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      body.classList.toggle('mobile-menu-active');
      body.classList.toggle('menu-active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        body.classList.remove('mobile-menu-active');
        body.classList.remove('menu-active');
      }
    });

    // Close menu when clicking menu items
    var menuItems = mainNav.querySelectorAll('a');
    menuItems.forEach(function (item) {
      item.addEventListener('click', function () {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        body.classList.remove('mobile-menu-active');
        body.classList.remove('menu-active');
      });
    });
  }
}

// Smooth scroll and active menu item functionality
function initScrollBehavior() {
  // Get all menu links that point to sections
  var menuLinks = document.querySelectorAll('a[href^="#"]');
  var sections = document.querySelectorAll('section[id]');

  // Smooth scroll for menu links
  menuLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var targetId = this.getAttribute('href');
      var targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Active menu item on scroll
  function setActiveMenuItem() {
    var scrollPosition = window.scrollY + 100; // Offset for better trigger point

    sections.forEach(function (section) {
      var sectionTop = section.offsetTop - 100; // Offset for better trigger point
      var sectionHeight = section.offsetHeight;
      var sectionId = section.getAttribute('id');
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Remove active class from all menu items
        menuLinks.forEach(function (link) {
          link.classList.remove('active');
        });

        // Add active class to current section's menu item
        var activeLink = document.querySelector("a[href=\"#".concat(sectionId, "\"]"));
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }

  // Add scroll event listener
  window.addEventListener('scroll', setActiveMenuItem);
  // Initial check for active menu item
  setActiveMenuItem();
}

// DOM ready
document.addEventListener('DOMContentLoaded', function () {
  console.log('OBX Theme initialized');

  // Initialize navigation
  (0,_components_navigation__WEBPACK_IMPORTED_MODULE_1__["default"])();

  // Initialize header
  (0,_components_header__WEBPACK_IMPORTED_MODULE_2__["default"])();

  // Initialize scroll behavior
  initScrollBehavior();

  // Initialize mobile menu
  initMobileMenu();
});
})();

/******/ })()
;
//# sourceMappingURL=main.js.map