var size = 400;

function drawLineThickness(arr, thickness, canvas2d) {
  var startDiv = Math.floor(thickness / 2);
  canvas2d.beginPath();
  for (var i = 0; i < thickness; i++) {
    if (arr[0] == arr[2]) {
      canvas2d.moveTo((arr[0] - startDiv) + i, arr[1]);
      canvas2d.lineTo((arr[2] - startDiv) + i, arr[3]);
    }
    else {
      canvas2d.moveTo(arr[0], (arr[1] - startDiv) + i);
      canvas2d.lineTo(arr[2], (arr[3] - startDiv) + i);
    }
    canvas2d.stroke();
  }
}

class GameUI {
  constructor(Size) {
    this.score = [0, 0];
    $("#score").html("Player: " + this.score[0].toString() + "   |   Computer: " + this.score[1].toString());
    this.Size = Size;
    this.canvasRect = $("#boardCanvas")[0];
    this.canv = this.canvasRect.getContext("2d");
    this.canvasRect.height = Size;
    this.canvasRect.width = Size;
    this.engine = new TicTacToe();
  }
  getPlayerChoice(event) {
    if (event.offsetY <= this.Size / 2) {
      if (event.offsetX < this.Size / 2) {
        this.player = "O";
      }
      else {
        this.player = "X";
      }
      this.canvasRect.removeEventListener("click", this.player_choice_callback, false);
      this.mainLoop();
    }
  }
  Game() {
    this.canv.fillStyle = "#000000";
    this.canv.fillRect(0, 0, this.Size, this.Size);
    this.canv.fillStyle = "#FF0000";
    this.canv.fillRect(0, 0, this.Size / 2, this.Size / 2);
    this.canv.fillStyle = "#0000FF";
    this.canv.fillRect(this.Size / 2, 0, this.Size / 2, this.Size / 2);
    this.canv.fillStyle = "#000000";
    this.canv.font = this.Size / 2 + "px Verdana";
    this.canv.fillText("X", this.Size * 0.55, this.Size * 0.45);
    this.canv.fillText("O", this.Size * 0.05, this.Size * 0.45);
    this.player_choice_callback = this.getPlayerChoice.bind(this);
    this.canvasRect.addEventListener("click", this.player_choice_callback, false);
  }
  resetBoard() {
    drawLineThickness([this.Size * 0.34, 0, this.Size * 0.34, this.Size], (this.Size / 50), this.canv);
    drawLineThickness([this.Size * 0.67, 0, this.Size * 0.67, this.Size], (this.Size / 50), this.canv);
    drawLineThickness([0, this.Size * 0.33, this.Size, this.Size * 0.33], (this.Size / 50), this.canv);
    drawLineThickness([0, this.Size * 0.66, this.Size, this.Size * 0.66], (this.Size / 50), this.canv);
  }
  mainLoop() {
    this.eventFunction = this.move.bind(this);
    this.canvasRect.addEventListener("click", this.eventFunction, false);
    this.canv.clearRect(0, 0, this.Size, this.Size);
    this.resetBoard();
    this.engine.reset();
    if (this.engine.table[this.engine.turn] != this.player) {
        var a = this.engine.computerMove();
        this.drawOnBoard(a, this.engine.table[Math.abs(this.engine.turn - 1)]); 
    }
  }
  drawOnBoard(position, char) {
    var posW = [this.Size * 0.03, this.Size * 0.374, this.Size * 0.71];
    var posH = [this.Size * 0.28, this.Size * 0.62, this.Size * 0.96];
    var fontSize = this.Size / 3;
    this.canv.fillStyle = "#000000";
    this.canv.font = fontSize + "px Verdana";
    this.canv.fillText(char, posW[Math.floor(position % 3)], posH[Math.floor(position / 3)]);
  }
  win(winner) {
    console.log(400);
    if (winner == this.player) {
      this.score[0] += 1;
    } else if (this.engine.table.includes(winner)) {
      this.score[1] += 1;
    }
    $("#score").html("Player: " + this.score[0].toString() + "   |   Computer: " + this.score[1].toString());
    var ccc = this.Game.bind(this);
    this.canvasRect.removeEventListener("click", this.eventFunction, false);
    setTimeout(function() {
      ccc();
    }, 1000);
  }
  move(event) {
    //var abcd = this.canvasRect.getBoundingClientRect();
    var x = -1;
    var y = -1;
    var table = [this.Size * 0.33, this.Size * 0.66, this.Size];
    for (var i = 0; i < table.length; i++) {
      if (event.offsetX < table[i] && x === -1) {
        x = i;
      }
      if (event.offsetY < table[i] && y === -1) {
        y = i;
      } 
    }
    if (this.engine.move(x + (y * 3))) {
      this.drawOnBoard(x + (y * 3), this.engine.table[Math.abs(this.engine.turn - 1)]);
      if (!this.engine.IsWin()) {
        var a = this.engine.computerMove();
        this.drawOnBoard(a, this.engine.table[Math.abs(this.engine.turn - 1)]);
      }
      if (this.engine.IsWin() || this.engine.boardFull()) { 
        this.win(this.engine.IsWin());
      }
    }
  }
}


class TicTacToe {
  constructor() {
    this.board = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
    this.table = ["X", "O"];
    this.turn = Math.round(Math.random());
    this.WinConditions = [[0,1,2], [3,4,5], [6,7,8], [0,4,8], [2,4,6], [0,3,6], [1,4,7], [2,5,8]];
  }
  reset() {
    this.board = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
    this.turn = Math.round(Math.random());
  }
  move(pos) {
    if (this.board[pos] == "X" || this.board[pos] == "O") {
      return false;
    }
    this.board[pos] = this.table[this.turn];
    console.log(this.board);
    this.turn = Math.abs(this.turn - 1);
    return true;
  }
  boardFull() {
    for (var i = 0; i < this.board.length; i++) {
      if (!this.table.includes(this.board[i])) {
        return false;
      }
    }
    console.log("BEL AIRE");
    return true;
  }
  IsWin() {
    for (var i = 0; i < this.WinConditions.length; i++) {
      if (this.board[this.WinConditions[i][0]] === this.board[this.WinConditions[i][1]] && this.board[this.WinConditions[i][1]] === this.board[this.WinConditions[i][2]]) {
        return this.board[this.WinConditions[i][0]];
      }
    }
    return false;
  }
  computerMove() {
    this.turn = Math.abs(this.turn - 1);
    for (var i = 0; i < this.board.length; i++) {
      if (!this.table.includes(this.board[i])) {
        this.board[i] = this.table[this.turn];
        if (this.IsWin() == this.table[this.turn]) {
          this.board[i] = this.table[Math.abs(this.turn - 1)];
          return i;
        }
        this.board[i] = this.table[Math.abs(this.turn - 1)];
        if (this.IsWin() == this.table[Math.abs(this.turn - 1)]) {
          return i;
        }
        else {
          this.board[i] = i.toString();
        }
      }
    }
    for (var j = 0; j < this.board.length; j++) {
      if (!this.table.includes(this.board[j])) {
        this.board[j] = this.table[Math.abs(this.turn - 1)];
        return j;
      }
    }
  }
  toString() {
    var s = this.board[0].toString() + " | " + this.board[1].toString() + " | " + this.board[2].toString() + "\n";
    s += "---------\n";
    s += this.board[3].toString() + " | " + this.board[4].toString() + " | " + this.board[5].toString() + "\n";
    s += "---------\n";
    s += this.board[6].toString() + " | " + this.board[7].toString() + " | " + this.board[8].toString();
    return s;
  }
}

$(document).ready(function() {
  var g = new GameUI(size);
  g.Game();
});