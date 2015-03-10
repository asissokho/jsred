var rateCurve = (function (){
	
	var rateCurve = function (referenceDate, quotedInstruments){
		this.referenceDate = referenceDate;
		this.adjustfor(instruments);
	}
	
	rateCurve.prototype.adjustfor = function (quotedInstruments){
		for (var i = 0; i<quotedInstruments.length;i++){
			var instrument = quotedInstruments[i];
			var objective = function (x){ this.setNode(lastDate,x); return instrument.price(this) - instrument.quote; };
			optimiser.findZero( objective);
		}
	};

	return rateCurve;
}());



