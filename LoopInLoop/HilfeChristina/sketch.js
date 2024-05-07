let durchmesser
let abstand
let anzahl
let radius
let slider1
let s1
let slider2
let s2
let slider3
let s3
let slider4
let s4

function setup() {
  createCanvas(windowWidth, windowHeight);

  slider1 = createSlider(50, 225);
  slider1.position(10, 10);
  slider1.size(80);

  slider2 = createSlider(0, 100);
  slider2.position(10, 30);
  slider2.size(80);

  slider3 = createSlider(50, 225);
  slider3.position(10, 50);
  slider3.size(80);

  slider4 = createSlider(0, 100);
  slider4.position(10, 70);
  slider4.size(80);
}

function draw() {
  background(245, 115, 0);

  // gelbe Kreise
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      fill(255, 195, 0);
      noStroke();
      circle(durchmesser * i + radius, durchmesser * j + radius, durchmesser)
      durchmesser = windowWidth / 10
      radius = durchmesser / 2
    }
  }

// blaue Quadrate
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      push();
      rectMode(CENTER);
     
      translate(i * (width/10)+radius,  j * (width/10)+radius);
      rotate(PI/4);
      noStroke();
      fill(40, 75, 225, s1);
      
      rect(0,  0, (width/10)-10, (width/10)-10);
      pop();

      s1 = slider1.value();
      s2 = slider2.value();
    }
  }
  /*
    // grüne Quadrate
    for (i = 0; i < 10; i = i + 1) {
      for (j = 0; j < 10; j = j + 1) {
  
        strokeWeight(20);
        stroke(80, 125, 0, s3);
        noFill();
        //rectMode(CENTER);
        rect(40 * i * 2 , 40 * j * 2+s4, 80, 80);
        rotate(30)
  
        s3 = slider3.value();
        s4 = slider4.value();
      }
    }*/
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// // Bild speichern
// function keyPressed() {
//   saveCanvas('Zwischenschritt', 'jpg')
// }
