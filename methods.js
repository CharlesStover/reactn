"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var context_1 = require("./context");
var default_global_state_manager_1 = require("./default-global-state-manager");
var getGlobalStateManager = function () {
    return context_1.default._currentValue2 ||
        default_global_state_manager_1.default;
};
function ReactNComponentWillUnmount(that) {
    getGlobalStateManager().removePropertyListener(that._globalCallback);
}
exports.ReactNComponentWillUnmount = ReactNComponentWillUnmount;
function ReactNComponentWillUpdate(that) {
    getGlobalStateManager().removePropertyListener(that._globalCallback);
}
exports.ReactNComponentWillUpdate = ReactNComponentWillUpdate;
function ReactNDispatch() {
    return getGlobalStateManager().dispatchers;
}
exports.ReactNDispatch = ReactNDispatch;
function ReactNGlobalCallback(that) {
    that.updater.enqueueForceUpdate(that, null, 'forceUpdate');
}
exports.ReactNGlobalCallback = ReactNGlobalCallback;
function ReactNGlobal(that, globalStateManager) {
    if (globalStateManager === void 0) { globalStateManager = getGlobalStateManager(); }
    return globalStateManager.spyState(that._globalCallback);
}
exports.ReactNGlobal = ReactNGlobal;
function ReactNSetGlobal(newGlobalState, callback, _sync, globalStateManager) {
    if (globalStateManager === void 0) { globalStateManager = getGlobalStateManager(); }
    if (!callback) {
        return globalStateManager.set(newGlobalState);
    }
    var globalState;
    return globalStateManager.set(newGlobalState)
        .then(function (gs) {
        globalState = gs;
        return gs;
    })
        .then(callback)
        .then(function () { return globalState; });
}
exports.ReactNSetGlobal = ReactNSetGlobal;
