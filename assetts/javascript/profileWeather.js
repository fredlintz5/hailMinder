

window.onload = currentweather();



function currentweather() {

var appID = "fa6eb231f9fb2288695c7834db698e4c";

var query_param = $(this).prev().val();

if ($(this).prev().attr("placeholder") == "City") {
  var weather = "http://api.openweathermap.org/data/2.5/weather?q=" + query_param + "&units=imperial&APPID=" + appID;

} else if ($(this).prev().attr("placeholder") == "Zip Code") {
  var weather = "http://api.openweathermap.org/data/2.5/weather?zip=" + query_param + "&units=imperial&APPID=" + appID;
}   


  $.getJSON(weather,function(json){
    $("#city").html(json.name);
    $("#description_weather").html(json.weather[0].description);
    $("#weather_image").attr("src", "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
    $("#temperature").html(json.main.temp);
  });
};


function getlocation () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
    console.log(showPosition);
  } 
}









