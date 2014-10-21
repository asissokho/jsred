(function (global, phi) {
    var loaded = false;

    (function () {
        if (loaded === false) {

            var calendars = {
                _default: {
                    isHoliday: function (date) {
                        var d = date.getDay();
                        return (d === 6 || d === 0);
                    },

                    isBusinessDay: function isBusinessDay(date) {
                        return !isHoliday(date);
          
                    },
                    name : '_default'
                }
            };
            phi.calendars = calendars;
            loaded = true;
        }
    } ());

} (this, phi)); 