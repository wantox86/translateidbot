var express = require('express');
var app = express.Router();
var config = require('../../config/config').config;
var ownStatus = require('../../config/status').consts;
var login = require('../../model/login');
var loginModel = new login();
var jwt = require('jsonwebtoken');
var helper = require('../../CommonHelper');

app.post('/', function (req, res)
{
    helper.printLogConsole(req);
    MessageTypeBody = req.body.message_type;
    var replyJSOn = 
    {
        MessageType: req.body.message_type,
        trx: ownStatus.status_6_general_error
    };
    var query = [];
    var jsonWhere = 
    {
        userid : req.body.user_id,
        userpass : req.body.user_pass,
    }
    // console.log("WHERE : " + JSON.stringify(jsonWhere));
    loginModel.find_all(jsonWhere, function(status,jsonData)
    {
        if(jsonData.length > 0)
        {
            var token = '';
            if(jsonData[0].userpass === req.body.user_pass)
            {
                token = jwt.sign(jsonWhere, config.key_token,
                {
                    expiresIn: config.token_duration
                });
                replyJSOn.trx = ownStatus.status_0_successful;
                // replyJSOn.Data = jsonData;
                replyJSOn.Token = token;
                // console.log("Reply : " );
                // console.log(JSON.stringify(replyJSOn));
                helper.printLogReplyConsole(replyJSOn);
                res.end(JSON.stringify(replyJSOn));
            }
            else
            {
                replyJSOn.trx = ownStatus.status_8_wrong_user_pass
                // replyJSOn.Data = jsonData;
                // console.log("Reply : " );
                // console.log(JSON.stringify(replyJSOn));
                helper.printLogReplyConsole(replyJSOn);
                res.end(JSON.stringify(replyJSOn));
            }
        }
        else
        {
            replyJSOn.Response = ownStatus.status_11_cannot_find_data
            // replyJSOn.Data = jsonData;
            console.log("Reply : " );
            console.log(JSON.stringify(replyJSOn));
            res.end(JSON.stringify(replyJSOn));
        }
    });
});

module.exports = app;