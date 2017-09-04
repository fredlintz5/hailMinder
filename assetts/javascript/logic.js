
// Initialize Firebase
var config = {
  apiKey: "AIzaSyClRKGEi4sOAzyk6pOn8oxIevbY3zOoy7I",
  authDomain: "hailminder-d07a5.firebaseapp.com",
  databaseURL: "https://hailminder-d07a5.firebaseio.com",
  projectId: "hailminder-d07a5",
  storageBucket: "hailminder-d07a5.appspot.com",
  messagingSenderId: "150987850599"
};
firebase.initializeApp(config);

// global variables
var database = firebase.database().ref();
var localArray = [];

var displayName;
var email;
var photoURL;
var uid;
var phoneNumber;


window.addEventListener('load', function() {
  initApp()
});


initApp = function() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      displayName = user.displayName;
      email = user.email;
      photoURL = user.photoURL;
      uid = user.uid;
      phoneNumber = user.phoneNumber;

      user.getIdToken().then(function(accessToken) {

        if ($('#displayName').attr('value') === "") {
          $('#displayName').attr('value', displayName);
        }

        if ($('#email').attr('value') === "") {
          $('#email').attr('value', email);
        }

        if ($('#phoneNumber').attr('value') === "") {
          $('#phoneNumber').attr('value', phoneNumber);
        }

        if ($('#profilePic').attr('src') === "assetts/images/avatar-placeholder.png") {
          $('#profilePic').attr('src', photoURL);
        }

      })

    } else {
      // User is signed out
    }

  }, function(error) {
    console.log(error);
  });
};


function signOut() {
  firebase.auth().signOut().then(function() {
    window.location.assign("https://fredlintz5.github.io/hailMinder/");
  }).catch(function(error) {
    console.log(error);
  });
}


// set values based off of changes to database
database.on("value", function(snapshot) {
  // set localArray equal to database if it exists already 
  if (snapshot.child('userZips').exists()) {
    localArray = snapshot.child('userZips/zipCodes').val();

  } else {
    localArray = [];
  }

  // set profile input fields equal to database values if they exist
  if (snapshot.child('users/' + uid).exists()) {

    // console.log(snapshot.val());
    // console.log(snapshot.child('users').val());
    // console.log(snapshot.child('users/' + uid + '/displayName').val());

    $('#displayName').attr('value', snapshot.child('users/' + uid + '/displayName').val());
    $('#email').attr('value', snapshot.child('users/' + uid + '/email').val());
    $('#phoneNumber').attr('value', snapshot.child('users/' + uid + '/phoneNumber').val());
    $('#profilePic').attr('src', snapshot.child('users/' + uid + '/profile_picture').val());
    $('#homeZip').attr('value', snapshot.child('users/' + uid + '/homeZip').val());
    $('#workZip').attr('value', snapshot.child('users/' + uid + '/workZip').val());

    // toggle email/sms preferences based off of database values
    if (snapshot.child('users/' + uid + '/emailNotification').val()) {
      $('#emailToggle').attr('checked');
    } else {
      $('#emailToggle').removeAttr('checked');
    }

    if (snapshot.child('users/' + uid + '/smsNotification').val()) {
      $('#notificationToggle').attr('checked');
    } else {
      $('#notificationToggle').removeAttr('checked');
    }
  }
})


// Button to update Profile Information
$('#updateButton').click(function() {
  event.preventDefault();

  var inputDisplayName = $('#displayName').val().trim();
  var inputEmail = $('#email').val().trim();
  var inputPhoneNumber = $('#phoneNumber').val().trim();
  var inputHomeZip = $('#homeZip').val().trim();
  var inputWorkZip = $('#workZip').val().trim();
  var emailCheck = $('#emailToggle').is(":checked");
  var notificationCheck = $('#notificationToggle').is(":checked");


  if (inputHomeZip === "" || inputHomeZip.length != 5) {
    $('#homeZip').css('border-color', '#D9534F');
    $('#homeZip').val('');
    $('#homeZip').attr('placeholder', 'Please enter a valid 5 digit zip code');
  } 

    if (inputWorkZip === "" || inputWorkZip.length != 5) {
      $('#workZip').css('border-color', '#D9534F');
      $('#workZip').val('');
      $('#workZip').attr('placeholder', 'Please enter a valid 5-digit zip code');
    }

  else if (inputHomeZip !== "" && inputHomeZip.length === 5 && inputWorkZip !== "" && inputWorkZip.length === 5) {

    $('#myModal').modal('toggle');

    firebase.database().ref('users/' + uid).set({
      displayName: inputDisplayName,
      email: inputEmail,
      profile_picture: photoURL,
      uid: uid,
      phoneNumber: inputPhoneNumber,
      homeZip: inputHomeZip,
      workZip: inputWorkZip,
      emailNotification: emailCheck,
      smsNotification: notificationCheck
    });

    if (localArray.indexOf(inputHomeZip) < 0 ) {
      localArray.push(inputHomeZip);
    }

    if (localArray.indexOf(inputWorkZip) < 0 ) {
      localArray.push(inputWorkZip);
    }

    firebase.database().ref('userZips').set({
      zipCodes:localArray,
    })

    $('#homeZip').css('border-color', '#ccc');
    $('#workZip').css('border-color', '#ccc');
  }


});

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



















  










