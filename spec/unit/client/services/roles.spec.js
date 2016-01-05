describe('Roles Service Test', function() {

  beforeEach(function() {
    module('docman');
  });

  var Roles, httpBackend;
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
    Roles = $injector.get('Roles');
  }));

  describe('Roles.find unit tests', function() {
    it('find should be a function', function() {
      expect(Roles.find).toBeDefined();
      expect(typeof Roles.find).toBe('function');
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
        httpBackend.when('POST', '/api/roles/find').respond(200, {
          res: 'res'
        });
        Roles.find({
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
        httpBackend.when('POST', '/api/roles/find').respond(500, {
          err: 'err'
        });
        Roles.find({
          data: 'data'
        }, cb);
        httpBackend.flush();
        expect(error.err).toBeDefined();
        expect(error.err).toBe('err');
      });
  });

});
