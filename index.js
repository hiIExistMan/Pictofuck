let program = [];
let programWidth = 40;
let programHeight = 20;
let squareSize = 25;
let consoleText = "";
let cursorColor;
let running = false;

function initProgram() {
    for (let i = 0; i < programHeight; i++) {
        program[i] = [];
        for (let j = 0; j < programWidth; j++) {
            program[i][j] = color(255, 255, 255);
        }
    }
}

function newProgram() {
    let w = Number(select(".widthInput").value());
    console.log(w);
    if(!w) return;
    let h = w/2;
    programWidth = w;
    programHeight = h;
    squareSize = width/w;
    console.log(w);
    initProgram();
}

function saveProgram() {
    let output = {
        program: []
    };
    for (let x = 0; x < programWidth; x++) {
        output.program[x] = [];
        for (let y = 0; y < programHeight; y++) {
            let c = program[y][x];
            let r = red(c);
            let g = green(c);
            let b = blue(c);
            output.program[x].push([r, g, b])
        }
    }

    saveJSON(output, "program.json")
}

function load(json) {
    let data = json.data.program;
    let prog = [];
    for (let x = 0; x < data[0].length; x++) {

        prog[x] = []
        for (let y = 0; y < data.length; y++) {
            let d = data[y][x];
            prog[x][y] =
                color(d[0], d[1], d[2])
        }
    }
    program = prog;
}

// function finishLoad(img) {

// }

function play() {
    comX = 0;
    comY = 0;
    initInterpreter();
    consoleText = "";
    running = true;
}

function stop() {
    running = false;
}

function setup() {
    let canv = createCanvas(squareSize * programWidth, squareSize * programHeight);
    canv.parent(select("#screen"));
    canv.mousePressed(mp)
    initProgram();
    cursorColor = color(255, 255, 255)
    createFileInput(load).class("programInput").parent(select(".file-wrapper"))
    select(".fpsSlider").changed(e => {
        frameRate(Number(e.target.value));
    })
    initInterpreter();
}


function draw() {
    for (let x = 0; x < programWidth; x++) {
        for (let y = 0; y < programHeight; y++) {
            fill(program[y][x])
            strokeWeight(2);
            if (comX == x & comY == y) {
                strokeWeight(4);
            }
            stroke(0);
            rect(x * squareSize, y * squareSize, squareSize);
        }
    }
    if (running) {
        step();
        select("textarea").value(consoleText);
    }
}

function mp() {
    if (floor(mouseY / squareSize) > programHeight || floor(mouseX / squareSize) > programWidth) return
    program[floor(mouseY / squareSize)][floor(mouseX / squareSize)] = cursorColor;


}

function changeCursorColor(e) {

    e = e || window.event;
    var targ = e.target || e.srcElement || e;
    if (targ.nodeType == 3) targ = targ.parentNode; // defeat Safari bug
    cursorColor = color(targ.style.backgroundColor);
    console.log(`color(${red(cursorColor)}, ${green(cursorColor)}, ${blue(cursorColor)}),`);
}