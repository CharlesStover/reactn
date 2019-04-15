"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var components_1 = require("./components");
var context_1 = require("./context");
var default_global_state_manager_1 = require("./default-global-state-manager");
var methods_1 = require("./methods");
var componentName = function (Component) {
    return typeof Component === 'string' ?
        Component :
        Component.displayName ||
            Component.name;
};
var isComponentDidMount = false;
var isComponentDidUpdate = false;
var isSetGlobalCallback = false;
function withGlobal(globalStateManager, getter, setter) {
    if (globalStateManager === void 0) { globalStateManager = null; }
    if (getter === void 0) { getter = function (globalState) { return globalState; }; }
    if (setter === void 0) { setter = function () { return null; }; }
    return function ReactNWithGlobal(Component) {
        var _a;
        return _a = (function (_super) {
                __extends(ReactNHOC, _super);
                function ReactNHOC() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.setGlobal = function (newGlobalState, callback) {
                        if (callback === void 0) { callback = null; }
                        return methods_1.ReactNSetGlobal(newGlobalState, callback, !isComponentDidMount &&
                            !isComponentDidUpdate &&
                            !isSetGlobalCallback, globalStateManager ||
                            _this.context ||
                            default_global_state_manager_1.default);
                    };
                    return _this;
                }
                Object.defineProperty(ReactNHOC.prototype, "global", {
                    get: function () {
                        return methods_1.ReactNGlobal(this, globalStateManager || this.context || default_global_state_manager_1.default);
                    },
                    enumerable: true,
                    configurable: true
                });
                ReactNHOC.prototype.render = function () {
                    var lowerOrderProps = __assign({}, this.props, getter(this.global, this.props), setter(this.setGlobal, this.props));
                    return react_1.createElement(Component, lowerOrderProps);
                };
                return ReactNHOC;
            }(components_1.ReactNComponent)),
            _a.contextType = context_1.default,
            _a.displayName = componentName(Component) + "-ReactN",
            _a;
    };
}
exports.default = withGlobal;
;
