angular.module('docman.services')
  .factory('Auth', ['Token', function(Token) {
    return {
      // Checks login status
      isLoggedIn: function() {
        if (Token.get()) {
          return true;
        } else {
          return false;
        }
      },

      //  Saves the token
      setToken: function(token) {
        Token.set(token);
      },

      // Removes the token on logout
      logout: function() {
        Token.remove();
      }
    };
  }]);
