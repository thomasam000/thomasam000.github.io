/*
Sam Thomas
Mini-Synth Piano Lessons
lesson 1 fur elise
3-21-19
https://sambthomas.wordpress.com/2019/03/21/final-project/
*/
//an empty array for my constructor function
let confettis = [];



function setup() {
  createCanvas(550, 400);
  //to turn on the oscillator you must create a new osc object
   osc = new p5.Oscillator();
  // you turn up the volume by using the amp method
   osc.amp(0);
  //then turn on the oscillator by using the start method.
   osc.start();
  //here I created for loops to create my confetti objects and fill my array
  for(let i = 0; i<300; i++) {
  confettis[i] = new Confetti()
  }
}


function draw() {
  //see sunth.js (used to create basic shape of keyboard
  synth.draw();
  //see arrays.js (used to draw white keys and assign their frequency and key)
  whiteKeyz.create();
   //see arrays.js (used to draw white keys and assign their frequency and key)
  blackKeyz.create();
  //these three methods are found in slider.js
  slider.drag()
  slider.light()
  slider.text()
  //see game.js
  screen.write();
  //this draws my confettis to the screen from my constructor fucniton
  for(let i = 0; i<confettis.length; i++) {
  confettis[i].go();
  }
}

//this stops the sound when i let go of each key
function keyReleased() {
      osc.amp(0, 0.1);
}
