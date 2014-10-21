(function (global, phi) {
    var loaded = false,
        calendars = global.phi.calendars,
        getFirstOrDefault = phi.getFirstOrDefault;

    (function () {
        if (loaded === false) {

            following = function modifiedFollowing(date, calendar) {
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
                dayCounters: {
                    'act/act': null,
                    'act/365': null,
                    '30/360': null,
                    '_default': null
                },

                dateArithmetics: {
                    advance: advance,
                    areSameDate: areSameDate
                }

            };
            phi.timeroutines = timeroutines;
            phi.fn.timeroutines = timeroutines;
            loaded = true;
        }
    } ());

} (this, phi));