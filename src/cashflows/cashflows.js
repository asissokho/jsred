(function(global){

    var _hasOccured = function (settlementDate){
        return function (cashflow){
            if(!cashflow['hasOccured']){
                var exCouponDays = cashflow.exCouponDays || 0,
                    referenceDate = defaultCalendar.add( settlementDate, -1*exCouponDays);
                return settlementDate < referenceDate;
            }
            return cashflows.hasOccured(settlementDate);
        };
    },

    _discount = function (yieldCurve, settlementDate){
        return function (cashflow){
            return yieldCurve.discountFactor(settlementDate, cashflow.paymentDate) * cashflow.amount;
        };
    }

    var cashflows = function cashflows(){
        return new cashflow.fn.init();
    };

    cashflows.fn = {

        init : function (){
        },

        hasOccured : function(date){
            return this.paymentDate && this.paymentDate < date;
        },

        accruedAmount : function(){
            
        }
    };

    cashflows.prototype.accruedAmount = function (listOfCashflows, settlementDate){
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

    cashflows.prototype.npv = function (lisOfCashflows, yiedCurve, settlementDate, evaluationDate){
         return listOfCashflows.filter(_hasOccured(yieldCurve, settlementDate))
                .map(_discount(settlementDate, evaluationDate)).sum();
    };



    cashflows.prototype.modifiedDuration = function (lisOfCashflows, yieldCurve, settlementDate){
    };

    cashflows.prototype.maccaulayDuration = function (listOfCashflows, yieldCurve, settlementDate){
    };

    cashflows.prototype.simpleDuration = function (listOfCashflows, yieldCurve, settlementDate){
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
