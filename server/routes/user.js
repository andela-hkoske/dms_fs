var UserCtrl = require('../controllers/users');

module.exports = function(api) {
  api.post('/users',UserCtrl.signup);
  api.post('/users/login',UserCtrl.login);
  api.use(UserCtrl.authenticate);
  api.get('/users',UserCtrl.getAll);
  api.post('/users/find',UserCtrl.find);
  api.get('/users/logout',UserCtrl.logout);
  api.get('/users/:id',UserCtrl.findById);
  api.get('/users/:id/documents',UserCtrl.documents);
  api.delete('/users/:id',UserCtrl.remove);
  api.put('/users/:id',UserCtrl.update);
  return api;
};
