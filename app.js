var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var bot = require('./app/controller/webservice/botip');
var logger = require('./app/lib/loggerconfig');
var log4js = require('log4js');



var app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

var port = '9003';
app.set('port', port);

var server = http.createServer(app);
server.listen(port);

app.use('/ws/login', require('./app/controller/webservice/login'));
app.use('/ws/botmgt', require('./app/controller/webservice/bot_mgt'));


app.use('*',function(req,res){
   res.send('404');
});

module.exports = app;