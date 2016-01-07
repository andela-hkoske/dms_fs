angular.module('docman.services')
  .factory('Documents', ['$resource', '$http', function($resource, $http) {
    // Document resource
    var docRes = $resource('/api/documents/:id', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    }, {
      stripTrailingSlashes: false
    });

    // Finds a particular document given some data
    docRes.find = function(params, cb) {
      $http.post('/api/documents/find', params)
        .success(function(res) {
          cb(null, res);
        }).error(function(err) {
          cb(err);
        });
    };

    // Finds a particular document and limits results
    docRes.findByLimit = function(limit, cb) {
      $http.post('/api/documents/limit/' + limit)
        .success(function(res) {
          cb(null, res);
        }).error(function(err) {
          cb(err);
        });
    };

    // Find documents of a particular role
    docRes.findByRole = function(role, limit, cb) {
      $http.post('/api/documents/role/' + role + '/' + limit)
        .success(function(res) {
          cb(null, res);
        }).error(function(err) {
          cb(err);
        });
    };

    // Finds documents by a particular date
    docRes.findByDate = function(date, limit, cb) {
      $http.post('/api/documents/date/' + date + '/' + limit)
        .success(function(res) {
          cb(null, res);
        }).error(function(err) {
          cb(err);
        });
    };

    // Finds documents of a particular type
    docRes.findByType = function(type, cb) {
      $http.post('/api/documents/type/' + type)
        .success(function(res) {
          cb(null, res);
        }).error(function(err) {
          cb(err);
        });
    };
    return docRes;
  }]);
