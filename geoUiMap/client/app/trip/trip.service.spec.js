'use strict';

describe('Service: trip', function () {

  // load the service's module
  beforeEach(module('geoUiMapApp'));

  // instantiate service
  var trip;
  beforeEach(inject(function (_trip_) {
    trip = _trip_;
  }));

  it('should do something', function () {
    expect(!!trip).toBe(true);
  });

});
