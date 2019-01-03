/*
var searchProjectId = 0;
var searchProjectState = 0;
var dataProjectState = 0;
var useResearList = 0;
var loading = "";
*/
var loading = "";
var setResponseData = null;

var questionListJs = {
		
	init : function(){
		loading = $('<div id="loading" class="loading"></div><img id="loading_img" alt="loading" src="/resources/img/loading2.gif" />').appendTo($('.layout')).hide();
		loading = $('<div id="loading" class="loading"></div><img id="loading_img" alt="loading" src="/resources/img/loading2.gif" />').appendTo($('#container')).hide();
		
		questionListJs.setListQuestion();
		questionListJs.setEvent();
	},
	setEvent : function () {
		var projectId = $('[name="projectId"]').val();
		
		$('[name="bt_cancel"]').on('click',function(){ location.href='/project/projectList'; });
		$('[name="question_insert"]').on('click',function(){
			var gubun = 'insert';
			var questionId = $('[name="question_update"').attr('questionid');
			if(typeof questionId == "undefined" || questionId == null || questionId == '') {
				questionId = 0;
				location.href='/question/questionReg?gubun='+gubun+'&projectId='+projectId+'&questionId='+questionId;
			} else {
				location.href='/question/questionReg?gubun='+gubun+'&projectId='+projectId+'&questionId='+questionId;
			}	  
		});
		$('[name="question_update"]').on('click',function(){
			var gubun = 'update'; 
			var questionId = $('[name="question_update"').attr('questionid');
			location.href='/question/questionReg?gubun='+gubun+'&projectId='+projectId+'&questionId='+questionId; 
		});
		$('[name="question_delete"]').on('click',function(){	
			var questionId = $('[name="question_delete"').attr('questionid');
			var questionName = $('[name="question_delete"').attr('questionname');
			questionListJs.delQuestion(projectId, questionId, questionName); 
		});
		$('[name="allcopy"]').on('click',function(){	// 전체문항복사			
			$('body').css('overflow','hidden');			
			$('#pop_allcopy').css('display','');	
			questionListJs.allcopySearch(1,'N');
		});
		$('[name="projectNameInner"]').keypress(function(event){	// 전체문항복사 > 검색
			console.log(event);
			if ((event.which == 13) || (event.keyCode == 13)) {
				if(projectNameInner == null || projectNameInner == '') {
					alert('프로젝트 명을 입력하세요');
					$('[name="projectNameInner"')
					return false;
				}			
				questionListJs.allcopySearch(1,'Y');
			}
		});
		$('[name="bt_search"]').on('click',function(){	// 전체문항복사 > 검색		
			var projectNameInner = $('[name="projectNameInner"').val();
			if(projectNameInner == null || projectNameInner == '') {
				alert('프로젝트 명을 입력하세요');
				$('[name="projectNameInner"').focus();
				return false;
			}			
			questionListJs.allcopySearch(1,'Y');
		});
		$('[name="partcopy"]').on('click',function(){	// 선택문항복사 
			$('body').css('overflow','hidden');
			$('#pop_partcopy').css('display','');
			questionListJs.partcopyList(projectId); 
		});
		$('[name="copy"]').on('click',function(){	// 선택문항복사 > 복사
			var questionNameCheck = false;
			var listSlQuestion = new Array();
			
			$('input:checkbox[name="copyCheck"]:checked').each(function(index,value){
				var questionId = $(this).attr('questionid');
				var questionName = $(this).val();
				
				console.log('questionId', questionId);
				console.log('questionName', questionName);
				
				if(questionName.indexOf('copy_') != -1) {
					questionNameCheck = true;					
				}
				
				var setPartcopy = new Object();
				setPartcopy.projectId=projectId;
				setPartcopy.questionId=questionId;
				setPartcopy.questionName=questionName;
				listSlQuestion.push(setPartcopy);
				
				//console.log('checkbox setPartcopy',setPartcopy);
			});
			console.log('checkbox listSlQuestion',listSlQuestion);
			
			// 복사한 문항 다시 복사할경우
			if(questionNameCheck) {
				alert('복사한 문항을 다시 복사할 수 없습니다.\n문항 이름 변경 후 복사하세요');
				return false;
			}			
			
			// 문항 선택 안한경우
			if(listSlQuestion.length == 0) {
				alert('복사할 문항을 선택하세요');
				return false;
			}
			
			var copyTagetQuestionId = $('#popselectList option:selected').val();
			var copyTagetQuestionName = $('#popselectList option:selected').attr('questionName');
			console.log('copyTagetQuestionId',copyTagetQuestionId);
			console.log('copyTagetQuestionName',copyTagetQuestionName);
			questionListJs.partcopyExecution(listSlQuestion, copyTagetQuestionId, copyTagetQuestionName);
		});
		$('[name="partdel"]').on('click',function(){	// 선택문항복사 
			$('body').css('overflow','hidden');
			$('#pop_partdel').css('display','');
			questionListJs.partdelList(projectId); 
		});
		$('[name="del"]').on('click',function(){	// 부분 삭제
			var listSlQuestion = new Array();
			
			$('input:checkbox[name="delCheck"]:checked').each(function(index,value){
				var questionId = $(this).attr('questionid');
				var questionName = $(this).val();
				
				//console.log('questionId', questionId);
				//console.log('questionName', questionName);
				
				var setPartdel = new Object();
				setPartdel.projectId=projectId;
				setPartdel.questionId=questionId;
				setPartdel.questionName=questionName;
				listSlQuestion.push(setPartdel);
				
				//console.log('checkbox setPartdel',setPartdel);
			});
			console.log('checkbox listSlQuestion',listSlQuestion);
			
			// 문항 선택 안한경우
			if(listSlQuestion.length == 0) {
				alert('삭제할 문항을 선택하세요');
				return false;
			}
			
			questionListJs.partdelExecution(listSlQuestion);
		});
		// 순서 변경
		$('[name="orderChange"]').on('click',function(){ 
			$('body').css('overflow','hidden');
			$('#pop_orderChange').css('display','');
			questionListJs.orderChangeList(projectId); 
		});
		// 순서 변경 >>> 위
		$('[name="orderUp"]').on('click',function(){
			var selectedList = $('#orderChange_questionList option:selected').length;			
			var optionIndex = $('#orderChange_questionList option').index($('#orderChange_questionList option:selected'));
			var optionHtml = $('#orderChange_questionList option:selected').text();
			var questionId = $('#orderChange_questionList option:selected').val();
			
			//console.log('optionIndex',optionIndex);
			//console.log('optionHtml',optionHtml);
			//console.log('questionId',questionId);
			//console.log('selectedList',selectedList);
			
			if(selectedList > 1) {
				alert('변경할 문항 한 개만 선택하세요.');
				return false;
			}
			if(optionIndex == -1) {
				alert('순서 변경할 문항을 선택하세요');
				return false;
			}
			if(optionIndex == 0) {
				alert('첫번째 문항은 불가능합니다.');
				return false;
			}
				
			$('#orderChange_questionList option:eq('+(optionIndex)+')').remove();
			$('#orderChange_questionList option:eq('+(optionIndex-1)+')').before('<option value="'+questionId+'">'+optionHtml+'</option>');
			$('#orderChange_questionList option:eq('+(optionIndex-1)+')').attr('selected','selected');
			
		});
		// 순서 변경  >>> 아래
		$('[name="orderDown"]').on('click',function(){
			var selectedList = $('#orderChange_questionList option:selected').length;
			var optionIndex = $('#orderChange_questionList option').index($('#orderChange_questionList option:selected'));
			var optionHtml = $('#orderChange_questionList option:selected').text();
			var questionId = $('#orderChange_questionList option:selected').val();
			var selSize = $('#orderChange_questionList option').size();
			
			//console.log('optionIndex',optionIndex);
			//console.log('optionHtml',optionHtml);
			//console.log('questionId',questionId);
			//console.log('selSize',selSize);
			
			if(selectedList > 1) {
				alert('변경할 문항 한 개만 선택하세요.');
				return false;
			}
			if(optionIndex == -1) {
				alert('순서 변경할 문항을 선택하세요');
				return false;
			}
			if(optionIndex == selSize-1) {
				alert('마지막 문항은 불가능합니다.');
				return false;
			}
			
			$('#orderChange_questionList option:eq('+(optionIndex)+')').remove();
			$('#orderChange_questionList option:eq('+(optionIndex)+')').after('<option value="'+questionId+'">'+optionHtml+'</option>');
			$('#orderChange_questionList option:eq('+(optionIndex+1)+')').attr('selected','selected'); 
		});
		// 순서 변경  >>> 변경
		$('[name="btn_change"]').on('click',function(){
			var projectId = $('[name="projectId"]').val();
			var orderChange = $('#orderChange_questionList option');
			var questionList = new Array();
			
			//console.log('orderChange',orderChange);			
			$.each(orderChange, function(index, value){
				//console.log('value',value.value);
				var optionObject = new Object();
				
				optionObject.projectId = projectId;
				optionObject.questionId = value.value;
				
				questionList.push(optionObject);
			})
			console.log('questionList',questionList);
			
			questionListJs.orderChangeExecution(questionList);
		});
		/*
		$('#bt_projectReg').on('click',function(){ location.href='/project/projectReg'; });
		$('#bt_search').on('click',function(){ projectListJs.searchListProject(); });
		$('[name="searchValue"]').keypress(function(event){ 
			console.log(event);
			if ((event.which == 13) || (event.keyCode == 13)) {
				projectListJs.searchListProject(); 
			}
		});
		
		$('#bt_psRegister').on('click',function(){ 
			projectListJs.setProjectState(0);
		});
		$('#bt_psStart').on('click',function(){ 
			projectListJs.setProjectState(1);
		});
		$('#bt_psEnd').on('click',function(){ 
			projectListJs.setProjectState(4);
		});
		$('#bt_psProgress').on('click',function(){
			projectListJs.setProjectState(2);
		});
		$('#bt_psCompletion').on('click',function(){ 
			projectListJs.setProjectState(3);
		});
		
		$('#bt_dataDwon').on('click',function(){ 
			projectListJs.setDataEvent('downData');
		});
		$('#bt_dataDel').on('click',function(){ 
			projectListJs.setDataEvent('deleteData');
		});
		
		// onlynumber
		$.each($('[onlynumber]'), function(index, value){
			var $onlynumber = $(this);
			$onlynumber.keyup(function(){
				$(this).val($(this).val().replace(/[^0-9]/g,""));
			});
		});
		*/
	},
	setListQuestion : function () {
		var projectId = $('[name="projectId"]').val();
		var urlVal = '/question/setQuestionList';
		console.log("setListQuestion projectId",projectId);
		console.log("setListQuestion urlVal",urlVal);
				
		// loading show
    	$('#container #loading').css('display', '');
    	$('#container #loading_img').css('display', '');
    	
    	$.ajax({
		    url   		: urlVal,
		    type  		: "post",
		    dataType    : "json",
		    contentType : "application/json",
		    data  		: JSON.stringify( {projectId:projectId} ),				
		    success     : function(responseData){
		    	console.log("questionListJs init",responseData);
		    	setResponseData = responseData;
		    	if (null != responseData) {		    		
		    		if (null != responseData.listSlQuestion) {
			    		questionListJs.listSlQuestion(projectId, responseData.hardCodingId, responseData.listSlQuestion, responseData.listSlQuestionViewPage, responseData.listSlQuestionFunction, responseData.listSlExample, responseData.listSlRotationMain, responseData.selectSlQuater);			    					    		
		    		}
		    	}
				// loading hide
		    	$('#container #loading').css('display', 'none');
		    	$('#container #loading_img').css('display', 'none');
		    },
		    error : function(e){
				// loading hide
		    	$('#container #loading').css('display', 'none');
		    	$('#container #loading_img').css('display', 'none');
		    	//console.log("error",e);
		    }		    
		});
	},
	listSlQuestion : function (projectId, hardCodingId, listSlQuestion, listSlQuestionViewPage, listSlQuestionFunction, listSlExample, listSlRotationMain, selectSlQuater) {

		// 하드코딩 아이디
		$('[name="hardCodingId"]').val(hardCodingId);
		
		// 문항리스트
		$('#questionList').html('');
		var setQuestionListHtml = "";
		//console.log('listSlQuestion',listSlQuestion);
		$.each(listSlQuestion, function(index, value){
			//console.log('index',index);
			//console.log('selListSlQuestion',value);
						
			setQuestionListHtml += '<li>'
								+ '<span class="tree_label">'
								+ '<a href="javascript:void(0);" onclick="questionListJs.questionView(\''+projectId+'\',\''+value.questionId+'\',\''+value.questionName+'\',\''+value.questionType+'\')">'
								+ value.questionName
								+ '</a>'
								+ '</span>'
								+ '</li>';
		});
		$('#questionList').html(setQuestionListHtml);
		
		//setKeyup
		
		// onlynumber
		$.each($('[onlynumber]'), function(index, value){
			var $onlynumber = $(this);
			$onlynumber.keyup(function(){
				$(this).val($(this).val().replace(/[^0-9]/g,""));
			});
		});
		// onlykorean
		$.each($('[onlykorean]'), function(index, value){
			var $onlynumber = $(this);
			$onlynumber.keyup(function(){
				$(this).val($(this).val().replace(/[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"\\]/g,""));
			});
		});
		// onlyenglish
		$.each($('[onlyenglish]'), function(index, value){
			var $onlynumber = $(this);
			$onlynumber.keyup(function(){
				$(this).val($(this).val().replace(/[0-9]|[^\!-z]/gi,""));
			});
		});
		
		$.each($('[smedia]'), function(index, value){
			var timer = $(this).attr('timer');
			setPageTime = timer;
			window.onload = function TimerStart(){ tid=setInterval('serveyJs.msgTimer()',1000) };
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
		
		// onlynumber
		// onlykorean
		// onlyenglish
		// onlymoney
		// onlyphone
		// onlyemail
	},
	questionView : function (projectId, questionId, questionName, questionType){
		// 상세 문항 보기
		
		// 해당 문항정보 속성 설정
		$('[name="question_update"').attr('questionId', questionId);
		$('[name="question_delete"').attr('questionId', questionId);
		$('[name="question_delete"').attr('questionName', questionName);
		$('#questionView').html('');		// 초기화
		$('#questionViewOption').html('');	// 초기화
		
		var listSlQuestion = setResponseData.listSlQuestion;
		var listSlExample = setResponseData.listSlExample;
		var listSlQuestionFunction = setResponseData.listSlQuestionFunction;
		var listSlQuestionViewPage = setResponseData.listSlQuestionViewPage;
		var listSlQuestionLogic = setResponseData.listSlQuestionLogic;
		var listSlRotationMain = setResponseData.listSlRotationMain;
		var selectSlQuater = setResponseData.selectSlQuater;
		
		var selListSlQuestion = null;
		var selListSlExample = new Array();
		var selListSlQuestionFunction = new Array();
		var selListSlQuestionViewPage = null;
		var selListSlQuestionLogic = new Array();
		var selListSlRotationMain = new Array();
		var selSlQuater = null;
		
		var viewProjectId = projectId;
		var viewQuestionId = questionId;
		
		$.each(listSlQuestion, function(index, value){
			
			if(value.questionId == viewQuestionId) {
				viewQuestionType = value.questionType;
				selListSlQuestion = value;
				
				// 해당 보기문항 데이터 추출 >>> sl_Example
				var slExampleCnt = 0;
				$.each(listSlExample, function(index2, value2){
					//console.log('value.questionId',value.questionId);
					//console.log('value2.questionId',value2.questionId);
					if(value2.questionId == viewQuestionId) {
						selListSlExample[slExampleCnt] = value2;
						slExampleCnt++;
					}				
				});			
				//console.log('selListSlExample',selListSlExample);
				
				// 해당 보기옵션 데이터 추출 >>> sl_QuestionFunction
				var slQuestionFunctionCnt = 0;
				$.each(listSlQuestionFunction, function(index2, value2){
					//console.log('value.questionId',value.questionId);
					//console.log('value2.questionId',value2.questionId);
					if(value2.questionId == viewQuestionId) {
						selListSlQuestionFunction[slQuestionFunctionCnt] = value2;
						slQuestionFunctionCnt++;
					}				
				});			
				//console.log('selListSlQuestionFunction',selListSlQuestionFunction);
							
				// 해당 다음이동 데이터 추출 >>> sl_QuestionLogic
				var slQuestionLogicCnt = 0;
				$.each(listSlQuestionLogic, function(index2, value2){
					//console.log('value.questionId',value.questionId);
					//console.log('value2.questionId',value2.questionId);
					if(value2.questionId == viewQuestionId) {
						selListSlQuestionLogic[slQuestionLogicCnt] = value2;
						slQuestionLogicCnt++;
					}				
				});	
				//console.log('selListSlQuestionLogic',selListSlQuestionLogic);
				
				// 해당 보기순서 데이터 추출 >>> sl_QuestionViewPage
				selListSlQuestionViewPage = listSlQuestionViewPage;
				/*
				var slQuestionViewPageCnt = 0;
				$.each(listSlQuestionViewPage, function(index2, value2){
					//console.log('value.questionId',value.questionId);
					//console.log('value2.questionId',value2.questionId);
					if(value2.projectId == viewProjectId) {
						selListSlQuestionViewPage[slQuestionViewPageCnt] = value2;
						slQuestionViewPageCnt++;
					}				
				});
				*/			
				//console.log('selListSlQuestionViewPage',selListSlQuestionViewPage);
				
				// 해당 로테이션 데이터 추출 >>> sl_RotationMain
				var slRotationMainCnt = 0;
				$.each(listSlRotationMain, function(index2, value2){
					//console.log('value.questionId',value.questionId);
					//console.log('value2.questionId',value2.questionId);
					if(value2.rotMainQuestionId == viewQuestionId) {
						selListSlRotationMain[slRotationMainCnt] = value2;
						slRotationMainCnt++;
					}				
				});			
				//console.log('selListSlRotationMain',selListSlRotationMain);
				
				// 해당 쿼터 데이터 추출 >>> sl_Quater
				selSlQuater = selectSlQuater;			
				//console.log('selSlQuater',selSlQuater);
				
				//console.log('questionView selListSlQuestion',selListSlQuestion);
				//console.log('questionView selListSlExample',selListSlExample);
				//console.log('questionView selListSlQuestionFunction',selListSlQuestionFunction);
				//console.log('questionView selListSlQuestionViewPage',selListSlQuestionViewPage);
				//console.log('questionView selListSlRotationMain',selListSlRotationMain);
				//console.log('questionView selectSlQuater',selectSlQuater);	
				
				return false;
			}
		});
		
		//console.log('questionView viewQuestionType',viewQuestionType);
		
		// html 시작
		var setEnter = '';
		var questionId = selListSlQuestion.questionId;
		var questionName = selListSlQuestion.questionName;
		var questionTitle = selListSlQuestion.questionTitle;
		var questionType = selListSlQuestion.questionType;
		var questionLogic = selListSlQuestion.questionLogic;
		var questionOption = selListSlQuestion.questionOption;
		
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
				
		var questionFunction = selListSlQuestionFunction;
		//console.log('setQuestionTypeHtml questionFunction',questionFunction);
		if (null != questionFunction) {
			var setQuestionOptionHtml = '문항옵션=';
			
			$.each(questionFunction, function(index3, value3){
				var functionType = value3.functionType;
				var functionText = value3.functionText;
				var fQuestionId = value3.questionId;				
				//console.log('setQuestionTypeHtml functionText',functionText);
				
				if ("option" == functionType) {
					
					var fObject = questionListJs.checkOptionType(functionText, fQuestionId);					
					console.log('fObject',fObject);
					
					if (null != fObject) {
						
						var fType = fObject.type;
						var fValue = fObject.data;
						aCheckOption.push(fObject);
						
						var optionType = '';
						var optionData = '';
						
						if(fValue != null) {
							if ("addrow" == fValue) {
								optionType = '속성형 옵션';
								optionData = '단일응답 행 추가 옵션';
							} else if ("addrowmul" == fValue) {
								optionType = '속성형 옵션';
								optionData = '중복응답 행 추가 옵션';
							} else if ("addcol" == fValue) {
								optionType = '속성형 옵션';
								optionData = '단일응답 열 추가 옵션';
							} else if ("addcolmul" == fValue) {
								optionType = '속성형 옵션';
								optionData = '중복응답 열 추가 옵션';
							} else if ("onlykorean" == fValue) {
								optionType = '입력옵션';
								optionData = '한글';
							} else if ("onlyenglish" == fValue) {
								optionType = '입력옵션';
								optionData = '영문';
							} else if ("onlymoney" == fValue) {
								optionType = '입력옵션';
								optionData = '숫자입력 시 금액표시';
							} else if ("onlyphone" == fValue) {
								optionType = '입력옵션';
								optionData = '숫자';
							} else if ("onlynumber" == fValue) {
								optionType = '입력옵션';
								optionData = '숫자';
							} else if ("onlyemail" == fValue) {
								optionType = '입력옵션';
								optionData = '이메일';								
							} else if ("customOnlyphone" == fValue) {
								optionType = '입력옵션';
								optionData = '전화번호';
							} else if ("customOnlyemail" == fValue) {
								optionType = '입력옵션';
								optionData = '이메일';								
							} else if ("onlytext" == fValue) {
								optionType = '입력옵션';
								optionData = '특수문자 포함';
							} else {
								optionData = fValue;
							}				
						}
						
						if ("ETC" == fType) {
							checkOptionEtc = "Y";
							checkOptionEtcIndex = fValue;
							optionType += "기타";
							if ("" != fValue && null != fValue) {
								optionData += "번";
							} else {
								optionData += "마지막보기";
							}
						} else if ("989" == fType) {
							checkOption989 = "Y";
							optionType += "이중에없음";
						} else if ("notExist" == fType) {
							checkOptionNotExist = "Y";
							checkOptionNotExistIndex = fValue;
							optionType += "이중에없음";
						} else if ("quota" == fType) {							
							optionType += "쿼터문항";
						} else if ("text" == fType) {
							checkOptionText = true;
							checkOptionTextVal = fValue;
							//optionType += "오픈응답";
						} else if ('attr' == fType) {
							checkOptionAttr = true;
							checkOptionAttrVal = fValue;
							//optionType += "속성형";
						} else if ('mediaurl' == fType) {
							checkOptionMedia = true;
							checkOptionMediaUrl = fValue;
							optionType += "URL";
						} else if ('mediatimer' == fType) {
							checkOptionTimer = fValue;
							optionType = "동영상타이머";
							optionData += "초";
						} else if ('timer' == fType) {
							checkOptionTimer = fValue;
							optionType = "타이머";
							optionData += "초";
						}
						
						//console.log('optionData', optionData);
						if(optionData != '' && optionData != null) {
							optionType += ": ";
						}
						//console.log('optionType', optionType);
					}
				}
				setQuestionOptionHtml += '[<span style="color: blue;"> ' + optionType + ' </span> <span style="color: red;"> ' + optionData + ' </span>] ';
			});
			
			if(setQuestionOptionHtml == '문항옵션=') {
				setQuestionOptionHtml = '';
			}
			
			var questionLogic = selListSlQuestionLogic;
			var setQuestionLogicHtml = '';
			if (null != questionLogic) {
				if(setQuestionOptionHtml == '') {
					setQuestionLogicHtml += '문항이동=';
				} else {
					setQuestionLogicHtml += '<br> 문항이동=';
				}
				//console.log('setQuestionTypeHtml questionLogic',questionLogic);
				$.each(questionLogic, function(index3, value3){
					if(value3.logicType == 'move') {
						setQuestionLogicHtml += '[<span style="color: blue;"> ' + value3.exampleValueBase + ' </span> > <span style="color: red;"> ' + value3.questionNameTarget + ' </span>] ';
					}					 
				});
				
				//console.log('setQuestionLogicHtml',setQuestionLogicHtml);
				if(setQuestionLogicHtml == '문항이동=' || setQuestionLogicHtml == '<br> 문항이동=') {
					setQuestionLogicHtml = '';
				}
			}
			
			$('#questionViewOption').html(setQuestionOptionHtml + setQuestionLogicHtml);
		}
		// Set Example
		var slExample = selListSlExample;
		var slQuestionLogic = selListSlQuestionLogic;
		var slExampleLen = 0;
		if (null != slExample) {
			slExampleLen = slExample.length;
		}
		
		var returnObject = new Object();
		var setQuestionHtml = '';
		//var setQuestionHtml = '<div>'+ setEnter;
		
		if ("sin" == questionType) {
			var setExampleHtml = "";
			
			if (null != slExample) {
				
				$.each(slExample, function(index2, value2){
					
					var checkIndex = index2 + 1;
					
					var exampleId = value2.exampleId;
					var exampleText = value2.exampleText;
					var exampleLogicText = '';	// # | 로직
					if(value2.exampleLogicText != null && value2.exampleLogicText != '') {
						exampleLogicText = value2.exampleLogicText;
					}
					var setOptionLastText = "";
					var setOptionLastAttr = "";
					
					if ('Y' == checkOptionEtc) {
						console.log("null != checkOptionEtcIndex && '' != checkOptionEtcIndex", null != checkOptionEtcIndex && '' != checkOptionEtcIndex);
						console.log("slExampleLen == checkIndex", slExampleLen == checkIndex);
						if (null != checkOptionEtcIndex && '' != checkOptionEtcIndex) {
							
							if ( checkIndex == parseInt(checkOptionEtcIndex) ) {
								var setHtmlAddEt = questionListJs.setAddEtc('sin','' ,questionName, checkIndex, setEnter, questionFunction);
								setOptionLastText = setHtmlAddEt.setOptionLastText;
								setOptionLastAttr = setHtmlAddEt.setOptionLastAttr;
							}							
						} else if (slExampleLen == checkIndex) {
							
							var setHtmlAddEt = questionListJs.setAddEtc('sin', '', questionName, checkIndex, setEnter, questionFunction);
							setOptionLastText = setHtmlAddEt.setOptionLastText;
							setOptionLastAttr = setHtmlAddEt.setOptionLastAttr;
						}
					}
										
					setExampleHtml = setExampleHtml + '			<li>'
					+ '<label><input type="radio" name="'+ questionName +'" id="'+ questionName +'_'+ checkIndex +'" value="'+ checkIndex +'" exampletext="'+ questionName +'" exampleindex="'+ checkIndex +'" '+ setOptionLastAttr +' />'
					+ exampleText + exampleLogicText +'</label>' + setOptionLastText
					+ '</li>'+ setEnter;
					
					//console.log('setExampleHtml setOptionLastText ' + index2 +': ', setOptionLastText);
					//console.log('setExampleHtml setOptionLastAttr ' + index2 +': ', setOptionLastAttr);
				});
			}
			
			setQuestionHtml = setQuestionHtml+ '<section class="contents">' + setEnter
								 +'	<article>' + setEnter
								 +'		<div>' + setEnter
								 +'			'+ questionName +'. ' + setEnter
								 +'		</div>' + setEnter
								 +'		<div>' + setEnter
								 +'			'+ questionTitle
								 +' [<span style="color: blue;">질문유형</span>: <span style="color: red;">단일형</span>]' + setEnter
								 +'		</div>' + setEnter
								 +'	</article>' + setEnter
								 +'	<article class="survey_form">' + setEnter
								 +'		<ul>' + setEnter
								 +		setExampleHtml 
								 +'		</ul>' + setEnter
								 +'	</article>' + setEnter
								 +'</section>' + setEnter;
			//returnObject = serveyJs.setQuestionHtmlObject(questionId, questionName, setQuestionHtml);
		} else if ("mul" == questionType) {
			
			var setExampleHtml = "";
			
			if (null != slExample) {
				
				$.each(slExample, function(index2, value2){
					
					var checkIndex = index2 + 1;
					
					var exampleId = value2.exampleId;
					var exampleText = value2.exampleText;
					
					var setOptionLastText = "";
					var setOptionLastAttr = "";
					
					//console.log('mul checkOptionNotExist',checkOptionNotExist);
					//console.log('mul checkOptionNotExistIndex',checkOptionNotExistIndex);
					//console.log('mul checkIndex',checkIndex);
					//console.log('mul checkOptionEtc',checkOptionEtc);
					//console.log('mul checkOptionEtcIndex',checkOptionEtcIndex);
					//console.log("ord checkIndex == parseInt(checkOptionEtcIndex)", checkIndex == parseInt(checkOptionEtcIndex));
					//console.log("ord checkIndex == parseInt(checkOptionNotExistIndex)", checkIndex == parseInt(checkOptionNotExistIndex));
					//console.log("null != checkOptionNotExistIndex && '' != checkOptionNotExistIndex",null != checkOptionNotExistIndex && '' != checkOptionNotExistIndex);
					//console.log('checkIndex == parseInt(checkOptionNotExistIndex)',checkIndex == parseInt(checkOptionNotExistIndex));
					//console.log('slExampleLen == checkIndex',slExampleLen == checkIndex);
					
					if ('Y' == checkOptionEtc) {
						
						if (null != checkOptionEtcIndex && '' != checkOptionEtcIndex) {
							
							if ( checkIndex == parseInt(checkOptionEtcIndex) ) {
								
								var setHtmlAddEt = questionListJs.setAddEtc('mul', checkOption989, questionName, checkIndex, setEnter, questionFunction);
								setOptionLastText = setHtmlAddEt.setOptionLastText;
								setOptionLastAttr = setHtmlAddEt.setOptionLastAttr;
								
								checkOptionEtc = ""; // 초기화
								//console.log('초기화 checkOptionEtc',checkOptionEtc);
							}
							
						} else if (slExampleLen == checkIndex) {
							
							var setHtmlAddEt = questionListJs.setAddEtc('mul', checkOption989, questionName, checkIndex, setEnter, questionFunction);
							setOptionLastText = setHtmlAddEt.setOptionLastText;
							setOptionLastAttr = setHtmlAddEt.setOptionLastAttr;
							
							checkOptionEtc = ""; // 초기화
							//console.log('초기화 checkOptionEtc',checkOptionEtc);
						}
						
					}
					if ('Y' == checkOptionNotExist) {	// 이중에 없음	
						
						if (null != checkOptionNotExistIndex && '' != checkOptionNotExistIndex) {							
							if ( checkIndex == parseInt(checkOptionNotExistIndex) ) {
								setOptionLastAttr = 'sreadonly="'+ questionName + '" scheckedfalse';
								
								checkOptionNotExist = ""; // 초기화
								//console.log('초기화 checkOptionNotExist',checkOptionNotExist);
							}							
							//console.log('setOptionLastAttr',setOptionLastAttr);
						}
					}
					
					setExampleHtml = setExampleHtml + '			<li>'
					//+ '<label><input type="checkbox" name="'+ questionName +'" id="'+ questionName +'_'+ checkIndex +'" value="'+ checkIndex +'" exampletext="'+ questionName +'" exampleindex="'+ checkIndex +'" '+ setOptionLastAttr +' />'
					+ '<label><input type="checkbox" name="'+ questionName +'" id="'+ questionName +'_'+ checkIndex +'" value="'+ checkIndex +'" exampletext="'+ questionName +'_'+ checkIndex +'" exampleindex="'+ checkIndex +'" '+ setOptionLastAttr +' />'					
					+ exampleText +'</label>' + setOptionLastText
					+ '</li>'+ setEnter;
					
					//console.log('setExampleHtml exampletext', questionName +'_'+ checkIndex);
				});
			}
			
			setQuestionHtml = setQuestionHtml+ '<section class="contents">' + setEnter
								 +'	<article>' + setEnter
								 +'		<div>' + setEnter
								 +'			'+ questionName +'. ' + setEnter
								 +'		</div>' + setEnter
								 +'		<div>' + setEnter
								 +'			'+ questionTitle 
								 +' [<span style="color: blue;">질문유형</span>: <span style="color: red;">중복형</span>]' + setEnter
								 +'		</div>' + setEnter
								 +'	</article>' + setEnter
								 +'	<article class="survey_form">' + setEnter
								 +'		<ul>' + setEnter
								 +'			'+ setExampleHtml + setEnter
								 +'		</ul>' + setEnter
								 +'	</article>' + setEnter
								 +'</section>' + setEnter;
			
			//returnObject = serveyJs.setQuestionHtmlObject(questionId, questionName, setQuestionHtml);
		} else if ("ord" == questionType) {
			
			var setExampleHtml = "";
			if (null != slExample) {
				
				$.each(slExample, function(index2, value2){
					
					var checkIndex = index2 + 1;
					
					var exampleId = value2.exampleId;
					var exampleText = value2.exampleText;
					
					//console.log('ord checkOptionNotExist',checkOptionNotExist);
					//console.log('ord checkOptionNotExistIndex',checkOptionNotExistIndex);
					//console.log('ord checkIndex',checkIndex);
					//console.log('ord checkOptionEtc',checkOptionEtc);
					//console.log('ord checkOptionEtcIndex',checkOptionEtcIndex);
					//console.log("ord checkIndex == parseInt(checkOptionEtcIndex)", checkIndex == parseInt(checkOptionEtcIndex));
					//console.log("ord checkIndex == parseInt(checkOptionNotExistIndex)", checkIndex == parseInt(checkOptionNotExistIndex));
										
					var setOptionLastText = "";
					var setOptionLastAttr = "";
					if ('Y' == checkOptionEtc) {
						
						if (null != checkOptionEtcIndex && '' != checkOptionEtcIndex) {
							
							if ( checkIndex == parseInt(checkOptionEtcIndex) ) {
								var setHtmlAddEt = questionListJs.setAddEtc('ord','' ,questionName, checkIndex, setEnter, questionFunction);
								setOptionLastText = setHtmlAddEt.setOptionLastText;
								setOptionLastAttr = setHtmlAddEt.setOptionLastAttr;
							}
							
						} else if (slExampleLen == checkIndex) {
							
							var setHtmlAddEt = questionListJs.setAddEtc('ord', '', questionName, checkIndex, setEnter, questionFunction);
							setOptionLastText = setHtmlAddEt.setOptionLastText;
							setOptionLastAttr = setHtmlAddEt.setOptionLastAttr;
						}
					}
					if ('Y' == checkOptionNotExist) {	// 이중에 없음	
						
						if (null != checkOptionNotExistIndex && '' != checkOptionNotExistIndex) {							
							if ( checkIndex == parseInt(checkOptionNotExistIndex) ) {
								setOptionLastAttr = 'sreadonly="'+ questionName +'" sorderfalse';
								checkOptionNotExist = ""; // 초기화
								//console.log('초기화 checkOptionNotExist',checkOptionNotExist);
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
									 +'		<div>' + setEnter
									 +			questionName +'. ' + setEnter
									 +'		</div>' + setEnter
									 +'		<div>' + setEnter
									 +			questionTitle 
									 +' [<span style="color: blue;">질문유형</span>: <span style="color: red;">순위형</span>]' + setEnter
									 +'		</div>' + setEnter
									 +'	</article>' + setEnter
									 +'	<article class="survey_form">' + setEnter
									 +'		<ul>' + setEnter
									 +		setExampleHtml + setEnter
									 +'		</ul>' + setEnter
									 +'	</article>' + setEnter
									 +'</section>'+ setEnter;
			
			//returnObject = serveyJs.setQuestionHtmlObject(questionId, questionName, setQuestionHtml);
		} else if ("tex" == questionType || "num" == questionType) {
			
			var qTypeHtml = '';
			if("tex" == questionType) {
				qTypeHtml = '오픈형';
			} else if("num" == questionType) {
				qTypeHtml = '오픈숫자형';
			}
			var setAttr = '';
			if ("num" == questionType) {
				setAttr = 'onlynumber';
			}
			if (checkOptionText) {
				var onlykorean = false;
				var onlyenglish = false;
				var onlynumber = false;
				var onlyemail = false;
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
					} else if(value.functionText == 'onlyemail') {
						onlyemail = true;
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
			}
			
			// 사용자정의 보기 판별
			var customExampleCheck = false;
			if(questionOption == 'customExample') {
				customExampleCheck = true;
			}
			
			// 사용자정의 보기 텍스트크기
			var customTextWidth = 155;
			//console.log('setAttr slQuestionLogic', slQuestionLogic);
			if(slQuestionLogic[0] != undefined && slQuestionLogic[0].logicType == 'customTextWidth') {
				customTextWidth = slQuestionLogic[0].exampleValueBase;
			}
			
			var setAddHtml = '';
			if ("onlymoney" == checkOptionTextVal) {
				setAddHtml = '<div>금액을 등록하면 한글로 표시 됩니다.</div>';
			} else if ("onlyphone" == checkOptionTextVal) {
				setAddHtml = '<div>"-" 기호 없이 등록 하세요. 예) 01012341234 </div>';
			} else if ("onlyemail" == checkOptionTextVal) {
				setAddHtml = '<div>메일 형식에 맞게 등록 하세요. 예) smart@smartpanel.com </div>';
			}
			
			var setHtml = '';
			if (null != slExample && 0 < slExampleLen) {
				
				var setContentHtml = "";
				$.each(slExample, function(index2, value2){
					
					var checkIndex = index2 + 1;
					
					var exampleId = value2.exampleId;
					var exampleText = value2.exampleText;
					var exampleLogicText = '';	// # | 로직
					if(value2.exampleLogicText != null && value2.exampleLogicText != '') {
						exampleLogicText = value2.exampleLogicText;
					}
					
					// 일반 보기(테이블 보기)
					if(!customExampleCheck) {
					setContentHtml = setContentHtml 
						+'				<tr>'+ setEnter
						+' 					<td class="item_title">'+ exampleText + exampleLogicText +'</td>'+ setEnter
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
								setContentHtml += '<input type="text" class="customExample" name="'+ questionName +'" id="'+ questionName +'" exampletext="'+ questionName +'" value="" '+ setAttr +' textwidth="'+customTextWidth+'" /> '+ setEnter;													
							} else if(slExample.length-1 > index2) {
								// 응답 값 1개이상
								setContentHtml += '<input type="text" class="customExample" name="'+ questionName +'_'+ checkIndex +'" id="'+ questionName +'_'+ checkIndex +'" exampletext="'+ questionName +'_'+ checkIndex +'" exampleindex="'+ checkIndex +'" value="" '+ setAttr +' textwidth="'+ customTextWidth +'" /> '+ setEnter;
							}
					}
				});
				
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
				console.log('else setAttr customExampleCheck',customExampleCheck);
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
						+'				<input type="text" name="'+ questionName +'_1" id="email_1" exampletext="'+ questionName +'_1" value="" '+ setAttr +' textwidth="200"> @ '
						+'				<input type="text" name="'+ questionName +'_2" id="email_2" exampletext="'+ questionName +'_2" value="" '+ setAttr +' textwidth="200" />'						
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
				 +'		<div>' + setEnter
				 +			questionName +'. ' + setEnter
				 +'		</div>' + setEnter
				 +'		<div>' + setEnter
				 +			questionTitle 
				 +' [<span style="color: blue;">질문유형</span>: <span style="color: red;">' +qTypeHtml+ '</span>]' + setEnter
				 +'		</div>' + setEnter
				 +'	</article>' + setEnter
				 +'	<article class="survey_form">' + setEnter
				 +		setHtml + setEnter
				 +'	</article>' + setEnter
				 +'</section>' + setEnter;
			
			//returnObject = serveyJs.setQuestionHtmlObject(questionId, questionName, setQuestionHtml);
		} else if ("sca" == questionType) {
			
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
								 +'		<div>'+ setEnter
								 +			questionName +'. '+ setEnter
								 +'		</div>'+ setEnter
								 +'		<div>'+ setEnter
								 +			questionTitle
								 +' [<span style="color: blue;">질문유형</span>: <span style="color: red;">척도형</span>]' + setEnter
								 +'		</div>'+ setEnter
								 +'	</article>'+ setEnter
								 +'	<article class="survey_form">'+ setEnter
								 +'		<table class="measure">'+ setEnter
								 +			setHtml+ setEnter
								 +'		</table>'+ setEnter
								 +'	</article>'+ setEnter
								 +'</section>'+ setEnter;
			
			//returnObject = serveyJs.setQuestionHtmlObject(questionId, questionName, setQuestionHtml);
		} else if ("att" == questionType) {
			
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
								var setHtmlAddEt = questionListJs.setAddEtc('att','' ,questionName, checkCIndex, setEnter);
								setOptionLastText = setHtmlAddEt.setOptionLastText;
							}
							
						} else if (slExampleLen == checkCIndex) {
							var setHtmlAddEt = questionListJs.setAddEtc('att', '', questionName, checkCIndex, setEnter);
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
								 +'		<div>'+ setEnter
								 +			questionName +'. '+ setEnter
								 +'		</div>'+ setEnter
								 +'		<div>'+ setEnter
								 +			questionTitle
								 +' [<span style="color: blue;">질문유형</span>: <span style="color: red;">속성형</span>]' + setEnter
								 +'		</div>'+ setEnter
								 +'	</article>'+ setEnter
								 +'	<article class="survey_form">'+ setEnter
								 +'		<table class="measure '+ classAttr +'">'+ setEnter
								 +			setHtml+ setEnter
								 +'		</table>'+ setEnter
								 +'	</article>'+ setEnter
								 +'</section>'+ setEnter;
			//returnObject = serveyJs.setQuestionHtmlObject(questionId, questionName, setQuestionHtml);			
		} else if ("textarea" == questionType) {
			
			setQuestionHtml = setQuestionHtml+ '<section class="contents">'+ setEnter
			 +'	<article>'+ setEnter
			 +'		<div>'+ setEnter
			 +			questionName +'. '+ setEnter
			 +'		</div>'+ setEnter
			 +'		<div>'+ setEnter
			 +			questionTitle
			 +' [<span style="color: blue;">질문유형</span>: <span style="color: red;">문장입력형</span>]' + setEnter
			 +'		</div>'+ setEnter
			 +'	</article>'+ setEnter
			 +'	<article class="survey_form">'+ setEnter
			 +'		<textarea cols="100" rows="10" name="'+ questionName +'" id="'+ questionName +'" exampletext="'+ questionName +'" ></textarea>'+ setEnter
			 +'	</article>'+ setEnter
			 +'</section>'+ setEnter;
			
			//returnObject = serveyJs.setQuestionHtmlObject(questionId, questionName, setQuestionHtml);
			
		} else if ("media" == questionType) {
			
			//checkOptionMediaUrl 
			//checkOptionTimer
			console.log('checkOptionMedia',checkOptionMedia);
			console.log('checkOptionMediaUrl',checkOptionMediaUrl);
			console.log('checkOptionTimer',checkOptionTimer);
			if (checkOptionMedia) {
				
				setQuestionHtml = setQuestionHtml+ '<section class="contents">'+ setEnter
				+'	<article>'+ setEnter
				+'		<div>'+ setEnter
				+			questionName +'. '+ setEnter
				+'		</div>'+ setEnter
				+'		<div>'+ setEnter
				+			questionTitle
				+' [<span style="color: blue;">질문유형</span>: <span style="color: red;">미디어형</span>]' + setEnter
				+'		</div>'+ setEnter
				+'	</article>'+ setEnter
				+'	<article class="survey_form">'+ setEnter
				+'		<iframe frameborder="0" height="281" smedia src="http://'+ checkOptionMediaUrl +'" timer="'+ checkOptionTimer +'" allowfullscreen="" mozallowfullscreen="" webkitallowfullscreen="" width="500"></iframe>'+ setEnter
				+'		<div id="msgTimer"></div>'+ setEnter
				+'	</article>'+ setEnter
				+'</section>'+ setEnter;
				
				//returnObject = serveyJs.setQuestionHtmlObject(questionId, questionName, setQuestionHtml);
			}
			
		}else if ("info" == questionType) {
			var exampleText = '';
			
			if (null != slExample) {		
				$.each(slExample, function(index, value){
					exampleText = value.exampleText;
				});
			}
				
			setQuestionHtml = setQuestionHtml+ '<section class="contents">'+ setEnter
			 +'	<article>'+ setEnter
			 +'		<div>'+ setEnter
			 +			questionName +'. '+ setEnter
			 +'		</div>'+ setEnter
			 +'		<div>'+ setEnter
			 +			questionTitle
			 +' [<span style="color: blue;">질문유형</span>: <span style="color: red;">안내형</span>]' + setEnter
			 +'		</div>'+ setEnter
			 +'	</article>'+ setEnter
			 +'	<article class="survey_form">'+ setEnter
			 +'	<ul>'+ setEnter 
			 +' <li>'+ exampleText + '</li>'+ setEnter
			 +'	</ul>'+ setEnter 
			 +'	</article>'+ setEnter
			 +'</section>'+ setEnter;
			
			//returnObject = serveyJs.setQuestionHtmlObject(questionId, questionName, setQuestionHtml);
		} 
		/*
		setQuestionHtml = setQuestionHtml+ '</div>'+ setEnter
		 +'	<div>'+ setEnter 
		 +'		<div>'+ setEnter
		 +'			문항옵션= [<span style="color: blue;">필수체크</span>: <span style="color: red;">사용</span>] [<span style="color: blue;">보기로테이션</span>: <span style="color: red;">사용</span>]'+ setEnter
		 +'		</div>'+ setEnter
		 +'		<div class="selec" style="margin-top:20px; text-align: right;padding-bottom: 30px;border-bottom: 1px solid silver;">'+ setEnter
		 +'			<input type="button" value="자바스크립트">'+ setEnter
		 +'			<input type="button" value="삽입">'+ setEnter
		 +'			<input type="button" value="복사">'+ setEnter
		 +'			<input type="button" value="수정">'+ setEnter
		 +'			<input type="button" value="삭제">'+ setEnter
		 +'			<input type="button" value="보기이미지 등록">'+ setEnter
		 +'		</div>'+ setEnter
		 +'	</div>'+ setEnter;
		 */
		$('#questionView').html(setQuestionHtml);
		
		/*
		if(viewQuestionType == 'sin') {
			// 단일형
		} else if(viewQuestionType == 'mul') {
			// 중복형
		} else if(viewQuestionType == 'ord') {
			// 순위형
		} else if(viewQuestionType == 'num') {
			// 숫자형
		} else if(viewQuestionType == '') {
			// 합계계산형
		} else if(viewQuestionType == 'sca') {
			// 척도형
		} else if(viewQuestionType == 'att') {
			// 속성형
		} else if(viewQuestionType == 'tex') {
			// 오픈형
		} else if(viewQuestionType == 'info') {
			// 알림형
		} else if(viewQuestionType == '') {
			// 사용자정의형
		}
		*/
		
		// 보기 기능 함수 호출
		questionListJs.setAttr(questionId, questionType);
		$('#questionView').css('display', '');
		$('#questionViewOption').css('display', '');
		$('#questionViewBtn').css('display', '');
		
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
			} else if (functionText.match('mediatimer')) {
				returnType = 'mediatimer';
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
			} else if (functionText.match('quota')) {
				returnType = 'quota';
				returnVal = fVal;
			}
		}
		
		returnObject.type=returnType;
		returnObject.data=returnVal;
		returnObject.questionId=questionId;
		return returnObject;
	}, setQuestionHtmlObject : function (questionId, questionName, setQuestionHtml) {
		
		var setObject = new Object();
		setObject.questionId = questionId;
		setObject.questionName = questionName;
		setObject.questionHtml = setQuestionHtml;
		
		return setObject;
	}, setAttr : function (questionId, questionType) {
		
		var data = setResponseData;
		
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
			window.onload = function TimerStart(){ tid=setInterval('serveyJs.msgTimer()',1000) };
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
			//var selectSlQuestion = data.selectSlQuestion;
			var listSlQuestion = data.listSlQuestion;
			var listSlExample = '';
			//var questionType = selectSlQuestion.questionType;

			//console.log('textwidth data', data);
			//console.log('textwidth listSlQuestion', listSlQuestion);
			//console.log('textwidth listSlExample', listSlExample);
			//console.log('textwidth listSlQuestionLogic', listSlQuestionLogic);
			
			$.each(listSlQuestionLogic, function(index, value){
				var logicType = value.logicType;	// 로직 타입
				var logicQuestionId = value.questionId;	// 문항id
				var questionNameBase = value.questionNameBase;	// 현재 문항이름				
				var textWidth = value.exampleValueBase;			// 텍스트 크기 값
				
				//console.log('textwidth logicQuestionId', logicQuestionId);
				//console.log('textwidth questionId', questionId);
				if(logicQuestionId == questionId) {
					//console.log('textwidth logicType', logicType);
					//console.log('textwidth questionType', questionType);
					//console.log('textwidth questionNameBase', questionNameBase);
					//console.log('textwidth textWidth', textWidth);
	
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
							//console.log($('[name="'+questionNameBase+'"]'));
						} else {
							// 나머지 타입
							$('[name="'+questionNameBase+'_text"]').css('width',textWidth);
							$('[name="'+questionNameBase+'_text"]').attr('textwidth',textWidth);
							//console.log($('[name="'+questionNameBase+'_text"]'));
						}
					}
				}
			});
		}
		
		//$('#bt_next').on('click', function(){ serveyJs.clickBtNext(); });
	},
	delQuestion : function(projectId, questionId, questionName) {
		console.log('delQuestion projectId',projectId);
		console.log('delQuestion questionId',questionId);
		var result = confirm('삭제하시겠습니까?');
		if (result) {
			var urlVal = '/project/deleteQuestion';
			console.log("urlVal",urlVal);
			$.ajax({
			    url   		: urlVal,
			    type  		: "post",
			    dataType    : "json",
			    contentType : "application/json",
			    data  		: JSON.stringify( {projectId : projectId, questionId : questionId, questionName : questionName} ),
			    success     : function(responseData){
			    	console.log("questionListJs delQuestion",responseData);			    	
			    	if (null != responseData) {
			    		if (responseData.webDeleteSlQuestion && responseData.webDeleteSlExample) {
			    			alert('삭제 성공');
			    			location.href='/question/questionList?projectId='+projectId;
			    		} else if (responseData.webCheckSlBooster || responseData.webCheckSlBooster) {
			    			alert('먼저 쿼터 설정을 삭제해야 합니다.');
			    		} else if (responseData.webCheckSlrotMain || responseData.webCheckSlrotQuestion) {
			    			alert('먼저 로테이션 설정을 삭제해야 합니다.');
			    		} else if (responseData.webCheckSlCustomScript) {
			    			alert('먼저 사용자 스크립트 설정을 삭제해야 합니다.');
			    		}
			    	}
			    },
			    error : function(e){
			    	//console.log("error",e);
			    }
			});
		}
	},
	setSearchData : function () {
		var returnData = {
				searchType : 'projectNameInner',
				searchValue : $('[name="projectNameInner"').val(),
				projectState : $('[name="projectState"]').val()
    	};
		return returnData;
	},
	// 전체 문항 복사 조회
	allcopySearch : function(pageNo, searchState) {
		var urlVal = '/project/setProjectList';
		var searchData = questionListJs.setSearchData();
		var searchValue = searchData.searchValue;
		searchData.searchState = searchState;
		
		var pageRow = 10;
    	var pageSize = 5;
    	
		console.log("urlVal",urlVal);
		console.log("searchVO",searchData);

		// loading show
		$('#pop_allcopy #loading').css('display', '');
		$('#pop_allcopy #loading_img').css('display', '');
		
		$.ajax({
		    url   		: urlVal,
		    type  		: "post",
		    dataType    : "json",
		    contentType : "application/json",
		    data  		: JSON.stringify({ pageRow : pageRow, pageSize : pageSize, pageNo : pageNo
				//, searchType : searchData.searchType, searchValue : searchData.searchValue, searchState : searchState
				//, projectState : searchData.projectState
				,searchVO : searchData
				}),
		    success     : function(responseData){
		    	console.log("questionListJs allcopySearch",responseData);
		    	if (null != responseData) {
		    		questionListJs.listSlProject(responseData.listSlProject, responseData.listPmCode, responseData.listClientVendorGroup, responseData.paging, responseData.setCheckSearch);
		    		pagingJs.paging(responseData.paging, 0, "questionListJs.allcopySearch");			    	
		    	}
		    },
		    error : function(e){
		    	//console.log("error",e);
		    }
		});
	},
	// 전체 문항 복사 조회
	listSlProject : function (listSlProject, listPmCode, listcustomerCode, paging, setCheckSearch) {
		var setHtml = "";
		
		$.each(listSlProject, function(index, value){
			
			var slProject = value;
			var projectId = value.projectId;
			var pmCode = value.pmCode;
			var customerCode = value.customerCode;
			var projectState = value.projectState;
			var cpno = value.cpno;
			var useResearList = value.useResearList; 
			//console.log('listSlProject useResearList',useResearList);
			
			var setPmName = "";
			var setCustomerName = "";
			var setClassBtProjectState = "";
			var setValueProjectState = "";
			
			$.each(listPmCode, function(index, value){
				if (value.codeId == pmCode) {
					setPmName = value.codeValue;
				}
			});
			$.each(listcustomerCode, function(index, value){
				if (value.VENDORID == customerCode) {
					setCustomerName = value.VENDORNAME;
				}
			});
			
			var regDate = commonJs.regDateToYYYYMMDD(value.regDate,'.');
			
			setHtml = setHtml
			+'<tr>'
			+'	<td class="w">'+ value.rNum +'</td>'
			+'	<td class="aa"><a class="block" href="javascript:void(0);" onclick="questionListJs.allcopyExecution(\''+projectId+'\')">'+ value.projectNameInner +'</a></td>'			
			+'	<td data-cell-header="담당자">'+ setPmName +'</td>'
			+'	<td data-cell-header="고객사">'+ setCustomerName +'</td>'
			+'	<td data-cell-header="작성일">'+ regDate +'</td>'
			+'</tr>';
		});

    	// loading hide
    	$('#pop_allcopy #loading').css('display', 'none');
    	$('#pop_allcopy #loading_img').css('display', 'none');
    	
		$('#popProjectList').html(setHtml);
		$('#pop_projectList').css('display','');
	},
	// 전체 문항 복사 처리
	allcopyExecution : function(copyTagetProjectId) {
		console.log('allcopyExecution copyTagetProjectId',copyTagetProjectId);
		var projectId = $('#projectId').val();
		var result = confirm('해당 프로젝트의 전체 문항을 현재 프로젝트로 복사 하시겠습니까?');
		if (result) {			
			// loading show
			$('#pop_allcopy #loading').css('display', '');
			$('#pop_allcopy #loading_img').css('display', '');
			
			var urlVal = '/question/allcopyExecution';
			console.log("urlVal",urlVal);
			$.ajax({
			    url   		: urlVal,
			    type  		: "post",
			    dataType    : "json",
			    contentType : "application/json",
			    data  		: JSON.stringify( {projectId : projectId, copyTagetProjectId : copyTagetProjectId} ),
			    success     : function(responseData){
			    	console.log("questionListJs allcopyExecution", responseData);			    	
			    	if (null != responseData) {
			    		if (responseData.deleteSlCustomScript
			    				&& responseData.deleteSlExample
			    				&& responseData.deleteSlQuestion
			    				&& responseData.deleteSlQuestionFunction
			    				&& responseData.deleteSlQuestionLogic
			    				&& responseData.deleteSlQuestionViewPage
			    				&& responseData.insertCopySlCustomScript
			    				&& responseData.insertCopySlExample
			    				&& responseData.insertCopySlQuestion
			    				&& responseData.insertCopySlQuestionFunction
			    				&& responseData.insertCopySlQuestionLogic
			    				&& responseData.insertCopySlQuestionViewPage
			    			) {
			    			alert('문항 전체복사되었습니다.');
			    		} else {
			    			alert('오류 발생! 다시 시도하세요.');
			    		}
			    		// loading hide
			    		$('#pop_allcopy #loading').css('display', 'none');
				    	$('#pop_allcopy #loading_img').css('display', 'none');
				    	
			    		var con = $('.layout');
		    			con.hide();
		    			$('body').css('overflow','auto');
		    			location.href='/question/questionList?projectId='+projectId;
			    	}
			    },
			    error : function(e){
			    	//console.log("error",e);
			    }
			});
		}
	},
	// 선택문항복사
	partcopyList : function(projectId) {
		var urlVal = '/question/partcopyList';
	    	
		console.log("urlVal",urlVal);
		$.ajax({
		    url   		: urlVal,
		    type  		: "post",
		    dataType    : "json",
		    contentType : "application/json",
		    data  		: JSON.stringify({ projectId : projectId }),
		    success     : function(responseData){
		    	console.log("questionListJs partcopyList", responseData);
		    	if (null != responseData) {
		    		questionListJs.setPartcopyList(responseData.listSlQuestion);
		    		//pagingJs.paging(responseData.paging, 0, "projectListJs.setListProject");			    	
		    	}
		    },
		    error : function(e){
		    	//console.log("error",e);
		    }
		});
	},
	// 선택문항복사, 부분삭제 목록
	setPartcopyList : function (listSlQuestion) {
		var setHtml = "";
		var setSelectHtml = "";
		$.each(listSlQuestion, function(index, value){
			
			var projectId = value.projectId;
			var questionId = value.questionId;
			var questionName = value.questionName;
			var questionTitle = value.questionTitle;
			var checkIndex = index + 1;
			
			if(questionTitle.length > 50) {
				questionTitle = questionTitle.substring(0, 50) + ' ... ';
			}
			
			setHtml = setHtml
			+'<tr>'
			+'	<td width="6%" class="w"><input type="checkbox" name="copyCheck" id="'+ questionName +'" value="'+ questionName +'" questionId="'+ questionId +'" /></td>'
			+'	<td width="10%" data-cell-header="문항번호">'+ questionName +'</td>'
			+'	<td width="84%" data-cell-header="문항내용">'+ questionTitle +'</a></td>'
			+'</tr>';
			
			setSelectHtml += '<option value="'+ questionId +'" questionName="'+ questionName +'">'+ questionName +'</option> \n';
		});
		
		$('#popQuestionList').html(setHtml);
		$('#popselectList').html(setSelectHtml);
		$('#pop_questionList').css('display','');
	},
	// 선택 문항 복사 처리
	partcopyExecution : function(listSlQuestion, copyTagetQuestionId, copyTagetQuestionName) {
		console.log('partcopyExecution listSlQuestion',listSlQuestion);
		console.log('partcopyExecution copyTagetQuestionId',copyTagetQuestionId);
		console.log('partcopyExecution copyTagetQuestionName',copyTagetQuestionName);
		var projectId = $('#projectId').val();
		
		var result = confirm('선택한 문항을 ['+copyTagetQuestionName+'] 뒤에 복사 하시겠습니까?');
		if (result) {
			// loading show
			$('#pop_partcopy #loading').css('display', '');
			$('#pop_partcopy #loading_img').css('display', '');
			
			var urlVal = '/question/partcopyExecution';
			console.log("urlVal",urlVal);
			$.ajax({
			    url   		: urlVal,
			    type  		: "post",
			    dataType    : "json",
			    contentType : "application/json",
			    data  		: JSON.stringify( {projectId : projectId, listQuestionHtml : listSlQuestion, copyTagetQuestionId : copyTagetQuestionId} ),
			    success     : function(responseData){
			    	console.log("questionListJs partcopyExecution", responseData);
			    	
			    	if (null != responseData) {
			    		if (responseData.insertPartcopySlExample
			    				&& responseData.insertPartcopySlQuestion
			    				&& responseData.insertPartcopySlQuestionFunction
			    				&& responseData.insertPartcopySlQuestionLogic
			    				&& responseData.insertPartcopySlQuestionViewPage
			    			) {
			    			alert('복사되었습니다.');
			    		} else {
			    			alert('오류 발생! 다시 시도하세요.');
			    		}
			    		// loading hide
			    		$('#pop_partcopy #loading').css('display', 'none');
				    	$('#pop_partcopy #loading_img').css('display', 'none');
				    	
			    		var con = $('.layout');
		    			con.hide();
		    			$('body').css('overflow','auto');
		    			location.href='/question/questionList?projectId='+projectId;
			    	}
			    },
			    error : function(e){
			    	//console.log("error",e);
			    }
			});
		}
	},
	// 부분삭제 목록
	setPartdelList : function (listSlQuestion) {
		var setHtml = "";
		$.each(listSlQuestion, function(index, value){
			
			var projectId = value.projectId;
			var questionId = value.questionId;
			var questionName = value.questionName;
			var questionTitle = value.questionTitle;
			var checkIndex = index + 1;
			
			if(questionTitle.length > 50) {
				questionTitle = questionTitle.substring(0, 50) + ' ... ';
			}
			
			setHtml = setHtml
			+'<tr>'
			+'	<td width="6%" class="w"><input type="checkbox" name="delCheck" id="'+ questionName +'" value="'+ questionName +'" questionId="'+ questionId +'" /></td>'
			+'	<td width="10%" data-cell-header="문항번호">'+ questionName +'</td>'
			+'	<td width="84%" data-cell-header="문항내용">'+ questionTitle +'</a></td>'
			+'</tr>';
						
		});
		
		$('#partdel_QuestionList').html(setHtml);
		$('#partdel_questionList').css('display','');
	},
	// 부분 삭제 목록
	partdelList : function(projectId) {
		var urlVal = '/question/partcopyList';
	    	
		console.log("urlVal",urlVal);
		$.ajax({
		    url   		: urlVal,
		    type  		: "post",
		    dataType    : "json",
		    contentType : "application/json",
		    data  		: JSON.stringify({ projectId : projectId }),
		    success     : function(responseData){
		    	console.log("questionListJs partdelList", responseData);
		    	if (null != responseData) {
		    		questionListJs.setPartdelList(responseData.listSlQuestion);
		    		//pagingJs.paging(responseData.paging, 0, "projectListJs.setListProject");			    	
		    	}
		    },
		    error : function(e){
		    	//console.log("error",e);
		    }
		});
	},
	// 부분 삭제 처리
	partdelExecution : function(listSlQuestion) {
		console.log('partdelExecution listSlQuestion',listSlQuestion);
		var projectId = $('#projectId').val();
		
		var result = confirm('선택한 문항을 삭제 하시겠습니까?');
		if (result) {
			// loading show
			$('#pop_partdel #loading').css('display', '');
			$('#pop_partdel #loading_img').css('display', '');
			
			var urlVal = '/question/partdelExecution';
			console.log("urlVal",urlVal);
			$.ajax({
			    url   		: urlVal,
			    type  		: "post",
			    dataType    : "json",
			    contentType : "application/json",
			    data  		: JSON.stringify( {projectId : projectId, listQuestionHtml : listSlQuestion} ),
			    success     : function(responseData){
			    	console.log("questionListJs partdelExecution", responseData);
			    	
			    	if (null != responseData) {
			    		if (responseData.deletePartcopySlExample
			    				&& responseData.deletePartcopySlQuestion
			    				&& responseData.deletePartcopySlQuestionFunction
			    				&& responseData.deletePartcopySlQuestionLogic
			    				&& responseData.deletePartcopySlQuestionViewPage
			    				&& responseData.updatePartdelPageOrder
			    				&& responseData.deletePartcopySlQuestionViewPage
			    				&& responseData.updatePartdelQuestionOrder
			    			) {
			    			alert('삭제되었습니다.');
			    		} else {
			    			alert('오류 발생! 다시 시도하세요.');
			    		}
			    		// loading hide
			    		$('#pop_partdel #loading').css('display', 'none');
				    	$('#pop_partdel #loading_img').css('display', 'none');
				    	
			    		var con = $('.layout');
		    			con.hide();
		    			$('body').css('overflow','auto');
		    			location.href='/question/questionList?projectId='+projectId;
			    	}
			    	
			    },
			    error : function(e){
			    	// loading hide
			    	$('#pop_partdel #loading').css('display', 'none');
			    	$('#pop_partdel #loading_img').css('display', 'none');
			    	//console.log("error",e);
			    }
			});
			
		}
	},
	// 순서 변경 목록
	orderChangeList : function(projectId) {
		var urlVal = '/question/partcopyList';
	    	
		console.log("urlVal",urlVal);
		$.ajax({
		    url   		: urlVal,
		    type  		: "post",
		    dataType    : "json",
		    contentType : "application/json",
		    data  		: JSON.stringify({ projectId : projectId }),
		    success     : function(responseData){
		    	console.log("questionListJs orderChangeList", responseData);
		    	if (null != responseData) {
		    		questionListJs.setOrderChangeList(responseData.listSlQuestion);
		    		//pagingJs.paging(responseData.paging, 0, "projectListJs.setListProject");			    	
		    	}
		    },
		    error : function(e){
		    	//console.log("error",e);
		    }
		});
	},
	
	// 순서 변경 목록 html
	setOrderChangeList : function (listSlQuestion) {
		/*
		// selectbox 높이조절
		var questionLength = listSlQuestion.length;
		var selHeight = (20 * questionLength) + 10;
		var orderUp = '-370px';
		var orderDown = '-70px';
		
		orderUp = (-1 * selHeight) + 200 + 'px';
		orderDown = (-1 * selHeight) + 300 + 'px';
		
		$('#orderUp').css('top',orderUp);
		$('#orderDown').css('top',orderDown);
		$('#orderChange_questionList').css('height',selHeight +'px');
		
		console.log('orderUp',orderUp);
		console.log('orderDown',orderDown);
		console.log('selHeight',selHeight);
		*/
		var setHtml = "";
		$.each(listSlQuestion, function(index, value){
			
			var projectId = value.projectId;
			var questionId = value.questionId;
			var questionName = value.questionName;
			var questionTitle = value.questionTitle;
			var checkIndex = index + 1;
			
			if(questionTitle.length > 50) {
				questionTitle = questionTitle.substring(0, 50) + ' ... ';
			}
			setHtml = setHtml
			+'<option value="'+questionId+'">'+ questionName +'. '+ questionTitle +'</option>';
			
		});
		
		$('#orderChange_questionList').html(setHtml);
		$('#orderChange_questionList').css('display','');
	},
	// 순서 변경 처리
	orderChangeExecution : function(listSlQuestion) {
		console.log('orderChangeExecution listSlQuestion',listSlQuestion);
		var projectId = $('#projectId').val();
		
		var result = confirm('이대로 문항 순서를 변경 하시겠습니까?');
		if (result) {
			// loading show
			$('#pop_orderChange #loading').css('display', '');
			$('#pop_orderChange #loading_img').css('display', '');
			
			var urlVal = '/question/orderChangeExecution';
			console.log("urlVal",urlVal);
			$.ajax({
			    url   		: urlVal,
			    type  		: "post",
			    dataType    : "json",
			    contentType : "application/json",
			    data  		: JSON.stringify( {projectId : projectId, listQuestionHtml : listSlQuestion} ),
			    success     : function(responseData){
			    	console.log("questionListJs orderChangeExecution", responseData);
			    	
			    	if (null != responseData) {			    		
			    		if (responseData.updatePageOrder
			    				&& responseData.updatelQuestionOrder
			    			) {
			    			alert('변경되었습니다.');
			    		} else {
			    			alert('오류 발생! 다시 시도하세요.');
			    		}
			    		// loading hide
			    		$('#pop_orderChange #loading').css('display', 'none');
				    	$('#pop_orderChange #loading_img').css('display', 'none');
				    	
			    		var con = $('.layout');
		    			con.hide();
		    			$('body').css('overflow','auto');
		    			location.href='/question/questionList?projectId='+projectId;		    			
			    	}
			    	
			    },
			    error : function(e){
			    	// loading hide
			    	$('#pop_orderChange #loading').css('display', 'none');
			    	$('#pop_orderChange #loading_img').css('display', 'none');
			    	//console.log("error",e);
			    }
			});
			
		}
	},
}

$(function(){
	questionListJs.init();
});