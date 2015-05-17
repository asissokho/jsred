var expect = require('chai').expect,
    tr = require('../src/time/timeroutines.js'),
    advance = tr.dateArithmetics.advance,
    areSameDate = tr.dateArithmetics.areSameDate,
    adjust = tr.adjust;



describe('time routines tests', function (){

    it('should be able to advance a date based on periods', function (){

        var referenceDate = new Date(2015, 03, 10),
            expected = new Date(2015, 03, 11);
            res = advance(referenceDate, '1D');

        expect(areSameDate(expected, res)).to.equal(true);
    });

    it('modified following adjustment method should work', function (){
        var referenceDate = new Date(2015, 03, 10),
            expected = new Date(2015, 03, 13),
            res = adjust(advance(referenceDate, '1D'), 'modifiedfollowing');
        expect(areSameDate(expected, res)).to.equal(true);
                    
    });

    it('simplified ajustment with one day forward', function (){
        var referenceDate = new Date(2015, 03, 10),
            expected = new Date(2015, 03, 13),
            res = adjust(referenceDate, 'modifiedfollowing', 'target', '1D');
        expect(areSameDate(expected, res)).to.equal(true);
                    
    });

    it('should be able to display the next twentieth date', function (){
        var referenceDate = new Date(2015, 03, 10),
            expected = new Date(2015, 03, 20),
            res = tr.twentieth(referenceDate, 'next');
        expect(areSameDate(expected, res)).to.equal(true);

         
    });

    it('should be able to display the previous twentieth date', function (){
        var referenceDate = new Date(2015, 03, 22),
            expected = new Date(2015, 03, 20),
            res = tr.twentieth(referenceDate, 'previous');
        expect(areSameDate(expected, res)).to.equal(true);

         
    });

    it('should be able to display the previous twentieth imm date', function (){
        var referenceDate = new Date(2015, 03, 22),
            expected = new Date(2015, 2, 20),
            res = tr.twentieth(referenceDate, 'previous', 'imm');
        expect(areSameDate(expected, res)).to.equal(true);
         
    });

    it('should be able to display the next twentieth imm date', function (){
        var referenceDate = new Date(2015, 03, 22),
            expected = new Date(2015, 5, 20),
            res = tr.twentieth(referenceDate, 'next', 'imm');
        expect(areSameDate(expected, res)).to.equal(true);
         
    });

    it('should be able to display the next twentieth imm date on the same month', function (){
        var referenceDate = new Date(2015, 2, 2),
            expected = new Date(2015, 2, 20),
            res = tr.twentieth(referenceDate, 'next', 'imm');
        expect(areSameDate(expected, res)).to.equal(true);
         
    });

    it('should be able to display the previous twentieth imm date on the same month', function (){
        var referenceDate = new Date(2015, 2, 22),
            expected = new Date(2015, 2, 20),
            res = tr.twentieth(referenceDate, 'previous', 'imm');
        expect(areSameDate(expected, res)).to.equal(true);
         
    });

});
