let spriteSheet1;
let character = [];
let count = 10;
let startTime;
let gameState = 'wait';
let score = 0;
let speed = 0;
const sounds = new Tone.Players({
  squishSound: "squishS.mp3",
  buzzer: "buzzer.mp3" 
}).toDestination();


function preload(){
  spriteSheet1 = loadImage("Bug.png");
  
}

function setup() {
  createCanvas(700, 700);
  imageMode(CENTER);

  for(i = 0; i < count; i++) {
    character[i] = new Character(spriteSheet1, random(100,650), random(100,650), random([-1, 1]), random([true,false]))
  }

 
}

function timer(){
  return int((millis() - startTime) / 1000);
}

function mousePressed(){
  if (gameState == "end" || gameState == "wait"){
    playSound();
  }
  
  let dmin = -1;
  let character_id = -1;
  for(i = 0; i < count; i++){
    let d = character[i].squishCheck();
    if (d != -1){
      if (dmin == -1 ||  d < dmin){
        dmin = d;
        character_id = i;
      }
    }
  }

  if (character_id != -1){
    character[character_id].squish();
    Sound("squishSound");
  }
  else{
   Sound("buzzer");
  }

}


function draw() {
  background(255, 255, 255);
  if(gameState == 'wait'){
    textSize(30);
    text('Squish as many bugs as you can.', 150, 200);
    text('Click to start', 150, 300);
    if (mouseIsPressed){
      speed = 2;
      startTime = millis();
      gameState = 'playing';
    }
  }
  else if (gameState == 'playing'){
    for(i = 0; i < count; i++){
      character[i].draw();
    }
    
    let time = timer();
    fill(0);
    text("Time: " + (30 - time), 10, 30);
    if (time >= 30){
      gameState = 'end';
    }  
    fill(255, 0, 0);
    text("Score: " +score, 10,80)
  }
  else if (gameState = "end"){
    
    text("Game over!", 150, 300);
    text("Final Score: " + score, 150, 400);
    text("Click to restart", 150, 500);
    if(mouseIsPressed){
      startTime = millis();
      score = 0;
      speed = 2;
      gameState = 'playing'
      
    }
  }
  
}

class Character{
  constructor(spriteSheet, x, y, move, vertical){
   this.spriteSheet = spriteSheet;
   this.sx = 0;
   this.x = x;
   this.y = y;
   this.facing = 1;
   this.move = move;
   this.facing = move;
   this.squished = false;
   this.spriteFrame = 0;
   this.vertical = vertical;
  }

  animate(){
    let sx, sy;
    if (this.move == 0){
      if(this.squished){
        //animation for squished
        sx = 3;  
        sy = 0;
      }
      else{
        //animation for standing still
       sx = 0;
       sy = 0;
      }
    }
    else {
      //animation for walking
      sx = this.spriteFrame % 2 + 1;
      sy = 0;
    }
    return [sx,sy];

  }

  draw(){
    push(); 
    translate(this.x,this.y);
    if(!this.vertical){
      scale(this.facing, 1);
    }
    else{
      rotate(radians(90));
      scale(this.facing,1);
    }

    //draw sprite frame based on animation
    let[sx, sy] = this.animate();
    image(this.spriteSheet, 0, 0, 100, 100, 80 * sx, 80 * sy, 80, 80);  

    //duration of each sprite frame 
    if (!this.squished){
      if(frameCount%20 == 0){
        this.spriteFrame +=1;
      }
    }
    else {
      if(frameCount%70 == 0){
        this.squished = false;
        this.x = random(100, 500);
        this.y = random(100, 500);
        this.go(this.facing)
      }

    }

    //movement
    if(!this.vertical){
      this.x += speed * this.move; 
    }
    else{
      this.y += speed * this.move;
    }

    if(!this.vertical){
      if(this.x < 30){
        this.move = 1;
        this.facing = 1;
      }
      else if(this.x > width - 30){
        this.move = -1;
        this.facing = -1;
      }
    }
    else{
      if(this.y < 30){
        this.move = 1;
        this.facing = 1;
      }
      else if(this.y > height - 30){
        this.move = -1;
        this.facing = -1;
      }

    }
    pop();
    }

    go(direction){
      this.move = direction;
      this.facing = direction;
      this.sx = 3;
    }
    stop(){
      this.move = 0;
    }   

    squishCheck(){
      let d = -1;
      if (mouseX > this.x - 40 && mouseX < this.x + 40 && mouseY > this.y - 40 && mouseY < this.y + 40){
        d = dist(mouseX, mouseY, this.x, this.y)
      }
      return d
    }
    squish(){
      {
        this.stop();
        
        this.squished = true;
        score+=1;
        speed += 1;     
      }
    }
}

let synth = new Tone.PolySynth().toDestination();

let melody = new Tone.Sequence((time, note)=>{
  if (note!=null){
    synth.triggerAttackRelease(note, '8n', time);
  }

}, ["G4",  "A4", "A4","C5", "G5", null,"G5"]);

let chords = [
  {"time": "1", "note":["G5", "E3", "C4", "F4"]},
  {"time": "2", "note":["C3", "G4", "F4", "A4"]},
  {"time": "3", "note":["A5", "A3", "G4", "A4"]},
  {"time": "4", "note":["C4", "C2", "G2", "C4"]}
]

let chord = new Tone.Part((time,notes)=>{
  synth.triggerAttackRelease(notes.note, '2n', time,);  
}, chords);

const synthA = new Tone.FMSynth().toDestination();
const synthB = new Tone.AMSynth().toDestination();


const loopA = new Tone.Loop(time=>{
  synthA.triggerAttackRelease("B3", "8n", time); 
}, "4n");

const loopB = new Tone.Loop(time=>{
  synthA.triggerAttackRelease("C4", "8n", time); 
}, "4n");


Tone.Transport.bpm.value=90;
function playSound(){
  Tone.start();
  loopA.stop('+0');
  loopB.stop('+0');
  chord.loop = true;
  chord.loopEnd = '2m';
  chord.start('+0');
  chord.stop('+30');
  melody.start("+0");
  melody.stop('+30');
  loopA.start('+30');
  loopB.start('+30');  
  Tone.Transport.start();
}



function Sound(sound) {
  sounds.player(sound).start();
}



