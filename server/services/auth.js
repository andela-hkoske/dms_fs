var env = process.env.NODE_ENV || 'development';
var config = require('../config')[env];
var jsonwebtoken = require('jsonwebtoken');
var secretKey = config.secretKey;

module.exports = {
  authenticate: function(req, res, next) {
    var token = req.headers['x-access-token'];
    if (token) {
      try {
        var decoded = jsonwebtoken.verify(token, secretKey);
        if(decoded._doc){
          req.decoded = decoded._doc;
        }
        else{
          req.decoded = decoded;
        }
        next();
      } catch (err) {
        return res.status(401).send({
          success: false,
          message: 'Failed to authenticate user. Invalid token.'
        });
      }
    } else {
      return res.status(401).send({
        success: false,
        message: 'Failed to authenticate user. No token provided.'
      });
    }
  }
};
