var extend = require('../src/core.js').extend;

describe('core methods', function (){

    it('should be able to extend objects', function(){
        var a = { "name" :  "Suzan"},
            b = { 'age' : 24};
        extend(a, b);
        console.log(a);
    });
    
  it('be able to extend objects without override', function(){
        var a = { "name" :  "Suzan"},
            b = { 'age' : 24, name : "Abdoulaye"};
        extend(a, b);
        console.log(a);
    });
   
    
});


