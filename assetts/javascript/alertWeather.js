
// API KEY
var appID = "fa6eb231f9fb2288695c7834db698e4c";
var query_param = //user zipcode;

// query for current weather data
// var weather = "http://api.openweathermap.org/data/2.5/weather?zip=" + query_param + "&APPID=" + appID;

// query for current-16 day weather data
var forecast = "http://api.openweathermap.org/data/2.5/forecast/daily?zip=" + query_param + "&APPID=" + appID;


// ajax request and info grab for current weather
function currentAlertWeather() {
	$.getJSON(forecast,function(data){

	  var todayHail = data.list[0]weather.id;
	  var dayTwoHail = ddata.list[1]weather.id;
	  var dayThreeHail = data.list[2]weather.id;
	  var dayFourHail = data.list[3]weather.id;
	  var dayFiveHail = data.list[4]weather.id;

	  // these are extra
	  // var basicDescription = data.list[i].weather.main;
	  // var longDescription = data.list[i].weather.description;
}




  
