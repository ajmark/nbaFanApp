$(document).ready(function(){
	getLeagueNews();
});

function getLeagueNews() {
	//gets json of headlines
	$.ajax({
		url: "http://api.espn.com/v1/sports/basketball/nba/news/?insider=no&limit=30&apikey=7efmy99vrj5rz4g35bmdep5u",
		statusCode: {
			400: function(){
				$(".main-content").prepend("<h1>Could not load content. 400 error.</h1>")
			},
			404: function(){
				$(".main-content").prepend("<h1>Could not load content. 404 error.</h1>")
			}	
		}
	}).done(function(data){
		document.getElementById("title").innerHTML = "League News";
		//clears the page
		$("#headlines").empty();
		//iterates through data and displays html
		for(i=0;i<data.headlines.length;i++){
			var id = data.headlines[i].id;
			var headline = data.headlines[i].headline;
			var link = data.headlines[0].links.web.href;
			var description = data.headlines[i].description;
			var date = data.headlines[i].published; 

			//formats date
			date = date.split("T");
			date = date[0].split("-");
			date = date[1] + "/" + date[2] + "/" + date[0];

			$("#headlines").append("<div id='"+id+"' class='headline-box'></div>")
			$("#"+id).append("<h2>"+headline+"</h2>");
			$("#"+id).append("<h3>"+date+"</h3>");
			if (data.headlines[i].images.length > 0){
				var url = data.headlines[i].images[0].url;
				$("#"+id).append("<img src='"+url+"'>");
			};
			$("#"+id).append("<p>"+description+"</p>");
			$("#"+id).append("<a href='"+link+"' target='_blank'>Continue reading...</a>")
		};
		$(".groupings").hide();
		$("#divisions").show();

	}); 
};

function getTeamNews(teamid) {
	//gets json of headlines
	$.ajax({
		url:"http://api.espn.com/v1/sports/basketball/nba/news/?limit=100&apikey=7efmy99vrj5rz4g35bmdep5u",
		statusCode: {
			400: function(){
				$(".main-content").prepend("<h1>Could not load content. 400 error.</h1>")
			},
			404: function(){
				$(".main-content").prepend("<h1>Could not load content. 404 error.</h1>")
			}	
		}
	}).done(function(data){
		headlinedata = data;
		console.log(document.activeElement);
		document.getElementById("title").innerHTML = document.activeElement.id + " News";

		//clears the page
		$("#headlines").empty();
		//iterates through headline data and displays html
		for(i=0;i<headlinedata.headlines.length;i++){
			for(j=0;j<headlinedata.headlines[i].categories.length;j++){
				if (headlinedata.headlines[i].categories[j].teamId === teamid){
					var id = headlinedata.headlines[i].id;
					var headline = headlinedata.headlines[i].headline;
					var link = headlinedata.headlines[0].links.web.href;
					var description = headlinedata.headlines[i].description;
					var date = headlinedata.headlines[i].published; 

					//formats date
					date = date.split("T");
					date = date[0].split("-");
					date = date[1] + "/" + date[2] + "/" + date[0];

					$("#headlines").append("<div id='"+id+"' class='headline-box'></div>")
					$("#"+id).append("<h2>"+headline+"</h2>");
					$("#"+id).append("<h3>"+date+"</h3>");

					if (headlinedata.headlines[i].images.length > 0){
						var url = headlinedata.headlines[i].images[0].url;
						$("#"+id).append("<img src='"+url+"'>");
					};

					$("#"+id).append("<p>"+description+"</p>");
					$("#"+id).append("<a href='"+link+"' target='_blank'>Continue reading...</a>");
				};
			};	
		};
	});
};