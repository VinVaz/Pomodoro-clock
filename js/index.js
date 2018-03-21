var pomodoroClock = setInterval(everySecond, 1000);
const startingTime = 0;
var seconds = 0;
var hour = 0;
var time = 0;
var increment = 0;



function everySecond(){
	if(seconds==60){
		seconds = 0;
		hour++;
	}
	if(seconds.toString().length<2) seconds = "0" + seconds;
	if(hour.toString().length<2) hour = "0" + hour;
	time = hour + ":" + seconds;
	document.getElementById("main").innerHTML = time;
	if(time=="02:00"){
		clearInterval(pomodoroClock);
    }
	//increment++;
	seconds++;
}

