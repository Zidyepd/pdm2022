let pitch = 800;
let img;

// Set up Tone

let gain = new Tone.Gain().toDestination();


 



let noise = new Tone.Noise('brown');
let noiseEnv = new Tone.AmplitudeEnvelope({
  attack: 0.05,
  decay: 0.05,
  sustain: 0.8,
  release: 0.1
});
let noiseFilter = new Tone.Filter({
  type: "lowpass",
  frequency: 200
});
noise.connect(noiseEnv);
noiseEnv.connect(noiseFilter);
noiseFilter.connect(gain);
let freqLFO = new Tone.LFO(0.4,300,1000).start();
freqLFO.connect(noiseFilter.frequency);


function setup() {
  createCanvas(1000, 1000);
}

function preload(){
  img = loadImage("windb.jpeg");

}
function draw() {
  background(220);

  textSize(20);
  if(!mouseIsPressed){
    text("Press and hold for effect",10,20);
  }

  if(mouseIsPressed){
    image(img, 10, 10, 700, 700); 
  }

}

function mousePressed() {
  noise.start();
  Tone.start();
  
  noiseEnv.triggerAttackRelease(500);
}

function mouseReleased(){
  noise.stop();
}