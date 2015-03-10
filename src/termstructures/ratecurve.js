(function (){
    // the main objective of rateCurves is to provide discount factors for a given date
    var simpleContinuousRateCurve(){
        return new simpleContinuousRateCurve.fn.init();
    };

    simpleContinuousRateCurve.fn = {

        init: function (){
            if(arguments.length==1){

            }
            if(arguments.length==2){

            }

        },

        discountFactor: function (d){
            var time = this.dayCounter().yearFraction(valueDate(),d);
            return Math.exp(-1*r*t);

        },
        valueDate: function(){
        },
        calendar : function{
        },
        dayCounter: function(){
        }
    };

    simpleContinuousRateCurve.fn.init.prototype = simpleContinuousRateCurve.fn;

}());
