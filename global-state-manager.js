"use strict";
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
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
var object_get_listener_1 = require("./utils/object-get-listener");
var copyObject = function (obj) {
    return Object.assign(Object.create(null), obj);
};
exports.INVALID_NEW_GLOBAL_STATE = new Error('ReactN global state must be a function, null, object, or Promise.');
var GlobalStateManager = (function () {
    function GlobalStateManager(initialState, initialReducers) {
        if (initialState === void 0) { initialState = Object.create(null); }
        if (initialReducers === void 0) { initialReducers = Object.create(null); }
        var _this = this;
        this._callbacks = new Set();
        this._dispatchers = Object.create(null);
        this._propertyListeners = new Map();
        this._queue = new Map();
        this._reduxDevToolsDispatch = null;
        if (typeof window === 'object' &&
            window.__REDUX_DEVTOOLS_EXTENSION__) {
            var enhancer = window.__REDUX_DEVTOOLS_EXTENSION__({
                name: 'ReactN state',
            });
            var enhancerStoreCreator = function (_reducer, _preloadedState) { return ({
                dispatch: function (action) { return action; },
                getState: function () { return _this.state; },
                replaceReducer: function () { return null; },
                subscribe: function () { return null; },
            }); };
            this._reduxDevToolsDispatch =
                enhancer(enhancerStoreCreator)(function () { return _this.state; }, initialState)
                    .dispatch;
        }
        this._initialReducers = copyObject(initialReducers);
        this._initialState = copyObject(initialState);
        this._state = copyObject(initialState);
        this.addDispatchers(initialReducers);
    }
    GlobalStateManager.prototype.addCallback = function (callback) {
        var _this = this;
        this._callbacks.add(callback);
        return function () {
            return _this.removeCallback(callback);
        };
    };
    GlobalStateManager.prototype.addPropertyListener = function (property, propertyListener) {
        if (this.propertyListeners.has(property)) {
            this.propertyListeners.get(property).add(propertyListener);
        }
        else {
            this.propertyListeners.set(property, new Set([propertyListener]));
        }
    };
    GlobalStateManager.prototype.addDispatcher = function (name, reducer) {
        var _this = this;
        this._dispatchers[name] = this.createDispatcher(reducer);
        return function () {
            return _this.removeDispatcher(name);
        };
    };
    GlobalStateManager.prototype.addDispatchers = function (reducers) {
        var e_1, _a;
        try {
            for (var _b = __values(Object.entries(reducers)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), name = _d[0], reducer = _d[1];
                this.addDispatcher(name, reducer);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    GlobalStateManager.prototype.clearQueue = function () {
        return this.queue.clear();
    };
    GlobalStateManager.prototype.createDispatcher = function (reducer) {
        var _this = this;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _this.set(reducer.apply(void 0, __spread([_this.state], args)));
        };
    };
    Object.defineProperty(GlobalStateManager.prototype, "dispatchers", {
        get: function () {
            return copyObject(this._dispatchers);
        },
        enumerable: true,
        configurable: true
    });
    GlobalStateManager.prototype.enqueue = function (property, value) {
        this._queue.set(property, value);
    };
    GlobalStateManager.prototype.flush = function () {
        var e_2, _a, e_3, _b, e_4, _c, e_5, _d;
        var propertyListeners = new Set();
        try {
            for (var _e = __values(this.queue.entries()), _f = _e.next(); !_f.done; _f = _e.next()) {
                var _g = __read(_f.value, 2), property = _g[0], value = _g[1];
                this._state[property] = value;
                if (this.propertyListeners.has(property)) {
                    try {
                        for (var _h = __values(this.propertyListeners.get(property)), _j = _h.next(); !_j.done; _j = _h.next()) {
                            var propertyListener = _j.value;
                            propertyListeners.add(propertyListener);
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_j && !_j.done && (_b = _h.return)) _b.call(_h);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
            }
            finally { if (e_2) throw e_2.error; }
        }
        this.clearQueue();
        try {
            for (var propertyListeners_1 = __values(propertyListeners), propertyListeners_1_1 = propertyListeners_1.next(); !propertyListeners_1_1.done; propertyListeners_1_1 = propertyListeners_1.next()) {
                var propertyListener = propertyListeners_1_1.value;
                propertyListener();
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (propertyListeners_1_1 && !propertyListeners_1_1.done && (_c = propertyListeners_1.return)) _c.call(propertyListeners_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        try {
            for (var _k = __values(this._callbacks), _l = _k.next(); !_l.done; _l = _k.next()) {
                var callback = _l.value;
                this.set(callback(this.state));
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_l && !_l.done && (_d = _k.return)) _d.call(_k);
            }
            finally { if (e_5) throw e_5.error; }
        }
    };
    GlobalStateManager.prototype.getDispatcher = function (name) {
        if (this.hasDispatcher(name)) {
            return this._dispatchers[name];
        }
        throw new Error("Cannot return unknown ReactN reducer `" + name + "`.");
    };
    GlobalStateManager.prototype.hasCallback = function (callback) {
        return this._callbacks.has(callback);
    };
    GlobalStateManager.prototype.hasDispatcher = function (name) {
        return Object.prototype.hasOwnProperty.call(this._dispatchers, name);
    };
    GlobalStateManager.prototype.hasPropertyListener = function (pl) {
        var e_6, _a, e_7, _b;
        try {
            for (var _c = __values(this.propertyListeners.values()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var propertyListeners = _d.value;
                try {
                    for (var propertyListeners_2 = __values(propertyListeners), propertyListeners_2_1 = propertyListeners_2.next(); !propertyListeners_2_1.done; propertyListeners_2_1 = propertyListeners_2.next()) {
                        var propertyListener = propertyListeners_2_1.value;
                        if (propertyListener === pl) {
                            return true;
                        }
                    }
                }
                catch (e_7_1) { e_7 = { error: e_7_1 }; }
                finally {
                    try {
                        if (propertyListeners_2_1 && !propertyListeners_2_1.done && (_b = propertyListeners_2.return)) _b.call(propertyListeners_2);
                    }
                    finally { if (e_7) throw e_7.error; }
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_6) throw e_6.error; }
        }
        return false;
    };
    Object.defineProperty(GlobalStateManager.prototype, "queue", {
        get: function () {
            return this._queue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlobalStateManager.prototype, "propertyListeners", {
        get: function () {
            return this._propertyListeners;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlobalStateManager.prototype, "reduxDevToolsDispatch", {
        get: function () {
            return this._reduxDevToolsDispatch;
        },
        enumerable: true,
        configurable: true
    });
    GlobalStateManager.prototype.removeCallback = function (callback) {
        return this._callbacks.delete(callback);
    };
    GlobalStateManager.prototype.removeDispatcher = function (dispatcherName) {
        if (this.hasDispatcher(dispatcherName)) {
            delete this._dispatchers[dispatcherName];
            return true;
        }
        return false;
    };
    GlobalStateManager.prototype.removePropertyListener = function (propertyListener) {
        var e_8, _a;
        var removed = false;
        try {
            for (var _b = __values(this.propertyListeners.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var propertyListeners = _c.value;
                removed = removed || propertyListeners.delete(propertyListener);
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_8) throw e_8.error; }
        }
        return removed;
    };
    GlobalStateManager.prototype.reset = function () {
        this._callbacks.clear();
        this._dispatchers = Object.create(null);
        this._propertyListeners.clear();
        this._queue.clear();
        this.addDispatchers(this._initialReducers);
        this._state = copyObject(this._initialState);
    };
    GlobalStateManager.prototype.set = function (newGlobalState) {
        if (newGlobalState === null ||
            typeof newGlobalState === 'undefined') {
            return Promise.resolve(this.state);
        }
        if (newGlobalState instanceof Promise) {
            return this.setPromise(newGlobalState);
        }
        if (typeof newGlobalState === 'function') {
            return this.setFunction(newGlobalState);
        }
        var reduxDevToolsDispatch = this.reduxDevToolsDispatch;
        if (reduxDevToolsDispatch) {
            reduxDevToolsDispatch({
                stateChange: newGlobalState,
                type: 'STATE_CHANGE',
            });
        }
        if (typeof newGlobalState === 'object') {
            return this.setObject(newGlobalState);
        }
        throw exports.INVALID_NEW_GLOBAL_STATE;
    };
    GlobalStateManager.prototype.setFunction = function (f) {
        return this.set(f(this.state));
    };
    GlobalStateManager.prototype.setObject = function (obj) {
        var e_9, _a;
        var properties = Object.keys(obj);
        try {
            for (var properties_1 = __values(properties), properties_1_1 = properties_1.next(); !properties_1_1.done; properties_1_1 = properties_1.next()) {
                var property = properties_1_1.value;
                var value = obj[property];
                this.enqueue(property, value);
            }
        }
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (properties_1_1 && !properties_1_1.done && (_a = properties_1.return)) _a.call(properties_1);
            }
            finally { if (e_9) throw e_9.error; }
        }
        this.flush();
        return Promise.resolve(this.state);
    };
    GlobalStateManager.prototype.setPromise = function (promise) {
        var _this = this;
        return promise
            .then(function (result) {
            return _this.set(result);
        });
    };
    GlobalStateManager.prototype.spyState = function (propertyListener) {
        var _this = this;
        return object_get_listener_1.default(this._state, function (property) {
            _this.addPropertyListener(property, propertyListener);
        });
    };
    Object.defineProperty(GlobalStateManager.prototype, "state", {
        get: function () {
            return copyObject(this._state);
        },
        enumerable: true,
        configurable: true
    });
    return GlobalStateManager;
}());
exports.default = GlobalStateManager;
;
