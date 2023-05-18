function show_entries(data) {
  console.log(data);
  var search_results = data["query"]["search"];
  $(".entry").remove();
  for (var i = 0; i < search_results.length; i++) {
    console.log(search_results[i]["pageid"]);
    var new_snippet = "<a href='https://en.wikipedia.org/?curid=" + search_results[i]["pageid"] +
                      "'class='entry'>";
    console.log(new_snippet);
    new_snippet += "<h2>" + search_results[i]["title"] + "</h2>";
    new_snippet += "<p class='description'>" + search_results[i]["snippet"] + "</p>";
    new_snippet += "</a>";
    $("body").append(new_snippet);
  }
}

$(document).ready(function() {
  var key_values = "";
  $("input").keypress(function(event){
    var key_value = $("input").val();
    if (event.which === 13 && key_value.length >= 1) {
      $.ajax({
        dataType: "jsonp",
        url: "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=" + key_value,
        success: show_entries
      });
    }
  });
});