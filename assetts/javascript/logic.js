
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
    

window.addEventListener('load', function() {
  initApp()
});

var displayName;
var email;
var photoURL;
var uid;
var phoneNumber;


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


var database = firebase.database().ref();

var localArray = [];

// This callback keeps the page updated when a value changes in firebase.
database.on("value", function(snapshot) {
  
  if (snapshot.child('userZips').exists()) {
    localArray = snapshot.child('userZips/zipCodes').val();
    console.log(localArray);

  } else {
    localArray = [];
  }
})

database.on("value", function(snapshot) {

  // console.log(snapshot.val());
  // console.log(snapshot.child('users').val());
  // console.log(snapshot.child('users/' + uid + '/displayName').val());

  if (snapshot.child('users/' + uid).exists()) {

    $('#displayName').attr('value', snapshot.child('users/' + uid + '/displayName').val());
    $('#email').attr('value', snapshot.child('users/' + uid + '/email').val());
    $('#phoneNumber').attr('value', snapshot.child('users/' + uid + '/phoneNumber').val());
    $('#profilePic').attr('src', snapshot.child('users/' + uid + '/profile_picture').val());
    $('#homeZip').attr('value', snapshot.child('users/' + uid + '/homeZip').val());
    $('#workZip').attr('value', snapshot.child('users/' + uid + '/workZip').val());

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
    //function showing current weather info on login page
       // function codeAddress() {
       //      alert('ok');
       //  }
       //  window.onload = codeAddress;

       function currentweather() {

       var appID = "fa6eb231f9fb2288695c7834db698e4c";

        window.onload = currentweather;

        var query_param = $(this).prev().val();

        if ($(this).prev().attr("placeholder") == "City") {
            var weather = "http://api.openweathermap.org/data/2.5/weather?q=" + query_param + "&units=imperial&APPID=" + appID;
        } else if ($(this).prev().attr("placeholder") == "Zip Code") {
            var weather = "http://api.openweathermap.org/data/2.5/weather?zip=" + query_param + "&units=imperial&APPID=" + appID;
        }   //"http://api.openweathermap.org/data/2.5/weather?q=Bujumbura,Burundi&units=imperial&appid=" + APIKey;

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
    };


$('#updateButton').click(function() {

  var inputDisplayName = $('#displayName').val().trim();
  var inputEmail = $('#email').val().trim();
  var inputPhoneNumber = $('#phoneNumber').val().trim();
  var inputHomeZip = $('#homeZip').val().trim();
  var inputWorkZip = $('#workZip').val().trim();
  var emailCheck = $('#emailToggle').is(":checked");
  var notificationCheck = $('#notificationToggle').is(":checked");

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

  var filterArray = localArray.filter(function(){

    
  });

  localArray.push(inputHomeZip);
  localArray.push(inputWorkZip);
  console.log(localArray);


  firebase.database().ref('userZips').set({
    zipCodes:localArray,
  })



  // replace this with a 'modal'...
  alert("Your profile has been updated!");

});











   