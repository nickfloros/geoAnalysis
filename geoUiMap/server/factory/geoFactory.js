/*
 * geo factory 
 */


(function(geoFactory){

	geoFactory.geoJsonPoint=function(lat, lng) {
	  var point= {
               type : "Point" ,
               coordinates : [ wayPoint.loc.coordinates[0],
								                wayPoint.loc.coordinates[1] ] 
              };
           
    return point;
	};

	geoFactory.createNearQuery=function (lat, lng, distance) {
	  var near= { $near :
          {
            $geometry : {
               type : "Point" ,
               coordinates : [ lat,lng ],
            $maxDistance : distance
          }
       }
     };
    return near;
	};
})(module.exports);