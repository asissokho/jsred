(function (global) {

    /* Requires phi.dateArithmetics */
    /* Handles only dates, no value or paid amout i*/
    var advance = global.phi.timeroutines.dateArithmetics.advance,
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