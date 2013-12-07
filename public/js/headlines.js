$(document).ready(function(){
	getLeagueNews();
});

function getLeagueNews() {
	//gets json of headlines
	$.ajax({
		url: "http://api.espn.com/v1/sports/basketball/nba/news/?limit=30&apikey=7efmy99vrj5rz4g35bmdep5u",
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
		url:"http://api.espn.com/v1/sports/basketball/nba/news/?teams="+teamid+"&limit=30&apikey=7efmy99vrj5rz4g35bmdep5u",
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
		var teams = {"2":"Boston Celtics","20":"Philadelphia 76ers","28":"Toronto Raptors","18":"New York Knicks","17":"New Jersey Nets","11":"Indiana Pacers","4":"Chicago Bulls","8":"Detroit Pistons","5":"Cleveland Cavaliers","15":"Milwaukee Bucks","14":"Miami Heat","1":"Atlanta Hawks","30":"Charlotte Bobcats","27":"Washington Wizards","19":"Orlando Magic","22":"Portland Trail Blazers","25":"Oklahoma City Thunder","7":"Denver Nuggets","16":"Minnesota Timberwolves","26":"Utah Jazz","12":"Los Angeles Clippers","21":"Phoenix Suns","13":"Los Angeles Lakers","9":"Golden State Warriors","23":"Sacramento Kings","24":"San Antonio Spurs","10":"Houston Rockets","6":"Dallas Mavericks","29":"Memphis Grizzlies","3":"New Orleans Pelicans"}
		document.getElementById("title").innerHTML = teams[teamid] + " News";
		
		//clears the page
		$("#headlines").empty();
		//iterates through headline data and displays html
		for(i=0;i<headlinedata.headlines.length;i++){
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
	});
};