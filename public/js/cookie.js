function getCookie(c_name) {
  
  var c_value = document.cookie;
  var c_start = c_value.indexOf(" " + c_name + "=");
  //determines the value of the cookie data and returns the value
  if (c_start == -1) {
    c_start = c_value.indexOf(c_name + "=");
  };
  if (c_start == -1){
    c_value = null;
  } 
  else {
    c_start = c_value.indexOf("=", c_start) + 1;
    var c_end = c_value.indexOf(";", c_start);

    if (c_end == -1) {
      c_end = c_value.length;
    };

    c_value = unescape(c_value.substring(c_start,c_end));
  }
  return c_value;
};

function setCookie(c_name,value,exdays) {
  
  var exdate=new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
  document.cookie=c_name + "=" + c_value;
};

function checkCookie() {

var favteam=getCookie("favteam");
  if (favteam!=null && favteam!=""){
    console.log(document.cookie);
    return;
  }
  else {
    donpopup();
    // username=prompt("Please enter your name and select your favorite team","");
    // if (favteam!=null && favteam!="") {
    //   setCookie("favteam",favteam,365);
    // }
  }
};

function donpopup() {
  $('#cookie-popup').show();
  $('header,#title,#headlines,#selector').fadeTo("fast",0.4, function(){
  });
  $('#selector').hide();
  return false;
};

function submitCookieInfo(){
  event.preventDefault();
  var select = document.getElementById("favteam-select");
  var name = select.options[select.selectedIndex].text;
  setCookie("favteam",name,365);
  closepop();
};

function closepop() {
  $('#cookie-popup').hide();
  $('header,#title,#headlines,#selector').fadeTo("fast",1, function(){
  });
  $('#selector').show();
  $('#selector').css("display","table");
};

