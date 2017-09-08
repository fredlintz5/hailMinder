
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

// global database variables
var database = firebase.database().ref();
var localZipArray = [];
var localUIDs = [];

// alertWeather function variables
var todayHailArray = [80111];
var dayTwoHailArray = [];

// profile variables
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


// grab a snapshot of the database for manipulation
database.on("value", function(snapshot) {
  // set local Zip Array equal to database if it exists already 
  console.log(snapshot.child('users').val());
  if (snapshot.child('userZips').exists()) {
    localZipArray = snapshot.child('userZips/zipCodes').val();

  } else {
    localZipArray = [];
  }

  // set local UID array to database if it exists already
  if (snapshot.child('userUIDs').exists()) {
    localUIDs = snapshot.child('userUIDs/UIDs').val();

  } else {
    localUIDs = [];
  }


  if (localUIDs.indexOf(uid) < 0 ) {
      localUIDs.push(uid);
    }

  firebase.database().ref('userUIDs').set({
    UIDs:localUIDs,
  })


  // set profile input fields equal to database values if they exist
  if (snapshot.child('users/' + uid).exists()) {

    $('#displayName').attr('value', snapshot.child('users/' + uid + '/displayName').val());
    $('#email').attr('value', snapshot.child('users/' + uid + '/email').val());
    $('#phoneNumber').attr('value', snapshot.child('users/' + uid + '/phoneNumber').val());
    $('#profilePic').attr('src', snapshot.child('users/' + uid + '/profile_picture').val());
    $('#homeZip').attr('value', snapshot.child('users/' + uid + '/homeZip').val());
    $('#workZip').attr('value', snapshot.child('users/' + uid + '/workZip').val());

    // set carrier choice from database to 'select' correct carrier on page
    if (snapshot.child('users/' + uid + '/carrier').val() === "att") {
      $('#att').attr('selected');

    } else if (snapshot.child('users/' + uid + '/carrier').val() === "sprint") {
      $('#sprint').attr('selected');

    } else if (snapshot.child('users/' + uid + '/carrier').val() === "tmobile") {
      $('#tmobile').attr('selected');

    } else if (snapshot.child('users/' + uid + '/carrier').val() === "verizon") {
      $('#verizon').attr('selected');
    }

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
  var carrier = $('#carrier').val();


  // validation logic for correct zipcode length and require zip code input
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
      smsNotification: notificationCheck,
      lastSMS: "",
      lastEmail: "",
      carrier: carrier
    });

    if (localZipArray.indexOf(inputHomeZip) < 0 ) {
      localZipArray.push(inputHomeZip);
    }

    if (localZipArray.indexOf(inputWorkZip) < 0 ) {
      localZipArray.push(inputWorkZip);
    }

    firebase.database().ref('userZips').set({
      zipCodes:localZipArray,
    })

    $('#homeZip').css('border-color', '#ccc');
    $('#workZip').css('border-color', '#ccc');
  }

});

function updateUserData(uid, field, value){
  let supportedFields = ['displayName', 'email', 'profile_picture', 'uid', 'phoneNumber', 'homeZip', 'workZip', 'emailNotification', 'smsNotification', 'lastSMS', 'lastEmail', 'carrier'];
  if(supportedFields.indexOf(field) !== -1){
    var updates = {};
    updates['/'+ field +'/'] = value;
    return firebase.database().ref('users/' + uid).update(updates)
  } else {
    console.log("Could not update database, invalid supported field")
  }
}


// this function called from within the deleteModal in html
function removeAccount(){
   var user = firebase.auth().currentUser;
   user.delete().then(function() {
    database.child('users/' + uid).remove();
    window.location.assign("https://fredlintz5.github.io/hailMinder/");

    }).catch(function(error) {
    console.log('farts');
});
}


//  open modal which gives user a prompt to confirm delete account
$('#deleteModal').click(function(event) {
      $('#confirmModal').modal('toggle');
});


// every 30 seconds query affected zip codes
setInterval(buildAffectedZipCodes, 1000*30);

// loop through zip codes in database
function buildAffectedZipCodes() {
  for (var i = 0; i < localZipArray.length; i++) {
    console.log(localZipArray[i]);
    alertWeather(localZipArray[i]);
  }
  console.log(todayHailArray);
  console.log(dayTwoHailArray);

  clearHailArrays();
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














