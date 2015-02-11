"use strict";
 
var counter = (function () {

	var add = function add(a, b){
			return a+b;
	},

	subtract = function (a,b){
		return a-b;
	},

	difference = function (a,b){
		return a-b;
	};

	return {
		add : add,
		difference:difference,
		subtract: subtract
	};
 
}());