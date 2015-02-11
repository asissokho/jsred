//Pourquoi avoir une référence date 
// c'est pour cela que je n'en ai pas!

var fixedRateBond = function(schedule){
	var self = this;
	self.schedule = schedule;
	self.issueDate = new Date();
	console.log("je ne sais pas ce que je suis en train de faire ici");
	self.cashflows = function(){
	     return schedule.cashflows();
	};
},

floatingRateBond = function(schedule, index){
	var self = this;
	self.schedule = schedule,
	self.index = index;
}



