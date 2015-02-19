var global = this;

describe ("basic requirements for instruments", function (){

	it("obligation should have issueDate", function(){

		var obligation = new fixedRateBond();
		expect(obligation.issueDate).not.toBe(null);
	});
		
	it("one plus one should equal two", function (){
		expect(1+1).toBe(2);
	});

	it("obligation should be cool", function f(){
		expect(true).toBe(true);
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
