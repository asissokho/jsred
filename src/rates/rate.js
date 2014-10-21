(function (global, phi) {
    "use strict";

    var getFirstOrDefault = global.phi.getFirstOrDefault,
        discoutingMethods = global.phi.discountingMethods,
        daycounters = global.phi.dayCounters,
        extend = global.phi.extend,
        sum = global.phi.sum,
        _defaults = {
            discountingMethod: "fixedThenCompounded",
            frequency: "annual"
        },
        _frequencies = {
            annual: 1,
            quaterly: 4, 
            semiannual: 2,
            everyfourmonth: 3,
            _default: 1
        },
    _rate = function rate(options) {

        if (!(this instanceof rate)) {
            return new rate(options);
        }

        this.val = function () { return options.val; };
        //this.daycounter = getFirstOrDefault(options.dayc);??
        this.periodicity = getFirstOrDefault(options.periodicity);
        this.discount = function discount() {
            var time,
                date;
            if (arguments.length == 1) {
                time = arguments[0];
                return this.discountingMethod(this.val(), time, this.periodicity);
            } else {
                time = this.daycounter(arguments[0], arguments[1]);
                return discountingMethod(this.val(), time, this.periodicity);
            }
        };
        this.rate = function () {
            return this.val();
        };

    };

    global.phi.rate = _rate;
})(); 