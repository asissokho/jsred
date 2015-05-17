var expect = require('chai').expect,
    schedule = require('../src/time/schedule'),
    tr = require('../src/time/timeroutines'),
    months = require('../src/time/timecore'),
    areSameDate = tr.dateArithmetics.areSameDate;

describe('schedule generation', function(){
    it('should be able to generate backward', function (){

    });
    
    it('should not adjust first date with end of month going backward', function (){
    var start = new Date(1996,months.August,22),
        end = new Date(1997,months.August,31),
        calendar = 'UnitedStates:GovernmentBond',
        tenor = '6M',
        convention = 'Unadjusted',
        terminationConvention = 'Unadjusted',
        rule = 'backward',
        endOfMonth = true;

     expected= [new Date(22,months.August,1996), 
                new Date(31,months.August,1996), 
                new Date(28,months.February,1997), 
                new Date(31,months.August,1997)];

    var s = schedule(start, end, tenor, {'calendar': calendar, 
                                                'convention': convention,
                                                'terminationConvention': terminationConvention,
                                                'rule' : rule,
                                                'endOfMonth': true}
                   );

    console.log(s.dates);
    });

    
});
