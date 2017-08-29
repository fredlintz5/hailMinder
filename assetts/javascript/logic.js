
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
        
        console.log(user);

        if ($('#displayName').attr('value') === "") {
          console.log("display name is empty");
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

database.on("value", function(snapshot) {

  console.log(snapshot.val().'users/' + uid);

  if (snapshot.child('users/' + uid).exists()) {
    console.log('exists');

    $('#displayName').attr('value', snapshot.val().'users/' + displayName);
    $('#email').attr('value', snapshot.val().email);
    $('#phoneNumber').attr('value', snapshot.val().phoneNumber);
    $('#profilePic').attr('src', snapshot.val().profile_picture);
    $('#homeZip').attr('value', snapshot.val().homeZip);
    $('#workZip').attr('value', snapshot.val().workZip);
  }
    
})


$('#updateButton').click(function() {

  var inputDisplayName = $('#displayName').val().trim();
  var inputEmail = $('#email').val().trim();
  var inputPhoneNumber = $('#phoneNumber').val().trim();
  var inputHomeZip = $('#homeZip').val().trim();
  var inputWorkZip = $('#workZip').val().trim();

  console.log("click");

  firebase.database().ref('users/' + uid).set({
    displayName: inputDisplayName,
    email: inputEmail,
    profile_picture: photoURL,
    uid: uid,
    phoneNumber: inputPhoneNumber,
    homeZip: inputHomeZip,
    workZip: inputWorkZip

  });

  alert("Your profile has been updated!");


});











   