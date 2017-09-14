//Main comm engine method

//uidObject
function runCommEngine(userObject, forecast, affectedZip) {
    console.log("Run comm engine method called");

    var userUID = userObject.uid;

    let momentNow = moment().unix();

    if(userObject.lastEmail !== ""){
      lastEmailDate = userObject.lastEmail;

    } else {
        lastEmailDate = "";
    };

    if(userObject.lastSMS !== ""){
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
      if (momentNow - lastEmailDate > 298 || lastEmailDate === "") {
        // sendEmailComm(userObject, emailTemplate, affectedZip);
        console.log("Sent email");
        updateUserData(userUID, 'lastEmail', momentNow);
      }
    }

    if (userObject.smsNotification) {
      if (momentNow - lastSMSDate > 298 || lastSMSDate === "") {
        // sendSMSComm(userObject, smsTemplate, affectedZip);
        console.log("Sent sms");
        updateUserData(userUID, 'lastSMS', momentNow);
      }
    }
};


//Send Email Comm
function sendEmailComm(uid, emailTemplate, affectedZip) {
    console.log("uid is", uid);
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
        case "Verizon":
            smsDomain = "@vtext.com";
            smsEmail = uid.phoneNumber + smsDomain;
            break;
        case "Sprint":
            smsDomain = "@messaging.sprintpcs.com";
            smsEmail = uid.phoneNumber + smsDomain;
            break;
        case "AT&T":
            smsDomain = "@txt.att.net";
            smsEmail = uid.phoneNumber + smsDomain;
            break;
        case "t-mobile":
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

let chris = {}
chris.displayName = "Christopher Atkinson";
chris.email = "cjatkinson19@gmail.com";
chris.phoneNumber = 3033453612;
chris.emailNotification = true;
chris.homeZip = 80223;
chris.smsNotification = true;
chris.workZip = 80401;
chris.carrier = "verizon";
chris.lastEmail = "";
chris.lastSMS = "";

*/