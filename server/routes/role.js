var RolesCtrl = require('../controllers/roles');

module.exports = function(api) {
  api.post('/roles', RolesCtrl.create);
  api.post('/roles/find', RolesCtrl.findByTitle);
  api.get('/roles', RolesCtrl.getAll);
  api.get('/roles/:id', RolesCtrl.getById);
  api.delete('/roles/:id', RolesCtrl.remove);
  api.put('/roles/:id', RolesCtrl.update);
  return api;
};
