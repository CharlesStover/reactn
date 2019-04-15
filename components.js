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
var react_1 = require("react");
var methods_1 = require("./methods");
var isComponentDidMount = false;
var isComponentDidUpdate = false;
var isSetGlobalCallback = false;
var componentWillUnmountInstance = function (that) {
    if (Object.prototype.hasOwnProperty.call(that, 'componentWillUnmount')) {
        var instanceCwu_1 = that.componentWillUnmount;
        that.componentWillUnmount = function () {
            methods_1.ReactNComponentWillUnmount(that);
            instanceCwu_1();
        };
        return true;
    }
    return false;
};
var componentWillUnmountPrototype = function (that) {
    var proto = Object.getPrototypeOf(that);
    if (Object.prototype.hasOwnProperty.call(proto, 'componentWillUnmount')) {
        that.componentWillUnmount = function () {
            methods_1.ReactNComponentWillUnmount(that);
            proto.componentWillUnmount.bind(that)();
        };
        return true;
    }
    return false;
};
var componentWillUpdateInstance = function (that) {
    if (Object.prototype.hasOwnProperty.call(that, 'componentWillUpdate')) {
        var instanceCwu_2 = that.componentWillUpdate;
        that.componentWillUpdate = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            methods_1.ReactNComponentWillUpdate(that);
            instanceCwu_2.apply(void 0, __spread(args));
        };
        return true;
    }
    return false;
};
var componentWillUpdatePrototype = function (that) {
    var proto = Object.getPrototypeOf(that);
    if (Object.prototype.hasOwnProperty.call(proto, 'componentWillUpdate')) {
        that.componentWillUpdate = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            methods_1.ReactNComponentWillUpdate(that);
            proto.componentWillUpdate.bind(that).apply(void 0, __spread(args));
        };
        return true;
    }
    return false;
};
var bindLifecycleMethods = function (that) {
    if (!componentWillUnmountInstance(that) &&
        !componentWillUnmountPrototype(that)) {
    }
    if (!componentWillUpdateInstance(that) &&
        !componentWillUpdatePrototype(that)) {
    }
};
var ReactNComponent = (function (_super) {
    __extends(ReactNComponent, _super);
    function ReactNComponent(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this._globalCallback = _this._globalCallback.bind(_this);
        bindLifecycleMethods(_this);
        return _this;
    }
    Object.defineProperty(ReactNComponent.prototype, "dispatch", {
        get: function () {
            return methods_1.ReactNDispatch();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReactNComponent.prototype, "global", {
        get: function () {
            return methods_1.ReactNGlobal(this);
        },
        enumerable: true,
        configurable: true
    });
    ReactNComponent.prototype.setGlobal = function (newGlobalState, callback) {
        if (callback === void 0) { callback = null; }
        return methods_1.ReactNSetGlobal(newGlobalState, callback, !isComponentDidMount &&
            !isComponentDidUpdate &&
            !isSetGlobalCallback);
    };
    ReactNComponent.prototype._globalCallback = function () {
        return methods_1.ReactNGlobalCallback(this);
    };
    return ReactNComponent;
}(react_1.Component));
exports.ReactNComponent = ReactNComponent;
;
var ReactNPureComponent = (function (_super) {
    __extends(ReactNPureComponent, _super);
    function ReactNPureComponent(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this._globalCallback = _this._globalCallback.bind(_this);
        bindLifecycleMethods(_this);
        return _this;
    }
    Object.defineProperty(ReactNPureComponent.prototype, "dispatch", {
        get: function () {
            return methods_1.ReactNDispatch();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReactNPureComponent.prototype, "global", {
        get: function () {
            return methods_1.ReactNGlobal(this);
        },
        enumerable: true,
        configurable: true
    });
    ReactNPureComponent.prototype.setGlobal = function (newGlobalState, callback) {
        if (callback === void 0) { callback = null; }
        return methods_1.ReactNSetGlobal(newGlobalState, callback, !isComponentDidMount &&
            !isComponentDidUpdate &&
            !isSetGlobalCallback);
    };
    ReactNPureComponent.prototype._globalCallback = function () {
        return methods_1.ReactNGlobalCallback(this);
    };
    return ReactNPureComponent;
}(react_1.PureComponent));
exports.ReactNPureComponent = ReactNPureComponent;
;
