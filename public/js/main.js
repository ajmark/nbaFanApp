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
	touchActions();
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
	$("#navlist").append("<li><a id='dropdown'>Team Select &raquo</a></li>")
	$("#navlist").append("<li><a href='/fanmap'>Fan Map &raquo;</a></li>")
}





