'use strict';

describe('Directive: twitterMsgOEmbed', function () {

  // load the directive's module
  beforeEach(module('moduloAnomaliesApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<twitter-msg-o-embed></twitter-msg-o-embed>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the twitterMsgOEmbed directive');
  }));
});
