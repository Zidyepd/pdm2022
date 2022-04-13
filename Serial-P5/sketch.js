// Serial Example

let serialPDM;
let portName = "/dev/tty.usbmodem141101";

let sensor;

let buttonVal = false;
let button1;

function setup() {
  //serialPDM = new PDMSerial(portName);
  //sensor= serialPDM.sensorData;

  createCanvas(600,400);
  button1 = createButton("LED onoff");
  button1.postion(40,40);
  //button.mousePressed(send);



}

function draw() {
  background([90,0,0]);

   //console.log(serialPDM.sensorData.a0);


}

// function send(){
//   buttonVal = !buttonVal;
//   serialPDM.transmit('buttonVal', buttonVal);
  

// }

// function mousePressed(){
//   serialPDM.transmit('mouse', mouseY);
//   console.log(mouseY);
// }

