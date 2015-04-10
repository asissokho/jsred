var tr = require('./timeroutines.js'),
    advance = tr.dateArithmetics.advance,
    Period = tr.Period,
    adjust = tr.adjust,
    target = require('./calendars').target;

console.log(tr.Period('3m').toString());

var now = new Date();


console.log('avancer une semaine '+ advance(now, '1w')); 
console.log('avancer en utilisant les periodes ' + advance(now, Period('1w')));

console.log(adjust(advance(now, '1d'), target, 'modifiedFollowing'));

console.log(adjust(advance(now, '1d'), target, 'modifiedPreceeding'));

console.log(require('./schedule'));

console.log(target.isBusinessDay(new Date()));

