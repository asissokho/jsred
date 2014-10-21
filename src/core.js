(function (global) {

    "use strict";
    var phi;

    phi = function phi(fn) {
        return new phi.fn.init(fn);
    };

    phi.fn = {
        init: function (fn) {
            if (typeof fn === "function") {
                fn();
            }
        },
        getFirstOrDefault: function (obj, prop) {
            if (!(prop)) {
                return obj['_default'];
            }
            else {
                if (typeof prop === 'string') {
                    return obj[prop] || obj['_default'];
                }
                else {
                    /*if the property is not undefined and not of type string the we return it back */
                    return prop;
                }
            }

        },

        map: function (arrayLike, f) {
        },

        sum: function (arrayLike) {

        },

        isArray: Array.isArray || function (arg) {
            return Object.prototype.toString.call(arg) === "[object Array]";
        },

        isString: function (arg) {
            return (typeof arg === "string");
        },

        extend: function (target, src) {
            for (var prop in src) {
                if (src.hasOwnProperty(prop) && !target[prop]) {
                    target[prop] = src[prop];
                }
            }
            return target;
        },
        constructor: phi
    };

    phi.fn.prototype = phi.fn;

    phi.fn.extend(phi, phi.fn);

    global.phi = phi;
} (this));