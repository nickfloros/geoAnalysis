/*
 * graph controller
 */
'use strick';

angular.module('geoUiMapApp')
  .controller('GraphCtrl',['$scope','$http','tripService', function ($scope,$http, tripService) {
  $scope.chart={};
	$scope.data = {
		pageCount:0,
		packageNames: [],
  	matrix: [] // B doesn't depend on A or Main
	};
	$scope.max=117;

	$scope.chart = d3.chart.dependencyWheel()
		   .width(900)    // also used for height, since the wheel is in a a square
	  	 .margin(150)   // used to display package names
	  	 .padding(.02); // separating groups in the wheel

	 $scope.dynamic=0;
	var getName = function(code) {
		var t = code.address.text.split(',')
		return t[0]+' '+t[1];
	}

	var processResponce = function(graph) {
		$scope.data.pageCount++;
		if ($scope.max===0) $scope.max=graph.totalSize;
		$scope.dynamic=$scope.data.pageCount;
		$scope.data.matrix.push(graph.data.matrix);
		$scope.data.packageNames.push(getName(graph.data.locs.revGeocode));			
		if ($scope.data.pageCount<graph.totalSize)
			$scope.$broadcast('get.graph');
		else 
			$scope.$broadcast('plot.graph');
	};

	$scope.$on('get.graph',function(){
		$http.get('/api/graph?page='+$scope.data.pageCount).success(processResponce);
	})

	$scope.$on('plot.graph', function() {
		d3.select('#chart_placeholder')
		   .datum($scope.data)
		   .call($scope.chart);

	});

	$scope.showGraph = function() {
		$scope.$broadcast('get.graph');
	};

}]);