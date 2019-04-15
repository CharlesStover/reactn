"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addReducer(globalStateManager, name, reducer) {
    return globalStateManager.addDispatcher(name, reducer);
}
exports.default = addReducer;
;
