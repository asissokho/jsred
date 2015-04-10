var tr = require('./timeroutines'),
    advance = tr.dateArithmetics.advance,
    adjust = tr.adjust,
    Period = tr.Period,
    calendars = require('./calendars');

function CHECK(condition, message) {
    if (!condition) {
        throw new { 'message': message };
    }
}


function evaluationDate(){
    return new Date();
}

function nextTwentieth(d, rule) {
    var result = new Date(20, d.month(), d.year());
    if (result < d)
        result += 1 * Months;
    if (rule == 'TwentiethIMM' || rule == 'OldCDS' || rule == 'CDS') {
        var m = result.month() + 1;
        if (m % 3 != 0) { // not a main IMM nmonth
            var skip = 3 - m % 3;
            result += skip * Months;
        }
    }
    return result;
}
// see : https://github.com/lballabio/quantlib/blob/master/QuantLib/ql/time/dategenerationrule.hpp
// explanation of different methods are given here
function generateSchedule(direction, tenor, calendar, start, end, afterStart, beforeEnd, convention,  endOfMonth){
    var dates = [],
        isRegular = [],
        direction = direction.toLowerCase(),
        _tenor = typeof tenor == 'string'? new Period(tenor) : tenor,
        insertMethod = direction == 'backward'? Array.prototype.unshift : Array.prototype.push,
        seed = afterStart? afterStart : start,
        comparisionSign = direction === 'backward'? -1 : 1,
        exitDate = beforeEnd? beforeEnd: end,
        temp, lastInsertedDate, tenorLength = comparisionSign *  _tenor.length;

    insertMethod.call(dates, start);
    if (afterStart) {
        insertMethod.apply(dates, afterStart);
        tenorLength = tenorLength + comparisionSign * tenor.length;
        temp = advance(seed, Period(tenorLength, _tenor.unit), convention, endOfMonth);
        insertMethod.apply(isRegular, temp != afterStart);
    }

    temp = adjust(advance(seed,  Period(tenorLength, _tenor.unit)),'_default', convention, endOfMonth);
    lastInsertedDate = seed;

     while(comparisionSign * (temp - exitDate) < 0) {   
         // skip dates that would result in duplicates
         // after adjustment
        if (adjust(lastInsertedDate, calendar, convention) != adjust(temp, calendar, convention)) {
            insertMethod.call(dates, temp);
            lastInsertedDate = temp;
            insertMethod.call(isRegular, true);
        }
        tenorLength = tenorLength + comparisionSign * _tenor.length;
        temp = advance(seed, Period(tenorLength, _tenor.unit), convention, endOfMonth);
    }
        
    if(beforeEnd && calendar.adjust(lastInsertedDate, convention) != calendar.adjust(temp, convention)){
        insertMethod.call(dates, beforeEnd);
        lastInsertedDate = beforeEnd;
        insertMethod.call(isRegular, false);
    } 

    if (adjust(lastInsertedDate, calendar, convention) != adjust(end, calendar, convention)) {
        insertMethod.call(dates, temp);
        insertMethod.call(isRegular, false);
    }

    for(var i = 1; i < dates.length;i++){
        dates[i] = adjust(dates[i], calendar, convention);
    }

}


function previousTwentieth(d, rule) {
    var result = new Date(20, d.month(), d.year());
    if (result > d)
        result -= 1 * Months;
    if (rule == 'TwentiethIMM' || rule == 'OldCDS' || rule == 'CDS') { 
        var m = result.month();
        if (m % 3 != 0) { // not a main IMM nmonth
            var skip = m % 3;
            result -= skip * Months;
        }
    }
    return result;
}


function SimpleSchedule(dates, calendar, convention) { this.dates = this.date_, this.calendar = calendar_; this.convention = convention_; }
/*
function Schedule(rule_, effectiveDate, terminationDate, tenor_, calendar_, convention_, terminationConvention_, first, nextToLast ){
    this.tenor = tenor_,
    this.calendar = cal_,
    this.convention = convention_,
    this.terminationDateConvention = terminationDateConvention_,
    this.rule = rule_,
    this.endOfMonth = endOfMonth_,
    this.firstDate = first == effectiveDate ? null : first,
    this.nextToLastDate = nextToLast == terminationDate ? null : nextToLast;
    // sanity checks
    CHECK(terminationDate, "null termination date");

    // in many cases (e.g. non-expired bonds) the effective date is not
    // really necessary. In these cases a decent placeholder is enough
    if (effectiveDate && first  && rule == 'Backward') {
        var evalDate = evaluationDate();
        CHECK(evalDate < terminationDate, "null effective date");
        var y;
        if (nextToLast) {
            y = (nextToLast - evalDate) / 366 + 1;
            effectiveDate = nextToLast - y * Years;
        }
        else {
            y = (terminationDate - evalDate) / 366 + 1;
            effectiveDate = terminationDate - y * Years;
        }
    }
    else {
        CHECK(effectiveDate, "null effective date");
    }

    CHECK(effectiveDate < terminationDate, "effective date (" + effectiveDate + ") later than or equal to termination date (" + terminationDate + ")");

    if (tenor.length == 0) {
        rule_ = 'Zero';
    }
    else {
        CHECK(tenor.length> 0, "non positive tenor (" + tenor + ") not allowed");
    }

    if (firstDate) {
        switch (rule) {
            case 'Backward':
            case 'Forward':
                // we should ensure that this condition is still verified after adjustment
                CHECK(firstDate > effectiveDate && firstDate < terminationDate, "first date (" + firstDate +  ") out of effective-termination date range [" +  effectiveDate + ", " + terminationDate + ")");
                break;
            case 'ThirdWednesday':
                CHECK(isIMMDate(firstDate, false),
                           "first date (" + firstDate_ +
                           ") is not an IMM date");
                break;
            case 'Zero':
            case 'Twentieth':
            case 'TwentiethIMM':
            case 'OldCDS':
            case 'CDS':
                QL_FAIL("first date incompatible with " + rule_ +
                        " date generation rule");
            default:
                QL_FAIL("unknown rule (" + Integer(rule_) + ")");
        }
    }
    if (nextToLastDate) {
        switch (rule) {
            case 'Backward':
            case 'Forward':
                // we should ensure that this condition is still verified after adjustment
                CHECK(nextToLastDate > effectiveDate &&  nextToLastDate < terminationDate, "next to last date (" + nextToLastDate +  ") out of effective-termination date range (" +  effectiveDate + ", " + terminationDate + "]");
                break;
            case 'ThirdWednesday':
                CHECK(isIMMDate(nextToLastDate, false),
                           "next-to-last date (" + nextToLastDate +
                           ") is not an IMM date");
                break;
            case 'Zero':
            case 'Twentieth':
            case 'TwentiethIMM':
            case 'OldCDS':
            case 'CDS':
                QL_FAIL("next to last date incompatible with " + rule +
                        " date generation rule");
            default:
                QL_FAIL("unknown rule (" + Integer(rule) + ")");
        }
    }


    // calendar needed for endOfMonth adjustment
    var nullCalendar = NullCalendar();
    var periods = 1;
    var seed, exitDate;
    switch (rule) {

        case 'Zero':
            tenor = tenor('0Y');
            this.date_.push(effectiveDate);
            this.date_.push(terminationDate);
            isRegular_.push(true);
            break;

        case 'Backward':

            this.date_.push(terminationDate);

            seed = terminationDate;
            if (nextToLastDate) {
                this.date_.unshift(nextToLastDate);
                var temp = nullCalendar.advance(seed, -periods * tenor_, convention, endOfMonth);
                if (temp != nextToLastDate_)
                    isRegular_.unshift(false);
                else
                    isRegular_.unshift(true);
                seed = nextToLastDate_;
            }

            exitDate = effectiveDate;
            if (firstDate)
                exitDate = firstDate_;

            for (; ;) {
                var temp = nullCalendar.advance(seed, -periods * tenor_, convention, endOfMonth);
                if (temp < exitDate) {
                    if (firstDate_  && (calendar_.adjust(this.date_.front(), convention) != calendar_.adjust(firstDate_, convention))) {
                        this.date_.unshift(firstDate_);
                        isRegular_.unshift(isRegular_.begin(), false);
                    }
                    break;
                } else {
                    // skip dates that would result in duplicates
                    // after adjustment
                    if (calendar_.adjust(this.date_[0], convention) != calendar_.adjust(temp, convention)) {
                        this.dates_.unshift(temp);
                        isRegular_.unshift(true);
                    }
                    ++periods;
                }
            }

            if (calendar_.adjust(this.dates_[0], convention) != calendar_.adjust(effectiveDate, convention)) {
                this.dates_.unshift(effectiveDate);
                isRegular_.insert(isRegular_.begin(), false);
            }
            break;


        case 'Twentieth':
        case 'TwentiethIMM':
        case 'ThirdWednesday':
        case 'OldCDS':
        case 'CDS':
            CHECK(!endOfMonth, "endOfMonth convention incompatible with " + rule_ + " date generation rule");
            // fall through
        case 'Forward':

            if (rule == 'CDS') {
                this.dates_.push(previousTwentieth(effectiveDate, 'CDS'));
            } else {
                this.dates_.push(effectiveDate);
            }

            seed = this.dates_[dates_.length-1];

            if (firstDate) {
                this.date_.push(firstDate_);
                var temp = nullCalendar.advance(seed, periods * tenor_,
                                                 convention, endOfMonth);
                if (temp != firstDate_)
                    isRegular_.push (false);
                else
                    isRegular_.push(true);
                seed = firstDate_;
            }
            // Peut etre comparee a une methode de calcul de la firstDate dans les cas chelou...
            else if (rule == 'Twentieth' || rule == 'TwentiethIMM' || rule == 'OldCDS' || rule == 'CDS') {
                var next20th = nextTwentieth(effectiveDate, rule_);
                if (rule_ == OldCDS) {
                    // distance rule inforced in natural days
                    var stubDays = 30;
                    if (next20th - effectiveDate < stubDays) {
                        // +1 will skip this one and get the next
                        next20th = nextTwentieth(next20th + 1, rule_);
                    }
                }
                if (next20th != effectiveDate) {
                    this.date_.push(next20th);
                    isRegular_.push(false);
                    seed = next20th;
                }
            }

            exitDate = terminationDate;
            if (nextToLastDate_ != Date())
                exitDate = nextToLastDate_;

            for (; ;) {
                var temp = nullCalendar.advance(seed, periods * tenor_,
                                                 convention, endOfMonth);
                if (temp > exitDate) {
                    if (nextToLastDate &&
                        (calendar.adjust(this.date_.back(), convention) !=
                         calendar.adjust(nextToLastDate_, convention))) {
                        this.dates_.push(nextToLastDate_);
                        isRegular_.push(false);
                    }
                    break;
                } else {
                    // skip dates that would result in duplicates
                    // after adjustment
                    if (calendar_.adjust(this.date_.back(), convention) != calendar_.adjust(temp, convention)) {
                        this.date_.push(temp);
                        isRegular_.push(true);
                    }
                    ++periods;
                }
            }

            if (calendar_.adjust(this.date_.back(), terminationDateConvention) !=  calendar_.adjust(terminationDate, terminationDateConvention)) {
                if (rule_ == 'Twentieth' || rule == TwentiethIMM ||
                    rule_ == OldCDS ||
                    rule_ == 'CDS') {
                    this.date_.push(nextTwentieth(terminationDate, rule_));
                    isRegular_.push(true);
                } else {
                    this.date_.push(terminationDate);
                    isRegular_.push(false);
                }
            }
            break;
        default:
            QL_FAIL("unknown rule (" + Integer(rule_) + ")");
    }

    // adjustments
    if (rule_ == 'ThirdWednesday')
        for (var i = 1; i < this.dates_.length - 1; ++i)
            this.date_[i] = nthWeekday(3, Wednesday,
                                         this.date_[i].month(),
                                         this.date_[i].year());

    if (endOfMonth && calendar_.isEndOfMonth(seed)) {
        // adjust to end of month
        if (convention == 'Unadjusted') {
            for (var i = 1; i < this.dates_.length - 1; ++i)
                this.date_[i] = endOfMonth(this.date_[i]);
        } else {
            for (var i = 1; i < this.dates_.length - 1; ++i)
                this.date_[i] = calendar_.endOfMonth(this.date_[i]);
        }
        if (terminationDateConvention != 'Unadjusted') {
            this.date_.front() = calendar_.endOfMonth(this.date_.front());
            this.date_.back() = calendar_.endOfMonth(this.date_.back());
        } else {
            // the termination date is the first if going backwards,
            // the last otherwise.
            if (rule_ == 'Backward')
                this.date_.back() = endOfMonth(this.date_.back());
            else
                this.date_.front() = endOfMonth(this.date_.front());
        }
    } else {
        // first date not adjusted for CDS schedules
        if (rule_ != 'OldCDS')
            this.date_[0] = calendar_.adjust(this.date_[0], convention);
        for (var i = 1; i < this.dates_.length - 1; ++i)
            this.date_[i] = calendar_.adjust(this.date_[i], convention);

        // termination date is NOT adjusted as per ISDA
        // specifications, unless otherwise specified in the
        // confirmation of the deal or unless we're creating a CDS
        // schedule
        if (terminationDateConvention != 'Unadjusted'|| rule_ == Twentieth || rule_ == TwentiethIMM || rule_ == OldCDS || rule_ == 'CDS') {
            this.date_.back() = calendar_.adjust(this.date_.back(), terminationDateConvention);
        }
    }

    // Final safety checks to remove extra next-to-last date, if
    // necessary.  It can happen to be equal or later than the end
    // date due to EOM adjustments (see the Schedule test suite
    // for an example).
    if (this.dates_.length >= 2 && this.dates_[this.dates_.length - 2] >= this.dates_.back()) {
        isRegular_[this.dates_.length - 2] = (this.dates_[this.dates_.length - 2] == this.dates_.back());
        this.date_[this.dates_.length - 2] = this.dates_.back();
        this.date_.pop_back();
        isRegular_.pop_back();
    }
    if (this.dates_.length >= 2 && this.dates_[1] <= this.dates_.front()) {
        isRegular_[1] = (this.date_[1] == this.date_.front());
        this.date_[1] = this.date_.front();
        this.date_.erase(this.date_.begin());
        isRegular_.erase(isRegular_.begin());
    }



}
*/

var effectiveDate = new Date(),
    terminationDate = new Date(2019, 01, 01),
    tenor = '3M',
    cal = require('./calendars').TARGET,
    terminationDateConvention = 'Unadjusted',
    rule = 'Backward',
    endOfMonth = false,
    first = null,
    nextToLast = null,
    convention = 'modifiedfollowing';

var sch = generateSchedule(rule,
                     tenor,
                     cal,
                     terminationDate,
                     effectiveDate,
                     first,
                     nextToLast,
                     convention,
                     false);
module.exports = sch; 
// Very important lesson : firstDate is incompatible with IMM, Twentieth, CDS and OldCDS...
