const sounds = new Tone.Players({
  hello: "media/hello.mp3",
  yes: "media/yes.mp3",
  no: "media/no.mp3",
  whothere : "media/whosthere.mp3",
})

var delay = new Tone.FeedbackDelay("8n", 0.3);
sounds.connect(delay);
delay.toDestination();



let button1;  
let button2;  
let button3;
let button4;  

let slider;  


function preload() {
}

function setup() {
  createCanvas(500, 500);
  

  button1 = createButton("hello");
  button1.position(50, 200);
  button1.mousePressed(()=>buttonSound('hello'));
  
  button2 = createButton("yes");
  button2.position(125, 200);
  button2.mousePressed(()=> buttonSound('yes'));

  button3 = createButton("no");
  button3.position(200, 200);
  button3.mousePressed(() => buttonSound('no'));

  button4 = createButton("who's there?");
  button4.position(275, 200);
  button4.mousePressed(() => buttonSound("whothere"));

  
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
  text('Sampler',170, 100);
  text('Control FeedbackDelay effect using slider', 20, 270);
}

function buttonSound(sound='shot') {
  sounds.player(sound).start();
}