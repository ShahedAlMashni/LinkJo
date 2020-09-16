var express = require('express');
var router = express.Router();
var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();


router.get('/', function(req, res, next) {
    res.render('login');
});

router.post('/', function (req,res) {
    let username = req.body.username;
    let password = req.body.password;
    let params = {
        TableName: "user",
        Key:{
            "username": username,
            "password": password
        }
    };
    docClient.get(params, function(err, data) {
        if (err || !Object.keys(data).length) {
            console.error("no username found", JSON.stringify(err, null, 2));
            req.flash("error","Invalid username or password");
            res.redirect('/login');
        } else {
            console.log("user name found", JSON.stringify(data, null, 2));
            req.session.user = username;
            console.log(data.Item);
            res.redirect('/profile/'+username);
        }
    });
});

module.exports = router;

