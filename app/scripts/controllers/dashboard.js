angular.module('docman.controllers')
  .controller('DashboardCtrl', ['$scope', 'Users', function($scope, Users) {
    var users = Users.query(function() {
      console.log(users);
    });
  }]);
