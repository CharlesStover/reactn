"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var context_1 = require("./context");
var default_global_state_manager_1 = require("./default-global-state-manager");
var react_hooks_error_1 = require("./utils/react-hooks-error");
function useGlobalReducer(overrideGlobalStateManager, reducer) {
    if (!react_1.useContext) {
        throw react_hooks_error_1.default;
    }
    var globalStateManager = overrideGlobalStateManager ||
        react_1.useContext(context_1.default) ||
        default_global_state_manager_1.default;
    if (typeof reducer === 'function') {
        return globalStateManager.createDispatcher(reducer);
    }
    return globalStateManager.getDispatcher(reducer);
}
exports.default = useGlobalReducer;
;
