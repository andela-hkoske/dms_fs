angular.module('docman.controllers')
  .controller('RolesDialogController',
  	['$scope', '$mdDialog', 'Utils', 'Roles',
    function($scope, $mdDialog, Utils, Roles) {
      // Hides the dialog
      $scope.hide = function() {
        $mdDialog.hide();
      };

      // Closes the dialog
      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      // Fetches all the roles saved in the database
      var initRoles = function() {
        Roles.query(function(res) {
          $scope.roles = res;
        });
      };
      initRoles();

      // Sets the selected role
      $scope.select = function(role) {
        $scope.selectedRole = role;
      };

      // Updates the selected role
      $scope.update = function() {
        Roles.update($scope.selectedRole,
          function() {
            $scope.message =
              'You have successfully update the selected role';
            initRoles();
          },
          function() {
            $scope.message =
              'There was a problem updating the selected role';
          });
      };

      // Deletes the selected role
      $scope.delete = function(role, ev) {
        Utils.dialog('Warning: delete role ' + role.title,
          'Are you sure you want to delete the selected role ' +
          role.title + '?', ev,
          function() {
            Roles.remove({
                id: role._id
              }, function() {
                Utils.toast(
                  'You have successfully deleted the selected role.');
                initRoles();
              },
              function() {
                Utils.toast(
                  'There was a problem deleting the selected role.');
              });
          });
      };
    }
  ]);
