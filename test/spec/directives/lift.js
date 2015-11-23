'use strict';

describe('Directive: lift', function () {

  // load the directive's module
  beforeEach(module('moduloAnomaliesApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<lift></lift>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the lift directive');
  }));
});
