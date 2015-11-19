var Roles = require('../models/role');
var seedUsers = require('./users');
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();

var initialRoles = [{
  title: 'Viewer'
}, {
  title: 'User'
}, {
  title: 'Administrator'
}];
var postResHandler = function(err) {
  if (err) {
    console.log('There was a problem seeding a role.');
  } else {
    console.log('Successfully seeded role.');
  }
};
var getResHandler = function(err, roles) {
  if (err) {
    console.log('There was a problem seeding roles.');
  } else if (roles) {
    if (roles.length === 0) {
      for (var i = 0, l = initialRoles.length; i < l; i++) {
        var role = new Roles(initialRoles[i]);
        role.save(postResHandler);
      }
      emitter.emit('roles_done');
    } else {
      console.log('Roles already seeded.');
      emitter.emit('roles_done');
    }
  }
};
emitter.on('roles_done', function() {
  seedUsers();
});

module.exports = function() {
  Roles.find(getResHandler);
};
