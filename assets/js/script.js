// Start the quiz with a timer set to 75. Timer left also will be the final score.
var timeLeft = 60;
var timerID;
var timerEl = document.getElementById("timer");
var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");
var questionContainerEl = document.getElementById("question-container");
var startContainerEl = document.getElementById("start-container");
var questionEl = document.getElementById("question");
var answerButtonsEl = document.getElementById("answer-buttons");
var checkAnswerEl = document.getElementById("check-answer");
var viewHighScores = document.getElementById("highscores-link");
var submitButton = document.getElementById("submit-btn");
var clearScoreButton = document.getElementById("clear-btn");
var initialsField = document.getElementById("player-name");
var restartButton = document.getElementById("restart-btn");
var scoreField = document.getElementById("player-score");
var scores = JSON.parse(localStorage.getItem("scores")) || [];
var shuffledQuestions, currentQuestionIndex;

// Start button
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
});

// Countdown timer
function timeTick() {
    timeLeft;
    timerEl.textContent = "Time Left: " + timeLeft + " Secs";
    if (timeLeft > 1) {
        // Set the `textContent` of `timerEl` to show the remaining seconds
        timerEl.textContent = timeLeft + ' Seconds Remaining';
        // Decrement `timeLeft` by 1
        timeLeft--;
        } else if (timeLeft === 1) {
        // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
        timerEl.textContent = timeLeft + ' Second Remaining';
        timeLeft--;
        } else {
        // Once `timeLeft` gets to 0, set `timerEl` to an empty string
        timerEl.textContent = 'Time Up!';
        // Use `clearInterval()` to stop the timer
        clearInterval(timeInterval);
      saveScore();
    }
}

// Start Quiz
function startGame() {
    timerID = setInterval(timeTick, 1000);
    startContainerEl.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .1)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove("hide");
    // When start button is clicked, start the timer
    timeTick();
    setNextQuestion();
};

// Next question
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
};

// Display questions
function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsEl.appendChild(button)
    })
};

// Reset state function
function resetState() {
    //clearStatusClass(document.body)
    nextButton.classList.add("hide")
    checkAnswerEl.classList.add("hide")
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild
            (answerButtonsEl.firstChild)
    }
};

// Select answer
function selectAnswer(e) {
    var selectedButton = e.target;
    //console.dir(selectedButton);
    var correct = selectedButton.dataset.correct;
    checkAnswerEl.classList.remove("hide")
    // Check if the answer correct or wrong then show text
    if (correct) {
        checkAnswerEl.innerHTML = "You got it right!";
    } else {
        checkAnswerEl.innerHTML = "Sorry that was not the correct answer.";
        if (timeLeft <= 5) {
            timeLeft = 0;
        } else {
            // If wrong, deduct time by 5
            timeLeft -= 5;
        }
    }

    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide")
        checkAnswerEl.classList.remove("hide")
    } else {
        startButton.classList.remove("hide")
        saveScore();
    }
};

// Check and show the correct answer
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
};

// Remove all the classes
function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
};

// Save scores
function saveScore() {
    clearInterval(timerID);
    timerEl.textContent = "Time: " + timeLeft;
    setTimeout(function () {
        questionContainerEl.classList.add("hide");
        document.getElementById("score-container").classList.remove("hide");
        document.getElementById("your-score").textContent = "Your final score is " + timeLeft;
    }, 1000)
};

var loadScores = function () {
    // Get score from local storage

    if (!savedScores) {
        return false;
    }

    // Convert scores from stringfield format into array
    savedScores = JSON.parse(savedScores);
    var initials = document.querySelector("#initials-field").value;
    var newScore = {
        score: timeLeft,
        initials: initials
    }
    savedScores.push(newScore);
    console.log(savedScores)

    savedScores.forEach(score => {
        initialsField.innerText = score.initials
        scoreField.innerText = score.score
    })
};


// Show high scores
function getHighScores(initials) {
    document.getElementById("highscores").classList.remove("hide")
    document.getElementById("score-container").classList.add("hide");
    startContainerEl.classList.add("hide");
    questionContainerEl.classList.add("hide");
    if (typeof initials == "string") {
        var score = {
            initials, timeLeft
        }
        scores.push(score)
    }

    var highScoreEl = document.getElementById("highscore");
    highScoreEl.innerHTML = "";
    //console.log(scores)
    for (i = 0; i < scores.length; i++) {
        var div1 = document.createElement("div");
        div1.setAttribute("class", "name-div");
        div1.innerText = scores[i].initials;
        var div2 = document.createElement("div");
        div2.setAttribute("class", "score-div");
        div2.innerText = scores[i].timeLeft;

        highScoreEl.appendChild(div1);
        highScoreEl.appendChild(div2);
    }

    localStorage.setItem("scores", JSON.stringify(scores));

};

// View high scores link
viewHighScores.addEventListener("click", getHighScores);

submitButton.addEventListener("click", function (event) {
    event.preventDefault()
    var initials = document.querySelector("#initials-field").value;
    getHighScores(initials);
});

// Restart or reload the page
restartButton.addEventListener("click", function () {
    window.location.reload();
});

// Clear localStorage
clearScoreButton.addEventListener("click", function () {
    localStorage.clear();
    document.getElementById("highscore").innerHTML = "";
});

// Question Array
var questions = [
    { 
        question: "What is JavaScript?", 
        answers: [
            { text: "The same as Java.", correct: false },
            { text: "JavaScript is a client-side and server-side scripting language inserted into HTML pages and is understood by web browsers. JavaScript is also an Object-based Programming language", correct: true },
            { text: "JavaScript is the most misunderstood programming language in the world.", correct: false },
            { text: "JavaScript is the most popular programming language in the world", correct: false }
        ]
    },
  { 
      question: "How do you write 'Hello World' in an alert box?", 
      answers: [
          { text: "msg('Hello World')", correct: false },
          { text: "alert('Hello World')" , correct: true },
          { text: "prompt('Hello World')", correct: false },
          { text: "alertBox('Hello World')", correct: false }
      ]
  },
  { 
      question: "Which of the following function of Array object calls a function for each element in the array?", 
      answers: [
          { text: "concat()", correct: false },
          { text: "filter()", correct: false },
          { text: "forEach()", correct: true },
          { text: "split()", correct: false }
      ]
  },
  { 
    question: "Which symbol is used for comments in Javascript?", 
    answers: [
        { text: "//", correct: false },
        { text: "/*...*/", correct: false },
        { text: "<!--...--!>", correct: false },
        { text: "All of the above", correct: false },
        { text: "// and /*...*/", correct: true }

    ]
},
  { 
      question: "How do you write an IF statement if you are executing some code when 'i' is NOT equal to 4?", 
      answers: [
          { text: "if (i != 4)", correct: true },
          { text: "if i =! 4", correct: false },
          { text: "if (i <> 4)", correct: false },
          { text: "if (i !=== 4)", correct: false }
      ]
  },
  { 
      question: "What is the correct way to write a JavaScript array?", 
      answers: [
          { text: "var vegetable = (0:'kale', 1:'lettuce', 2:'spinach')", correct: false },
          { text: "var vegetable = ['kale', 'lettuce', 'spinach']", correct: true },
          { text: "var vegetable = (kale, lettuce, spinach)", correct: false },
          { text: "None of the above", correct: false }
      ]
  },
  { 
      question: "How do you round the number 12.123, to the nearest integer?",
      answers: [
          { text: "Math.random(12.123)", correct: false },
          { text: "Math.rnd(12.123)", correct: false },
          { text: "round(12.123)", correct: false },
          { text: "None of the above", correct: true }
      ]
  },
];