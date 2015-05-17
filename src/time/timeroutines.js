var calendars = require('./calendars'),
    _default = require('../core').getFirstOrDefault,
    monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    leapYearMonthLenghts = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    
var following = function modifiedFollowing(date, calendar) {
    calendar = getFirstOrDefault(calendars, calendar);
    while (calendar.isHoliday(date)) {
          date = advance(date, "1d");
      }
      return date;
  },

  lastDayOfMonth = function lastDayOfMonth (year, month){
      return year % 4 == 0? leapYearMonthLenghts[month] : monthLengths[month]; 
  },

  twentieth = function(date, direction , rule) {
    if(date){
        direction = direction? direction.toLowerCase() : 'next';
        rule = rule? rule.toLowerCase() : 'twientieth';
        var result = new Date(date.getFullYear(), date.getMonth(), 20),
        sign = direction == 'previous'? '-' : '+';

        if(!(date<result && sign == '+' || date>result && sign == '-')){
            result = advance(result, sign + '1M');
        }
        var m = result.getMonth() + 1;

        if(rule === 'imm' && m%3 != 0){
            var skip =  sign == '-'? m % 3 : 3- m % 3;
            result =  advance(result, sign + skip + 'M'); 
        }
        return result;

    }
  },


  Period = function Period(){
      if(!(this instanceof Period)){
        return arguments.length >1 ? new Period(arguments[0], arguments[1]) : new Period(arguments[0]);
      }
      
      if(arguments.length==1){
      var strPeriod = arguments[0]; 
      this.length = parseFloat(strPeriod);
      this.unit = strPeriod.charAt(strPeriod.length - 1).toLowerCase(); 
      }
      else{
          this.length= arguments[0];
          this.unit = arguments[1];
      }
  },

 modifiedFollowing = function modifiedFollowing(date, calendar) {
      var month = date.getMonth();
          calendar = _default(calendars, calendar);
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
          calendar = _default(calendars, calendar);
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
          calendar = _default(calendars, calendar);
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
            _period = (period instanceof Period)? period : Period(period),
            month = date.getMonth(), /* O based on javascript */
            qty = _period.length, 
            units = _period.unit; 
            switch (units) {
            case "d":
                day = day + qty;
                break;
            case "w":
                day = day + 7 * qty;
                break;
            case "m":
                month = month + qty;
                var res = new Date( year, month, day); 
                if(res.getDate() != day){
                    month;
                    day = lastDayOfMonth(res.getFullYear(), res.getMonth()-1);
                }

                break;
            case "y":
                year = year + qty;
                break;
            default :
                throw { message : 'unknown time unit: '+ units };
        }
        return new Date(year, month, day);
    },

    areSameDate = function areSameDate(dateA, dateB) {
        return (dateA.getDate() == dateB.getDate() && 
                dateA.getFullYear() == dateB.getFullYear() && dateA.getMonth() == dateB.getMonth());
    };

    Period.prototype.toString = function (){
        return this.length.toString() + this.unit.toString();
    };
    
    var timeroutines = {
        dateAdjustmentMethods: {
        modifiedfollowing: modifiedFollowing,
        unadjusted: unadjusted,
        preceeding: preceeding,
        modifiedpreceeding: modifiedPreceeding,
        _default: unadjusted
        },
        
        twentieth : twentieth,

        dateArithmetics: {
            advance: advance,
            areSameDate: areSameDate
        },
        'Period' : Period
    };
    
    timeroutines.adjust = function (date, convention, calendar, period ){
        if(date){
            _calendar = _default(calendars, calendar);
            _adjustMehod = _default(timeroutines.dateAdjustmentMethods, convention.toLowerCase());
            if(period){
                console.log('nice period : '+ period);
                date = advance(date, period);
            }
            return _adjustMehod(date, _calendar);
        }    
    }

module.exports = timeroutines; 

