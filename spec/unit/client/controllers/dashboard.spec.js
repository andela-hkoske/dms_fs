describe('DashboardCtrl Controller tests', function() {
  var $scope, $mdSidenav, $mdMedia,
      $mdDialog, Users, Documents, Roles, Utils, Types, controller;

  beforeEach(function() {
    module('docman');
  });

  beforeEach(inject(function($injector) {
    var $controller = $injector.get('$controller');
    Users = $injector.get('Users');
    $scope = $injector.get('$rootScope');
    controller = $controller('DashboardCtrl', {
      $scope: $scope
    });
    $scope.user.username = 'JaneDoe97';
    $scope.user.password = 'JaneDoe97';
    $mdDialog = $injector.get('$mdDialog');
    $mdSidenav = $injector.get('$mdSidenav');
    $mdMedia = $injector.get('$mdMedia');
    Types = $injector.get('Types');
    Roles = $injector.get('Roles');
    Utils = $injector.get('Utils');
    Documents = $injector.get('Documents');
  }));

  describe('DashboardCtrl unit tests', function() {
    
  });

});
