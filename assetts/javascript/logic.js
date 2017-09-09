
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
var todayHailArray = [];
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

  console.log(snapshot.child('users').val());
  console.log(snapshot.child('userUIDs/UIDs').val());
  console.log(snapshot.child('userZips/zipCodes').val());

  // set local Zip Array equal to database if it exists already 
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
      $('#att').prop('selected', true);

    } else if (snapshot.child('users/' + uid + '/carrier').val() === "sprint") {
      $('#sprint').prop('selected', true);

    } else if (snapshot.child('users/' + uid + '/carrier').val() === "tmobile") {
      $('#tmobile').prop('selected', true);

    } else if (snapshot.child('users/' + uid + '/carrier').val() === "verizon") {
      $('#verizon').prop('selected', true);
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


  // every 30 seconds query affected zip codes
  setInterval(usersToAlert, 1000*30);


  // put all thr functions together to Alert the correct User
  function usersToAlert() {
    console.log('here we go...');

    buildAffectedZipCodes();

    console.log(todayHailArray);
    console.log(dayTwoHailArray);

    for (var i = 0; i < localUIDs.length; i++) {
      alertEmail(todayHailArray, localUIDs[i], 'today');
    }

    for (var j = 0; j < localUIDs.length; j++) {
      alertEmail(dayTwoHailArray, localUIDs[j], 'tomorrow');
    }

    clearHailArrays();
  };


  // loop through zip codes in database
  function buildAffectedZipCodes() {
    console.log('building affected zipcodes...');
    for (var i = 0; i < localZipArray.length; i++) {
      alertWeather(localZipArray[i]);
    }
  }


  // ajax request for 16 day weather data and affected Zipcode push
  function alertWeather(zipCode) {
    console.log('getting weather api data...');
    // API KEY
    var appID = "fa6eb231f9fb2288695c7834db698e4c";
    var forecast = "https://api.openweathermap.org/data/2.5/forecast/daily?zip=" + zipCode + "&APPID=" + appID;

    $.ajax({
      url: forecast,
      type: 'GET', 
    })
    .done(function(data) {
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


  // alert users based off of affected arrays
  function alertEmail(hailArray, UID, day) {
    console.log('checking for users to alert');

    var userObject = snapshot.child('users/' + UID).val();
    var homeZip = snapshot.child('users/' + UID + '/homeZip').val();
    var workZip = snapshot.child('users/' + UID + '/workZip').val();
    var user = snapshot.child('users/' + UID + '/displayName').val();

    for (var i = 0; i < hailArray.length; i++) {
      if (homeZip === hailArray[i]) {

        console.log('Notify ' + user + ' of Hail Storms at his Home Zip for ' + day);
        runCommEngine(userObject, day, 'home');
      } 

      if (workZip === hailArray[i]) {

        console.log('Notify ' + user + ' of Hail Storms at his Work Zip for ' + day);
        runCommEngine(userObject, day, 'work');
      } 
    }
  }

  function clearHailArrays() {
    todayHailArray = [];
    dayTwoHailArray = [];
  }

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
})


$('input:checkbox').change(
  function(){
    if ($("#notificationToggle").is(':checked')) {
      $("#phoneNumberEntry").show();
      $("#carrierDropdown").show();
    }
    else if ($("#notificationToggle").not(':checked')){
      $("#phoneNumberEntry").hide();
      $("#carrierDropdown").hide();
    }
});


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
    //validation for email 
  if (inputEmail === "") {
    $('#email').css('border-color', '#D9534F');
    $('#email').val('');
    $("#email").attr('placeholder', 'Please enter a valid email address');
  }

  else if (inputHomeZip !== "" && inputHomeZip.length === 5 && inputWorkZip !== "" && inputWorkZip.length === 5 && inputEmail !== "") {

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




// this function called from within the deleteModal in html
function removeAccount(){
   var user = firebase.auth().currentUser;
   user.delete().then(function() {
    database.child('users/' + uid).remove();
    window.location.assign("https://fredlintz5.github.io/hailMinder/");

    }).catch(function(error) {
    console.log(error);
});
}


//  open modal which gives user a prompt to confirm delete account
$('#deleteModal').click(function(event) {
      $('#confirmModal').modal('toggle');
});













