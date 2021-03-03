////////////////////////// DEFINING GLOBALS //////////////////////////

let downloadTimer3 = '';
let numberCorrectWA = 0;
let correctAnswerWA = null;

let phraseArray = null;

////////////////////////// WORD ARRAY //////////////////////////

/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String}      The first item in the shuffled array
 */
function shuffle (array) {

    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;

}

/**  prior
 * read file into 2D array - phrase then answer per row
 * shuffle the array
 */
function readInFile() {

}


////////////////////////// PHRASES //////////////////////////

/**  generate phrase
 * randomly pick a phrase
 * display the phrase to html
 * assign correctAnswerWA to the array[phraseIndex][1]
 * display the correct answer on one of four buttons
 * populate remaining buttons with array[randomIndex][1]
 *      if randomIndex != phraseIndex
 */
function generatePhrase() {

}


function checkAnswer1() {
    let userValue = document.getElementById("buttonAnswer1").value;
    checkAnswerToPhrase(userValue);
}
function checkAnswer2() {
    let userValue = document.getElementById("buttonAnswer2").value;
    checkAnswerToPhrase(userValue);
}
function checkAnswer3() {
    let userValue = document.getElementById("buttonAnswer3").value;
    checkAnswerToPhrase(userValue)
}
function checkAnswer4() {
    let userValue = document.getElementById("buttonAnswer4").value;
    checkAnswerToPhrase(userValue);
}

function checkAnswerToPhrase(userValue) {
    if (userValue === correctAnswerWA) {
        numberCorrectWA++;
        document.getElementById("numCorrectWA").innerHTML = numberCorrectWA.toString();
    }
    generatePhrase();
}


////////////////////////// COUNTDOWN //////////////////////////

function startCountdown3() {
    let timeLeft = 30;
    downloadTimer3 = setInterval(function(){
        if(timeLeft <= 0){
            clearInterval(downloadTimer3);
            endWordAssociations();
        }
        else {
            document.getElementById("countdownTimer3").innerHTML = ('<div id="secondsRemaining">' + timeLeft + " seconds remaining" + '</div>');
        }
        timeLeft -= 1;
    }, 1000);
}


////////////////////////// BEGINNING //////////////////////////

function initializeWordAssociations() {
    readInFile();
    shuffle(phraseArray);

    clearInterval(downloadTimer3);
    document.getElementById("numCorrectWA").innerHTML = numberCorrectWA.toString();
    generatePhrase();
    startCountdown3();
}


////////////////////////// ENDING //////////////////////////

function endWordAssociations() {
    clearInterval(downloadTimer3);
    gotoThanks();
}


////////////////////////// DISPLAYING PAGES //////////////////////////

function gotoWordAssociations() {
    document.getElementById("menu-page").style.display = "none";
    document.getElementById("credits-page").style.display = "none";
    document.getElementById("instruction-1-page").style.display = "none";
    document.getElementById("math-page").style.display = "none";
    document.getElementById("instruction-2-page").style.display = "none";
    document.getElementById("grid-page").style.display = "none";
    document.getElementById("instruction-3-page").style.display = "none";
    document.getElementById("word-association-page").style.display = "block";
    document.getElementById("thanks-page").style.display = "none";

    initializeWordAssociations();
}

function gotoThanks() {
    document.getElementById("menu-page").style.display = "none";
    document.getElementById("credits-page").style.display = "none";
    document.getElementById("instruction-1-page").style.display = "none";
    document.getElementById("math-page").style.display = "none";
    document.getElementById("instruction-2-page").style.display = "none";
    document.getElementById("grid-page").style.display = "none";
    document.getElementById("instruction-3-page").style.display = "none";
    document.getElementById("word-association-page").style.display = "none";
    document.getElementById("thanks-page").style.display = "block";
}