var questions = [
    {
        question: "question 1",
        choices: ["A","B","C","D"],
        answer: "A",
    },
    {
        question: "question 2",
        choices: ["A","B","C","D"],
        answer: "C",
    }
]


var startEL = document.querySelector("#start");
var questionEl = document.querySelector("#question");
var optionListEl = document.querySelector("#option-list");
var questionResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");
var submitEL = document.querySelector("#submit");



var questionIndex = 0;
var correctCount = 0;

// add variables to hold the time and intervaliD for the timer
var time = 20;
var intervalID;

function endQuiz() {
    // clear Interval
    clearInterval(intervalID);
    // update DOM to indicate game is over

    document.body.innerHTML = "<h2>Game Over, you scored: </h2>" + "<div class='score'>"+correctCount+"</div>";

    var createInput = document.createElement("input");
    createInput.textContent = "";
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "intials");
    createInput.setAttribute("placeholder", "Enter Name");
    document.body.appendChild(createInput);

    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("id", "submit");
    createSubmit.textContent = "Submit";
  
    createSubmit.addEventListener("click", function() {
        var initials = createInput.value;

        var finalscore = {
            name: initials,
            score: correctCount,
        }

        var allscores =localStorage.getItem("allscores");
        if (allscores === null){
            allscores = [];
        }else{
            allscores = JSON.parse(allscores);
        }
        
        allscores.push(finalscore);
        localStorage.setItem("allscores", JSON.stringify(allscores));


        console.log(finalscore);


        window.location.href = "highscores.html";
        console.log(createInput.value);
    })

      document.body.appendChild(createSubmit);

}
  
function updateTime() {
    //decrement time
        time--;
        timerEl.textContent = "Timer:" + time;
        // if time is = end quiz
        if (time <= 0) {
            endQuiz();
        }
}

function getQuestion() {

    startEL.style.display = "none";
    
    //add a timer that will call updateTime every second
    intervalID = setInterval(updateTime, 1000);

    questionEl.textContent = questions[questionIndex].question;

    optionListEl.innerHTML = "";
    questionResultEl.innerHTML = "";

    var choices = questions[questionIndex].choices;
    var choicesLength = choices.length;

    for (var index = 0; index < choicesLength; index++) {
        var choicesListItem = document.createElement("li");
        choicesListItem.textContent = choices[index];
        optionListEl.append(choicesListItem);
    }

    // check if time is 0 and if so end game
    if (time === 0){
        endQuiz;
        return;
    }
}

function nextQuestion() {
    questionIndex++;
    // when all question are asked end quiz
    if (questionIndex === questions.length){
      endQuiz(); 
      return; 
    }
    getQuestion();
}

function checkAnswer(event) {
  // pause timer
  clearInterval(intervalID);
  if (event.target.matches("li")) {
    var answer = event.target.textContent;
    if (answer === questions[questionIndex].answer) {
      questionResultEl.textContent = "Correct";
      correctCount += 25;
    } else {
      questionResultEl.textContent = "Incorrect";
      // subtract 2 seconds from time.
      time = time -2;
    }
  }
  setTimeout(nextQuestion, 2000);
} 


// getQuestion();
startEL.addEventListener("click", getQuestion);
optionListEl.addEventListener("click", checkAnswer);