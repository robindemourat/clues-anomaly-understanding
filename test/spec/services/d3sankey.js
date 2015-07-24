'use strict';

describe('Service: d3sankey', function () {

  // load the service's module
  beforeEach(module('moduloAnomaliesApp'));

  // instantiate service
  var d3sankey;
  beforeEach(inject(function (_d3sankey_) {
    d3sankey = _d3sankey_;
  }));

  it('should do something', function () {
    expect(!!d3sankey).toBe(true);
  });

});
