function Checkers() {
  var _this = this,
      div_board = $("#checker-board"),
      board_arr = make_board_arr(),
      last_touch = false,
      turn_color = "red-piece";
  this.start = function() {
    _this.draw_board(add_listener=true);
    $(document).on("click", function(event){
      last_touch = false;
    });
  }
  function click_move(event) {
    console.log(9);
    console.log(last_touch);
    console.log(9);
    event.stopPropagation();
    var classes = $(event.currentTarget).attr("class").split(" ");
    var square_position = $(event.currentTarget).attr("id").slice(13).split("-").map(Number);
    var square = board_arr[square_position[0]][square_position[1]];
    if (last_touch === false) {
      if (square["type"] === "clear" || square["type"].split("-")[0] !== turn_color.split("-")[0]) {
        console.log("Not your turn.")
        return false;
      }
      else {
        last_touch = square;
        return true;
      }
    }
    else {
      if (square["type"] === "clear" && square["under_color"] === "black-square") {
        console.log("else-if");
        let diff = [square["position"][0] - last_touch["position"][0], square["position"][1] - last_touch["position"][1]];
        if (Math.abs(diff[0]) === Math.abs(diff[1]) && Math.abs(diff[0]) <= 2 && Math.abs(diff[0]) >= 1) {
          let ret_vals = [];
          if (diff[0] > 0) ret_vals.push("DOWN");
          else ret_vals.push("UP");
          if (diff[1] > 0) ret_vals.push("RIGHT");
          else ret_vals.push("LEFT");
          var new_last_touch_position = last_touch["position"].map(Number);
          _this.move_piece(new_last_touch_position , ret_vals, draw_after=true);
          last_touch = false;
        }
      }
      else {
        last_touch = false;
        console.log("Why is it here");
        console.log(last_touch);
      }
    }
  }
  function make_board_arr() {
    var colors = ["red-square", "black-square"];
    var arr = [];
    var type = "black-piece";
    for (let i = 0; i < 8; i++) {
      arr.push([]);
      if (i < 3) type = "black-piece";
      else if (i > 4) type = "red-piece";
      else type = "clear";
      for (let j = 0; j < 8; j++) {
        if ((j + i) % 2 == 0) arr[i].push({"under_color": colors[(i + j) % 2], "type": "clear", "position": [i, j]})
        else arr[i].push({"under_color": colors[(i + j) % 2], "type": type, "position": [i, j]})
      }
    }
    return arr;
  }
  
  this.move_piece = function(piece_position, direction, draw_after=false) {
    var dict_dir = {"UP": -1, "DOWN": 1, "LEFT": -1, "RIGHT": 1};
    var direction = [dict_dir[direction[0]], dict_dir[direction[1]]];
    var piece = board_arr[piece_position[0]][piece_position[1]];
    var new_position = board_arr[piece_position[0] + direction[0]][piece_position[1] + direction[1]];
    var piece_color = piece["type"].split("-")[0];
    
    if (new_position === undefined || (piece["type"] === "black-piece" && direction[0] === -1) || (piece["type"] === "red-piece" && direction[0] === 1) || piece["type"] === "clear") {
      last_touch = false;
      return false; 
    }
    
    if (new_position["type"] === "clear") 
    {
      if ((piece_position[0] + direction[0]) === 0 || (piece_position[0] + direction[0]) === 7) new_position["type"] = piece_color + "-" + "king";
      else new_position["type"] = piece["type"];
      
      piece["type"] = "clear";
      _this.draw_board(add_listener=true);
      
      if (turn_color === "red-piece") turn_color = "black-piece";
      else turn_color = "red-piece";
      
      return true;
    } 
    else 
    {
      var landing_position = board_arr[piece_position[0] + (direction[0] * 2)][piece_position[1] + (direction[1] * 2)];
      
      if (landing_position === undefined) {
        last_touch = false;
        return false;
      }
      
      if (new_position["type"].split("-")[0] !== piece_color && landing_position["type"] === "clear") 
      {
        if ((piece_position[0] + (direction[0] * 2)) === 0 || (piece_position[1] + (direction[1] * 2)) === 7) 
          landing_position["type"] = piece_color + "-" + "king";
        else landing_position["type"] = piece["type"];
        
        new_position["type"] = "clear";
        piece["type"] = "clear";
        _this.draw_board(add_listener=true);
        
        if (turn_color === "red-piece") turn_color = "black-piece";
        else turn_color = "red-piece";
        
        return true;
      }
      else {
        console.log(1111111111111111111);
        last_touch = false;
        return false;
      }
    }
  }
  this.draw_board = function(add_listener=false) {
    div_board.empty();
    for (let i = 0; i < board_arr.length; i++) {
      div_board.append("<div id='checkerRow" + i + "'></div>")
      for (let j = 0; j < board_arr[i].length; j++) {
        $("#checkerRow" + i).append("<div id='" + "checkerSquare" + i + "-" + j + "'>&nbsp;</div>");
        $("#checkerSquare" + i + "-" + j).addClass("square " + board_arr[i][j]["under_color"] + " " + board_arr[i][j]["type"]);
        
        if (board_arr[i][j]["type"] === "black-piece")
          $("#checkerSquare" + i + "-" + j).html("<img class='checker_image' src='https://res.cloudinary.com/maceurt/image/upload/v1530670315/Checker_black_d9zckp.png'>");
        else if (board_arr[i][j]["type"] === "red-piece")
          $("#checkerSquare" + i + "-" + j).html("<img class='checker_image' src='https://res.cloudinary.com/maceurt/image/upload/v1530670315/Checker_red_stjett.png'>");
        else if (board_arr[i][j]["type"] === "black-king")
          $("#checkerSquare" + i + "-" + j).html("<img class='checker_image' src='https://res.cloudinary.com/maceurt/image/upload/v1534641848/Checker_king_black_kgeh6n.png'>");
        else if (board_arr[i][j]["type"] === "red-king")
          $("#checkerSquare" + i + "-" + j).html("<img class='checker_image' src='https://res.cloudinary.com/maceurt/image/upload/v1534641861/Checker_king_red_kyrpkz.png'>");
        else 
          $("#checkerSquare" + i + "-" + j).html("&nbsp;");
        
      }
    }
    if (add_listener) {
      $(".square").on("click", click_move);
    }
  }
}                  

$(document).ready(function() {
  var game = new Checkers();
  game.start();
});