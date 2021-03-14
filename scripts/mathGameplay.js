
////////////////////////// DEFINING GLOBALS //////////////////////////

let userKey = null;

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
    setListener();
    document.getElementById("userAnswer").focus();
    document.getElementById("numCorrectMath").innerHTML = numberCorrectMath.toString();
    generateEquation();
    startCountdown1();
}


////////////////////////// ENDING //////////////////////////

function endMath() {
    document.getElementById("userAnswer").value = '';
    document.getElementById("totalMath").innerHTML = ("You got " + numberCorrectMath.toString() + " answers Correct!");

    gotoInstructions2();
}

////////////////////////// OTHER //////////////////////////

function setAndCheckLocalStorage() {
    let userKey = localStorage.getItem('userKey323');
    if (userKey === null) {
        let today = new Date();
        let day = today.getUTCDate().toString();
        let hour = ('0' + today.getUTCHours()).substr(-2).toString();
        let minute = ('0' + today.getUTCMinutes()).substr(-2).toString();
        let second = ('0' + today.getUTCSeconds()).substr(-2).toString();
        let rand1 = Math.floor(Math.random() * 10).toString();
        let rand2 = Math.floor(Math.random() * 10).toString();
        let rand3 = Math.floor(Math.random() * 10).toString();
        userKey = day + hour + minute + second + rand1 + rand2 + rand3;
        localStorage['userKey323'] = userKey;
    }
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
        setAndCheckLocalStorage();
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