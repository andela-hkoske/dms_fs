angular.module('docman.controllers')
  .controller('TypesDialogController',
  	['$scope', '$mdDialog', 'Types', 'Utils',
  	function($scope, $mdDialog, Types, Utils){
  		 $scope.hide = function() {
          $mdDialog.hide();
        };
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
        var initTypes = function() {
          Types.query(function(res) {
            $scope.types = res;
          });
        };
        initTypes();
        $scope.select = function(type) {
          $scope.selectedType = type;
        };
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
  	}]);