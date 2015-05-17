var expect = require('chai').expect,
    tr = require('../src/time/timeroutines.js'),
    advance = tr.dateArithmetics.advance,
    areSameDate = tr.dateArithmetics.areSameDate;

describe('one set of test', function (){
    it('should be able to advance a date based on periods', function (){

        var referenceDate = new Date(2015, 03, 10),
            expected = new Date(2015, 03, 11);
            res = advance(referenceDate, '1D');

        expect(areSameDate(expected, res)).to.equal(true);


    });
});
