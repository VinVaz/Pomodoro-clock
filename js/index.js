var pomodoroClock = setInterval(everySecond, 1000);
const startTime = "23:00";
const breakTime = "00:00";
var timeArr = startTime.split(":");
var mySeconds = timeArr[1];
var myMinutes = timeArr[0];
var myTime = 0;

clearNumbers();
//the main function that makes the clock work
function everySecond(){
	  if(mySeconds<0){
		mySeconds = 59;
		myMinutes--;
	  }
	  if(mySeconds.toString().length<2) mySeconds = "0" + mySeconds;
	  if(myMinutes.toString().length<2) myMinutes = "0" + myMinutes;
	myTime = myMinutes + ":" + mySeconds;
	var setOfDigits = myMinutes.toString() + mySeconds.toString();
	turnNumToDigital(setOfDigits);
	  if(myTime==breakTime){
		clearInterval(pomodoroClock);
      }
	mySeconds--;
}
//stops or starts the counter when the button's pressed
var hasInterval = true;
document.getElementById("startButton").addEventListener("click", function(){
    if(hasInterval){
		clearInterval(pomodoroClock);
	    hasInterval = false;
	}
	else{
	    pomodoroClock = setInterval(everySecond, 1000);
		hasInterval = true;
	}
})
//gets a set of digits thats represents the time and turn the into digital number on display
function turnNumToDigital(setOfDigits){
    var id = "";
	var arr =setOfDigits.split("");
	
	clearNumbers();
	for(var i = 0; i < arr.length; i++){
	  id = "num" + arr[i] + "digit" + (i+1);
	  putNumber.visibleById(id);
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
   for(var i = 0; i <10; i++){
	   for(var j = 1; j < 5; j++){
		   id = "num" + i +"digit" + j;
		   clearById(id);
		   id = "";
	   }
   }
}
var putNumber = {
	visibleById: function(id){
		visibleById(id)
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
	  putNumber.visibleById(id);
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
var atp = 24;
turnSessionNumToDigital("25")
var anyTime = 0;
document.getElementById("plusSessionButton").onclick = function(){
	if(atp>25) atp = 25;
	if(atp<0) atp = 0;
		anyTime = atp;
		if(anyTime.toString().length<2) anyTime = "0" + anyTime;
		else anyTime = anyTime.toString();
		turnSessionNumToDigital(anyTime);
		atp++;	
}
document.getElementById("minusSessionButton").onclick = function(){
	if(atp>25) atp = 25;
	if(atp<0) atp = 0;
		anyTime = atp;
		if(anyTime.toString().length<2) anyTime = "0" + anyTime;
		else anyTime = anyTime.toString();
		turnSessionNumToDigital(anyTime);
		atp--;	
}
//END of DEMO
