function Clock(){
  var _this = this,
      default_time = [25, 0],
      time_left = [25, 0],
      started = false,
      times_up_song = new Audio("http://k003.kiwi6.com/hotlink/54a19sxr0s/Stephan_Siebert_-_Leo.mp3");
  _this.interval_function;
  function reset() {
    started = false;
    time_left[0] = default_time[0];
    time_left[1] = default_time[1];
    $("#ss_button").html("start");
    _this.print_time_left();
  }
  function times_up() {
    $("#ss_button").off("click");
    $("#ss_button").html("reset");
    _this.started = false;
    times_up_song.load();
    times_up_song.currentTime = 0;
    times_up_song.play();
    $("#ss_button").one("click", function(){
      times_up_song.pause();
      time_left = default_time.slice();
      _this.start();
    });
  }
  this.start = function() {
    _this.print_time_left();
    $("#ss_button").html("start");
    $("#ss_button").on("click", function(){
      if (!_this.started) {
        _this.started = true;
        $("#ss_button").html("stop");
        _this.interval_function = setInterval(function() {
          if (time_left[1] <= 0) {
            if (time_left[0] <= 0) {
              clearInterval(_this.interval_function);
              times_up();
            }
            else {
              time_left[0] -= 1;
              time_left[1] = 59;
            }
          }
          else {
            time_left[1] -= 1;
          }
          _this.print_time_left();
        }, 1000);
      }
      else {
        $("#ss_button").html("start");
        clearInterval(_this.interval_function);
        _this.started = false;
      }
    });
  }
  this.print_time_left = function() {
    var left_row = time_left[0];
    var right_row = time_left[1];
    if (time_left[0] < 10) {
      left_row = "0".concat(time_left[0]);
    }
    if (time_left[1] < 10) {
      right_row = "0".concat(time_left[1]);
    }
    $("#timer").html(left_row + ":" + right_row);
  }
  this.time_getter = function() {
    _this.print_time_left();
    $(".pm_button").on("click", function(event){
      if (event.target.innerText == "+") {
        time_left[0] += 1;
      }
      else if (event.target.innerText == "-") {
        if (time_left[0] > 0) {
          time_left[0] -= 1;
        }
      }
      _this.print_time_left();
    });
  }
      
}

$(document).ready(function() {
  var a = new Clock();
  a.time_getter();
  a.start();
});