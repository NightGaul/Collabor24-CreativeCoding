let fft;
let randomX;
let randomY;
let points = 0;
function setup() {
    createCanvas(500, 500);
    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT();
    fft.setInput(mic);
    angleMode(DEGREES);
    randomX = random(100,400);
    randomY = random(50,450);
    
    square(randomX,randomY,50);
    
}

function draw() {
    background(200);
    square(randomX,randomY,50);
    text("Points: " +points, 10,10);
    text("Frequency", 220,490);
    push();
    translate(490,270);
    rotate(-90);
    text("Amplitude", 0,0);
    pop();
    
    let vol = mic.getLevel();
    let spectrum = fft.analyze();
    
    let spectrumAvg = averageOfArray(spectrum);
    fill(127);
    stroke(0);

    let x = map(spectrumAvg, 0, 50, 500, 0);
    let y = map(vol, 0, 0.1, 500, 0);
    
    ellipse(x , y , 50, 50);
    
    if (Math.abs(x-randomX)<25 && Math.abs(y-randomY)<25 ){
        randomX = random(100,400);
        randomY = random(50,450);
        square(randomX,randomY,20);
        points++;
        
    }
    
}

function averageOfArray(array){
    let total = 0;
    for(let i = 0; i < array.length; i++) {
        total += array[i];
    }
    return total / array.length;
    
}