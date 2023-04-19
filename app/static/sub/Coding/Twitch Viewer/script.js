var channels = ["freecodecamp", "summit1g", "cappingtv", "n0thing", "s1mple", "tarik", "freakazoid"];

function error() {
  console.log("ERROR");
}

function get_stream_status(stream) {
  if (stream["stream"] !== null) {
    var new_text = "<a href='https://twitch.tv/" + stream["stream"]["channel"]["display_name"];
    new_text    += "'>(" + stream["stream"]["game"] + ") " + stream["stream"]["channel"]["status"] + "</a>";
    $("#" + stream["stream"]["channel"]["display_name"]).html(new_text);
  }
}

function update_channel(channel_json) {
  var new_html = "<div class='channel'><a href='https://twitch.tv/" + channel_json["display_name"];
  new_html    += "'><h2>" + channel_json["display_name"] + "</h2></a>";
  new_html    += "<p id='" + channel_json["display_name"] + "'>offline</p></div>";
  $.get({
    dataType: "jsonp",
    url: "https://wind-bow.gomix.me/twitch-api/streams/" + channel_json["display_name"],
    success: get_stream_status,
    error: error
  });  
  $("body").append(new_html);
}

function update_channels(channels) {
  for (var i = 0; i < channels.length; i++) {
    $.get({
      dataType: "jsonp",
      url: "https://wind-bow.gomix.me/twitch-api/channels/" + channels[i],
      success: update_channel,
      error: error
    });
  }
}

$(document).ready(function() {
  update_channels(channels);
});