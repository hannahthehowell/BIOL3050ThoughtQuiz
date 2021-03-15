
////////////////////////// DEFINING GLOBALS //////////////////////////

var userKey = null;

let downloadTimer3 = '';
var numberCorrectWA = 0;
let correctAnswerWA = null;

let phraseArray = [];
let usedPhrases = [];

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

/**
 * read file into 2D array - phrase then answer per row
 */
async function readInFile() {
    // phraseArray = [
    //     ["Bee is to honey as Silk is to" ,"worm"],
    //     ["Trunk is to tree as Shaft is to","umbrella"],
    //     ["Lactose is to milk as Gluten is to","bread"],
    //     ["Cold is to scarf as Hot is to" ,"tank top"],
    //     ["Pig is to bacon as Cow is to" ,"beef"],
    //     ["Pages are to book as Words are to","sentences"],
    //     ["Roof is to house Lid is to" ,"tupperware"],
    //     ["Swan is to pond as Shark is to" ,"ocean"],
    //     ["Baby is to animal as Fruit is to" ,"trees"],
    //     ["Coke is to Pepsi as Chocolate is to" ,"vanilla"],
    //     ["Smell is to touch as Red Power Ranger is to" ,"Yellow Power Ranger"],
    //     ["Walk is to run as Trot is to","gallop"],
    //     ["Peter is to Wendy as Romeo is to" ,"Juliet"],
    //     ["Broccoli is to carrot as Banana is to","mango"],
    //     ["Earth is to planet as Sun is to" ,"star"],
    //     ["Keyboard is to writing as Paintbrush is to" ,"painting"],
    //     ["Tea is to kettle as Coffee is to" ,"pot"],
    //     ["Stage is to play as Theatre is to","movie"],
    //     ["Bullet is to gun as Arrow is to" ,"bow"],
    //     ["Caterpillar is to butterfly as tadpole is to" ,"frog"],
    //     ["Octopus is to spider as Eel is to" ,"snake"],
    //     ["Foot is to leg as Hand is to" ,"arm"],
    //     ["Weddings are to white as Funerals are to" ,"black"],
    //     ["Remote is to tv as Controller is to" ,"Xbox"],
    //     ["Underwear is to pants as Socks is to" ,"shoes"],
    //     ["Road is to bike as River is to","canoe"]
    // ];



    let getData = () => {
        return fetch("WordAssociationMasterList.csv", {cache: 'reload'}).then(it => it.text());
    }

    let handleData = (data) => {
        const lines = data.split('\n');
        return lines.slice(1, -1).map(it => it.split(','));
    }

    await getData().then(data => {phraseArray = handleData(data)});
    //phraseArray = handleData(data);
}


////////////////////////// PHRASES //////////////////////////

function generatePhrase() {
    let correctIndex = Math.floor(Math.random() * phraseArray.length);
    while (usedPhrases.includes(phraseArray[correctIndex][0])) {
        correctIndex = Math.floor(Math.random() * phraseArray.length);
    }
    usedPhrases.push(phraseArray[correctIndex][0]);

    let currentPhrase = phraseArray[correctIndex][0];
    correctAnswerWA = phraseArray[correctIndex][1];

    document.getElementById("phrase").innerHTML = currentPhrase;

    let buttonIndexArray = [1, 2, 3, 4];
    buttonIndexArray = shuffle(buttonIndexArray);

    let correctButton = "buttonAnswer" + (buttonIndexArray.pop()).toString();
    document.getElementById(correctButton).value = correctAnswerWA;

    let answersArray = [correctAnswerWA];

    for (let i = 0; i < 3; i++) {
        let randomIndex = correctIndex;
        while (randomIndex === correctIndex || answersArray.includes(phraseArray[randomIndex][1])) {
            randomIndex = Math.floor(Math.random() * phraseArray.length);
        }
        let randomAnswer = phraseArray[randomIndex][1];
        answersArray.push(randomAnswer);
        let currentButton = "buttonAnswer" + (buttonIndexArray[i]).toString();
        document.getElementById(currentButton).value = randomAnswer;
    }
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

    if (phraseArray.length === usedPhrases.length){
        clearInterval(downloadTimer3);
        endWordAssociations();
    }
    else {
        generatePhrase();
    }
}


////////////////////////// COUNTDOWN //////////////////////////

function startCountdown3() {
    let timeLeft = 3;  // TODO Make sure this is 30 at production
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

async function initializeWordAssociations() {
    await readInFile();
    //while (phraseArray.length === 0) {}
    shuffle(phraseArray);

    clearInterval(downloadTimer3);
    document.getElementById("numCorrectWA").innerHTML = numberCorrectWA.toString();
    generatePhrase();
    startCountdown3();
}


////////////////////////// ENDING //////////////////////////

function setAndCheckLocalStorage() {
    userKey = localStorage.getItem('userKey323');
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
        return false;
    }
    return true;
}

function endWordAssociations() {
    clearInterval(downloadTimer3);
    document.getElementById("totalWA").innerHTML = ("You got " + numberCorrectWA.toString() + " associations Correct!");

    let day = new Date();
    let trialNum = setAndCheckLocalStorage() ? 2:1;

    fetch("/userScores", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user_key": userKey,
            "age": age,
            "day": day.getDate(),
            "time": day.getHours().toString() + ":" + day.getMinutes().toString(),
            "num_math": numberCorrectMath,
            "num_grid": numberCorrectGrid,
            "num_wa": numberCorrectWA,
            "trial": trialNum
        })
    }).then(() => {
        console.log("Submitted")
    })

    gotoThanks();
}


////////////////////////// DISPLAYING PAGES //////////////////////////

async function gotoWordAssociations() {
    document.getElementById("menu-page").style.display = "none";
    document.getElementById("credits-page").style.display = "none";
    document.getElementById("instruction-1-page").style.display = "none";
    document.getElementById("math-page").style.display = "none";
    document.getElementById("instruction-2-page").style.display = "none";
    document.getElementById("grid-page").style.display = "none";
    document.getElementById("instruction-3-page").style.display = "none";
    document.getElementById("word-association-page").style.display = "block";
    document.getElementById("thanks-page").style.display = "none";

    await initializeWordAssociations();
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