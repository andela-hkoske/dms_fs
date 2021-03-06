angular.module('docman.services')
  .factory('TokenInjector', ['Token', function(Token) {
    var tokenInjector = {
      // Injects the token in each http request
      request: function(config) {
        var token = Token.get();
        if (token) {
          config.headers['x-access-token'] = token;
        }
        return config;
      }
    };
    return tokenInjector;
  }]);
