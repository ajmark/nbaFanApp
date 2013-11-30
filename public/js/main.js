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
	hideElements();
	getLeagueNews();
	selectorAction();
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
		//clears the page
		$("#headlines").empty();
		//iterates through data and displays html
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
			$("#"+id).append("<a href='"+link+"' target='_blank'>Continue reading...</a>")
		};

	}); 
};

function getTeamNews(teamid) {
	//gets json of headlines
	$.ajax({
		url:"http://api.espn.com/v1/sports/basketball/nba/news/?limit=50&apikey=7efmy99vrj5rz4g35bmdep5u",
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
					$("#headlines").append("<div id='"+id+"' class='headline-box'></div>")
					$("#"+id).append("<h2>"+headline+"</h2>");
					if (headlinedata.headlines[i].images.length > 0){
						var url = headlinedata.headlines[i].images[0].url;
						$("#"+id).append("<img src='"+url+"'>");
					};
					$("#"+id).append("<p>"+description+"</p>");
					$("#"+id).append("<a href='"+link+"' target='_blank'>Continue reading...</a>")
				};
			};	
		}; 
	});
};

function hideElements(){
	$(".side-nav").hide();
	$(".groupings").hide();
}

function selectorAction() {
	//When cursor enters and exits selector tab
	$("#selector").mouseenter(function(){
		$(".side-nav").show();
	});
	$(".side-nav").mouseleave(function(){
		$(".side-nav").hide();
	});

	//sidebar navigation
	$("#atlantic").click(function(){
		$("#atlantic-div").show();
		$("#divisions").hide();
	});
	$("#central").click(function(){
		$("#central-div").show();
		$("#divisions").hide();
	});
	$("#southeast").click(function(){
		$("#southeast-div").show();
		$("#divisions").hide();
	});
	$("#northwest").click(function(){
		$("#northwest-div").show();
		$("#divisions").hide();
	});
	$("#pacific").click(function(){
		$("#pacific-div").show();
		$("#divisions").hide();
	});
	$("#southwest").click(function(){
		$("#southwest-div").show();
		$("#divisions").hide();
	});

	//go back
	$(".back").click(function(){
		$(".groupings").hide();
		$("#divisions").show();
	});
}





