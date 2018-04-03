var db = require('../lib/db/mysql');


function login()
{
    this.currentdb = new db();
    var self = this;
    this.find_all =  function(jsondata,callback){
        var query = "select * from user where userid = '" + jsondata.userid + "'";
        self.currentdb.DBquery(query,function(status, result){
            callback(status, result);
        });
    };
}
module.exports = login;