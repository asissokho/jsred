
describe ("basic requirements for instruments", function (){

	it("obligation should have issueDate", function(){

		var obligation = new fixedRateBond();
		expect(obligation.issueDate).not.toBe(null);
	});
		
	it("one plus one should equal two", function (){
		expect(1+1).toBe(2);
	});
});
