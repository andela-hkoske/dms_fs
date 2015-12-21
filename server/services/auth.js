var env = process.env.NODE_ENV || 'development';
var config = require('../config')[env];
var jsonwebtoken = require('jsonwebtoken');
var secretKey = config.secretKey;

module.exports = {
  authenticate: function(req, res, next) {
    var respond = function(err, decoded) {
      if (!err) {
        req.decoded = decoded;
        next();
      } else {
        return res.status(403).send({
          success: false,
          message: 'Failed to authenticate user. No token provided.'
        });
      }
    };
    var token = req.headers['x-access-token'];
    jsonwebtoken.verify(token, secretKey, respond);
  }
};
