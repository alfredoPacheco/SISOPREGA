  var sBrowserName = "";
  var sBrowserVersion = "";
  jQuery.each(jQuery.browser, function(sIndex, sValue) {
    if(sIndex=="version") sBrowserVersion = sValue;
    else if(sValue==true) sBrowserName = sIndex;
  });
  
  function validateBrowserEnyoOne(){
	  var bValidBrowser=true;
	  var sRedirect=null;
	  var sMsgBox="Esta usando un explorador de internet incompatible, sera redirigido a una pagina para actualizar";
	    switch(sBrowserName){
	    	case "webkit":
	    	case "safari":
	    	case "ipod":
	    	case "ipad":
	    	case "iphone":
	    	case "android":
	    	case "windows phone":
	    		break;
	    	default:
	    		bValidBrowser=false;
	    		sRedirect="https://www.google.com/intl/en/chrome/browser/";
	    		break;
	    }
	    if(!bValidBrowser){
	    	alert(sMsgBox);
	    	window.location = sRedirect;
	    }
 }
function validateBrowserEnyoTwo(){
	  var bValidBrowser=true;
	  var sRedirect=null;
	  var sMsgBox="Esta usando un explorador de internet incompatible, sera redirigido a una pagina para actualizar";
	    switch(sBrowserName){
	    	case "msie":
	    		var OS = navigator.appVersion;
		    	if(parseInt(sBrowserVersion)<9 || (OS.indexOf("Windows NT 5.1") != -1) || (OS.indexOf("Windows XP") != -1) ){
		    		bValidBrowser=false;
		    		sRedirect="http://windows.microsoft.com/en-US/internet-explorer/download-ie"; 
		    	}else{
		    		bValidBrowser=false;
		    		sRedirect="https://www.google.com/intl/en/chrome/browser/";		    	
		    	}
		    	break;
	    	case "mozilla":
		    	if(parseInt(sBrowserVersion)<18){
		    		bValidBrowser=false;
		    		sRedirect="http://www.mozilla.org/en-US/firefox/new/"; 
		    	}
		    	break;
	    	case "webkit":
	    	case "safari":
	    	case "ipod":
	    	case "ipad":
	    	case "iphone":
	    	case "android":
	    	case "windows phone":
	    		break;
	    	default:
	    		bValidBrowser=false;
	    		sRedirect="https://www.google.com/intl/en/chrome/browser/";
	    		break;
	    }
	    if(!bValidBrowser){
	    	alert(sMsgBox);
	    	window.location = sRedirect;
	    }
 }