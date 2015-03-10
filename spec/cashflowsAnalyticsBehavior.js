describe("cashflows npv function", function (){

    it("npv of an empty list of cashflows is zero", function (){
       var npv= phi.npv; 
       var cashflows = [];
       npv(cashflows, yc, new Date());
    });

});
