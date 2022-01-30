var goBackEl = document.querySelector("#goback");
var clearEl = document.querySelector("#clear");
var topscoresEl = document.querySelector("#top-scores");
var storedScores = JSON.parse(localStorage.getItem("allscores"));


//list records from local storage
function displayscores(){
    if (storedScores !== null) {
        var scoreList =document.createElement("ul");
        scoreList.className = "list"

        for (var i = 0; i < storedScores.length; i++) {
            var scoreEntry = document.createElement("li");
            scoreEntry.textContent = storedScores[i].name + " " + storedScores[i].score;
            scoreList.appendChild(scoreEntry);
        }
        topscoresEl.appendChild(scoreList)
    }
}

displayscores();

goBackEl.addEventListener("click", function(){
    window.location.href = "index.html";
})

//clear all records
clearEl.addEventListener("click",function(){
    localStorage.clear();
    topscoresEl.innerHTML= "";
})