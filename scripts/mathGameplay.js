
////////////////////////// DEFINING GLOBALS //////////////////////////

let correctAnswerMath = 0;
let numberCorrectMath = 0;

////////////////////////// MATH //////////////////////////

function generateEquation() {
    let LHS_randomNumber = Math.floor(Math.random() * 90 + 10);
    let RHS_randomNumber = Math.floor(Math.random() * 50 + 10);
    correctAnswerMath = LHS_randomNumber + RHS_randomNumber;

    document.getElementById("math_eq").innerHTML = (LHS_randomNumber + " + " + RHS_randomNumber);
}

function checkAnswer() {
    let userAnswer = document.getElementById('userAnswer').value;

    if (parseInt(userAnswer) === correctAnswerMath) {
        numberCorrectMath++;
        document.getElementById("numCorrectMath").innerHTML = numberCorrectMath.toString();
    }
    document.getElementById("userAnswer").value = '';
    document.getElementById("userAnswer").focus();
    generateEquation();
}


////////////////////////// COUNTDOWN //////////////////////////

function startCountdown1() {
    let timeLeft = 30;  // TODO Make sure this is 30 at production
    let downloadTimer1 = setInterval(function(){
        if(timeLeft <= 0){
            clearInterval(downloadTimer1);
            endMath();
        }
        else {
            document.getElementById("countdownTimer1").innerHTML = ('<div id="secondsRemaining">' + timeLeft + " seconds remaining" + '</div>');
        }
        timeLeft -= 1;
    }, 1000);
}

////////////////////////// BEGINNING //////////////////////////

function setListener() {
    let answerBox = document.getElementById("userAnswer");
    answerBox.addEventListener("keydown", function(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            checkAnswer();
        }
    });
}

function initializeMath() {
    let numberCorrectMath = 0;

    setListener();
    document.getElementById("userAnswer").focus();
    document.getElementById("numCorrectMath").innerHTML = numberCorrectMath.toString();
    generateEquation();
    startCountdown1();
}


////////////////////////// ENDING //////////////////////////

function endMath() {
    let numberCorrectMath = parseInt(document.getElementById("numCorrectMath").innerHTML);
    document.getElementById("userAnswer").value = '';
    document.getElementById("totalMath").innerHTML = ("You got " + numberCorrectMath.toString() + " answers Correct!");

    gotoInstructions2();
}


////////////////////////// DISPLAYING PAGES //////////////////////////

function goBackToMenu() {
    document.getElementById("menu-page").style.display = "block";
    document.getElementById("credits-page").style.display = "none";
    document.getElementById("instruction-1-page").style.display = "none";
    document.getElementById("math-page").style.display = "none";
    document.getElementById("instruction-2-page").style.display = "none";
    document.getElementById("grid-page").style.display = "none";
    document.getElementById("instruction-3-page").style.display = "none";
    document.getElementById("word-association-page").style.display = "none";
    document.getElementById("thanks-page").style.display = "none";

    document.getElementById("userAgePrompt").style.display = "none";
    document.getElementById("userAgeWarning").style.display = "none";
}

function viewCredits() {
    document.getElementById("menu-page").style.display = "none";
    document.getElementById("credits-page").style.display = "block";
    document.getElementById("instruction-1-page").style.display = "none";
    document.getElementById("math-page").style.display = "none";
    document.getElementById("instruction-2-page").style.display = "none";
    document.getElementById("grid-page").style.display = "none";
    document.getElementById("instruction-3-page").style.display = "none";
    document.getElementById("word-association-page").style.display = "none";
    document.getElementById("thanks-page").style.display = "none";
}

function checkAge() {
    if (document.getElementById("userAge").value === "") {
        document.getElementById("userAgeWarning").style.display = "none";
        document.getElementById("userAgePrompt").style.display = "block";
    }
    else if (document.getElementById("userAge").value < 18) {
        document.getElementById("userAgeWarning").style.display = "block";
        document.getElementById("userAgePrompt").style.display = "none";
    }
    else {
        gotoInstructions1();
    }
}

function gotoInstructions1() {
    document.getElementById("menu-page").style.display = "none";
    document.getElementById("credits-page").style.display = "none";
    document.getElementById("instruction-1-page").style.display = "block";
    document.getElementById("math-page").style.display = "none";
    document.getElementById("instruction-2-page").style.display = "none";
    document.getElementById("grid-page").style.display = "none";
    document.getElementById("instruction-3-page").style.display = "none";
    document.getElementById("word-association-page").style.display = "none";
    document.getElementById("thanks-page").style.display = "none";
}

function gotoMath() {
    document.getElementById("menu-page").style.display = "none";
    document.getElementById("credits-page").style.display = "none";
    document.getElementById("instruction-1-page").style.display = "none";
    document.getElementById("math-page").style.display = "block";
    document.getElementById("instruction-2-page").style.display = "none";
    document.getElementById("grid-page").style.display = "none";
    document.getElementById("instruction-3-page").style.display = "none";
    document.getElementById("word-association-page").style.display = "none";
    document.getElementById("thanks-page").style.display = "none";

    initializeMath();
}

function gotoInstructions2() {
    document.getElementById("menu-page").style.display = "none";
    document.getElementById("credits-page").style.display = "none";
    document.getElementById("instruction-1-page").style.display = "none";
    document.getElementById("math-page").style.display = "none";
    document.getElementById("instruction-2-page").style.display = "block";
    document.getElementById("grid-page").style.display = "none";
    document.getElementById("instruction-3-page").style.display = "none";
    document.getElementById("word-association-page").style.display = "none";
    document.getElementById("thanks-page").style.display = "none";
}