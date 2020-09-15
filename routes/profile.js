var express = require('express');
var AWS = require("aws-sdk");
var router = express.Router();
var docClient = new AWS.DynamoDB.DocumentClient();


router.get('/:username', function(req, res, next) {
    let username = req.params.username;
    let params = {
        TableName: "profile",
        Key:{
            "username": username,
        }
    };
    docClient.get(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            res.render('profile2',{ info: data.Item });
        }
    });
});



module.exports = router;