describe('HeaderCtrl Controller tests', function() {
  var $rootScope, $scope, $state, $mdDialog,
    Users, Auth, Roles, Types, Utils,
    Documents, controller, httpBackend, $controller;

  beforeEach(function() {
    module('docman');
  });

  beforeEach(inject(function($injector) {
    $controller = $injector.get('$controller');
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
    httpBackend.when('GET', '/api/users/logout').respond(200, {
      res: 'res'
    });
    httpBackend.when('GET', 'views/home.html').respond(200, {});
    Users = $injector.get('Users');
    $rootScope = $injector.get('$rootScope');
    $rootScope.currentUser = {};
    $scope = $rootScope.$new();
    $scope.user = {};
    controller = $controller('HeaderCtrl', {
      $rootScope: $rootScope,
      $scope: $scope
    });
    $scope.user.username = 'JaneDoe97';
    $scope.user.password = 'JaneDoe97';
    $state = $injector.get('$state');
    $mdDialog = $injector.get('$mdDialog');
    Auth = $injector.get('Auth');
    Types = $injector.get('Types');
    Roles = $injector.get('Roles');
    Utils = $injector.get('Utils');
    Documents = $injector.get('Documents');
  }));

  describe('HeaderCtrl unit tests', function() {
    describe('$scope.logout test', function() {
      it('Should define $scope.logout', function() {
        expect($scope.logout).toBeDefined();
        Users.logout = sinon.spy();
        $scope.logout();
        httpBackend.flush();
        expect(Users.logout.called).toBe(true);
        expect(typeof Users.logout.args[0][0]).toBe('function');
      });
    });

    describe('$scope.editUser test', function() {
      it('Should define $scope.editUser', function() {
        expect($scope.editUser).toBeDefined();
        $mdDialog.show = sinon.stub().returns($mdDialog);
        $mdDialog.then = sinon.stub();
        $scope.editUser();
        expect($mdDialog.show.called).toBe(true);
        expect(typeof $mdDialog.show.args[0][0]).toBe('object');
        expect($mdDialog.then.called).toBe(true);
        expect($mdDialog.then.args[0].length).toBe(2);
        expect(typeof $mdDialog.then.args[0][0]).toBe('function');
        expect(typeof $mdDialog.then.args[0][1]).toBe('function');
      });
    });

    describe('$scope.showTypes test', function() {
      it('Should define $scope.showTypes', function() {
        expect($scope.showTypes).toBeDefined();
        $mdDialog.show = sinon.stub().returns($mdDialog);
        $mdDialog.then = sinon.stub();
        $scope.showTypes();
        expect($mdDialog.show.called).toBe(true);
        expect(typeof $mdDialog.show.args[0][0]).toBe('object');
        expect($mdDialog.then.called).toBe(true);
        expect($mdDialog.then.args[0].length).toBe(2);
        expect(typeof $mdDialog.then.args[0][0]).toBe('function');
        expect(typeof $mdDialog.then.args[0][1]).toBe('function');
      });
    });

    describe('$scope.showRoles test', function() {
      it('Should define $scope.showRoles', function() {
        expect($scope.showRoles).toBeDefined();
        $mdDialog.show = sinon.stub().returns($mdDialog);
        $mdDialog.then = sinon.stub();
        $scope.showRoles();
        expect($mdDialog.show.called).toBe(true);
        expect(typeof $mdDialog.show.args[0][0]).toBe('object');
        expect($mdDialog.then.called).toBe(true);
        expect($mdDialog.then.args[0].length).toBe(2);
        expect(typeof $mdDialog.then.args[0][0]).toBe('function');
        expect(typeof $mdDialog.then.args[0][1]).toBe('function');
      });
    });

    describe('$scope.openMenu test', function() {
    	it('Should define $scope.openMenu', function() {
    		expect($scope.openMenu).toBeDefined();
    	});
    });

    describe('$scope.newRole test', function() {
      it('Should define $scope.newRole', function() {
        expect($scope.newRole).toBeDefined();
        $mdDialog.show = sinon.stub().returns($mdDialog);
        $mdDialog.then = sinon.stub();
        $scope.newRole();
        expect($mdDialog.show.called).toBe(true);
        expect(typeof $mdDialog.show.args[0][0]).toBe('object');
        expect($mdDialog.then.called).toBe(true);
        expect($mdDialog.then.args[0].length).toBe(2);
        expect(typeof $mdDialog.then.args[0][0]).toBe('function');
        expect(typeof $mdDialog.then.args[0][1]).toBe('function');
      });
    });

    describe('$scope.newType test', function() {
      it('Should define $scope.newType', function() {
        expect($scope.newType).toBeDefined();
        $mdDialog.show = sinon.stub().returns($mdDialog);
        $mdDialog.then = sinon.stub();
        $scope.newType();
        expect($mdDialog.show.called).toBe(true);
        expect(typeof $mdDialog.show.args[0][0]).toBe('object');
        expect($mdDialog.then.called).toBe(true);
        expect($mdDialog.then.args[0].length).toBe(2);
        expect(typeof $mdDialog.then.args[0][0]).toBe('function');
        expect(typeof $mdDialog.then.args[0][1]).toBe('function');
      });
    });

    describe('$scope.createDoc test', function() {
      it('Should define $scope.createDoc', function() {
        expect($scope.createDoc).toBeDefined();
        $mdDialog.show = sinon.stub().returns($mdDialog);
        $mdDialog.then = sinon.stub();
        $scope.createDoc();
        expect($mdDialog.show.called).toBe(true);
        expect(typeof $mdDialog.show.args[0][0]).toBe('object');
        expect($mdDialog.then.called).toBe(true);
        expect($mdDialog.then.args[0].length).toBe(2);
        expect(typeof $mdDialog.then.args[0][0]).toBe('function');
        expect(typeof $mdDialog.then.args[0][1]).toBe('function');
      });
    });

  });

});
