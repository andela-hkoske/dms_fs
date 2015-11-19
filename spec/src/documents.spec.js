var DocumentHelper = require('../helpers/documents.helper.js');

describe('DOCUMENTS', function() {

  describe('createDocument(title, content) test', function() {
    it('Should return success for creation of unique titled document',
      function(done) {
        DocumentHelper.createDocument('Sample Document 1',
          'Sample Content', done);
      });

    it('Should return false for creation of untitled document',
      function(done) {
        DocumentHelper.createUntitledDocument(null,
          'Sample Content', done);
      });

    it('Should restrict users of role viewer from creating documents',
      function(done) {
        DocumentHelper.restrictViewerDocPost('Sample Document 33',
          'Sample Content', done);
      });
  });

  describe('getAllDocuments() test', function() {
    it('Should verify that all documents can be fetched and' +
      ' sorted in order of creation',
      function(done) {
        DocumentHelper.getAllDocuments(done);
      });
  });

  describe('getSpecificDocument() test', function() {
    it('Should verify that a document can be fetched and contains' +
      ' title, creation date and roles that can access it',
      function(done) {
        DocumentHelper.getSpecificDocument('Sample Document 1', done);
      });

    it('Should verify that only specified roles can access the document',
      function(done) {
        DocumentHelper.restrictRolesAccess('Document 6', done);
      });
  });

  describe('getDocumentsByLimit() test', function() {
    it('Should verify that document fetch limits results to specified limit.',
      function(done) {
        DocumentHelper.getDocumentsByLimit(2, done);
      });
  });

  describe('getDocumentsByType(type, limit test', function() {
    it('Should verify that documents can be fetched by type' +
      ' and have a limit imposed on the results.',
      function(done) {
        DocumentHelper.getDocumentsByType('Business', done);
      });
  });

  describe('getDocumentsByRole(role, limit) test', function() {
    it('Should verify that documents can be fetched by role' +
      ' and have a limit imposed on the results.',
      function(done) {
        DocumentHelper.getDocumentsByRole('Administrator', 10, done);
      });
  });

  describe('getDocumentsByDate(date, limit) test', function() {
    it('Should verify that documents can be fetched by date' +
      ' and have a limit imposed on the results.',
      function(done) {
        DocumentHelper.getDocumentsByDate('Document 1', 10, done);
      });
  });

  describe('createDocWithoutAuth(title, content) test', function() {
    it('Should verify that new document cannot be created' +
      ' if creator(user) is not authenticated.',
      function(done) {
        DocumentHelper.createDocWithoutAuth('Sample Document 2',
          'Sample Content', done);
      });
  });

  describe('deleteDocument(title) test', function() {
    it('Should validate that a document can be deleted',
      function(done) {
        DocumentHelper.deleteDocument('Sample Document 1', done);
      });
    it('Should validate that a document cannot be deleted by a user' +
      ' who is not the owner of the document and is not an administrator',
      function(done) {
        DocumentHelper.restrictDelete('Document 4', done);
      });
  });

  describe('updateDocument(content) test', function() {
    it('Should validate that a document can be updated', function(done) {
      DocumentHelper.updateDocument('Update my document', done);
    });
  });
});
