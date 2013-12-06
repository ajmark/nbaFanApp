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
	if (document.documentElement.clientWidth <= 1080){
		initSmallNav();
	}
	window.onresize = function(event) {
		var nav = document.getElementById("small-nav");
		if (document.documentElement.clientWidth > 1080) {
			$('#small-nav').hide();
		};
		if (nav.childElementCount === 0){
			initSmallNav();
		} 
		if (document.documentElement.clientWidth <= 1080) {
			$('#small-nav').show();
		};
	};
	hideElements();
	selectorAction();
	$('#cookie-popup').hide();
	checkCookie();
});

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

function initSmallNav(){
	$("#small-nav").append("<ul id='navlist'></ul>")
	$("#navlist").append("<li><a href='/'>League News &raquo;</a></li>")
	$("#navlist").append("<li><a id='drop-nav'>Team Select &raquo</a></li>")
	$("#navlist").append("<li><a href='/fanmap'>Fan Map &raquo;</a></li>")
	clickActions();
}

function clickActions(){
	var a = "<ul class='navbox'><li class='navhead'>Atlantic</li><li><a>Boston Celtics</a></li><li><a>Philadelphia 76ers</a></li><li><a>Toronto Raptors</a></li><li><a>New York Knicks</a></li><li><a>New Jersey Nets</a></li></ul>"
	var c =  "<ul class='navbox'><li class='navhead'>Central</li><li><a>Indiana Pacers</a></li><li><a>Chicago Bulls</a></li><li><a>Detroit Pistons</a></li><li><a>Cleveland Cavaliers</a></li><li><a>Milwaukee Bucks</a></li></ul>"
	var se =  "<ul class='navbox'><li class='navhead'>Southeast</li><li><a>Miami Heat</a></li><li><a>Atlanta Hawks</a></li><li><a>Charlotte Bobcats</a></li><li><a>Washington Wizards</a></li><li><a>Orlando Magic</a></li></ul>"
	var nw =  "<ul class='navbox'><li class='navhead'>Northwest</li><li><a>Portland Trail Blazers</a></li><li><a>Oklahoma City Thunder</a></li><li><a>Denver Nuggets</a></li><li><a>Minnesota Timberwolves</a></li><li><a>Utah Jazz</a></li></ul?"
	var p =  "<ul class='navbox'><li class='navhead'>Pacific</li><li><a>Los Angeles Clippers</a></li><li><a>Phoenix Suns</a></li><li><a>Golden State Warriors</a></li><li><a>Los Angeles Lakers</a></li><li><a>Sacramento Kings</a></li></ul>"
	var sw =  "<ul class='navbox'><li class='navhead'>Southwest</li><li><a>San Antonio Spurs</a></li><li><a>Houston Rockets</a></li><li><a>Dallas Mavericks</a></li><li><a>Memphis Grizzlies</a></li><li><a>New Orleans Pelicans</a></li></ul>"
	
	$("#drop-nav").append("<div class='dropdown'></div>")
	$("#drop-nav .dropdown").append(a);
	$("#drop-nav .dropdown").append(c);
	$("#drop-nav .dropdown").append(se);
	$("#drop-nav .dropdown").append(nw);
	$("#drop-nav .dropdown").append(p);
	$("#drop-nav .dropdown").append(sw);

	toggleMenu();
}

function toggleMenu(){
	$('html').click(function() {
	  $(".dropdown").hide();
	});

	$("#drop-nav").click(function(event){
		event.stopPropagation();
		$(".dropdown").show();
	})
}

