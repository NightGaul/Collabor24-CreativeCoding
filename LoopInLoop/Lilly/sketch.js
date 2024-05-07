let waterMovement = {};
let originVector;
function setup() {

    createCanvas(400, 400);
    describe('A gray cloudy pattern that changes.');
    colorMode("hsb");
    originVector = createVector(0,1);
    angleMode("degrees");

}

function draw() {
    water();
    //pedalsDrawSpirale();
    pedalDrawCircle(5, 4, 10);
    
}

function pedalDrawCircle(amount, start, increase) {
    let size = start;
    push();
    translate(width / 2, height / 2);
    for (let i = 0; i < amount; i++) {
        let currentDict = circlePedals(size);
        for (let j = 0; j< currentDict.length;j++) {
            let p= currentDict[j];
            fill('#fc9292');
            stroke('#000000');
            push();
            const currentPoint = createVector(p.x,p.y);
            rotate(originVector.angleBetween(currentPoint));
           
            ellipse(p.x, p.y, 3*i, 9*i);
            strokeWeight(1);
            pop();

        }


        size += increase;
    }
    pop();
}

function pedalsDrawSpirale() {
    let pedalDict = spirale(0.1, 1000, 1);
    push();
    translate(width / 2, height / 2);
    for (let p of pedalDict) {
        fill('#fc9292');
        stroke('#fc9292');
        ellipse(p.x, p.y, 10, 10);
        strokeWeight(0.1);

    }
    pop();

}


function water() {
    // Set the noise level and scale.
    let noiseLevel = 255;
    let noiseScale = 0.009;//random(0.005,0.013);

    // Iterate from top to bottom.
    for (let y = 0; y < height; y += 1) {
        // Iterate from left to right.
        for (let x = 0; x < width; x += 1) {
            // Scale the input coordinates.

            //waterMovement.create(`X${x}Y${y}` : {"test":  {"nx" :nx,"ny":ny,"nt":nt});
            let nx = noiseScale * x;
            let ny = noiseScale * y;
            let nt = noiseScale * frameCount;
            // waterMovement.n;
            // waterMovement.push(ny);
            // waterMovement.push(nt);
            // Compute the noise value.
            let c = map(noiseLevel * noise(nx, ny, nt), 0, noiseLevel, 60, 100);
            // Draw the point.
            stroke(200, 60, c);
            point(x, y);
        }
    }
}

function spirale(multiplier, length, direction) {
    let r = 0;
    let dict = [];
    for (let i = 0; i < length; i++) {
        let angle = i * direction;
        r = r + multiplier;
        let x = r * cos(angle);
        let y = r * sin(angle);
        dict.push({"x": x, "y": y});


    }
    return dict;
}

function circlePedals(r) {
    let circleDict = [];
    for (let a = 0; a < 360; a+=6) {
        let x = r * cos(a);
        let y = r * sin(a);
        circleDict.push({"x": x, "y": y});
    }
    return circleDict;
}

function calculateAngle(vecA, vecB) {
    let dotProduct = vecA.dot(vecB),
        magA = vecA.mag(),
        magB = vecB.mag(),
        cosTheta = dotProduct / (magA * magB),
        angleRadians = acos(cosTheta);
    return degrees(angleRadians);
}