angular.module('docman.services')
  .factory('Token', ['$window', function($window) {
    return {
      // Sets the token
      set: function(token) {
        $window.localStorage.setItem('token', token);
      },

      // Deletes the token
      get: function() {
        return $window.localStorage.getItem('token');
      },

      // Removes the token
      remove: function() {
        $window.localStorage.removeItem('token');
      }
    };
  }]);
