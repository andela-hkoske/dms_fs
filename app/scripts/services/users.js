angular.module('docman.services')
  .factory('Users', ['$resource', '$http', function($resource, $http) {
    var userRes = $resource('/api/users/:id', {
      id: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    }, {
      stripTrailingSlashes: false
    });
    userRes.login = function(user, cb) {
      $http.post('/api/users/login', user)
        .success(function(res) {
          cb(null, res);
        }).error(function(err) {
          cb(err);
        });
    };
    userRes.find = function(params, cb) {
      $http.post('/api/users/find', params)
        .success(function(res) {
          cb(null, res);
        }).error(function(err) {
          cb(err);
        });
    };
    userRes.logout = function(cb) {
      $http.post('/api/users/logout')
        .success(function(res) {
          cb(null, res);
        }).error(function(err) {
          cb(err);
        });
    };
    userRes.getDocs = function(id, cb) {
      $http.post('/api/users/' + id + '/documents')
        .success(function(res) {
          cb(null, res);
        }).error(function(err) {
          cb(err);
        });
    };
    return userRes;
  }]);
