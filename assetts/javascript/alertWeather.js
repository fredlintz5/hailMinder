
// API KEY
var appID = "fa6eb231f9fb2288695c7834db698e4c";
var query_param = //user zipcode;

// query for current weather data
var weather = "http://api.openweathermap.org/data/2.5/weather?zip=" + query_param + "&APPID=" + appID;

// query for 3-5 weather data
var forecast = "http://api.openweathermap.org/data/2.5/forecast/daily?zip=" + query_param + "&APPID=" + appID;


// ajax request
$.getJSON(weather,function(data){

  $("#hail").html(data.weather[0].id);

  // these are extra
  $("#main_weather").html(data.weather[0].main);
  $("#description_weather").html(data.weather[0].description);
    

  
