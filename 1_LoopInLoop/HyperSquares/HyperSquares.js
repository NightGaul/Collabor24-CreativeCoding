let rows = 5;
let cols = 5;
let rectSize = 40;

function setup() {
    createCanvas(400, 400);
    noStroke();
    colorMode(HSB);
}

function draw() {
    background(220);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let x = random(width);
            let y = random(height);
            let hue = random(360);
            fill(hue, 100, 100);
            rect(x, y, rectSize, rectSize);
        }
    }
}
