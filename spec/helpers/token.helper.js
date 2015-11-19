var request = require('superagent'),
  token, viewerToken, userToken;

module.exports = {
  readToken: function(done, cb) {
    if (!token) {
      request
        .post('http://localhost:3000/api/users/login')
        .send({
          username: 'JaneDoe97',
          password: 'JaneDoe97'
        })
        .end(function(err, res) {
          if (res && !err) {
            token = res.body.token;
            cb(res.body.token);
          } else {
            done();
          }
        });
    } else {
      cb(token);
    }
  },
  readViewerToken: function(done, cb) {
    if (!viewerToken) {
      request
        .post('http://localhost:3000/api/users/login')
        .send({
          username: 'JaneDoe99',
          password: 'JaneDoe99'
        })
        .end(function(err, res) {
          if (res && !err) {
            viewerToken = res.body.token;
            cb(res.body.token);
          } else {
            done();
          }
        });
    } else {
      cb(viewerToken);
    }
  },
  readUserToken: function(done, cb) {
    if (!userToken) {
      request
        .post('http://localhost:3000/api/users/login')
        .send({
          username: 'JaneDoe98',
          password: 'JaneDoe98'
        })
        .end(function(err, res) {
          if (res && !err) {
            userToken = res.body.token;
            cb(res.body.token);
          } else {
            done();
          }
        });
    } else {
      cb(userToken);
    }
  }
};
