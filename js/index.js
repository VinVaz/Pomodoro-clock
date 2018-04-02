//global variables
var hasInterval = false;
var pomodoroClock;
var sessionTime = 25, breakTime = 25;
var stringSessionTime = sessionTime.toString();
var stringBreakTime = breakTime.toString();

//manipulates the time format
var timeConverter = {
	getSecondsFrom: function(time){
		return (time.split(":"))[1];
	},
	getMinutesFrom: function(time){
		return (time.split(":"))[0];
	},
	getTimeFrom: function(minutes, seconds){
		if(seconds.toString().length<2) seconds = "0" + seconds;
		if(minutes.toString().length<2) minutes = "0" + minutes;
		return (minutes + ":" + seconds);	
	},
	getArrayFrom: function(time){
		var setOfDigits = ((time.split(":"))[0] + (time.split(":"))[1]);
		var arr = setOfDigits.split("");
		return arr;
	}
}
//clears sgv elements by their ID
function clearElementById(id){
    document.getElementById(id).setAttribute("style", "visibility: hidden");
}
//shows sgv elements by their ID
function showElementById(id){
	document.getElementById(id).setAttribute("style", "visibility: visible");
}
//controls what appears on to the main display of the clock
var mainDisplay = {
	clear: function(){
	   var id = "";
	   var limit = 5;   
	   for(var i = 0; i <10; i++){
			for(var j = 1; j < limit; j++){
				id = "num" + i +"digit" + j;
				clearElementById(id);
				id = "";
			}
	   }
	},
	setTime: function(time){
		var id = "";
		var arr = timeConverter.getArrayFrom(time);
		this.clear()
		for(var i = 0; i < arr.length; i++){
		  id = "num" + arr[i] + "digit" + (i+1);
		  showElementById(id);
		}
	}
}
//gives the main properties of the pomodoro's clock
var pomodoro = {
	finalTime: "00:00",
	isOnBreak: false,
	setStartTime: function(startTime){
		this.myMinutes = timeConverter.getMinutesFrom(startTime);
		this.mySeconds = timeConverter.getSecondsFrom(startTime);
		mainDisplay.clear()
		mainDisplay.setTime(startTime);
	},
	action: function(){
		this.mySeconds--;
		if(this.mySeconds<0){
			this.mySeconds = 59;
			this.myMinutes--;
		}
		this.myTime = timeConverter.getTimeFrom(this.myMinutes, this.mySeconds);
		mainDisplay.setTime(this.myTime);
		
		if(this.myTime==this.finalTime){
			if(this.isOnBreak){
				this.setStartTime(stringSessionTime+":00");
				this.isOnBreak = false;
			}
			else{	
				this.setStartTime(stringBreakTime+":00");
				this.isOnBreak = true;
			}
		}
	}
}
//by dafault the pomodoro starts at 25:00
pomodoro.setStartTime("25:00");
function doEverySecond(){
	pomodoro.action();
}

var plusSessionButton = document.getElementById("plusSessionButton");
var plusBreakButton = document.getElementById("plusBreakButton");
var minusSessionButton = document.getElementById("minusSessionButton");
var minusBreakButton = document.getElementById("minusBreakButton");
var startButton = document.getElementById("startButton");

//stops or starts the counter when the button is pressed
startButton.addEventListener("click", function(){
	if(hasInterval){
		clearInterval(pomodoroClock);
		hasInterval = false;
	}
	else{
		pomodoroClock = setInterval(doEverySecond, 1000);
		hasInterval = true;
	}
})

//this section controls the session length display
//try to implement some polymorphism here later

function turnSessionNumToDigital(strOfDigits){
    var id = "";
	var arr =strOfDigits.split("");
    clearSessionNumbers();
	for(var i = 0; i < arr.length; i++){
	  id = "num" + arr[i] + "digit" + (i+1) + "session";
	  showElementById(id);
    }
}
function clearSessionNumbers(){
   var id = "";
   for(var i = 0; i <10; i++){
	   for(var j = 1; j < 3; j++){
		   id = "num" + i +"digit" + j + "session";
		   clearElementById(id);
		   id = "";
	   }
   }
}
turnSessionNumToDigital(stringSessionTime);

function showSessionTime(){
	if(sessionTime>25) sessionTime = 25;
	else if(sessionTime<0) sessionTime = 0;
	else {
		stringSessionTime = sessionTime.toString();
		if(stringSessionTime.length<2) stringSessionTime = "0" + stringSessionTime;
		turnSessionNumToDigital(stringSessionTime);
		pomodoro.setStartTime(stringSessionTime+":00");
	}
}
plusSessionButton.onclick = function(){
	if(hasInterval==false){
		showSessionTime();
		sessionTime++;
	}		
}
minusSessionButton.onclick = function(){
	if(hasInterval==false){
		showSessionTime();
		sessionTime--;
	}			
}

//this section controls the seccion length display

function turnBreakNumToDigital(setOfDigits){
    var id = "";
	var arr =setOfDigits.split("");
    clearBreakNumbers();
	for(var i = 0; i < arr.length; i++){
	  id = "num" + arr[i] + "digit" + (i+1) + "break";
	  showElementById(id);
    }
}
function clearBreakNumbers(){
   var id = "";
   for(var i = 0; i <10; i++){
	   for(var j = 1; j < 3; j++){
		   id = "num" + i +"digit" + j + "break";
		   clearElementById(id);
		   id = "";
	   }
   }
}
turnBreakNumToDigital(stringBreakTime);
function showBreakTime(){
	if(breakTime>25) breakTime = 25;
	else if(breakTime<0) breakTime = 0;
	else {
		stringBreakTime = breakTime.toString();
		if(stringBreakTime.length<2) stringBreakTime = "0" + stringBreakTime;
		turnBreakNumToDigital(stringBreakTime);
	}
}
plusBreakButton.onclick = function(){
	if(hasInterval==false){
		showBreakTime();
		breakTime++;
	}		
}
minusBreakButton.onclick = function(){
	if(hasInterval==false){
		showBreakTime();
		breakTime--;
	}			
}
