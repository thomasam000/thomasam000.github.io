//this object is for the piano lessons.
//the notes for the song fur elise are store in an array
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
