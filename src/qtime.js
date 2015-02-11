    "use strict";
    var times = (function () {

        /* Definition of the module and its dependencies 
        app.define('times', app, global);
        app.use('times.dateAdjustmentMethods', app, global);
        app.use('times.dayCounters', app, global);
        app.use('yearFractionMethods', app, global);

        */

        var defaultOptions = {
            discounting: 'simpleThenCompounded',
            dayCount: 'act/act',
            dateAdjustmentConvention: 'modifiedFollowing'
        },

        dateAdjustmentMethods = {},
        dayCounters = {},
        yearFractionMethods = {};


        function dayCount(){
            
        }


        function yearFraction(startDate, endDate, daycountMethod) {
            ///	<summary>
            ///		1: yearFraction(referenceDate, endDate, dayCount)- This function two date and return the yearFraction beetween the given dates
            ///	</summary>
            ///	<param name="startDate" type="Date">
            ///		1: startDate - The startDate
            ///	</param>
            ///	<param name="endDate" type="Date">
            ///		1: endDate - The endDate
            ///	</param>
            ///	<param name="dayCount" type="string">
            ///		1: dayCount - The dayCount method. Defaults to 'act/act'
            ///	</param>
            ///	<returns type="number" />

            var daycounter;

            if (daycountMethod === undefined) {
                daycounter = dayCounters.getFirstOrDefault(daycountMethod);
            }
            if (typeof daycountMethod === "function") {
                daycounter = daycountMethod;
            }

            /* Here do the actual work*/
            return 1;

        };


        function advance(startDate, periodicity, ajustmentMethod) {

            var ajustmentMethod = dateAdjustmentMethods.getFirstOrDefault(ajustmentMethod),
                endDate;

            if (typeof dateAdjustmentMethods[ajustmentMethod] !== "function") {
                throw new Error("Unknown date adjustment method " + option);
            }
            else {
                return dateAdjustmentMethods[ajustmentMethod](endDate);
            }
        };

        var Schedule = function Schedule() {

        };

        return {
            yearFraction: yearFraction,
            advance: advance,
            dayCount: dayCount,
            Schedule: Schedule
        };


    })();



