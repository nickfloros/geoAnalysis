(function(nokiaFactory){
	var queryString = require('querystring');
	var mainConfig = require('../config/environment');
	var http=require('http');
	var config = mainConfig.nokia;

	var BOUNDING_BOX_OF_UK_STRING = '60.9,-10.7;49,2.2';

	nokiaFactory.geocode=function(address, callback) {

		var urlpath = config.nokiaVersion+config.geocodeCmd+_buildEnterpriseGeocoderTextSearchQueryString(address.postcode,1);
				var options = {
	  	host: config.nokiaEnterpriseGeocoderRestBaseUrl,
	  	port: 80,
	  	path: urlpath
		};
		
		if (address.pos===undefined) {
			console.log('searching '+address.postcode);
			http.get(options, function(res) {
			 	var body = '';
			  res.on('data', function(chunk) {
			    body += chunk;
			  });
			  res.on('end', function() {
			  	var res = JSON.parse(body);
			  	
			  	if (res.Response.View.length>=1) {
			  		var pos=res.Response.View[0].Result[0].Location.DisplayPosition;
			  		address.pos= {lat:pos.Latitude,lng:pos.Longitude};
					  callback();
			  	}
					else {
						console.log(options);
									if (address.postcode==='BT20 3QE') {
				address.pos= {lat:54.6567671,lng:-5.686127099999999};
				callback();
			}
			else
						callback('failed pasing result');
					}
			  });
			}).on('error', function(e) {
				console.log(e);
		  	callback(e);
			});
		}
		else {
				callback();
		}
	};

  var _buildEnterpriseGeocoderTextSearchQueryString=function(searchTerm, limit) {

        searchTerm += ' UK';

        var parameterValues = {
            searchText: searchTerm,
            bbox: BOUNDING_BOX_OF_UK_STRING,
            locationattributes: 'all', // Ensure all the available data for a result is returned
            gen: 4, // Ensure that only one result is returned even if the street is composed of more than one in postcode
            maxresults: limit,
            app_id: config.nokiaAppId,
            app_code: config.nokiaAppCode
        };

        return queryString.stringify(parameterValues);
    }

	var _formatSearchTerm=function(searchTerm) {

        var UK_STRING = 'UK';

        if (!_endsWith(searchTerm, UK_STRING)) {
            searchTerm += ' ' + UK_STRING;
        }

        return searchTerm;
    }

})(module.exports);


