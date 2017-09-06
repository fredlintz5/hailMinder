//Main comm engine method

//Format: 2017-09-05T13:48:03-06:00"

function runCommEngine(forcast, firstName, lastName, email, phoneNumber, carrier, lastEmailDate, lastTextDate) {
    let momentNow = moment(moment.now());
    lastEmailDate = moment(lastEmailDate);
    lastTextDate = moment(lastTextDate);

    console.log(momentNow.diff(lastEmailDate));

    if (momentNow.diff(lastEmailDate) > 10000000) {
        sendEmailComm(template, email, firstName, lastName);
        //add method to update lastEmailDate with momentNow
    }
    if (momentNow.diff(lastEmailDate) > 10000000) {
        sendTextComm(template, phoneNumber, carrier, firstName, lastName);
        //add method to update lastEmailDate with momentNow
    }
}

//Send Email Comm
function sendEmailComm(template, email, firstName, lastName) {
    if (template !== "threefive" || template !== "immediate") {
        emailjs.send("sendgrid", template, { email: email, name: firstName + " " + lastName, to_name: firstName, from_name: "HailMinder" })
            .then(function (response) {
                console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
            }, function (err) {
                console.log("FAILED. error=", err);
            });
    } else {
        console.log("Incorrect mail template given, email will not be sent!");
    }
};

//Send Text Comm
function sendTextComm(template, phoneNumber, carrier, firstName, lastName) {
    let smsDomain;
    let smsEmail;
    switch (carrier) {
        case "verizon":
            smsDomain = "@vtext.com";
            smsEmail = phoneNumber + smsDomain;
            break;
        case "sprint":
            smsDomain = "@messaging.sprintpcs.com";
            smsEmail = phoneNumber + smsDomain;
            break;
        case "att":
            smsDomain = "@txt.att.net";
            smsEmail = phoneNumber + smsDomain;
            break;
        case "tmobile":
            smsDomain = "@tmomail.net";
            smsEmail = phoneNumber + smsDomain;
            break;
    }
    if (template !== "threefive-text" || template !== "immediate-text") {
        emailjs.send("sendgrid", template, { email: smsEmail, name: firstName + " " + lastName, to_name: firstName, from_name: "HailMinder" })
            .then(function (response) {
                console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
            }, function (err) {
                console.log("FAILED. error=", err);
            });
    } else {
        console.log("Incorrect mail template given, sms will not be sent!");
    }
};
