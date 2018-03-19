var time = 30;
var question = 1;

var intervalId;

document.getElementById("start").onclick = function(){
	run();
	showQuestion();
}

document.getElementById("submit").onclick = function(){
	timeReset();
	question++;
	showQuestion();
}

function run() {
    intervalId = setInterval(decrement, 1000);
}

// Starts the count down
function decrement() {

  time--;

  document.getElementById("timer").innerHTML = time + " Seconds";

  if (time === 0) {

    nextQuestion();
  }
}

// Stops the count down 
function stop() {

  clearInterval(intervalId);
}

// Resets seconds to 30 and starts count down
function nextQuestion(){
	time = 30;
	decrement();
	question++;
	showQuestion();
}

function showQuestion(){
	document.getElementById("questionNum").innerHTML = question;
}