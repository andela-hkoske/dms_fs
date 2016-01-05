var RolesCtrl = require('../controllers/roles');
var Auth = require('../services/auth');

module.exports = function(api) {
  api.post('/roles', Auth.authenticate, RolesCtrl.create);
  api.post('/roles/find', RolesCtrl.findByTitle);
  api.get('/roles', RolesCtrl.getAll);
  api.get('/roles/:id', RolesCtrl.getById);
  api.delete('/roles/:id', Auth.authenticate, RolesCtrl.remove);
  api.put('/roles/:id', Auth.authenticate, RolesCtrl.update);
  return api;
};
