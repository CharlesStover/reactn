"use strict";
var React = require("react");
var components_1 = require("./components");
var add_callback_1 = require("./add-callback");
var add_reducer_1 = require("./add-reducer");
var add_reducers_1 = require("./add-reducers");
var create_provider_1 = require("./create-provider");
var decorator_1 = require("./decorator");
var default_global_state_manager_1 = require("./default-global-state-manager");
var get_global_1 = require("./get-global");
var remove_callback_1 = require("./remove-callback");
var reset_global_1 = require("./reset-global");
var set_global_1 = require("./set-global");
var use_global_1 = require("./use-global");
var use_global_reducer_1 = require("./use-global-reducer");
var with_global_1 = require("./with-global");
module.exports = Object.assign(decorator_1.default, React, {
    addCallback: add_callback_1.default.bind(null, default_global_state_manager_1.default),
    addReducer: add_reducer_1.default.bind(null, default_global_state_manager_1.default),
    addReducers: add_reducers_1.default.bind(null, default_global_state_manager_1.default),
    Component: components_1.ReactNComponent,
    createProvider: create_provider_1.default,
    default: decorator_1.default,
    getGlobal: get_global_1.default.bind(null, default_global_state_manager_1.default),
    PureComponent: components_1.ReactNPureComponent,
    removeCallback: remove_callback_1.default.bind(null, default_global_state_manager_1.default),
    resetGlobal: reset_global_1.default.bind(null, default_global_state_manager_1.default),
    setGlobal: set_global_1.default.bind(null, default_global_state_manager_1.default),
    useGlobal: use_global_1.default.bind(null, null),
    useGlobalReducer: use_global_reducer_1.default.bind(null, null),
    withGlobal: with_global_1.default.bind(null, null),
});
