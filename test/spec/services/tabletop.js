'use strict';

describe('Service: tabletop', function () {

  // load the service's module
  beforeEach(module('moduloAnomaliesApp'));

  // instantiate service
  var tabletop;
  beforeEach(inject(function (_tabletop_) {
    tabletop = _tabletop_;
  }));

  it('should do something', function () {
    expect(!!tabletop).toBe(true);
  });

});
