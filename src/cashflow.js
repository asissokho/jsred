var cashflow = (function (){
    
	function cashflow(options){
        return new cashflow.fn.init(options || {});
	};

    cashflow.fn = {
        init : function(options){
		    this.amount= options.amount;
            this.paymentDate = options.paymentDate;
        },

        start : function(){
            if(arguments.length==0)
                return this.referenceStart;
            this.referenceStart= arguments[0];
            return this;

        },
        end : function(){
            if(arguments.length==0)
                return this.referenceEnd;
            this.referenceEnd= arguments[0];
            return this;

        },
        exCouponDays: function(){
            if(arguments.length==0)
                return exCouponDays();
            this._exCouponDays = arguments[0];
            return this;
        },
        value : function(){
            if(arguments.length==0)
                return this.amount;
            this.amount= arguments[0];
            return this;

        },

        valueDate: function(){
            if(arguments.length==0){
                return this.paymentDate;
            }
            this.paymentDate = arguments[0];
            return this;
        }
        
    }
// some changes done at work


    cashflow.fn.init.prototype = cashflow.fn;
    
    return cashflow;

}());

