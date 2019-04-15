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
Object.defineProperty(exports, "__esModule", { value: true });
var add_reducer_1 = require("./add-reducer");
function addReducers(globalStateManager, reducers) {
    var e_1, _a;
    var removeReducers = new Set();
    try {
        for (var _b = __values(Object.entries(reducers)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), name = _d[0], reducer = _d[1];
            removeReducers.add(add_reducer_1.default(globalStateManager, name, reducer));
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return function () {
        var e_2, _a;
        var success = true;
        try {
            for (var removeReducers_1 = __values(removeReducers), removeReducers_1_1 = removeReducers_1.next(); !removeReducers_1_1.done; removeReducers_1_1 = removeReducers_1.next()) {
                var removeReducer = removeReducers_1_1.value;
                success = success && removeReducer();
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (removeReducers_1_1 && !removeReducers_1_1.done && (_a = removeReducers_1.return)) _a.call(removeReducers_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return success;
    };
}
exports.default = addReducers;
;
