var pomodoroClock = setInterval(everySecond, 1000);
const startTime = "01:10";
const breakTime = "00:00";
var timeArr = startTime.split(":");
var mySeconds = timeArr[1];
var myMinutes = timeArr[0];
var myTime = 0;

clearNumbers();
//the main function that makes the timer work
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
//this is just a test
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

