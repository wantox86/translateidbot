var db = require('../lib/db/mysql');
var config = require('../config/config').config;


function bot()
{
    this.currentdb = new db();
    var self = this;
    this.find_all_user_bot =  function(jsondata,callback){
        var query = "select * from user_bot where chat_id = '" + jsondata.chatid + "' or '-1' = '" + jsondata.chatid + "'";
        if(config.app_dev_mode)
        {
            console.log('Devel Mode Detected');
            query = "select * from user_bot_dev where chat_id = '" + jsondata.chatid + "' or '-1' = '" + jsondata.chatid + "'";
        }
        self.currentdb.DBquery(query,function(status, result){
            callback(status, result);
        });
    },
    this.find_user_bot =  function(jsondata,callback){
        var query = "select * from user_bot where user_name = '" + jsondata.userid + "' or '-1' = '" + jsondata.chatid + "'";
        if(config.app_dev_mode)
        {
            console.log('Devel Mode Detected');
            query = "select * from user_bot_dev where user_name = '" + jsondata.userid + "' or '-1' = '" + jsondata.chatid + "'";
        }
        self.currentdb.DBquery(query,function(status, result){
            callback(status, result);
        });
    },
    this.find_all =  function(jsondata,callback){
        var query = "select * from user where userid = '" + jsondata.userid + "'";
        self.currentdb.DBquery(query,function(status, result){
            callback(status, result);
        });
    },
    this.insert_feedback = function(param, callback)
    {
        // var query = 'insert into feedback (first_name, last_name, user_id, feedback_msg, create_timestamp) ';
        // query += 'values(?,?,?,?,?);';
        self.currentdb.DBinsert("feedback",param,function(status, result){
            callback(status, result);
        });
    },
    this.insert_userbot = function(param, callback)
    {
        // var query = 'insert into feedback (first_name, last_name, user_id, feedback_msg, create_timestamp) ';
        // query += 'values(?,?,?,?,?);';
        var tableName = "user_bot";
        if(config.app_dev_mode)
        {
            console.log('Devel Mode Detected');
            tableName = "user_bot_dev";
        }
        self.currentdb.DBinsert(tableName,param,function(status, result){
            callback(status, result);
        });
    },
    this.insert_activity = function(param, callback)
    {
        var tableName = "activity";
        if(config.app_dev_mode)
        {
            console.log('Devel Mode Detected');
            tableName = "activity_dev";
        }  
        self.currentdb.DBinsert(tableName,param,function(status, result){
            callback(status, result);
        }); 
    };
}
module.exports = bot;