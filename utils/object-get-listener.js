"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function objectGetListener(obj, listener) {
    return Object.keys(obj).reduce(function (accumulator, key) {
        Object.defineProperty(accumulator, key, {
            configurable: false,
            enumerable: true,
            get: function () {
                listener(key);
                return obj[key];
            }
        });
        return accumulator;
    }, Object.create(null));
}
exports.default = objectGetListener;
;
