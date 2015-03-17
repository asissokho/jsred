describe("cashflows npv function", function (){

    it("npv of an empty list of cashflows is zero", function (){
        console.log(phi);
       var cf = phi.cashflows(),
           npv= cf.npv,
           yc = phi.yieldCurve,
           cashflows = [];
       var presentValue = npv(cashflows, yc);
    });

});
