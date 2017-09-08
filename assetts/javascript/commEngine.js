//Main comm engine method

//userObject
function runCommEngine(user, forecast) {
    let momentNow = moment(moment.now());
    lastEmailDate = moment(lastEmailDate);
    lastTextDate = moment(lastTextDate);
    let emailTemplate;
    let smsTemplate;

    if(forecast === "today"){
        emailTemplate = "todayEmail"
        smsTemplate = "todaySMS"
    } else {
        emailTemplate = "tomorrowEmail"
        smsTemplate = "tomorrowSMS"
    }

    if ((momentNow.diff(user.lastEmailDate) > 10000000) || (lastEmailDate === "")) {
        sendEmailComm(user, emailTemplate);
        //add method to update lastEmailDate with momentNow
    }
    if ((momentNow.diff(user.lastSMSDate) > 10000000) || (lastSMSDate === ""))  {
        sendSMSComm(user, smsTemplate);
        //add method to update lastEmailDate with momentNow
    }
}

//Send Email Comm
function sendEmailComm(user, emailTemplate) {
    console.log("user is" + user);
    emailjs.send("sendgrid", emailTemplate, { email: user.email, name: user.displayName, to_name: user.displayName, from_name: "HailMinder" })
        .then(function (response) {
            console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
        }, function (err) {
            console.log("FAILED. error=", err);
        });
};

//Send Text Comm
function sendSMSComm(user, smsTemplate) {
    let smsDomain;
    let smsEmail;
    switch (user.carrier) {
        case "verizon":
            smsDomain = "@vtext.com";
            smsEmail = user.phoneNumber + smsDomain;
            break;
        case "sprint":
            smsDomain = "@messaging.sprintpcs.com";
            smsEmail = user.phoneNumber + smsDomain;
            break;
        case "att":
            smsDomain = "@txt.att.net";
            smsEmail = user.phoneNumber + smsDomain;
            break;
        case "tmobile":
            smsDomain = "@tmomail.net";
            smsEmail = user.phoneNumber + smsDomain;
            break;
    }

    emailjs.send("sendgrid", smsTemplate, { email: smsEmail, name: user.displayName, to_name: user.displayName, from_name: "HailMinder" })
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
jared.emailNotification = true;
jared.homeZip = 80221;
jared.smsNotification = true;
jared.workZip = 80223;
jared.carrier = "verizon";
jared.lastEmailDate = "";
jared.lastEmailDate = "";

*/