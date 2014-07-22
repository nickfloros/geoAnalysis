'use strict';

describe('Service: F', function () {

  // load the service's module
  beforeEach(module('geoUiMapApp'));

  // instantiate service
  var F;
  beforeEach(inject(function (_F_) {
    F = _F_;
  }));

  it('should do something', function () {
    expect(!!F).toBe(true);
  });

});
