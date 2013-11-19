$(document).ready(function(){
	getLeagueNews();
});

function getLeagueNews() {
	$.ajax({
		url: "http://api.espn.com/v1/sports/basketball/nba/news/?insider=no&limit=1&apikey=7efmy99vrj5rz4g35bmdep5u",
		statusCode: {
			400: function(){
				$(".main-content").prepend("<h1>Could not load content. 400 error.</h1>")
			},
			404: function(){
				$(".main-content").prepend("<h1>Could not load content. 404 error.</h1>")
			}	
		}
	}).done(function(data){
		$(".main-content").empty();
		var headline = data.headlines[0].headline; 
		$(".main-content").append("<h1>"+headline+"</h1>")

	}); 
};
