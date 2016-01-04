describe('Utils Service Test', function() {

  beforeEach(function() {
    module('docman');
  });

  var Utils,
    $mdDialog,
    $mdToast;
  beforeEach(inject(function($injector) {
    Utils = $injector.get('Utils');
    $mdToast = $injector.get('$mdToast');
    $mdDialog = $injector.get('$mdDialog');
  }));

  describe('Utils unit tests', function() {
    it('toast should be a function', function() {
      expect(Utils.toast).toBeDefined();
      expect(typeof Utils.toast).toBe('function');
    });

    it('$mdToast.show should be called', function() {
      spyOn($mdToast, 'show');
      Utils.toast('text');
      expect($mdToast.show).toHaveBeenCalled();
    });

    it('$mdToast and its method show should be defined', function() {
      expect($mdToast.show).toBeDefined();
      expect(typeof $mdToast.show).toBe('function');
    });

    it('dialog should be a function', function() {
      expect(Utils.dialog).toBeDefined();
      expect(typeof Utils.dialog).toBe('function');
    });

    it('$mdDialog and its method show should both be defined', function() {
      expect($mdDialog.show).toBeDefined();
      expect(typeof $mdDialog.show).toBe('function');
      $mdDialog.show = sinon.stub().returns($mdDialog);
      $mdDialog.then = sinon.stub();
      Utils.dialog('title', 'message', {
        event: 'event'
      }, function() {});
      expect($mdDialog.show.called).toBe(true);
      expect(typeof $mdDialog.show.args[0][0]).toBe('object');
      expect($mdDialog.then.called).toBe(true);
      expect($mdDialog.then.args[0].length).toBe(2);
      expect(typeof $mdDialog.then.args[0][0]).toBe('function');
      expect(typeof $mdDialog.then.args[0][1]).toBe('function');
    });
  });
});
