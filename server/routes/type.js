var TypesCtrl = require('../controllers/types');
var Auth = require('../services/auth');

module.exports = function(api) {
  api.post('/types', Auth.authenticate, TypesCtrl.create);
  api.post('/types/find', TypesCtrl.findByTitle);
  api.get('/types', TypesCtrl.getAll);
  api.get('/types/:id', TypesCtrl.getById);
  api.delete('/types/:id', Auth.authenticate, TypesCtrl.remove);
  api.put('/types/:id', Auth.authenticate, TypesCtrl.update);
  return api;
};
