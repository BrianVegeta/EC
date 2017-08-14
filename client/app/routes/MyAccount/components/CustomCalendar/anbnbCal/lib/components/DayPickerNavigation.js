module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 66);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = require("airbnb-prop-types");

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("../defaultPhrases");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("../../constants");

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = require("../utils/getPhrasePropTypes");

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

module.exports = require("classnames");

/***/ }),

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = DayPickerNavigation;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(3);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _airbnbPropTypes = __webpack_require__(1);

var _classnames = __webpack_require__(6);

var _classnames2 = _interopRequireDefault(_classnames);

var _defaultPhrases = __webpack_require__(2);

var _getPhrasePropTypes = __webpack_require__(5);

var _getPhrasePropTypes2 = _interopRequireDefault(_getPhrasePropTypes);

var _ScrollableOrientationShape = __webpack_require__(8);

var _ScrollableOrientationShape2 = _interopRequireDefault(_ScrollableOrientationShape);

var _constants = __webpack_require__(4);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

// import LeftArrow from '../svg/arrow-left.svg';
// import RightArrow from '../svg/arrow-right.svg';
// import ChevronUp from '../svg/chevron-up.svg';
// import ChevronDown from '../svg/chevron-down.svg';
var propTypes = (0, _airbnbPropTypes.forbidExtraProps)({
  navPrev: _propTypes2['default'].node,
  navNext: _propTypes2['default'].node,
  hiddenChangeMonthButton: _propTypes2['default'].bool,
  orientation: _ScrollableOrientationShape2['default'],

  onPrevMonthClick: _propTypes2['default'].func,
  onNextMonthClick: _propTypes2['default'].func,

  // internationalization
  phrases: _propTypes2['default'].shape((0, _getPhrasePropTypes2['default'])(_defaultPhrases.DayPickerNavigationPhrases)),

  isRTL: _propTypes2['default'].bool
});

var defaultProps = {
  navPrev: null,
  navNext: null,
  hiddenChangeMonthButton: false,
  orientation: _constants.HORIZONTAL_ORIENTATION,

  onPrevMonthClick: function () {
    function onPrevMonthClick() {}

    return onPrevMonthClick;
  }(),
  onNextMonthClick: function () {
    function onNextMonthClick() {}

    return onNextMonthClick;
  }(),

  // internationalization
  phrases: _defaultPhrases.DayPickerNavigationPhrases,
  isRTL: false
};

function DayPickerNavigation(props) {
  var hiddenChangeMonthButton = props.hiddenChangeMonthButton,
      onPrevMonthClick = props.onPrevMonthClick,
      onNextMonthClick = props.onNextMonthClick,
      orientation = props.orientation,
      phrases = props.phrases,
      isRTL = props.isRTL;

  console.log(hiddenChangeMonthButton);
  var isVertical = orientation !== _constants.HORIZONTAL_ORIENTATION;
  var isVerticalScrollable = orientation === _constants.VERTICAL_SCROLLABLE;

  // let navPrevIcon = navPrev;
  // let navNextIcon = navNext;
  var isDefaultNavPrev = false;
  var isDefaultNavNext = false;
  // if (!navPrevIcon) {
  //   isDefaultNavPrev = true;
  //   navPrevIcon = isVertical ? <ChevronUp /> : <LeftArrow />;
  //   if (isRTL && !isVertical) {
  //     navPrevIcon = <RightArrow />;
  //   }
  // }
  // if (!navNextIcon) {
  //   isDefaultNavNext = true;
  //   navNextIcon = isVertical ? <ChevronDown /> : <RightArrow />;
  //   if (isRTL && !isVertical) {
  //     navNextIcon = <LeftArrow />;
  //   }
  // }

  var navClassNames = (0, _classnames2['default'])('DayPickerNavigation', {
    'DayPickerNavigation--horizontal': !isVertical,
    'DayPickerNavigation--vertical': isVertical,
    'DayPickerNavigation--vertical-scrollable': isVerticalScrollable
  });
  var prevClassNames = (0, _classnames2['default'])('DayPickerNavigation__prev', {
    'DayPickerNavigation__prev--default': isDefaultNavPrev,
    'DayPickerNavigation__prev--rtl': isRTL
  });
  var nextClassNames = (0, _classnames2['default'])('DayPickerNavigation__next', {
    'DayPickerNavigation__next--default': isDefaultNavNext,
    'DayPickerNavigation__next--rtl': isRTL
  });

  return _react2['default'].createElement('div', { className: navClassNames }, !hiddenChangeMonthButton && !isVerticalScrollable && _react2['default'].createElement('button', {
    type: 'button',
    'aria-label': phrases.jumpToPrevMonth,
    className: prevClassNames,
    onClick: onPrevMonthClick,
    onMouseUp: function () {
      function onMouseUp(e) {
        e.currentTarget.blur();
      }

      return onMouseUp;
    }()
  }, '<'), !hiddenChangeMonthButton && _react2['default'].createElement('button', {
    type: 'button',
    'aria-label': phrases.jumpToNextMonth,
    className: nextClassNames,
    onClick: onNextMonthClick,
    onMouseUp: function () {
      function onMouseUp(e) {
        e.currentTarget.blur();
      }

      return onMouseUp;
    }()
  }, '>'));
}

DayPickerNavigation.propTypes = propTypes;
DayPickerNavigation.defaultProps = defaultProps;

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

module.exports = require("../shapes/ScrollableOrientationShape");

/***/ })

/******/ });