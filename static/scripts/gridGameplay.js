
////////////////////////// DEFINING GLOBALS //////////////////////////

var numberCorrectGrid = 0;

let canvas = null;
let context = null;
let canvasF = null;
let contextF = null;

const COORD_SIZE = 400;

let currentNumber = 10;
let finishCountdown = false;

let grid = [];

let numCells = 5;
let cellSize = COORD_SIZE/numCells;

////////////////////////// DRAWING & RENDERING CELLS //////////////////////////

function drawCellCorrect(cell) {
    context.beginPath();
    context.moveTo(cell.x * cellSize, cell.y * cellSize);
    context.lineTo((cell.x + 1) * cellSize, cell.y * cellSize);
    context.lineTo((cell.x + 1) * cellSize, (cell.y + 1) * cellSize);
    context.lineTo(cell.x * cellSize, (cell.y + 1) * cellSize);
    context.lineTo(cell.x * cellSize, cell.y * cellSize);

    context.fillStyle = cell.correctColor;
    context.fill();

    context.stroke();
}

function renderGridCorrect() {
    context.strokeStyle = 'rgb(0, 0, 0)';
    context.lineWidth = 6;

    for (let row = 0; row < numCells; row++) {
        for (let col = 0; col < numCells; col++) {
            drawCellCorrect(grid[row][col]);
        }
    }

    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(COORD_SIZE - 1, 0);
    context.lineTo(COORD_SIZE - 1, COORD_SIZE - 1);
    context.lineTo(0, COORD_SIZE - 1);
    context.closePath();
    context.fillStyle = 'transparent';
    context.strokeStyle = 'rgb(0, 0, 0)';
    context.stroke();
}

//////////////////////////////////////////
function drawCell(cell) {
    context.beginPath();
    context.moveTo(cell.x * cellSize, cell.y * cellSize);
    context.lineTo((cell.x + 1) * cellSize, cell.y * cellSize);
    context.lineTo((cell.x + 1) * cellSize, (cell.y + 1) * cellSize);
    context.lineTo(cell.x * cellSize, (cell.y + 1) * cellSize);
    context.lineTo(cell.x * cellSize, cell.y * cellSize);

    context.fillStyle = cell.currentColor;
    context.fill();

    context.stroke();
}

function renderGrid() {
    context.strokeStyle = 'rgb(0, 0, 0)';
    context.lineWidth = 6;

    for (let row = 0; row < numCells; row++) {
        for (let col = 0; col < numCells; col++) {
            drawCell(grid[row][col]);
        }
    }

    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(COORD_SIZE - 1, 0);
    context.lineTo(COORD_SIZE - 1, COORD_SIZE - 1);
    context.lineTo(0, COORD_SIZE - 1);
    context.closePath();
    context.fillStyle = 'transparent';
    context.strokeStyle = 'rgb(0, 0, 0)';
    context.stroke();
}


////////////////////////// MAKING GRID & ENTITIES //////////////////////////
function randomColor() {
    let randomNumber = Math.floor(Math.random() * 2)
    if (randomNumber === 0) {
        return "red"
    }
    else {
        return "white"
    }
}

function makeGrid() {
    for (let row=0; row< numCells; row++) {
        grid.push([]);
        for (let col=0; col<numCells; col++) {
            grid[row].push([]);
            grid[row][col] = {
                x: col,
                y: row,
                correctColor: randomColor(),
                currentColor: "white",
                isCorrectColor: false
            };
        }
    }
}


////////////////////////// BEGINNING //////////////////////////


// Src: https://www.geeksforgeeks.org/how-to-get-the-coordinates-of-a-mouse-click-on-a-canvas-element/
function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return {x: x, y: y}
}
// End Copied code


function initializeGrid() {
    cellSize = COORD_SIZE/numCells;

    grid = [];
    makeGrid();

    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    canvasF = document.getElementById('canvas-foreground');
    contextF = canvasF.getContext('2d');

    renderGridCorrect();
    transitionSequence();
}

function start() {
    document.getElementById("submitGridButton").style.display = "block";

    let canvasElem = document.querySelector("canvas");
    canvasElem.addEventListener("mousedown", function(e) {
        let mousePos = getMousePosition(canvasElem, e);
        toggleTileColor(mousePos);
        context.clearRect(0, 0, canvas.width, canvas.height);
        renderGrid();
    });

    renderGrid();
}


////////////////////////// COUNTDOWN //////////////////////////

function startCountdown() {
    let timeLeft = 5;
    let downloadTimer = setInterval(function(){
        if(timeLeft <= 0){
            clearInterval(downloadTimer);
            finishCountdown = true;
        }
        else {
            currentNumber = timeLeft;
            transitionRender();
        }
        timeLeft -= 1;
    }, 1000);
}

function transitionRender() {
    contextF.clearRect(0, 0, canvasF.width, canvasF.height);

    contextF.fillText(currentNumber.toString(), COORD_SIZE/2-50, 150);
    contextF.strokeText(currentNumber.toString(), COORD_SIZE/2-50, 150);
    contextF.fill();
    contextF.stroke();
}

function transitionGameLoop() {
    if (!finishCountdown) {
        requestAnimationFrame(transitionGameLoop);
    }
    else {
        contextF.clearRect(0, 0, canvasF.width, canvasF.height);
        document.getElementById("canvas-foreground").style.zIndex = "0";
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);
        setTimeout(() => {start();}, 2000)
    }
}

function transitionSequence() {
    finishCountdown = false;
    contextF.font = "150px Arial";
    contextF.fillStyle = "black";
    contextF.strokeStyle = "white";
    startCountdown();
    transitionGameLoop();
}

////////////////////////// ENDING //////////////////////////


function submitGrid() {
    for (let row=0; row< numCells; row++) {
        for (let col=0; col<numCells; col++) {
            let tile = grid[row][col];
            if (tile.currentColor === tile.correctColor) {
                numberCorrectGrid++;
            }
        }
    }
    endGrid();
}

function endGrid() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("totalGrid").innerHTML = ("You got " + numberCorrectGrid.toString() + "/25 tiles Correct!");

    gotoInstructions3();
}


////////////////////////// GAME LOOP //////////////////////////

function toggleTileColor(mousePosition) {
    let x = mousePosition.x;
    let y = mousePosition.y;
    let col = Math.trunc(x / COORD_SIZE *numCells);
    let row = Math.trunc(y / COORD_SIZE *numCells);
    let tile = grid[row][col];

    if (tile.currentColor === "white") {
        tile.currentColor = "red";
    }
    else if (tile.currentColor === "red") {
        tile.currentColor = "white";
    }
}


////////////////////////// DISPLAYING PAGES //////////////////////////

function gotoGrid() {
    document.getElementById("menu-page").style.display = "none";
    document.getElementById("credits-page").style.display = "none";
    document.getElementById("instruction-1-page").style.display = "none";
    document.getElementById("math-page").style.display = "none";
    document.getElementById("instruction-2-page").style.display = "none";
    document.getElementById("grid-page").style.display = "block";
    document.getElementById("instruction-3-page").style.display = "none";
    document.getElementById("word-association-page").style.display = "none";
    document.getElementById("thanks-page").style.display = "none";

    initializeGrid();
}

function gotoInstructions3() {
    document.getElementById("menu-page").style.display = "none";
    document.getElementById("credits-page").style.display = "none";
    document.getElementById("instruction-1-page").style.display = "none";
    document.getElementById("math-page").style.display = "none";
    document.getElementById("instruction-2-page").style.display = "none";
    document.getElementById("grid-page").style.display = "none";
    document.getElementById("instruction-3-page").style.display = "block";
    document.getElementById("word-association-page").style.display = "none";
    document.getElementById("thanks-page").style.display = "none";

}