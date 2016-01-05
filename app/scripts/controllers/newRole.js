angular.module('docman.controllers')
  .controller('NewRoleDialogController', ['$scope', '$mdDialog', 'Roles',
    function($scope, $mdDialog, Roles) {
      $scope.hide = function() {
        $mdDialog.hide();
      };
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
      $scope.create = function() {
        Roles.save({
          title: $scope.title
        }, function() {
          $scope.message = 'You have successfully created this role';
        }, function() {
          $scope.message = 'There was a problem creating a role. ' +
            'Try again or change the name of the role.';
        });
      };
    }
  ]);
