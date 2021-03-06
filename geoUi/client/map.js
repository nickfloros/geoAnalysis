

	var map;
	var $=jQuery;
	var markers=[];
	var markerCluster = null;
	var useMarkCluster=false;

	var createMarker = function(point) {
try {
		if (point.pos!=null && !isNaN(point.pos.lat)){
		var marker = new google.maps.Marker({
	    position: new google.maps.LatLng(point.pos.lat,point.pos.lng),
	    title:point.postcode
	  });
	  markers.push(marker);
	  return true
	}
}
catch (e) {
//	console.log(point);
}
return false;
	};

	var clearMarkers = function() {
		for (var i=0; i<markers.length; i++) {
			markers[i].setMap(null);
		}
	}

	var mapBounds = null;
	var emailList = [];

	var getData = function(id) {
		clearMarkers();
		markers.length=0;
		mapBounds = new google.maps.LatLngBounds();
		if (markerCluster!==null) 
			markerCluster.clearMarkers();
		$(window).trigger('getData',{id:id,page:0});
	};

	$(window).on('getData',function(event,plotReq) {
		$.get('/api/participants/in/'+plotReq.id+'/'+plotReq.page,function(dataSet){
			var bounds = new google.maps.LatLngBounds();
			for (var i=0; i<dataSet.data.length; i++) {
				if (createMarker(dataSet.data[i])){
				 mapBounds.extend(new google.maps.LatLng(dataSet.data[i].pos.lat,dataSet.data[i].pos.lng));
				 emailList.push(dataSet.data[i].email);
				}
				else {
				//	console.log(dataSet.data[i].postcode);
				}
			};
			if (dataSet.page===-1) {
				map.fitBounds(mapBounds);
				if (useMarkCluster) {
					if (markerCluster===null) 
						markerCluster = new MarkerClusterer(map,markers);
					else 
						markerCluster.addMarkers(markers);
				}
				else {
					for(var i=0; i<markers.length;i++)
						markers[i].setMap(map);
				}
			}
			else{
				$(window).trigger('getData',{id:plotReq.id,page:plotReq.page+1});
			}
		});

	});


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
		getData('liverpool|manchester');
  });

  $('#reading').on('click', function(e) {
  	getData('reading');
  });

  $('#birmingham').on('click',function(e) {
  	getData('birm');
  });

  $('#all').on('click', function(e) {
  	getData('master');
  });

	$.get('/api/trips',function(data){
	//	console.log(data);
	});

	$('#showEmails').on('click',function(e) {
		$('#emailModal').modal('toggle');
		for(var i=0; i<emailList.length; i++) {
			$('#emailTable').append("<tr><td>" + emailList[i]+ "</td></tr>");
		}
	});

	$('#closeEmailModal').on('click',function(e) {
		$('#emailModal').modal('toggle');
	});

	$('#useMarkCluster').on('click',function(e) {
		useMarkCluster = useMarkCluster===false?true:false;
		if (markers.length>0) {
			if (useMarkCluster) {
				if (markerCluster===null) markerCluster=new MarkerClusterer(map,markers);
				else	markerCluster.addMarkers(markers);
			}
			else {
				markerCluster.clearMarkers();
				for (var i=0;i<markers.length;i++)
					markers[i].setMap(map);
			}
		}
	});

	window.onload = loadScript;

