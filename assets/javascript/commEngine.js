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


//Main comm engine method

//uidObject
function runCommEngine(uid, forecast, affectedZip) {
    console.log("Run comm engine method called");
    let momentNow = moment(moment.now());
    if(uid.lastEmail !== ""){
    lastEmailDate = moment(uid.lastEmail);
    } else {
        lastEmailDate = uid.lastEmail;
    };

    if(uid.lastSMS !== ""){
        lastSMSDate = moment(uid.lastSMS);
    } else {
        lastSMSDate = uid.lastSMS;
    };

    let emailTemplate;
    let smsTemplate;

    if(forecast === "today"){
        emailTemplate = "todayemail"
        smsTemplate = "todaysms"
    } else if(forecast == "tomorrow"){
        emailTemplate = "tomorrowemail"
        smsTemplate = "tomorrowsms"
    } else {
        console.log("invalid forcast arguement")
    }

    if(affectedZip === 'home'){
        affectedZip = uid.homeZip
    } else if (affectedZip === 'work'){
        affectedZip = uid.workZip
    } else {console.log("invalid affected zip code passed into runCommEngine")}

    if ((momentNow.diff(lastEmailDate) > 10000000) || (lastEmailDate === "")) {
        //sendEmailComm(uid, emailTemplate, affectedZip);
        console.log("Sent email");
        updateUserData(uid, 'lastEmail', momentNow);
    }
    if ((momentNow.diff(lastSMSDate) > 10000000) || (lastSMSDate === ""))  {
        //sendSMSComm(uid, smsTemplate, affectedZip);
        console.log("Sent sms");
        updateUserData(uid, 'smsEmail', momentNow);
    }
};


// allow Updates to userData values
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


//Send Email Comm
function sendEmailComm(uid, emailTemplate, affectedZip) {
    console.log("uid is" + uid);
    emailjs.send("sendgrid", emailTemplate, { email: uid.email, name: uid.displayName, to_name: uid.displayName, from_name: "HailMinder", zip: affectedZip})
        .then(function (response) {
            console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
        }, function (err) {
            console.log("FAILED. error=", err);
        });
};

//Send Text Comm
function sendSMSComm(uid, smsTemplate, affectedZip) {
    let smsDomain;
    let smsEmail;
    switch (uid.carrier) {
        case "verizon":
            smsDomain = "@vtext.com";
            smsEmail = uid.phoneNumber + smsDomain;
            break;
        case "sprint":
            smsDomain = "@messaging.sprintpcs.com";
            smsEmail = uid.phoneNumber + smsDomain;
            break;
        case "att":
            smsDomain = "@txt.att.net";
            smsEmail = uid.phoneNumber + smsDomain;
            break;
        case "tmobile":
            smsDomain = "@tmomail.net";
            smsEmail = uid.phoneNumber + smsDomain;
            break;
    }

    emailjs.send("sendgrid", smsTemplate, { email: smsEmail, name: uid.displayName, to_name: uid.displayName, from_name: "HailMinder", zip: affectedZip})
        .then(function (response) {
            console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
        }, function (err) {
            console.log("FAILED. error=", err);
    });
};

/*

For testing

let jared = {};

jared.displayName = "Ash Rotman";
jared.email = "cjatkinson19@gmail.com";
jared.phoneNumber = 3033453612;
jared.emailNotification = true;
jared.homeZip = 80221;
jared.smsNotification = true;
jared.workZip = 80223;
jared.carrier = "verizon";
jared.lastEmailDate = "";
jared.lastSMSDate = "";

*/