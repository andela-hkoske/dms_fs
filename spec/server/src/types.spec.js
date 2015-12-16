var TypeHelper = require('../helpers/types.helper.js');

describe('TYPES', function() {
  describe('createType(title) test', function() {
    it('Should return success for unique titled type', function(done) {
      TypeHelper.createType('Memo', done);
    });

    it('Should return false for empty title field', function(done) {
      TypeHelper.createUntitledType(null, done);
    });

    it('Should validate that new type cannot be created if creator(user)' +
      ' is not authenticated.',
      function(done) {
        TypeHelper.createWithoutAuth('Budgets', done);
      });
  });

  describe('getAllTypes() test', function() {
    it('Should return types in the database as an array', function(done) {
      TypeHelper.getAllTypes(done);
    });
  });

  describe('getSpecificType(title) test', function() {
    it('Should validate that a type can be fetched', function(done) {
      TypeHelper.getSpecificType('Memo', done);
    });
  });

  describe('updateType(oldTitle, newTitle) test', function() {
    it('Should validate that a type can be updated', function(done) {
      TypeHelper.updateType('Memo', 'Letters', done);
    });
  });

  describe('deleteType(title) test', function() {
    it('Should validate that a type can be deleted', function(done) {
      TypeHelper.deleteType('Budgets', done);
    });
  });

});
