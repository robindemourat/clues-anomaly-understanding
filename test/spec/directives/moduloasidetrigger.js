'use strict';

describe('Directive: moduloAsideTrigger', function () {

  // load the directive's module
  beforeEach(module('moduloAnomaliesApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<modulo-aside-trigger></modulo-aside-trigger>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the moduloAsideTrigger directive');
  }));
});
