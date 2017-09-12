//Main comm engine method

//uidObject
function runCommEngine(userObject, forecast, affectedZip) {
    console.log("Run comm engine method called");

    var userUID = userObject.uid;

    // let momentNow = moment(moment.now())._i/1000;
    let momentNow = moment().unix();

    if(userObject.lastEmail !== ""){
    // lastEmailDate = moment(userObject.lastEmail);
      lastEmailDate = userObject.lastEmail;

    } else {
        lastEmailDate = "";
    };

    if(userObject.lastSMS !== ""){
        // lastSMSDate = moment(userObject.lastSMS);
        lastSMSDate = userObject.lastSMS;
    } else {
        lastSMSDate = "";
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
        console.log("invalid forecast arguement")
    }

    if(affectedZip === 'home'){
        affectedZip = userObject.homeZip
    } else if (affectedZip === 'work'){
        affectedZip = userObject.workZip
    } else {console.log("invalid affected zip code passed into runCommEngine")}

    if (userObject.emailNotification) {
      if (momentNow - lastEmailDate > 10000 || lastEmailDate === "") {
        //sendEmailComm(userObject, emailTemplate, affectedZip);
        console.log("Sent email");
        updateUserData(userUID, 'lastEmail', momentNow);
      }
    }

    if (userObject.smsNotification) {
      if (momentNow - lastSMSDate > 10000 || lastSMSDate === "") {
          //sendSMSComm(userObject, smsTemplate, affectedZip);
          console.log("Sent sms");
          updateUserData(userUID, 'lastSMS', momentNow);
      }
    }
};


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






// //Main comm engine method

// //uidObject
// function runCommEngine(userObject, forecast, affectedZip) {
//     console.log("Run comm engine method called");

//     var userUID = userObject.uid;

//     let momentNow = moment(moment.now());
//     if(userObject.lastEmail !== ""){
//     lastEmailDate = moment(userObject.lastEmail);
//     } else {
//         lastEmailDate = userObject.lastEmail;
//     };

//     if(userObject.lastSMS !== ""){
//         lastSMSDate = moment(userObject.lastSMS);
//     } else {
//         lastSMSDate = userObject.lastSMS;
//     };

//     let emailTemplate;
//     let smsTemplate;

//     if(forecast === "today"){
//         emailTemplate = "todayemail"
//         smsTemplate = "todaysms"
//     } else if(forecast == "tomorrow"){
//         emailTemplate = "tomorrowemail"
//         smsTemplate = "tomorrowsms"
//     } else {
//         console.log("invalid forcast arguement")
//     }

//     if(affectedZip === 'home'){
//         affectedZip = userObject.homeZip
//     } else if (affectedZip === 'work'){
//         affectedZip = userObject.workZip
//     } else {console.log("invalid affected zip code passed into runCommEngine")}

//     if ((momentNow.diff(lastEmailDate) > 10000000) || (lastEmailDate === "")) {
//         //sendEmailComm(uid, emailTemplate, affectedZip);
//         console.log("Sent email");
//         updateUserData(userUID, 'lastEmail', momentNow);
//     }
//     if ((momentNow.diff(lastSMSDate) > 10000000) || (lastSMSDate === ""))  {
//         //sendSMSComm(uid, smsTemplate, affectedZip);
//         console.log("Sent sms");
//         updateUserData(userUID, 'lastSMS', momentNow);
//     }
// };


// //Send Email Comm
// function sendEmailComm(uid, emailTemplate, affectedZip) {
//     console.log("uid is" + uid);
//     emailjs.send("sendgrid", emailTemplate, { email: uid.email, name: uid.displayName, to_name: uid.displayName, from_name: "HailMinder", zip: affectedZip})
//         .then(function (response) {
//             console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
//         }, function (err) {
//             console.log("FAILED. error=", err);
//         });
// };

// //Send Text Comm
// function sendSMSComm(uid, smsTemplate, affectedZip) {
//     let smsDomain;
//     let smsEmail;
//     switch (uid.carrier) {
//         case "verizon":
//             smsDomain = "@vtext.com";
//             smsEmail = uid.phoneNumber + smsDomain;
//             break;
//         case "sprint":
//             smsDomain = "@messaging.sprintpcs.com";
//             smsEmail = uid.phoneNumber + smsDomain;
//             break;
//         case "att":
//             smsDomain = "@txt.att.net";
//             smsEmail = uid.phoneNumber + smsDomain;
//             break;
//         case "tmobile":
//             smsDomain = "@tmomail.net";
//             smsEmail = uid.phoneNumber + smsDomain;
//             break;
//     }

//     emailjs.send("sendgrid", smsTemplate, { email: smsEmail, name: uid.displayName, to_name: uid.displayName, from_name: "HailMinder", zip: affectedZip})
//         .then(function (response) {
//             console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
//         }, function (err) {
//             console.log("FAILED. error=", err);
//     });
// };

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