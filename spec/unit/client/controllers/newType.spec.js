describe('NewTypeDialogController tests', function() {
  var $scope, $mdDialog, Types, httpBackend, controller;

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
    httpBackend.when('POST', '/api/types/').respond(200, {
      res: 'res'
    });
    httpBackend.when('GET', 'views/home.html').respond(200, {});
    Types = $injector.get('Types');
    controller = $controller('NewTypeDialogController', {
      $scope: $scope
    });
  }));

  describe('NewTypeDialogController unit tests', function() {
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
        Types.save = sinon.spy();
        $scope.create();
        httpBackend.flush();
        expect(Types.save.called).toBe(true);
        Types.save.args[0][1]();
        expect($scope.message).toBeDefined();
        expect($scope.message).toBe('You have successfully created this type');
        Types.save.args[0][2]();
        expect($scope.message).toBe('There was a problem creating a type. ' +
          'Try again or change the name of the type.');
      });
    });

  });
});
