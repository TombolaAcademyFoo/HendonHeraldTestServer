var express = require('express');
var router = express.Router();

// simple logger for this router's requests
// all requests to this router will first hit this middleware
router.use(function(req, res, next) {
    //Log the request
    console.log('request: %s %s %s', req.method, req.url, req.path);

    //log the response.
    var resEnd = res.end
    res.end = function(chunk, encoding) {
        //Send the chunk
        res.end = resEnd;
        res.end(chunk, encoding);
        console.log("Response: %s %s", res.statusCode, res.get('Content-Type'));
    };
    next();
});

/*This is the non-AJAX version*/
router.get('/submit', function (req,res){
    var eMail = req.query.email;
    var message = req.query.message;
    var responseContent = "";
    var errors = getErrors(eMail, message)
    if(errors.length === 0) {
        responseContent = successHtml(eMail);
    }
    else {
        res.status(422); //Unprocessable entity - the required data has not been added so cant process :/
        responseContent = failedHtml(errors);
    }

    res.contentType = "text/html";
    res.setHeader('Last-Modified', (new Date()).toUTCString());
    res.send(responseContent);
});



/* This is the AJAX version. */
router.post('/api/:submit', function(req, res) {

    var eMail = req.query.email;
    var message = req.query.message;

    var response = {
        success: true
    };


    var response;
    var errors = getErrors(eMail, message)
    if(errors.length === 0) {
        response = {
            message: "Your message has been received successfully"
        };
    }
    else {
        res.status(422); //Unprocessable entity - the required data has not been added so cant process :/
        response = {
            message: "An error occurred",
            errors: errors
        }
    }

    res.contentType="application/json"
    res.setHeader('Last-Modified', (new Date()).toUTCString());
    res.send(response);
});


function isEmpty(str) {
    return (!str || 0 === str.length)
}

function getErrors(eMail, message) {
    var errors = [];

    if (isEmpty(eMail)) {
        errors.push("email");
    }
    if (isEmpty(message)) {
        errors.push("message");
    }
    return errors;
}

function successHtml(eMail){
    return "<!DOCTYPE html><html><head><title>Successful Submission</title></head><body><h1>Successful Submission</h1><p>The Submission from was " + eMail + " successful</p></body></html>";
}

function failedHtml(errors){

    var errorListHtml = "";
    errors.forEach(function(error){
        errorListHtml += "<li>" + error + "</li>";
    });
    return "<!DOCTYPE html><html><head><title>Failed Submission</title></head><body><h1>Failed Submission</h1><p>Failures: <ul>" + errorListHtml + "<ul></p></body></html>";
}

module.exports = router;



