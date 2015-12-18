angular.module('docman.services')
  .factory('Types', ['$resource', '$http', function($resource, $http) {
    var typesRes = $resource('/api/types/:id', {
      id: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    }, {
      stripTrailingSlashes: false
    });
    typesRes.find = function(params, cb) {
      $http.post('/api/types/find', params)
        .success(function(res) {
          cb(null, res);
        }).error(function(err) {
          cb(err);
        });
    };
    return typesRes;
  }]);
