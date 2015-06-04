'use strict';

describe('Service: markdownProcessor', function () {

  // load the service's module
  beforeEach(module('moduloAnomaliesApp'));

  // instantiate service
  var markdownProcessor;
  beforeEach(inject(function (_markdownProcessor_) {
    markdownProcessor = _markdownProcessor_;
  }));

  it('should do something', function () {
    expect(!!markdownProcessor).toBe(true);
  });

});
