angular.module('docman.controllers')
  .controller('LoginCtrl', ['$rootScope', '$scope', '$state', 'Users', 'Auth',
    function($rootScope, $scope, $state, Users, Auth) {
      $scope.user = {};

      // Logins in the user
      $scope.login = function() {
        Users.login($scope.user, function(err, res) {
          if (err && !res) {
            $scope.message = err.message ||
              'There was a problem logging you in.';
          } else {
            Auth.setToken(res.token);
            $rootScope.currentUser = res.user;
            $state.go('dashboard', {
              id: $rootScope.currentUser._id
            });
          }
        });
      };
    }
  ]);
