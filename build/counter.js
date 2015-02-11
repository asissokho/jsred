"use strict";
 
var counter = (function () {

	var add = function add(a, b){
			return a+b;
	},

	subtract = function subtract(a,b){
			return a-b;
	};

	return {
		add : add,
		subtract: subtract,
		difference : subtract,

	}
 
}());