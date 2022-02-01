let c = "red";
function setup() {
  createCanvas(1000, 1000);
}

function draw() {
 // background(220);
  strokeWeight(2);
  stroke(255);
  fill(255, 0, 0);
  rect(0, 0, 30, 30);
  
  fill(255, 165, 0);
  rect(0, 30, 30, 30);
  
  fill(255, 255, 0);
  rect(0, 60, 30, 30);
  
  fill(0, 255, 0);
  rect(0, 90, 30, 30);
  
  fill(0, 255, 255);
  rect(0, 120, 30, 30);
  
  fill(0, 0, 255);
  rect(0, 150, 30, 30);
  
  fill(255, 0, 255);
  rect(0, 180, 30, 30);
  
  fill(153, 51, 51);
  rect(0, 210, 30, 30);
  
  fill(255, 255, 255);
  rect(0, 240, 30, 30);
  
  fill(0, 0, 0);
  rect(0, 270, 30, 30);
 
  
 
  
  if (mouseIsPressed){
    drawline(c);
    mouseLocationCheck();
    }
       
}

function drawline(x){
  strokeWeight(7);
  stroke(x);
  line(mouseX, mouseY, pmouseX, pmouseY);
}
function mouseLocationCheck() {
   
  if(mouseX > 0 && mouseX < 30 && mouseY > 0 && mouseY < 30){
    c = color(255, 0, 0);
  }
  else if(mouseX > 0 && mouseX < 30 && mouseY > 30 && mouseY < 60){
      c = color(255, 165, 0);
  }
  else if(mouseX > 0 && mouseX < 30 && mouseY > 60 && mouseY < 90){
    c = color(255, 255, 0);
  }
  else if(mouseX > 0 && mouseX < 30 && mouseY > 90 && mouseY < 120){
    c = color(0, 255, 0);
  }
  else if(mouseX > 0 && mouseX < 30 && mouseY > 120 && mouseY < 150){
    c = color(0, 255, 255);
  }
  else if(mouseX > 0 && mouseX < 30 && mouseY > 150 && mouseY < 180){
    c = color(0, 0, 255);
  }
  else if(mouseX > 0 && mouseX < 30 && mouseY > 180 && mouseY < 210){
    c = color(255, 51, 255);
  }
  else if(mouseX > 0 && mouseX < 30 && mouseY > 210 && mouseY < 240){
    c = color(153, 51, 51);
  }
  else if(mouseX > 0 && mouseX < 30 && mouseY > 240 && mouseY < 270){
    c = color(255, 255, 255);
  }
  else if(mouseX > 0 && mouseX < 30 && mouseY > 270 && mouseY < 300){
    c = color(0, 0, 0);
  }
}


  