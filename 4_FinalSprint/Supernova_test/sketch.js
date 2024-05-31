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
let img2;
let backgroundImg;

let cam;

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
    img2 = loadImage('Neutronenstern.jpg')
    backgroundImg = loadImage('sunflowers_puresky.jpg');

}

function setup() {
    // Setup canvas with WebGL
    createCanvas(500, 500, WEBGL);
    cam = createCamera();
    radiusT = 0;

    // Apply the shader
    

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

    // Ensure texture coordinates are enabled
    noStroke();
    textureMode(NORMAL);
}

function draw() {
    
    orbitControl();
    
    panorama(backgroundImg);

    // Apply blur effect to the drawing context
    drawingContext.filter = 'blur(2px)';

    // Analyze audio and FFT
    fft.analyze();
    peakDetect.update(fft);
    if (peakDetect.isDetected) {
        console.log("peak");
        shockwaveToggle = true;
    }

    waveForm = fftVocal.waveform(512);
    const volume = amp.getLevel();
    let freq = fft.getCentroid() * 0.001;

    let angleSpeed = map(freq, 0, 255, 0.01, 0.1);
    angle += angleSpeed * volume;

    
    // Calculate the camera position
    let camX = cos(angle) * 2000;
    let camY = sin(angle) * 2000;
    let camZ = sin(angle)* 2000;

    // Set the camera position
    cam.setPosition(camX, camY, camZ);

    // Look at the center
    
    cam.lookAt(0,0,0);
    
    // Update jitter value every second
    if (second() % 2 == 0) {
        jitter = random(0, 0.1);
    }
    angle += jitter;

    // Rotate sphere based on frequency and volume
    push();
    rotateX(sin(freq) + angle * 0.1);
    rotateY(cos(volume) + angle * 0.1);

    // Use the custom shader for the sphere
    shader(myShader);

    // Map frequency and volume to shader uniforms
    const mapF = map(freq, 0, 1, 0, 20);
    const mapV = map(volume, 0, 0.2, 0, 0.5);
    myShader.setUniform('uTime', frameCount);
    myShader.setUniform('uFreq', mapF);
    myShader.setUniform('uAmp', mapV);

    // Pass the sphere texture to the shader
    myShader.setUniform('uTexture', img);

    // Draw sphere with high detail
    sphere(200, 24, 24);

    pop();

    // Draw the shockwave torus with a different texture
    if (shockwaveToggle) {
        push();
        

        // Draw the torus
        shockwave();

        pop();
        if (radiusT === 1190) shockwaveToggle = false;
    }

    // Revert to the default shader for other shapes
    resetShader();

    rotateX(90);
    noStroke();
    let radius = 500;
    let tubeRadius = 20; // Radius of the tube
    let detail = 6; // Number of vertices around each circle

    // Draw the waveform lines
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
    radiusT = (radiusT + 10) % 1200;

    // Use the custom shader for the torus
    shader(myShader);

    // Pass the different texture to the shader
    myShader.setUniform('uTexture', img2);

    // Draw the torus
    torus(radiusT, 10);
}

// function mouseClicked() {
//     shockwaveToggle = true;
// }

