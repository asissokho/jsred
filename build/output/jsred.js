(function(undefined){
    // (0, eval)('this') is a robust way of getting a reference to the global object (we refer to the global objet as _ctx)
    // For details, see http://stackoverflow.com/questions/14119988/return-this-0-evalthis/14120023#14120023
    var _ctx = this || (0, eval)('this');
(function(factory) {
    // Support three module loading scenarios
    if (typeof define === 'function' && define['amd']) {
        // [1] AMD anonymous module
        define(['exports', 'require'], factory);
    } else if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        // [2] CommonJS/Node.js
        factory(module['exports'] || exports);  // module.exports is for Node.js
    } else {
        // [3] No module loader (plain <script> tag) - put directly in global namespace
        factory(_ctx['jsred'] = {});
    }
}(function(jsred,amdRequire){
var phi = (function (global) {
    "use strict";

    var  phi = function phi(fn) {
        return new phi.fn.init(fn);
    };

    phi.fn = {
        init: function (fn) {
            if (typeof fn === "function") {
                fn();
            }
        },

        getFirstOrDefault: function (obj, prop) {
            if (!(prop)) {
                return obj['_default'];
            }
            else {
                if (typeof prop === 'string') {
                    return obj[prop] || obj['_default'];
                }
                else {
                   return prop;
                }
            }
        },

        filter : function (arrayLike){
            var i=0,
                n=arrayLike.length,
                filteredArray = [];
            for(;i<n;i++){
                if(filter(arrayLike[i])){
                    filteredArray[i] = arrayLike[i];
                }
            }
            return filteredArray;
        },

        map: function (arrayLike, f) {
            var i=0,
                n=arrayLike.length,
                mappedArray = new Array[n];
            for(;i<n;i++){
                mappedArray[i] = f(arrayLike[i]);
            }
            return mappedArray;
        },

        plus: function (x, y){
            return x+y;
        },

        multiply: function (x,y){
            return x*y;
        },

        sum: function (arrayLike) {
            var i=0,
                s=0,
                n=arrayLike.length;
            for(;i<n;i++){
                s+=arrayLike[i];
            }
            return s;
        },

       identity: function (x){
           return x;
       },

        mapReduce: function(map, reduce, arrayLike, reduceInvariant){
            var i = 0,
                reducedValue = reduceInvariant,
                n = arrayLike.length;
            for(;i<n;i++){
                reducedValue = reduce(reducedValue, map(arrayLike[i]));
            }

            return reducedValue;
        },
            
        isArray: Array.isArray || function (arg) {
            return Object.prototype.toString.call(arg) === "[object Array]";
        },

        isString: function (arg) {
            return (typeof arg === "string");
        },

        extend: function (target, src) {
            for (var prop in src) {
                if (src.hasOwnProperty(prop) && !target[prop]) {
                    target[prop] = src[prop];
                }
            }
            return target;
      },
        constructor: phi
    };

    Array.prototype.sum = function(){
        var self = this,
            i = 0,
            s = 0,
            n = self.length;
        for(; i< n; i++){
            s+= 10*self[i];
        }
        return s / 10;
    };
 
    phi.fn.prototype = phi.fn;

    phi.fn.extend(phi, phi.fn);

    global.phi = phi;

    return phi;
} (this));

(function (global, phi) {
    "use strict";
    var isArray = global.phi.isArray,
        len,
        i,
        _options = {
            extrapolate: 'flat'
        },
       validate = function (x, fx, options) {
           if (isArray(x) && isArray(fx) && fx.length === x.length && fx.length>1) {
               // faut-il s'attendre à ce que la suite x soit monotone? si oui, faut il 
               // modifier la structure de données en entrée
               return true;
           } else {
               return false;
           }
       },

       findInterval = function (xs, x) {
           i = 0,
           len = xs.length;
           if (x < xs[0]) {
               return -1;
           }

           if (x > xs[len]) {
               return len;
           }

           for (; i < len - 1; i++) {
               if (xs[i] <= x && xs[i + 1] >= x) {
                   return i;
               }
           }

       },
    linearInterpolator = function (xs, fxs, options) {
        var last,
            first,
            n,
	    options=options||{};
			
        if (!validate(xs, fxs, options)){
            throw Error("not valid parameters");
	}
		
	options.extrapolate='flat';
        n = xs.length;
	first = (fxs[1]-fxs[0])/(xs[1]-xs[0]);
	last = (fxs[n]-fxs[n-1])/(xs[n]-xs[n-1]);

        return function (x) {
            var index = findInterval(xs, x);
	    if(n>index && index>=0){ 
		return ((x - xs[index]) * fxs[index + 1] + (xs[index + 1] - x) * fxs[index]) / (xs[index + 1] - xs[index]);
	    }
	    else{
	if(options.extrapolate==='flat'){
		     return (index>=n)?fxs[n]:fxs[0];
		}
	    if(options.extrapolate==='closest'){
	            return (index>=n)?fxs[n]:fxs[0];
           }
       throw Error("argument out of range, extrapolation method: "+ options.extrapolate);
      }
     };
    },
	
    interpolators = {
        linearInterpolator : linearInterpolator
    };

    global.phi.interpolators = interpolators;
} (this)); 
(function (){

	var January = Jan =0,
		February = Feb = 1,
		March = Mar =  2,
		April = Apr = 3,
		May = 4,
		June = Jun = 5,
		July = Jul = 6,
		August = Aug = 7,
		September = Sep = 8,
		October = Oct = 9,
		November = Nov = 10,
		December = Dec = 11;


}());
(function (global, phi) {
        var calendars = global.phi.calendars,
        getFirstOrDefault = phi.getFirstOrDefault;

    (function () {
            var following = function modifiedFollowing(date, calendar) {
                calendar = getFirstOrDefault(calendars, calendar);
                while (calendar.isHoliday(date)) {
                    date = advance(date, "1d");
                }
                return date;
            },

            modifiedFollowing = function modifiedFollowing(date, calendar) {
                var month = date.getMonth();
                calendar = getFirstOrDefault(calendars, calendar);
                while (calendar.isHoliday(date)) {
                    date = advance(date, "1d");
                }
                if (date.getMonth() !== month) {
                    return preceeding(date, calendar);
                }
                else {
                    return date;
                }
            },

            modifiedPreceeding = function modifiedPreceeding(date, calendar) {
                var month = date.getMonth();
                calendar = getFirstOrDefault(calendars, calendar);
                while (calendar.isHoliday(date)) {
                    date = advance(date, "-1d");
                }

                if (date.getMonth() !== month) {
                    return following(date, calendar);
                }
                else {
                    return date;
                }

            },
            preceeding = function preceeding(date, calendar) {
                calendar = phi.getFirstOrDefault(calendars, calendar);
                while (calendar.isHoliday(date)) {
                    date = advance(date, "-1d");
                }
                return date;
            },

            unadjusted = function unadjusted(date, calendar) {
                return date;
            },
            advance = function advance(date, period) {
                var day = date.getDate(),
                    year = date.getFullYear(),
                    month = date.getMonth(), /* O based on javascript */
                    qty = parseInt(period),
                    units = period.charAt(period.length - 1).toLowerCase(); /*get last char */

                switch (units) {
                    case "d":
                        day = day + qty;
                        break;
                    case "w":
                        day = day + 7 * qty;
                        break;
                    case "m":
                        month = month + qty;
                        break;
                    case "y":
                        year = year + qty;
                        break;
                }
                return new Date(year, month, day);
            },
            areSameDate = function areSameDate(dateA, dateB) {
                return (dateA.getDate() == dateB.getDate() && dateA.getFullYear() == dateB.getFullYear() && dateA.getMonth() == dateB.getMonth());
            }
            ;

            var timeroutines = {
                dateAdjustmentMethods: {
                    modifiedFollowing: modifiedFollowing,
                    unadjusted: unadjusted,
                    preceeding: preceeding,
                    modifiedPreceeding: modifiedPreceeding,
                    _default: unadjusted
                },

                dateArithmetics: {
                    advance: advance,
                    areSameDate: areSameDate
                }

            };
            phi.timeroutines = timeroutines;
            phi.fn.timeroutines = timeroutines;
    } ());

} (this, phi));
(function () {
    var WesterEstearMondays = [
                  98,  90, 103,  95, 114, 106,  91, 111, 102,   // 1901-1909
             87, 107,  99,  83, 103,  95, 115,  99,  91, 111,   // 1910-1919
             96,  87, 107,  92, 112, 103,  95, 108, 100,  91,   // 1920-1929
            111,  96,  88, 107,  92, 112, 104,  88, 108, 100,   // 1930-1939
             85, 104,  96, 116, 101,  92, 112,  97,  89, 108,   // 1940-1949
            100,  85, 105,  96, 109, 101,  93, 112,  97,  89,   // 1950-1959
            109,  93, 113, 105,  90, 109, 101,  86, 106,  97,   // 1960-1969
             89, 102,  94, 113, 105,  90, 110, 101,  86, 106,   // 1970-1979
             98, 110, 102,  94, 114,  98,  90, 110,  95,  86,   // 1980-1989
            106,  91, 111, 102,  94, 107,  99,  90, 103,  95,   // 1990-1999
            115, 106,  91, 111, 103,  87, 107,  99,  84, 103,   // 2000-2009
             95, 115, 100,  91, 111,  96,  88, 107,  92, 112,   // 2010-2019
            104,  95, 108, 100,  92, 111,  96,  88, 108,  92,   // 2020-2029
            112, 104,  89, 108, 100,  85, 105,  96, 116, 101,   // 2030-2039
             93, 112,  97,  89, 109, 100,  85, 105,  97, 109,   // 2040-2049
            101,  93, 113,  97,  89, 109,  94, 113, 105,  90,   // 2050-2059
            110, 101,  86, 106,  98,  89, 102,  94, 114, 105,   // 2060-2069
             90, 110, 102,  86, 106,  98, 111, 102,  94, 114,   // 2070-2079
             99,  90, 110,  95,  87, 106,  91, 111, 103,  94,   // 2080-2089
            107,  99,  91, 103,  95, 115, 107,  91, 111, 103,   // 2090-2099
             88, 108, 100,  85, 105,  96, 109, 101,  93, 112,   // 2100-2109
             97,  89, 109,  93, 113, 105,  90, 109, 101,  86,   // 2110-2119
            106,  97,  89, 102,  94, 113, 105,  90, 110, 101,   // 2120-2129
             86, 106,  98, 110, 102,  94, 114,  98,  90, 110,   // 2130-2139
             95,  86, 106,  91, 111, 102,  94, 107,  99,  90,   // 2140-2149
            103,  95, 115, 106,  91, 111, 103,  87, 107,  99,   // 2150-2159
             84, 103,  95, 115, 100,  91, 111,  96,  88, 107,   // 2160-2169
             92, 112, 104,  95, 108, 100,  92, 111,  96,  88,   // 2170-2179
            108,  92, 112, 104,  89, 108, 100,  85, 105,  96,   // 2180-2189
            116, 101,  93, 112,  97,  89, 109, 100,  85, 105    // 2190-2199
            ],

            OrthodoxEstearMondays = [
                 105, 118, 110, 102, 121, 106, 126, 118, 102,   // 1901-1909
            122, 114,  99, 118, 110,  95, 115, 106, 126, 111,   // 1910-1919
            103, 122, 107,  99, 119, 110, 123, 115, 107, 126,   // 1920-1929
            111, 103, 123, 107,  99, 119, 104, 123, 115, 100,   // 1930-1939
            120, 111,  96, 116, 108, 127, 112, 104, 124, 115,   // 1940-1949
            100, 120, 112,  96, 116, 108, 128, 112, 104, 124,   // 1950-1959
            109, 100, 120, 105, 125, 116, 101, 121, 113, 104,   // 1960-1969
            117, 109, 101, 120, 105, 125, 117, 101, 121, 113,   // 1970-1979
             98, 117, 109, 129, 114, 105, 125, 110, 102, 121,   // 1980-1989
            106,  98, 118, 109, 122, 114, 106, 118, 110, 102,   // 1990-1999
            122, 106, 126, 118, 103, 122, 114,  99, 119, 110,   // 2000-2009
             95, 115, 107, 126, 111, 103, 123, 107,  99, 119,   // 2010-2019
            111, 123, 115, 107, 127, 111, 103, 123, 108,  99,   // 2020-2029
            119, 104, 124, 115, 100, 120, 112,  96, 116, 108,   // 2030-2039
            128, 112, 104, 124, 116, 100, 120, 112,  97, 116,   // 2040-2049
            108, 128, 113, 104, 124, 109, 101, 120, 105, 125,   // 2050-2059
            117, 101, 121, 113, 105, 117, 109, 101, 121, 105,   // 2060-2069
            125, 110, 102, 121, 113,  98, 118, 109, 129, 114,   // 2070-2079
            106, 125, 110, 102, 122, 106,  98, 118, 110, 122,   // 2080-2089
            114,  99, 119, 110, 102, 115, 107, 126, 118, 103,   // 2090-2099
            123, 115, 100, 120, 112,  96, 116, 108, 128, 112,   // 2100-2109
            104, 124, 109, 100, 120, 105, 125, 116, 108, 121,   // 2110-2119
            113, 104, 124, 109, 101, 120, 105, 125, 117, 101,   // 2120-2129
            121, 113,  98, 117, 109, 129, 114, 105, 125, 110,   // 2130-2139
            102, 121, 113,  98, 118, 109, 129, 114, 106, 125,   // 2140-2149
            110, 102, 122, 106, 126, 118, 103, 122, 114,  99,   // 2150-2159
            119, 110, 102, 115, 107, 126, 111, 103, 123, 114,   // 2160-2169
             99, 119, 111, 130, 115, 107, 127, 111, 103, 123,   // 2170-2179
            108,  99, 119, 104, 124, 115, 100, 120, 112, 103,   // 2180-2189
            116, 108, 128, 119, 104, 124, 116, 100, 120, 112    // 2190-2199
            ];

    var easterMonday = function estearMonday(year, calendarType){
        if(calendarType === 'orthodox'){
            return OrthodoxEstearMonday[year-1901];
        }
        else {
            return WesterEstearMondays[year-1901];
        }
    };

    function isWeekend(date){
        var d = date.getDay();
        return (d===0 || d===6);
    };

    function isHoliday(date){
        return !(this.isBusinessDay(date));
    };

    var calendars = {

    _default: {
        isHoliday: isHoliday,
        isBusinessDay: function isBusinessDay(date){
            return !isWeekend(date);
        },
        name : '_default'
    },
    TARGET:{
        isHoliday:isHoliday,
        isBusinessDay: function (date){
                        var d = date.dayOfMonth(), dd = date.dayOfYear();
                        var  m = date.month();
                        var  y = date.year();
                        var  em = easterMonday(y);
                        if (isWeekend(date)
                            // New Year's Day
                            || (d == 1  && m == January)
                            // Good Friday
                            || (dd == em-3 && y >= 2000)
                            // Easter Monday
                            || (dd == em && y >= 2000)
                            // Labour Day
                            || (d == 1  && m == May && y >= 2000)
                            // Christmas
                            || (d == 25 && m == December)
                            // Day of Goodwill
                            || (d == 26 && m == December && y >= 2000)
                            // December 31st, 1998, 1999, and 2001 only
                            || (d == 31 && m == December &&
                                (y == 1998 || y == 1999 || y == 2001)))
                         return false;
                     return true;
            },
            name: 'TARGET'
    },
    };

    phi.calendars = calendars;
    phi.easterMonday = easterMonday;

}());
(function (global) {
                
        var January = 0,
        February=1,
        March=2,
        April=3,
        May=4,
        June = 5,
        July= 6,
        August = 7,
        September =8,
        October = 9,
        November=10,
        December= 11,
        dayLengthInMilliseconds = 86400000,
        monthLength = [],
        leapYearMonthLength = [],
        isLeapYear = function (y) { 
            return y % 4 === 0; // this is true from 1901 to 2099
        },
        dayCount = function (d1, d2) {
            return (d2 - d1) / dayLengthInMilliseconds;
        },

        thirty360USDayCount = function thirty360USDayCount(dateA, dateB) {
                    var dd1 = dateA.getDate(),
                        dd2 = dateB.getDate(),
                        mm1 = dateA.getMonth(),
                        mm2 = dateB.getMonth(),
                        yy1 = dateA.getFullYear(),
                        yy2 = dateB.getFullYear();
            if (dd2 == 31 && dd1 < 30) { dd2 = 1; mm2++; }
            return 360 * (yy2 - yy1) + 30 * (mm2 - mm1 - 1) + Math.max(0, 30 - dd1) + Math.min(30, dd2);
        },
         thirty360EUDayCount = function thirty360USDayCount(dateA, dateB) {
                    var dd1 = dateA.getDate(),
                        dd2 = dateB.getDate(),
                        mm1 = dateA.getMonth(),
                        mm2 = dateB.getMonth(),
                        yy1 = dateA.getFullYear(),
                        yy2 = dateB.getFullYear();
             return 360 * (yy2 - yy1) + 30 * (mm2 - mm1 - 1) + Math.max(0, 30 - dd1) + Math.min(30, dd2);
         };

        (function (){
            Date.prototype.dayOfYear = function (){
                var januaryFirst = new Date(this.getFullYear(), January, 1);
                return Math.ceil((this - januaryFirst)/dayLengthInMilliseconds) + 1;
            };
        }());

    (function () {

            var actualactualISDA = function actualactualISDA(dateA, dateB) {
                var y1 = dateA.getFullYear(),
                        y2 = dateB.getFullYear(),
                        denominator1 = isLeapYear(y1) ? 366 : 365,
                        denominator2 = isLeapYear(y2) ? 366 : 365,
                        sum = y2 - y1 - 1;
                sum = sum + dayCount(dateA, new Date(y1 + 1, January, 1)) / denominator1;
                sum = sum + dayCount(new Date(y2, January, 1), dateB) / denominator2;

                return sum;
            },
                thirty360US = function thirty360US(dateA, dateB) {
                    return thirty360USDayCount(dateA, dateB)/360.0;
                },

                thirty360EU = function thirty360EU(dateA, dateB) {
                    return thirty360EUDayCount(dateA, dateB) / 360.0;
                };
            daycounters = {
                'act/act-ISDA': actualactualISDA,
                'act/act': actualactualISDA,
                'act/360': thirty360EU,
                '30/360-US': thirty360US,
                '30/360-EU': thirty360EU,
                '_default': function (dateA, dateB) {
                    var denominator = 365;
                    return dayCount(dateA, dateB) / denominator;
                }
            };
        global.phi.daycounters = daycounters;
        global.phi.fn.daycounters = daycounters;
    } ());

} (this));
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
}))
}());
