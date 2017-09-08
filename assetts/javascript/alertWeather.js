
// global variables
var todayHailArray = [80111];
var dayTwoHailArray = [];


// loop through zip codes in database
function buildAffectedZipCodes() {
	for (var i = 0; i < localArray.length; i++) {
		alertWeather(localArray[i]);
	}
}


// ajax request and info grab for 16 day weather data
function alertWeather(zipCode) {
	// API KEY
	var appID = "fa6eb231f9fb2288695c7834db698e4c";
	var forecast = "https://api.openweathermap.org/data/2.5/forecast/daily?zip=" + zipCode + "&APPID=" + appID;

	$.getJSON(forecast,function(data){

		var todayHail = data.list[0].weather[0].id;
		var dayTwoHail = data.list[1].weather[0].id;

		if (todayHail !== 906) {
			todayHailArray.push(zipCode);
		} 

		if (dayTwoHail !== 906) {
			dayTwoHailArray.push(zipCode);
		} 
	})
}


function clearHailArrays() {
	todayHailArray = [];
	dayTwoHailArray = [];
	dayThreeHailArray = [];
	dayFourHailArray = [];
	dayFiveHailArray = [];
}



function alertEmail(hailArray, uid) {
	for (var i = 0; i < hailArray.length; i++) {
		if (snapshot.child('users/' + uid + '/homeZip').val() === hailArray[i]) {
		
			// var name = ('value', snapshot.child('users/' + uid + '/displayName').val());
			// var email = ('value', snapshot.child('users/' + uid + '/email').val());
			// var homeZip = ('value', snapshot.child('users/' + uid + '/homeZip').val());
			// var lastSMS = ('value', snapshot.child('users/' + uid + '/lastSMS').val());
			// var lastEmail = ('value', snapshot.child('users/' + uid + '/lastEmail').val());
			// var carrier = ('value', snapshot.child('users/' + uid + '/lastEmail').val());

	    	console.log(snapshot.child('users/' + uid).val());
	    	// runCommEngine(snapshot.child('users/' + uid).val());

	    } else if (snapshot.child('users/' + uid + '/workZip').val() === hailArray[i]) {

			// var name = ('value', snapshot.child('users/' + uid + '/displayName').val());
			// var email = ('value', snapshot.child('users/' + uid + '/email').val());			
			// var workZip = ('value', snapshot.child('users/' + uid + '/workZip').val());
			// var lastSMS = ('value', snapshot.child('users/' + uid + '/lastSMS').val());
			// var lastEmail = ('value', snapshot.child('users/' + uid + '/lastEmail').val());
			// var carrier = ('value', snapshot.child('users/' + uid + '/lastEmail').val());

	    	console.log(snapshot.child('users/' + uid).val());
	    	// runCommEngine(snapshot.child('users/' + uid).val());
	    } 
	}
}




















  
