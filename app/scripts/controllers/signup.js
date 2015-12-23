angular.module('docman.controllers')
  .controller('SignupCtrl', ['$rootScope', '$scope', '$state', '$timeout',
    'Users', 'Auth', 'Roles',
    function($rootScope, $scope, $state, $timeout, Users, Auth, Roles) {
      $scope.user = {};
      Roles.query(function(res) {
        $scope.roles = res;
      });
      $scope.save = function() {
        Users.save($scope.user, function() {
            $scope.message = 'Successfully signed up. You will now' +
              ' be redirected to login. Login to proceed.';
            $timeout(function() {
              $state.go('login');
            }, 3000);
          },
          function(err) {
            $scope.message = err.data.message ||
              'There was a problem signing you up. ' +
              'Try again with different credentials.';
          });
      };
    }
  ]);
