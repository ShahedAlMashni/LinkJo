var express = require('express');
var AWS = require("aws-sdk");
var middleware = require('../middleware/middle');
var router = express.Router();
var docClient = new AWS.DynamoDB.DocumentClient();


router.get('/:username',middleware.isLoggedIn, function(req, res, next) {
    let username = req.params.username;
    let params = {
        TableName: "profile",
        Key:{
            "username": username,
        }
    };
    docClient.get(params, function(err, data) {
        if (err || !Object.keys(data).length) {
            console.error("Unable to find item Error JSON:", JSON.stringify(err, null, 2));
        } else {
            res.render('profile',{ info: data.Item });
        }
    });
});



module.exports = router;