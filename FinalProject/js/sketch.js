let serialPDM;
let portName = "/dev/tty.usbmodem142101";

let sensor;

let safeDial;
let startTime;
let gameState = 'wait';
let wait = 1;


let PotentiometerValue;


let dialKey = []; //array with three numbers for the key
let dialKeyCheck = [0, 0, 0,0]; //array with three numbers for checking if the key has been reached 
let dialZeroArray = [0,0,0,0]; //checks if zero has been reached before an element 
let keyPosition = 0;

let printStartAgain = 0;
let FinishTime;
let degree = 0;

const sounds = new Tone.Players({
  KeyGotten: "KeyGotten.mp3",
}).toDestination(); 


function preload(){
  

  safeDial = loadImage("safeDial.png"); 

  
}
function setup(){
  serialPDM = new PDMSerial(portName);
  sensor = serialPDM.sensorData;
  createCanvas(1500, 1000);
  angleMode(DEGREES);

}


function timer(){
  return int((millis() - startTime) / 1000);
}


function checkFirstElement(){
  if (PotentiometerValue >= 0 && PotentiometerValue <= 10){

    dialZeroArray[0] = 1; //we make sure we start from 0
    printStartAgain = 0;
  }
}

function generateKey(){
  dialKey = [random([10, 20, 30, 40, 50, 60, 70, 80, 90]), random([10, 20, 30, 40, 50, 60, 70, 80, 90]), random([10, 20, 30, 40, 50, 60, 70, 80, 90]), random([10, 20, 30, 40, 50, 60, 70, 80, 90])];
}

function setDegree(){
  if (dialKey[keyPosition] == 10){
    degree = 324;
  }
  else if (dialKey[keyPosition] == 20){
    degree = 288;
  }
  else if (dialKey[keyPosition] == 30){
    degree = 252;
  }
  else if (dialKey[keyPosition] == 40){
    degree = 216;
  }
  else if (dialKey[keyPosition] == 50){
    degree = 180;
  }
  else if (dialKey[keyPosition] == 60){
    degree = 144;
  }
  else if (dialKey[keyPosition] == 70){
    degree = 108;
  }
  else if (dialKey[keyPosition] == 80){
    degree = 72;
  }
  else if (dialKey[keyPosition] == 90){
    degree = 36;
  }

}

function resetV(){
  dialKeyCheck = [0, 0, 0,0];
  dialZeroArray = [0,0,0,0];
  keyPosition = 0;

}
function Sound(sound) {
  sounds.player(sound).start();
} 


function check(){
  setDegree();
  if (dialZeroArray[keyPosition] == 1){ 
    if(PotentiometerValue > degree){  
      printStartAgain = 1; 
      resetV();


    }
    else if(PotentiometerValue >= degree && PotentiometerValue <= degree+10){ 

      serialPDM.transmit('LEDon', 1);
      Sound("KeyGotten");

      dialKeyCheck[keyPosition] = 1;
      keyPosition++ ;
    }
  }
  else{
    if (PotentiometerValue >= 0 && PotentiometerValue <= 10){
      dialZeroArray[keyPosition] = 1;
    }
  }
  
  

}
function drawDial(){
  push();
  strokeWeight(7);

  
  line(width/2, 50, width/2, 80);
  translate(0,0)
  translate(width / 2, (height / 2)-150);

  rotate(PotentiometerValue); 
  imageMode(CENTER);

  image(safeDial, 0, 0, 500, 500);
  pop();


}


function draw() {
  background(255, 0, 0); 
  PotentiometerValue = sensor.a0;
  //console.log("pValue = " + PotentiometerValue);
 // console.log("keyArray = " + dialKey.join(", "));
  //console.log("dialkey zero marker = " + dialZeroArray.join(", "));
  //console.log("keypos = " + keyPosition); //used for debugging


  if(gameState == 'wait'){
    textSize(30);
   

    text('Use the key to open the safe in the fastest time possible.', 50, 200);


    text('Click to start.', 50, 500);





    
    

    if (mouseIsPressed){
      resetV();
      generateKey();
      startTime = millis();
      gameState = 'playing';
      if(wait == 1){
        playSound();
        wait = 0;
      }

    }
  }
  else if (gameState == 'playing'){
    drawDial();
    
    let time = timer();
    fill(0);
    text("Time: " + (time), 10, 30);
    text("Key: " + dialKey.join(" "), 10, 80);


    if (printStartAgain == 1){
      text("Ooops! start again! ", 700, 120);
    }

    if (keyPosition == 0 && dialZeroArray[0] == 0){ 

      checkFirstElement();

    }
    else{
      if (keyPosition == 4){
        gameState = 'end';
        FinishTime = time;

      } 
      else {
        check();

      }
    }
    
     
  
  }
  else if (gameState = "end"){ 
    
    text("You opened it!", 150, 300);
    text("Time taken: " + FinishTime + " seconds", 150, 400);
    text("Click to restart", 150, 500);
    if(mouseIsPressed){
      startTime = millis();
  
      resetV();
      generateKey();
      gameState = 'playing'
      
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

  chord.loop = true;
  chord.loopEnd = '2m';
  chord.start('+0');
  
  melody.start("+0");

  Tone.Transport.start();
}




