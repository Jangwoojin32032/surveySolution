
var commonJs = {
		
	// Today 와 비교하여 boolean값 return
	// return (true : endDate > today , false : endDate <= today)
	checkEndDate : function (endDate) {
		
		var returnVal = false; 
    	var d= new Date();
    	var year = d.getFullYear();
    	var month = d.getMonth()+1;
    	var day = d.getDate();
    	
    	if(month < 10){ month = "0" + month ; }
    	if(day < 10){ day = "0" + day ; }
    	
    	if (parseInt(year +""+ month +""+ day +""+ "000000") < parseInt(endDate)) {
    		returnVal = true;
    	}
    	return returnVal;
	}
	// Date 년,월,일 사이에 Text 삽입 후 return
	, substrDateYyyyMmDd : function (strDate, text) {
		
		var year = strDate.substring(0,4);
		var month = strDate.substring(4,6);
		var day = strDate.substring(6,8);
		
		return year + text + month + text + day ;
	}
	// check null
	, checkValidation : function (checkNames, returnText, type) {

		var textType = "";
		if ("select" == type) {
			textType = " :selected";
		} else if ("radio" == type) {
			textType = ":checked";
		} else if ("checkbox" == type) {
			textType = ":checked";
		} else {
			textType = "";
		}
		// name값으로만 체크
		var checkName = $('[name="'+ checkNames +'"]' + textType).val();
		//console.log('checkValidation checkName',checkName);
		
		if (null == checkName || "" == checkName) {
			alert(returnText);
			$('[name="'+ checkNames +'"]').focus();
			return false;
		} else {
			return true;
		}
	}
	// check null
	, checkValidation2 : function (checkIds, count, returnText, type) {

		var textType = "";
		if ("select" == type) {
			textType = " :selected";
		} else if ("radio" == type) {
			textType = ":checked";
		} else if ("checkbox" == type) {
			textType = ":checked";
		} else {
			textType = "";
		}
		// name값으로만 체크
		var checkId = $('#'+ checkIds + count + textType).val();
		//console.log('checkValidation #','#'+ checkIds + count + textType);
		//console.log('checkValidation checkId',checkId);
		
		if (null == checkId || "" == checkId) {
			alert(returnText);
			$('#'+ checkIds + count).focus();
			return false;
		} else {
			return true;
		}
	}
	// 숫자만
	, checkOnlyNum : function (checkNames) {
		// name값으로만 체크
		var checkName = $('[name="'+ checkNames +'"]').val();
		if (null != checkName && "" != checkName) {
			
			var chk_num = checkName.search(/[0-9]/g); 
			
			if(chk_num < 0){
				alert('숫자만 가능합니다.');
				$('[name="'+ checkNames +'"]').focus();
				return false;
			} else {
				return true;
			}
			
		} else {
			return false;
		}
	}
	// 숫자만 입력 가능 ( keydown, keyup event 시 처리 )
	, onkeyDownOnlyNum : function (checkNames) {
		
		$('[name="'+ checkNames +'"]').keydown(function (event) {
			
			event = event || window.event;
			var keyID = (event.which) ? event.which : event.keyCode;
			if( ( keyID >=48 && keyID <= 57 ) || ( keyID >=96 && keyID <= 105 ) || keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 ) {
				return;
			} else {
				return false;
			}
		});
		
		$('[name="'+ checkNames +'"]').keyup(function (event) {
			
			event = event || window.event;
			var keyID = (event.which) ? event.which : event.keyCode;
			if ( keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 ) 
				return;
			else
				event.target.value = event.target.value.replace(/[^0-9]/g, "");
		});
	}
	// 영문 숫자 조합
	, checkOnlyEngNum : function (checkNames) {
		// name값으로만 체크
		var checkName = $('[name="'+ checkNames +'"]').val();
		if (null != checkName && "" != checkName) {
			
			var chk_num = checkName.search(/[0-9]/g); 
			var chk_eng = checkName.search(/[a-z]/ig);
			//console.log('chk_num',chk_num);
			//console.log('chk_eng',chk_eng);
			
			if(chk_num < 0 || chk_eng < 0){
				alert('영문과 숫자 조합만 가능합니다.');
				$('[name="'+ checkNames +'"]').focus();
				return false;
			} else {
				return true;
			}
			
		} else {
			return false;
		}
	}
	// 3자리 수마다 콤마 삽입
	, setCommaNum : function(num) {
		
		var str = num;
		if (num.length > 3 || num >= 1000 ) {
			
			//num = Math.round(num/1000);
			var len, point, str;  
			
			num = num + "";  
			point = num.length % 3 ;
			len = num.length;  
			str = num.substring(0, point);  
			while (point < len) {  
				if (str != "") str += ",";  
				str += num.substring(point, point + 3);  
				point += 3;  
			}  
		}
        return str;
    }    
	// 길이만큼 절삭
	, setChangeToFilx : function(num, len) {
		return num.toFixed(len);
	}
	, popupOpenerAlert : function (text) {
    	alert(text);
    	return false;
    }
	// 텍스트의 길이를 체크하여 길이를 표시
	// checkId : 체크되는 대상 name , setLenText : 체크된 길이를 표시할 name , maxLen : 체크할 길이
	, checkTextLength : function (checkId, setLenText, maxLen) {
		
		var checkIdName = '[name="'+ checkId +'"]';
		var setLenTextName = '[name="'+ setLenText +'"]';
		//console.log('checkIdName',checkIdName);
		//console.log('setLenTextName',setLenTextName);
		
		var cTmp = "";
    	var cMemocnt = 0;
    	var cMaxcnt = parseInt(maxLen);
    	var contents = $(checkIdName).val();
    	var cLength = contents.length;
    	
    	for (var i=0; i<cLength; i++) {
    		ctmp = contents.charAt(i);
    		if(escape(ctmp).length > 4){
    			cMemocnt += 2;
    		}else{
    			cMemocnt++;
    		}
    	}
    	
    	$(setLenTextName).html('');
    	$(setLenTextName).html(cMemocnt +'/200byte (최대 200byte / 한글 100자)');
    	
    	if(cMemocnt > cMaxcnt){
    		alert(cMaxcnt+"bytes 까지만 쓰실 수 있습니다.");
    		return;
    	}
	}, setStringToDate : function (str) {
		var y = str.substr(0, 4);
	    var m = str.substr(4, 2);
	    var d = str.substr(6, 2);
	    return new Date(y,m-1,d);
	}, 
	// 주민번호로 만 나이 구하기
	getJuminAge : function (jumin1, jumin2) {
		
		var curDate = ""; // 현재일자
		var tmpAge = 0; // 임시나이
		
		var curDateObj = new Date(); // 날짜 Object 생성
		var curYear = curDateObj.getFullYear(); // 현재년도
		var curMonth = curDateObj.getMonth() + 1; // 현재월
		var curDay = curDateObj.getDate(); // 현재일
		
		if(curMonth < 10) curMonth = "0" + curMonth; // 현재 월이 10보다 작을경우 '0' 문자 합한다
		if(curDay < 10) curDay = "0" + curDay; // 현재 일이 10보다 작을경우 '0' 문자 합한다
		curDate = curYear + curMonth + curDay;
		
		var genType = jumin2.substring(0, 1); // 주민번호 뒷자리 성별구분 문자 추출

		if(genType <= 2) {
			tmpAge = curYear - (1900 + parseInt(jumin1.substring(0, 2))); // 1, 2 일경우
		} else {
			tmpAge = curYear - (2000 + parseInt(jumin1.substring(0, 2))); // 그 외의 경우
		}

		var tmpBirthday = jumin1.substring(2, 6); // 주민번호 4자리 생일문자 추출
		
		if(curDate < (curYear + tmpBirthday)) {
			tmpAge += 1;
		}
		return tmpAge;
	},
	// 년도로 만 나이 구하기
	getYearAge : function (year,jumin1) {
		
		var curDate = ""; // 현재일자
		var tmpAge = 0; // 임시나이
		
		var curDateObj = new Date(); // 날짜 Object 생성
		var curYear = curDateObj.getFullYear(); // 현재년도
		var curMonth = curDateObj.getMonth() + 1; // 현재월
		var curDay = curDateObj.getDate(); // 현재일
		
		if(curMonth < 10) curMonth = "0" + curMonth; // 현재 월이 10보다 작을경우 '0' 문자 합한다
		if(curDay < 10) curDay = "0" + curDay; // 현재 일이 10보다 작을경우 '0' 문자 합한다
		curDate = curYear + curMonth + curDay;
		
		var yearType = year.substring(0, 1); // 생년에서 2000년 이후인지 전인지 구분

		if(yearType == 1) {
			tmpAge = curYear - (1900 + parseInt(jumin1.substring(0, 2))); // 1900년대 경우
		} else {
			tmpAge = curYear - (2000 + parseInt(jumin1.substring(0, 2))); // 2000년대 경우
		}

		var tmpBirthday = jumin1.substring(2, 6); // 주민번호 4자리 생일문자 추출
		
		if(curDate < (curYear + tmpBirthday)) {
			tmpAge += 1;
		}
		return tmpAge;
	},
	// splitText로 구분되는 checkArr 배열 중 checkText와 동일한 데이터가 있는지 확인
	checkTextSplit : function (checkArr, checkText, splitText) {
		
		var returnVal = false;
		var countText = 0;
		var textSplit = checkArr.split(',');
		for ( var i in textSplit ) {
			if (textSplit[i] == checkText) {
				countText += 1;
				//console.log('checkTextSplit checkText',checkText);
			}
		}
		if (0 < countText) {
			returnVal = true;
		}
		//console.log('checkTextSplit returnVal',returnVal);
		return returnVal;
	},
	regDateToYYYYMMDD : function (strDate, text) {
		
		var regDate = new Date(strDate.replace(/-/g,'/'));
		var regYear = regDate.getFullYear();
		var regMonth = regDate.getMonth()+1;
		regMonth = regMonth.length < 2 ? '0'+ regMonth : regMonth;
		var regDay = regDate.getDate();
		regDay = regDay.length < 2 ? '0'+ regDay : regDay;
		
		return regYear + text + regMonth + text + regDay;
	},
	todayYYYYMMDD : function() {
		var date = new Date();
   
		var year  = date.getFullYear();
		var month = date.getMonth() + 1; // 0부터 시작하므로 1더함 더함
		var day   = date.getDate();

		if (("" + month).length == 1) { month = "0" + month; }
		if (("" + day).length   == 1) { day   = "0" + day;   }
		
		return "" + year + month + day;
	}
}
