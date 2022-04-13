
let serialPDM;
let portName = "/dev/tty.usbmodem142101";

let sensor;

let buttonVal = 1;





let button1;  
 

 


function preload() {
}

function setup() {
  serialPDM = new PDMSerial(portName);
  sensor = serialPDM.sensorData;
  createCanvas(500, 500);

  
  

  button1 = createButton("LED on/off");
  button1.position(50, 200);
  button1.mousePressed(send);


 
}

function draw() {
  background([sensor.a0, 0, 0]);
  //console.log(sensor.a0);


}

 function send(){
   if (buttonVal == 1){
     buttonVal = 0;
   }
   else buttonVal = 1;

   serialPDM.transmit('buttonVal', buttonVal);
  

 }

