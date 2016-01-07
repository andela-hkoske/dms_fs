angular.module('docman.services')
  .factory('Roles', ['$resource', '$http', function($resource, $http) {
    // Roles Resources
    var rolesRes = $resource('/api/roles/:id', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    }, {
      stripTrailingSlashes: false
    });

    // Finds a particular role
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
