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

describe("mapping at reducing functions", function (){
    
    var times3 = function (x){
        return x*3;
    };

    it("1 + 2 + 3 = 6", function(){
        var res = [1, 2, 3].sum(); 
            expected = 6;
        console.log(res);
        expect(res).toBe(expected);
    });

    it("1*3 + 2*3 + 3*3 = 6", function(){
        var res = [1,2,3].map(times3).sum();
            expected = 18;
        expect(res).toBe(expected);
    });

     it("multiplying the first 4 natural numbers yields to 24", function(){
        var res = phi.mapReduce(phi.identity, phi.multiply, [1,2,3,4], 1),
            expected = 24;
        expect(res).toBe(expected);
    });

     it("converting to mapReduce function", function(){
        var res = phi.mapReduce(phi.identity, phi.plus, [1,2,3],0 ),
            res2 = phi.sum([1,2,3], phi.identity);
        expect(res).toBe(res2);

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
