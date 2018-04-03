var superagent = require('superagent');   
var logger = require('./lib/logger');


module.exports = 
{
  printLogTeleIncomming: function(msg)
  {
    this.printLogDebug("\nIncomming Telegram message <<< " 
                    + "\n -name    : " + msg.from.first_name + " " + msg.from.last_name
                    + "\n -user id : " + msg.from.username
                    + "\n -msg     : " + msg.text);
                    // callback(0,1);
    	if(typeof msg.text === 'undefined' )
	{
	  loggerDebug = logger.getLoggerDebug();
    	  loggerDebug.info('Reply : \n' + JSON.stringify(msg));
	}
  },
  printLogTeleOutgoing: function(msg, reply)
  {
    this.printLogDebug("\nOutgoing Telegram message >>>" 
                    + "\n -name    : " + msg.from.first_name + " " + msg.from.last_name
                    + "\n -user id : " + msg.from.username
                    + "\n -msg     : " + reply);
  },
  printLogError: function(str)
  {
    loggerError = logger.getLoggerError();
    loggerError.info(str);
  },  
  printLogDebug: function(str)
  {
    loggerDebug = logger.getLoggerDebug();
    loggerDebug.info(str);
  },
  printLogConsole: function(req)
  {
    loggerDebug = logger.getLoggerDebug();
    var param = req.body;
    var counter = 1;
    loggerDebug.info(req.protocol + ':');//' + req.get('host') + req.originalUrl.split('?')[0]);
    for (var key in param)
    {
      
      if (param.hasOwnProperty(key)) 
      {
        var keyPadded = "Param " + counter + ". "+ key + '                    ';
        keyPadded = keyPadded.substring(0,33);
        loggerDebug.info(keyPadded + " : " + param[key]);
        counter++;
      }
    }
    loggerDebug.info('\n');
  },

  printLogReplyConsole: function(replyJson)
  {
    loggerDebug = logger.getLoggerDebug();
    loggerDebug.info('Reply : \n' + JSON.stringify(replyJson, null, 4));
  },


  getPublicIP: function(callback)
  {
  superagent
    .get('http://www.mypublicip.com/')
    .set('User-Agent', 'curl/7.37.1')
    .end(function (err, res) {
      if (err) {
        return callback(err);
        // return err;
      }
      var ip = res.text.match(/\d+\.\d+\.\d+\.\d+/)[0];
      callback(null, ip);
      // return ip;
    });
  }
}
