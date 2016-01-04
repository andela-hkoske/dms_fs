describe('DocDialogController tests', function() {
  var $scope, $mdDialog, Types, Roles, Documents, httpBackend, controller;

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
    httpBackend.when('POST', '/api/documents/').respond(200, {
      res: 'res'
    });
    httpBackend.when('GET', 'views/home.html').respond(200, {});
    Roles = $injector.get('Roles');
    Types = $injector.get('Types');
    Documents = $injector.get('Documents');
    Roles.query = sinon.stub();
    Types.query = sinon.stub();
    controller = $controller('DocDialogController', {
      $scope: $scope
    });
  }));

  describe('DocDialogController unit tests', function() {
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
        Roles.query.args[0][0]('hannah');
        expect($scope.roles).toBeDefined();
        expect($scope.roles).toBe('hannah');
      });
    });

    describe('Types.query test', function() {
      it('Should define Types.query', function() {
        expect(Types.query.called).toBe(true);
        Types.query.args[0][0]('hannah');
        expect($scope.types).toBeDefined();
        expect($scope.types).toBe('hannah');
      });
    });

    describe('$scope.create test', function() {
      it('Should define $scope.create', function() {
        expect($scope.create).toBeDefined();
        Documents.save = sinon.stub();
        $scope.roles = [{
          checked: 'checked',
          name: 'name'
        }, {
          name: 'name'
        }];
        $scope.doc = {
          roles: [],
          type: {
            _id: '_id'
          }
        };
        $scope.create();
        httpBackend.flush();
        expect(Documents.save.called).toBe(true);
        Documents.save.args[0][1]();
        expect($scope.message).toBeDefined();
        expect($scope.message)
        .toBe('You have successfully created this document. ');
        Documents.save.args[0][2]();
        expect($scope.message)
        .toBe('There was a problem creating this document.');
      });
    });

  });
});
