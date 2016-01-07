angular.module('docman.services')
  .factory('Types', ['$resource', '$http', function($resource, $http) {
    // Types Resources
    var typesRes = $resource('/api/types/:id', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    }, {
      stripTrailingSlashes: false
    });

    // Finds a particular type
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
