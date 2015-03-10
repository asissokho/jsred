/*
 * discountingPricer prices an instrument based on a list of cashflows,
 * it uses additional constructs of cashflows element in order to compute 
 * different types of duration and convexity
 * */   
(function(){
    function discountingPricer(rateCurve){
        this.rateCurve = curve;
    };

    discountingPricer.prototype.price = function (bond, evaluationDate){
        var val = 0,
            i = 0,
            cashfows= bond.cashflows(),
            n = cashflows.length;
        for(;i<n;i++){
            // here, we want things to be very simple!
            // if i pass the date to the cashflow, it should return 0
            // if the cashflow won't be received at that date
            // if we call cashflow without passing a date, it just return the value without extrat check 
                val+= cashflows[i].value(evaluationDate)*rateCurve.discountFactor(cashflows[i].date)
            }
        return val; 
    };

    discountingPricer.prototype.riskAnalytics = function (bond){
    };
    
    discountingPricer.prototype.pricingAnalytics = function (bond){

        var simpleResults = this.price(bond);

        return { 
            price : simpleResults.price,
            accruedInterest  : simpleResults.accruedInterest,
            duration : 0,
            macaulayDuration :9,
            modifiedDuration: 9,
            convexity: 9,
        };
    };

}());
