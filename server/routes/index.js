module.exports = function(app, api) {
  api = require('./user')(api);
  api = require('./role')(api);
  api = require('./type')(api);
  api = require('./document')(api);
  return api;
};
