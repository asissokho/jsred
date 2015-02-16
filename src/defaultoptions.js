(function (global, phi) {
    var loaded = false;
    (function () {
	    if (loaded === false) {
            var defaultOptions =  {
                discountingMethod : 'fixedThenCompounded',
                calendar : 'Target',
		oneMoreOption : 'one more option'
            };
            phi.defaultOptions = defaultOptions;
            loaded = true;

        }
    } ());
} (this, phi));
