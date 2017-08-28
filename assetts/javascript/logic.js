
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
        
        // $('#displayName').attr('value', displayName);
        // $('#email').attr('value', email);
        // $('#phoneNumber').attr('value', phoneNumber);
        // $('#profilePic').attr('src', photoURL);
        // $('#homeZip').attr('value', homeZip);
        // $('#workZip').attr('value', workZip);
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

  console.log(snapshot);
    
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
    phoneNumber: inputPhoneNumber

  });


});











   