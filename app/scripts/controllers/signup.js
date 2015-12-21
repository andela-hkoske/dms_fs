angular.module('docman.controllers')
  .controller('SignupCtrl',
    ['$rootScope', '$scope', '$state', 'Users', 'Auth', 'Roles',
    function($rootScope, $scope, $state, Users, Auth, Roles) {
      $scope.user = {};
      Roles.query(function(res) {
        $scope.roles = res;
        console.log(res);
      });
      $scope.save = function() {
        Users.save($scope.user, function(err, res) {
          if (err && !res) {
            $scope.message = err.message ||
              'There was a problem signing you up.';
          } else {
            Auth.setToken(res.token);
            $rootScope.currentUser = res;
            $state.go('login');
          }
        });
      };
    }
  ]);
