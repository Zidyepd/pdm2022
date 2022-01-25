function setup() {
  createCanvas(200, 100);
}

function draw() {
  background(0);
  fill(255, 255, 0);
  arc(50, 50, 80, 80, PI + QUARTER_PI, PI - QUARTER_PI);
  
  fill(230, 46, 0);
  beginShape();
  vertex(110, 50);
  vertex(110, 90);
  vertex(185, 90);
  vertex(185, 50);
  endShape();
  
  
  arc(147.5, 50, 75, 75, PI, 0);
  
  fill(255);
  ellipse(130, 50, 25, 25);
  ellipse(165, 50, 25, 25);
  
  fill(0, 0, 255);
  ellipse(130, 50, 15, 15);
  ellipse(165, 50, 15, 15);



}