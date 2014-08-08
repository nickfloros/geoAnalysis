'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://192.168.1.65:27017/poiDb'
//    uri: 'mongodb://127.0.0.1:27017/poiDb'

  },
  nokia : {
       nokiaAppId: 'mUAJf3jcUyXXkAQqvSzD',
        nokiaAppCode: '1-z6QhX-zirgS753RavCHw',
        enableErrorFileLogging: true,
        errorFileLoggingPath: '../logs/error.log',
        nokiaVersion : '/6.2',
        geocodeCmd : '/geocode.json?',

        // --------------------------------------------------------------------------------
        // When a custom location / POI search is performed, if the search term contained a
        // keyword so the search was restricted to certain categories then this weighting
        // multiplier is used to ranked these results higher.
        // --------------------------------------------------------------------------------
        keywordResultHigherWeightingMultiplier: 1.25,

        nokiaPoisLayerId: 505,
        nokiaDangerousLocationsLayerId: 358,
        nokiaCustomLocationSearchIndexName: 'layer508POI',

        nokiaEnterpriseGeocoderRestBaseUrl: 'geocoder.cit.api.here.com',
        nokiaCustomLocationRestBaseUrl: 'http://stg.api.customlocation.nokia.com/v1/',
        nokiaRoutingRestBaseUrl: 'http://route.st.nlp.nokia.com/routing/6.2/',
        nokiaReverseGeocodeRestBaseUrl: 'http://reverse.geocoder.cit.api.here.com/6.2/'
    }
  
};
