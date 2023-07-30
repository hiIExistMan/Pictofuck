let program = [];
let programWidth = 40;
let programHeight = 20;
let squareSize = 25;
let consoleText = "";
let cursorColor;
let running = false;
function initProgram() {
    for(let i = 0; i < programHeight; i++) {
        program[i] = [];
        for(let j = 0; j < programWidth; j++) {
            program[i][j] = color(255,255,255);
        }
    }
}

function saveProgram() {
    let output = {program:[]};
    for(let x = 0; x < programWidth; x++) {
        output.program[x] = [];
        for(let y = 0; y < programHeight; y++) {
            output.program[x].push(color2int(program[y][x]))
        }
    }

    saveJSON(output,"program.json")
}

function load(json) {
    console.log(json);
    let data = json.data.program;
    let prog = [];
    for(let y = 0; y < data.length; y++) {
        prog[y] = []

        for(let x = 0; x < data[0].length; x++) {
            prog[y][x] = int2color(data[x][y])
        }
    }
    console.log(data,prog);
    program = prog;
}

// function finishLoad(img) {

// }

function play() {
    comX = 0;
    comY = 0;
    initInterpreter();
    running = true;
}

function stop() {
    running = false;
}

function setup() {
    let canv = createCanvas(squareSize*programWidth,squareSize*programHeight);
    canv.parent(select("#screen"));
    canv.mousePressed(mp)
    initProgram();
    cursorColor = color(255,255,255)
    frameRate(2);
    createFileInput(load).class("programInput").parent(select(".file-wrapper"))
    select(".fpsSlider").changed(e => {frameRate(Number(e.target.value));console.log(e.target.value)})
    initInterpreter();
}


function draw() {
    for(let x = 0; x < programWidth; x++) {
        for(let y = 0; y < programHeight; y++) {
            fill(program[y][x])
            strokeWeight(2);
            if(comX == x & comY == y) {
                strokeWeight(4);
            }
            stroke(0);
            rect(x*squareSize,y*squareSize,squareSize);
        }
    }
    if(running) {
        step();
        select("textarea").value(consoleText);
    }
}

function mp() {
    if(floor(mouseY/squareSize) > programHeight || floor(mouseX/squareSize) > programWidth) return
    program[floor(mouseY/squareSize)][floor(mouseX/squareSize)] = cursorColor;


}

function changeCursorColor(e) {

    e = e || window.event;
    var targ = e.target || e.srcElement || e;
    if (targ.nodeType == 3) targ = targ.parentNode; // defeat Safari bug
    cursorColor = color(targ.style.backgroundColor);
    console.log(targ.style.backgroundColor)
}