(function (global, undefined) {
    var _options = {
        rate: null,
        discounting: 'fixedThenCompounded',
        discountFactors: null,
        interpolationMethod: null,
        rates: null
    },
    getFirstOrDefault = global.phi.getFirstOrDefault ,     
    discoutingMethods = global.phi.discountingMethods,
    extend = global.phi.extend,
    discountFactorFor = function (referenceDate, options) {
    // should provide the correct function for discounting 
    // given the value
    return (function (paymentDate) {
           return 1; // Math.exp(-options.rate * yearFraction(referenceDate, paymentDate));
        });
    },
    rateCurve_ = (function () {
    return (function rateCurve(referenceDate, options) {
         if (!(this instanceof rateCurve)) {
               return new rateCurve(referenceDate, options);
           } else {
              this.referenceDate = referenceDate;
              this.options = extend(extend({}, _options), options);
              this.discountFactor = discountFactorFor(referenceDate, this.options);
             // for bootstrapping
              this.updateNode = function (index, val) {
           }
     }
     });
  } ());


    simpleRateCurve = function simpleRateCurve(referenceDate, rate) {
        if (!(this instanceof simpleRateCurve)) {
            return new simpleRateCurve(referenceDate, rate);
        } else {
            this.referenceDate = referenceDate;
            this.options = extend(extend({}, _options), options);
            this.discountFactor = discountFactorFor(referenceDate, this.options);
            this.rate = function () {
                return rate.val;
            }
            // for bootstrapping
            this.updateNode = function (val) {
                this.rate.val = val;
            }
        }
    };

    piecewiseRateCurve = function piecewiseRateCurve(referenceDate, rate) {
        if (!(this instanceof piecewiseRateCurve)) {
            return new piecewiseRateCurve(referenceDate, rate);
        } else {
            this.referenceDate = referenceDate;
            this.options = extend(extend({}, _options), options);
            this.discountFactor = discountFactorFor(referenceDate, this.options);
            this.rate = function rate(date, options) {
                
            }
            // for bootstrapping
            this.updateNode = function (val) {
            }
        }
    };

    piecewiseDiscountCurve = function piecewiseDiscountCurve(referenceDate, rate) {
        if (!(this instanceof piecewiseDiscountCurve)) {
            return new piecewiseDiscountCurve(referenceDate, rate);
        } else {
            this.referenceDate = referenceDate;
            this.options = extend(extend({}, _options), options);
            this.discountFactor = discountFactorFor(referenceDate, this.options);
            // for bootstrapping
            this.updateNode = function (val) {
            }
        }
    };



    global.phi.rateCurve = rateCurve_;
} (this));

/*
usage --------------------
var rateCurve = simpleRateCurve(referenceDate, { rate:  .03, discounting : fixedThenCompounded} );

var rateCurve = piewiseRateCurve( referenceDate, { discountFactors: [0.080, 0.070], dates : [date(2012, date.january, 0),date(2012, date.january, 0)],  interpolationMethod:linear});

var rateCurve = discountingRateCurve(referenceDate, { discountFactors: [0.98, 0.070], dates : [date(2012, date.january, 0),date(2012, date.january, 0)],  interpolationMethod:linear});

var df = rateCurve.discountFactor(date);

var engine = new discountingEngine(rateCurve);

engine.NPV (bond); 
engine.IRR(bond, dirtyPrice); 
engine.IRR(bond, {cleanPrice : 56.5});
engine
engine.spread(bond);
engine.fairRate(swap);

var startDate= new Date(2012, phi.January, 1);
var endData = new Date(2034, phi.March, 03);

var schedule = schedule(startDate, endDate, adjustmentMethod, endOfMonth);

for(var i in schedule){
console.log(i.referencetart + " " + i.referenceEnd + " " +i.effectiveDate);
}

var fixedrateBond = bond({schedule : schedule, issueDate:issueDate, maturityDate:maturityDate******}),
floatingRateBond: bond({schedule: schedule, floatingRate : {index: name, spread:, gearing : , inArrears: 0},issueDate: ***  , maturityDate:*****});
stepupCouponBond : bond({schedules : , rates : }

Il faut prendre le fichier cashflows.cpp pour voir comment ca marche.

var discountingEngine = discountingEngine(rateCurve)
var pricingResult = discountingEngine.priceBond(bond);

pricingResult.price(), pricingResult.duration, pricingResult.convexity()
discountingEngine.compute('riskAnalytics', bond,price);
discountingEngine.compute('pricingAnalytics', bond, price);



var grid = grid();
grid.preparevalue();

grid.sendCalcultations(listOfCalculations, function(res){
    console.log(JSON.toString(res));
});


// Peut se faire avec l'utilisation de nodejs et de async ou alors step....


**/
