angular.module('docman.services')
  .factory('Roles', ['$resource', '$http', function($resource, $http) {
    var rolesRes = $resource('/api/roles/:id', {
      id: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    }, {
      stripTrailingSlashes: false
    });
    rolesRes.find = function(params, cb) {
      $http.post('/api/roles/find', params)
        .success(function(res) {
          cb(null, res);
        }).error(function(err) {
          cb(err);
        });
    };
    return rolesRes;
  }]);
