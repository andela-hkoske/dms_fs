var RoleHelper = require('../helpers/roles.helper.js');

describe('ROLES', function() {
  describe('createRole(title) test', function() {
    it('Should return success for unique titled role', function(done) {
      RoleHelper.createRole('Standard', done);
    });

    it('Should return false for empty title field', function(done) {
      RoleHelper.createUntitledRole(null, done);
    });

    it('Should validate that new role cannot be created ' +
      'if creator(user) is not authenticated.',
      function(done) {
        RoleHelper.createWithoutAuth('AllAccess', done);
      });
  });

  describe('getAllRoles() test', function() {
    it('Should return roles in the database as an array', function(done) {
      RoleHelper.getAllRoles(done);
    });
  });

  describe('getSpecificRole(title) test', function() {
    it('Should validate that a role can be fetched', function(done) {
      RoleHelper.getSpecificRole('Standard', done);
    });
  });

  describe('updateRole(oldTitle, newTitle) test', function() {
    it('Should validate that a role can be updated', function(done) {
      RoleHelper.updateRole('Standard', 'Basic', done);
    });
  });

  describe('deleteRole(title) test', function() {
    it('Should validate that a role can be deleted', function(done) {
      RoleHelper.deleteRole('AllAccess', done);
    });
  });

});
