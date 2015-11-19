var Roles = require('../models/role');
var Users = require('../models/user');
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();
var seedDocuments = require('./documents');
var count = 0;

var postUserHandler = function(err) {
  if (err) {
    console.log('There was a problem seeding a user.');
  } else {
    console.log('Successfully seeded user.');
    count++;
    if (count === 3) {
      emitter.emit('users_done');
    }
  }
};

var getRolesHandler = function(err, roles) {
  if (err) {
    console.log('There was a problem seeding users.');
  } else {
    if (roles.length !== 0) {
      Users.find({}).exec(function(err, users) {
        if (err) {
          console.log('There was a problem seeding users.');
        } else {
          if (users.length === 0) {
            var user_data = [{
              name: {
                first: 'Jane',
                last: 'Doe'
              },
              role: roles[0]._id,
              username: 'JaneDoe99',
              password: 'JaneDoe99',
              email: 'janedoe99@unknown.com'
            }, {
              name: {
                first: 'Jane',
                last: 'Doe'
              },
              role: roles[1]._id,
              username: 'JaneDoe98',
              password: 'JaneDoe98',
              email: 'janedoe98@unknown.com'
            }, {
              name: {
                first: 'Jane',
                last: 'Doe'
              },
              role: roles[2]._id,
              username: 'JaneDoe97',
              password: 'JaneDoe97',
              email: 'janedoe97@unknown.com'
            }];
            for (var i = 0, l = user_data.length; i < l; i++) {
              var user = new Users(user_data[i]);
              user.save(postUserHandler);
            }
          } else {
            console.log('Users already seeded.');
            emitter.emit('users_done');
          }
        }
      });
    } else {
      console.log('There was a problem seeding users.');
    }
  }
};

emitter.on('users_done', function() {
  seedDocuments();
});

module.exports = function() {
  Roles.find({}).exec(getRolesHandler);
};
