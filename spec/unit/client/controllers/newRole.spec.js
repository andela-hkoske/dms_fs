describe('NewRoleDialogController tests', function() {
  var $scope, $mdDialog, Roles, httpBackend, controller;

  beforeEach(function() {
    module('docman');
  });

  beforeEach(inject(function($injector) {
    var $controller = $injector.get('$controller');
    $scope = $injector.get('$rootScope');
    $mdDialog = $injector.get('$mdDialog');
    httpBackend = $injector.get('$httpBackend');
    httpBackend.when('GET', '/api/users/session').respond(200, {
      '_id': '568398ce45817aad155f913f',
      'role': {
        '_id': '568398ce45817aad155f913c',
        'title': 'Administrator'
      },
      'username': 'JaneDoe97',
      'password': '$2a$10$927XnaPv8ou087KJBqpieeLMXqR' +
        '2Hx9kBzrdms9.R1hCrB4AoJzVK',
      'email': 'janedoe97@unknown.com',
      'name': {
        'last': 'Doe',
        'first': 'John'
      }
    });
    httpBackend.when('POST', '/api/roles/').respond(200, {
      res: 'res'
    });
    httpBackend.when('GET', 'views/home.html').respond(200, {});
    Roles = $injector.get('Roles');
    controller = $controller('NewRoleDialogController', {
      $scope: $scope
    });
  }));

  describe('NewRoleDialogController unit tests', function() {
    describe('$scope.hide test', function() {
      it('Should define $scope.hide', function() {
        expect($scope.hide).toBeDefined();
        $mdDialog.hide = sinon.stub();
        $scope.hide();
        expect($mdDialog.hide.called).toBe(true);
      });
    });

    describe('$scope.cancel test', function() {
      it('Should define $scope.cancel', function() {
        expect($scope.cancel).toBeDefined();
        $mdDialog.cancel = sinon.stub();
        $scope.cancel();
        expect($mdDialog.cancel.called).toBe(true);
      });
    });

    describe('$scope.create test', function() {
      it('Should define $scope.create', function() {
        expect($scope.create).toBeDefined();
        Roles.save = sinon.spy();
        $scope.create();
        httpBackend.flush();
        expect(Roles.save.called).toBe(true);
      });
    });

  });
});
