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
    lastTextDate = moment(uid.lastSMS);
    } else {
        lastSMS = uid.lastSMS;
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

    if ((momentNow.diff(uid.lastEmailDate) > 10000000) || (uid.lastEmailDate === "")) {
        sendEmailComm(uid, emailTemplate, affectedZip);
        console.log("Sent email");
        //updateuidData(uid.uid, 'lastEmail', momentNow);
    }
    if ((momentNow.diff(uid.lastSMSDate) > 10000000) || (uid.lastSMSDate === ""))  {
        sendSMSComm(uid, smsTemplate, affectedZip);
        console.log("Sent sms");
        //updateuidData(uid.uid, 'smsEmail', momentNow);
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