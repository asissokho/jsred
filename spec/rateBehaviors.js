describe('rate behaviours', function (){

    it('should be able to initialize', function (){
        var r = rate();
        expect(r).not.toBe(null);
    });

    it('should be able to calculate df acccording to time', function(){
        var r = rate(),
            t = 2.234;
            r.val = .02;
        expect(r.discount(t) <= 1).toBe(true);
    });

    it('Array should should be able to sum', function(){
        expect ([0.1, 0.2].sum()).toBe(0.3);
    });
});

describe ("basic requirements for optimizers", function (){

	it("should be able to the zero of a function", function f(){
		var optimise = optimisers.dichotomy,
		    cubic     = function cubic(x){
				return x*x*x - 1;    
		    };
		var expected = 1,
		    lower = -13,
		    upper = 13,
		    target = 0,
		    precision = 0.0001,
		    result =  optimise(cubic, target, lower, upper);
		console.log("found result after "+ result.numberOfIterations + " iterations");
		console.log("the result is "+ result.res);

		expect(Math.abs(result.res- expected) < precision).toBe(true);
	});

    it("using optimisers to get a target value", function (){
        var optimise = optimisers.dichotomy,
            cubic = function(x) { return x*x*x - 1;},
            expected = 2,
            lower = -13,
            upper = 13,
            target = 7,
            precision = 0.0001,
            result = optimise(cubic, target, lower, upper);
        expect(Math.abs(result.res -expected) < precision).toBe(true);
    });

});
