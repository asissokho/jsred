(function (global) {
    /* Requires phi.dateArithmetics */
    /* Handles only dates, no value or paid amout i*/
    // Here is where we use all these notions of calendars end so on 
    // in order to create nice schedule that could be used by anyone
    // our goal here is to write something like 
    //          Schedule(start, end, periodicity)
    //          var bond = Bond(schedule, rate, periodicity)
    //          var res = bondpricer("price", discountingRateCurve, bond)
    //
    var advance = function f(){}, //global.phi.timeroutines.dateArithmetics.advance,


    schedule = function (options){
        return schedule.fn.init (options);
    }


    schedule.fn = {

        init : function (options){
        },

        cashflows : function(){
        },
        calendar: function(){
        },
        start : function (){
        },
        end : function (){
        },
        tenor: function(){
        },



    };

    Schedule = function (startDate, endDate, periodicity, options) {

        if (!(this instanceof Schedule)) {
            return new Schedule(startDate, endDate, periodicity, options);
        }

        var self = this,
            entries = [],
		    nextDate,
		    previousDate = startDate;
        do {
            nextDate = advance(previousDate, periodicity);
            entries.push({
                effectiveDate: nextDate,
                startDate: previousDate,
                endDate: nextDate
            });
            previousDate = nextDate;

        } while (nextDate < endDate)

        self.entries = entries;
    };

    global.phi.Schedule = Schedule;

})(this);
