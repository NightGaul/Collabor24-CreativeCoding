let numShapes = 50;
let minRadius = 10;
let maxRadius = 200;

function setup() {
  createCanvas(600, 600);
  background(255);
  noFill();
  strokeWeight(2);
}

function draw() {
  background(255);
  translate(width / 2, height / 2);
  
  // Äusserer Loop für jede Figur
  for (let i = 0; i < numShapes; i++) {
    let radius = map(i, 0, numShapes, minRadius, maxRadius);
    let shapeAngle = TWO_PI / i;
    let shapeColor = color(random(255), random(255), random(255), 100);
    
    // Innerer Loop für jeden Winkel der Form
    for (let angle = 0; angle < TWO_PI; angle += shapeAngle) {
      let x = radius * cos(angle);
      let y = radius * sin(angle);
      let size = map(sin(angle + frameCount * 0.05), -1, 1, 5, 30);
      
      stroke(shapeColor);
      push();
      translate(x, y);
      rotate(frameCount * 0.01);
      beginShape();
      
      // Schleife für jede Ecke der Form
      for (let j = 0; j < 6; j++) {
        let vertexAngle = TWO_PI / 6 * j;
        let vx = size * cos(vertexAngle);
        let vy = size * sin(vertexAngle);
        vertex(vx, vy);
      }
      endShape(CLOSE);
      pop();
    }
  }
}
