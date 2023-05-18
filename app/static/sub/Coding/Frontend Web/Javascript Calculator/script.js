function calculate(tokens) {
  var valid_tokens = "*/+-";
  var total = 0;
  for (var j = 0; j < valid_tokens.length; j++) {
    var not_in = false;
    while (not_in !== true) {
      if (tokens.length < 3) {
        return total;
      }
      for (var i = 0; i < tokens.length - 2; i++) {
        if (tokens[i + 1] === valid_tokens[j] && !isNaN(tokens[i]) && !isNaN(tokens[i + 2])) {
          tokens[i] = Number(tokens[i]);
          tokens[i + 2] = Number(tokens[i + 2]);
          if (valid_tokens[j] === "*") total = (tokens[i] * tokens[i + 2]);
          else if (valid_tokens[j] === "/") total = (tokens[i] / tokens[i + 2]);
          else if (valid_tokens[j] === "+") total = (tokens[i] + tokens[i + 2]);
          else total = (tokens[i] - tokens[i + 2]);
          tokens.splice(i + 1, 2);
          tokens[i] = total;
          break;
        }
        else if (i === tokens.length - 3) {
          not_in = true;
        }
      }
    }
  }
  return total;
}

function Calculator() {
  var _this = this,
      current_tokens = [];
  function tokenize(new_token) {
    var last_element = current_tokens[current_tokens.length - 1];
    if (!isNaN(last_element) && !isNaN(new_token)) {
      if (last_element !== "0") {
        current_tokens[current_tokens.length - 1] = last_element.concat(new_token); 
      }
    }
    else {
      current_tokens.push(new_token);
    }
  }
  this.start = function() {
    $("button").on("click", function(event) {
      var event_value = event.target.innerText;
      console.log(event_value);
      if (event_value === "=") {
        var output = calculate(current_tokens).toString();
        $("#screen").html(output);
        //current_tokens = [output];
      }
      else if (event_value === "cls") {
        current_tokens = [];
        $("#screen").html("");
      }
      else {
        tokenize(event_value);
        console.log(current_tokens);
        $("#screen").html(current_tokens.join(" "));
      }
    });
  }
}

$(document).ready(function() {
  var a = new Calculator();
  a.start();
});