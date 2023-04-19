function SimonSays(Size, Delay, WindowDelay=100) {
   var _this = this,
       fail_audio = new Audio("http://k003.kiwi6.com/hotlink/zsmqp5pltc/fail.mp3"),
       error_audio = new Audio("http://k003.kiwi6.com/hotlink/52gsx15p6n/error.mp3"),
       square_audio = [new Audio("http://k003.kiwi6.com/hotlink/vzoq9q24lx/1.mp3"), new Audio("http://k003.kiwi6.com/hotlink/jdj0e2wu5i/2.mp3"),
                       new Audio("http://k003.kiwi6.com/hotlink/ngt1in0bmg/3.mp3"), new Audio("http://k003.kiwi6.com/hotlink/orij0j4yqg/4.mp3")],
       sequence = [],
       canvas = $("#Canvas")[0],
       canv = canvas.getContext("2d"),
       color_code = {0: "rgba(0, 0, 255)" , 1: "rgba(255, 0, 0)", 2: "rgba(10, 201, 43)", 3: "rgba(255, 240, 0)"},
       correct_combo = "not set",
       combination = [Math.floor(Math.random() * 4)],
       state_combination = combination.slice();
   canvas.height = Size;
   canvas.width = Size;
   //_this.user_input = get_user_input();
   
   function draw_count() {
      var count_element = $("#Count");
      if (combination.length >= 20) {
         count_element.html("You win. Good job you do not have a life. Click start to restart game.");
         return "WIN";
      }
      else {
         count_element.html("Count: " + combination.length)
         return "NOT WIN";
      }
   }
   
   function draw_combination() {
      if (state_combination.length < 1) {
         window.clearInterval(_this.interv);
         state_combination = combination.slice();
         canvas.addEventListener("click", get_user_input);
      }
      else {
         var a = state_combination.pop();
         _this.draw_square(a, true);
         setTimeout(_this.draw_square.bind(_this, a), 200);
      }
   }
   
   function get_user_input(event=false) {
      console.log("NOT YEEEEEEEEEE");
      var next_square = state_combination.pop();
      var x_num = Math.floor(event.offsetX / (Size / 2));
      var y_num = Math.floor(event.offsetY / (Size / 2));
      var square = x_num + (y_num * 2);
      _this.draw_square(square, true);
      setTimeout(_this.draw_square.bind(_this, square), 300);
      if (next_square !== square) {
         canvas.removeEventListener("click", get_user_input, false);
         if ($("#strict_mode_button").is(":checked")) {
            fail_audio.load();
            fail_audio.currentTime = 1;
            fail_audio.volume = 0.5;
            fail_audio.play();
            setTimeout(function() {
               fail_audio.pause();
            }, 5000);
            _this.restart_game();
         }
         else {
            error_audio.load();
            error_audio.currentTime = 0;
            error_audio.volume = 0.1;
            error_audio.play();
            setTimeout(function() {
               error_audio.pause();
            }, 350);
            state_combination = combination.slice();
            setTimeout(_this.interv = setInterval(draw_combination, Delay), 300);
         }
      }
      else {
         square_audio[square].load();
         square_audio[square].currentTime = 0;
         square_audio[square].volume = 1;
         square_audio[square].play();
         if (state_combination.length < 1) {
            var a = [0, 1, 2, 3];
            a.splice(combination[0], 1);
            a = a[Math.floor(Math.random() * 3)];
            combination.unshift(a);
            state_combination = combination.slice();
            canvas.removeEventListener("click", get_user_input, false);
            if (draw_count() === "WIN") {
               _this.restart_game(true);
            }
            else {
               setTimeout(_this.interv = setInterval(draw_combination, Delay), 100);
            }
         }

      }
   }
   
   this.game = function(win=false) {
      if (!win) {
         $("#Count").html("Click Start to Start");
      }
      $("#start_button").one("click", function() {
         //$("#start_button").off("click", 
         draw_count();
         _this.interv = setInterval(draw_combination, Delay);
      });
   }
   
   this.restart_game = function(win=false) {
      combination = [Math.floor(Math.random() * 4)],
      state_combination = combination.slice();
      _this.game(win);
   }
   
   this.draw_square = function(square, light=false) {
      var x = square % 2;
      var y = Math.floor(square / 2);
      //This is here to "erase"(set square to black) before coloring square.
      //Otherwise rgba with a lighter tone won't show.
      canv.fillStyle = "rgb(0, 0, 0)";
      canv.fillRect(Size * (x * 0.50), Size * (y * 0.50), Size * Math.max(x, 0.5), Size * Math.max(y, 0.5));
      //end of erase part.
      if (light === true) {
         canv.fillStyle = color_code[square].slice(0, -1) + ", 0.4)";
      }
      else {
         canv.fillStyle = color_code[square];
      }
      canv.fillRect(Size * (x * 0.50), Size * (y * 0.50), Size * Math.max(x, 0.5), Size * Math.max(y, 0.5));
   }
}

$(document).ready(function() {
   
   Game = new SimonSays(300, 400);
   Game.draw_square(0);
   Game.draw_square(1);
   Game.draw_square(2);
   Game.draw_square(3);
   var test_arr = [3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0];
   Game.game();
   //Game.make_combination(test_arr.slice(), true);
   //Game.canvas.addEventListener("click", Game.get_mouse_combo.bind(Game, test_arr));
   //a = Game.make_combinations(a);
});