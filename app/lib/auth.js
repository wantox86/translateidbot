var jwt    = require('jsonwebtoken');
var appmain = require('../../app');
var config = require('../config/config').config;
// var ownConsts = require('../../config/consts').consts;

module.exports = function (reqType){
	return function(req,res,next){
		/*if(req.session){
		    if (req.session.isLoggedIn===true)
        		return next();
        }*/

		var token = req.body.token || req.query.token || req.headers['x-access-token'];
		// console.log('reqType : ' + reqType);
		if (token) {	

			jwt.verify(token, config.key_token, function(err, decoded) 
			{      
			  if (err) 
				{
			    return res.json(
						{ 
							Status: 8, 
							StatusDesc: 'Failed to authenticate token.' 
						});    
			  } else {
			    req.userInfo = decoded;
			    return next();
			  }
			});
		}
		else
		{
			if(reqType=='api'){
				res.status(200).json(
					{
						Status:12, 
						StatusDesc:'Token expired, Please Login'
					});
			}
			else
			{
				res.redirect('/login');
			}
		}        			
	}
}