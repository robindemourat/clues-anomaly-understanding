'use strict';

describe('Directive: moduloasidemanager', function () {

  // load the directive's module
  beforeEach(module('moduloAnomaliesApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<moduloasidemanager></moduloasidemanager>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the moduloasidemanager directive');
  }));
});
