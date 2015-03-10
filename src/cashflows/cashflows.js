(function(){

    function cashflows(){
        return new cashflow.fn.init();
        
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


    // I want people to be able to do something like this 
    // cashflows('price', bond) doit etre la meme chose que cashflows.price(bond);
    // bond().evaluationDate(date).shedule(start,.........).price(yc,evaluationdate).results;
    // bond(....).price(yieldcuve, evaluationDate);
    // bond(....).analytics({dirtyPrice: .34})
    // bond.cashflows() doit etre la meme chose que bond('cashflows')
    // bond.cashflows(something) doit etre   la meme chose que bond('cashflows', something)
    //
    //  bond = function (){
    //      return  new bond.fn();
    //  };
    //  
    //  bond.fn{
    //      init : function (){},
    //      price : function (){},
    //      issueDate: function(){},
    //      schedule : function(){},
    //      coupon : function(){},
    //      results : function(){}
    //      
    //  }
    //
    // cf.price = function (bond){return 2;}
    // et que ce truc soit pris en compte

}());
