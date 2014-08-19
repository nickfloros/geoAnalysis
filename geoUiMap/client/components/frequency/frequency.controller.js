/*
 * frequency controller 
 */'use strick';

angular.module('geoUiMapApp')
  .controller('frequencyCtrl',['$scope','$http','$location','$modal', function ($scope,$http,$location,$modal) {

  var queryString2 ='/api/frequency/catid/Monday';
  var queryString1 ='/api/frequency/poiid/Monday';
	var queryString="/api/frequency/range/poiid/Monday/150/200";
	var rootQueryString = '/api/frequency/';
  var group=[];

  $scope.days = [
    {title:'Monday',id:1},
    {title:'Tuesday',id:2},
    {title:'Wednesday',id:3},
    {title:'Thursday',id:4},
    {title:'Friday',id:5},
    {title:'Saturday',id:6},
    {title:'Sunday',id:7}
  ];

  $scope.dataSet = [];
  $scope.max=200;
  $scope.dynamic=0;



	var diameter = 800,
      margin = 20,
	    format = d3.format(",d"),
//	    color = d3.scale.category20c();
      color = d3.scale.linear()
      .domain([-1, 5])
      .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
      .interpolate(d3.interpolateHcl);

  var createEntry =function(data) {
  	var buble={
  		 	name:data.name===undefined?'n/a':data.name,
  		 	size : data.value.count
  	};
  	return buble;
  };

  var processResponse = function(payload) {
  	if (payload.data.length>0)
  		_.forEach(payload.data,	function(item) { 
	  				$scope.dataSet.push(createEntry(item))
	  			});

  	if (payload.page>0) {
  		$scope.dynamic=payload.page;
  		$scope.$broadcast('get.frequency',payload.page);
  	}
  	else {
      var max = _.max($scope.dataSet,function(item) {return item.size}).size;
      var inc = Math.round(max/20);
      var set = _.groupBy($scope.dataSet,function(item){
        for (var i=0; i<19; i++)
          if (i*inc<=item.size && item.size<((i+1)*inc))
            return i;
        return 20
      });
      group.length=0;
      var i=0;
      _.forEach(set, function(item) {group.push({name : 'a_'+i,
        children:item}); i++;});
      var foo = packDataSet($scope.dataSet);
  		$scope.$broadcast('plot.frequency.graph','0');
  	}
  };

  $scope.$on('get.frequency',function(event, data){
  	$http.get(queryString+'/'+data).success(processResponse);
  });


  var packDataSet = function(dataSet) {
    var lSet = {
      name:'',
      children:[]
    };
    var localGroup=[];
    var max = _.max(dataSet,function(item) {return item.size}).size;
    var min = _.min(dataSet,function(item) {return item.size}).size;
    var inc = Math.round(max/20);
    if (inc>20) {
      var set = _.groupBy(dataSet,function(item){
        for (var i=0; i<19; i++)
          if (i*inc<=item.size && item.size<((i+1)*inc))
            return i;
        return 20;
      });
      group.length=0;
      var i=0;
      _.forEach(set, function(item) {localGroup.push({name : 'a_'+i,
        children:item}); i++;});
      _.forEach(localGroup,function(item) {
        var subSet = packDataSet(localGroup);
        if (subSet!==null);
          lSet.children.push(pSet);
        else
          lSet.children.push(item);
      });
        return lSet;
    }
    return null;
  };

	$scope.showModal=function() {
    var modalInstance = $modal.open({
	    templateUrl: 'components/frequency/modal_frequency.html',
	    controller: FrequencyModalInstanceCtrl });
		modalInstance.result.then(function (options) {
			d3.select("#freq_chart_placeholder").select("svg").remove();
			$scope.dataSet.length=0;
	  	if (options.categories.active) {
	  		queryString = rootQueryString + 'catid/'+options.day;
	  	}
	  	else {
	  		if (options.poi.options.plotAll)
	  		  queryString = rootQueryString + 'poiid/'+options.day;		
	  		else 
	  			queryString = rootQueryString + 'range/poiid/'+
	  						options.day+'/'+options.poi.options.minValue+
	  						'/'+options.poi.options.maxValue;		
	  	}
//	  	alert(queryString);
	  	$scope.$broadcast('get.frequency',0);
    });
	};
///api/frequency/range/poiid/Tuesday/150/200/0
///api/frequency/range/poiid/Friday/10/200/0
  //
  $scope.getData=function() {

//  	$scope.dataSet.length=0;
//  	$scope.$broadcast('get.frequency',0);
  };

  var classes=function (root) {
	  var classes = [];

	  function recurse(name, node) {
	    if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
	    else classes.push({packageName: name, className: node.name, value: node.size});
	  }

	  recurse(null, root);
	  return {children: classes};
	};

  $scope.$on('plot.frequency.graph',function() {
    var root = {
      name:'Monday',
      children:group
    };

    var pack = d3.layout.pack()
      .padding(2)
      .size([diameter - margin, diameter - margin])
      .value(function(d) { return d.size; });

    var svg = d3.select("#freq_chart_placeholder").append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
      .append("g")
        .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

    var focus = root,
        nodes = pack.nodes(root),
        view;

    var circle = svg.selectAll("circle")
        .data(nodes)
      .enter().append("circle")
        .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
        .style("fill", function(d) { return d.children ? color(d.depth) : null; })
        .on("click", function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); });

    var text = svg.selectAll("text")
        .data(nodes)
      .enter().append("text")
        .attr("class", "label")
        .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
        .style("display", function(d) { return d.parent === root ? null : "none"; })
        .text(function(d) { return d.name+':'+d.size; });

    var node = svg.selectAll("circle,text");

    d3.select("body")
        .style("background", color(-1))
        .on("click", function() { zoom(root); });

    zoomTo([root.x, root.y, root.r * 2 + margin]);

    function zoom(d) {
      var focus0 = focus; focus = d;

      var transition = d3.transition()
          .duration(d3.event.altKey ? 7500 : 750)
          .tween("zoom", function(d) {
            var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
            return function(t) { zoomTo(i(t)); };
          });

      transition.selectAll("text")
        .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
          .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
          .each("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
          .each("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
    }

    function zoomTo(v) {
      var k = diameter / v[2]; view = v;
      node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
      circle.attr("r", function(d) { return d.r * k; });
    }    
  });

  $scope.$on('plot.frequency.graphx',function() {
		var bubble = d3.layout.pack()
	    .sort(null)
	    .size([diameter, diameter])
	    .padding(1.5);

		var svg = d3.select("#freq_chart_placeholder").append("svg")
			.attr("id","SVG_ID")
	    .attr("width", diameter)
	    .attr("height", diameter)
	    .attr("class", "bubble");


    var root = {
  		name:'Monday',
  		children:group
  	};

	  var node = svg.selectAll(".node")
	      .data(bubble.nodes(classes(root))
	      .filter(function(d) { return !d.children; }))
	    .enter().append("g")
	      .attr("class", "node")
	      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

		  node.append("title")
		      .text(function(d) { return d.className + ": " + format(d.value); });

		  node.append("circle")
		      .attr("r", function(d) { return d.r; })
		      .style("fill", function(d) { return color(d.packageName); });

		  node.append("text")
		      .attr("dy", ".3em")
		      .style("text-anchor", "middle")
		      .text(function(d) { return d.className.substring(0, d.r / 3); });

  });


}]);


var FrequencyModalInstanceCtrl = function ($scope, $modalInstance) {

  $scope.days = [
    {title:'Monday',id:1},
    {title:'Tuesday',id:2},
    {title:'Wednesday',id:3},
    {title:'Thursday',id:4},
    {title:'Friday',id:5},
    {title:'Saturday',id:6},
    {title:'Sunday',id:7}
  ];

  $scope.graphType = {
  	selectedDay:-1,
  	day:'n/a',
  	categories : { 
  		active:true,
  		dissabled:false
  	},
  	poi: {active:false,
  		dissabled:false,
			options : {
				plotAll:true,
				minValue:0,
				maxValue:200
			}
  	}
  };


	$scope.status = {
    isopen: false
  };

	$scope.isDayActive = function(id) {
  	return id === $scope.graphType.selectedDay;
  };

  $scope.open = function() {
    $timeout(function() {
      $scope.opened = true;
    });
  };

  $scope.daySelected = function(id) {
  	$scope.graphType.selectedDay=id;
  	$scope.status.isopen=false;
  	$scope.graphType.day = $scope.days[id-1].title;
  };

  $scope.options = {plotPois:true,
                          periodStart:null,
                          periodEnd:null,
                          tripId:null};
  
  $scope.drawGraph = function () {
  	$modalInstance.close($scope.graphType);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};
