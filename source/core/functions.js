const FAILURE = -1;
const RUNNING = 0;
const SUCCESS = 1;

function UUIDGenerator(){
	
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
		"==": 	function(a,b){return a==b},
		"===":	function(a,b){return a===b},
		"!=":	function(a,b){return a!=b},
		"!==":	function(a,b){return a!==b},
		">":	function(a,b){return a>b},
		">=":	function(a,b){return a>=b},
		"<":	function(a,b){return a<b},
		"<=":	function(a,b){return a<=b}
};







