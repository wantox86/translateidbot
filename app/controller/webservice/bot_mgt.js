var express = require('express');
var app = express.Router();
var config = require('../../config/config').config;
var ownStatus = require('../../config/status').consts;
var login = require('../../model/login');
var loginModel = new login();
var jwt = require('jsonwebtoken');
var helper = require('../../CommonHelper');
var myBot = require('../../model/bot');
var botModel = new myBot();
var botlib = require('../../lib/botlib');

app.post('/', function (req, res)
{
    helper.printLogConsole(req);
    MessageTypeBody = req.body.message_type;
    var replyJSOn = 
    {
        MessageType: req.body.message_type,
        trx: ownStatus.status_6_general_error
    };
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    jwt.verify(token, config.key_token, function (err, decoded)
    {
        var jsonDataParam =
        {
            chatid: '-1'
        };
        botModel.find_all_user_bot(jsonDataParam, function(status,jsonResult)
        {
            var bot = botlib.getBot();
            var lengthResult = jsonResult.length;
            if(lengthResult > 0)
            {
                for(var i = 0;i < lengthResult; i++)
                {
                    var reply = "Hi " + jsonResult[i].first_name + "\n"
                        + req.body.message_content;
                    var reply_to_message = {parse_mode: "HTML"};
                    bot.sendMessage(jsonResult[i].chat_id, reply, reply_to_message);
                }
            };
        });
    });
});
module.exports = app;