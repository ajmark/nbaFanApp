$(document).ready(function(){
	//GET BROWSER WINDOW HEIGHT
	var currHeight = $(window).height();
	//SET HEIGHT OF SIDEBAR AND CONTENT ELEMENTS
	$('.side-nav, .main-content').css('height', currHeight);

	//ON RESIZE OF WINDOW
	$(window).resize(function() {

		//GET NEW HEIGHT
		var currHeight = $(window).height();	
		//RESIZE BOTH ELEMENTS TO NEW HEIGHT
		$('.side-nav, .main-content').css('height', currHeight);

	});
	getLeagueNews();
});

function getLeagueNews() {
	$.ajax({
		url: "http://api.espn.com/v1/sports/basketball/nba/news/?insider=no&limit=20&apikey=7efmy99vrj5rz4g35bmdep5u",
		statusCode: {
			400: function(){
				$(".main-content").prepend("<h1>Could not load content. 400 error.</h1>")
			},
			404: function(){
				$(".main-content").prepend("<h1>Could not load content. 404 error.</h1>")
			}	
		}
	}).done(function(data){
		$("#headlines").empty();
		for(i=0;i<data.headlines.length;i++){
			var id = data.headlines[i].id;
			var headline = data.headlines[i].headline;
			var link = data.headlines[0].links.web.href;
			var description = data.headlines[i].description;
			$("#headlines").append("<div id='"+id+"' class='headline-box'></div>")
			$("#"+id).append("<h2>"+headline+"</h2>");
			if (data.headlines[i].images.length > 0){
				var url = data.headlines[i].images[0].url;
				$("#"+id).append("<img src='"+url+"'>");
			};
			$("#"+id).append("<p>"+description+"</p>");
			$("#"+id).append("<a href='"+link+"' target='_blank'>Read More</a>")
		};

	}); 
};
