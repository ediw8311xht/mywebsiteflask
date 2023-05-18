function TypingGame(valid_keys, boardSize) {
  var _this = this,
      canvas = $("#Canvas")[0],
      canv = canvas.getContext("2d"),
      width = boardSize[0],
      height = boardSize[1],
      start = false,
      errors = 0,
      mistakes = 0,
      valid_keys = valid_keys.split(""),
      arr = [],
      arr_size = 30;
  update_arr();
  canvas.width = width;
  canvas.height = height;
  this.print_text = function() {
    canv.clearRect(0, 0, width, height);
    canv.fillStyle = "rgb(0, 0, 0)";
    canv.font = "100px consolas";
    var end_num = Math.min(arr.length, 13);
    var cut_text = arr.slice(0, end_num).join("");
    canv.fillText(cut_text, 0, 83);
  }
  function second_func() {
    var num = $("#count").innerHtml();
    console.log(num);
  }
  function update_arr() {
    while (arr.length < arr_size) {
      arr.push(valid_keys[Math.floor(Math.random() * valid_keys.length)]);
    }
  }
  function get_key_func(event) {
    console.log(event.key);
    if (arr[0] === event.key) {
      arr.shift();
      update_arr();
      _this.print_text();
    }
    else {
      errors += 1;
    }
  }
  this.start = function() {
    start = false;
    errors = 0;
    _this.print_text();
    $("#Canvas").on("keydown", get_key_func);
  }
}

$(document).ready(function() {
  var new_game = new TypingGame("1234567890{}[]\\\"'/?!@#$%^&*()-=_+", [700, 100]);
  new_game.start();
});