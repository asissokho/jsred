var optimisers = (function(){
	var _dichotomy,
		_secant,
		_options = {
						maxIterations : 1000,
						precision : 0.0001
					};
	_dichotomy = function (fn, target, lower, upper){
				var _low = lower,
					_up  = upper,
					_mid,
					_flow,
					_fup,
					_fmid,
					_iter = 0;
					
					
				/* sanity checks*/
				_flow = fn(_low);
				_fup = fn(_up);	
				if(_flow * _fup > 0) {
					throw new Error("root not bracketed");
				}
				
				while(_iter<_options.maxIterations){				
					_mid = (_low+_up)/2;
					_fmid = fn(_mid);					
					_flow = fn(_low);
					_fup = fn(_up);					
					if(Math.abs(_fmid-target)<_options.precision){ /* is this the right check */
						return { 
								res : _mid,
								numberOfIterations : _iter
								};		
					}				
					if(_fmid*_flow<0){
						_up= _mid;
					}
					else{
						_low = _mid;
					}
					
					_iter = _iter+1;
				}
				return { res : NaN,
						 numberOfIterations : _iter
					   };
	};

	_secant = function (fn, fnprim, target, lower, upper){
	};
	
	return {
		secant : _secant,
		dichotomy : _dichotomy
	};
})();

var optimiser = optimisers.dichotomy;

	console.log(new Date());
	var solution = optimiser(function(x){
									return x*x*x - 1;
							},
							0,
							-50, 
							10
							);
console.log(solution.res);
console.log(solution.numberOfIterations);
console.log(new Date());