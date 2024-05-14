let turns = 0;

function setup() {

    createCanvas(400, 400);
    describe('A gray cloudy pattern that changes.');
    colorMode("hsb");
    angleMode("degrees");
}

function draw() {
    water();
    pedalDrawCircle(5, 100, 10);
    turns++;
}

let flowSpeed = 1; // Adjust the speed of the flow

function water() {
    // Set the noise level and scale.
    let noiseScale = 0.009;

    for (let y = 0; y < height; y += 1) {
        // Iterate from left to right.
        for (let x = 0; x < width; x += 1) {
            let nx = noise(x * noiseScale, y * noiseScale, frameCount * flowSpeed);
            let c = map(nx, 0, 1, 60, 100);
            stroke(200, 60, c);
            point(x, y);
        }
    }
}

function pedalDrawCircle(amount, start) {
    let size = start;
    let increase = start / amount;
    push();
    translate(width / 2, height / 2);
    rotate(15 * turns);
    for (let i = 0; i < amount; i++) {
        let currentDict = circlePedals(size);
        for (let j = 0; j < currentDict.length; j++) {
            let p = currentDict[j];
            fill('#fc9292');
            stroke('#d25f5f');
            push();
            translate(p.x, p.y,)
            rotate(360 / currentDict.length * j);
            // const currentPoint = createVector(p.x,p.y);
            //rotate(originVector.angleBetween(currentPoint));

            ellipse(0, 0, 90 / i, 30 / i);
            strokeWeight(1);
            pop();
        }
        size -= increase;
    }
    pop();


}

function circlePedals(r) {
    let circleDict = [];
    for (let a = 0; a < 360; a += 12) {
        let x = r * cos(a);
        let y = r * sin(a);
        circleDict.push({"x": x, "y": y});
    }
    return circleDict;
}
