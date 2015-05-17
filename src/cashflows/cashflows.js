require('../core')

var _willBeReceived = function (settlementDate){
    return function (cashflow){
        if(!cashflow['hasOccured' ] ){
            var exCouponDays = cashflow.exCouponDays || 0,
                referenceDate = defaultCalendar.add( settlementDate, -1*exCouponDays);
            return settlementDate < referenceDate;
        }
        return !cashflows.hasOccured(settlementDate);
    };
},

_discount = function (yieldCurve, settlementDate){
    return function (cashflow){
        return yieldCurve.discountFactor(settlementDate, cashflow.paymentDate) * cashflow.amount;
   };
}

var cashflows = function cashflows(_cfs){
    return new cashflow.fn.init(_cfs);
};

cashflows.fn = {

    init : function (_cfs){
        this.cfs = _cfs;
    },
    hasOccured : function(date){
        return this.paymentDate && this.paymentDate < date;
    },
    accruedAmount : function(date){
        
    }
};

cashflows.prototype.accruedAmount = function (settlementDate){
    // this is the type of code that we write a lot, I wanted to get it factorized 
    // to its more simplistic form
    var i=0,
        n = this.cfs.length,
        accrued = 0;
    for(;i<n;i++){
       accrued+=this.cfs[i].accruedAmount(settlementDate);
    }        
    return accruedAmount;
};

cashflows.prototype.npv = function (yieldCurve, settlementDate, evaluationDate){
     return this.cfs.filter(_willBeReceived(settlementDate))
            .map(_discount(yieldCurve, settlementDate)).sum();
};


cashflows.prototype.modifiedDuration = function (yieldCurve, settlementDate){
};

cashflows.prototype.maccaulayDuration = function (yieldCurve, settlementDate){
};

cashflows.prototype.simpleDuration = function (yieldCurve, settlementDate){
   var i=0,
       n = this.cfs.length,
       npv = 0;
   for(;i<n;i++){
      npv+=yieldCurve.discountFactor(this.cfs[i].date)*this.cfs[i].value(settlementDate);
   }        
   return npv;

};

module.exports = cashflows;

