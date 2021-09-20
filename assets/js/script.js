//variables
var testerName = prompt("What is your first name?");
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
    alert("Are you ready to test your coding skills " + testerName + "?");
    alert("When you click Ok, the game will start. However, before we click ok, you need to know that you will only have 60 secs to answer 10 questions. If you choose the wrong answer, you will loose 5 seconds. If you understand the instructions click OK, if not click CANCEL to exit the game.------------ NOW, ARE YOU READY?");

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
        storeInitials();
        }
    }, 1000);
  };

//array for quiz questions
let myQuestions = [
  { question: "JavaScript is the same as Java?", answer: "false" },
  { question: "A JavaScript file ends with .css.", answer: "false" },
  { question: "Var and Let are the same?", answer: "true" },
  { question: "trim() removes unused space from both ends of a string?", answer: "false" },

  ]

function check() {
  document.getElementById("True").checked = true;
};

function uncheck() {
  document.getElementById("False").checked = false;
};

function askQuestions() {

  switch (onQuestion) {
      case 0:
        myQuestionsEl.textContent = myQuestions[0].question;
        break;
      case 1:
        myQuestionsEl.textContent = myQuestions[1].question;
        break;
        case 2:
        myQuestionsEl.textContent = myQuestions[2].question;
        break;
      case 3:
        myQuestionsEl.textContent = myQuestions[3].question;
        break;
  };
};

function CheckAnswers() {

    switch (onQuestion) {
      case 0:
            if (answerFalse === uncheck()) {
              onQuestion = 0;
              score++;
            } else if (answerTrue === check()) {
              onQuestion = 0;
              timeLeft - 5000;
            };          
        break;
      case 1:
        if (answerFalse === uncheck()) {
          onQuestion = 0;
          score++;
        } else if (answerTrue === check()) {
          onQuestion = 0;
          timeLeft - 5000;
        };
        break;
        case 2:
        if (answerTrue === check()) {
          onQuestion = 0;
          score++;
        } else if (answerFalse === uncheck()) {
          onQuestion = 0;
          timeLeft - 5000;
        };
        break;
        case 3:
        if (answerFalse === uncheck()) {
          onQuestion = 0;
          score++;
        } else if (answerTrue === check()) {
          onQuestion = 0;
          timeLeft - 5000;
        };
        break;
  };
};

function storeInitials() {
    alert('You got ' + score + '/' + myQuestions.length);
    var testerInitials = prompt("Enter your initials");
    localStorage.initials = testerInitials;
  };  
  
  // $('button').click(function(){
  //   var onQuestion = (askQuestion.question[q]);
  //   var currentRadio1 = (allQuestions.choices[rb1]);
  //   var currentRadio2 = (allQuestions.choices[rb2]);
  //   $('.questions').html(currentQuestion);
  //   $('.true').html(currentRadio1);
  // };

  startBtn.onclick = countdown;
submitBtn.onclick = CheckAnswers; 