//variables
//var testerName = prompt("What is your first name?");
var testerInitials = "";
var highScore = "";
var lowScore = "";
var onQuestion = 0;
var score = 0;
var timerEl = document.getElementById('countdown');
var myQuestionsEl = document.getElementById('main');
var startBtn = document.getElementById('start');
var submitBtn = document.getElementById('submit');
var message = "The Game has ended, lets see how you did!";
var answerTrue = document.getElementById('True');
var answerFalse = document.getElementById('False');
 
// messages about game starting
// alert("Are you ready to test your coding skills " + testerName + "?");
// alert("When you click Ok, the game will start. However, before we click ok, you need to know that you will only have 60 secs to answer 10 questions. If you choose the wrong answer, you will loose 5 seconds. If you understand the instructions click OK, if not click CANCEL to exit the game.------------ NOW, ARE YOU READY?");

//60 sec timer
function countdown() {
  var timeLeft = 10;

  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function() {
    // As long as the `timeLeft` is greater than 1
    if (timeLeft > 1) {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      timerEl.textContent = timeLeft + ' seconds remaining';
      // Check the questions
      askQuestions();
      // Decrement `timeLeft` by 1
      timeLeft--;
    } else if (timeLeft === 1) {
      // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
      timerEl.textContent = timeLeft + ' second remaining';
      // Check the questions
      askQuestions();
      timeLeft--;
    } else {
      // Once `timeLeft` gets to 0, set `timerEl` to an empty string
      timerEl.textContent = '';
      // Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);
      // display time up messasge
      alert("Please put down your pencils. Time is up!");
      }
  }, 1000);
}

//array for quiz questions
var myQuestions = [
  { question: "JavaScript is the same as Jave?", answer: "true" },
  { question: "A JavaScript file ends with .css.", answer: "false" },
]

function check() {
  document.getElementById("True").checked = true;
}

function uncheck() {
  document.getElementById("False").checked = false;
}

function askQuestions() {

  // We start the game with a score of 0.
  //var score = 0;
  //var onQuestion = 0;

  switch (onQuestion) {
      case 0:
        myQuestionsEl.textContent = myQuestions[0].question;
        break;
      case 1:
        myQuestionsEl.textContent = myQuestions[1].question;
        break;
  }
}

function CheckAnswers() {

    switch (onQuestion) {
      case 0:
            if (answerTrue === check()) {
              onQuestion = 1;
              score++;
            } else if (answerFalse === uncheck()) {
              onQuestion = 1;
              timeLeft - 5000;
            }
            console.log(onQuestion);
        break;
      case 1:
        var response = document.getElementsById('True');
        if (response[1].checked) {
          onQuestion = 1;
          score++;
        } else {
          timeLeft - 5000;
        }
        break;
  }
};



//   // Loop over every question object
// //  for (var i = 0; i < myQuestions.length; i++) {
//   // Display current question to user and ask OK/Cancel
//   myQuestionsEl.textContent = myQuestions[i].question;

//   // Compare answers
//   if (
//     (document.getElementById('True').checked && myQuestions[i].answer === 't') ||
//     (document.getElementById('False').checked === false && myQuestions[i].answer === 'f')
//   ) {
//       // Increase score
//       score++;
//       // Alert the user
//       //alert('Correct!');
//     } else {
//       //alert('Wrong!');
//     }
//   }

//   // Show total at end
//   alert('You got ' + score + '/' + myQuestions.length);
  


startBtn.onclick = countdown;
submitBtn.onclick = CheckAnswers;