

	var map;
	var $=jQuery;
	var markers=[];

	var createMarker = function(point) {
		var marker = new google.maps.Marker({
	    position: new google.maps.LatLng(point.pos.lat,point.pos.lng),
	    map: map,
	    title:point.postcode
	  });
	  markers.push(marker);
	};

	var clearMarkers = function() {
		for (var i=0; i<markers.length; i++) {
			markers[i].setMap(null);
		}
	}

	var getData = function(id) {
		$.get('/api/participants/in/'+id,function(dataSet){
			clearMarkers();
			markers.length=0;
			var bounds = new google.maps.LatLngBounds();
			for (var i=0; i<dataSet.data.length; i++) {
				createMarker(dataSet.data[i]);
				bounds.extend(new google.maps.LatLng(dataSet.data[i].pos.lat,dataSet.data[i].pos.lng));
			};
			map.fitBounds(bounds);
		});
	};

	var loadScript = function(){
	  var script = document.createElement('script');
	  script.type = 'text/javascript';
	  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&' +
	      'callback=initialize';
	  document.body.appendChild(script);
	};

	function initialize() {
	  var mapOptions = {
	    zoom: 12,
	    center: new google.maps.LatLng(51.0, 0.4)
	  };
	  map = new google.maps.Map(document.getElementById('map-canvas'),
	      mapOptions);
	};

  $('#london').on('click', function(e) {
		getData('london');
  });
  $('#north').on('click', function(e) {
		getData('liverpool_manchester');
  });

  $('#reading').on('click', function(e) {
  	getData('reading');
  });

	$.get('/api/trips',function(data){
		console.log(data);
	});

	window.onload = loadScript;

