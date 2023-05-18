function Pong(ballSize, boardSize) {
  var _this = this,
      canvas = $("#Canvas")[0],
      canv = canvas.getContext("2d"),
      width = boardSize[0],
      height = boardSize[1],
      speed = 100,
      ball_size = ballSize,
      paddle_size = 100,
      paddle_speed = 30,
      paddle_location = (height - paddle_size) / 2,
      ball_location = [(width / 2) - ball_size, (height / 2) - ball_size],
      ball_direction = [1, -1],
      game_over = false,
      score = 0,
      erase_paddle = null;
  canvas.width = width;
  canvas.height = height;
  function print_paddle() {
    canv.fillStyle = "rgb(0, 255, 0)";
    if (erase_paddle !== null) {
      canv.clearRect(width - 5, erase_paddle, 5, paddle_size);
    }
    canv.fillRect(width - 5, paddle_location, 5, paddle_size);
    erase_paddle = paddle_location;
  }
  function mouse_paddle(event) {
    var m_pos_y = (event.offsetY - (paddle_size / 2));
    console.log("OKAY DEXXXTER");
    //console.log(event.offe
    console.log(m_pos_y);
    if (m_pos_y !== paddle_location) {
      paddle_location = m_pos_y;
      print_paddle();
    }
  }
  function paddle_func(event) {
    //This is if you want to use arrow keys. Add into begin if you want.
    if (game_over !== true) {
      if (event.keyCode === 38) {
        paddle_location -= paddle_speed;
        print_paddle();
      }
      else if (event.keyCode == 40) {
        paddle_location += paddle_speed;
        print_paddle();
      }
    }
    
  }
  function restart_game() {
    clearInterval(_this.interv);
    $("#Canvas").off();
  }
  function pong_tick() {
    canv.clearRect(ball_location[0], ball_location[1], ball_size, ball_size);
    print_paddle();
    ball_location[0] += (ball_size * ball_direction[0]);
    ball_location[1] += (ball_size * ball_direction[1]);
    //Checks if left paddle
    if (ball_location[0] <= 0) { 
      ball_direction[0] *= -1;
    }
    else if ((ball_location[0] + ball_size) >= (width - 1)) {
      if (paddle_location <= (ball_location[1] + ball_size) && ball_location[1] <= (paddle_location + paddle_size))  {
        ball_direction[0] *= -1;
        score += 1;
        $("#count").html(score);
      }
      else {
        ball_direction[0] *= -1;
        restart_game();
      }
    }
    if (ball_location[1] <= 0 || ball_location[1] + ball_size >= height - 1) {
      ball_direction[1] *= -1;
    }
    canv.fillStyle = "rgb(255, 0, 0)";
    canv.fillRect(ball_location[0], ball_location[1], ball_size, ball_size);
  }
  function begin() {
    game_over = false;
    _this.interv = setInterval(pong_tick, speed);
    $("#Canvas").on("mousemove", mouse_paddle);
  }
  this.add_reset = function() {
    $("#reset_button").on("click", function(){
      $("#Canvas").off();
      paddle_location = (height - paddle_size) / 2;
      print_paddle();
      game_over = true;
      clearInterval(_this.interv);
      $("#start_button").off();
      _this.start();
    });
  }
  this.start = function() {
    score = 0;
    $("#count").html(score);
    canv.clearRect(ball_location[0], ball_location[1], ball_size, ball_size);
    ball_location = [(width / 2) - ball_size, (height / 2) - ball_size];
    print_paddle();
    canv.fillStyle = "rgb(255, 0, 0)";
    canv.fillRect(ball_location[0], ball_location[1], ball_size, ball_size);
    $("#start_button").one("click", function(){
      begin();
    });
  }
}


$(document).ready(function() {
  var Game = new Pong(20, [600, 400]);
  Game.add_reset();
  Game.start();
});