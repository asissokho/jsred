(function (global, phi) {
    var loaded = false;

    (function () {
        if (loaded === false) {
            var defaultOptions = {
                discountingMethod : 'fixedThenCompounded',
                calendar : ''
            };
            phi.defaultOptions = defaultOptions;
            loaded = true;
        }
    } ());

} (this, phi));