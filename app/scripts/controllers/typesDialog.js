angular.module('docman.controllers')
  .controller('TypesDialogController', ['$scope', '$mdDialog', 'Types', 'Utils',
    function($scope, $mdDialog, Types, Utils) {
      // Hides the dialog
      $scope.hide = function() {
        $mdDialog.hide();
      };

      // Closes the dialog
      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      // Fetches all the types saved in the database
      var initTypes = function() {
        Types.query(function(res) {
          $scope.types = res;
        });
      };

      initTypes();

      // Sets the selected type
      $scope.select = function(type) {
        $scope.selectedType = type;
      };

      // Updates the type
      $scope.update = function() {
        Types.update($scope.selectedType,
          function() {
            $scope.message =
              'You have successfully update the selected type';
            initTypes();
          },
          function() {
            $scope.message =
              'There was a problem updating the selected type';
          });
      };

      // Deletes the type
      $scope.delete = function(type, ev) {
        Utils.dialog('Warning: delete type ' + type.title,
          'Are you sure you want to delete the selected type ' +
          type.title + '?', ev,
          function() {
            Types.remove({
                id: type._id
              }, function() {
                Utils.toast(
                  'You have successfully deleted the selected type.');
                initTypes();
              },
              function() {
                Utils.toast(
                  'There was a problem deleting the selected type.');
              });
          });
      };
    }
  ]);
