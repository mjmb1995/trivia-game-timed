"use strict"
// changing vars
let time = 30;
let questionNum = 1;
let count = 0;
let correctCount = 0;
let unansweredCount = 0;
let review = false;
let choices;
let correctAnswer;
let userAnswer;
let intervalId;

// const vars, quiz content
const questionArr = ["Which of the following airport is not located in California?", "Based on average fares, wait time, customer satisfaction: which of the following airlines was selected as Time Magazine\'s best US Airline 2016?", "Which of the following airlines had a viral \'over booking\' incident in 2017?", "Which US airline bought Virgin America for $4 billion in 2016?", "In 1980, American Airlines removed 1 olive from each inflight salad. How much did the company save in today\'s dollars?"];

const oneAns = ["SFO", "SAN", "LAS", "LAX"];
const twoAns = ["South West", "American Airlines", "United Airlines", "Lufthansa"];
const threeAns = ["Alaska Airlines", "United Airlines", "Emirates", "Spirit"];
const fourAns = ["Delta Airlines", "Japan Airlines", "British Airways", "Alaska Airlines"];
const fiveAns = ["1,000,925", "125,909", "304,183", "20,000"];

//calls decrement to reduce time by 1 per second
function startTimer() {
    intervalId = setInterval(decrement, 1000);
}

// Stops the count down 
function stop() {

  clearInterval(intervalId);
}

//hides instruction
function hideInstruction(){
	document.getElementById("instruction").classList.add("hidden");
}

//shows timer
function showTimer(){
	document.getElementById("timeSection").classList.remove("hidden");
	
}

//Shows Question and question number
function showMainSection(){
	document.getElementById("mainSection").classList.remove("hidden");
}

// hides answer choices
function hideChoicesSec(){
	document.getElementById("answers").classList.add("hidden");
}

// shows answer choices
function showChoicesSec(){
	document.getElementById("answers").classList.remove("hidden");
}

// shows answer review section
function showReview(){
	document.getElementById("reviewSection").classList.remove("hidden");
}

//hides answer review section
function hideReview(){
	document.getElementById("reviewSection").classList.add("hidden");
}

// shows final scores
function showEnd(){
	document.getElementById("gameEnd").classList.remove("hidden");
	hideChoicesSec();
	hideReview();
	document.getElementById("completeQSec").classList.add("hidden");
	document.getElementById("correct").innerHTML = correctCount;
	document.getElementById("unanswered").innerHTML = unansweredCount;
	stop();
}

// hides scores
function hideEnd(){
	document.getElementById("gameEnd").classList.add("hidden");
}

// reduces time by 1, should be called every second
function decrement() {

  time--;

  document.getElementById("timer").innerHTML = time + " Seconds";
  // game ended
  if (time === 0 && review && questionNum === 5) {
  	showEnd(); 
  
  // answer was submitted, shows correct answer	   
  } else if (time === 0 && !review){
  	showAnswerReview();

  // shows the next question	
  } else if (time === 0 && review){
  	nextQuestion();
  }
}


// Resets seconds to 30 and starts count down
function nextQuestion(){
	// hides review section
	hideReview();
	// sets review to false
	review = false;
	// set time to 30 seconds
	time = 30;
	//shows the next question and answer choices
	questionNum++;
	count++;
	showChoicesSec();
	showQuestion();
}

function showAnswerReview(){

	if (document.querySelector("input[name=answer]:checked")){
		// saves user answer to var 
		userAnswer = document.querySelector("input[name=answer]:checked").value;
		if (userAnswer === correctAnswer){
		correctCount++;
		}
	} else {
		userAnswer = "";
		unansweredCount++;
	}
	//set review to true
	review = true;
	// 4 seconds to review answer
	time = 4;
	// hides answer choices
	hideChoicesSec();
	// shows the review section
	showReview();
	// adds the correct and user answer to html
	document.getElementById("correctAns").innerHTML = correctAnswer;
	document.getElementById("userAns").innerHTML = userAnswer;
	document.getElementsByTagName("input").checked = false;
}

function showQuestion(){
	document.getElementById("number").innerHTML = questionNum;
	document.getElementById("question").innerHTML = questionArr[count];
	showChoices();
}

function showChoices(){
	if (questionNum === 1){
		choices = oneAns;
		correctAnswer = choices[2];
	} else if (questionNum === 2){
		choices = twoAns;
		correctAnswer = choices[0];
	} else if (questionNum === 3){
		choices = threeAns;
		correctAnswer = choices[1];
	} else if (questionNum === 4){
		choices = fourAns;
		correctAnswer = choices[3];
	} else {
		choices = fiveAns;
		correctAnswer = choices[1];
	}

	// using a for loop causes Cannot set property 'innerHTML' of null error
	document.getElementById("answer0").innerHTML = choices[0];
	document.getElementById("answer1").innerHTML = choices[1];
	document.getElementById("answer2").innerHTML = choices[2];
	document.getElementById("answer3").innerHTML = choices[3];
	
	document.getElementById("ans0").value = choices[0];
	document.getElementById("ans1").value = choices[1];
	document.getElementById("ans2").value = choices[2];
	document.getElementById("ans3").value = choices[3];
}

document.getElementById("start").onclick = function(){
	//reset vars
	time = 30;
	questionNum = 1;
	count = 0;
	correctCount = 0;
	unansweredCount = 0;
	review = false;
	choices = "";
	correctAnswer = "";
	userAnswer = "";
	stop();
	// hide instruction, review and endgame sections
	hideInstruction();
	hideReview();
	hideEnd();
	// shows timer
	showTimer();
	// shows main section Questions/Answers/Review/End
	document.getElementById("completeQSec").classList.remove("hidden"); 
	showMainSection();
	// starts count down
	startTimer();
	// shows the Q# and actual question
	showChoicesSec();
	showQuestion();
}

document.getElementById("submit").onclick = function(){
	showAnswerReview();
}