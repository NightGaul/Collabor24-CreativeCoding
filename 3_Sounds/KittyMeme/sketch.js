let fft;
let randomX;
let randomY;
let points = 0;
let open;
let closed;

function setup() {
    createCanvas(500, 500);
    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT();
    fft.setInput(mic);
    angleMode(DEGREES);
    
    
    
    open =  loadImage('open.jpg');
    closed =  loadImage('closed.jpg');
    
}

function draw() {
    background(200);
    console.log(mic.getLevel());
    //tweak if
    if (mic.getLevel()>0.01){
    image(open,0,0);
        
    } else{
        image(closed,0,0);
        
    }
    open.resize(500,500);
    closed.resize(500,500);
}

function averageOfArray(array){
    let total = 0;
    for(let i = 0; i < array.length; i++) {
        total += array[i];
    }
    return total / array.length;
    
}