$(document).ready(function () {
    $(document).on("click", ".square", makeMove)
});
let turn = "X"
let firstMove;
let secondMove;
let board = [[0,0,0],[0,0,0],[0,0,0]]
let count = 1;
let next = 0;

function makeMove(){
  if (next < count) {
next = 10;

  //make move and place your result in the array
  let x = $(this).data("x");
  let y = $(this).data("y");
  if ($(this).text() == "") {
  board[x][y] = turn;
  $(this).text(turn);
} else {
  return;
}
//evaluate to see if anybody won
if (evaluate(turn) == null) {
  return;
}

//switch turn
  turn = "O";
//cpumove if placed in corner
setTimeout(function () {

if (count == 1) {
if ((x == 0 || x == 2) && (y == 0 || y == 2)){
  firstMove = "corner";
} else if (x == 1 && y == 1) {
  firstMove = "center";
} else {
  firstMove = "side";
}
  switch (firstMove) {
    case "corner":
    board[1][1] = turn;
    $("#11").text(turn);
    break;
    case "side":
    board[1][1] = turn;
    $("#11").text(turn);
    break;
    case "center":
    board[0][0] = turn;
    $("#00").text(turn);
    break;
  }
} else if (count == 2){
  if ((x == 0 || x == 2) && (y == 0 || y == 2)){
    secondMove = "corner";
  } else {
    secondMove = "side";
  }

  evaluateForDanger(turn);
} else {
  evaluateForDanger(turn);
}

evaluate(turn);

count++;
next = count-1
turn = "X";


}, 1000);
}
}

function evaluate(active){
if (
  (board[0][0] == active && board[0][1] == active && board[0][2] == active) ||
  (board[1][0] == active && board[1][1] == active && board[1][2] == active) ||
  (board[2][0] == active && board[2][1] == active && board[2][2] == active) ||
  (board[0][0] == active && board[1][0] == active && board[2][0] == active) ||
  (board[0][1] == active && board[1][1] == active && board[2][1] == active) ||
  (board[0][2] == active && board[1][2] == active && board[2][2] == active) ||
  (board[1][1] == active && board[0][0] == active && board[2][2] == active) ||
  (board[1][1] == active && board[0][2] == active && board[2][0] == active)
  ) {
    setTimeout(function () {
      alert("winner is " + active);
      board = [[0,0,0],[0,0,0],[0,0,0]]
      $(".square").text("");
      count = 1;
      next = 0;

      return null;
    }, 250);

} else  if (count == 5){

  setTimeout(function () {
    alert("draw!");
    board = [[0,0,0],[0,0,0],[0,0,0]]
    $(".square").text("");
    count = 1;
    next = 0;

    return null;
}, 250);
} else {
  return 10;
}
}

function evaluateForDanger(active) {

  let blessing = 0;
  for (var x = 0; x < 3; x++) {
    blessing = 0;
    for (var y = 0; y < 3; y++) {
      if (board[x][y] == "O") {
        blessing++;
      }
      if (blessing == 2) {
        let cpux = x;
        for (let k = 0; k < 3; k++) {
          if (board[x][k] == 0) {
            let cpuy = k;
            var string = "#" + cpux + cpuy;
            board[cpux][cpuy] = turn;
            $(string).text(turn);
            return;
          }
        }
        break;
      }
    }
  }
  for (var y = 0; y < 3; y++) {
    blessing = 0
    for (var x = 0; x < 3; x++) {
      if (board[x][y] == "O") {
        blessing++;
      }
      if (blessing == 2) {
        let cpuy = y;
        for (let k = 0; k < 3; k++) {
          if (board[k][y] == 0) {
            let cpux = k;
            var string = "#" + cpux + cpuy;
            board[cpux][cpuy] = turn;
            $(string).text(turn);
            return;
          }
        }
        break;
      }
    }
  }
  if (board[1][1] == "O") {
    if(board[0][0] == "O") {
      if (board[2][2] == 0) {
        board[2][2] = turn;
        $("#22").text(turn);
        return;
      }
    } else if (board[2][2] == "O") {
      if (board[0][0] == 0) {
        board[0][0] = turn;
        $("#00").text(turn);
        return;
    }
  }
   if (board[0][2] == "O") {
    if (board[2][0] == 0) {
      board[2][0] = turn;
      $("#20").text(turn);
      return;
    }
  } else if (board[2][0] == "O") {
    if (board[0][2] == 0) {
      board[0][2] = turn;
      $("#02").text(turn);
      return;
  }
}
}

  let danger = 0;
  for (var x = 0; x < 3; x++) {
    danger = 0;
    for (var y = 0; y < 3; y++) {
      if (board[x][y] == "X") {
        danger++;
      }
      if (danger == 2) {
        let cpux = x;
        for (let k = 0; k < 3; k++) {
          if (board[x][k] == 0) {
            let cpuy = k;
            var string = "#" + cpux + cpuy;
            board[cpux][cpuy] = turn;
            $(string).text(turn);
            return;
          }
        }
        break;
      }
    }
  }
  for (var y = 0; y < 3; y++) {
    danger = 0
    for (var x = 0; x < 3; x++) {
      if (board[x][y] == "X") {
        danger++;
      }
      if (danger == 2) {
        let cpuy = y;
        for (let k = 0; k < 3; k++) {
          if (board[k][y] == 0) {
            let cpux = k;
            var string = "#" + cpux + cpuy;
            board[cpux][cpuy] = turn;
            $(string).text(turn);
            return;
          }
        }
        break;
      }
    }
  }
  if (board[1][1] == "X") {
    if(board[0][0] == "X") {
      if (board[2][2] == 0) {
        board[2][2] = turn;
        $("#22").text(turn);
        return;
      }
    } else if (board[2][2] == "X") {
      if (board[0][0] == 0) {
        board[0][0] = turn;
        $("#00").text(turn);
        return;
    }
  } else if (board[0][2] == "X") {
    if (board[2][0] == 0) {
      board[2][0] = turn;
      $("#20").text(turn);
      return;
    }
  } else if (board[2][0] == "X") {
    if (board[0][2] == 0) {
      board[0][2] = turn;
      $("#02").text(turn);
      return;
  }
}
}
  if (count == 2) {
  if (firstMove == "center") {
    if (board[0][2] == 0) {
    board[0][2] = turn;
    $("#02").text(turn);
    return;
  } else {
    board[2][0] = turn;
    $("#20").text(turn);
    return;
  }
  }else if (firstMove == "corner") {
    if (secondMove == "corner") {
      board[2][1] = turn;
      $("#21").text(turn);
      return;

    } else if (secondMove == "side") {
      if (board[0][0] == "X") {
        board[2][2] = turn;
        $("#22").text(turn);
        return;
      }
      if (board[0][2] == "X") {
        board[2][0] = turn;
        $("#20").text(turn);
        return;
      }
      if (board[2][0] == "X") {
        board[0][2] = turn;
        $("#02").text(turn);
        return;
      }
      if (board[2][2] == "X") {
        board[0][0] = turn;
        $("#00").text(turn);
        return;
      }

    }
  } else if (firstMove == "side" && secondMove == "side") {
    if (board[1][0] == "X" && board[2][1] == "X") {
      board[2][0] = turn;
      $("#20").text(turn);
      return;
    }
    if (board[2][1] == "X" && board[1][2] == "X") {
      board[2][2] = turn;
      $("#22").text(turn);
      return;
    }
    if (board[1][2] == "X" && board[0][1] == "X") {
      board[0][2] = turn;
      $("#02").text(turn);
      return;
    }
    if (board[0][1] == "X" && board[1][0] == "X") {
      board[0][0] = turn;
      $("#00").text(turn);
      return;
    }
  } else if (firstMove == "side" && secondMove == "corner") {
    if (board[1][0] == "X") {
      if (board[0][2] == "X") {
        board[0][0] = turn;
        $("#00").text(turn);
        return;
      }
      if (board[2][2] == "X") {
        board[2][0] = turn;
        $("#20").text(turn);
        return;
      }
    }
    if (board[2][1] == "X") {
      if (board[0][0] == "X") {
        board[2][0] = turn;
        $("#20").text(turn);
        return;
      }
      if (board[0][2] == "X") {
        board[2][2] = turn;
        $("#22").text(turn);
        return;
      }
    }
    if (board[1][2] == "X") {
      if (board[0][0] == "X") {
        board[0][2] = turn;
        $("#02").text(turn);
        return;
      }
      if (board[2][0] == "X") {
        board[2][2] = turn;
        $("#22").text(turn);
        return;
      }
    }
    if (board[0][1] == "X") {
      if (board[2][0] == "X") {
        board[0][0] = turn;
        $("#00").text(turn);
        return;
      }
      if (board[2][2] == "X") {
        board[2][0] = turn;
        $("#00").text(turn);
        return;
      }
    }

  }
}
  while (true) {
  let cpux = getRandomInt(3)
  let cpuy = getRandomInt(3)
  if (board[cpux][cpuy] == 0) {
   var string = "#" + cpux + cpuy;
   board[cpux][cpuy] = turn;
   $(string).text(turn);
   return;
  }
}


  }

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
