//slider object
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
