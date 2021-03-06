$(document).ready(function(){
	//loads the google map
	google.maps.event.addDomListener(window, 'load', initialize);
});

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

  	getPins(map);
 }

function getLocation(){
  if (navigator.geolocation) {
  	navigator.geolocation.getCurrentPosition(function(position){
  		var lat = position.coords.latitude;
    	var lngt = position.coords.longitude;
    	var cookie = document.cookie;

    	//formats the cookie data to get the team name and cookie id
    	cookie = cookie.split("=");
    	data = cookie[1];
    	var data = (data.split("%7E"));
    	var id = data[1];
    	var team = data[0];
		team = team.split("%20");
    	team = team.join(" ");

		$.ajax({
			url: "fanmap/location",
			type:"put", 
			data: {"c_id":id,"name":team,"lat":lat,"lngt":lngt},
			statusCode: {
				400: function(){
					$(".main-content").prepend("<h1>Could not load content. 400 error.</h1>")
				},
				404: function(){
					$(".main-content").prepend("<h1>Could not load content. 404 error.</h1>")
				}	
			}
		}).done(function(data){
			initialize();
		});
  	});
  }
  else {
  	x.innerHTML="Geolocation is not supported by this browser.";
  };
};

function getPins(map){
	$.ajax({
		url:"fanmap/display",
		type:"get",
		statusCode: {
			400: function(){
				$(".main-content").prepend("<h1>Could not load content. 400 error.</h1>")
			},
			404: function(){
				$(".main-content").prepend("<h1>Could not load content. 404 error.</h1>")
			}	
		}
	}).done(function(data){
		//After pins collected from database, displays them on map 
		for (i=0; i < data.length; i++){
			var latlng = new google.maps.LatLng(data[i].lat,data[i].lngt);
			var marker = new google.maps.Marker({
				position:latlng,
				title:data[i].name,
				map: map
			});
  			infoWindow = new google.maps.InfoWindow({
  			    content: ""
  			});
    		google.maps.event.addListener(marker, 'click', function() { 
    		   var contentString = "<h1>"+this.title+"</h1>";
    		   infoWindow.setContent(contentString);
    		   infoWindow.open(map,this); 
    		}); 
		};
	});
}

