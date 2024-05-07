let rows = 10;
let cols = 10;
let circleSize = 30;

function setup() {
  createCanvas(400, 400);
  noStroke();
}

function draw() {
  background(220);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x = map(i, 0, rows - 1, circleSize, width - circleSize);
      let y = map(j, 0, cols - 1, circleSize, height - circleSize);
      let size = circleSize + 20 * sin(frameCount * 0.05 + i * 0.1 + j * 0.1);
      let hue = map(sin(frameCount * 0.05 + i * 0.1 + j * 0.1), -1, 1, 0, 360);
      fill(hue, 100, 100);
      ellipse(x, y, size, size);
    }
  }
}
