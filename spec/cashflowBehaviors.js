describe('cashflow', function (){
    
    it('cashflow should be instantiable', function (){
        var cf = cashflow({value : 23, valueDate :'2014-02-14'});
        console.log(cf);
        expect(cf.value()).not.toBe(null);
    });

    it('cashflow behaviour 2', function (){
        expect(true).toBe(true);
    });
});
