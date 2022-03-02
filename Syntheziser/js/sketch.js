const synth = new Tone.PluckSynth();
var delay = new Tone.FeedbackDelay(0, 0.3);
synth.connect(delay);
delay.toDestination();
let slider;

let notes = {
  'a': 'C4',
  's': 'D4',
  'd': 'E4',
  'f': 'F4',
  'g': 'G4',
  'h': 'A4',
  'j': 'B4',
  'k': 'C5'
}

function setup() {
  createCanvas(600, 500);
  synth.release = 2;
  synth.resonance = 0.98;
  

  slider = createSlider(0,1,0,0.1);
  slider.position(150, 300);
  slider.mouseReleased(()=>{
    let delayTime = slider.value();
    delay.delayTime.value = delayTime; 
  }); 
}

function draw() {
  background(255, 0, 50);
  textSize(20);
  text('PluckSynth Synthesizer',170, 100);
  text("Press any of these keys to get a soud: a, s, d, f, g, h, j, k", 50, 200);
  text('Control FeedbackDelay effect using slider', 50, 270);
}

function keyPressed() {
  let toPlay = notes[key];
  synth.triggerAttackRelease(toPlay, 0.5); 
}