'use strict';

describe('Directive: moduloDicto', function () {

  // load the directive's module
  beforeEach(module('moduloAnomaliesApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<modulo-dicto></modulo-dicto>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the moduloDicto directive');
  }));
});
