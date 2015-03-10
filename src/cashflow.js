var cashflow = (function (){
    
	function cashflow(options){
        return new cashflow.fn.init(options);
	};

    cashflow.fn = {
        init : function(options){
            this.valueDate = options.valueDate;
		    this.amount= options.value;
            this.paymentDate = options.paymentDate;
        },

        valueDate : function(){
            if(arguments.length==0)
                return this.valueDate;
            this.valueDate = arguments[0];
            return this;
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
            referenceEnd= arguments[0];
            return this;

        },
        exCouponDays: function(){
            if(arguments.length==0)
                return exCouponDays();
            _exCouponDays = arguments[0];
            return this;
        },
        value : function(){
            if(arguments.length==0)
                return this.amount;
            amount= arguments[0];
            return this;

        }
        
    };

    cashflow.fn.init.prototype = cashflow.fn;
    cashflow.fn.init.prototype= cashflow.fn;
    return cashflow;

}());

