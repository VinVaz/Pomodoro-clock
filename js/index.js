var pomodoroClock = setInterval(everySecond, 1000);
const startTime = "02:00";
const breakTime = "00:00";
var timeArr = startTime.split(":");
var mySeconds = timeArr[1];
var myHours = timeArr[0];
var myTime = 0;

function everySecond(){
	if(mySeconds<0){
		mySeconds = 59;
		myHours--;
	}
	if(mySeconds.toString().length<2) mySeconds = "0" + mySeconds;
	if(myHours.toString().length<2) myHours = "0" + myHours;
	myTime = myHours + ":" + mySeconds;
	document.getElementById("main").innerHTML = myTime;
	if(myTime==breakTime){
		clearInterval(pomodoroClock);
    }
	mySeconds--;
}

