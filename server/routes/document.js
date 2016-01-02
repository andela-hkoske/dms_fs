var DocumentCtrl = require('../controllers/documents');
var Auth = require('../services/auth');

module.exports = function(api) {
  api.use(Auth.authenticate);
  api.use(DocumentCtrl.authAccess);
  api.get('/documents/:id', DocumentCtrl.getById);
  api.get('/documents', DocumentCtrl.getAll);
  api.get('/documents/limit/:limit', DocumentCtrl.getByLimit);
  api.get('/documents/role/:role/:limit', DocumentCtrl.getByRole);
  api.get('/documents/date/:date/:limit', DocumentCtrl.getByDate);
  api.get('/documents/type/:type', DocumentCtrl.getByType);
  api.post('/documents/find', DocumentCtrl.findByTitle);
  api.use(DocumentCtrl.authView);
  api.post('/documents', DocumentCtrl.save);
  api.use(DocumentCtrl.authUser);
  api.delete('/documents/:id', DocumentCtrl.delete);
  api.put('/documents/:id', DocumentCtrl.update);
  return api;
};
