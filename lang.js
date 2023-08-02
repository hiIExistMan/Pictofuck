let dp = 0;
let data = [];
let comX = 0;
let comY = 0;
let dir = 0;



function doNothing() {
    return
}

let dictionary;
function int2color(i) {
  r = i >> 16;
  g = (i >> 8) & 0xFF;
  b = i & 0xFF;
  return color(r, g, b);
}
function color2int(c) {
    let r = red(c);
    let g = green(c);
    let b = blue(c);
    return red(c) << 16 | green(c) << 8 | blue(c);
}
function initInterpreter() {
    let red1 = 10444896;
    let red2 = 12533824;
    let red3 = 14622752;
    let red4 = 16711680;
    let green1 = 8429408;
    let green2 = 8437568;
    let green3 = 8445728;
    let green4 = 8453888;
    let blue1 = 6332319;
    let blue2 = 4243391;
    let blue3 = 4243391
    let blue4 = 65535;
    let purple1 = color2int(color("rgb(128, 96, 159)"));
    let purple2 = color2int(color("rgb(128, 64, 191)"));
    let purple3 = color2int(color("rgb(128, 32, 223)"));
    let purple4 = color2int(color("rgb(128, 0, 255)"));
    dictionary = {
        10444896: increaseDP,
        12533824: decreaseDP,
        14622752: incrementDP,
        16711680: decrementDP,
        8429408:outputDP,
        8437568:startBracket,
        8445728:endBracket,
        8453888: haltCode,
        6332319: rightDir,
        4243391:downDir,
        2154463:leftDir,
        65535:upDir
    };
    for(let i = 0; i < 326767; i++) {
        data[i] = 0;
    }
    dp=0;
    comX = 0;
    comY = 0;
    dir = 0;

}
function rightDir() {dir = 0}
function downDir() {dir = 1}
function leftDir() {dir = 2}
function upDir() {dir = 3}

function haltCode() {running=false}
function increaseDP() {dp++}
function decreaseDP() {dp--}
function incrementDP() {data[dp]++}
function decrementDP() {data[dp]--}
function outputDP() {consoleText += String.fromCharCode(data[dp]%256)}
function startBracket() {
    let green2 = 8437568;
    let green3 = 8445728;
    if(data[dp] != 0) return;
    let max;
    if(dir == 1 || dir == 3) max = programWidth;
    else max = programHeight
    let counter = 1;
    movePointer();

    for(let i = 0; i < max; i++) {
        if(program[comY][comX] == green3) {
            counter--;
        } else if(program[comY][comX] == green2) {
            counter++
        }
        if(counter == 0) return;
        movePointer();

    }
    running = false;
    consoleText += "green2 and green3 mismatch terminated on " + comX + " " + comY;
}

function endBracket() {
    let green2 = 8437568;
    let green3 = 8445728;
    if(data[dp] == 0) return;
    let max;
    if(dir == 1 || dir == 3) max = programWidth;
    else max = programHeight
    let counter = 1;
    dir += 2;
    dir %= 4;
    movePointer();

    for(let i = 0; i < max; i++) {
        movePointer();

        if(color2int(program[comY][comX]) == green3) {
            counter++;
        } else if(color2int(program[comY][comX]) == green2) {
            counter--
        }
        
        if(counter == 0) {
            dir += 2;
            dir %= 4;
            
            return;
        }
    }
    running = false;
    consoleText += "green2 and green3 mismatch terminated on " + comX + " " + comY;
}

function movePointer() {
    switch(dir) {
        case 0:
            comX++;
            break;
        case 1:
            comY++;
            break;
        case 2:
            comX--;
            break;
        case 3:
            comY--;
            break;
    }
    comX+= programWidth;
    comY += programHeight
    comX %= programWidth;
    comY %= programHeight;
}

function step() {
    let com = dictionary[color2int(program[comY][comX])];
    if(com) {
        com()
    }    


    movePointer();





}