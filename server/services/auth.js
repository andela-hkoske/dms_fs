var env = process.env.NODE_ENV || 'development';
var config = require('../config')[env];
var jsonwebtoken = require('jsonwebtoken');
var secretKey = config.secretKey;

module.exports = {
  authenticate: function(req, res, next) {
    var token = req.headers['x-access-token'];
    if (token) {
      try {
        req.decoded = jsonwebtoken.verify(token, secretKey);
      } catch (err) {
        return res.status(401).send({
          success: false,
          message: 'Failed to authenticate user. Invalid token.'
        });
      }
      next();
    } else {
      return res.status(401).send({
        success: false,
        message: 'Failed to authenticate user. No token provided.'
      });
    }
  }
};
