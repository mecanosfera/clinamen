const FAILURE = -1;
const RUNNING = 0;
const SUCCESS = 1;

function UUIDGenerator(){
	return 0;
}


function shuffle(ar,copy=true){
	var a = ar;
	if(copy){
		a = ar.slice(0);
	}
	var currentIndex = a.length;
	var temporaryValue;
	var randomIndex;

	while (0 !== currentIndex) {
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;
	    temporaryValue = a[currentIndex];
	    a[currentIndex] = a[randomIndex];
	    a[randomIndex] = temporaryValue;
	}

	return a;
}


var op = {
		"+": 	function(a,b){return a+b},
		"-": 	function(a,b){return a-b},
		"*": 	function(a,b){return a*b},
		"/": 	function(a,b){return a/b},
		"%": 	function(a,b){return a%b},
		"==": function(a,b){return a==b},
		"===":function(a,b){return a===b},
		"!=":	function(a,b){return a!=b},
		"!==":function(a,b){return a!==b},
		">":	function(a,b){return a>b},
		">=":	function(a,b){return a>=b},
		"<":	function(a,b){return a<b},
		"<=":	function(a,b){return a<=b},
		"&&": function(a,b){return a&&b},
		"||": function(a,b){return a||b}
};

var list = {
	"+": 	function(a){var r = 0; for(n in a){r += n()} return r;},
	"-": 	function(a){return a-b},
	"*": 	function(a){return a*b},
	"/": 	function(a){return a/b},
	"%": 	function(a){return a%b},
	"==": function(a){return a==b},
	"===":function(a){return a===b},
	"!=":	function(a){return a!=b},
	"!==":function(a){return a!==b},
	">":	function(a){return a>b},
	">=":	function(a){return a>=b},
	"<":	function(a){return a<b},
	"<=":	function(a){return a<=b},
	"&&": function(a){return a&&b},
	"||": function(a){return a||b}
}



function add(a,b){
	return a+b;
}

function sub(a,b){
	return a-b;
}

function mul(a,b){
	return a*b;
}

function div(a,b){
	return a/b;
}

function eq(a,b){
	return a==b;
}

function eqq(a,b){
	return a===b;
}

function dif(a,b){
	return a!=b;
}

function diff(a,b){
	return a!==b;
}

function mr(a,b){
	return a>b;
}

function mreq(a,b){
	return a>=b;
}

function ls(a,b){
	return a<b;
}

function lseq(a,b){
	return a<=b;
}

function and(a,b){
	return a&&b;
}

function or(a,b){
	return a||b;
}


function getClass(type){
	switch(type){
		case "selector":
			return Selector;
		case "sequence":
			return Sequence;
		case "randomSelector":
			return RandomSelector;
		case "randomSequence":
			return RandomSequence;
		case "inverter":
			return Inverter;
		case "limit":
			return Limit;
		case "condititon":
			return Condition;
		case "action":
			return action;
	}
	return null;
}
