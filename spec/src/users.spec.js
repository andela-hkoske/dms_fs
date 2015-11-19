var UserHelper = require('../helpers/users.helper.js');

describe('USERS', function() {
  describe('createUser(last, first, email, username, password) test',
    function() {
      it('Should return success for first time user', function(done) {
        UserHelper.createUser('Doe', 'John', 'doe.john@unknown.com',
          'john.doe', 'john.doe', done);
      });

      it('Should return false for empty names, password, username ' +
        'and email fields',
        function(done) {
          UserHelper.createEmptyUser(null, null, null, null, null, done);
        });
    });

  describe('login(username, password) test', function() {
    it('Should return success or fail if authentication failed',
      function(done) {
        UserHelper.login('JaneDoe97', 'JaneDoe97', done);
      });
  });

  describe('getAllUsers() test', function() {
    it('Should return users in the database as an array', function(done) {
      UserHelper.getAllUsers(done);
    });
  });

  describe('verifyRolePresent() test', function() {
    it('Should verify that a role is defined for recently ' +
      'created user',
      function(done) {
        UserHelper.verifyRolePresent(done);
      });
  });

  describe('verifyNamesPresent() test', function() {
    it('Should validates that a new user created both first and last names',
      function(done) {
        UserHelper.verifyNamesPresent(done);
      });
  });

  describe('updateUser(last, first) test', function() {
    it('Should validates that a user can be updated', function(done) {
      UserHelper.updateUser('john.doe', 'Don', 'John', done);
    });
  });

  describe('deleteUser(username) test', function() {
    it('Should validates that a user can be deleted',
      function(done) {
        UserHelper.deleteUser('john.doe1', done);
      });
  });

  describe('getUserDocuments(username) test', function() {
    it('Should validates that all documents created by a ' +
      'specified user can be obtained',
      function(done) {
        UserHelper.getUserDocuments('JaneDoe97', done);
      });
  });

  describe('getSpecificUser(username) test', function() {
    it('Should validates that a user can be fetched', function(done) {
      UserHelper.getSpecificUser('JaneDoe97', done);
    });
  });
});
