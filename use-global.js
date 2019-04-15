"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var use_force_update_1 = require("use-force-update");
var context_1 = require("./context");
var default_global_state_manager_1 = require("./default-global-state-manager");
var set_global_1 = require("./set-global");
var react_hooks_error_1 = require("./utils/react-hooks-error");
function useGlobal(overrideGlobalStateManager, property) {
    if (!react_1.useContext) {
        throw react_hooks_error_1.default;
    }
    var globalStateManager = overrideGlobalStateManager ||
        react_1.useContext(context_1.default) ||
        default_global_state_manager_1.default;
    var forceUpdate = use_force_update_1.default();
    react_1.useEffect(function () { return function () {
        globalStateManager.removePropertyListener(forceUpdate);
    }; });
    if (typeof property === 'undefined') {
        var globalStateSetter = function (newGlobalState, callback) {
            if (callback === void 0) { callback = null; }
            return set_global_1.default(globalStateManager, newGlobalState, callback);
        };
        return [
            globalStateManager.spyState(forceUpdate),
            globalStateSetter,
        ];
    }
    var globalPropertySetter = function (value, callback) {
        if (callback === void 0) { callback = null; }
        var newGlobalState = Object.create(null);
        newGlobalState[property] = value;
        return set_global_1.default(globalStateManager, newGlobalState, callback);
    };
    return [
        globalStateManager.spyState(forceUpdate)[property],
        globalPropertySetter,
    ];
}
exports.default = useGlobal;
;
