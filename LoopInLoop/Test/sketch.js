function setup() {
  createCanvas(400, 400);
  background(255);
  noFill();
  stroke(0);
  drawPattern();
}

function drawPattern() {
  for (let i = 0; i < width; i += 20) {
    for (let j = 0; j < height; j += 20) {
      let radius = random(10, 40);
      drawCircle(i, j, radius);
    }
  }
}

function drawCircle(x, y, radius) {
  beginShape();
  for (let angle = 0; angle < TWO_PI; angle += PI / 6) {
    let noiseFactor = noise(x * 0.01, y * 0.01, angle * 0.1) * 20;
    let newX = x + cos(angle) * (radius + noiseFactor);
    let newY = y + sin(angle) * (radius + noiseFactor);
    vertex(newX, newY);
  }
  endShape(CLOSE);
}
