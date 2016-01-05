var UserCtrl = require('../controllers/users');
var Auth = require('../services/auth');

module.exports = function(api) {
  api.post('/users', UserCtrl.signup);
  api.post('/users/login', UserCtrl.login);
  api.get('/users/session', UserCtrl.session);
  api.get('/users', UserCtrl.getAll);
  api.post('/users/find', UserCtrl.find);
  api.get('/users/logout', Auth.authenticate, UserCtrl.logout);
  api.get('/users/documents', UserCtrl.countUserDocs);
  api.get('/users/:id', UserCtrl.findById);
  api.get('/users/:id/documents', UserCtrl.documents);
  api.delete('/users/:id', Auth.authenticate, UserCtrl.remove);
  api.put('/users/:id', Auth.authenticate, UserCtrl.update);
  return api;
};
