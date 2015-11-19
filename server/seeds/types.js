var Types = require('../models/type');
var seedRoles = require('./roles');
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();
var initialTypes = [{
  title: 'Business'
}, {
  title: 'Personal'
}, {
  title: 'Education'
}];
var postResHandler = function(err) {
  if (err) {
    console.log('There was a problem seeding a type.');
  } else {
    console.log('Successfully seeded type.');
  }
};
var getResHandler = function(err, types) {
  if (err) {
    console.log('There was a problem seeding types.');
  } else if (types) {
    if (types.length === 0) {
      for (var i = 0, l = initialTypes.length; i < l; i++) {
        var type = new Types(initialTypes[i]);
        type.save(postResHandler);
      }
      emitter.emit('types_done');
    } else {
      console.log('Types already seeded.');
      emitter.emit('types_done');
    }
  }
};
emitter.on('types_done', function() {
  seedRoles();
});

module.exports = function() {
  Types.find(getResHandler);
};
