'use strict';

describe('Service: ModuloViewParser', function () {

  // load the service's module
  beforeEach(module('moduloAnomaliesApp'));

  // instantiate service
  var ModuloViewParser;
  beforeEach(inject(function (_ModuloViewParser_) {
    ModuloViewParser = _ModuloViewParser_;
  }));

  it('should do something', function () {
    expect(!!ModuloViewParser).toBe(true);
  });

});
