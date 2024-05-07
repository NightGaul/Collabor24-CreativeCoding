let rows = 10;
let cols = 10;
let shapeSize = 30;

function setup() {
  createCanvas(400, 400);
  noStroke();
}

function draw() {
  background(220);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x = map(i, 0, rows - 1, shapeSize, width - shapeSize);
      let y = map(j, 0, cols - 1, shapeSize, height - shapeSize);
      let noiseVal = noise(i * 0.1, j * 0.1, frameCount * 0.01);
      let size = shapeSize + noiseVal * 50;
      let angle = noise(i * 0.1, j * 0.1, frameCount * 0.01) * TWO_PI;
      let vertices = [];
      for (let a = 0; a < TWO_PI; a += PI / 5) {
        let rand = random(0.5, 1);
        let randX = cos(a) * size * rand;
        let randY = sin(a) * size * rand;
        vertices.push(createVector(randX, randY));
      }
      let hue = map(noise(i * 0.1, j * 0.1, frameCount * 0.01), 0, 1, 0, 360);
      fill(hue, 100, 100);
      beginShape();
      for (let v of vertices) {
        vertex(x + v.x, y + v.y);
      }
      endShape(CLOSE);
    }
  }
}
