describe('editUser DialogController tests', function() {
  var $rootScope, $scope, $mdDialog, Roles,
    Users, Auth, controller, httpBackend;

  beforeEach(function() {
    module('docman');
  });

  beforeEach(inject(function($injector) {
    var $controller = $injector.get('$controller');
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
    httpBackend.whenPUT(/\/api\/users\/(.+)/,
     undefined, undefined, ['id']).respond(200, {
      res: 'res'
    });
    httpBackend.when('GET', 'views/home.html').respond(200, {});
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope;
    $mdDialog = $injector.get('$mdDialog');
    Roles = $injector.get('Roles');
    Users = $injector.get('Users');
    Auth = $injector.get('Auth');
    Roles.query = sinon.spy();
    controller = $controller('DialogController', {
      $scope: $scope
    });
  }));

  describe('editUser DialogController unit tests', function() {
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

    describe('Roles.query test', function() {
      it('Should define Roles.query', function() {
        expect(Roles.query.called).toBe(true);
      });
    });

    describe('$scope.update test', function() {
      it('Should define $scope.update', function() {
        expect($scope.update).toBeDefined();
        Users.update = sinon.stub();
        httpBackend.flush();
        $scope.update();
        expect(Users.update.called).toBe(true);
      });
    });

  });

});
