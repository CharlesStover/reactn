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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var methods_1 = require("./methods");
var isComponentDidMount = false;
var isComponentDidUpdate = false;
var isSetGlobalCallback = false;
var componentName = function (DecoratedComponent) {
    return typeof DecoratedComponent === 'string' ?
        DecoratedComponent :
        DecoratedComponent.displayName ||
            DecoratedComponent.name;
};
function ReactN(DecoratedComponent) {
    var DecoratedReactNComponent = (function (_super) {
        __extends(DecoratedReactNComponent, _super);
        function DecoratedReactNComponent(props, context) {
            var _this = _super.call(this, props, context) || this;
            _this._globalCallback = _this._globalCallback.bind(_this);
            return _this;
        }
        DecoratedReactNComponent.prototype.componentWillUnmount = function () {
            methods_1.ReactNComponentWillUnmount(this);
            if (_super.prototype.componentWillUnmount) {
                _super.prototype.componentWillUnmount.call(this);
            }
        };
        DecoratedReactNComponent.prototype.componentWillUpdate = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            methods_1.ReactNComponentWillUpdate(this);
            if (_super.prototype.componentWillUpdate) {
                _super.prototype.componentWillUpdate.apply(this, __spread(args));
            }
        };
        Object.defineProperty(DecoratedReactNComponent.prototype, "dispatch", {
            get: function () {
                return methods_1.ReactNDispatch();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DecoratedReactNComponent.prototype, "global", {
            get: function () {
                return methods_1.ReactNGlobal(this);
            },
            enumerable: true,
            configurable: true
        });
        DecoratedReactNComponent.prototype.setGlobal = function (newGlobalState, callback) {
            if (callback === void 0) { callback = null; }
            return methods_1.ReactNSetGlobal(newGlobalState, callback, !isComponentDidMount &&
                !isComponentDidUpdate &&
                !isSetGlobalCallback);
        };
        DecoratedReactNComponent.prototype._globalCallback = function () {
            return methods_1.ReactNGlobalCallback(this);
        };
        DecoratedReactNComponent.displayName = componentName(DecoratedComponent) + "-ReactN";
        return DecoratedReactNComponent;
    }(DecoratedComponent));
    return DecoratedReactNComponent;
}
exports.default = ReactN;
;
