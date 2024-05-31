var song;
var amp;
var button;


var volhistory = [];


function preload() {
  song = loadSound('Supernova.mp3');
}

function setup() {
  frameRate(15);
  createCanvas(windowWidth, windowHeight);
  // Create an amplitude analyzer
  analyzer = new p5.Amplitude();
  analyzer.setInput(song);

  // Start playing the song
  song.loop();

  noFill();
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

}

function draw() {
  // background(360,0,100);
  
  let level = analyzer.getLevel();
  let size = map(level, 0, 1, 0, width);

  strokeWeight(2);
  stroke(map(level, 0, 1, 250, 360), 255, 255,10);
  translate(width/2,height/2);
  
  
  
  for (let i = 0; i < 50; i++) {
    let diameter = size * (i + 1) / 50;
    rotate(frameCount%360);
    ellipse(level, size, diameter, diameter);
  }
  
}
