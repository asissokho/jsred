(function (global) {
    "use strict";

   var  phi = function phi(fn) {
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
                   return prop;
                }
            }
        },

        map: function (arrayLike, f) {
            var i=0,
                n=arrayLike.length,
                mappedArray = new Array[n];
            for(;i<n;i++){
                mappedArray[i] = f(arrayLike[i]);
            }
        },

        plus: function (x, y){
            return x+y;
        },

        multiply: function (x,y){
            return x*y;
        },

        sum: function (arrayLike, f) {
            var i=0,
                s=0,
                n=arrayLike.length;
            for(;i<n;i++){
                s+=f(arrayLike[i]);
            }
            return s;
        },

       identity: function (x){
           return x;
       },

        mapReduce: function(map, reduce, arrayLike, reduceInvariant){
            var i = 0,
                reducedValue = reduceInvariant,
                n = arrayLike.length;
            for(;i<n;i++){
                reducedValue = reduce(reducedValue, map(arrayLike[i]));
            }

            return reducedValue;
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

