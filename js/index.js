//global variables
var hasInterval = false;
var pomodoroClock;
var sessionTime = 25, breakTime = 25;

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

//defines a display
function Display(numOfDigits, type){
	this.numOfDigits = numOfDigits;
	if(type=="session"||type=="break") this.type = type;
	else this.type = "";
	this.clear = function(){
	    var limit = this.numOfDigits + 1;      
	    for(var i = 0; i <10; i++){
			for(var j = 1; j < limit; j++){
				var id = "num" + i +"digit" + j + this.type;
				clearElementById(id);
			}
	    }
	}
	this.setTime = function(time){
		var limit = this.numOfDigits;
		var arr = timeConverter.getArrayFrom(time);
		this.clear()
		for(var i = 0; i < limit; i++){
		  var id = "num" + arr[i] + "digit" + (i+1) + this.type;
		  showElementById(id);
		}
	}
}

var mainDisplay = new Display(4, "main");
var sessionDisplay = new Display(2, "session");
var breakDisplay = new Display(2, "break");

//gives the main properties of the pomodoro's clock
var pomodoro = {
	finalTime: "00:00",
	isOnBreak: false,
	setStartTime: function(startTime){
		this.myMinutes = timeConverter.getMinutesFrom(startTime);
		this.mySeconds = timeConverter.getSecondsFrom(startTime);
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
				this.setStartTime(sessionTime+":00");
				this.isOnBreak = false;
			}
			else{	
				this.setStartTime(breakTime+":00");
				this.isOnBreak = true;
			}
		}
	}
}
//by dafault the pomodoro starts at 25:00
sessionDisplay.setTime("25:00");
breakDisplay.setTime("25:00");
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

function limitSize(time){
	if(time > 25) time = 25;
	else if(time < 0) time = 0;
	return time;
}
//this section controls the session and break length display
function showSessionTime(){
	var stringSessionTime = limitSize(sessionTime).toString();
	if(stringSessionTime.length<2) stringSessionTime = "0" + stringSessionTime;
	sessionDisplay.setTime(stringSessionTime + ":00");
	pomodoro.setStartTime(stringSessionTime+":00");
}
function showBreakTime(){
	var stringBreakTime = limitSize(breakTime).toString();
	if(stringBreakTime.length<2) stringBreakTime = "0" + stringBreakTime;
	breakDisplay.setTime(breakTime + ":00");	
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
