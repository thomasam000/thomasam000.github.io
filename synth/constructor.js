//this constructor function creates confettis at random positions above the x axis
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
