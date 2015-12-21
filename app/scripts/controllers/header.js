angular.module('docman.controllers')
  .controller('HeaderCtrl', ['$rootScope', '$scope', '$state', 'Users', 'Auth',
    function($rootScope, $scope, $state, Users, Auth) {
      // logout
      $scope.logout = function() {
        Users.logout(function(err, res) {
          if (!err) {
            delete $rootScope.currentUser;
            Auth.logout();
            $state.go('home');
          } else {
            console.log(err, res);
          }
        });
      };

    }
  ]);
