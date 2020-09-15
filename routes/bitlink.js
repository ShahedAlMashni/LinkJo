var express = require('express');
var router = express.Router();
var middleware = require('../middleware/middle');
var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();



router.get('/', middleware.isLoggedIn,function (req,res) {
    let params = {
        TableName: "vouchers"
    }
    docClient.scan(params, function(err, data) {
        if (err) {
            res.render('/');
        }else{
            params = {
                TableName: "coins",
                Key:{
                    "username": res.locals.user
                }
            }
            docClient.get(params,function (err,amount) {
                if(err){
                    res.redirect('/');
                }else {
                    res.render('bitlink', {vouchers: data.Items, amount: amount.Item.coins});
                }
            });
        }
    });
});



router.post('/vouchers/redeem/:price',middleware.isLoggedIn, function (req,res) {
    let params = {
        TableName:"coins",
        Key:{
            "username": res.locals.user
        },
        UpdateExpression: "set coins = coins - :val",
        ExpressionAttributeValues:{
            ":val": parseInt(req.params.price,10)
        },
        ReturnValues:"UPDATED_NEW"
    };
    docClient.update(params,function (err,data) {
        if(err){
            res.redirect('/');
        }else {
            req.flash("success","Voucher has been redeemed!");
            res.redirect('/bitlink');
        }
    });
});



module.exports = router;