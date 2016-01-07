angular.module('docman.controllers')
  .controller('SignupCtrl', ['$scope', '$state', '$timeout',
    'Users', 'Auth', 'Roles',
    function($scope, $state, $timeout, Users, Auth, Roles) {
      $scope.user = {};

      // Fetches all the roles saved in the database
      Roles.query(function(res) {
        $scope.roles = res;
      });

      // Saves the user details
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
