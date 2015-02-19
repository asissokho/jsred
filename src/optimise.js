var optimisers = (function(){
	var _dichotomy,
		_secant,
        _isNegligible,
		_options = {
		maxIterations : 1000,
		precision : 0.0001
		};
    
    isNegligible = function(x){
        return Math.abs(x)<_options.precision;
    }
    
   	_dichotomy = function dichotomy(fn, target, lower, upper){

        if(!isNegligible(target)){
            return (dichotomy(function(x){ return  fn(x)-target;},0. , lower, upper));
        }

    	var _low = lower,
			_up  = upper,
			_mid,
			_flow,
			_fup,
			_fmid,
			_iter = -1;
					
					
			/* sanity checks*/
    	_flow = fn(_low);
    	_fup = fn(_up);	
    	if(_flow * _fup > 0) {
			throw new Error("root not bracketed");
    	}

        while(++_iter<_options.maxIterations){				
			_mid = (_low+_up)/2;
			_fmid = fn(_mid);					
			_flow = fn(_low);
			_fup = fn(_up);					
			if(isNegligible(_fmid-target)){ 
				return {res : _mid,	numberOfIterations : _iter};		
			}				
			if(_fmid*_flow<0){
				_up= _mid;
			}
			else{
				_low = _mid;
			}
		}
            
		return {  res : NaN, numberOfIterations : _iter };
    };

   	_secant = function (fn, fnprim, target, lower, upper){
    	};
	
	return {
		secant : _secant,
		dichotomy : _dichotomy
	};
})();

