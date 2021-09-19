//variables
var testerName = prompt("What is your first name?");
var testerInitials = "";
var highScore = "";
var score = "";
var lowScore = "";
var timerEl = document.getElementById('countdown');
var mainEl = document.getElementById('main');
var startBtn = document.getElementById('start');
var message = "The Game has ended, lets see how you did!";
var words = message.split(' ');

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

// messages about game starting
alert("Are you ready to test your coding skills " + testerName + "?");
alert("When you click Ok, the game will start. However, before we click ok, you need to know that you will only have 60 secs to answer 10 questions. If you choose the wrong answer, you will loose 5 seconds. If you understand the instructions click OK, if not click CANCEL to exit the game.------------ NOW, ARE YOU READY?")

//array for quiz questions
const myQuestions = [
  {
    question: "Who invented JavaScript?",
    answers: {
      a: "Douglas Crockford",
      b: "Sheryl Sandberg",
      c: "Brendan Eich"
    },
    correctAnswer: "c"
  },
  {
    question: "Which one of these is a JavaScript package manager?",
    answers: {
      a: "Node.js",
      b: "TypeScript",
      c: "npm"
    },
    correctAnswer: "c"
  },
  {
    question: "Which tool can you use to ensure code quality?",
    answers: {
      a: "Angular",
      b: "jQuery",
      c: "RequireJS",
      d: "ESLint"
    },
    correctAnswer: "d"
  }
];


//======================================================================================================================================================================

function tuboQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
  myQuestions.forEach(
    (currentQuestion, questionNumber) => {

      // variable to store the list of possible answers
      const answers = [];

      // and for each available answer...
      for(letter in currentQuestion.answers){

        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join('')} </div>`
      );
    }
  );

  // finally combine our output list into one string of HTML and put it on the page
  quizContainer.innerHTML = output.join('');
}


}

function displayResults(){}

// display quiz right away
turboQuiz();

// on submit, show results
submitButton.addEventListener('click', showResults);


startBtn.onclick = countdown, turboQuiz();