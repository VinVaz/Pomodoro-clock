var pomodoroClock = setInterval(everySecond, 1000);
const startTime = "00:05";
const breakTime = "00:00";
var timeArr = startTime.split(":");
var mySeconds = timeArr[1];
var myHours = timeArr[0];
var myTime = 0;

clearNumbers();
//the main function that makes the timer work
function everySecond(){

	if(mySeconds<0){
		mySeconds = 59;
		myHours--;
	}
	if(mySeconds.toString().length<2) mySeconds = "0" + mySeconds;
	if(myHours.toString().length<2) myHours = "0" + myHours;
	myTime = myHours + ":" + mySeconds;
	var aux = myHours.toString() + mySeconds.toString();
	turnNumToDigital(aux);
	if(myTime==breakTime){
		clearInterval(pomodoroClock);
    }
	mySeconds--;
}
//this is just a test
function turnNumToDigital(aux){
    var id = "";
	var arr = aux.split("");
	
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

