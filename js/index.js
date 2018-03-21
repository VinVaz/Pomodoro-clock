var pomodoroClock = setInterval(everySecond, 1000);
const startingTime = 5;
var time = 0;
var increment = 0;

function everySecond(){
	time = startingTime - increment;
	document.getElementById("main").innerHTML = time.toString();
	if(startingTime==increment){
	clearInterval(pomodoroClock);
    }
	increment++;
}

