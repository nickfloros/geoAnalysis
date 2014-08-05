'use strict';



angular.module('geoUiMapApp',[])
  .factory('tripFactory', function ($http) {
    // Service logic
    // ...

    var uri = '/api/trip';

    // Public API here
    return {
      trip: function (id) {
        $http.get(uri,{params:{'id':id}}).success(function(data, status, headers,config){
          return data;
        }).error(function(data, status, headers,config){
          return "error: "+status;
        });
      },
      all:function() {
        $http.get(uri+'/all').success(function(data, status, headers,config){
          return data;
        }).error(function(data, status, headers, config){
          return "error: "+status;
        });
      },
      weekday:function(weekday) {
        $http.get(uri+'/weekday',{params:{'weekday':weekday}}).success(function(data, status, headers,config){
          return data;
        }).error(function(data, status, headers,config){
          return "error: "+status;
        });

      }
    };
  });


angular.module('geoUiMapApp',[])
  .factory('tripService', ['tripFactory',function (tripFactory){
    this.getTrip = function(id){
      return tripFactory.getTrip(id).then(function(data) {
        return JSON.parse(data);
      });
    };
  }]);
