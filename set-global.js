"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setGlobal(globalStateManager, newGlobalState, callback) {
    if (callback === void 0) { callback = null; }
    if (callback === null) {
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
exports.default = setGlobal;
;
