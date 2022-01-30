var questions = [
    {
        question: "Who is NOT a Gryffindor?",
        choices: ["Draco Malfoy","Ron Weasley","Ginny Weasley","Harry Potter"],
        answer: "Draco Malfoy",
    },
    {
        question: "What is the name of Hagrid's pet dragon?",
        choices: ["Bernard","Norman","Norbert","Fluffy"],
        answer: "Norbert",
    },
    {
        question: "What form is Hermione's patronus?",
        choices: ["Rabbit", "Swan", "Horse", "Otter"],
        answer: "Otter",
    },
    {
        question: "Which character's name is the first to be mentioned in the film series?",
        choices: ["Harry Potter", "Professor McGonagall", "Hagrid", "Professor Dumbledore"],
        answer: "Professor McGonagall",
    },
    {
        question: "What position does Harry play on his Quidditch team?",
        choices: ["Keeper", "Seeker", "Bludger", "Chaser"],
        answer: "Seeker",
    },
    {
        question: "Who is Fluffy",
        choices: ["Hermione's Cat", "Harry's Owl", "A Three-Headed Dog", "Hagrid's Dragon"],
        answer: "A Three-Headed Dog",
    }
]


var startEL = document.querySelector("#start");
var questionEl = document.querySelector("#question");
var optionListEl = document.querySelector("#option-list");
var questionResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");
var submitEL = document.querySelector("#submit");
var introEl = document.querySelector("#intro1");
var intro2El = document.querySelector("#intro2");



var questionIndex = 0;
var correctCount = 0;

// add variables to hold the time and intervaliD for the timer
var time = 35;
var intervalID;

function endQuiz() {
    // clear Interval
    clearInterval(intervalID);
    // update DOM to indicate game is over

    document.body.innerHTML = "<h2>Game Over, you scored: </h2>" + "<div class='score'>"+correctCount+"</div>";

    var createInput = document.createElement("input");
    createInput.textContent = "";
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
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
    introEl.style.display = "none";
    intro2El.style.display = "none";
    
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