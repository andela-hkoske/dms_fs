angular.module('docman.controllers')
  .controller('DialogController', ['$rootScope', '$scope', '$mdDialog',
    'Roles', 'Users', 'Auth',
    function($rootScope, $scope, $mdDialog, Roles, Users, Auth) {
      $scope.user = $rootScope.currentUser;
      $scope.hide = function() {
        $mdDialog.hide();
      };
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
      Roles.query(function(res) {
        $scope.roles = res;
      });
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
