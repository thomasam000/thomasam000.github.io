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
     osc.freq(this.freq[j]);
     osc.amp(0.5, 0.1);
     this.color[j] = 80;
      } else {
     this.color[j] = 0}
      }
    }
  }

