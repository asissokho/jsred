(function(global){
    
    console.log('loading cashflows');
     
    function cashflows(){
        return new cashflows.fn.init();
        
    };

    cashflows.fn = {

        init : function (){
        },

        hasOccured : function(date){
            return this.paymentDate && this.paymentDate < date;
        },

        accruedAmount : function(){
            
        },

        
    };
    cashflows.prototype.accruedAmount= function (listOfCashflows, settlementDate){
        // this is the type of code that we write a lot, I wanted to get it factorized 
        // to its more simplistic form
        var i=0,
            n = listOfCashflows.length,
            accrued = 0;
        for(;i<n;i++){
           accrued+=listOfCashflows[i].accruedAmount(settlementDate);
        }        
        return accruedAmount;
    };

    cashflows.prototype.npv = function (lisOfCashflows, yiedCurve, settlementDate){
         var i=0,
            n = listOfCashflows.length,

            npv = 0;
        for(;i<n;i++){
           npv+=yieldCurve.discountFactor(listOfCashflows[i].date)*listOfCashflows[i].value(settlementDate);
        }        
        return npv;

    };



    cashflows.prototype.modifiedDuration= function (lisOfCashflows, yieldCurve, settlementDate){
    };

    cashflows.prototype.maccaulayDuration = function (listOfCashflows, yieldCurve, settlementDate){
    };

    cashflows.prototype.simpleDuration= function (listOfCashflows, yieldCurve, settlementDate){
       var i=0,
            n = listOfCashflows.length,
            npv = 0;
        for(;i<n;i++){
           npv+=yieldCurve.discountFactor(listOfCashflows[i].date)*listOfCashflows[i].value(settlementDate);
        }        
        return npv;

    };

    global.phi= global.phi || {};

    global.phi.cashflows = cashflows;

    console.log(global.phi);

}(this));
