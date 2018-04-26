
var timeConverter = {
  getSecondsFrom: function(time){
    return (time.split(":"))[1];
  },
  getMinutesFrom: function(time){
    return (time.split(":"))[0];
  },
  getTimeFrom: function(minutes, seconds){
    return (pad(minutes, 2) + ":" + pad(seconds, 2));	
  },
  getArrayFrom: function(time){
    var setOfDigits = ((time.split(":"))[0] + (time.split(":"))[1]);
    var arr = setOfDigits.split("");
    return arr;
  }
}
//represents the session and break timers 
class SmallTimers{
  constructor(){
    this.minutes = 25;
  }
  get time(){
    return pad(this.minutes, 2) + ":00";
  } 
  increment(){
    this.minutes = limitSize(this.minutes + 1);
  }
  decrement(){
    this.minutes = limitSize(this.minutes - 1);
  }
}
var mySession = new SmallTimers();
var myBreak = new SmallTimers();


function clearSgvElementById(id){
  document.getElementById(id).setAttribute("style", "visibility: hidden");
}

function showSgvElementById(id){
  document.getElementById(id).setAttribute("style", "visibility: visible");
}

function Display(numOfDigits, type){
  this.numOfDigits = numOfDigits;
  if(type=="session"||type=="break") this.type = type;
  else this.type = "";
  this.clear = function(){      
    for(var i = 0; i <10; i++){
      for(var j = 0; j < numOfDigits; j++){
        var id = "num" + i + "digit" + (j+1) + this.type;
        clearSgvElementById(id);
      }
    }
  }
  this.setTime = function(time){
    var arr = timeConverter.getArrayFrom(time);
    this.clear()
    for(var i = 0; i < numOfDigits; i++){
      var id = "num" + arr[i] + "digit" + (i+1) + this.type;
	   showSgvElementById(id);
    }
  }
}

var mainDisplay = new Display(4, "main");
var sessionDisplay = new Display(2, "session");
var breakDisplay = new Display(2, "break");

//gives the main properties of the pomodoro's clock
var pomodoro = {
  isRunning: false, 
  finalTime: "00:00",
  isOnBreak: false,
  setStartingTime: function(startTime){
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
        this.setStartingTime(mySession.time);
        this.isOnBreak = false;
		clearSgvElementById('breakSign');
      }
      else{	
        this.setStartingTime(myBreak.time);
        this.isOnBreak = true;
		showSgvElementById('breakSign');
      }
    }
  }
};
//by dafault the pomodoro starts at 25:00:
sessionDisplay.setTime("25:00");
breakDisplay.setTime("25:00");
pomodoro.setStartingTime("25:00");
clearSgvElementById('breakSign');

function doEverySecond(){
  pomodoro.action();
}
var plusSessionButton = document.getElementById("plusSessionButton");
var plusBreakButton = document.getElementById("plusBreakButton");
var minusSessionButton = document.getElementById("minusSessionButton");
var minusBreakButton = document.getElementById("minusBreakButton");
var startButton = document.getElementById("startButton");

//stops or starts the counter when the button is pressed
var pomodoroClock;
startButton.addEventListener("click", function(){
  if(pomodoro.isRunning){
    clearInterval(pomodoroClock);
    pomodoro.isRunning = false;
  }
  else{
    pomodoroClock = setInterval(doEverySecond, 1000);
    pomodoro.isRunning = true;
  }
})

function limitSize(time){
  if(time > 25) time = 25;
  else if(time < 0) time = 0;
  return time;
}
function pad(num, size){
  return num.toString().padStart(size, "0");
}


//this section controls the session and break length display
function showSessionTime(){
  sessionDisplay.setTime(mySession.time);
  pomodoro.setStartingTime(mySession.time);
}
function showBreakTime(){;
  breakDisplay.setTime(myBreak.time);	
}

plusSessionButton.onclick = function(){
  if(pomodoro.isRunning==false){
    mySession.increment();
    showSessionTime();
  }		
}
minusSessionButton.onclick = function(){
  if(pomodoro.isRunning==false){
    mySession.decrement();
    showSessionTime();
  }			
}
plusBreakButton.onclick = function(){
  if(pomodoro.isRunning==false){
    myBreak.increment();
    showBreakTime();
  }		
}
minusBreakButton.onclick = function(){
  if(pomodoro.isRunning==false){
    myBreak.decrement();
    showBreakTime();
  }			
}