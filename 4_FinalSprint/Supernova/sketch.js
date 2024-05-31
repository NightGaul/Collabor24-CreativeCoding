let audioInstrumental;
let audioVocal;
let amp;
let fft;
let fftVocal;
let isPressed = false;
let waveForm;
let peakDetect;
let radiusT;
let shockwaveToggle;
let img;

//based on https://github.com/jeff2957/Music-Visualization--shader-ball-

// Shader and audio variables
let myShader;

// Rotation and jitter variables
let angle = 0.0;
let jitter = 0.0;

function preload() {
    // Preload audio and shader files
    audioInstrumental = loadSound('audio/Instrumental.mp3');
    audioVocal = loadSound('audio/Vocals.mp3');
    myShader = loadShader('shader/vertex.vert', 'shader/fragment.frag');
    frameRate(60);
    img = loadImage('Sonne.jpg');
}

function setup() {
    // Setup canvas with WebGL
    createCanvas(500, 500, WEBGL);
    camera(200, 0, 2300);
    radiusT = 0;
    // Apply the shader
    shader(myShader);

    // Initialize audio and FFT analysis
    userStartAudio();
    amp = new p5.Amplitude();
    fft = new p5.FFT();

    fftVocal = new p5.FFT();
    fftVocal.setInput(audioVocal);
    fft.setInput(audioInstrumental);
    audioInstrumental.loop();
    audioVocal.loop();

    peakDetect = new p5.PeakDetect(20, 20000, 0.45, 20);
}

function draw() {
    orbitControl();

    push();
    // Set dynamic background color
    let bgColor = color(255, 182, 193);
    bgColor.setAlpha(map(sin(frameCount * 0.01), -1, 1, 150, 255));
    background(bgColor);

    // Apply blur effect to the drawing context
    drawingContext.filter = 'blur(2px)';

    // Analyze audio and FFT
    fft.analyze();
    peakDetect.update(fft);
    if (peakDetect.isDetected) {
        console.log("peak");
        shockwaveToggle = true;
    }
    if (shockwaveToggle) {
        shockwave()
        if (radiusT === 990) shockwaveToggle = false;
    }
    // if (fft.getEnergy('bass')>252)    console.log("high");

    //console.log(fft.getEnergy('bass'));
    waveForm = fftVocal.waveform(512);
    //console.log(waveForm);
    const volume = amp.getLevel();
    let freq = fft.getCentroid() * 0.001;

    // Update jitter value every second
    if (second() % 2 == 0) {
        jitter = random(0, 0.1);
    }
    angle += jitter;

    // Rotate sphere based on frequency and volume
    rotateX(sin(freq) + angle * 0.1);
    rotateY(cos(volume) + angle * 0.1);

    // Map frequency and volume to shader uniforms
    const mapF = map(freq, 0, 1, 0, 20);
    const mapV = map(volume, 0, 0.2, 0, 0.5);
    myShader.setUniform('uTime', frameCount);
    myShader.setUniform('uFreq', mapF);
    myShader.setUniform('uAmp', mapV);
    
    texture(img);
    // Draw sphere with high detail
    sphere(200, 24, 24);
    //torus(1000, 100);

    pop();


    rotateX(90);
    noStroke();
    let radius = 500;
    let tubeRadius = 20; // Radius of the tube
    let detail = 6; // Number of vertices around each circle

    beginShape(TRIANGLE_STRIP);
    for (let i = 0; i < waveForm.length; i++) {
        let theta = map(i, 0, waveForm.length, 0, TWO_PI);
        let x = radius * cos(theta);
        let y = radius * sin(theta);
        let z = radius * map(waveForm[i], -1, 1, -1, 1); // Move z-coordinate up and down

        for (let j = 0; j <= detail; j++) {
            let phi = map(j, 0, detail, 0, TWO_PI);
            let circleX = tubeRadius * cos(phi);
            let circleY = tubeRadius * sin(phi);

            // Rotate circle points around the z-axis
            let rotatedX = circleX * cos(theta) - circleY * sin(theta);
            let rotatedY = circleX * sin(theta) + circleY * cos(theta);

            vertex(x + rotatedX, y + rotatedY, z);
        }
    }
    endShape();


}

function shockwave() {
    radiusT = (radiusT + 10) % 1000;
    torus(radiusT, 10);


}
