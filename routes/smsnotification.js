'use strict';
var http = require( 'https' );
var rp = require('request-promise');
var activityUtils = require('./activityUtils');


/*
 * POST Handler for / route of Activity (this is the edit route).
 */
exports.edit = function( req, res ) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    activityUtils.logData( req );
    res.send( 200, 'Edit' );
};

/*
 * POST Handler for /save/ route of Activity.
 */
exports.save = function( req, res ) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    activityUtils.logData( req );
    res.send( 200, 'Save' );
};

/*
 * POST Handler for /publish/ route of Activity.
 */
exports.publish = function( req, res ) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    activityUtils.logData( req );
    res.send( 200, 'Publish' );
};

/*
 * POST Handler for /validate/ route of Activity.
 */
exports.validate = function( req, res ) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    activityUtils.logData( req );
    res.send( 200, 'Validate' );
};

/*
 * POST Handler for /execute/ route of Activity.
 */

function sendSMSNotification(res, params) {
    var username = process.env.USERNAME;
    var password = process.env.PASSWORD;
    var endpoint = process.env.ENDPOINT;
    var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

    var options = {
        method: 'POST',
        uri: endpoint + "/oauth",
        form: {
            grant_type: 'client_credentials'
        },
        headers: {
            "authorization": auth
        },
        json: true
    };
    console.log("Request: " + options.uri);
    rp(options)
        .then(function (body) {
            if (body.access_token) {
                return body.access_token;
            }
            else {
                res.send(500, body);
            }
        })
        .then(function (access_token) {
            console.log("Access Token: " + access_token);
            var options = {
                method: 'POST',
                uri: endpoint + "/dev/sendingnotificationsms",
                body: params,
                json: true,
                headers: {
                    "authorization": "Bearer " + access_token
                }
            };
            console.log("Request: " + options.uri);
            return rp.post(options);
        })
        .then(function (body) {
            console.log("Body: " + body);
            if (body.reference)
                res.send(200, body);
            else
                res.send(500, body);

        })
        .catch(function (err) {
            console.error(err);
            res.send(500, {message: "Internal Server Error"});
        });
}

exports.execute = function( req, res ) {
    // Data from the req and put it in an array accessible to the main app.
    activityUtils.logData( req );


    var aArgs = req.body.inArguments;
    var params = {};
    for (var i=0; i<aArgs.length; i++) {
        for (var key in aArgs[i]) {
            params[key] = aArgs[i][key];
        }
    }

    console.log(aArgs);

    if(!params['phone'] || !params['message'])
    {
        res.send(500,{message: "Parameters are incomplete."});
    }
    sendSMSNotification(res, params);

};
