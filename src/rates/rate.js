"use strict";

var rate = (function (){

    var    _frequencies = {
            annual: 1,
            quaterly: 4, 
            semiannual: 2,
            everyfourmonth: 3,
            _default: 1
        },

        _compoundingMethods = {
            'simple': function (rate, time){
                return 1 + rate * time;
            },

            'compounded': function(rate, time, frequency){
                return Math.pow(1 + rate/frequency, frequency * time);
            },
            'continuous': function (rate, time){
                return  Math.exp(rate*time);
            },

            'simpleThenCompounded': function(rate, time, frequency){
                if (time<=1.0/frequency){
                    return 1.0 + rate * time;
                }
                else{
                    return Math.pow(1 + rate/frequency, frequency * time);
                }
            }
        },

    _rate = function rate(_options) {
        var options = _options || {};
        if (!(this instanceof rate) ) {
            return new rate(options);
        }

        this.val = options.val || 0; 
        this.periodicity = options.frequency || 'annual';
        this.compounding = options.compounding || 'simpleThenCompounded';
    };

    _rate.prototype.discount = function (){
        var time,
            date;
        if (arguments.length === 1) {
            time = arguments[0];
        } else {
            time = this.daycounter(arguments[0], arguments[1]);
        }

        console.log(_compoundingMethods);
        return 1 / _compoundingMethods[this.compounding](this.val, time, _frequencies[this.periodicity]);
    }

    return _rate;
})();

//module.exports = rate;
