var todayHailArray = [80111];
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
		} 

		if (dayTwoHail === 906) {
			dayTwoHailArray.push(zipCode);
		} 

		if (dayThreeHail === 906) {
			dayThreeHailArray.push(zipCode);
		} 

		if (dayFourHail === 906) {
			dayFourHailArray.push(zipCode);
		} 

		if (dayFiveHail === 906) {
			dayFiveHailArray.push(zipCode);
		} 

	})
}


// loop through zip codes in database
function buildAffectedZipCodes() {
	for (var i = 0; i < localArray.length; i++) {
		alertWeather(localArray[i]);
	}
}


function clearHailArrays() {
	todayHailArray = [];
	dayTwoHailArray = [];
	dayThreeHailArray = [];
	dayFourHailArray = [];
	dayFiveHailArray = [];
}


// this is a work in progress.....
function alertEmail(hailArray, uid) {
	for (var i = 0; i < hailArray.length; i++) {
		if (snapshot.child('users/' + uid + '/homeZip').val() === hailArray[i]) {
		
			var name = ('value', snapshot.child('users/' + uid + '/displayName').val());
			var email = ('value', snapshot.child('users/' + uid + '/email').val());
			var homeZip = ('value', snapshot.child('users/' + uid + '/homeZip').val());

			console.log(name, email, homeZip);
			// sendEmail(name, email, homeZip);

	    } else if (snapshot.child('users/' + uid + '/workZip').val() === hailArray[i]) {

			var name = ('value', snapshot.child('users/' + uid + '/displayName').val());
			var email = ('value', snapshot.child('users/' + uid + '/email').val());			
	    	var workZip = ('value', snapshot.child('users/' + uid + '/workZip').val());

	    	console.log(name, email, workZip);
	    	// sendEmail(name, email, workZip);

	    } 
	}
}


alertEmail(todayHailArray, "CDKR5qISSOOkrXAnx3qnxDS9Cro2");



















  
