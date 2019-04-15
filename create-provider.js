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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var context_1 = require("./context");
var add_reducer_1 = require("./add-reducer");
var add_reducers_1 = require("./add-reducers");
var global_state_manager_1 = require("./global-state-manager");
var set_global_1 = require("./set-global");
var use_global_1 = require("./use-global");
var use_global_reducer_1 = require("./use-global-reducer");
var with_global_1 = require("./with-global");
function createProvider(initialState, initialReducers) {
    if (initialState === void 0) { initialState = Object.create(null); }
    if (initialReducers === void 0) { initialReducers = Object.create(null); }
    var globalStateManager = new global_state_manager_1.default(initialState, initialReducers);
    return (function (_super) {
        __extends(ReactNProvider, _super);
        function ReactNProvider() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ReactNProvider.addCallback = function (f) {
            return globalStateManager.addCallback(f);
        };
        ReactNProvider.addReducer = function (name, reducer) {
            return add_reducer_1.default(globalStateManager, name, reducer);
        };
        ReactNProvider.addReducers = function (reducers) {
            return add_reducers_1.default(globalStateManager, reducers);
        };
        Object.defineProperty(ReactNProvider, "dispatch", {
            get: function () {
                return globalStateManager.dispatchers;
            },
            enumerable: true,
            configurable: true
        });
        ReactNProvider.getDispatch = function () {
            return globalStateManager.dispatchers;
        };
        ReactNProvider.getGlobal = function () {
            return globalStateManager.state;
        };
        Object.defineProperty(ReactNProvider, "global", {
            get: function () {
                return globalStateManager.state;
            },
            enumerable: true,
            configurable: true
        });
        ReactNProvider.removeCallback = function (callback) {
            return globalStateManager.removeCallback(callback);
        };
        ReactNProvider.reset = function () {
            return globalStateManager.reset();
        };
        ReactNProvider.setGlobal = function (newGlobalState, callback) {
            if (callback === void 0) { callback = null; }
            return set_global_1.default(globalStateManager, newGlobalState, callback);
        };
        ReactNProvider.useGlobal = function (property) {
            return use_global_1.default(globalStateManager, property);
        };
        ReactNProvider.useGlobalReducer = function (reducer) {
            if (typeof reducer === 'function') {
                return use_global_reducer_1.default(globalStateManager, reducer);
            }
            return use_global_reducer_1.default(globalStateManager, reducer);
        };
        ReactNProvider.withGlobal = function (getter, setter) {
            if (getter === void 0) { getter = function (globalState) { return globalState; }; }
            if (setter === void 0) { setter = function () { return null; }; }
            return with_global_1.default(globalStateManager, getter, setter);
        };
        ReactNProvider.prototype.render = function () {
            return (React.createElement(context_1.default.Provider, { value: globalStateManager }, this.props.children));
        };
        return ReactNProvider;
    }(React.Component));
}
exports.default = createProvider;
