var rateCurve = (function (){

    var rateCurve = function (curveType, valueDate, options){
        return new rateCurve.fn.init(options);
    };

    var curveTypes = {
        'flat':{ 
            discountFactor : function (options){ 
                return function (settlementDate, paymentDate){
                   return rate.discount(this.valueDate, date); 
                }

            },
            updateNode : function (){
                throw new { message : 'update node not supported'};
            }
        },
        'discreteDiscountFactors': function()

        },
        
        'discreteRates': function(){

        }

    }    
    rateCurve.fn = {

        init : function (curveType, valueDate, options){
            this.valueDate = valueDate;
            this.discountFactor = curveTypes[curveType].discountFactor(valueDate, options);

        },
        updateNode : function (i, value){

        }

    };
    rateCurve.fn.init.prototype = rateCurve.fn;

});
