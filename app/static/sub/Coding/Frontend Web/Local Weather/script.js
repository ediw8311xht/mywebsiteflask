var symbolTable = {"imperial": "F", "metric": "C"};
var unit = "imperial";

function drawSprite(day, spriteSheet, canv, cont){
  var Dict = {"sunny": 0, "cloudy": 480, "partly-cloudy": 960, "rainy": 1440, "night": 1920};
  var size = Math.min(1000, Math.min($(window).height(), $(window).width()));
  cont.drawImage(spriteSheet, Dict[day], 0, 480, 480, ($(window).width() - (size / 2)) / 2, 0, size / 2, size / 2);
}

function getWeather(lat, lon) {
  console.log("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=f6b84664342dbf36660b486545269e5a");
  $.ajax( {
    url: "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=f6b84664342dbf36660b486545269e5a" + "&units=" + unit,
    dataType: "jsonp",
    type: "get",
    success: function(data) {
      var temp = data.main.temp;
      if (data["weather"][0]["main"] == "Rain") {
        setPicture("rainy");
      }
      else if (data.clouds) {
        if (data.clouds.all > 50)
          setPicture("cloudy");
        else if (data.clouds.all > 20)
          setPicture("partly-cloudy");
        else
          setPicture("sunny")
      }
      else {
        setPicture("sunny");
      }
      $("#location").html(temp + " °" + symbolTable[unit]);
    },
    failure: function() {
      console.log("failure in getWeather");
    }
  } );
}

function setPicture(type) {
  var canvas = document.getElementById("canvas");
  canvas.width = $(window).width();
  canvas.height = $(window).height() / 2;
  var ctx = canvas.getContext("2d");
  var weatherSheet = new Image();
  weatherSheet.alt = "4444";
  weatherSheet.height = "480";
  weatherSheet.width = "1920";
  weatherSheet.onload = function() 
  { 
    drawSprite(type, weatherSheet, canvas, ctx); 
  };
  weatherSheet.src ="https://res.cloudinary.com/maceurt/image/upload/v1506467153/Weather_Spritesheet_rpxyyb.png";
}

function geoSuccess(pos) {
  pos = pos.coords;
  getWeather(pos["latitude"], pos["longitude"]);
}

function geoFailure(pos) {
  console.log("failure in geoLocation")
  document.getElementById("location").html("error");
}

var options =  {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function main() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(geoSuccess, geoFailure, options);
  }
  else {
    $("#location").html("Browser does not support geolcation.");
  }
}

$( document ).ready(function() {
  main();
  $("#slider").click(function() {
    if (unit == "imperial") {
      unit = "metric";
    }
    else {
      unit = "imperial";
    }
    main();
  });
});