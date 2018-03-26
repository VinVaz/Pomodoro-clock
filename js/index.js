//global variables
const breakTime = "00:00";
var hasInterval = false;
var pomodoroClock;
var timeArr = [];
var mySeconds = 0;
var myMinutes = 0;
var myTime = 0;
var setOfDigits = "";
//sets the time at wich the clock will start
function startPomodoroAt(startTime){
	timeArr = startTime.split(":");
	mySeconds = timeArr[1];
	myMinutes = timeArr[0];

	clearNumbers();
	setOfDigits = myMinutes.toString() + mySeconds.toString();
	turnNumToDigital(setOfDigits);
}
//by dafault:
startPomodoroAt("25:00");
//the main function that makes the clock work
function doEveryScond(){
	  mySeconds--;
	  if(mySeconds<0){
		mySeconds = 59;
		myMinutes--;
	  }
	  if(mySeconds.toString().length<2) mySeconds = "0" + mySeconds;
	  if(myMinutes.toString().length<2) myMinutes = "0" + myMinutes;
	myTime = myMinutes + ":" + mySeconds;
	setOfDigits = myMinutes.toString() + mySeconds.toString();
	turnNumToDigital(setOfDigits);
	  if(myTime==breakTime){
		clearInterval(pomodoroClock);
	  }
	
}
//stops or starts the counter when the button's pressed
document.getElementById("startButton").addEventListener("click", function(){
	if(hasInterval){
		clearInterval(pomodoroClock);
		hasInterval = false;
	}
	else{
		pomodoroClock = setInterval(doEveryScond, 1000);
		hasInterval = true;
	}
})
//gets a set of digits thats represents the time and turn the into digital number on display
//setOfDigits must be a string of numbers
function turnNumToDigital(setOfDigits){
    var id = "";
	var arr =setOfDigits.split("");
	
	clearNumbers();
	for(var i = 0; i < arr.length; i++){
	  id = "num" + arr[i] + "digit" + (i+1);
	  visibleById(id);
    }
}
//clear sgv elements by their ID
function clearById(id){
    document.getElementById(id).setAttribute("style", "visibility: hidden");
	}
function visibleById(id){
	document.getElementById(id).setAttribute("style", "visibility: visible");
}
//clear all the numbers from the timer display	
function clearNumbers(){
   var id = "";
   var limit = 5;   
   for(var i = 0; i <10; i++){
	   for(var j = 1; j < limit; j++){
		   id = "num" + i +"digit" + j;
		   clearById(id);
		   id = "";
	   }
   }
}

//DEMO
//this section controls the seccion length display
//try to implement some polymorphism here later

function turnSessionNumToDigital(setOfDigits){
    var id = "";
	var arr =setOfDigits.split("");
    clearSessionNumbers();
	for(var i = 0; i < arr.length; i++){
	  id = "num" + arr[i] + "digit" + (i+1) + "session";
	  visibleById(id);
    }
}
function clearSessionNumbers(){
   var id = "";
   for(var i = 0; i <10; i++){
	   for(var j = 1; j < 3; j++){
		   id = "num" + i +"digit" + j + "session";
		   clearById(id);
		   id = "";
	   }
   }
}

var sessionTime = 25;
turnSessionNumToDigital(sessionTime.toString());

function showSessionTime(){
	if(sessionTime>25) sessionTime = 25;
	else if(sessionTime<0) sessionTime = 0;
	else {
		stringSessionTime = sessionTime.toString();
		if(stringSessionTime.length<2) stringSessionTime = "0" + stringSessionTime;
		turnSessionNumToDigital(stringSessionTime);
		startPomodoroAt(stringSessionTime+":00");
	}
}
document.getElementById("plusSessionButton").onclick = function(){
	if(hasInterval==false){
		showSessionTime();
		sessionTime++;
	}		
}
document.getElementById("minusSessionButton").onclick = function(){
	if(hasInterval==false){
		showSessionTime();
		sessionTime--;
	}			
}



//END of DEMO
