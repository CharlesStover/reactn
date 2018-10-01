(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define("reactn", ["react"], factory);
	else if(typeof exports === 'object')
		exports["reactn"] = factory(require("react"));
	else
		root["reactn"] = factory(root["React"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_react__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/reactn.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/component-will-unmount.js":
/*!***************************************!*\
  !*** ./src/component-will-unmount.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _global_state_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global-state-manager */ \"./src/global-state-manager.js\");\n\n\nvar componentWillUnmount = function componentWillUnmount() {\n  Object(_global_state_manager__WEBPACK_IMPORTED_MODULE_0__[\"removeListeners\"])(this);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (componentWillUnmount);\n\n//# sourceURL=webpack://reactn/./src/component-will-unmount.js?");

/***/ }),

/***/ "./src/get-derived-global-from-props.js":
/*!**********************************************!*\
  !*** ./src/get-derived-global-from-props.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _global_state_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global-state-manager */ \"./src/global-state-manager.js\");\n\n\nvar getDerivedGlobalFromProps = function getDerivedGlobalFromProps(props) {\n  if (Object.prototype.hasOwnProperty.call(this.constructor, 'getDerivedGlobalFromProps')) {\n    var newState = this.constructor.getDerivedGlobalFromProps(props, this.global);\n    _global_state_manager__WEBPACK_IMPORTED_MODULE_0__[\"default\"].set(newState);\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (getDerivedGlobalFromProps);\n\n//# sourceURL=webpack://reactn/./src/get-derived-global-from-props.js?");

/***/ }),

/***/ "./src/global-state-manager.js":
/*!*************************************!*\
  !*** ./src/global-state-manager.js ***!
  \*************************************/
/*! exports provided: removeListeners, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"removeListeners\", function() { return removeListeners; });\n/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reducers */ \"./src/reducers.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\nvar listeners = new Map();\n\nvar addListener = function addListener(key, instance) {\n  if (!listeners.has(key)) {\n    listeners.set(key, new Set());\n  }\n\n  listeners.get(key).add(instance);\n};\n\nvar removeListeners = function removeListeners(instance) {\n  var _iteratorNormalCompletion = true;\n  var _didIteratorError = false;\n  var _iteratorError = undefined;\n\n  try {\n    for (var _iterator = listeners.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n      var _step$value = _slicedToArray(_step.value, 2),\n          instances = _step$value[1];\n\n      if (instances.has(instance)) {\n        instances.remove(instance);\n      }\n    }\n  } catch (err) {\n    _didIteratorError = true;\n    _iteratorError = err;\n  } finally {\n    try {\n      if (!_iteratorNormalCompletion && _iterator.return != null) {\n        _iterator.return();\n      }\n    } finally {\n      if (_didIteratorError) {\n        throw _iteratorError;\n      }\n    }\n  }\n};\n\nvar GlobalStateManager =\n/*#__PURE__*/\nfunction () {\n  function GlobalStateManager() {\n    _classCallCheck(this, GlobalStateManager);\n\n    _defineProperty(this, \"_state\", Object.create(null));\n  }\n\n  _createClass(GlobalStateManager, [{\n    key: \"set\",\n    value: function set(key, value) {\n      // No changes, e.g. getDerivedGlobalFromProps.\n      if (key === null) {\n        return;\n      } // Multi-key changes.\n\n\n      if (_typeof(key) === 'object') {\n        var _instances = new Set();\n\n        var _arr2 = Object.entries(key);\n\n        for (var _i2 = 0; _i2 < _arr2.length; _i2++) {\n          var _arr2$_i = _slicedToArray(_arr2[_i2], 2),\n              k = _arr2$_i[0],\n              v = _arr2$_i[1];\n\n          this.set(k, v);\n          var keyInstances = listeners.get(k);\n\n          if (keyInstances) {\n            var _iteratorNormalCompletion3 = true;\n            var _didIteratorError3 = false;\n            var _iteratorError3 = undefined;\n\n            try {\n              for (var _iterator3 = keyInstances[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {\n                var keyInstance = _step3.value;\n\n                _instances.add(keyInstance);\n              }\n            } catch (err) {\n              _didIteratorError3 = true;\n              _iteratorError3 = err;\n            } finally {\n              try {\n                if (!_iteratorNormalCompletion3 && _iterator3.return != null) {\n                  _iterator3.return();\n                }\n              } finally {\n                if (_didIteratorError3) {\n                  throw _iteratorError3;\n                }\n              }\n            }\n          }\n        }\n\n        if (_instances) {\n          var _iteratorNormalCompletion2 = true;\n          var _didIteratorError2 = false;\n          var _iteratorError2 = undefined;\n\n          try {\n            for (var _iterator2 = _instances[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {\n              var instance = _step2.value;\n              instance.updater.enqueueForceUpdate(instance, null, 'forceUpdate');\n            }\n          } catch (err) {\n            _didIteratorError2 = true;\n            _iteratorError2 = err;\n          } finally {\n            try {\n              if (!_iteratorNormalCompletion2 && _iterator2.return != null) {\n                _iterator2.return();\n              }\n            } finally {\n              if (_didIteratorError2) {\n                throw _iteratorError2;\n              }\n            }\n          }\n        }\n\n        return;\n      } // Single-key changes.\n\n\n      this._state[key] = value;\n      var instances = listeners.get(key);\n\n      if (instances) {\n        var _iteratorNormalCompletion4 = true;\n        var _didIteratorError4 = false;\n        var _iteratorError4 = undefined;\n\n        try {\n          for (var _iterator4 = instances[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {\n            var _instance = _step4.value;\n\n            _instance.updater.enqueueForceUpdate(_instance, null, 'forceUpdate');\n          }\n        } catch (err) {\n          _didIteratorError4 = true;\n          _iteratorError4 = err;\n        } finally {\n          try {\n            if (!_iteratorNormalCompletion4 && _iterator4.return != null) {\n              _iterator4.return();\n            }\n          } finally {\n            if (_didIteratorError4) {\n              throw _iteratorError4;\n            }\n          }\n        }\n      }\n    }\n  }, {\n    key: \"state\",\n    value: function state(instance) {\n      var _this = this;\n\n      return Object.assign(Object.keys(this._state).reduce(function (accumulator, key) {\n        Object.defineProperty(accumulator, key, {\n          configurable: false,\n          enumerable: true,\n          get: function get() {\n            addListener(key, instance);\n            return _this._state[key];\n          }\n        });\n        return accumulator;\n      }, Object.create(null)), this.reducers);\n    }\n  }, {\n    key: \"reducers\",\n    get: function get() {\n      var _this2 = this;\n\n      return Object.entries(_reducers__WEBPACK_IMPORTED_MODULE_0__[\"default\"]).reduce(function (accumulator, _ref) {\n        var _ref2 = _slicedToArray(_ref, 2),\n            key = _ref2[0],\n            reducer = _ref2[1];\n\n        accumulator[key] = function () {\n          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n            args[_key] = arguments[_key];\n          }\n\n          var newState = reducer.apply(void 0, [_this2._state].concat(args));\n\n          _this2.set(newState);\n        };\n\n        return accumulator;\n      }, Object.create(null));\n    }\n  }]);\n\n  return GlobalStateManager;\n}();\n\n;\n/* harmony default export */ __webpack_exports__[\"default\"] = (new GlobalStateManager());\n\n//# sourceURL=webpack://reactn/./src/global-state-manager.js?");

/***/ }),

/***/ "./src/reactn.js":
/*!***********************!*\
  !*** ./src/reactn.js ***!
  \***********************/
/*! exports provided: reducers, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _component_will_unmount__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component-will-unmount */ \"./src/component-will-unmount.js\");\n/* harmony import */ var _get_derived_global_from_props__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./get-derived-global-from-props */ \"./src/get-derived-global-from-props.js\");\n/* harmony import */ var _global_state_manager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./global-state-manager */ \"./src/global-state-manager.js\");\n/* harmony import */ var _set_global__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./set-global */ \"./src/set-global.js\");\n/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./reducers */ \"./src/reducers.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"reducers\", function() { return _reducers__WEBPACK_IMPORTED_MODULE_5__[\"default\"]; });\n\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _get(target, property, receiver) { if (typeof Reflect !== \"undefined\" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }\n\nfunction _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n\n\nvar ReactN = _objectSpread({}, react__WEBPACK_IMPORTED_MODULE_0___default.a, {\n  Component:\n  /*#__PURE__*/\n  function (_React$Component) {\n    _inherits(ReactNComponent, _React$Component);\n\n    function ReactNComponent(props) {\n      var _this;\n\n      _classCallCheck(this, ReactNComponent);\n\n      _this = _possibleConstructorReturn(this, _getPrototypeOf(ReactNComponent).call(this, props));\n\n      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"setGlobal\", _set_global__WEBPACK_IMPORTED_MODULE_4__[\"default\"].bind(_assertThisInitialized(_assertThisInitialized(_this))));\n\n      _get_derived_global_from_props__WEBPACK_IMPORTED_MODULE_2__[\"default\"].bind(_assertThisInitialized(_assertThisInitialized(_this)))();\n      return _this;\n    }\n\n    _createClass(ReactNComponent, [{\n      key: \"componentDidUpdate\",\n      value: function componentDidUpdate(props, state) {\n        _get_derived_global_from_props__WEBPACK_IMPORTED_MODULE_2__[\"default\"].bind(this)(); // super.componentDidUpdate(props, state);\n      }\n    }, {\n      key: \"componentWillUnmount\",\n      value: function componentWillUnmount() {\n        _component_will_unmount__WEBPACK_IMPORTED_MODULE_1__[\"default\"].bind(this)();\n\n        _get(_getPrototypeOf(ReactNComponent.prototype), \"componentWillUnmount\", this).call(this);\n      }\n    }, {\n      key: \"global\",\n      get: function get() {\n        return _global_state_manager__WEBPACK_IMPORTED_MODULE_3__[\"default\"].state(this);\n      }\n    }]);\n\n    return ReactNComponent;\n  }(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component),\n  PureComponent:\n  /*#__PURE__*/\n  function (_React$PureComponent) {\n    _inherits(ReactNPureComponent, _React$PureComponent);\n\n    function ReactNPureComponent(props) {\n      var _this2;\n\n      _classCallCheck(this, ReactNPureComponent);\n\n      _this2 = _possibleConstructorReturn(this, _getPrototypeOf(ReactNPureComponent).call(this, props));\n\n      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), \"setGlobal\", _set_global__WEBPACK_IMPORTED_MODULE_4__[\"default\"].bind(_assertThisInitialized(_assertThisInitialized(_this2))));\n\n      _get_derived_global_from_props__WEBPACK_IMPORTED_MODULE_2__[\"default\"].bind(_assertThisInitialized(_assertThisInitialized(_this2)))(props);\n      return _this2;\n    }\n\n    _createClass(ReactNPureComponent, [{\n      key: \"componentDidUpdate\",\n      value: function componentDidUpdate(props, state) {\n        _get_derived_global_from_props__WEBPACK_IMPORTED_MODULE_2__[\"default\"].bind(this)(props); // super.componentDidUpdate(props, state);\n      }\n    }, {\n      key: \"componentWillUnmount\",\n      value: function componentWillUnmount() {\n        _component_will_unmount__WEBPACK_IMPORTED_MODULE_1__[\"default\"].bind(this)(); // super.componentWillUnmount();\n\n      }\n    }, {\n      key: \"global\",\n      get: function get() {\n        return _global_state_manager__WEBPACK_IMPORTED_MODULE_3__[\"default\"].state(this);\n      }\n    }]);\n\n    return ReactNPureComponent;\n  }(react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent)\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ReactN);\n\n//# sourceURL=webpack://reactn/./src/reactn.js?");

/***/ }),

/***/ "./src/reducers.js":
/*!*************************!*\
  !*** ./src/reducers.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar reducers = Object.create(null);\n/* harmony default export */ __webpack_exports__[\"default\"] = (reducers);\n\n//# sourceURL=webpack://reactn/./src/reducers.js?");

/***/ }),

/***/ "./src/set-global.js":
/*!***************************!*\
  !*** ./src/set-global.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _global_state_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global-state-manager */ \"./src/global-state-manager.js\");\n\n\nvar setGlobal = function setGlobal(g) {\n  _global_state_manager__WEBPACK_IMPORTED_MODULE_0__[\"default\"].set(typeof g === 'function' ? g(_global_state_manager__WEBPACK_IMPORTED_MODULE_0__[\"default\"].state) : g);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (setGlobal);\n\n//# sourceURL=webpack://reactn/./src/set-global.js?");

/***/ }),

/***/ "react":
/*!**************************************************************************************!*\
  !*** external {"amd":"react","commonjs":"react","commonjs2":"react","root":"React"} ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_react__;\n\n//# sourceURL=webpack://reactn/external_%7B%22amd%22:%22react%22,%22commonjs%22:%22react%22,%22commonjs2%22:%22react%22,%22root%22:%22React%22%7D?");

/***/ })

/******/ });
});