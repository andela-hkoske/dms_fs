var TypesCtrl = require('../controllers/types');

module.exports = function(api) {
  api.post('/types', TypesCtrl.create);
  api.post('/types/find', TypesCtrl.findByTitle);
  api.get('/types', TypesCtrl.getAll);
  api.get('/types/:id', TypesCtrl.getById);
  api.delete('/types/:id', TypesCtrl.remove);
  api.put('/types/:id', TypesCtrl.update);
  return api;
};
