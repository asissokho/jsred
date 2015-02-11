(function (global, phi) {
    var engines = (function () {

        var interestRatePricer = function () {

            var InterestRatePricer = function InterestRatePricer(rate) {
                this.rate = rate;
            },
		        _i,
		        _len;

            InterestRatePricer.prototype.price = function (instrument, date) {
                ///	<summary>
                ///		1: price(instrument) - This function accepts an instrument which can be priced
                ///	</summary>
                ///	<param name="instrument" type="instrument">
                ///		1: instrument - instrument to price
                ///	</param>
                ///	<returns type="number" />
                var cashflows = instrument.cashflows(),
			        npv = 0;
                for (_i = 0, _len = cashflows.length; _i < _len; _i++) {
                    npv = npv + this.discount(date, cashflows[_i].amount, cashflows[_i].paymentDate);
                }
                return npv;
            };

            InterestRatePricer.prototype.discount = function (referenceDate, amount, paymentDate) {
                var yearFraction = time.yearFraction(referenceDate, paymentDate);
                return amount * Math.exp(-1 * this.rate * yearFraction);
            };

            return InterestRatePricer;
        }


        return {
            interestRatePricer: interestRatePricer
        };


    })();
    global.phi.engines = engines;
})(this);

