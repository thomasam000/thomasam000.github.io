// this object is the keyboard shape using rectangles
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
  
