angular.module('docman.controllers')
  .controller('DialogController', ['$rootScope', '$scope', '$mdDialog',
    'Roles', 'Users', 'Auth',
    function($rootScope, $scope, $mdDialog, Roles, Users, Auth) {
      $scope.user = $rootScope.currentUser;

      // Hides the dialog
      $scope.hide = function() {
        $mdDialog.hide();
      };

      // Closes the dialog
      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      // Gets all the roles saved in the database
      Roles.query(function(res) {
        $scope.roles = res;
      });

      // Updates the user details
      $scope.update = function() {
        Users.update($scope.user, function(res) {
          $rootScope.currentUser = $scope.user;
          Auth.setToken(res.token);
          $scope.message =
            'You have successfully updated this user\'s profile.';
        }, function() {
          $scope.message =
            'There was a problem updating this profile.';
        });
      };
    }
  ]);
