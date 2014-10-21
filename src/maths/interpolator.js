(function (global, phi) {
    "use strict";
    var isArray = global.phi.isArray,
        len,
        i,
        _options = {
            extrapolate: 'flat'
        },
       validate = function (x, fx, options) {
           if (isArray(x) && isArray(fx) && fx.length === x.length && fx.length>1) {
               // faut-il s'attendre à ce que la suite x soit monotone? si oui, faut il 
               // modifier la structure de données en entrée
               return true;
           } else {
               return false;
           }
       },

       findInterval = function (xs, x) {
           i = 0,
           len = xs.length;
           if (x < xs[0]) {
               return -1;
           }

           if (x > xs[len]) {
               return len;
           }

           for (; i < len - 1; i++) {
               if (xs[i] <= x && xs[i + 1] >= x) {
                   return i;
               }
           }

       },
    linearInterpolator = function (xs, fxs, options) {
        var last,
            first,
            n,
			options=options||{};
			
        if (!validate(xs, fxs, options)){
            throw Error("not valid parameters");
		}
		
		options.extrapolate='flat';
        n = xs.length;
		first = (fxs[1]-fxs[0])/(xs[1]-xs[0]);
		last = (fxs[n]-fxs[n-1])/(xs[n]-xs[n-1]);
        return function (x) {
            var index = findInterval(xs, x);
			if(n>index && index>=0){ 
				return ((x - xs[index]) * fxs[index + 1] + (xs[index + 1] - x) * fxs[index]) / (xs[index + 1] - xs[index]);
			}else{
				if(options.extrapolate==='flat'){
					return (index>=n)?fxs[n]:fxs[0];
				}
				if(options.extrapolate==='closest'){
					return (index>=n)?fxs[n]:fxs[0];
				}
				throw Error("argument out of range, extrapolation method: "+ options.extrapolate);
			}
        };
    },
	
	
	
	
	
    interpolators = {
        linearInterpolator : linearInterpolator
    };

    global.phi.interpolators = interpolators;
} (this)); 