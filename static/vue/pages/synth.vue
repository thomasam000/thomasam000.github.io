<template>
    <div ref="synth_page" style="position:absolute; right:10px; top:10px;">
        <router-link to="/">Return to home</router-link>
    </div>
</template>
<script>
//each of these objects use a lot of arrays
//each array is connected through the index
//testing
// index zero has a note value, a frequency value, a location value and a color value
let whiteKeyz = {
  note : ['a','s','d','f','g','h','j','k','l',';'] ,
  freq : [261.63,293.66,329.63,349.23,392.00,440.00,493.88,523.25,587.33,659.25],
  xloc : [25,75,125,175,225,275,325,375,425,475],
  color : [255,255,255,255,255,255,255,255,255,255],
  create : function() {
    //this method runs through each index of each array array by this for loop
    for (let i = 0; i < this.note.length; i++) 
    {
      stroke(200);
      //the color is assigned here
      fill(this.color[i])
      //the location here
     rect(this.xloc[i],200,50,180,0,0,6)
      //the note/key
      if (keyIsPressed  && key === this.note[i]) {
        //and the frequency
      userStartAudio()
     osc.freq(this.freq[i]);
        rect(this.xloc[i],203,50,180,0,0,6)
     osc.amp(0.5, 0.1);
        //if the key is pressed the color changes
     this.color[i] = 200;
      } else {
        //else it goes back to normal
     this.color[i] = 255
      } 
    } 
  }
}

//this object is similar to the last 
//but creates keys of different size location and frequncy
let blackKeyz = {
  note : ['w','e','t','y','u','o','p'] ,
  freq : [277.18,311.13,369.99,415.30,466.16,554.37,622.25],
  xloc : [55,110,205,257.5,310,405,460],
  color : [0,0,0,0,0,0,0],
  create : function() {
    noStroke();
    for (let j = 0; j < this.note.length; j++) {
      fill(this.color[j])
     rect(this.xloc[j],200,35,120,0,0,5)
      if (keyIsPressed  && key === this.note[j]) {
      userStartAudio()
      osc.freq(this.freq[j]);
     osc.amp(0.5, 0.1);
     this.color[j] = 80;
      } else {
     this.color[j] = 0}
      }
    }
  }
let synth = { 
  r : 150,
  g :25,
  b :0,
  loc : 0,
  radius : 10,
  diff : 15,
  draw : function() {
    noStroke();
   fill(this.r,this.g,this.b);
    rect(this.loc,this.loc,width,height,this.radius)
    fill(this.r+10,this.g+10,this.b +10)
    rect(this.loc + this.diff,this.loc +this.diff, 
         width - this.diff*2, height - this.diff *2, this.radius)
  }
 }
  

let slider = {
xloc :90,
yloc :50,
w :30,
h :20,
light1: 0,
light2: 0,
light3: 0,
  //anon. method to allow the slider to move if i click it and move the mouse up
drag :function() {
  fill(50);
  rect( 100,50,10,100);
  fill(0);
rect(slider.xloc,slider.yloc,slider.w,slider.h);
  if(mouseX >this.xloc &&mouseX < this.xloc + this.w &&
     mouseY > this.yloc && mouseY < this.yloc + this.h && mouseIsPressed &&
     mouseY > 50 && mouseY <150)
    {
    this.yloc = mouseY - 10;
      }
    },
  //this method is used as the location of the slider changes, the text highlights and
  //the oscilator type is changed
light :function() {
  fill(this.light1);
  ellipse(150,65,20);
  fill(this.light2);
  ellipse(150,100,20);
  fill(this.light3);
  ellipse(150,135,20);
  //if the slider is at this location the oscilator will have this wave type
  //and light up a button
  if (this.yloc < 74) {
    this.light1 = 255
    osc.setType('sine')
    } else {
    this.light1 = 0}
  if (this.yloc >75 && this.yloc < 109) {
    this.light2 = 255;
    osc.setType('sawtooth');
    } else {
    this.light2 = 0}
  if (this.yloc > 110) {
    this.light3 = 255;
    osc.setType('square');
    } else {
    this.light3 = 0}
},
  //this method writes the text and assigns each text to a variable that changes based on
  // the location of the slider
  text :function() {
  textSize(16);
    fill(this.light1);
    text('SINE',170,70);
    fill(this.light2);
    text('SAW', 170,105);
    fill(this.light3);
    text('SQUARE',170,140);
    fill(0);
  }
}

let screen = {
  x:300,
  y:50,
  size0: 80,
  size : 60,
  xloc : 300,
  yloc : 120,
  furElise: [';','p',';','p',';','j','l','k','h','a','d','h','j','d','y','j','k','d',
         ';','p',';','p',';','j','l','k','h','a','d','h','j','d','k','j','h','done!',' ',' '],
  color: [255,150,100],
  write: function() {
    //this method writes the first three values in the array
    rect(this.x,this.y,210,100);    
    for (let i = 0; i<3; i++) {
    //the color is drawn from the color array
      fill(this.color[i]);
      textSize(this.size0);
    text(this.furElise[i],this.xloc+ i*70,this.yloc)
    textSize(this.size0);
      //if you type the leter at index zero, that letter is taken 
      //out of the array with the shift function.
    if (key === this.furElise[0]) {
    this.furElise.shift(i);
    }
    }
  }
}

function Confetti() {
  this.x = random(0,width);
  this.y = random(-200,0);
  this.stroke = 0;
  this.r = random(0,255)
  this.g = random(0,255)
  this.b = random(0,255)
  this.go = function() {
if (screen.furElise[0] == 'done!') {
    stroke(this.stroke);
    fill(this.r,this.g,this.b)
    rect(this.x,this.y,3,3);
  //the confettis fall and shake back and forth.
    this.y ++;
    this.x = this.x + random(-2,2)
  }
  }
}


module.exports = {
  	data() {
    	return {
            slider: slider,
            synth: synth,
            whiteKeyz: whiteKeyz,
            blackKeyz: blackKeyz,
            screen: screen,
        }
    },
    methods: {
        setup() {
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
        },
        draw() {
            //see sunth.js (used to create basic shape of keyboard
            this.synth.draw();
            //see arrays.js (used to draw white keys and assign their frequency and key)
            this.whiteKeyz.create();
            //see arrays.js (used to draw white keys and assign their frequency and key)
            this.blackKeyz.create();
            //these three methods are found in slider.js
            this.slider.drag()
            this.slider.light()
            this.slider.text()
            //see game.js
            this.screen.write();
            //this draws my confettis to the screen from my constructor fucniton
            for(let i = 0; i<confettis.length; i++) {
                confettis[i].go();
            }
        },

        //this stops the sound when i let go of each key
        keyReleased() {
            osc.amp(0, 0.1);
        },


    },
    mounted() {
        this.setup()
        this.draw()
    }
}

</script>

<style scoped>

</style>
