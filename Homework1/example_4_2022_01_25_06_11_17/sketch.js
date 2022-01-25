function setup() {
  createCanvas(200, 200);
}

function draw() {
  background(0, 0, 128);
  
  stroke(255);
  strokeWeight(3)
  fill(0, 128, 0);
  ellipse(100, 100, 100, 100);
  
  fill(255, 0, 0); 
  beginShape();
  vertex(100, 49);
  vertex(90, 80);
  vertex(55, 80);
  vertex(80, 105);
  vertex(70, 140);
  vertex(100, 120);
  vertex(130, 140);
  vertex(120, 105);
  vertex(145, 80);
  vertex(110, 80);
  vertex(100, 49);
  endShape();
  
}