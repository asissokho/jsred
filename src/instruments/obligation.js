// Pourquoi avoir une référence date ?
// c'est pour cela que je n'en ai pas!

var FixedRateBond = function(schedule){
	var self = this;
	self.schedule = schedule;	
	self.cashflows = function(){
		return schedule.cashflows();
	}
},

floatingRateBond = function(){
	var self = this;
	self.schedule = schedule,
	self.index = index;
}



