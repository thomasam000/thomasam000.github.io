var bet = 0;
var rolls = 0;
var max = 0;
var balance = 10;
var twoInARow = 0


function lucky() {
do {
bet = Number(prompt("starting bet:"));
 if (bet < 1 || bet == "") {
   alert('not enough money')
 } else {
   document.getElementById("start").innerText = bet;
 }
} while (bet < 1 || bet == "")
max = bet;
balance = balance - bet
document.getElementById('balance').innerText =  balance

}

function roll() {
  rolls++
 if(bet>0) {
 let die1 = Math.floor(Math.random()*6 + 1);
 let die2 = Math.floor(Math.random()*6 + 1);
 let total = die1 + die2;
 switch(die1) {
   case 1:
    die1 = "&#9856;" ; break;
   case 2:
    die1 = "&#9857;" ; break;
   case 3:
    die1 = "&#9858;"; break;
   case 4:
    die1 = "&#9859;" ; break;
   case 5:
    die1 = "&#9860;" ; break;
   case 6:
    die1 = "&#9861;" ; break;
 }
 switch(die2) {
   case 1:
    die2 = "&#9856;" ; break;
   case 2:
    die2 = "&#9857;" ; break;
   case 3:
    die2 = "&#9858;"; break;
   case 4:
    die2 = "&#9859;" ; break;
   case 5:
    die2 = "&#9860;" ; break;
   case 6:
    die2 = "&#9861;" ; break;
 }
document.getElementById('dice1').innerHTML = die1;
document.getElementById('dice2').innerHTML = die2;
let cheat = document.getElementById('cheat').value;
if (cheat == 'andrew') {
  bet = 0;
}
if (cheat == 'samuel') {
  total = 7;
}
if (total == 7) {
  twoInARow++;
  bet+=4;
  document.getElementById("start").innerText = bet;
} else {
  twoInARow = 0
  bet-=2;
  document.getElementById("start").innerText = bet;
}
if (twoInARow == 2) {
  alert("bonus! $15")
  bet+=11;
  document.getElementById("start").innerText = bet;
}
if (twoInARow == 3) {
  alert("Jackpot $100")
  bet+=96;
  document.getElementById("start").innerText = bet;
}
if (twoInARow == 4) {
  alert("MEGAJACKPOT $10,000")
  bet+=10000;
  document.getElementById("start").innerText = bet;
}
if(bet>max) {
  max = bet;
}
 } else {
   alert("game over")
   document.getElementById("record").innerText = rolls
   document.getElementById("max").innerText = max
   rolls = 0
  }
}

function addmoney() {
  let addition = parseInt(prompt("add money to bet:"))
  if (isNaN(addition)) { alert("Not a number")} else {
  bet += addition;
  document.getElementById("start").innerText = bet;
  balance = balance - addition;
  document.getElementById('balance').innerText =  balance

}
}

function reset() {
  lucky();
}

function collect() {
   balance = balance + bet
  document.getElementById('balance').innerText =  balance
  bet = 0
  document.getElementById("start").innerText = bet;
}
