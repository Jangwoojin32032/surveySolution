
var host = $(location).attr('host'); 			// localhost:8080
var hostname = $(location).attr('hostname'); 	// localhost
var href = $(location).attr('href');			// http://localhost:8080/survey/Q2
var port = $(location).attr('port'); 			// 8080
var protocol = $(location).attr('protocol'); 	// http:
var localhost = protocol+'//'+host;
var clickFunction = 'onClick="return captionclick(this)"';
var attCheckPoint = '$$@@$$';

var setResponseData = null;
var setlistSlSurvey = null;
var nextUrlArray = new Array();
var orderMaxNum = 3;
var setPageTime = 0;


// redirectUrl찾기
var cType = 0;
var surveyParam = '';
if(location.search != null) {
	//console.log('location.search', location.search);
	//console.log("location.search.substr(1).split('&')", location.search.substr(1).split('&'));
	surveyParam = location.search.substr(1).split('&');
	$.each(surveyParam, function(index, value) {
		//console.log('value', value);
		if(value.indexOf('CType') != -1) {
			cType = value.substr(6,6);
			return false;
		}
	});
	console.log('cType', cType);
}

/*var baseData = surveyCommonJs.getPageBaseData();
var uCode = $('[name="uCode"]').val();
var projectId = $('[name="projectId"]').val();
var hardCodingId = $('[name="hardCodingId"]').val();
var questionId = $('[name="questionId"]').val();
var questionName = $('[name="questionName"]').val();
var checkNum = $('[name="checkNum"]').val();*/

//serveyJs.init('setHtml');
var serveyJs = {

	init : function(type){	
		surveyCommonJs.setNotUseKey();
		surveyCommonJs.setAjaxStartEnd();
		
		// 모바일 > 초기화 + - 영역 삭제
		var usekWeb = surveyCommonJs.usekWeb();
		var returnVal = usekWeb.value;
		var vWebType = usekWeb.type;
		
		//vWebType = 'MOBILE';
		console.log('usekWeb', usekWeb);
		
		if(vWebType == 'MOBILE') {
			$('.size').css('display', 'none');
		}
		
		var listQuestionHtml = new Array();
		
		//var surveyState = $('[name="surveyState"]').val();
		var uCode = $('[name="uCode"]').val();
		console.log('uCode', uCode);
		var questionName = $('[name="questionName"]').val();
		
		setResponseData = serveyJs.getSurvey(type);
		//console.log('serveyJs setResponseData', setResponseData);
		console.log('serveyJs type', type);
		if (null != setResponseData) {
			
			// 조사관련 문의 속성 설정
			var selectSlProject = setResponseData.selectSlProject;
			var projectId = selectSlProject.projectId;
			var projectNameOuter = selectSlProject.projectNameOuter;
			/**
			* 설문번호 : 
			* 설문제목 : 
			 * */
			$('article>div.inquiry>a').attr('onclick','setInquiry(\''+projectId+'\', \''+projectNameOuter+'\', \''+uCode+'\');');
			//console.log('조사관련', 'setInquiry(\''+projectId+'\', \''+projectNameOuter+'\', \''+uCode+'\');');
			
			if ('setHtml' == type) {

				listQuestionHtml = serveyJs.setHtml(type);
				
			} else if ('testList' == type) {	// 설문작성 > 미리보기
				
				if (null != setResponseData.selectSlProject && "" != setResponseData.selectSlProject) {
					serveyJs.setHtml(type);
					//serveyJs.setExampleRotation();
					serveyJs.setAttr();
					serveyJs.setLogoImg();
				}
				
			} else {
				
				//if (null != uCode || "" != uCode) {
				//	console.log('uCode',uCode);
				
					var checkNumHtml = $('[name="checkNum"]').val();
					console.log('checkNum html',checkNumHtml);
					console.log('checkNum server',setResponseData.checkNum);
					
					if (null != setResponseData.checkNum && '' != setResponseData.checkNum) {
						if (checkNumHtml != setResponseData.checkNum) {
							//alert('Wrong approach');
							alert('잘못된 접근입니다.');
							//window.open("about:blank","_self").close();
							//return false;
						}
					}
				
					var checkNowPage = serveyJs.checkNowPage();
					var useResearBanner = setResponseData.selectSlProject.useResearBanner;
					setResponseData.checkNowPage = checkNowPage;
					console.log('checkNowPage',checkNowPage);
					console.log('setResponseData',setResponseData);
					//var usePc = setResponseData.selectSlProject.usePc;
					//var useMobile = setResponseData.selectSlProject.useMobile;
					//var useWeb = surveyCommonJs.usekWeb(usePc, useMobile);
					//console.log('useWeb',useWeb);
					
					//var useWebValue = useWeb.value;
					//var useWebType = useWeb.type;
					
					//if (useWebValue) {
						console.log('projectState',setResponseData.projectState);
						//console.log('useResearBanner',setResponseData.selectSlProject.useResearBanner);
						//console.log('useResearList',setResponseData.selectSlProject.useResearList);
						// 1. 진행중 프로젝트 or
						// 2. 배너조사인데 ucode가 3자리(테스트) or
						// 3. 샘플 테스트발송 명단에 있는 사람은 제외 - 1991618:박대곤 1996794:정재우 1997920:박수현 2002137:김재민 2010254:김민구 2026044:김성훈 2009416:강민구 2010769:장우진
						if ("2" == setResponseData.projectState || (useResearBanner == 1 && uCode < 1000) || '1111' == uCode || '1630697' == uCode || '1991618' == uCode || '1996794' == uCode || '1997920' == uCode || '2002137' == uCode || '2010254' == uCode  || '2026044' == uCode || '2009416' == uCode || '2010769' == uCode) {
							/*
							var useFollowing = setResponseData.selectSlProject.useFollowing;
							if ("1" == useFollowing && 'Q1' == questionName) {
								serveyJs.goFollowingPage(checkNowPage);
							}
							*/
							var useBack = setResponseData.selectSlProject.useBack;
							console.log('useBack',useBack);
							if ("1" == useBack || "1111" == uCode) {
								serveyJs.goBackPage(checkNowPage);
							}
							
							// 로테이션 문항 속성 수정
							var listSlRotationMain = setResponseData.listSlRotationMain;
							if (null != listSlRotationMain && 0 < listSlRotationMain.length) {
								
								// 보기 로테이션 문항에 적용
								var listSlQuestion = setResponseData.listSlQuestion;
								var selectSlQuestion = setResponseData.selectSlQuestion;							
								
								// 문항로테이션 변수
								var rotQuestionName = '';
								
								//console.log('listSlQuestion', listSlQuestion);
								//console.log('selectSlQuestion.questionId', selectSlQuestion.questionId);
								
								$.each(listSlQuestion, function(index, value){
									//console.log('listSlQuestion.questionId', value.questionId);
									if(value.questionId == selectSlQuestion.questionId) {
										rotQuestionName = value.questionName;
										var questionId = value.questionId;
										var questionName = value.questionName;
										var questionType = value.questionType;
										var listSlQuestionFunction = value.listSlQuestionFunction;									
										serveyJs.setExampleRotation(questionType, questionId, questionName, listSlQuestionFunction);
									}
								});
								
								// 문항 로테이션에 적용
								var questionNameOrign = $('[name=questionName]').val();
								
								if(rotQuestionName != '' || rotQuestionName != null) {
									
									$("[name='"+rotQuestionName+"']").attr('exampletext', questionNameOrign);
									
									console.log('questionNameOrign',questionNameOrign);
									console.log("[name='"+rotQuestionName+"']",$("[name='"+rotQuestionName+"']").val());
								}
							}
							
							serveyJs.setAttr();
							serveyJs.setLogoImg();
						} else {
							//alert("End Survey");
							alert("설문 종료");
							window.open("about:blank","_self").close();
							return false;
						}
						
					//} else {
					//	alert(useWebType + " is not possible.");
					//	window.open("about:blank","_self").close();
					//	return false;
					//}
				
				//} else {
				//	alert("wrong approach");
				//	window.open("about:blank","_self").close();
				//	return false;
				//}
			}
		}
		
		console.log('listQuestionHtml',listQuestionHtml);
		return listQuestionHtml;
	},
	getSurvey : function (type) {
		
		var projectId = $('[name="projectId"]').val();
		var hardCodingId = $('[name="hardCodingId"]').val();
		var questionId = $('[name="questionId"]').val();
		var questionName = $('[name="questionName"]').val();
		
		var uCode = $('[name="uCode"]').val();
		
		if (null != questionId && '' != questionId
			&& null != questionName && '' != questionName) {
			
			var questionIdArray = questionId.split(',');
			var questionIdArrayLen = questionId.length;
			var questionNameArray = questionName.split(',');
			var questionNameArrayLen = questionName.length;
			if (0 < questionIdArrayLen) {
				questionId = questionIdArray[0];
				questionName = questionNameArray[0];
			} 
			
			//console.log('questionName',questionName);
			//console.log("questionName.indexOf('rot')",questionName.indexOf('rot'));
			if(questionName.indexOf('rot') != -1) {
				// 로테이션 문항이름이면 원본이름으로 변경
				questionName = $('[name="orignQuestionName"]').val();
			}
			console.log('questionName',questionName);
		}
		
		var returnData = null;
				
		var urlVal = localhost+'/survey/getSurvey';
		$.ajax({
			url   		: urlVal,
			type  		: "post",
			dataType    : "json",
			contentType : "application/json",
			async		: false,
			data  		: JSON.stringify( {projectId:projectId, hardCodingId:hardCodingId, surveyState:type, questionId:questionId, questionName:questionName, uCode:uCode, cType:cType} ),
			success     : function(responseData){
				console.log("getSurvey data!!",responseData);
				returnData = responseData;
			},
			error : function(e){
				//console.log("error",e);
			}
		});
		return returnData;
	},
	setData : function (listSlSurvey) {
		
		var checkNowPage = setResponseData.checkNowPage;
		
		var nowPageIndex = checkNowPage.nowPageIndex;
		var nowPageId = checkNowPage.nowPageId;
		var nowPageName = checkNowPage.nowPageName;
		var nowPageCheckNum = checkNowPage.nowPageCheckNum;
		
		var nextPageIndex = checkNowPage.nextPageIndex;
		var nextPageId = checkNowPage.nextPageId;
		var nextPageName = checkNowPage.nextPageName;
		var nextPageCheckNum = checkNowPage.nextPageCheckNum;
		
		var uCode = $('[name="uCode"]').val();
		var projectId = $('[name="projectId"]').val();
		var hardCodingId = $('[name="hardCodingId"]').val();
		var checkMoveQType = $('[name="checkMoveQType"]').val();
		var questionName = setResponseData.selectSlQuestion.questionName;
		var questionType = setResponseData.selectSlQuestion.questionType;
		
		console.log('setData questionName',questionName);
		console.log('setData questionType',questionType);
		
		var returnData = {
				uCode : uCode,
				projectId : projectId,
				hardCodingId : hardCodingId,
				questionName : questionName,
				questionType : questionType,
				pageIndex : nowPageIndex,
				pageId : nowPageId,
				pageName : nowPageName,
				pageIndex2 : nextPageIndex,
				pageId2 : nextPageId,
				pageName2 : nextPageName,
				checkMoveQType : checkMoveQType,
				listSlSurvey : listSlSurvey
		};
		return returnData;
	},
	setSurvey : function (listSlSurvey) {
		
		var returnVal = false;
		var urlVal = localhost+'/survey/setSurvey';
		var setData = serveyJs.setData(listSlSurvey);
		
		$.ajax({
			url   		: urlVal,
			type  		: "post",
			dataType    : "json",
			contentType : "application/json",
			data  		: JSON.stringify( setData ),
			async		: false,
			success     : function(responseData){
				console.log("setSurvey data",responseData);
				if (null != responseData) {
					if (responseData.insertSlSurvey || responseData.updateSlSurvey) {
						returnVal = true;
					}
				}
			},
			error : function(e){
			}
		});
		return returnVal;
	},
	setLogoImg : function () {
		
		var data = setResponseData;
		//console.log('setLogoImg data', data)
		if (null != data.selectSlProject) {
			var selectSlProject = data.selectSlProject;
			//console.log('setLogoImg selectSlProject.logoImgSaveName', null != selectSlProject.logoImgSaveName);
			//console.log('setLogoImg selectSlProject.logoImgSaveName', '' != selectSlProject.logoImgSaveName);
			if (null != selectSlProject.logoImgSaveName && '' != selectSlProject.logoImgSaveName) {
			//if (selectSlProject.logoImgSaveName.length() > 0) {
				var logoImgDirectory = selectSlProject.logoImgDirectory;
				var logoImgSaveName = selectSlProject.logoImgSaveName;
				$('#imgLog').attr('src',localhost + logoImgDirectory+'/'+logoImgSaveName);
			} else {
				$('#imgLog').attr('src','/resources/img/logo.png');
			}
		}
	},
	setHtml : function (type) {
		var listQuestionHtml = new Array();
		var data = setResponseData;
		serveyJs.setLogoImg(data);
		var qName = $('[name="questionName"]').val();
		var qId = $('[name="questionId"]').val();
		
		if (null != data.listSlQuestion) {
			
			$('#setBody').html('');
			var listSlQuestion = data.listSlQuestion;
			
			$.each(listSlQuestion, function(index, value){
				
				var questionId = value.questionId;
				var questionName = value.questionName;
				var questionType = value.questionType;
				var listSlQuestionFunction = value.listSlQuestionFunction;
				
				if ("testList" == type || "setHtml" == type) {
					var getHtml = serveyJs.setQuestionTypeHtml(qId, index, value, type);
					listQuestionHtml[index] = getHtml;
					console.log('getHtml',getHtml);
					serveyJs.setExampleRotation(questionType, questionId, questionName, listSlQuestionFunction);
				} else {
					// check questionId
					if (qId == questionId) {
						var getHtml = serveyJs.setQuestionTypeHtml(qId, index, value, type);
						listQuestionHtml[index] = getHtml; 
						console.log('getHtml',getHtml);
						serveyJs.setExampleRotation(questionType, questionId, questionName, listSlQuestionFunction);
					}
				}
			});
		}
		//serveyJs.setAttr();
		return listQuestionHtml;
	},
	// jsp 파일 만들기
	setQuestionTypeHtml : function (qId, index, value, type) {
		
		console.log('setQuestionTypeHtml value',value);
		
		var setEnter = '';
		if ('testList' != type) {
			setEnter = ' \n';
		}
		var questionId = value.questionId;
		var questionName = value.questionName;
		var questionTitle = value.questionTitle;
		var questionType = value.questionType;
		var questionLogic = value.questionLogic;
		var questionOption = value.questionOption;
		
		// sin : 단수
		// mul : 복수
		// ord : 순위
		// tex : 오픈
		// num : 오픈숫자
		// sca : 척도
		// att : 속성
		// info : 안내
		
		// Set Function
		var checkOptionEtc = "";
		var checkOptionEtcIndex = "";
		var checkOption989 = "";
		var checkOptionNotExist = "";
		var checkOptionNotExistIndex = "";
		var checkOptionText = false;
		var checkOptionTextVal = '';
		var checkOptionAttr = false;
		var checkOptionAttrVal = '';
		var checkOptionMedia = false;
		var checkOptionMediaUrl = '';
		var checkOptionTimer = '';
		
		var aCheckOption = new Array();
		
		var questionFunction = value.listSlQuestionFunction;
		//console.log('setQuestionTypeHtml questionFunction',questionFunction);
		if (null != questionFunction) {
			
			$.each(questionFunction, function(index3, value3){
				var functionType = value3.functionType;
				var functionText = value3.functionText;
				var fQuestionId = value3.questionId;				
				//console.log('setQuestionTypeHtml functionType',functionType);
				
				if ("option" == functionType) {
					
					var fObject = serveyJs.checkOptionType(functionText, fQuestionId);					
					console.log('fObject',fObject);
					
					if (null != fObject) {
						
						var fType = fObject.type;
						var fValue = fObject.data;
						aCheckOption.push(fObject);
						
						if ("ETC" == fType) {
							checkOptionEtc = "Y";
							checkOptionEtcIndex = fValue;
						} else if ("989" == fType) {
							checkOption989 = "Y";
						} else if ("notExist" == fType) {
							checkOptionNotExist = "Y";
							checkOptionNotExistIndex = fValue;
						} else if ("text" == fType) {
							checkOptionText = true;
							checkOptionTextVal = fValue;
						} else if ('attr' == fType) {
							checkOptionAttr = true;
							checkOptionAttrVal = fValue;
						} else if ('mediaurl' == fType) {
							checkOptionMedia = true;
							checkOptionMediaUrl = fValue;
						} else if ('timer' == fType) {
							checkOptionTimer = fValue;
						}
					}
				}
			});
		}
		
		// Set Example
		var slExample = value.listSlExample;
		var slQuestionLogic = value.listSlQuestionLogic;
		var slExampleLen = 0;
		if (null != slExample) {
			slExampleLen = slExample.length;
		}
		
		var returnObject = new Object();
		var setQuestionHtml = '';
		
		if ("sin" == questionType) {
			var setExampleHtml = "";
			
			if (null != slExample) {
				
				$.each(slExample, function(index2, value2){
					
					var checkIndex = index2 + 1;
					
					var exampleId = value2.exampleId;
					var exampleText = value2.exampleText;
										
					var setOptionLastText = "";
					var setOptionLastAttr = "";
					
					if ('Y' == checkOptionEtc) {
						if (null != checkOptionEtcIndex && '' != checkOptionEtcIndex) {
							
							if ( checkIndex == parseInt(checkOptionEtcIndex) ) {
								var setHtmlAddEt = serveyJs.setAddEtc('sin','' ,questionName, checkIndex, setEnter, questionFunction);
								setOptionLastText = setHtmlAddEt.setOptionLastText;
								setOptionLastAttr = setHtmlAddEt.setOptionLastAttr;
							}
							
						} else if (slExampleLen == checkIndex) {
							
							var setHtmlAddEt = serveyJs.setAddEtc('sin', '', questionName, checkIndex, setEnter, questionFunction);
							setOptionLastText = setHtmlAddEt.setOptionLastText;
							setOptionLastAttr = setHtmlAddEt.setOptionLastAttr;
						}
					}
															
					setExampleHtml = setExampleHtml + '			<li>'
					+ '<label><input type="radio" name="'+ questionName +'" id="'+ questionName +'_'+ checkIndex +'" value="'+ checkIndex +'" exampletext="'+ questionName +'" exampleindex="'+ checkIndex +'" '+ setOptionLastAttr +' />'
					+ exampleText +'</label>' + setOptionLastText
					+ '</li>'+ setEnter;
					
					console.log('setQuestionTypeHtml setOptionLastText',setOptionLastText);
					console.log('setQuestionTypeHtml setOptionLastAttr',setOptionLastAttr);
					console.log('setQuestionTypeHtml setExampleHtml',setExampleHtml);
				});
			}
			
			setQuestionHtml = setQuestionHtml+ '<section class="contents">' + setEnter
								 +'	<article>' + setEnter
								 +'		<div id="questionName">' + setEnter
								 +'			'+ questionName +'. ' + setEnter
								 +'		</div>' + setEnter
								 +'		<div id="questionTitle">' + setEnter
								 +'			'+ questionTitle + setEnter
								 +'		</div>' + setEnter
								 +'	</article>' + setEnter
								 +'	<article class="survey_form">' + setEnter
								 +'		<ul>' + setEnter
								 +		setExampleHtml 
								 +'		</ul>' + setEnter
								 +'	</article>' + setEnter
								 +'</section>' + setEnter;
			
			returnObject = serveyJs.setQuestionHtmlObject(questionId, questionName, setQuestionHtml);
		}
		else if ("mul" == questionType) {
			
			var setExampleHtml = "";
			
			if (null != slExample) {
				
				$.each(slExample, function(index2, value2){
					
					var checkIndex = index2 + 1;
					
					var exampleId = value2.exampleId;
					var exampleText = value2.exampleText;
					
					var setOptionLastText = "";
					var setOptionLastAttr = "";
					
					console.log('mul checkOptionNotExist',checkOptionNotExist);
					console.log('mul checkOptionNotExistIndex',checkOptionNotExistIndex);
					console.log('mul checkIndex',checkIndex);
					console.log('mul checkOptionEtc',checkOptionEtc);
					console.log('mul checkOptionEtcIndex',checkOptionEtcIndex);
					console.log("ord checkIndex == parseInt(checkOptionEtcIndex)", checkIndex == parseInt(checkOptionEtcIndex));
					console.log("ord checkIndex == parseInt(checkOptionNotExistIndex)", checkIndex == parseInt(checkOptionNotExistIndex));
					//console.log("null != checkOptionNotExistIndex && '' != checkOptionNotExistIndex",null != checkOptionNotExistIndex && '' != checkOptionNotExistIndex);
					//console.log('checkIndex == parseInt(checkOptionNotExistIndex)',checkIndex == parseInt(checkOptionNotExistIndex));
					//console.log('slExampleLen == checkIndex',slExampleLen == checkIndex);
					
					if ('Y' == checkOptionEtc) {
						
						if (null != checkOptionEtcIndex && '' != checkOptionEtcIndex) {
							
							if ( checkIndex == parseInt(checkOptionEtcIndex) ) {
								
								var setHtmlAddEt = serveyJs.setAddEtc('mul', checkOption989, questionName, checkIndex, setEnter, questionFunction);
								setOptionLastText = setHtmlAddEt.setOptionLastText;
								setOptionLastAttr = setHtmlAddEt.setOptionLastAttr;
								
								checkOptionEtc = ""; // 초기화
								console.log('초기화 checkOptionEtc',checkOptionEtc);
							}
							
						} else if (slExampleLen == checkIndex) {
							
							var setHtmlAddEt = serveyJs.setAddEtc('mul', checkOption989, questionName, checkIndex, setEnter, questionFunction);
							setOptionLastText = setHtmlAddEt.setOptionLastText;
							setOptionLastAttr = setHtmlAddEt.setOptionLastAttr;
							
							checkOptionEtc = ""; // 초기화
							console.log('초기화 checkOptionEtc',checkOptionEtc);
						}
						
					}
					if ('Y' == checkOptionNotExist) {	// 이중에 없음	
						
						if (null != checkOptionNotExistIndex && '' != checkOptionNotExistIndex) {							
							if ( checkIndex == parseInt(checkOptionNotExistIndex) ) {
								setOptionLastAttr = 'sreadonly="'+ questionName + '" scheckedfalse';
								
								checkOptionNotExist = ""; // 초기화
								console.log('초기화 checkOptionNotExist',checkOptionNotExist);
							}							
							console.log('setOptionLastAttr',setOptionLastAttr);
						}
					}
					
					setExampleHtml = setExampleHtml + '			<li>'
					//+ '<label><input type="checkbox" name="'+ questionName +'" id="'+ questionName +'_'+ checkIndex +'" value="'+ checkIndex +'" exampletext="'+ questionName +'" exampleindex="'+ checkIndex +'" '+ setOptionLastAttr +' />'
					+ '<label><input type="checkbox" name="'+ questionName +'" id="'+ questionName +'_'+ checkIndex +'" value="'+ checkIndex +'" exampletext="'+ questionName +'_'+ checkIndex +'" exampleindex="'+ checkIndex +'" '+ setOptionLastAttr +' />'					
					+ exampleText +'</label>' + setOptionLastText
					+ '</li>'+ setEnter;
					
					console.log('setExampleHtml exampletext', questionName +'_'+ checkIndex);
				});
			}
			
			setQuestionHtml = setQuestionHtml+ '<section class="contents">' + setEnter
								 +'	<article>' + setEnter
								 +'		<div id="questionName">' + setEnter
								 +'			'+ questionName +'. ' + setEnter
								 +'		</div>' + setEnter
								 +'		<div id="questionTitle">' + setEnter
								 +'			'+ questionTitle + setEnter
								 +'		</div>' + setEnter
								 +'	</article>' + setEnter
								 +'	<article class="survey_form">' + setEnter
								 +'		<ul>' + setEnter
								 +'			'+ setExampleHtml + setEnter
								 +'		</ul>' + setEnter
								 +'	</article>' + setEnter
								 +'</section>' + setEnter;
			
			returnObject = serveyJs.setQuestionHtmlObject(questionId, questionName, setQuestionHtml);
		}
		else if ("ord" == questionType) {
			
			var setExampleHtml = "";
			if (null != slExample) {
				
				$.each(slExample, function(index2, value2){
					
					var checkIndex = index2 + 1;
					
					var exampleId = value2.exampleId;
					var exampleText = value2.exampleText;
					
					console.log('ord checkOptionNotExist',checkOptionNotExist);
					console.log('ord checkOptionNotExistIndex',checkOptionNotExistIndex);
					console.log('ord checkIndex',checkIndex);
					console.log('ord checkOptionEtc',checkOptionEtc);
					console.log('ord checkOptionEtcIndex',checkOptionEtcIndex);
					console.log("ord checkIndex == parseInt(checkOptionEtcIndex)", checkIndex == parseInt(checkOptionEtcIndex));
					console.log("ord checkIndex == parseInt(checkOptionNotExistIndex)", checkIndex == parseInt(checkOptionNotExistIndex));
										
					var setOptionLastText = "";
					var setOptionLastAttr = "";
					if ('Y' == checkOptionEtc) {
						
						if (null != checkOptionEtcIndex && '' != checkOptionEtcIndex) {
							
							if ( checkIndex == parseInt(checkOptionEtcIndex) ) {
								var setHtmlAddEt = serveyJs.setAddEtc('ord','' ,questionName, checkIndex, setEnter, questionFunction);
								setOptionLastText = setHtmlAddEt.setOptionLastText;
								setOptionLastAttr = setHtmlAddEt.setOptionLastAttr;
							}
							
						} else if (slExampleLen == checkIndex) {
							
							var setHtmlAddEt = serveyJs.setAddEtc('ord', '', questionName, checkIndex, setEnter, questionFunction);
							setOptionLastText = setHtmlAddEt.setOptionLastText;
							setOptionLastAttr = setHtmlAddEt.setOptionLastAttr;
						}
					}
					if ('Y' == checkOptionNotExist) {	// 이중에 없음	
						
						if (null != checkOptionNotExistIndex && '' != checkOptionNotExistIndex) {							
							if ( checkIndex == parseInt(checkOptionNotExistIndex) ) {
								setOptionLastAttr = 'sreadonly="'+ questionName +'" sorderfalse';
								checkOptionNotExist = ""; // 초기화
								console.log('초기화 checkOptionNotExist',checkOptionNotExist);
							}							
							console.log('setOptionLastAttr',setOptionLastAttr);
						}
					}
					
					setExampleHtml = setExampleHtml + '			<li>' + setEnter
					+ '<label><input type="text" style="width:40px; text-align:center; margin-right: 5px;" name="'+ questionName +'" id="'+ questionName +'_'+ checkIndex +'" value="" exampletext="'+ questionName +'_'+ checkIndex +'" exampleindex="'+ checkIndex +'" sorder '+ setOptionLastAttr +' readonly/>'
					+ exampleText +'</label>'+ setOptionLastText + setEnter
					+ '</li>' + setEnter;
				});
			}
			
			setQuestionHtml = setQuestionHtml+ '<section class="contents">' + setEnter
									 +'	<article>' + setEnter
									 +'		<div id="questionName">' + setEnter
									 +'			'+ questionName +'. ' + setEnter
									 +'		</div>' + setEnter
									 +'		<div id="questionTitle">' + setEnter
									 +			questionTitle + setEnter
									 +'		</div>' + setEnter
									 +'	</article>' + setEnter
									 +'	<article class="survey_form">' + setEnter
									 +'		<ul>' + setEnter
									 +		setExampleHtml + setEnter
									 +'		</ul>' + setEnter
									 +'	</article>' + setEnter
									 +'</section>'+ setEnter;
			
			returnObject = serveyJs.setQuestionHtmlObject(questionId, questionName, setQuestionHtml);
			
		} 
		else if ("tex" == questionType || "num" == questionType) {
			
			var setAttr = '';
			if ("num" == questionType) {
				setAttr = 'onlynumber';
			}
			if (checkOptionText) {
				var onlykorean = false;
				var onlyenglish = false;
				var onlynumber = false;
				//var onlymoney = false;
				//var onlyphone = false;
				//var onlyemail = false;
				var customOnlyphone = false;
				var customOnlyemail = false;
				var onlytext = false;
				
				// 입력제어 판단
				$.each(questionFunction, function(index, value){
					if(value.functionText == 'onlykorean') {
						onlykorean = true;
					} else if(value.functionText == 'onlyenglish') {
						onlyenglish = true;
					} else if(value.functionText == 'onlynumber') {
						onlynumber = true;	
					//} else if(value.functionText == 'onlymoney') {
					//	onlymoney = true;
					//} else if(value.functionText == 'onlyphone') {
					//	onlyphone = true;
					//} else if(value.functionText == 'onlyemail') {
					//	onlyemail = true;
					} else if(value.functionText == 'customOnlyphone') {
						customOnlyphone = true;
					} else if(value.functionText == 'customOnlyemail') {
						customOnlyemail = true;						
					} else if(value.functionText == 'onlytext') {
						onlytext = true;
					}
				});
				
				
				// 한/영 특수문자 구분
				if(onlykorean && onlyenglish && onlytext) {
					// 한/영 + 특수문자
					setAttr = 'korengtext';
				} else if(onlykorean && onlyenglish) {
					// 한/영
					setAttr = 'onlykoreng';
				} else if(onlykorean && onlytext) {
					// 한글 + 특수문자
					setAttr = 'koreantext';
				} else if(onlyenglish && onlytext) {
					// 영문 + 특수문자
					setAttr = 'englishtext';
				} else if(onlynumber && onlytext) {
					// 숫자 + 특수문자
					setAttr = 'numbertext';
				} else if(onlykorean && onlynumber) {
					// 한글 + 숫자
					setAttr = 'kornumber';
				} else if(onlynumber && onlynumber) {
					// 영문 + 숫자
					setAttr = 'engnumber';
				} else {
					setAttr = checkOptionTextVal;
				}
				
				//console.log('setAttr onlykorean',onlykorean);
				//console.log('setAttr onlyenglish',onlyenglish);
				//console.log('setAttr onlynumber',onlynumber);
				//console.log('setAttr onlytext',onlytext);
				//console.log('setAttr checkOptionTextVal',checkOptionTextVal);
				//console.log('setAttr customOnlyphone',customOnlyphone);
				//console.log('setAttr customOnlyemail',customOnlyemail);
				//console.log('setAttr setAttr',setAttr);
				
				//setAttr = checkOptionTextVal;
			}
			
			// 사용자정의 보기 판별
			var customExampleCheck = false;
			if(questionOption == 'customExample') {
				customExampleCheck = true;
			}
			/*
			$.each(slExample, function(index, value) {
				if(value.exampleLogicText == 'customExample') {
					customExampleCheck = true;
					return false;
				}
			});
			*/
			// 사용자정의 보기 텍스트크기
			var customTextWidth = 155;
			if(slQuestionLogic != '' && slQuestionLogic != null) {
				//console.log('setAttr slQuestionLogic', slQuestionLogic);
				if(slQuestionLogic[0] != undefined && slQuestionLogic[0].logicType == 'customTextWidth') {
					customTextWidth = slQuestionLogic[0].exampleValueBase;
				}
			}
			
			var setAddHtml = '';
			//if(!customExampleCheck) {
				if ("onlymoney" == checkOptionTextVal) {
					setAddHtml = '<div>금액을 등록하면 한글로 표시 됩니다.</div>';
				} else if ("onlyphone" == checkOptionTextVal) {
					setAddHtml = '<div>"-" 기호 없이 등록 하세요. 예) 01012341234 </div>';
				} else if ("onlyemail" == checkOptionTextVal) {
					setAddHtml = '<div>메일 형식에 맞게 등록 하세요. 예) smart@smartpanel.com </div>';
				}
			//
			console.log('setAttr checkOptionText',checkOptionText);	
			console.log('setAttr customOnlyphone',customOnlyphone);
			console.log('setAttr customOnlyemail',customOnlyemail);
			console.log('setAttr setAttr',setAttr);
			console.log('null != slExample && 0 < slExampleLen', null != slExample && 0 < slExampleLen);
			var setHtml = '';
			if (null != slExample && 0 < slExampleLen) {
				//console.log('setAttr slExample',slExample);
				
				console.log('setAttr customExampleCheck',customExampleCheck);
				
				var setContentHtml = "";
				$.each(slExample, function(index2, value2){
					var checkIndex = index2 + 1;
					
					var exampleId = value2.exampleId;
					var exampleText = value2.exampleText;
					
					// 일반 보기(테이블 보기)
					if(!customExampleCheck) {
						setContentHtml = setContentHtml 
							+'				<tr>'+ setEnter
							+' 					<td class="item_title">'+ exampleText +'</td>'+ setEnter
							+' 					<td><input type="text" name="'+ questionName +'_'+ checkIndex +'" id="'+ questionName +'_'+ checkIndex +'" value="" exampletext="'+ questionName +'_'+ checkIndex +'" exampleindex="'+ checkIndex +'" '+ setAttr +' textwidth="155" />'+ setAddHtml +'</td>'+ setEnter
							+'				</tr>'+ setEnter;
					} else {
						// 사용자정의 보기 (한 줄보기)
						setContentHtml = setContentHtml
							//+'	<input type="text" class="customText" name="customText_'+checkIndex+'" style="width:150px;" placeholder="설명 '+checkIndex+'">'+ setEnter;
							+ exampleText + ' ';
							// 오픈 응답 입력 폼
							if(slExample.length-1 == 1 && slExample.length-1 > index2) {
								// 응답 값 1개
								setContentHtml += '<input type="text" class="customExample" name="'+ questionName +'" id="'+ questionName +'" exampletext="'+ questionName +'" value="" '+ setAttr +' textwidth="'+customTextWidth+'" />'+ setEnter;													
							} else if(slExample.length-1 > index2) {
								// 응답 값 1개이상
								setContentHtml += '<input type="text" class="customExample" name="'+ questionName +'_'+ checkIndex +'" id="'+ questionName +'_'+ checkIndex +'" exampletext="'+ questionName +'_'+ checkIndex +'" exampleindex="'+ checkIndex +'" value="" '+ setAttr +' textwidth="'+ customTextWidth +'" />'+ setEnter;
							}
					}
				});
				
				// 앞 뒤 설명이 없는 사용자정의 보기인 경우
				if(slExample.length == 0 && customExampleCheck) {					
					setContentHtml += '<input type="text" class="customExample" name="'+ questionName +'_1" id="'+ questionName +'_1" exampletext="'+ questionName +'_1" exampleindex="1" value="" '+ setAttr +' textwidth="'+ customTextWidth +'" />'+ setEnter;					
				}
				
				console.log('setAttr setContentHtml',setContentHtml);				
				
				if(!customExampleCheck) {
					setHtml = '		<table class="measure">'+ setEnter
							+'			<colgroup>'
							+'				<col width="*">'
							+'				<col width="50%">'
							+'			</colgroup>'
			 				+'			<thead>'+ setEnter
							+'			</thead>'+ setEnter
							+'			<tbody>'+ setEnter
							+ 					setContentHtml+ setEnter
							+'			</tbody>'+ setEnter
			 				+'		</table>'+ setEnter;
				} else {
					setHtml = '		<ul>' + setEnter
					+'			<li><label>'+setContentHtml + setEnter + setAddHtml+'</label></li>' + setEnter
					+'		</ul>' ;
				}
			} else {
				console.log('else setAttr customOnlyphone',customOnlyphone);
				console.log('else setAttr customOnlyemail',customOnlyemail);
				if(customExampleCheck) {
					// 사용자정의 보기 중
					if(customOnlyphone) {
						// 전화번호 입력
						setHtml = '	<ul>' + setEnter
							+'			<li>'
							+'				<input type="text" class="customOnlyphone" name="'+ questionName +'_1" id="'+ questionName +'_1" exampletext="'+ questionName +'_1" value="" '+ setAttr +' textwidth="50" maxlength="3" style="text-align: center;"/> - '
							+'				<input type="text" class="customOnlyphone" name="'+ questionName +'_2" id="'+ questionName +'_2" exampletext="'+ questionName +'_2" value="" '+ setAttr +' textwidth="50" maxlength="4" style="text-align: center;"/> - '
							+'				<input type="text" class="customOnlyphone" name="'+ questionName +'_3" id="'+ questionName +'_3" exampletext="'+ questionName +'_3" value="" '+ setAttr +' textwidth="50" maxlength="4" style="text-align: center;"/>'
							+'			</li>' + setEnter
							+'		</ul>' ;
					} else if(customOnlyemail) {
						// 이메일 입력
						setHtml = '	<ul>' + setEnter
						+'			<li>'
						+'				<input type="text" name="'+ questionName +'_1" id="email_1" exampletext="'+ questionName +'_1" value="" '+ setAttr +' textwidth="150"> @ ' // sreadonly="'+ questionName +'_2"
						+'				<input type="text" name="'+ questionName +'_2" id="email_2" exampletext="'+ questionName +'_2" value="" '+ setAttr +' textwidth="120" style="text-align: center;"/>'						
						+'				<select name="selectEmail" id="selectEmail" '+ setAttr +'>'
						//+'					<option selected>선택하세요</option>' 
						+'					<option value="1" selected>직접입력</option>' 
						+'					<option value="naver.com">naver.com</option>'
						+'					<option value="gmail.com">gmail.com</option>'
						+'					<option value="daum.net">daum.net</option>'
						+'					<option value="hanmail.net">hanmail.net</option>'
						+'					<option value="nate.com">nate.com</option>'
						+'				</select>'						
						+'			</li>' + setEnter
						+'		</ul>' ;
						
						console.log('setAttr setHtml',setHtml);
					}
				} else {
					setHtml = '		<ul>' + setEnter
						+'			<li><input type="text" name="'+ questionName +'" id="'+ questionName +'" exampletext="'+ questionName +'" value="" '+ setAttr +' textwidth="155" />'+ setAddHtml +'</li>' + setEnter
						+'			</ul>' ;
				}
			}
			
			setQuestionHtml = setQuestionHtml+ '<section class="contents">' + setEnter
				 +'	<article>' + setEnter
				 +'		<div id="questionName">' + setEnter
				 +'			'+ questionName +'. ' + setEnter
				 +'		</div>' + setEnter
				 +'		<div id="questionTitle">' + setEnter
				 +			questionTitle + setEnter
				 +'		</div>' + setEnter
				 +'	</article>' + setEnter
				 +'	<article class="survey_form">' + setEnter
				 +		setHtml + setEnter
				 +'	</article>' + setEnter
				 +'</section>' + setEnter;
			
			returnObject = serveyJs.setQuestionHtmlObject(questionId, questionName, setQuestionHtml);
		}
		else if ("sca" == questionType) {
			
			var setHtml = "";
			var setTitleHtml = "";
			var setContentHtml = "";
			$.each(slExample, function(index2, value2){
				
				var checkIndex = index2 + 1;
				
				var exampleId = value2.exampleId;
				var exampleText = value2.exampleText;
				
				setTitleHtml = setTitleHtml +'	<td>'
										  +'		'+ exampleText
										  +'	</td>'+ setEnter;
				
				setContentHtml = setContentHtml +'	<td  '+ clickFunction +'>'+ setEnter
								+'		<input type="radio" name="'+ questionName +'" id="'+ questionName +'_'+ checkIndex +'" value="'+ checkIndex +'" exampletext="'+ questionName +'" exampleindex="'+ checkIndex +'" />'+ setEnter
								+'	</td>'+ setEnter;
			});
			
			setHtml = '<thead>'+ setEnter
					+'	<tr>'+ setEnter
					+ 		setTitleHtml+ setEnter
					+'	</tr>'+ setEnter
					+'</thead>'+ setEnter
					+'<tbody>'+ setEnter
					+'	<tr>'+ setEnter
					+ 		setContentHtml+ setEnter
					+'	</tr>'+ setEnter
					+'</tbody>'+ setEnter
					;
			
			setQuestionHtml = setQuestionHtml+ '<section class="contents">'+ setEnter
								 +'	<article>'+ setEnter
								 +'		<div id="questionName">' + setEnter
								 +'			'+ questionName +'. ' + setEnter
								 +'		</div>' + setEnter
								 +'		<div id="questionTitle">' + setEnter
								 +			questionTitle+ setEnter
								 +'		</div>'+ setEnter
								 +'	</article>'+ setEnter
								 +'	<article class="survey_form">'+ setEnter
								 +'		<table class="measure">'+ setEnter
								 +			setHtml+ setEnter
								 +'		</table>'+ setEnter
								 +'	</article>'+ setEnter
								 +'</section>'+ setEnter;
			
			returnObject = serveyJs.setQuestionHtmlObject(questionId, questionName, setQuestionHtml);
		}
		else if ("att" == questionType) {
			
			var classAttr = 'addrow';
			if (checkOptionAttr) {
				classAttr = checkOptionAttrVal;
			}
			var setTitleArray = new Array();
			var setContentArray = new Array();
			var checkTitleContent = "";
			var titleLen = 0;
			var setIndex = 0;
			
			var setHtml = "";
			var setColGroupHtml = "";
			var setTitleHtml = "";
			var setContentHtml = "";
			$.each(slExample, function(index2, value2){
				var exampleId = value2.exampleId;
				var exampleText = value2.exampleText;
				
				if (attCheckPoint == exampleText) {
					checkTitleContent = "Y";
				}
				
				if ('' == checkTitleContent) {
					
					var setAttObject = new Object();
					setAttObject.questionName = questionName;
					setAttObject.exampleId = exampleId;
					setAttObject.exampleText = exampleText;
					setTitleArray.push(setAttObject);
					titleLen++;
				} else if ( attCheckPoint == exampleText ) {
					
				} else {
					var setAttObject = new Object();
					setAttObject.questionName = questionName;
					setAttObject.exampleId = exampleId;
					setAttObject.exampleText = exampleText;
					setContentArray.push(setAttObject);
				}
			});
			
			var setTrHtml = "";
			if ('addrow' == classAttr || 'addrowmul' == classAttr) {
				
				var inputType = '';
				if ('addrow' == classAttr) {
					inputType = 'radio';
				} else if ('addrowmul' == classAttr) {
					inputType = 'checkbox';
				}
				$.each(setTitleArray, function(tIndex, tValue){
					
					var checkTIndex = tIndex + 1;
					var tQuestionName = tValue.questionName;
					var tExampleId = tValue.exampleId;
					var tExampleText = tValue.exampleText;
					
					var setTdHtml = "";
					$.each(setContentArray, function(cIndex, cValue){
						
						var checkCIndex = cIndex + 1;
						var cQuestionName = cValue.questionName;
						var cExampleId = cValue.exampleId;
						var cExampleText = cValue.exampleText;
						
						// set Title
						if (0 == tIndex) {
							setColGroupHtml = setColGroupHtml + '<col width="10%" />'+ setEnter;
							setTitleHtml = setTitleHtml + '<td>'+ cValue.exampleText +'</td>'+ setEnter;
						}
						
						// set Content
						setTdHtml = setTdHtml +'<td  '+ clickFunction +'><input type="'+ inputType +'" name="'+ questionName +'_'+ checkTIndex +'" id="'+ questionName +'_'+ checkTIndex +'_'+checkCIndex+'" value="'+ checkCIndex +'" exampletext="'+ questionName +'_'+ checkTIndex +'" exampleindex="'+ checkCIndex +'" /></td>'+ setEnter
					});
					
					// set Title
					if (0 == tIndex) {
						setColGroupHtml = "<col width='*' />" + setColGroupHtml + setEnter ;
						if ('addrowmul' == classAttr) {
							setColGroupHtml = setColGroupHtml +'<col width="10%" />'+ setEnter ;
						}
						setTitleHtml = "<td>질문</td>" + setTitleHtml+ setEnter;
					}
					// set Content
					setTrHtml = setTrHtml + '<tr>'+ setEnter;
					setTrHtml = setTrHtml +'	<td class="item_title">'+ tExampleText +'</td>'+ setEnter;
					setTrHtml = setTrHtml + setTdHtml+ setEnter;
					if ('addrowmul' == classAttr) {
						setTrHtml = setTrHtml + '<td style="border:none;"><input type="button" name="bt_addrowmul" value="next" /></td>'+ setEnter ;
					}
					setTrHtml = setTrHtml +'</tr>'+ setEnter;
				});
			
			} else if ('addcol' == classAttr || 'addcolmul' == classAttr) {
				
				$.each(setContentArray, function(cIndex, cValue){
					
					var checkCIndex = cIndex + 1;
					var cQuestionName = cValue.questionName;
					var cExampleId = cValue.exampleId;
					var cExampleText = cValue.exampleText;
					
					var setTdHtml = "";
					$.each(setTitleArray, function(tIndex, tValue){
						
						var checkTIndex = tIndex + 1;
						var tQuestionName = tValue.questionName;
						var tExampleId = tValue.exampleId;
						var tExampleText = tValue.exampleText;
						
						// set Title
						if (0 == cIndex) {
							setColGroupHtml = setColGroupHtml + '<col width="10%" />'+ setEnter;
							setTitleHtml = setTitleHtml + '<td>'+ tValue.exampleText +'</td>'+ setEnter;
						}
						
						// set Content
						setTdHtml = setTdHtml +'<td  '+ clickFunction +'><input type="radio" name="'+ questionName +'_'+ checkTIndex +'" id="'+ questionName +'_'+ checkTIndex +'_'+ checkCIndex +'" value="'+ checkCIndex +'" exampletext="'+ questionName +'_'+ checkTIndex +'" exampleindex="'+ checkCIndex +'" /></td>'+ setEnter
					});
					
					// set Title
					if (0 == cIndex) {
						setColGroupHtml = "<col width='*' />" + setColGroupHtml+ setEnter;
						setTitleHtml = "<td>질문</td>" + setTitleHtml+ setEnter;
					}
					
					var setOptionLastText = "";
					// set Content
					if ('Y' == checkOptionEtc) {
						
						if (null != checkOptionEtcIndex && '' != checkOptionEtcIndex) {
							
							if ( checkCIndex == parseInt(checkOptionEtcIndex) ) {
								var setHtmlAddEt = serveyJs.setAddEtc('att','' ,questionName, checkCIndex, setEnter, questionFunction);
								setOptionLastText = setHtmlAddEt.setOptionLastText;
							}
							
						} else if (slExampleLen == checkCIndex) {
							var setHtmlAddEt = serveyJs.setAddEtc('att', '', questionName, checkCIndex, setEnter, questionFunction);
							setOptionLastText = setHtmlAddEt.setOptionLastText;
						}
					}
					
					setTrHtml = setTrHtml + '<tr>'+ setEnter
					+'	<td class="item_title">'+ cExampleText +' '+ setOptionLastText + '</td>'+ setEnter
					+ setTdHtml+ setEnter
					+'</tr>'+ setEnter;
				});
			}
				
			setHtml = '<colgroup>'+ setEnter
					+		setColGroupHtml+ setEnter
					+ '</colgroup>'+ setEnter
					+ '<thead>'+ setEnter
					+'	<tr>'+ setEnter
					+ 		setTitleHtml+ setEnter
					+'	</tr>'+ setEnter
					+'</thead>'+ setEnter
					+'<tbody>'+ setEnter
					+ 		setTrHtml+ setEnter
					+'</tbody>'+ setEnter
					;
			setQuestionHtml = setQuestionHtml+ '<section class="contents">'+ setEnter
								 +'	<article>'+ setEnter
								 +'		<div id="questionName">' + setEnter
								 +'			'+ questionName +'. ' + setEnter
								 +'		</div>' + setEnter
								 +'		<div id="questionTitle">' + setEnter
								 +			questionTitle+ setEnter
								 +'		</div>'+ setEnter
								 +'	</article>'+ setEnter
								 +'	<article class="survey_form">'+ setEnter
								 +'		<table class="measure '+ classAttr +'">'+ setEnter
								 +			setHtml+ setEnter
								 +'		</table>'+ setEnter
								 +'	</article>'+ setEnter
								 +'</section>'+ setEnter;
			returnObject = serveyJs.setQuestionHtmlObject(questionId, questionName, setQuestionHtml);
			
		} else if ("textarea" == questionType) {
			
			setQuestionHtml = setQuestionHtml+ '<section class="contents">'+ setEnter
			 +'	<article>'+ setEnter
			 +'		<div id="questionName">' + setEnter
			 +'			'+ questionName +'. ' + setEnter
			 +'		</div>' + setEnter
			 +'		<div id="questionTitle">' + setEnter
			 +			questionTitle+ setEnter
			 +'		</div>'+ setEnter
			 +'	</article>'+ setEnter
			 +'	<article class="survey_form">'+ setEnter
			 +'		<textarea cols="100" rows="10" name="'+ questionName +'" id="'+ questionName +'" exampletext="'+ questionName +'" ></textarea>'+ setEnter
			 +'	</article>'+ setEnter
			 +'</section>'+ setEnter;
			returnObject = serveyJs.setQuestionHtmlObject(questionId, questionName, setQuestionHtml);
			
		} else if ("media" == questionType) {
			
			//checkOptionMediaUrl 
			//checkOptionTimer
			console.log('checkOptionMedia',checkOptionMedia);
			console.log('checkOptionMediaUrl',checkOptionMediaUrl);
			console.log('checkOptionTimer',checkOptionTimer);
			//if (checkOptionMedia) {
				
				setQuestionHtml = setQuestionHtml+ '<section class="contents">'+ setEnter
				+'	<article>'+ setEnter
				 +'		<div id="questionName">' + setEnter
				 +'			'+ questionName +'. ' + setEnter
				 +'		</div>' + setEnter
				 +'		<div id="questionTitle">' + setEnter
				+			questionTitle+ setEnter
				+'		</div>'+ setEnter
				+'	</article>'+ setEnter
				+'	<article class="survey_form">'+ setEnter
				+'		<iframe frameborder="0" height="281" smedia src="http://'+ checkOptionMediaUrl +'" timer="'+ checkOptionTimer +'" allowfullscreen="" mozallowfullscreen="" webkitallowfullscreen="" width="500"></iframe>'+ setEnter
				+'		<div id="msgTimer"></div>'+ setEnter
				+'	</article>'+ setEnter
				+'</section>'+ setEnter;
				
				returnObject = serveyJs.setQuestionHtmlObject(questionId, questionName, setQuestionHtml);
			//}
			
		}else if ("info" == questionType) {
			var exampleText = '';
			
			if (null != slExample) {		
				$.each(slExample, function(index, value){
					exampleText = value.exampleText;
				});
			}
				
			setQuestionHtml = setQuestionHtml+ '<section class="contents">'+ setEnter
			 +'	<article>'+ setEnter
			 +'		<div id="questionName">' + setEnter
			 +'			'+ questionName +'. ' + setEnter
			 +'		</div>' + setEnter
			 +'		<div id="questionTitle">' + setEnter
			 +			questionTitle+ setEnter
			 +'		</div>'+ setEnter
			 +'	</article>'+ setEnter
			 +'	<article class="survey_form">'+ setEnter
			 +'	<ul>'+ setEnter 
			 +' <li>'+ exampleText + '</li>'+ setEnter
			 +'	</ul>'+ setEnter 
			 +'	</article>'+ setEnter
			 +'</section>'+ setEnter;
			returnObject = serveyJs.setQuestionHtmlObject(questionId, questionName, setQuestionHtml);
		} 
		
		if ('testList' == type) {
			$('#setBody').append(setQuestionHtml);
		} else {
			serveyJs.setGoUrl(questionName, questionLogic);
		}
		
		return returnObject;
	},
	setAttr : function () {
		
		var data = setResponseData;
		
		var listSlQuestion = data.listSlQuestion;
		var selectTable = data.selectTable;	// 이전 응답 값
		var listSlQuestionFunction = data.listSlQuestionFunction; // 기타 값 체크

		// 이전응답값 및 보기번호 가져오기 {{Q1}}, [[Q1]]
		var questionTitle = $('#questionTitle').text();	// 문항 질문 내용

		var textStart = questionTitle.indexOf('{{');	// 보기 내용을 얻기위한 시작
		var textEnd = questionTitle.indexOf('}}', textStart+1);	// 보기 내용을 얻기위한 끝
		var valueStart = questionTitle.indexOf('[[');	// 보기 내용을 얻기위한 시작
		var valueEnd = questionTitle.indexOf(']]', valueStart+1);	// 보기 내용을 얻기위한 끝

		var preQuestionName = '';		// 이전 문항번호 추출
		var preQuestionExample = '';	// 이전 문항보기 리스트
		var preQuestionFunction = '';	// 이전 문항기능 리스트
		var preExampleView = '';		// 이전 응답 보기내용
		var preExampleValue = '';		// 이전 응답 보기번호
		var newQuestionTitle = '';		// 치환 문자열
		var etcCheck = false;			// 기타 값 체크
		var etcValue = '';				// 기타 값

		// {{, [[ 가 있으면 이전 응답 문항번호 조회
		if(textStart != -1 && textEnd != -1) {
			// {{Q1}} 보기내용 치환
			preQuestionName = questionTitle.substring(textStart+2, textEnd);

			// 이전 응답 보기번호 찾기
			preExampleValue = eval("selectTable."+ preQuestionName);

			// 이번 응답 보기목록 찾기
			$.each(listSlQuestion, function(index, value){
				if(value.questionName == preQuestionName) {
					preQuestionExample = value.listSlExample;
					preQuestionFunction = value.listSlQuestionFunction;
					return false;
				}
			});

			// 기타 판별
			if(preQuestionFunction != null && preQuestionFunction != '') {
				$.each(preQuestionFunction, function(index, value){
					var functionText = value.functionText;
					if(functionText.indexOf('ETC')) {
						etcCheck = true;
					}
				});
			}

			// 이전 응답 보기 값 찾기
			if(preQuestionExample != null && preQuestionExample != '') {			
				$.each(preQuestionExample, function(index, value){
					if(value.exampleValue == preExampleValue) {	// 이전 응답 값 == 이전 문항 보기번호
						if(etcCheck && value.exampleValue == preQuestionExample.length) {	// 기타 값 이면 응답 내용
							preExampleView = eval('selectTable.' + preQuestionName + '_text');
						} else {	// 기타가 아닌 문항은 보기 내용
							preExampleView = value.exampleText;
						}
						return false;
					}
				});
			}
			// 문항 내용에 적용하기
			if(preExampleView != null && preExampleView != '') {
				var searchText = '{{' + preQuestionName + '}}';
				newQuestionTitle = surveyCommonJs.replaceAll(questionTitle, searchText, preExampleView);
				// 적용
				$('#questionTitle').text(newQuestionTitle);
			}
		}

		if(valueStart != -1 && valueEnd != -1) {
			// [[Q1]] 보기번호 치환
			preQuestionName = questionTitle.substring(valueStart+2, valueEnd);	

			// 이전 응답 보기번호 찾기
			preExampleValue = eval("selectTable."+ preQuestionName);

			// 문항 내용에 적용하기
			if(preExampleValue != null && preExampleValue != '') {
				var searchText = '[[' + preQuestionName + ']]';
				if(preExampleView != null && preExampleView != '') {
					newQuestionTitle = surveyCommonJs.replaceAll(newQuestionTitle, searchText, preExampleValue);
				} else {
					newQuestionTitle = surveyCommonJs.replaceAll(questionTitle, searchText, preExampleValue);
				}
				// 적용
				$('#questionTitle').text(newQuestionTitle);
			}
		}

		//console.log('setAttr questionTitle', questionTitle);
		//console.log('setAttr textStart', textStart);
		//console.log('setAttr textEnd', textEnd);
		//console.log('setAttr preQuestionFunction', preQuestionFunction);
		//console.log('setAttr preQuestionName', preQuestionName);
		//console.log('setAttr preExampleView', preExampleView);
		//console.log('setAttr preExampleValue', preExampleValue);
		//console.log('setAttr preQuestionExample', preQuestionExample);
		//console.log('setAttr replaceText', replaceText);
		//console.log('setAttr newQuestionTitle', newQuestionTitle);
		//console.log('setAttr etcCheck', etcCheck);
		
		// # @ | 기능 시작
		console.log('setAttr data',data);
		if(data.listSlQuestionLogic.length > 0) {
			var questionName = $('[name="questionName"]').val();
			var selectSlQuestion = data.selectSlQuestion;
			var questionType = selectSlQuestion.questionType;
			var listSlQuestionLogic = data.listSlQuestionLogic;
			var selectTable = data.selectTable;
			
			console.log('setAttr listSlQuestionLogic', listSlQuestionLogic);
			console.log('setAttr selectTable', selectTable);
			console.log('setAttr questionType', questionType);
			
			$.each(listSlQuestionLogic, function(index, value){
				var logicType = value.logicType;	// 로직 타입
				var exampleNameBase = value.exampleNameBase;		// 현재 보기 value
				var questionNameBase = value.questionNameBase;		// 현재 문항이름
				var questionNameTarget = value.questionNameTarget;	// 이전 응답 문항이름
				var exampleNameTarget = value.exampleNameTarget;	// 숨길 보기 value
				var selectTableQuestionValue = eval("selectTable."+ questionNameTarget);	// 이전 응답값

				if(logicType == '#') {
					//console.log('listSlQuestionLogic questionNameBase ' +index+ ": ", questionNameBase);
					//console.log('listSlQuestionLogic questionNameTarget ' +index+ ": ", questionNameTarget);
					//console.log('listSlQuestionLogic exampleNameTarget ' +index+ ": ", exampleNameTarget);
					//console.log('listSlQuestionLogic selectTableQuestionValue ' +index+ ": ", selectTableQuestionValue);
					if(questionType != 'tex') {
						// #로직 문항 등록 value != 이전 응답 value
						if(exampleNameTarget != selectTableQuestionValue) {
							var questionSelector = '#'+questionNameBase+'_'+exampleNameTarget;

							//console.log("name questionNameBase",$('[name="'+questionNameBase+'"]'));
							//console.log("id questionNameBase",$('#'+questionNameBase+'_'+exampleNameTarget+''));
							//console.log("questionSelector", questionSelector);
							//console.log("parents('label')",$('[name="'+questionNameBase+'"]').parents('label'));
							//console.log("parents('li')",$('[name="'+questionNameBase+'"]').parents('li'));
							
							$(questionSelector).parents('li').css('display','none');	// 이전 문항응답과 같은 보기만
						}
						// 기타문항 보기 이전 응답 값 가져오기
						if(listSlQuestionLogic.length-1 == index && exampleNameTarget == selectTableQuestionValue) {						
							var preQuestionName = questionNameTarget.split('_');
							var selectTableQuestionEtc = eval("selectTable." + preQuestionName[0] + "_text");	// 기타 응답 값
							var questionSelector = '#'+questionNameBase+'_'+exampleNameTarget;					// 기타 값 selector
							var etcHtml = $(questionSelector).parents('label').html();							// 기타 label 값
							var etcValue = etcHtml.replace('['+questionNameTarget+']', selectTableQuestionEtc);	// 수정된 보기 값 html
													
							//console.log('questionSelector', questionSelector);
							//console.log("$(questionSelector).parents('label')", $(questionSelector).parents('label').html());						
							//console.log('selectTableQuestionEtc', selectTableQuestionEtc);
							//console.log('etcHtml', etcHtml);
							//console.log("etcValue", etcValue);
							
							$(questionSelector).parents('label').html(etcValue);	// 이전 문항응답과 같은 보기만
						}
					} else {	// 오픈 문항
						// #로직 문항 등록 value == 이전 응답 value
						if(exampleNameTarget != selectTableQuestionValue) {
							var questionSelector = '#'+questionNameBase+'_'+exampleNameTarget;

							//console.log("name questionNameBase",$('[name="'+questionNameBase+'"]'));
							//console.log("id questionNameBase",$('#'+questionNameBase+'_'+exampleNameTarget+''));
							//console.log("questionSelector", questionSelector);
							//console.log("parents('tr')",$('[name="'+questionNameBase+'"]').parents('tr'));
							
							//$(questionSelector).parents('tr').css('display','none');	// 이전 문항응답과 같은 보기만
							$(questionSelector).parents('tr').html('');	// 이전 문항응답과 같은 보기만
						}
						// 기타문항 보기 이전 응답 값 가져오기
						if(listSlQuestionLogic.length-1 == index && exampleNameTarget == selectTableQuestionValue) {						
							var preQuestionName = questionNameTarget.split('_');
							var selectTableQuestionEtc = eval("selectTable." + preQuestionName[0] + "_text");	// 기타 응답 값
							var questionSelector = '#'+questionNameBase+'_'+exampleNameTarget;					// 기타 값 selector
							var etcHtml = $(questionSelector).parents('tr').html();								// 기타 tr 값
							var etcValue = etcHtml.replace('['+questionNameTarget+']', selectTableQuestionEtc);	// 수정된 보기 값 html
													
							//console.log('questionSelector', questionSelector);
							//console.log("$(questionSelector).parents('tr')", $(questionSelector).parents('tr').html());						
							//console.log('selectTableQuestionEtc', selectTableQuestionEtc);
							//console.log('etcHtml', etcHtml);
							//console.log("etcValue", etcValue);
							
							$(questionSelector).parents('tr').html(etcValue);	// 이전 문항응답과 같은 보기만
						}
					}
				} else if(logicType == '@') {
					if(questionType != 'tex') {
						// @로직 문항 등록 value == 이전 응답 value
						if(exampleNameTarget == selectTableQuestionValue) {
							var questionSelector = '#'+questionNameBase+'_'+exampleNameTarget;

							//console.log("name questionNameBase",$('[name="'+questionNameBase+'"]'));
							//console.log("id questionNameBase",$('#'+questionNameBase+'_'+exampleNameTarget+''));
							//console.log("questionSelector", questionSelector);
							//console.log("parents('label')",$('[name="'+questionNameBase+'"]').parents('label'));
							//console.log("parents('li')",$('[name="'+questionNameBase+'"]').parents('li'));
							
							$(questionSelector).parents('li').css('display','none');	// 이전 문항응답과 같은 보기만
						}
						// 기타문항 보기 이전 응답 값 가져오기
						if(listSlQuestionLogic.length-1 == index && exampleNameTarget == selectTableQuestionValue) {						
							var preQuestionName = questionNameTarget.split('_');
							var selectTableQuestionEtc = eval("selectTable." + preQuestionName[0] + "_text");	// 기타 응답 값
							var questionSelector = '#'+questionNameBase+'_'+exampleNameTarget;					// 기타 값 selector
							var etcHtml = $(questionSelector).parents('label').html();							// 기타 label 값
							var etcValue = etcHtml.replace('['+questionNameTarget+']', selectTableQuestionEtc);	// 수정된 보기 값 html
													
							//console.log('questionSelector', questionSelector);
							//console.log("$(questionSelector).parents('label')", $(questionSelector).parents('label').html());						
							//console.log('selectTableQuestionEtc', selectTableQuestionEtc);
							//console.log('etcHtml', etcHtml);
							//console.log("etcValue", etcValue);
							
							$(questionSelector).parents('label').html(etcValue);	// 이전 문항응답과 같은 보기만
						}
					} else {	// 오픈 문항
						// @로직 문항 등록 value == 이전 응답 value
						if(exampleNameTarget == selectTableQuestionValue) {
							var questionSelector = '#'+questionNameBase+'_'+exampleNameTarget;

							//console.log("name questionNameBase",$('[name="'+questionNameBase+'"]'));
							//console.log("id questionNameBase",$('#'+questionNameBase+'_'+exampleNameTarget+''));
							//console.log("questionSelector", questionSelector);
							//console.log("parents('tr')",$('[name="'+questionNameBase+'"]').parents('tr'));
							
							//$(questionSelector).parents('tr').css('display','none');	// 이전 문항응답과 같은 보기만
							$(questionSelector).parents('tr').html('');	// 이전 문항응답과 같은 보기만
						}
						// 기타문항 보기 이전 응답 값 가져오기
						if(listSlQuestionLogic.length-1 == index && exampleNameTarget == selectTableQuestionValue) {						
							var preQuestionName = questionNameTarget.split('_');
							var selectTableQuestionEtc = eval("selectTable." + preQuestionName[0] + "_text");	// 기타 응답 값
							var questionSelector = '#'+questionNameBase+'_'+exampleNameTarget;					// 기타 값 selector
							var etcHtml = $(questionSelector).parents('tr').html();							// 기타 tr 값
							var etcValue = etcHtml.replace('['+questionNameTarget+']', selectTableQuestionEtc);	// 수정된 보기 값 html
													
							//console.log('questionSelector', questionSelector);
							//console.log("$(questionSelector).parents('tr')", $(questionSelector).parents('tr').html());						
							//console.log('selectTableQuestionEtc', selectTableQuestionEtc);
							//console.log('etcHtml', etcHtml);
							//console.log("etcValue", etcValue);
							
							$(questionSelector).parents('tr').html(etcValue);	// 이전 문항응답과 같은 보기만
						}
					}
				} else if(logicType == '|') {
					var preQuestionName = questionNameTarget.split('_');
					var selectTableQuestionOpen = eval("selectTable." + preQuestionName[0]);	// 오픈문항 응답 값
					var exampleRange = exampleNameTarget.split('-'); // 응답 범위

					if(exampleRange[0] <= selectTableQuestionOpen && exampleRange[1] >= selectTableQuestionOpen) {
						$('.container').css('display','none');	// 화면 숨기기
						$('input:radio[name="'+questionName+'"]:input[value="'+exampleNameBase+'"]').prop('checked', true); // 해당 보기 체크

						var checkedVal = $('[name="'+questionName+'"]:checked').val(); // 체크된 값
						//console.log('questionName checked', $('[name="'+questionName+'"]:checked').val());

						if(checkedVal != null && checkedVal != '') {
							serveyJs.checkValidation(); // DB 값 입력
							serveyJs.clickBtNext(); // 다음 문항 이동
						}
					}
					//console.log("$('[name='+questionName+']).is(':checked')", $('[name="'+questionName+'"]').is(':checked'));
					//console.log('questionName', questionName);
					//console.log('preQuestionName', preQuestionName);
					//console.log("$(selectTableQuestionOpen)", selectTableQuestionOpen);
					//console.log('exampleRange', exampleRange);
					//console.log("exampleRange[0] <= selectTableQuestionOpen && exampleRange[1] >= selectTableQuestionOpen", exampleRange[0] <= selectTableQuestionOpen && exampleRange[1] >= selectTableQuestionOpen);
				}
			});
		}
		
		// timer 기능 시작
		if(data.listSlQuestionFunction.length > 0) {
			var listSlQuestionFunction = data.listSlQuestionFunction;
			
			$.each(listSlQuestionFunction, function(index, value){
				var functionTextArray = value.functionText;
				var functionText = functionTextArray.split(':');
				
				if(functionText[0] == 'timer') {
					// 타이머 시작
					var customTime = parseInt(functionText[1]) * 1000;
					console.log('timer start');
					$('#bt_next').css('display','none');
					var timer = setInterval(function() { 
						//실행할 스크립트
						serveyJs.customTimer();
						clearInterval(timer); 
					}, customTime);
				}
			});
		}
		// 순위형 시작
		var setOrderArray = new Array();
		$.each($('[sorder]'), function(index, value){
			
			var sNameText = $(this).attr('name');
			var sIdText = $(this).attr('id');
			var sTypeText = $(this).attr('type');
			var sValue = $(this).val();
			
			var checkValue = "";
			$.each(setOrderArray, function(index2, value2){
				if (value2.sNameText == sNameText) {
					checkValue="Y";
				}
			});
			
			if ("" == checkValue) {
				var setOrderObject = new Object();
				setOrderObject.sNameText = sNameText;
				//console.log('setOrderObject.sNameText',setOrderObject.sNameText);
				setOrderArray.push(setOrderObject);
			}
		});
		
		$.each(setOrderArray, function(index, value){
			
			var sNameText = value.sNameText
			var $sName = $('[name="'+sNameText+'"]'); 
			var sNameLen = $sName.length;			
			
			$sName.on('click',function(){
				
				var sOrderFalse = $(this).attr('sorderfalse');
				var textVal = $(this).val();
				console.log('textVal',textVal);
				if (null != textVal.trim() && "" != textVal.trim()) {
					$(this).val('');
					
					var setTextVal = 1;
					$.each($sName, function(index2, value2){
						var textVal2 = $(this).val();
						if (null == textVal2.trim() || "" == textVal2.trim()) {
							textVal2 = 0;
						} else {
							textVal2 = parseInt(textVal2);
						}
						if (textVal < textVal2 ) {
							$(this).val(textVal2 -1);
						}
						console.log('textVal2 -1',textVal2 -1);
					});
					
				} else {
					
					var setTextVal = 1;
					$.each($sName, function(index2, value2){
						var textVal2 = $(this).val();
						if (null == textVal2.trim() || "" == textVal2.trim()) {
							textVal2 = 0;
						} else {
							textVal2 = parseInt(textVal2);
						}
						if (setTextVal <= textVal2) {
							setTextVal = textVal2 +1;
						}
					});
					
					console.log('setTextVal',setTextVal);
					console.log('orderMaxNum',orderMaxNum);
					console.log('sOrderFalse',sOrderFalse);
					
					// 해당없음은 순위 카운트 조건 제외
					if(null != sOrderFalse) {
						$(this).val(setTextVal);
					} else {
						if(setTextVal > orderMaxNum) {
							alert(orderMaxNum + '순위까지 선택하세요.');
						} else {
							$(this).val(setTextVal);
						}
					}
				}
			});
		});
				
		// readonly, disabled
		$.each($('[sreadonly]'), function(index, value){
			
			var sReadonlyText = $(this).attr('sreadonly');
			var sCheckedFalse = $(this).attr('scheckedfalse');
			var sOrderFalse = $(this).attr('sorderfalse');
			var sNameText = $(this).attr('name');
			var sIdText = $(this).attr('id');
			var sTypeText = $(this).attr('type');
			var sValue = $(this).val();
			var $sName = $('[name="'+sNameText+'"]'); 
			
			console.log('sReadonlyText',sReadonlyText);
			console.log('sCheckedFalse',sCheckedFalse);
			console.log('sOrderFalse',sOrderFalse);
			console.log('sNameText',sNameText);
			console.log('sIdText',sIdText);
			console.log('sTypeText',sTypeText);
			console.log('---------------------');
			
			$sName.on('click',function(){
				
				var clickIndex = $(this).index('[name="'+sNameText+'"]');
				var checkIndex = $('#'+sIdText).index('[name="'+sNameText+'"]');
				
				if ("radio" == sTypeText || "checkbox" == sTypeText) {
					
					// checkbox
					if (null != sCheckedFalse) {
						
						if ($('#'+sIdText).is(':checked')) {
							
							$.each($sName, function(index2, value2){
								if (index2 != checkIndex) {
									$(this).attr('checked',false);
									$(this).attr('disabled',true);
								}
							});
							$('#'+sReadonlyText).attr('readonly',false);
							
						} else {
							$.each($sName, function(index2, value2){
								$(this).attr('disabled',false);
							});
							$('#'+sReadonlyText).val('');
							$('#'+sReadonlyText).attr('readonly',true);
						}	
					// radio
					} else {
						
						var checkedVal = $('#'+sIdText+':checked').val();
						if (sValue == checkedVal) {
							$('#'+sReadonlyText).attr('readonly',false);
						} else {
							$('#'+sReadonlyText).val('');
							$('#'+sReadonlyText).attr('readonly',true);
						}
					}
					
				} else if ("text" == sTypeText) {
										
					var checkedVal = $('#'+sIdText).val();
					console.log('click checkedVal',checkedVal);
					console.log('click sReadonlyText',sReadonlyText);
					if(null != sOrderFalse) {
						// 순위형 해당없음
						if (0 < checkedVal) {
							console.log('해당없음 발동');
							$.each($sName, function(index2, value2){
								//console.log('click index2',index2);
								//console.log('click checkIndex',checkIndex);
								if (index2 != checkIndex) {
									//console.log('click $(this)',$(this));
									$(this).val('');
									$(this).attr('disabled',true);
								} else {
									$(this).val('V');
								}
							});
							$('#'+sReadonlyText).attr('readonly',false);
						} else {
							console.log('해당없음 해제');
							$.each($sName, function(index2, value2){
								$(this).attr('disabled',false);
							});
							$('#'+sReadonlyText).val('');
							$('#'+sReadonlyText).attr('readonly',true);
						}	
						
						
					} else {
						if (null != checkedVal && "" != checkedVal) {
							$('#'+sReadonlyText).attr('readonly',false);							
						} else {
							$('#'+sReadonlyText).val('');
							$('#'+sReadonlyText).attr('readonly',true);
						}
					}
					
				}
			});
		});
		
		// att
		var setAttArray = new Array();
		$.each($('.addrow'), function(index, value){
			var $tables = $(this);
			$tables.find('tr:gt(1)').css('display','none');
			
			$tables.find('input[type="radio"]').each(function(){
				var $radios = $(this);
				$radios.on('click',function(){
					var rVal = $(this).val();
					if (null != rVal && "" != rVal) {
						//var trNum = $(this).closest('tr').prevAll().length;
						$(this).closest('tr').next().css('display','');
					}
				});
			});
		});
		
		var setAttArray = new Array();
		$.each($('.addrowmul'), function(index, value){
			var $tables = $(this);
			$tables.find('tr:gt(1)').css('display','none');
			
			$('[name="bt_addrowmul"]').on('click',function(){
				//var trNum = $(this).closest('tr').prevAll().length;
				
				var checkedState = false;
				$(this).closest('tr').find('input[type="checkbox"]').each(function(){
					if ($(this).is(":checked")) {
						checkedState = true;
					}
				});
				if (checkedState) {
					$(this).closest('tr').next().css('display','');
				}
			});
		});
		
		$.each($('.addcol'), function(index, value){
			var $tables = $(this);
			$.each($tables.find('tbody tr'), function(index, value){
				var $tr = $(this);
				$.each($tr.find('td'), function(index, value){
					if (1 < index) {
						$(this).css('display','none');
					}
				});
			});
			
			$tables.find('input[type="radio"]').each(function(){
				var $radios = $(this);
				$radios.on('click',function(){
					var rVal = $(this).val();
					if (null != rVal && "" != rVal) {
						var tdNum = $(this).closest('td').prevAll().length;
						//console.log('tdNum',tdNum);
						
						$.each($tables.find('tbody tr'), function(index, value){
							var $tr = $(this);
							$.each($tr.find('td'), function(index, value){
								if ( index == (parseInt(tdNum)+1) ) {
									$(this).css('display','');
								}
							});
						});
					}
				});
			});
		});
		
		//setKeyup
		// 특수문자 [\[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"\\]

		// onlynumber 숫자만
		$.each($('[onlynumber]'), function(index, value){
			var $onlynumber = $(this);
			$onlynumber.keyup(function(){
				$(this).val($(this).val().replace(/[^0-9]/g,""));
			});
		});
		// onlykorean 한글만
		$.each($('[onlykorean]'), function(index, value){
			var $onlynumber = $(this);
			$onlynumber.keyup(function(){
				$(this).val($(this).val().replace(/[a-zA-Z0-9]|[\[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"\\]/g,""));
			});
		});
		// onlyenglish 영문만
		$.each($('[onlyenglish]'), function(index, value){
			var $onlynumber = $(this);
			$onlynumber.keyup(function(){
				//$(this).val($(this).val().replace(/[0-9]|[^\!-z]/gi,""));
				$(this).val($(this).val().replace(/[^a-zA-Z]/g,""));
			});
		});
		// kornumber 한글+숫자
		$.each($('[kornumber]'), function(index, value){
			var $onlynumber = $(this);
			$onlynumber.keyup(function(){
				$(this).val($(this).val().replace(/[^(ㄱ-힣0-9)]/gi,""));
			});
		});
		// engnumber 영문+숫자
		$.each($('[engnumber]'), function(index, value){
			var $onlynumber = $(this);
			$onlynumber.keyup(function(){
				$(this).val($(this).val().replace(/[^(a-zA-Z0-9)]/gi,""));
			});
		});
		// koreantext 한글+특문
		$.each($('[koreantext]'), function(index, value){
			var $onlynumber = $(this);
			$onlynumber.keyup(function(){
				$(this).val($(this).val().replace(/[a-zA-Z0-9]|/g,""));
			});
		});
		// englishtext 영문+특문
		$.each($('[englishtext]'), function(index, value){
			var $onlynumber = $(this);
			$onlynumber.keyup(function(){
				$(this).val($(this).val().replace(/[0-9]|[^\!-z]/g,""));
			});
		});
		// numbertext 숫자+특문
		$.each($('[numbertext]'), function(index, value){
			var $onlynumber = $(this);
			$onlynumber.keyup(function(){
				$(this).val($(this).val().replace(/[a-zA-Z]|[^\!-z]/g,""));
			});
		});
		// korengtext 한글+영문+특문
		$.each($('[korengtext]'), function(index, value){
			var $onlynumber = $(this);
			$onlynumber.keyup(function(){
				$(this).val($(this).val().replace(/[0-9]/g,""));
			});
		});
		// onlykoreng 한글+영문
		$.each($('[onlykoreng]'), function(index, value){
			var $onlynumber = $(this);
			$onlynumber.keyup(function(){
				$(this).val($(this).val().replace(/[^(ㄱ-힣a-zA-Z)]/gi,""));
			});
		});
		
		$.each($('[smedia]'), function(index, value){
			var timer = $(this).attr('timer');
			setPageTime = timer;
			window.onload = function TimerStart(){
				$('#bt_next').css('display','none');
				tid=setInterval('serveyJs.msgTimer()',1000) 
			};
		});
		
		$.each($('[textwidth]'), function(index, value){
			var sNameText = $(this).attr('name');
			var sIdText = $(this).attr('id');
			var sTypeText = $(this).attr('type');
			var sValue = $(this).val();
			var sTextWidthVal = $(this).attr('textwidth');
			//console.log('sTextWidthVal',sTextWidthVal);
			//console.log('this val',$(this).val());
			$(this).css('width',sTextWidthVal);
		});
		
		$.each($('[onlymoney]'), function(index, value){
			var sNameText = $(this).attr('name');
			var sIdText = $(this).attr('id');
			var sTypeText = $(this).attr('type');
			
			$(this).keyup(function(){
				
				$(this).val($(this).val().replace(/[^0-9]/g,""));
				//$(this).val($(this).val().replace(/[^0-9]|[,]/g,""));
				var num = $(this).val();
				console.log('keyup',num);
				
				var str = num;
				if (num.length > 3 || num >= 1000 ) {
					
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
				$('[name="'+sNameText+'"]').val(str);
				
				var $getLi = $(this).parent();
				var koreanMoney = serveyJs.setKoreanMoney(num);
				$getLi.find('div:eq(0)').html(koreanMoney);
			});
		});
		
		$.each($('[onlyemail]'), function(index, value){
			var $onlyemail = $(this);
			$onlyemail.keyup(function(){
				$(this).val($(this).val().replace(/[^a-z0-9@.]/gi,""));
			});
		});
		
		$.each($('[onlyphone]'), function(index, value){
			var $onlynumber = $(this);
			$onlynumber.keyup(function(){
				$(this).val($(this).val().replace(/[^0-9]/g,""));
			});
		});
		
		$.each($('[customOnlyphone]'), function(index, value){
			var $customOnlyphone = $(this);
			$customOnlyphone.keyup(function(){
				$(this).val($(this).val().replace(/[^0-9]/g,""));
				if (this.value.length == this.maxLength) {
					$(this).next('.customOnlyphone').focus(); 
				} 
			});
		});
		
		$.each($('[customonlyemail]'), function(index, value){
			var $customonlyemail = $(this);
			$customonlyemail.keyup(function(){
				$(this).val($(this).val().replace(/[^a-z0-9@.]/gi,""));
			});
			//이메일 입력방식 선택 
			$customonlyemail.change(function(){ 
				$("#selectEmail option:selected").each(function (){ 
					//console.log('$(this).val()', $(this).val());
					
					if($(this).val()== '1'){ 
						// 직접입력일 경우 
						$("#email_2").val(''); //값 초기화 
						$("#email_2").attr("readonly", false); // 활성화 
						$("#email_2").focus();
					} else { 
						// 직접입력이 아닐경우 
						$("#email_2").val($(this).val()); // 선택값 입력 
						$("#email_2").attr("readonly", true); // 비활성화
					}
					
				}); 
			});
		});
		// onlynumber
		// onlykorean
		// onlyenglish
		// onlymoney
		// onlyphone
		// onlyemail
		
		// textwidth 시작
		if(data.listSlQuestionLogic.length > 0) {
			var listSlQuestionLogic = data.listSlQuestionLogic;
			var selectSlQuestion = data.selectSlQuestion;
			var listSlQuestion = data.listSlQuestion;
			var listSlExample = '';
			var questionType = selectSlQuestion.questionType;

			console.log('textwidth listSlQuestion', listSlQuestion);
			console.log('textwidth listSlExample', listSlExample);

			$.each(listSlQuestionLogic, function(index, value){
				var logicType = value.logicType;	// 로직 타입
				var questionNameBase = value.questionNameBase;	// 현재 문항이름				
				var textWidth = value.exampleValueBase;			// 텍스트 크기 값

				console.log('textwidth logicType', logicType);
				console.log('textwidth questionType', questionType);
				console.log('textwidth questionNameBase', questionNameBase);
				console.log('textwidth textWidth', textWidth);

				if(logicType == 'textWidth') {					
					if(questionType == 'tex') {
						// 오픈문항인경우
						$.each(listSlQuestion, function(index2, value2){
							if(value2.questionName == questionNameBase) {
								listSlExample = value2.listSlExample;
							}
						});
						if(listSlExample != null && listSlExample.length > 0) {
							$.each(listSlExample, function(index2, value2){
								$('[name="'+questionNameBase+'_'+(index2+1)+'"]').css('width',textWidth);
								$('[name="'+questionNameBase+'_'+(index2+1)+'"]').attr('textwidth',textWidth);
							});
						}
					} else if(questionType == 'num') {
						// 숫자 타입
						$('[name="'+questionNameBase+'"]').css('width',textWidth);
						$('[name="'+questionNameBase+'"]').attr('textwidth',textWidth);
						console.log($('[name="'+questionNameBase+'"]'));
					} else {
						// 나머지 타입
						$('[name="'+questionNameBase+'_text"]').css('width',textWidth);
						$('[name="'+questionNameBase+'_text"]').attr('textwidth',textWidth);
						console.log($('[name="'+questionNameBase+'_text"]'));
					}
				}
			});
		}
	},	
	customTimer : function (){
		console.log('customTimer start');
		$('#bt_next').css('display','');
	},
	setGoUrl : function (questionName, questionLogic) {
		console.log('setGoUrl questionName',questionName); 		// Q2
		console.log('setGoUrl questionLogic',questionLogic); 	// Q2:0=Q4,Q2:1=Q5,Q2:2=Q6,Q2=Q1
		
		if (null != questionLogic) {
			
			var questionArray = questionLogic.split(',');
			$.each(questionArray,function(qIndex,qValue){
				
				var question = "";
				var example = "";
				var nextUrl = "";
				
				var urlArray = qValue.split('=');
				var nextUrlObject = new Object();
				nextUrlObject.questionName = questionName;
				
				$.each(urlArray,function(uIndex,uValue){
					
					if (0==uIndex) {
						//console.log('question, example',uValue);
						
						var exampleArray = uValue.split(':');
						$.each(exampleArray,function(eIndex,eValue){
							if (0==eIndex) {
								question = eValue
							} else {
								example = eValue
							}
						});
					} else {
						nextUrl = uValue;
					}
					
				});
				
				//console.log('question',question);
				//console.log('example',example);
				//console.log('next url',nextUrl);
				nextUrlObject.question = question;
				nextUrlObject.example = example;
				nextUrlObject.nextUrl = nextUrl;
				nextUrlArray.push(nextUrlObject);
			});
		}
		
	},
	clickBtNext : function() {
		
		var data = setResponseData;
		console.log('clickBtNext setResponseData',data);
		if (null != data) {
			var checkNowPage = data.checkNowPage;
			var selectSlProject = data.selectSlProject;
			var listSlQuestion = data.listSlQuestion;
			var selectCurrentData = setlistSlSurvey;
			var selectSlQuater = data.selectSlQuater;
			var quaterType = "";
			if("" != selectSlQuater && null != selectSlQuater){
				quaterType = selectSlQuater.quaterType;
			}
			var listSlQuestionLogic = data.listSlQuestionLogic;
			var listSlQuaterQuestion = data.listSlQuaterQuestion;
			var listSlRotationMain = data.listSlRotationMain;
			var selectSlRotationMain = data.selectSlRotationMain;
			var selectTable = data.selectTable;
			
			if (null != checkNowPage) {
				
				var uCode = $('[name="uCode"]').val();
				var businessId = $('[name="businessId"]').val();			
				//var checkValidation = serveyJs.checkValidation();
				
				//if (checkValidation) {

					var questionId = $('[name="questionId"]').val();
					var questionName = $('[name="questionName"]').val();
					var surveyResult = $('[name="surveyResult"]').val();
					var customNextPageName = $('[name="nextPageName"]').val();
					var finalRotQuestion = '';
					var quotaOutResult = false;
					
					if (null != questionId && '' != questionId
							&& null != questionName && '' != questionName) {
							
							var questionIdArray = questionId.split(',');
							var questionIdArrayLen = questionId.length;
							var questionNameArray = questionName.split(',');
							var questionNameArrayLen = questionName.length;
							if (0 < questionIdArrayLen) {
								questionId = questionIdArray[0];
								questionName = questionNameArray[0];
							} 
					}
					//http://localhost:8080/upload/hardCoding/v02/67/Q21.jsp?uCode=1111&checkNum=371
					//var nowPageId = checkNowPage.nowPageId;
					//var nowPageName = checkNowPage.nowPageName;
					//var nowPageCheckNum = checkNowPage.nowPageCheckNum;
					//var prePageId = checkNowPage.prePageId;
					//var prePageName = checkNowPage.prePageName;
					//var prePageCheckNum = checkNowPage.prePageCheckNum;
					var nextPageId = checkNowPage.nextPageId;
					var nextPageName = checkNowPage.nextPageName;
					var nextPageCheckNum = checkNowPage.nextPageCheckNum;
					
					
					if (null != listSlQuestionLogic) {
						// 응답 값
						var checkedValue = $('[name="'+questionName+'"]:checked').val();
						console.log('nextMove checkedValue',checkedValue);
						// 다음 이동 체크
						$.each(listSlQuestionLogic, function(index, value) {
							console.log('nextMove value.exampleNameBase',value.exampleNameBase);
							console.log('nextMove value.questionNameTarget',value.questionNameTarget);
							if('move' == value.logicType && checkedValue == value.exampleNameBase) {
								// 응답 값 == 다음이동 설정된 문항								
								if(value.questionNameTarget == 'OUT') {
									surveyResult = 'S';	// 스크린 아웃
								} else {
									customNextPageName = value.questionNameTarget;	// 문항 이동 설정
								}
								return false;
							}
						});
						console.log('nextMove surveyResult',surveyResult);
						console.log('nextMove customNextPageName',customNextPageName);
					}

					// 쿼터 조건 시작
					console.log('selectSlQuater',selectSlQuater);
					console.log('listSlQuaterQuestion',listSlQuaterQuestion);
					console.log('quaterType',quaterType);					
					
					if("" != quaterType && "2" != quaterType) {	// 단수,복수 쿼터인 경우
						console.log('단수,복수 쿼터인 경우');
						var quotaQuestionNullCount = 0;	// 응답한 쿼터 문항 체크
						var quotaQuestionLength = 0;
						var quotaContent = "";	// 쿼터테이블 조회를 위한 변수
						var exampleValue = selectCurrentData[0].exampleValue;	// 현재 응답 값
						//console.log('selectCurrentData[0].exampleValue',selectCurrentData[0].exampleValue);
						//console.log('selectSlQuater setlistSlSurvey', setlistSlSurvey);
						// 쿼터가 등록된 설문
						if (null != selectSlQuater && null != listSlQuaterQuestion) {
							
							var quotaQuestionId = new Array();		
							var quotaQuestionName= new Array();	
							var quotaQuestionCheck = false;
							
							// 쿼터 문항 Id 배열로 선언
							$.each(listSlQuaterQuestion, function(index, value) {			
								quotaQuestionId[index] = value.questionId;
								
								$.each(listSlQuestion, function(index2, value2) {
									if(quotaQuestionId[index] == value2.questionId) {
										quotaQuestionName[index] = value2.questionName;
										return false;
									}					
								});							
							});
							
							// 쿼터 문항 개수
							quotaQuestionLength = quotaQuestionName.length;
							
							console.log('quotaQuestionId',quotaQuestionId);
							console.log('quotaQuestionName',quotaQuestionName);
							console.log('quotaQuestionLength',quotaQuestionLength);
												
							// 쿼터 응답 문항 null 체크
							var quotaValue = new Array();						
							for(var i in quotaQuestionName) {					
								console.log('selectTable.quotaQuestionName['+i+']',eval("selectTable."+ quotaQuestionName[i]));
								console.log('quotaQuestionName['+i+']',quotaQuestionName[i]);
								quotaValue[i] = eval("selectTable."+ quotaQuestionName[i]);								
								console.log('quotaValue['+i+']',quotaValue[i]);
								if(quotaValue[i] != undefined && quotaValue[i] != null) {
									quotaQuestionNullCount++;
								}
							}
							
							// 쿼터 제한 값 칼럼 구하기
							for(var i in quotaQuestionName) {
								if(quotaQuestionName[i] == questionName) {	
									// 마지막 문항이면	
									quotaContent += ">" + quotaQuestionName[i] + ":" + exampleValue;
								} else {
									// 이전 문항이면
									quotaContent += ">" + quotaQuestionName[i] + ":" + quotaValue[i];	
								}
							}
							console.log('quotaContent',quotaContent);
							
							// 쿼터 문항 판별
							for(var i in quotaQuestionId) {
								if(questionId == quotaQuestionId[i]) {
									quotaQuestionCheck = true;
									break;
								}
							}
							
							console.log('quotaQuestionCheck',quotaQuestionCheck);
							
							// 쿼터 문항이면
							if(quotaQuestionCheck) {
								
								// (nullcount의 길이-1) (현재 쿼터 문항을 제외) 와 문항의 개수가 맞으면
								// 쿼터 문항 중 마지막 문항이면 쿼터 체크
								console.log('quotaQuestionNullCount',quotaQuestionNullCount);
								console.log('quotaQuestionLength',quotaQuestionLength);
								
								if(quotaQuestionLength-1 == quotaQuestionNullCount) {	// 쿼터 응답값이 모두 null이 아니면 쿼터 테이블과 데이터 체크
									
									var listSlQuaterCount = selectSlQuater.listSlQuaterCount;
									$.each(listSlQuaterCount, function(index, value) {	
										if(quotaContent == value.quaterContent) { // 쿼터조건 문항 조회 배열 중 1개만 조회됨
											
											console.log('quotaContent',quotaContent);
											console.log('value.quaterContent',value.quaterContent);
											
											var quaterTotalCount = value.quaterTotalCount;	// quaterTotalCount 전체										
											var quaterActiveCount = value.quaterActiveCount; // quaterActiveCount 쿼터참여 수
											
											console.log('quaterActiveCount',quaterActiveCount);
											console.log('quaterTotalCount',quaterTotalCount);
											
											console.log('quaterActiveCount >= quaterTotalCount',quaterActiveCount >= quaterTotalCount);
											if(quaterActiveCount >= quaterTotalCount) { 
												// 쿼터참여 수 >= 전체 수 (쿼터 아웃이면)
												surveyResult = 'Q';
												quotaOutResult = true;
												alert('쿼터 아웃');
											}
										}
									});
								}	
							}
							
							if (questionId == nextPageId && questionName == nextPageName) {
								// 쿼터가 등록된 설문의 마지막 문항이면 쿼터참여정보 수정
								console.log('quota final question quotaContent', quotaContent);
								var returnVal = serveyJs.setSlQuaterCount(quotaContent);
								console.log('quota final question returnVal', returnVal);
							}
						} // 쿼터 조건 끝				
					} else if("2" == quaterType) {	// 완료 쿼터인 경우
						console.log('완료 쿼터인 경우');
						if (questionId == nextPageId && questionName == nextPageName) {
							// 마지막 문항이면 쿼터참여정보 수정
							var quotaContent = "Finish"; 
							var returnVal = serveyJs.setSlQuaterCount(quotaContent);
							console.log('"2" == quaterType returnVal', returnVal);
						}
					}
					
					var rotMainSetUser = '';
					var selectSlRotationMainQuestionName = '';
					var exitQuestionName = '';
					
					// 문항 로테이션 시작
					if (null != selectSlRotationMain) {
						// 문항 로테이션 사용자 선택형	
						$.each(listSlRotationMain, function(index, value) {
							rotMainSetUser = value.rotMainSetUser;
							console.log('listSlRotationMain rotMainSetUser', rotMainSetUser);											
							
							// 로테이션 메인 문항이면 다음페이지
							if(value.rotMainQuestionName == questionName) {
								return false;
							}
							
							// 메인로테이션 리스트 중 현재 로테이션 메인 문항비교
							selectSlRotationMainQuestionName = selectSlRotationMain.rotMainQuestionName;
							console.log('listSlRotationMain value.rotMainQuestionName', value.rotMainQuestionName);
							console.log('listSlRotationMain selectSlRotationMainQuestionName', selectSlRotationMainQuestionName);
							
							if(rotMainSetUser == 'Y' && value.rotMainQuestionName == selectSlRotationMainQuestionName ) {
								
								// 로테이션 마지막 문항 이름 구하기
								/*var listSlRotationPart = value.listSlRotationPart;
								var selectRotationPart = listSlRotationPart[index];
								var listSlRotationQuestion = selectRotationPart.listSlRotationQuestion;
								var listSlRotationQuestionLen = listSlRotationQuestion.length;
								var rotQuestionName = listSlRotationQuestion[listSlRotationQuestionLen-1].rotQuestionName;	// 로테이션 마지막 문항 이름
								console.log('listSlRotationMain rotQuestionName', rotQuestionName);
								*/
								
								var rotQuestionName = value.rotFinalQuestionName;
								var rotMainQuestionName = value.rotMainQuestionName; 
								// 로테이션 메인 문항 == selecttable 응답 문항의 길이(n) 을 구한다
								var qValueArr = '';
								var qValueLen = '';
								
											
								eval("var qValue = " + "selectTable." + rotMainQuestionName + ";");	
								console.log('selectTable qValue', qValue);						
								console.log('selectTable qValue.indexOf', qValue.indexOf(','));
								
								if(qValue.indexOf(',') == -1) {
									// 응답값이 1개 일때
									finalRotQuestion = rotQuestionName;
								} else {	
									// 응답값이 2개 이상일때
									qValueArr = qValue.split(',');
									qValueLen = qValueArr.length;
									eval("finalRotQuestion = " + "'rot" + qValueLen + "" + rotQuestionName + "';");
									console.log('qValueArr', qValueArr);
									console.log('qValueLen', qValueLen);
								}
								
								// 현재 문항의 이름 == 마지막 로테이션 문항이면(rot n 번째의 마지막 문항)							
								console.log('finalRotQuestion', finalRotQuestion);
								console.log('questionName', questionName);
								console.log('questionName == finalRotQuestion', questionName == finalRotQuestion);
								
								if(questionName == finalRotQuestion) {
									// 사용자 선택 응답값에 마지막 로테이션 문항이면
									// nextPageName 재 정의 (로테이션 종료 후 문항)
									exitQuestionName = value.exitQuestionName;								
									customNextPageName = exitQuestionName;
									console.log('exitQuestionName', exitQuestionName);
								}
							}
						});
					}
					// 문항 로테이션 끝				
					
					console.log('clickBtNext nextPageName',nextPageName);
					
					// 응답문항에 따른 페이지 이동 시 다음 페이지와 체크넘 재 설정
					if(null != customNextPageName && '' != customNextPageName) {
						nextPageName = customNextPageName;
						nextPageCheckNum = serveyJs.getCheckNum(customNextPageName);
						
						console.log('customNextPageName nextPageName',nextPageName);
						console.log('customNextPageName nextPageCheckNum',nextPageCheckNum);
					}
					
					// 리스트 조사시 tb_answer2 완료 데이터 삽입, 캐시적립 X 
					var useResearList = selectSlProject.useResearList;
					var useResearBanner = selectSlProject.useResearBanner;
					
					//console.log('clickBtNext useResearList',data.selectSlProject.useResearList);
					//console.log('clickBtNext useResearList',useResearList);
					
					// 마지막 페이지
					// 캐시적립 페이지로 파라미터 넘기기
					//<파라미터> retparam=회원코드|비즈ID|설문결과
					//<설문결과)> (C)완료, (S)스크리닝 아웃, (Q)쿼터아웃, (F)조사종료 [주의: 대문자]
										
					if (questionId == nextPageId && questionName == nextPageName) {
						// sl_survey_00 테이블의 surveyState 상태값 변경
						
						alert('마지막 페이지!!');
						if(uCode == 1111) {
							alert('테스트 계정 응답 완료');
						} else if(useResearList == 1) {	// 리스트 조사
							var listResult = serveyJs.insertTbAnswer2(data);
							if(listResult) {
								alert('리스트/배너 조사 완료');							
							}
						} else if(useResearBanner == 1) {	// 배너 조사
							alert('배너 조사 완료');	
						} else {
							alert('일반 설문 조사 완료');
							location.href="http://www.netpoint.co.kr/html/front/nc/survey/getCash_v1.jsp?retparam="+uCode+"|"+businessId+"|C";
						}
					} else if(surveyResult == 'S' || surveyResult == 'Q') {
						alert('설문 중단!!');
						if(uCode == 1111) {
							alert('테스트 계정 응답 완료');
						} else if(useResearList == 1) {	// 리스트 조사
							var listResult = serveyJs.insertTbAnswer2(data);
							if(listResult) {
								alert('리스트 응답 스크린/쿼터 아웃');
							}
						} else if(useResearBanner == 1) {	// 배너 조사
							alert('배너 응답 스크린/쿼터 아웃');
						} else if(quotaOutResult) {
							alert('일반 설문 쿼터 아웃');
							location.href="http://www.netpoint.co.kr/html/front/nc/survey/getCash_v1.jsp?retparam="+uCode+"|"+businessId+"|"+surveyResult;
						} else {
							alert('일반 설문 스크린/쿼터 아웃');
							location.href="http://www.netpoint.co.kr/html/front/nc/survey/getCash_v1.jsp?retparam="+uCode+"|"+businessId+"|"+surveyResult;
						}
					} else {						
						if ('' != nextPageName && '' != nextPageCheckNum) {							
									
							//if('' != exitQuestionName && '' != exitQuestionName) {
							/*if(questionName == 'Q5') {
								console.log('exitQuestionName',exitQuestionName);
								console.log('nextPageName',nextPageName);
								console.log('nextPageCheckNum',nextPageCheckNum);
							} else {*/
							//if(confirm('콘솔확인?')) {
								var goSurveyPath = serveyJs.getSurveyPath();								
								if ('' != goSurveyPath) {									
									location.href=localhost+ goSurveyPath + nextPageName +".jsp?uCode=" + uCode + "&checkNum="+ nextPageCheckNum;									
								}
							//}
							//}
						}
					}
				//}
			}
		}		
	},
	checkValidation :function () {
		
		var checkMoveQType = $('[name="checkMoveQType"]').val();
		var questionName = $('[name="questionName"]').val();
		//var exampletext = $('[name="questionName"]').val();
		console.log('checkValidation questionName',questionName);
		//console.log('checkValidation exampletext',exampletext);
		var setSurvey = false;
		
		if ('N' == checkMoveQType) {
			
			var useTimer = false;
			$.each($('[smedia]'), function(){
				useTimer = true;
			});
			
			if (useTimer) {
				if (0 < setPageTime) {
					alert('Not the end of the time limit.');
					setSurvey = false;
				} else {
					setSurvey = true;
				}
			} else {
				setSurvey = true;
			}
			
			if (setSurvey) {
				setSurvey = serveyJs.setSurvey(null);
			}
			
		} else {
			
			var projectId = $('[name="projectId"]').val();
			var hardCodingId = $('[name="hardCodingId"]').val();
			var questionId = $('[name="questionId"]').val();
			var uCode = $('[name="uCode"]').val();
			//var tableName = $('[name="tableName"]').val();
			
			var questionIdArray = questionId.split(',');
			var questionIdArrayLen = questionId.length;
			var questionNameArray = questionName.split(',');
			var questionNameArrayLen = questionName.length;
			
			var listSlSurvey = new Array();
			var returnState = true;
			
			// Input value can be only numbers
			// Required user input field
			
			var setNameArray = new Array();
			$('#setBody').find('input[type]').each(function(){
				
				var sNameText = $(this).attr('name');
				var sTypeText = $(this).attr('type');
				//console.log('#setBody sNameText',sNameText);
				//console.log('#setBody sTypeText',sTypeText);
				
				var checkValue = "";
				$.each(setNameArray, function(index2, value2){
					
					//console.log('checkValidation value2.sNameText :' + index2 ,value2.sNameText);
					//console.log('checkValidation sNameText:' + index2 ,sNameText);
					if (value2.sNameText == sNameText)
						checkValue="Y";
				});
				
				if ("" == checkValue) {
					var setNameObject = new Object();
					setNameObject.sNameText = sNameText;
					setNameObject.sTypeText = sTypeText;
					setNameArray.push(setNameObject);
				}
			});
			
			$('#setBody').find('textarea').each(function(){
				var sNameText = $(this).attr('name');
				var checkValue = "";
				$.each(setNameArray, function(index2, value2){
					
					if (value2.sNameText == sNameText)
						checkValue="Y";
				});
				
				if ("" == checkValue) {
					var setNameObject = new Object();
					setNameObject.sNameText = sNameText;
					setNameObject.sTypeText = 'textarea';
					setNameArray.push(setNameObject);
				}
			});
			//console.log('setNameArray',setNameArray);
			
			$.each(setNameArray,function(index,value){
				
				if (0 < questionIdArrayLen) {
					
					questionId = questionIdArray[index];
					questionName = questionNameArray[index];
				} 
				
				console.log('group name value.sNameText',value.sNameText);
				console.log('group type value.sTypeText',value.sTypeText);
				
				var sNameText = value.sNameText;
				var sTypeText = value.sTypeText;
				var $inputName = $('[name="'+sNameText+'"]');
				//http://localhost:8080/upload/hardCoding/v02/55/Q11.jsp?uCode=1111
				if ('radio' == sTypeText) {
					var setExample = new Object();
					var radioVal = $('input:radio[name='+sNameText+']:checked').val();
					//var sExampleId = $('input:'+sTypeText+'[name='+sNameText+']:checked').attr('exampleid');
					var sExampleText = $('input:radio[name='+sNameText+']:checked').attr('exampletext');
					var sExampleIndex = $('input:radio[name='+sNameText+']:checked').attr('exampleindex');
					console.log('radio radioVal val',radioVal);
					
					if (null == radioVal || "" == radioVal) {
						//alert('Required user input field ('+sTypeText+')');
						alert('['+sNameText+']번에 대한 응답을 하지 않았습니다 \n\n응답을 해주세요');
						$('input:radio[name='+sNameText+']').eq(0).focus();
						returnState = false;
						//console.log('radioVal', radioVal);
						return false;
					} else {
						setExample.uCode=uCode;
						//setExample.tableName=tableName;
						setExample.projectId=projectId;
						setExample.hardCodingId=hardCodingId;
						setExample.questionId=questionId;
						setExample.questionName=questionName;
						setExample.questionType=sTypeText;
						//setExample.exampleId=sExampleId;
						setExample.exampleText=sExampleText;
						setExample.exampleIndex=sExampleIndex;
						setExample.exampleValue=radioVal;
						listSlSurvey.push(setExample);
						
						returnState = true;
					}
					
				} else if ('checkbox' == sTypeText) {
					
					//var checkboxVal = $('input:checkbox[name='+sNameText+']:checked').val();
					var checkboxVal = '';
					var sExampleText = '';
					var sExampleIndex = '';
					
					/*
					$('input:checkbox[name='+sNameText+']:checked').each(function(index,value){
						if (0 != index) {
							checkboxVal = checkboxVal + ',' + $(this).val(); 
						} else {
							checkboxVal = checkboxVal + $(this).val();
						}
					});
					var sExampleText = $('input:checkbox[name='+sNameText+']:checked').attr('exampletext');
					var sExampleIndex = $('input:checkbox[name='+sNameText+']:checked').attr('exampleindex');
					console.log('checkbox checkboxVal val',checkboxVal);
					*/
					
					if($('input:checkbox[name='+sNameText+']:checked').length == 0) {
						//alert('Required user input field ('+sTypeText+')');
						alert('['+sNameText+']번에 대한 응답을 하지 않았습니다 \n\n응답을 해주세요');
						$('input:checkbox[name='+sNameText+']').eq(0).focus();
						returnState = false;
						//console.log('checkboxVal', checkboxVal);
						return false;
					}
					
					$('input:checkbox[name='+sNameText+']:checked').each(function(index,value){
						//sExampleText = $('input:checkbox[name='+sNameText+']:checked').attr('exampletext');
						//sExampleIndex = $('input:checkbox[name='+sNameText+']:checked').attr('exampleindex');
						
						sExampleText = $(this).attr('exampletext');
						sExampleIndex = $(this).attr('exampleindex');
						checkboxVal = $(this).val();
						
						console.log('checkbox sExampleText',sExampleText);
						console.log('checkbox sExampleIndex',sExampleIndex);
						console.log('checkbox exampleValue',checkboxVal);
						
						//console.log('checkbox checkboxVal val',checkboxVal);
						
						var setExample = new Object();
						setExample.uCode=uCode;
						//setExample.tableName=tableName;
						setExample.projectId=projectId;
						setExample.hardCodingId=hardCodingId;
						setExample.questionId=questionId;
						setExample.questionName=questionName;
						setExample.questionType=sTypeText;
						setExample.exampleIndex=sExampleIndex;
						setExample.exampleValue=checkboxVal;
						setExample.exampleText=sExampleText;
						//setExample.exampleId=sExampleId;
						listSlSurvey.push(setExample);
						
						console.log('checkbox setExample',setExample);
						
						returnState = true;
					});					
					
				} else if ('text' == sTypeText) {	// 순위형도 포함
					
					// orderMaxNum = 3;
					var checkTextId = "";
					var checkTextIdVal = "";
					var checkTextIdCount = "";
					
					$.each($inputName,function(){
						var textIdVal = $(this).val();
						var textIdIsOrder = $(this).is('[sorder]'); 
						if (null != textIdVal && "" != textIdVal) {
							if (textIdIsOrder) {
								checkTextIdCount++;
							} 
						}
					});
					
					$.each($inputName,function(){
						console.log('$inputName', $inputName);
						var textId = $(this).attr('id');
						var textIdType = $(this).attr('type');
						var textIdVal = $(this).val();
						//var sExampleId = $(this).attr('exampleid');
						var sExampleText = $(this).attr('exampleText');
						var sExampleIndex = $(this).attr('exampleindex');
						
						var textIdIsOrder = $(this).is('[sorder]'); 
						var textIdIsReadonly = $(this).is('[readonly]');
						var textCustomonlyemail = $(this).is('[customonlyemail]');
						var textCustomonlyphone = $(this).is('[customonlyphone]');
						
						//console.log('textIdIsOrder',textIdIsOrder);
						//console.log('textIdIsReadonly',textIdIsReadonly);
						//console.log('textCustomonlyemail',textCustomonlyemail);
						//console.log('textCustomonlyphone',textCustomonlyphone);
						//console.log('textIdVal',textIdVal);
						//console.log('textIdType',textIdType);
						
						if(textCustomonlyphone && textIdVal.length < 3) {
							console.log('textCustomonlyphone',textCustomonlyphone);
							console.log('textIdVal.length',textIdVal.length);
							alert('['+sNameText+']번에 대한 자리수를 확인해주세요 \n\n');
							$('#'+textId).focus();
							returnState = false;
							//console.log('textIdVal', textIdVal);
							return false;
						}
						 
						var checkSave = "";
						if (null == textIdVal || "" == textIdVal) {
							
							//console.log('textIdIsOrder',textIdIsOrder);
							//console.log('orderMaxNum',orderMaxNum);
							//console.log('checkTextIdCount',checkTextIdCount);
							
							if (textIdIsOrder && ( orderMaxNum > checkTextIdCount )) {
								//alert('select at least '+ orderMaxNum +' (text sorder)');
								alert(orderMaxNum +'순위까지 응답하여 주십시오');
								returnState = false;
								return false;
								
							} else if (!textIdIsReadonly) {
								//alert('Required user input field (text)');
								
								alert('['+sNameText+']번에 대한 응답을 하지 않았습니다 \n\n응답을 해주세요');
								$('#'+textId).focus();
								returnState = false;
								//console.log('textIdVal', textIdVal);
								return false;
								
							} else {
								checkSave = "Y";
							}
						}
						
						//console.log('checkSave',checkSave);
						if (null != textIdVal && "" != textIdVal ) {
							var setExample = new Object();
							setExample.uCode=uCode;
							//setExample.tableName=tableName;
							setExample.projectId=projectId;
							setExample.hardCodingId=hardCodingId;
							setExample.questionId=questionId;
							setExample.questionName=questionName;
							setExample.questionType=sTypeText;
							//setExample.exampleId=sExampleId;
							if (textIdIsOrder) {
								setExample.exampleText=textId;
							} else {
								setExample.exampleText=sExampleText;
							}
							console.log('setExample.exampleText', setExample.exampleText);
							setExample.exampleIndex=sExampleIndex;
							setExample.exampleValue=textIdVal;
							listSlSurvey.push(setExample);
							
							returnState = true;
						}
					});
					
					// 입력값이 없으면 전체 반복문 빠져나간다.
					if(returnState == false) {
						return false;
					}
					
				} else if ('textarea' == sTypeText) {
					
					$.each($inputName,function(){
						
						var textareaId = $(this).attr('id');
						var textareaType = $(this).attr('type');
						var textareaVal = $(this).val();
						var sExampleText = $(this).attr('exampleText');
						var sExampleIndex = $(this).attr('exampleindex');
						
						if (null == textareaVal || "" == textareaVal) {
							
							//alert('Required user input field (text)');
							alert('['+sNameText+']번에 대한 응답을 하지 않았습니다 \n\n응답을 해주세요');
							$('#'+textareaId).focus();
							returnState = false;
							//console.log('textareaVal', textareaVal);
							return false;
							
						} else {
							
							// textarea 줄바꿈 > 띄어쓰기로 변경
							textareaVal = textareaVal.replace(/\n/g, " ");
							//textareaVal = textareaVal.replaceAll("<br>", "\r\n");
							
							var setExample = new Object();
							setExample.uCode=uCode;
							setExample.projectId=projectId;
							setExample.hardCodingId=hardCodingId;
							setExample.questionId=questionId;
							setExample.questionName=questionName;
							setExample.questionType=sTypeText;
							setExample.exampleText=sExampleText;
							setExample.exampleIndex='';
							setExample.exampleValue=textareaVal;
							listSlSurvey.push(setExample);
							
							returnState = true;
						}
					});
					
					// 입력값이 없으면 전체 반복문 빠져나간다.
					if(returnState == false) {
						return false;
					}
					
				}
			});
			console.log('listSlSurvey',listSlSurvey);
			setlistSlSurvey = listSlSurvey;
			
			if (returnState) {
				
				/*var pReturnState = false;
			$.each($('[onlyphone]'), function(index, value){
				var pVal = $(this).val();
				var pArray = pVal.split('-');
				var pArrayLen = pArray.length;
				console.log('pArrayLen',pArrayLen);
				if (2 == pArrayLen) {
					pReturnState = true;
				}
			});
			if (!pReturnState) {
				returnState = false;
				alert('Not the right format');
				return false;
			}*/
				
				var eReturnState = true;
				$.each($('[onlyemail]'), function(index, value){
					var eVal = $(this).val();
					var eArray = eVal.split('@');
					var eArrayLen = eArray.length;
					if (2 == eArrayLen) {
						var eArray2 = eArray[1].split('.');
						var eArrayLen2 = eArray2.length;
						if (2 != eArrayLen2) {
							eReturnState = false;
						}
					}
				});
				if (!eReturnState) {
					returnState = false;
					//alert('Not the right format');
					alert('올바른 형식이 아닙니다.');
					return false;
				}
			}
			
			if (returnState) {
				
				var duplicate = true;
				var overCount = 0;
				for (var i=0; i<listSlSurvey.length-1; i++) {
					var iQuestionId = listSlSurvey[i].questionId;
					var iExampleValue = listSlSurvey[i].exampleValue;
					var iQuestionName = listSlSurvey[i].questionName;
					
					for (var j=0; j<listSlSurvey.length-1; j++) {
						var jQuestionId = listSlSurvey[j].questionId;
						var jExampleValue = listSlSurvey[j].exampleValue;
						
						if (iQuestionId == jQuestionId && iExampleValue == jExampleValue) {
							overCount++;
						}
					}
					if (5 <= overCount) {
						duplicate = false;
					}
					overCount = 0;
				}
				if (!duplicate) {
					var message = "5번 연속된 응답입니다. 그대로 응답하시겠습니까 ?" ;
					if(confirm(message)){
						duplicate = true;
					}
				}
			}
			
			//console.log('returnState',returnState);
			//console.log('duplicate',duplicate);
				
			if (returnState && duplicate) {
				setSurvey = serveyJs.setSurvey(listSlSurvey);
				console.log('checkValidation setSurvey',setSurvey);
			}
		}
		return setSurvey;
	},
	usekWeb : function (usePc, useMobile) {
		
		var returnObject = new Object();
		var filter = "win16|win32|win64|mac|macintel";
		var vWebType = "";
		if (navigator.platform ) {
			if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
				vWebType = "MOBILE";
			} else {
				vWebType = "PC";
			}
		}
		//console.log("vWebType",vWebType);
		
		if ("PC" == vWebType) {
			
			if ('1' != usePc) {
				returnVal = false;
			} else {
				returnVal = true;
			}
			
		} else if ("MOBILE" == vWebType) {
			
			if ('1' != useMobile) {
				returnVal = false;
			} else {
				returnVal = true;
			}
		}
		
		returnObject.type = vWebType;
		returnObject.value = returnVal;
		
		return returnObject;
	},
	setQuestionHtmlObject : function (questionId, questionName, setQuestionHtml) {
		
		var setObject = new Object();
		setObject.questionId = questionId;
		setObject.questionName = questionName;
		setObject.questionHtml = setQuestionHtml;
		
		return setObject;
	},
	goFollowingPage : function (checkNowPage) {
		
		if (null != checkNowPage) {
			
			var uCode = $('[name="uCode"]').val();
			var pageLastQuestionName = checkNowPage.pageLastQuestionName;
			var pageLastQuestionCheckNum = checkNowPage.pageLastQuestionCheckNum;
			
			if (null != uCode && '' != uCode
				&& null != pageLastQuestionName && '' != pageLastQuestionName 
				&& null != pageLastQuestionCheckNum && '' != pageLastQuestionCheckNum) {
				
				var goSurveyPath = serveyJs.getSurveyPath();
				if ('' != goSurveyPath) {
					
					var message = "이어서 진행하시겠습니까 ?" ;
					if(confirm(message)){
						var checkNum = serveyJs.getCheckNum(saveNextQName);
						location.href=localhost+ goSurveyPath + pageLastQuestionName +".jsp?uCode=" + uCode + "&checkNum="+pageLastQuestionCheckNum;
					} else {
						serveyJs.setUseNotFollowing();
					}
				}
			}
		}
		
		/*var eqNextQuestion = checkNowPage.eqNextQuestion;
		var saveNextQName = checkNowPage.saveNextQName;
		
		var uCode = $('[name="uCode"]').val();
		//console.log('questionName',questionName);
		
		if (null != checkNowPage && '' != checkNowPage && null != uCode && '' != uCode) {
			
			if (!eqNextQuestion) {
				
				var goSurveyPath = serveyJs.getSurveyPath();
				if ('' != goSurveyPath) {
					
					var message = "Do you want to continue ?" ;
					if(confirm(message)){
						var checkNum = serveyJs.getCheckNum(saveNextQName);
						location.href=localhost+ goSurveyPath + saveNextQName +".jsp?uCode=" + uCode + "&checkNum="+checkNum;
					} else {
						serveyJs.setUseNotFollowing();
					}
				}
			}
		}*/
	},
	
	//goBackPage : function (data) {
	goBackPage : function (checkNowPage) {
		//console.log('checkNowPage', checkNowPage);
		var nowPageIndex = checkNowPage.nowPageIndex;
		var nowPageId = checkNowPage.nowPageId;
		var nowPageName = checkNowPage.nowPageName;
		var nowPageCheckNum = checkNowPage.nowPageCheckNum;
		
		var prePageIndex = checkNowPage.prePageIndex;
		var prePageId = checkNowPage.prePageId;
		var prePageName = checkNowPage.prePageName;
		var prePageCheckNum = checkNowPage.prePageCheckNum;
		
		var uCode = $('[name="uCode"]').val();
		var projectId = $('[name="projectId"]').val();
		var hardCodingId = $('[name="hardCodingId"]').val();
		var questionId = $('[name="questionId"]').val();
		var questionName = $('[name="questionName"]').val();
		
		console.log("goBackPage uCode", uCode);
		console.log("goBackPage prePageName", prePageName);
		console.log("goBackPage prePageCheckNum", prePageCheckNum);
		
		if (null != uCode && '' != uCode
				&& null != prePageName && '' != prePageName 
				&& null != prePageCheckNum && '' != prePageCheckNum) {
			
			var goSurveyPath = serveyJs.getSurveyPath();
			var goBackPage = checkNowPage.pageSaveQuestionName;
			console.log("setSurvey goSurveyPath", goSurveyPath);
			console.log("setSurvey goBackPage", goBackPage);
			console.log("setSurvey prePageId", prePageId);
			console.log("setSurvey nowPageId", nowPageId);
			console.log("setSurvey prePageName", prePageName);
			console.log("setSurvey nowPageName", nowPageName);
			if ('' != goSurveyPath && '' != goBackPage && prePageId != nowPageId && prePageName != nowPageName) {
				
				var btBefore = $('#bt_before');
				btBefore.css('display','block');
				btBefore.on('click',function(){
					
					var urlVal = localhost+'/survey/setGoBackPage';
					console.log("setSurvey urlVal",urlVal);
					
					var setData = {
							uCode : uCode,
							projectId : projectId,
							hardCodingId : hardCodingId,
							pageIndex : prePageIndex,
							pageId : prePageId,
							pageName : prePageName};
					
					console.log("setSurvey setData",setData);
					
					$.ajax({
						url   		: urlVal,
						type  		: "post",
						dataType    : "json",
						contentType : "application/json",
						data  		: JSON.stringify( setData ),
						async		: false,
						success     : function(responseData){
							console.log("setGoBackPage data",responseData);
							if (null != responseData) {
								if (responseData.updateSlSurvey) {
									var checkNum = serveyJs.getCheckNum(goBackPage);
									location.href=localhost+ goSurveyPath + prePageName +".jsp?uCode=" + uCode + "&checkNum="+ prePageCheckNum;
								}
							}
						},
						error : function(e){
							console.log("error",e);
						}
					});
				});
			}
		} else {
			
		}
		
		/*
		var saveNowQName = data.saveNowQName;
		var savePreQName = data.savePreQName;
		var saveNextQName = data.saveNextQName;
		var goBackPage = saveNowQName;
			
		var uCode = $('[name="uCode"]').val();
		var projectId = $('[name="projectId"]').val();
		var hardCodingId = $('[name="hardCodingId"]').val();
		var questionId = $('[name="questionId"]').val();
		var questionName = $('[name="questionName"]').val();
		
		if (null != questionName && '' != questionName && null != uCode && '' != uCode) {
			
			var goSurveyPath = serveyJs.getSurveyPath();
			if ('' != goSurveyPath && '' != goBackPage && 'info' != saveNowQName) {
				
				var btBefore = $('#bt_before');
				btBefore.css('display','block');
				btBefore.on('click',function(){
					
					var urlVal = localhost+'/survey/setGoBackPage';
					console.log("setSurvey urlVal",urlVal);
					
					var setData = {
							uCode : uCode,
							projectId : projectId,
							hardCodingId : hardCodingId,
							questionId : questionId };
					
					$.ajax({
						url   		: urlVal,
						type  		: "post",
						dataType    : "json",
						contentType : "application/json",
						data  		: JSON.stringify( setData ),
						async		: false,
						success     : function(responseData){
							console.log("setGoBackPage data",responseData);
							if (null != responseData) {
								if (responseData.updateSlSurvey) {
									var checkNum = serveyJs.getCheckNum(goBackPage);
									location.href=localhost+ goSurveyPath + goBackPage +".jsp?uCode=" + uCode + "&checkNum="+checkNum;
								}
							}
						},
						error : function(e){
							//console.log("error",e);
						}
					});
				});
			}
		}
		*/
	},
	getSurveyPath : function() {
		
		var goUrl = '';
		var projectId = $('[name="projectId"]').val();
		if (null != setResponseData && null != setResponseData.configProperty) {
			
			var configProperty = setResponseData.configProperty;
			var fileLoadDirectory = configProperty.fileLoadDirectory;
			var hardCodingSaveDirectory = configProperty.hardCodingSaveDirectory;
			var hardCodingVersion = configProperty.hardCodingVersion;
			goUrl = fileLoadDirectory + hardCodingSaveDirectory +"/"+ hardCodingVersion +"/"+projectId+"/";
		}
		return goUrl;
	},
	setAddEtc : function (type, check1, questionName, index2, setEnter, questionFunction) {
		
		var returnObject = new Object();
		var setOptionLastText = '';
		var setOptionLastAttr = '';
		var functionList = questionFunction;
		var functionOption = '';
		var onlykorean = false;
		var onlyenglish = false;
		var onlynumber = false;
		var onlyemail = false;
		var onlytext = false;
		
		console.log('setAddEtc functionList',functionList);
		
		// 입력제어 판단
		$.each(functionList, function(index, value){
			if(value.functionText == 'onlykorean') {
				onlykorean = true;
				functionOption = 'onlykorean';
			} else if(value.functionText == 'onlyenglish') {
				onlyenglish = true;
				functionOption = 'onlyenglish';
			} else if(value.functionText == 'onlynumber') {
				onlynumber = true;
				functionOption = 'onlynumber';
			} else if(value.functionText == 'onlyemail') {
				onlyemail = true;
				functionOption = 'onlyemail';
			} else if(value.functionText == 'onlytext') {
				onlytext = true;
				functionOption = 'onlytext';
			}
		});
		
		// 한/영 특수문자 구분
		if(onlykorean && onlyenglish && onlytext) {
			// 한/영 + 특수문자
			functionOption = 'korengtext';
		} else if(onlykorean && onlyenglish) {
			// 한/영
			functionOption = 'onlykoreng';
		} else if(onlykorean && onlytext) {
			// 한글 + 특수문자
			functionOption = 'koreantext';
		} else if(onlyenglish && onlytext) {
			// 영문 + 특수문자
			functionOption = 'englishtext';
		} else if(onlynumber && onlytext) {
			// 숫자 + 특수문자
			functionOption = 'numbertext';
		} else if(onlykorean && onlynumber) {
			// 한글 + 숫자
			functionOption = 'kornumber';
		} else if(onlynumber && onlynumber) {
			// 영문 + 숫자
			functionOption = 'engnumber';
		}
		
		console.log('setAddEtc functionOption',functionOption);
		
		if ('sin' == type) {
			
			setOptionLastText = setEnter +' ( <input type="text" name="'+ questionName +'_text" id="'+ questionName +'_text" value="" exampletext="'+ questionName +'_text" exampleindex="'+ index2 +'" textwidth="155" '+ functionOption +' readonly /> ) '+ setEnter;
			setOptionLastAttr = 'sreadonly="'+ questionName +'_text"';
			
		} else if ('mul' == type) {
			
			setOptionLastText = setEnter +' ( <input type="text" id="'+ questionName +'_text" name="'+ questionName +'_text" value="" exampletext="'+ questionName +'_text" exampleindex="'+ index2 +'" textwidth="155" '+ functionOption +' readonly /> ) '+ setEnter;
			setOptionLastAttr = 'sreadonly="'+ questionName +'_text"';
			if ('Y' == check1) {
				setOptionLastAttr = setOptionLastAttr + ' scheckedfalse';
			}
			
		} else if ('ord' == type) {
			
			setOptionLastText = setEnter +' ( <input type="text" name="'+ questionName +'_text" id="'+ questionName +'_text" value="" exampletext="'+ questionName +'_text" exampleindex="'+ index2 +'" textwidth="155" '+ functionOption +' readonly /> ) ' + setEnter;
			setOptionLastAttr = 'sreadonly="'+ questionName +'_text"';
			
		} else if ('att' == type) {
			
			setOptionLastText = setEnter +' ( <input type="text" name="'+ questionName +'_text" id="'+ questionName +'_text" value="" exampletext="'+ questionName +'_text" exampleindex="'+ index2 +'" textwidth="155" /> ) ' + setEnter;
		}
		
		returnObject.setOptionLastText = setOptionLastText;
		returnObject.setOptionLastAttr = setOptionLastAttr;
		
		console.log('setAddEtc setOptionLastText',setOptionLastText);
		console.log('setAddEtc setOptionLastAttr',setOptionLastAttr);
		
		return returnObject;
	},
	checkOptionType : function(functionText, questionId) {
	
		// onlynumber
		// onlykorean
		// onlyenglish
		// onlymoney
		// onlyphone
		// onlyemail
		// onlytext
		// mediaurl=http://
		// timer=second
		// ETC=2
		// type=? addrow, addcol, addrowmul, addcolmul
		
		var returnObject = new Object();
		var returnType = '';
		var returnVal = '';
		if (functionText.match('onlynumber')) {
			returnType = 'text';
			returnVal = 'onlynumber';
		} else if (functionText.match('onlykorean')) {
			returnType = 'text';
			returnVal = 'onlykorean';
		} else if (functionText.match('onlyenglish')) {
			returnType = 'text';
			returnVal = 'onlyenglish';
		} else if (functionText.match('onlymoney')) {
			returnType = 'text';
			returnVal = 'onlymoney';
		} else if (functionText.match('onlyphone')) {
			returnType = 'text';
			returnVal = 'onlyphone';
		} else if (functionText.match('onlyemail')) {
			returnType = 'text';
			returnVal = 'onlyemail';
		} else if (functionText.match('customOnlyphone')) {
			returnType = 'text';
			returnVal = 'customOnlyphone';
		} else if (functionText.match('customOnlyemail')) {
			returnType = 'text';
			returnVal = 'customOnlyemail';
		} else if (functionText.match('onlytext')) {
			returnType = 'text';
			returnVal = 'onlytext';
		} else if (functionText.match('addrowmul')) {
			returnType = 'attr';
			returnVal = 'addrowmul';
		} else if (functionText.match('addcolmul')) {
			returnType = 'attr';
			returnVal = 'addcolmul';
		} else if (functionText.match('addrow')) {
			returnType = 'attr';
			returnVal = 'addrow';
		} else if (functionText.match('addcol')) {
			returnType = 'attr';
			returnVal = 'addcol';
		} else if (functionText.match('989')) {
			returnType = '989';
			returnVal = '';
		} else {
			
			var fType = '';
			var fVal = '';
			var fArray = functionText.split(':');
			$.each(fArray,function(fIndex,fValue){
				if (0==fIndex) {
					fType = fValue;
				} else if (1==fIndex) {
					fVal = fValue;
					//console.log('fVal',fVal);
				}
			});

			if (functionText.match('mediaurl')) {
				returnType = 'mediaurl';
				returnVal = fVal;
			} else if (functionText.match('timer')) {
				returnType = 'timer';
				returnVal = fVal;
			} else if (functionText.match('ETC')) {
				returnType = 'ETC';
				returnVal = fVal;
			} else if (functionText.match('type')) {
				returnType = 'type';
				returnVal = fVal;
			} else if (functionText.match('notExist')) {
				returnType = 'notExist';
				returnVal = fVal;
				//console.log('returnType',returnType);
				//console.log('returnVal',returnVal);
			}
		}
		
		returnObject.type=returnType;
		returnObject.data=returnVal;
		returnObject.questionId=questionId;
		return returnObject;
	},
	msgTimer : function () {
		m = Math.floor(setPageTime / 60) + "분 " + (setPageTime % 60) + "초";	// 남은 시간 계산
		var msg = '현재 남은 시간은 <font color="red">' + m + '</font> 입니다.';
		$('#msgTimer').html('');
		$('#msgTimer').html(msg); 
		setPageTime--;
		if (setPageTime < 0) {
			clearInterval(tid);		// 타이머 해제
			$('#bt_next').css('display','');
			//alert("end timer !!");
		}
	},
	checkNowPage : function () {
		
		var data = setResponseData;
		console.log('checkNowPage data',data);
		
		var projectId = $('[name="projectId"]').val();
		var hardCodingId = $('[name="hardCodingId"]').val();
		var questionId = $('[name="questionId"]').val();
		var questionName = $('[name="questionName"]').val();
		var uCode = $('[name="uCode"]').val();
		
		if (null != questionId && '' != questionId
				&& null != questionName && '' != questionName) {
				
				var questionIdArray = questionId.split(',');
				var questionIdArrayLen = questionId.length;
				var questionNameArray = questionName.split(',');
				var questionNameArrayLen = questionName.length;
				if (0 < questionIdArrayLen) {
					questionId = questionIdArray[0];
					questionName = questionNameArray[0];
				} 
			}
		
		var returnVal = new Object();
		
		var checkValue = false;
		var nowPageIndex = 0;
		var nowPageId = 0;
		var nowPageName = 'info';
		var nowPageCheckNum = '';
		var prePageIndex = 0;
		var nextPageIndex = 0;
		
		var saveQCheckNum = '';
		var lastQCheckNum = '';
			
		if (null != data && null != questionName && '' != questionName) {
			
			var listSlQuestionViewPage = data.listSlQuestionViewPage;
			var selectTable = data.selectTable;
			
			if (null != listSlQuestionViewPage && 0 < listSlQuestionViewPage.length
				&& null != selectTable) {
				
				serveyJs.userParticipationValue(selectTable);
				
				var pageSaveIndex = selectTable.pageSaveIndex;
				var pageSaveQuestionId = selectTable.pageSaveQuestionId;
				var pageSaveQuestionName = selectTable.pageSaveQuestionName;
				var pageLastIndex = selectTable.pageLastIndex;
				var pageLastQuestionId = selectTable.pageLastQuestionId;
				var pageLastQuestionName = selectTable.pageLastQuestionName;
				
				var sqvpLen = listSlQuestionViewPage.length;
				
				$.each(listSlQuestionViewPage,function(index,value){
					
					// index:0 = info
					// index = index +1;
					
					var pageTitleQuestionId = value.pageTitleQuestionId;
					var pageTitleQuestionName = value.pageTitleQuestionName;
					var pageTitleQuestionCheckNum = value.pageTitleQuestionCheckNum;
					var pageQuestionIds = value.pageQuestionIds;
					var pageOrder = parseInt(value.pageOrder);
					
					if (questionId == pageTitleQuestionId && questionName == pageTitleQuestionName) {
						nowPageIndex = pageOrder;
						nowPageId = pageTitleQuestionId;
						nowPageName = pageTitleQuestionName;
						nowPageCheckNum = pageTitleQuestionCheckNum;
						nowPageOrder = pageOrder;
						
						prePageIndex = pageOrder -1;
						nextPageIndex = pageOrder +1;
						
						checkValue = true;
						
						serveyJs.setProcessbar(pageOrder,sqvpLen);
					}
					
					if (1 > prePageIndex) { prePageIndex = 1; }
					if (sqvpLen < nextPageIndex) { nextPageIndex = sqvpLen; }
				});
				
				console.log('nowPageIndex',nowPageIndex);
				console.log('prePageIndex',prePageIndex);
				console.log('nextPageIndex',nextPageIndex);
				
				var prePageId = '';
				var prePageName = '';
				var prePageCheckNum = '';
				var prePageOrder = '';
				var nextPageId = '';
				var nextPageName = '';
				var nextPageCheckNum = '';
				var nextPageOrder = '';
				
				$.each(listSlQuestionViewPage,function(index,value){
					
					var pageTitleQuestionId = value.pageTitleQuestionId;
					var pageTitleQuestionName = value.pageTitleQuestionName;
					var pageTitleQuestionCheckNum = value.pageTitleQuestionCheckNum;
					var pageQuestionIds = value.pageQuestionIds;
					var pageOrder = parseInt(value.pageOrder);
					
					if (prePageIndex == pageOrder) {
						prePageId = pageTitleQuestionId;
						prePageName = pageTitleQuestionName;
						prePageCheckNum = pageTitleQuestionCheckNum;
						prePageOrder = pageOrder;
					}
					if (nextPageIndex == pageOrder) {
						nextPageId = pageTitleQuestionId;
						nextPageName = pageTitleQuestionName;
						nextPageCheckNum = pageTitleQuestionCheckNum;
						nextPageOrder = pageOrder;
					}
					
					if (pageTitleQuestionId == pageSaveQuestionId && pageTitleQuestionName == pageSaveQuestionName) {
						saveQCheckNum = pageTitleQuestionCheckNum;
					}
					if (pageTitleQuestionId == pageLastQuestionId && pageTitleQuestionName == pageLastQuestionName) {
						lastQCheckNum = pageTitleQuestionCheckNum;
					}
				});
				
				returnVal.checkValue = checkValue; 
				
				returnVal.nowPageIndex = nowPageOrder; 
				returnVal.nowPageId = nowPageId;
				returnVal.nowPageName = nowPageName; 
				returnVal.nowPageCheckNum = nowPageCheckNum; 
				
				returnVal.prePageIndex = prePageOrder; 
				returnVal.prePageId = prePageId;
				returnVal.prePageName = prePageName; 
				returnVal.prePageCheckNum = prePageCheckNum; 
				
				returnVal.nextPageIndex = nextPageOrder; 
				returnVal.nextPageId = nextPageId;
				returnVal.nextPageName = nextPageName;
				returnVal.nextPageCheckNum = nextPageCheckNum;
				
				returnVal.pageSaveIndex = pageSaveIndex;
				returnVal.pageSaveQuestionId = pageSaveQuestionId;
				returnVal.pageSaveQuestionName = pageSaveQuestionName;
				returnVal.pageSaveQuestionCheckNum = saveQCheckNum;
				
				returnVal.pageLastIndex = pageLastIndex;
				returnVal.pageLastQuestionId = pageLastQuestionId;
				returnVal.pageLastQuestionName = pageLastQuestionName;
				returnVal.pageLastQuestionCheckNum = lastQCheckNum;
			}
		}
		
		/*
		var returnVal = new Object();
		
		var eqNextQuestion = false;
		var saveNowQName = '';
		var savePreQName = '';
		var saveNextQName = '';
		
		if (null != data && null != questionName && '' != questionName) {
			var selectTable = data.selectTable;
			
			if (null != selectTable) {
				var pageHistory = selectTable.pageHistory;
				var pageIndex = selectTable.pageIndex;
				if (null == pageIndex || '' == pageIndex) {
					pageIndex = 0;
				} else {
					pageIndex = parseInt(selectTable.pageIndex);
				}
				
				if (null != pageHistory && '' != pageHistory) {
					var pageArray = pageHistory.split('>');
					var pageArrayLen = pageArray.length -1;
					console.log('pageArrayLen',pageArrayLen);
					// info = index : 0
					// Q1	= index : 1
					if (null != pageArray) {
						
						var nowIndex = pageIndex;
						var preIndex = pageIndex - 1;
						var nextIndex = pageIndex + 1;
						
						if (0 > nowIndex) {	
							nowIndex = 0; 
						} else if (pageArrayLen <= nowIndex) {
							nowIndex = pageArrayLen;
						}
						saveNowQName = pageArray[nowIndex];
						
						if (0 > preIndex) {	
							preIndex = 0; 
						} else if (pageArrayLen <= preIndex) {
							preIndex = pageArrayLen;
						}
						savePreQName = pageArray[preIndex];
						
						if (0 > nextIndex) { 
							nextIndex = 0;	
						} else if (pageArrayLen <= nextIndex) {
							nextIndex = pageArrayLen;
						}
						saveNextQName = pageArray[nextIndex];
						
						console.log('questionName',questionName);
						console.log('saveNextQName',saveNextQName);
						
						if (questionName == saveNextQName) {
							eqNextQuestion = true;
						}
						serveyJs.setProcessbar(pageIndex,pageArrayLen);
					}
				}
			}
		}
		
		if ('' == saveNowQName) { saveNowQName = 'info'; }
		if ('' == savePreQName) { savePreQName = 'info'; }
		if ('' == saveNextQName) { saveNextQName = 'info'; }
		
		returnVal.eqNextQuestion = eqNextQuestion;
		returnVal.saveNowQName = saveNowQName;
		returnVal.savePreQName = savePreQName;
		returnVal.saveNextQName = saveNextQName;
		
		var preCheckNum = '';
		var nextCheckNum = '';
		var listSlQuestion = data.listSlQuestion;
		$.each(listSlQuestion,function(index,value){
			var questionName = value.questionName;
			var checkNum = value.checkNum;
			if (questionName == savePreQName) {
				preCheckNum = checkNum;
			}
			if (questionName == saveNextQName) {
				nextCheckNum = checkNum;
			}
		});
		
		setResponseData.preCheckNum = preCheckNum;
		setResponseData.nextCheckNum = nextCheckNum;*/
		
		return returnVal;
	},
	getCheckNum : function (questionName) {
		//console.log('getCheckNum questionName', questionName);
		
		var listSlQuestion = setResponseData.listSlQuestion;
		//console.log('getCheckNum listSlQuestion', listSlQuestion);
		
		var checkNum = '';
		$.each(listSlQuestion,function(index,value){
			var getQuestionName = value.questionName;
			var getCheckNum = value.checkNum;
			if (questionName == getQuestionName) {
				checkNum = getCheckNum;
			}
		});
		//console.log('getCheckNum checkNum', checkNum);
		return checkNum;
	},
	setExampleRotation : function (questionType, questionId, questionName, listSlQuestionFunction) {
		
		//questionType = 'sin';
		//questionId = 3399;
		//questionName = 'Q19';
		//var listSlQuestionFunction = null;
		//var functionText = listSlQuestionFunction.functionText;
		//var functionText = 'addcol'
		//var functionText = 'addrowmul'
		
		var listSlRotationMain = setResponseData.listSlRotationMain;
		
		if (null != listSlRotationMain && 0 < listSlRotationMain.length) {

			$.each(listSlRotationMain,function(mIndex,mValue){
				
				var rotMainType = mValue.rotMainType;
				var rotMainQuestionId = mValue.rotMainQuestionId;
				var rotMainQuestionName = mValue.rotMainQuestionName;
				var rotMainQuestionType = mValue.rotMainQuestionType;
				
				if (questionId == rotMainQuestionId && questionName == rotMainQuestionName) {
					
					if ('eRot' == rotMainType) {
						console.log('setExampleRotation qType, qId, qName:',questionType+', '+questionId+', '+questionName);
						
						// eRot example list
						var listSlRotationExample = mValue.listSlRotationExample;
						console.log('listSlRotationExample',listSlRotationExample);
						
						if ('sca' == questionType) {
							
							var tableHtml = $('[name="'+ questionName +'"]:eq(0)').closest('table').wrap("<div/>").parent();
							var shuffleArray = new Array();
							var fixArray = new Array();
							
							$.each($(tableHtml).find('thead tr td'),function(index,value){
								var oTd = new Object();
								var td = $(this).html();
								
								$.each($(tableHtml).find('tbody tr td'),function(index2,value2){
									var td2 = $(this).html();
									if (index == index2) {
										
										oTd.titleTd = td;
										oTd.contentTd = td2;
										
										var checkEq = false;
										$.each(listSlRotationExample,function(eIndex,eValue){	// add
											var rotExampleChecked = eValue.rotExampleChecked;
											if (index == eIndex && 'Y' == rotExampleChecked) { checkEq = true; }
										});
										
										if (checkEq) {
											shuffleArray.push(oTd);
										} else {
											fixArray.push(oTd);
										}
									}
								});
							});
							
							var setFixShuffle = serveyJs.setFixShuffle(shuffleArray, fixArray);
							console.log('setExampleRotation '+questionName+' fixArray:',fixArray);
							console.log('setExampleRotation '+questionName+' setFixShuffle:',setFixShuffle);
							$.each(setFixShuffle,function(index,value){
								
								var titleVal = value.titleTd;
								var contentVal = value.contentTd;
								$(tableHtml).find('thead tr td').eq(index).html(titleVal);
								$(tableHtml).find('tbody tr td').eq(index).html(contentVal);
							});
							
						} else if ('sin' == questionType || 'mul' == questionType || 'ord' == questionType) {
							
							var ulHtml = $('[name="'+ questionName +'"]:eq(0)').closest('ul').wrap("<div/>").parent();
							var shuffleArray = new Array();
							var fixArray = new Array();
							$.each(ulHtml.find('li'),function(index,value){
								
								var checkIndex = index +1;	// add
								var checkEq = false;
								$.each(listSlRotationExample,function(eIndex,eValue){	// add
									var rotExampleChecked = eValue.rotExampleChecked;
									if (index == eIndex && 'Y' == rotExampleChecked) { checkEq = true; }
								});
								
								var li = $(this).html();
								var oLi = new Object();
								oLi.contentLi = li;
								oLi.indexNum = index;
								
								if (checkEq) {
									shuffleArray.push(oLi);
								} else {
									fixArray.push(oLi);
								}
							})
							
							var setFixShuffle = serveyJs.setFixShuffle(shuffleArray, fixArray);
							console.log('setExampleRotation '+questionName+' fixArray:',fixArray);
							console.log('setExampleRotation '+questionName+' setFixShuffle:',setFixShuffle);
							
							$.each(setFixShuffle,function(index,value){
								var contentVal = value.contentLi;
								var indexNum = value.indexNum;
								ulHtml.find('li').eq(index).html(contentVal);
							});
							
						}  else if ('att' == questionType) {
							/*
							1) example array : rowColId (rowIndex, colIndex)
							2) col shuffle array -> set Html
							3) row shuffle array -> set Html
							4) -> set rowColId html
							*/
							var functionText = '';
							if (null != listSlQuestionFunction && 'att' == questionType) {
								$.each(listSlQuestionFunction,function(index,value){
									var functionTexts = value.functionText;
									if ((null != functionTexts && '' != functionTexts) && ('addcol' == functionTexts || 'addrowmul' == functionTexts)) {
										functionText = functionTexts;
									}
								});
							}
							
							var table = $('[name^="'+ questionName +'"]:eq(0)').closest('table');
							var tableHtml = $('[name^="'+ questionName +'"]:eq(0)').closest('table').wrap("<div/>").parent();
							
							// set new rotation col row title array
							var rotColTitleArray = new Array();
							var rotRowTitleArray = new Array();
							if ('addcol' == functionText) {
								
								var checkExampleText = true;
								$.each(listSlRotationExample,function(eIndex,eValue){
									
									var rotExampleText = eValue.rotExampleText;
									if (attCheckPoint == rotExampleText) {
										checkExampleText = false;
									}
									
									if (checkExampleText) {
										rotColTitleArray.push(eValue);
									} else {
										if (attCheckPoint != rotExampleText) {
											rotRowTitleArray.push(eValue);
										}
									}
								});
								
							} else if ('addrowmul' == functionText) {
								
								var checkExampleText = true;
								$.each(listSlRotationExample,function(eIndex,eValue){
									
									var rotExampleText = eValue.rotExampleText;
									if (attCheckPoint == rotExampleText) {
										checkExampleText = false;
									}
									
									if (checkExampleText) {
										rotRowTitleArray.push(eValue);
									} else {
										if (attCheckPoint != rotExampleText) {
											rotColTitleArray.push(eValue);
										}
									}
								});
							}
							
							// set header title array
							var shuffleTitleArray = new Array();
							var fixTitleArray = new Array();
							$.each($(tableHtml).find('thead tr td'),function(index,value){
								if (0!=index) {
									
									var checkIndex = index -1;
									var oTd = new Object();
									var tdHtml = $(this).html();
									oTd.titleTd = tdHtml;
									oTd.titleIndex = index;
									oTd.indexNum = checkIndex;
									
									var checkEq = false;
									$.each(rotColTitleArray,function(eIndex,eValue){
										var rotExampleChecked = eValue.rotExampleChecked;
										if (checkIndex == eIndex && 'Y' == rotExampleChecked) { checkEq = true; }
									});
									
									if (checkEq) {
										shuffleTitleArray.push(oTd);
									} else {
										fixTitleArray.push(oTd);
									}
								}
							});
							
							// set body title array
							var shuffleTitleArray2 = new Array();
							var fixTitleArray2 = new Array();
							$.each($(tableHtml).find('tbody tr'),function(index,value){
								
								var oTd = new Object();
								var tdHtml2 = $(this).find('td:eq(0)').html();
								oTd.titleTd = tdHtml2;
								oTd.titleIndex = index;
								oTd.indexNum = index;
								
								var checkEq = false;
								$.each(listSlRotationExample,function(eIndex,eValue){	// add
									var rotExampleChecked = eValue.rotExampleChecked;
									if (index == eIndex && 'Y' == rotExampleChecked) { checkEq = true; }
								});
								
								if (checkEq) {
									shuffleTitleArray2.push(oTd);
								} else {
									fixTitleArray2.push(oTd);
								}
							});
							
							// set body content array
							var shuffleContentArray = new Array();
							$.each($('[name^="'+ questionName +'"]'),function(index,value){
								
								var oTd = new Object();
								var inputId = $(this).attr('id');
								var inputType = $(this).attr('type');
								
								if ('text'!=inputType) {	// exclude text 
									
									var td = $(this).parent();
									var tdHtml = $(td).html();
									
									var row = $(td).parent().get(0);
									var rowIndex = $(row).index()+1;
									var colIndex = $(td).index();
									
									oTd.contentTd = tdHtml;
									oTd.rowIndex = rowIndex;
									oTd.colIndex = colIndex;
									shuffleContentArray.push(oTd);
								}
							});
							
							var getShuffleTitleArray = serveyJs.setFixShuffle(shuffleTitleArray, fixTitleArray);
							var getShuffleTitleArray2 = serveyJs.setFixShuffle(shuffleTitleArray2, fixTitleArray2);
							console.log('setExampleRotation '+questionName+' fixTitleArray:',fixTitleArray);
							console.log('setExampleRotation '+questionName+' getShuffleTitleArray:',getShuffleTitleArray);
							console.log('setExampleRotation '+questionName+' fixTitleArray2:',fixTitleArray2);
							console.log('setExampleRotation '+questionName+' getShuffleTitleArray2:',getShuffleTitleArray2);
							
							$.each(getShuffleTitleArray,function(index,value){
								var titleTd = value.titleTd;
								$(tableHtml).find('thead tr td').eq(index+1).html(titleTd);
							});
							$.each(getShuffleTitleArray2,function(index,value){
								var titleTd = value.titleTd;
								
								$.each($(tableHtml).find('tbody tr'),function(index2,value2){
									if (index == index2) {
										var oTd = new Object();
										var tdHtml2 = $(this).find('td:eq(0)').html(titleTd);
									}
								});
							});
							
							$.each(getShuffleTitleArray,function(index,value){	// col
								
								var colIndex = value.titleIndex;
								
								$.each(getShuffleTitleArray2,function(index2,value2){	// row
								
									var rowIndex = value2.titleIndex+1;
									
									$.each(shuffleContentArray,function(index3,value3){
										
										var cRowIndex = value3.rowIndex;
										var cColIndex = value3.colIndex;
										
										if (cRowIndex == rowIndex && cColIndex == colIndex) {
											
											var contentTd = value3.contentTd;
											$(table).find('tbody tr:eq('+ (index2) +') td:eq('+ (index+1) +')').html(contentTd);
										}
									});
								});
							});
						}
					}
				}
			});
		}
	},
	userParticipationValue : function (selectTable) {
		
		var data = setResponseData;
		var listSlQuestion = data.listSlQuestion;
		
		if (null != listSlQuestion && 0 < listSlQuestion.length) {
			
			var userValue = Object.keys(selectTable);
			//console.log('userValue',userValue);
			
			$.each(listSlQuestion,function(qIndex,qValue){
				var questionName = qValue.questionName;
				
				$.each(userValue,function(uIndex,uValue){
					
					if (questionName == uValue) {
						
						var tableKey = 'setv'+uValue;
						var tableKey2 = 'sett'+uValue;
						var tableValue = selectTable[uValue];
						$('#'+tableKey).html(tableValue);
						
						var listSlExample = qValue.listSlExample;
						if (null != listSlExample && 0 < listSlExample.length) {
							
							$.each(listSlExample,function(eIndex,eValue){
								
								var exampleValue = eValue.exampleValue;
								var exampleText = eValue.exampleText;
								if (tableValue == exampleValue) {
									
									$('#'+tableKey2).html(exampleText);
								}
							});
						}
					}
				});
			});
		}
	},
	setFixShuffle : function (shuffleArray, fixArray) {
		
		var getShuffle = serveyJs.setShuffle(shuffleArray);
		
		$.each(fixArray,function(fIndex,fValue){
			var indexNum = fValue.indexNum;
			var contentLi = fValue.contentLi;
			getShuffle.splice(indexNum,0,fValue);
		});
		return getShuffle;
	},
	setShuffle : function (arr) {
		
		var i = 0;
		var newArray = [];
		while(arr.length > 0) {
			var x = parseInt(Math.random()*arr.length);
			newArray[i] = arr[x];
			i++;
			arr.splice(x,1);
		}
		return newArray;
	},
	setProcessbar : function (dividend, divisor) {
		var dividend = parseInt(dividend);
		var divisor = parseInt(divisor);
		var setWidth = (dividend / divisor) * 100;
		$('aside div').css('width',Math.round(setWidth.toFixed(0)) + '%');
		$('aside div').text(Math.round(setWidth.toFixed(0)) + '%');
		
	},
	setKoreanMoney : function (num) {
		
		var hanA = new Array("","일","이","삼","사","오","육","칠","팔","구","십"); 
		var danA = new Array("","십","백","천","","십","백","천","","십","백","천","","십","백","천"); 
		var result = ""; 
		for(i=0; i<num.length; i++) {	
			str = ""; 
			han = hanA[num.charAt(num.length-(i+1))]; 
			if(han != "") 
				str += han+danA[i]; 
			if(i == 4) str += "만"; 
			if(i == 8) str += "억"; 
			if(i == 12) str += "조"; 
			result = str + result; 
		} 
		if(num != 0) 
			result = result + "원"; 
		return result ;

	},
	insertTbAnswer2 : function (data) {
		// 리스트 조사인경우 완료자 tb_answer2 테이블에 데이터 삽입
		var returnVal = false;
		var urlVal = localhost+'/project/insertTbAnswer2';
		var selectSlProject = data.selectSlProject;
		var selectTable = data.selectTable;
		//console.log('insertTbAnswer2 data', data);
		
		var cpno = selectSlProject.cpno;
		var uCode = selectTable.uCode;		
		//console.log('insertTbAnswer2 cpno', cpno);
		//console.log('insertTbAnswer2 uCode', uCode);
		
		$.ajax({
			url   		: urlVal,
			type  		: "post",
			dataType    : "json",
			data  		: {cpno:cpno, uCode:uCode},
			success     : function(responseData){
				console.log("insertTbAnswer2 data",responseData);
				if (null != responseData) {
					if (responseData.insertTbAnswer2) {
						alert('리스트조사 완료데이터 삽입 성공');
						returnVal = true;
					} else if (responseData.selectTbAnswer2 != 0) {
						alert('해당 계정 이미 완료 됨');
					} else {
						alert('리스트조사 완료데이터 삽입 실패');
					}
				}
			},
			error : function(e){
			}
		});
		
		return returnVal;
	},
	setSlQuaterCount : function (quaterContent) {
		// 쿼터참여정보 테이블 수정
		var projectId = $('[name="projectId"]').val();
		var returnVal = false;
		var urlVal = localhost+'/project/setSlQuaterCount';
		
		console.log('setSlQuaterCount projectId', projectId);
		console.log('setSlQuaterCount quaterContent', quaterContent);
		
		if(quaterContent != null || quaterContent != '') {			
			$.ajax({
				url   		: urlVal,
				type  		: "post",
				dataType    : "json",
				contentType : "application/json",
				async		: false,
				data  		: JSON.stringify( {projectId:projectId, quaterContent:quaterContent} ),
				success     : function(responseData){
					console.log("setSlQuaterCount data",responseData);
					if (null != responseData) {
						if (responseData.updateSlQuaterCount) {
							alert('쿼터참여정보 수정 성공');
							returnVal = true;
						}else {
							alert('쿼터참여정보 수정 실패');
						}
					}
				},
				error : function(e){
				}
			});
		}
		
		return returnVal;
	}/*,
	checkSurveyState : function () {
		
		var checkValidation = false;
		var surveyState = $('[name="surveyState"]').val();
		if ('testList' != surveyState) {
			checkValidation = serveyJs.checkValidation();
		} else {
			alert('No save test');
		}
		return checkValidation;
	}*/
}
/*$(function(){
	serveyJs.init();
});*/

