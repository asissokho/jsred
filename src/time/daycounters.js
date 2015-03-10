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
