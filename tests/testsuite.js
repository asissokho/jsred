/// <reference path="instruments.js" />
/// <reference path="engines.js" />
(function (global) {
    "use strict";

    var dateArithmetics = global.phi.timeroutines.dateArithmetics,
    test("time routines tests", function () {
        ok(true === global.phi.getFirstOrDefault(global.phi.calendars).isHoliday(new Date(2013, 0, 19)), "19 Jan 2013 is not a weekday!");
        ok(dateArithmetics.areSameDate(new Date(2013, 0, 20), dateArithmetics.advance(new Date(2013, 0, 19), "1D")), "19 Jan 2013 plus 1D is 20 Jan 2013 ");
        ok(dateArithmetics.areSameDate(new Date(2013, 0, 26), dateArithmetics.advance(new Date(2013, 0, 19), "1W")), "19 Jan 2013 plus 1W is 26 Jan 2013 ");
        ok(dateArithmetics.areSameDate(new Date(2013, 3, 19), dateArithmetics.advance(new Date(2013, 0, 19), "3M")), "19 Jan 2013 plus 3M is 19 Apr 2013 ");
        ok(dateArithmetics.areSameDate(new Date(2014, 0, 19), dateArithmetics.advance(new Date(2013, 0, 19), "1Y")), "19 Jan 2013 plus 1Y is 19 Jan 2014 ");
    });

    test("schedule", function () {
        ok((global.phi.Schedule(new Date(2013, 0, 1), new Date(2018, 0, 1), '1M').entries.length === 60), 
            "phi.Schedule(new Date(2013, 0, 1), new Date(2018, 0, 1), '1M').length == 60");
    });

    test("utilities", function () {
        ok((global.phi.getFirstOrDefault(global.phi.calendars)).name === "_default", "OK : phi.getFirstOrDefault");
    });

	// comment this out!
    test("rateCurve", function () {
        ok((global.phi.rateCurve().discountFactor() === 1), "OK : global.phi.rateCurve.discountFactor()=== 1");

        ok((function () {
            var curve = global.phi.rateCurve(new Date(), { rate: 0.05 });
            if (curve.discountFactor() === 1) {
                console.log("c'est ok");
                console.log(JSON.stringify(curve));
                return true;
            } else {
                return false;
            }

        } ()), "merde");
    });
	
	test("maths", function(){
		var interpolators = global.phi.interpolators,
		d1 = interpolators.linearInterpolator([1,3], [3,9]),
		d2 = interpolators.linearInterpolator([new Date(2012, 1, 1), new Date(2014, 1, 1)], [12,14]);
		ok (d1(2)===6, "linear interpolation test 1 : OK");
		console.log(d2(new Date(2012, 1, 1)));
	});
 

} (this));
