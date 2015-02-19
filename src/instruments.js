(function (global, undefined) {
    var instruments = (function () {
        var _simpleCashflowList = {
            cashflows: function () {
                return [    { amount: 5, paymentDate: new Date(2012, 01, 01) },
                            { amount: 105, paymentDate: new Date(2012, 07, 07) }
                       ];
            }
        };

        return {
            simpleCashflowList: _simpleCashflowList
        };
    } ());

    global.instruments = instruments;
} (this));

