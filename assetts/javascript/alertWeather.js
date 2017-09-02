var todayHailArray = [];
var dayTwoHailArray = [];
var dayThreeHailArray = [];
var dayFourHailArray = [];
var dayFiveHailArray = [];

// ajax request and info grab for current weather
function alertWeather(zipCode) {
	// API KEY
	var appID = "fa6eb231f9fb2288695c7834db698e4c";
	// query for 16 day weather data
	var forecast = "https://api.openweathermap.org/data/2.5/forecast/daily?zip=" + zipCode + "&APPID=" + appID;


	$.getJSON(forecast,function(data){

		var todayHail = data.list[0].weather[0].id;
		var dayTwoHail = data.list[1].weather[0].id;
		var dayThreeHail = data.list[2].weather[0].id;
		var dayFourHail = data.list[3].weather[0].id;
		var dayFiveHail = data.list[4].weather[0].id;

		if (todayHail === 906) {
			todayHailArray.push(zipCode);
		} else {
			console.log('no hail today');
		}

		if (dayTwoHail === 906) {
			dayTwoHailArray.push(zipCode);
		} else {
			console.log('no hail tomorrow');
		}

		if (dayThreeHail === 906) {
			dayThreeHailArray.push(zipCode);
		} else {
			console.log('no hail 3 days from now');
		}

		if (dayFourHail === 906) {
			dayFourHailArray.push(zipCode);
		} else {
			console.log('no hail 4 days from now');
		}

		if (dayFiveHail === 906) {
			dayFiveHailArray.push(zipCode);
		} else {
			console.log('no hail 5 days from now');
		}

	})
}


  
