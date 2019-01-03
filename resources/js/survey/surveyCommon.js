var surveyCommonJs = {

	usekWeb : function(usePc, useMobile){
		
		var useWeb = new Object();
		var returnVal = false;
		
		var filter = "win16|win32|win64|mac|macintel";
		var vWebType = "";
		if (navigator.platform ) {
			if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
				vWebType = "MOBILE";
				if ('1' == useMobile) {
					returnVal = true;
				}
			} else {
				vWebType = "PC";
				if ('1' == usePc) {
					returnVal = true;
				}
			}
		}
		useWeb.value = returnVal;
		useWeb.type = vWebType;
		return useWeb;
	},
	setNotUseKey : function () {
		
		/*$(document).keydown(function(e){   
	        if(e.target.nodeName != "INPUT" && e.target.nodeName != "TEXTAREA"){       
	            if(e.keyCode === 8){   
	            	return false;
	            }
	        }
	    });
	    window.history.forward(0);*/
	},
	setAjaxStartEnd : function () {
		
	},
	replaceAll : function(str, searchStr, replaceStr) {
		return str.split(searchStr).join(replaceStr);
	}
}

