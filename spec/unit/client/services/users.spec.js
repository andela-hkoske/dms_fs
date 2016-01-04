describe('Users Service Test', function() {

  beforeEach(function() {
    module('docman');
  });

  var Users, httpBackend;
  beforeEach(inject(function($injector) {
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
    Users = $injector.get('Users');
  }));

  describe('Users unit tests', function() {
    describe('Users.login unit test', function() {
      it('login should be a function', function() {
        expect(Users.login).toBeDefined();
        expect(typeof Users.login).toBe('function');
      });
      it('should test success of login function', function() {
        var error, response;
        var cb = function(err, res) {
          if (err) {
            error = err;
            response = null;
          } else {
            error = null;
            response = res;
          }
        };
        httpBackend.when('POST', '/api/users/login').respond(200, {
          res: 'res'
        });
        Users.login({
          data: 'data'
        }, cb);
        httpBackend.flush();
        expect(response.res).toBeDefined();
        expect(response.res).toBe('res');
      });
      it('should test error of login function', function() {
        var error, response;
        var cb = function(err, res) {
          if (err) {
            error = err;
            response = null;
          } else {
            error = null;
            response = res;
          }
        };
        httpBackend.when('POST', '/api/users/login').respond(500, {
          err: 'err'
        });
        Users.login({
          data: 'data'
        }, cb);
        httpBackend.flush();
        expect(error.err).toBeDefined();
        expect(error.err).toBe('err');
      });
    });

    describe('Users.getDocs unit test', function() {
      it('getDocs should be a function', function() {
        expect(Users.getDocs).toBeDefined();
        expect(typeof Users.getDocs).toBe('function');
      });

      it('should test success of getDocs function', function() {
        var error, response;
        var cb = function(err, res) {
          if (err) {
            error = err;
            response = null;
          } else {
            error = null;
            response = res;
          }
        };
        httpBackend.whenGET(/\/api\/users\/(.+)\/documents/,
          undefined, undefined, ['id']).respond(200, {
          res: 'res'
        });
        Users.getDocs(10, cb);
        httpBackend.flush();
        expect(response.res).toBeDefined();
        expect(response.res).toBe('res');
      });
      it('should test error of getDocs function', function() {
        var error, response;
        var cb = function(err, res) {
          if (err) {
            error = err;
            response = null;
          } else {
            error = null;
            response = res;
          }
        };
        httpBackend.whenGET(/\/api\/users\/(.+)\/documents/,
          undefined, undefined, ['id']).respond(500, {
          err: 'err'
        });
        Users.getDocs(10, cb);
        httpBackend.flush();
        expect(error.err).toBeDefined();
        expect(error.err).toBe('err');
      });
    });

    describe('Users.session unit test', function() {
      it('session should be a function', function() {
        expect(Users.session).toBeDefined();
        expect(typeof Users.session).toBe('function');
      });

    });

    describe('Users.getUserDocs unit test', function() {
      it('getUserDocs should be a function', function() {
        expect(Users.getUserDocs).toBeDefined();
        expect(typeof Users.getUserDocs).toBe('function');
      });
      it('should test success of getUserDocs function', function() {
        var error, response;
        var cb = function(err, res) {
          if (err) {
            error = err;
            response = null;
          } else {
            error = null;
            response = res;
          }
        };
        httpBackend.when('GET', '/api/users/documents').respond(200, {
          res: 'res'
        });
        Users.getUserDocs(cb);
        httpBackend.flush();
        expect(response.res).toBeDefined();
        expect(response.res).toBe('res');
      });
      it('should test error of getUserDocs function', function() {
        var error, response;
        var cb = function(err, res) {
          if (err) {
            error = err;
            response = null;
          } else {
            error = null;
            response = res;
          }
        };
        httpBackend.when('GET', '/api/users/documents').respond(500, {
          err: 'err'
        });
        Users.getUserDocs(cb);
        httpBackend.flush();
        expect(error.err).toBeDefined();
        expect(error.err).toBe('err');
      });
    });

    describe('Users.find unit test', function() {
      it('find should be a function', function() {
        expect(Users.find).toBeDefined();
        expect(typeof Users.find).toBe('function');
      });
      it('should test success of find function', function() {
        var error, response;
        var cb = function(err, res) {
          if (err) {
            error = err;
            response = null;
          } else {
            error = null;
            response = res;
          }
        };
        httpBackend.when('POST', '/api/users/find').respond(200, {
          res: 'res'
        });
        Users.find({
          data: 'data'
        }, cb);
        httpBackend.flush();
        expect(response.res).toBeDefined();
        expect(response.res).toBe('res');
      });
      it('should test error of find function', function() {
        var error, response;
        var cb = function(err, res) {
          if (err) {
            error = err;
            response = null;
          } else {
            error = null;
            response = res;
          }
        };
        httpBackend.when('POST', '/api/users/find').respond(500, {
          err: 'err'
        });
        Users.find({
          data: 'data'
        }, cb);
        httpBackend.flush();
        expect(error.err).toBeDefined();
        expect(error.err).toBe('err');
      });
    });


    describe('Users.logout unit test', function() {
      it('session should be a function', function() {
        expect(Users.session).toBeDefined();
        expect(typeof Users.session).toBe('function');
      });
      it('should test success of logout function', function() {
        var error, response;
        var cb = function(err, res) {
          if (err) {
            error = err;
            response = null;
          } else {
            error = null;
            response = res;
          }
        };
        httpBackend.when('GET', '/api/users/logout').respond(200, {
          res: 'res'
        });
        Users.logout(cb);
        httpBackend.flush();
        expect(response.res).toBeDefined();
        expect(response.res).toBe('res');
      });
      it('should test error of logout function', function() {
        var error, response;
        var cb = function(err, res) {
          if (err) {
            error = err;
            response = null;
          } else {
            error = null;
            response = res;
          }
        };
        httpBackend.when('GET', '/api/users/logout').respond(500, {
          err: 'err'
        });
        Users.logout(cb);
        httpBackend.flush();
        expect(error.err).toBeDefined();
        expect(error.err).toBe('err');
      });
    });

  });
});
