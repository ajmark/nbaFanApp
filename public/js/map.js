function initialize() {
	var featureOpts = [
		{
		  stylers: [
		    { hue: '#890000' },
		    { visibility: 'simplified' },
		    { gamma: 0.5 },
		    { weight: 0.5 }
		  ]
		},
		{
		  elementType: 'labels',
		  stylers: [
		    { visibility: 'off' }
		  ]
		},
		{
		  featureType: 'water',
		  stylers: [
		    { color: '#890000' }
		  ]
		}
	];

   	var mapOptions = {
    	center: new google.maps.LatLng(40.913513,-95.888672),
     	zoom: 4,
    	mapTypeControlOptions: {
    	  mapTypeIds: [google.maps.MapTypeId.ROADMAP, "espn_fan_map"]
    	},
    	mapTypeId: "espn_fan_map"
   	};
   	
   	var map = new google.maps.Map(document.getElementById("map-canvas"),
       	mapOptions);

  	var styledMapOptions = {
    	name: 'ESPN Fan Map'
  	};

  	var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

  	map.mapTypes.set("espn_fan_map", customMapType);
 }

 google.maps.event.addDomListener(window, 'load', initialize);