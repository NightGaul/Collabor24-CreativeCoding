let audio;
let amp;
let fft;
let isPressed = false;

//based on https://github.com/jeff2957/Music-Visualization--shader-ball-

// Shader and audio variables
let myShader;

// Rotation and jitter variables
let angle = 0.0;
let jitter = 0.0;

function preload() {
  // Preload audio and shader files
  audio = loadSound('audio/Are you gonna dance or what.mp3');
  myShader = loadShader('shader/vertex.vert', 'shader/fragment.frag');
  frameRate(60);
}

function setup() {
  // Setup canvas with WebGL
  createCanvas(windowWidth/2, windowHeight, WEBGL);

  // Apply the shader
  shader(myShader);

  // Initialize audio and FFT analysis
  userStartAudio();
  amp = new p5.Amplitude();
  fft = new p5.FFT();
}

function draw() {
  // Set dynamic background color
  let bgColor = color(255, 182, 193);
  bgColor.setAlpha(map(sin(frameCount * 0.01), -1, 1, 150, 255));
  background(bgColor);

  // Apply blur effect to the drawing context
  drawingContext.filter = 'blur(2px)';

  // Analyze audio and FFT
  fft.analyze();
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

  // Draw sphere with high detail
  sphere(200, 400, 400);

  // Additional visual effects: rotating torus
  push();
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  noFill();
  stroke(255, 105, 180); // Hot pink color
  strokeWeight(2);
  torus(500, 30);
  pop();
  

  // Draw cubes that respond to volume
  for (let i = -1; i <= 1; i++) {
    push();
    translate(i * 400, 0, 0);
    rotateX(frameCount * 0.01 + i);
    rotateY(frameCount * 0.01 + i);
    stroke(255);
    strokeWeight(1);
    fill(255, 105, 180, 200);
    box(100 + volume * 500);
    pop();
  }

  // // Draw cones that respond to frequency
  // for (let j = -1; j <= 1; j++) {
  //   push();
  //   translate(0, j * 300, 0);
  //   rotateZ(frameCount * 0.01 + j);
  //   rotateX(frameCount * 0.01 + j);
  //   stroke(255);
  //   strokeWeight(1);
  //   fill(255, 105, 180, 200);
  //   cone(100, 200 + freq * 500);
  //   pop();
  // }
}

function mousePressed() {
  // Toggle audio playback on mouse press
  if (isPressed) {
    audio.pause();
    isPressed = false;
  } else {
    audio.loop();
    isPressed = true;
  }
}

// Helper function to manage window resizing
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
