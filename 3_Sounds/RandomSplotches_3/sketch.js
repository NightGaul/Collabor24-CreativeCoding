var song;
var amp;
var button;

var volhistory = [];

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

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
}

function draw() {
  //background(0);

  let level = analyzer.getLevel();
  let size = map(level, 0, 1, 0, width);

  strokeWeight(2);
  stroke(map(level, 0, 1, 250, 360), 255, 255,10);
  translate(width/2,height/2);
  //translate(random(width),random(height))
  // Draw expanding and contracting circles
  for (let i = 0; i < 10; i++) {
    let diameter = size * (i + 1) / 10;
    ellipse(level, size, diameter, diameter);
  }
}
