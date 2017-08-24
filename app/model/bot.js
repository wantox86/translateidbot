var db = require('../lib/db/mysql');


function bot()
{
    this.currentdb = new db();
    var self = this;
    this.find_all_user_bot =  function(jsondata,callback){
        var query = "select * from user_bot where chat_id = '" + jsondata.chatid + "' or '-1' = '" + jsondata.chatid + "'";
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
        self.currentdb.DBinsert("user_bot",param,function(status, result){
            callback(status, result);
        });
    };
}
module.exports = bot;