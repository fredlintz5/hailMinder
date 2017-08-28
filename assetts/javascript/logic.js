
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


initApp = function() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var uid = user.uid;
      var phoneNumber = user.phoneNumber;
      var providerData = user.providerData;

      user.getIdToken().then(function(accessToken) {
        
        console.log(user);

        firebase.database().ref('users/' + uid).set({
          displayName: displayName,
          email: email,
          profile_picture : photoURL,
          uid = uid,
          phoneNumber = phoneNumber

        });
        // $('#displayName').attr('value', displayName);
        // $('#email').attr('value', email);
        // $('#phoneNumber').attr('value', phoneNumber);
        // $('#profilePic img').attr('src', photoURL);
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

  var displayName = $('#displayName').val().trim();
  var email = $('#email').val().trim();
  var phoneNumber = $('#phoneNumber').val().trim();
  var profilePic = $('#profilePic img').val().trim();
  var homeZip = $('#homeZip').val().trim();
  var workZip = $('#workZip').val().trim();

  console.log("click");


});











   