angular.module('docman.services')
  .factory('Users', ['$resource', '$http', function($resource, $http) {
    // Users resource
    var userRes = $resource('/api/users/:id', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    }, {
      stripTrailingSlashes: false
    });

    // Logins a user
    userRes.login = function(user, cb) {
      $http.post('/api/users/login', user)
        .success(function(res) {
          cb(null, res);
        }).error(function(err) {
          cb(err);
        });
    };

    // Gets the user session
    userRes.session = function(cb) {
      $http.get('/api/users/session')
        .success(function(res) {
          cb(null, res);
        }).error(function(err) {
          cb(err);
        });
    };

    // Finds a particular user
    userRes.find = function(params, cb) {
      $http.post('/api/users/find', params)
        .success(function(res) {
          cb(null, res);
        }).error(function(err) {
          cb(err);
        });
    };

    // Logouts a user
    userRes.logout = function(cb) {
      $http.get('/api/users/logout')
        .success(function(res) {
          cb(null, res);
        }).error(function(err) {
          cb(err);
        });
    };

    // Gets the documents of a particular user
    userRes.getDocs = function(id, cb) {
      $http.get('/api/users/' + id + '/documents')
        .success(function(res) {
          cb(null, res);
        }).error(function(err) {
          cb(err);
        });
    };

    // Get users and thenumber of their documents
    userRes.getUserDocs = function(cb) {
      $http.get('/api/users/documents')
        .success(function(res) {
          cb(null, res);
        }).error(function(err) {
          cb(err);
        });
    };
    return userRes;
  }]);
