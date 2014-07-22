'use strict';

describe('Service: Trip', function () {

  // load the service's module
  beforeEach(module('geoUiMapApp'));

  // instantiate service
  var Trip;
  beforeEach(inject(function (_Trip_) {
    Trip = _Trip_;
  }));

  it('should do something', function () {
    expect(!!Trip).toBe(true);
  });

});
