var Document = require('../models/document');
var Users = require('../models/user');
var Roles = require('../models/role');
var Types = require('../models/type');
var content = 'Lorem ipsum dolor sit amet, consectetur adipiscing' +
' elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' +
'. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris' +
' nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in' +
' reprehenderit in voluptate velit esse cillum dolore eu fugiat' +
' nulla pariatur. Excepteur sint occaecat cupidatat non proident' +
', sunt in culpa qui officia deserunt mollit anim id est laborum.';
var postDocsHandler = function(err) {
  if (err) {
    console.log('There was a problem seeding a document.');
  } else {
    console.log('Successfully seeded document.');
  }
};

module.exports = function() {
  Users.find({}).exec(function(err, users) {
    if (err) {
      console.log('There was a problem seeding documents.');
    } else {
      Roles.find({}).exec(function(err, roles) {
        if (err) {
          console.log('There was a problem seeding documents.');
        } else {
          Types.find({}).exec(function(err, types) {
            if (err) {
              console.log('There was a problem seeding documents.');
            } else {
              Document.find({}).exec(function(err, documents) {
                if (err) {
                  console.log('There was a problem seeding documents.');
                } else {
                  if (documents.length === 0) {
                    var doc_data = [{
                      owner: users[1]._id,
                      title: 'Document 1',
                      content: content,
                      type: types[0]._id,
                      roles: [roles[0]._id]
                    }, {
                      owner: users[1]._id,
                      title: 'Document 2',
                      content: content,
                      type: types[1]._id,
                      roles: [roles[1]._id]
                    }, {
                      owner: users[1]._id,
                      title: 'Document 3',
                      content: content,
                      type: types[2]._id,
                      roles: [roles[2]._id]
                    }, {
                      owner: users[2]._id,
                      title: 'Document 4',
                      content: content,
                      type: types[0]._id,
                      roles: [roles[0]._id, roles[1]._id]
                    }, {
                      owner: users[2]._id,
                      title: 'Document 5',
                      content: content,
                      type: types[1]._id,
                      roles: [roles[1]._id, roles[2]._id]
                    }, {
                      owner: users[2]._id,
                      title: 'Document 6',
                      content: content,
                      type: types[2]._id,
                      roles: [roles[0]._id, roles[2]._id]
                    }, {
                      owner: users[2]._id,
                      title: 'Document 7',
                      content: content,
                      type: types[0]._id,
                      roles: [roles[0]._id, roles[1]._id, roles[2]._id]
                    }];
                    for (var i = 0, l = doc_data.length; i < l; i++) {
                      var document = new Document(doc_data[i]);
                      document.save(postDocsHandler);
                    }
                  } else {
                    console.log('Documents already seeded.');
                  }
                }
              });
            }
          });
        }
      });
    }
  });
};
