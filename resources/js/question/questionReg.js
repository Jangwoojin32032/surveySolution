/*
var searchProjectId = 0;
var searchProjectState = 0;
var dataProjectState = 0;
var useResearList = 0;
var loading = "";
*/
var loading = "";
var setResponseData = null;
var oEditors = [];	// 스마트 에디터 전역변수

var questionRegJs = {
		
	init : function(){
		loading = $('<div id="loading" class="loading"></div><img id="loading_img" alt="loading" src="/resources/img/loading2.gif" />').appendTo(document.body).hide();
		
		var gubun = $('[name="gubun"]').val();			
		console.log('gubun',gubun);
		
		if(gubun == 'update') {
			$('#updateFooter').css('display','');			
			questionRegJs.getQuestionUpdate();
		} else {
			$('#regFooter').css('display','');
			questionRegJs.setQuestionInsert();
		}
		questionRegJs.setEvent();
	},
	setEvent : function () {
		var projectId = $('[name="projectId"]').val();
		var questionId = $('[name="questionId"').val();
		var queType = $('[name="queType"]').val();
		// 뒤로가기
		$('[name="bt_cancel"]').on('click',function(){ location.href='/question/questionList?projectId='+projectId; });
		// 등록
		$('[name="bt_insert"]').on('click',function(){ questionRegJs.insertQuestion(); });
		// 계속 등록
		$('[name="bt_continue"]').on('click',function(){ questionRegJs.insertQuestion('continue'); });		
		// 수정
		$('[name="bt_update"]').on('click',function(){ questionRegJs.updateQuestion(); });		
		// 등록 > 질문유형에 따른 입력 폼 수정
		$('[name="questionType"]').on('click',function(){
			// 질문유형에 따른 입력 폼 초기화 및 수정
			var questionType = $(this).prop("id");
			console.log('click questionType',questionType);
			
			$('[name="questionName"]').val('');	// 문항 번호	
			/*
			$('.contents').each(function(index,value){	// (지문,문항,하단내용)스마트에디터 설정
				var seId = "smartEditor" + (index+1);
			    nhn.husky.EZCreator.createInIFrame({
			        oAppRef: oEditors,
			        elPlaceHolder: seId,
			        sSkinURI: "/resources/editor/SmartEditor2Skin.html",
			        htParams : {
			            bUseToolbar : true,
			            bUseVerticalResizer : false,
			            bUseModeChanger : true,
			        }
			    });
			});
			*/
			//$('#infoSEUl').css('display','none');	// 안내 내용	
			$('#example').val('');		// 보기 textarea
			$('.exampleInput').val('');	// 보기 input창
			$('#exampleAtt').val('');		// 속성 textarea
			$('.exampleAttInput').val('');	// 속성 input창
			$('[name="minOrd"]').val('');	// 최소순위입력
			$('[name="maxOrd"]').val('');	// 최대순위입력
			$('[name="exampleAlign"] option:eq(0)').prop("selected", true);	// 보기방향
			$('[name="exampleAlignCnt"]').val('');	// 보기열수
			$('[name="exampleView"] option:eq(0)').prop("selected", true);	// 보기뷰
			$('[name="previousResponse"]').val('');	// 이전응답내용
			$('[name="responseLimit"]').val('');	// 응답제한시간
			$('[name="questionView"]').val('');	// 문항뷰
			$('[name="mediaurl"]').val('');			// 동영상 url
			$('[name="mediatimer"]').val('');			// 동영상 timer
			
			// 보이기, 숨김
			if(questionType == 'sin' || questionType == 'mul') {
				// 단일, 중복형
				$('#exampleButton').prop('name','reg');
				$('#exampleButton').html('보기 등록');
				
				$('#exampleUl').css('display','');				// 보기
				$('#exampleTextarea').css('display','');		// 보기등록 textarea
				$('#exampleButton').css('display','');		// 보기수정버튼
				$('#exampleAlignUl').css('display','');			// 보기방향
				$('#exampleViewUl').css('display','');			// 보기뷰
				$('#previousResponseUl').css('display','');		// 이전응답내용
				
				$('#infoSEUl').css('display','none');			// 안내 내용
				$('#exampleInput').css('display','none');	// 보기등록 input 숨기기 
				$('#customExampleUl').css('display','none');			// 사용자정의 보기
				$('#exampleAttUl').css('display','none');		// 속성
				$('#minOrdUl').css('display','none');			// 최소순위
				$('#maxOrdUl').css('display','none');			// 최대순위
				$('#exampleAlignCnt').css('display','none');	// 보기열수
				$('#exampleViewOptionUl').css('display','none');// 보기뷰옵션
				$('#attExampleOption').css('display','none');		// 속성문항옵션
				$('#attResponseOption').css('display','none');		// 속성응답옵션
				$('#mediaurl').css('display','none');			// 동영상 url
				$('#mediatimer').css('display','none');				// 동영상 timer
			} else if(questionType == 'ord') {
				// 순위형
				$('#exampleButton').prop('name','reg');
				$('#exampleButton').html('보기 등록');
				
				$('#exampleUl').css('display','');				// 보기
				$('#exampleTextarea').css('display','');		// 보기등록 textarea
				$('#exampleButton').css('display','');		// 보기수정버튼
				$('#minOrdUl').css('display','');			// 최소순위
				$('#maxOrdUl').css('display','');			// 최대순위
				$('#exampleAlignUl').css('display','');			// 보기방향
				$('#exampleViewUl').css('display','');			// 보기뷰
				$('#previousResponseUl').css('display','');		// 이전응답내용
				
				$('#infoSEUl').css('display','none');			// 안내 내용
				$('#exampleInput').css('display','none');	// 보기등록 input 숨기기 
				$('#customExampleUl').css('display','none');			// 사용자정의 보기
				$('#exampleAttUl').css('display','none');		// 속성
				$('#exampleAlignCnt').css('display','none');	// 보기열수
				$('#exampleViewOptionUl').css('display','none');// 보기뷰옵션
				$('#attExampleOption').css('display','none');		// 속성문항옵션
				$('#attResponseOption').css('display','none');		// 속성응답옵션
				$('#mediaurl').css('display','none');			// 동영상 url
				$('#mediatimer').css('display','none');				// 동영상 timer
			} else if(questionType == 'sca') {
				// 척도형
				$('#exampleButton').prop('name','regSca');
				$('#exampleButton').html('보기 등록');
				
				$('#exampleUl').css('display','');				// 보기
				$('#exampleTextarea').css('display','');		// 보기등록 textarea
				$('#exampleButton').css('display','');		// 보기수정버튼
				$('#previousResponseUl').css('display','');		// 이전응답내용
				
				// 숨김
				$('#infoSEUl').css('display','none');			// 안내 내용
				$('#exampleInput').css('display','none');		// 보기등록 input 숨기기
				$('#customExampleUl').css('display','none');			// 사용자정의 보기
				$('#exampleAttUl').css('display','none');		// 속성			
				$('#minOrdUl').css('display','none');			// 최소순위
				$('#maxOrdUl').css('display','none');			// 최대순위
				$('#exampleAlignUl').css('display','none');		// 보기방향
				$('#exampleAlignCnt').css('display','none');	// 보기열수
				$('#exampleViewUl').css('display','none');		// 보기 뷰
				$('#exampleViewOptionUl').css('display','none');	// 보기뷰옵션
				$('#attExampleOption').css('display','none');		// 속성문항옵션
				$('#attResponseOption').css('display','none');		// 속성응답옵션
				$('#mediaurl').css('display','none');			// 동영상 url
				$('#mediatimer').css('display','none');				// 동영상 timer
			} else if(questionType == 'num') {
				// 숫자형
				$('#exampleInput').html('');
				var exampleHtml = '';
				
				exampleHtml += '앞 : <input type="text" class="numHeaderInput" id="numHeaderInput" style="width: 200px; margin-bottom: 10px;" value=""> '
							+ '	텍스트 크기 : '
							+ ' <input type="text" name="textWidth" style="width: 80px;"> px'
							+ ' <br>'
							/*
							+ ' <input type="checkbox" class="numLimitCheck" name="numLimitCheck">범위입력'
							+ ' <input type="text" class="numLimit" name="numLimit" style="width: 80px; display: none;" placeholder="최소|최대">'
							*/
							+ '뒤 : <input type="text" class="numFooterInput" id="numFooterInput" style="width: 200px; margin-bottom: 10px;" value=""> ';
							/*
							+ '	텍스트 크기 : '
							+ ' <input type="text" name="textWidthFooter" style="width: 80px;"> px';
							 */
				// 보기등록 input 보이기
				$('#exampleInput').html(exampleHtml);				
				
				// 보기 등록/수정 버튼 설정
				$('#exampleUl').css('display','');				// 보기
				$('#exampleInput').css('display','');			// 보기옵션 숨기기
				$('#previousResponseUl').css('display','');		// 이전응답내용
				
				// 숨김
				$('#infoSEUl').css('display','none');			// 안내 내용
				$('#exampleTextarea').css('display','none');	// 보기등록 textarea 숨기기 
				$('#exampleButton').css('display','none');		// 보기수정버튼
				$('#customExampleUl').css('display','none');	// 사용자정의 보기
				$('#exampleAttUl').css('display','none');		// 속성	
				$('#minOrdUl').css('display','none');			// 최소순위
				$('#maxOrdUl').css('display','none');			// 최대순위
				$('#exampleAlignUl').css('display','none');		// 보기방향
				$('#exampleAlignCnt').css('display','none');	// 보기열수
				$('#exampleViewUl').css('display','none');		// 보기 뷰
				$('#exampleViewOptionUl').css('display','none');	// 보기뷰옵션
				$('#attExampleOption').css('display','none');		// 속성문항옵션
				$('#attResponseOption').css('display','none');		// 속성응답옵션
				$('#mediaurl').css('display','none');			// 동영상 url
				$('#mediatimer').css('display','none');				// 동영상 timer
			} else if(questionType == 'tex' || questionType == 'textarea') {
				// 오픈형, 오픈문장형
				// 보기 옵션
				$('#exampleInput').html('');
				var exampleHtml = '';
				if(questionType == 'tex') {					
					exampleHtml += ' <input type="checkbox" name="onlykorean" value="onlykorean">한글'
								+ ' <input type="checkbox" name="onlyenglish" value="onlyenglish">영문'
								+ ' <input type="checkbox" name="onlynumber" value="onlynumber">숫자'
								+ ' <input type="checkbox" name="onlymoney" value="onlymoney">금액'
								+ ' <input type="checkbox" name="onlyphone" value="onlyphone">전화번호'					
								+ ' <input type="checkbox" name="onlyemail" value="onlyemail">이메일'
								+ ' <input type="checkbox" name="onlytext" value="onlytext">특수문자포함'
								+ ' 텍스트 크기 : <input type="text" name="textWidth" style="width: 80px;"> px'								 
								+ ' <br><br>';
			
				} else if(questionType == 'textarea') {					
					exampleHtml += ' <input type="checkbox" name="onlykorean" value="onlykorean">한글'
								+ ' <input type="checkbox" name="onlyenglish" value="onlyenglish">영문'
								+ ' <input type="checkbox" name="onlynumber" value="onlynumber">숫자'
								+ ' <input type="checkbox" name="onlytext" value="onlytext">특수문자포함';					
				}
				$('#exampleInput').html(exampleHtml);
					
				if(questionType == 'tex') {
					// 보기 등록/수정 버튼 설정
					$('#exampleUl').css('display','');			// 보기
					$('#exampleTextarea').css('display','');	// 보기등록 textarea 보이기
					$('#exampleInput').css('display','none');	// 보기옵션 숨기기
					$('#exampleButton').prop('name','regTex');
					$('#exampleButton').css('display','');		// 보기수정버튼
					$('#exampleButton').html('보기 등록');
					$('#customExampleUl').css('display','');	// 사용자정의 보기
				} else if(questionType == 'textarea') {
					// 보기등록 input 보이기
					$('#exampleUl').css('display','');			// 보기
					$('#exampleTextarea').css('display','none');	// 보기등록 textarea 숨기기
					$('#exampleInput').css('display','');			// 보기옵션 보이기
					$('#exampleButton').css('display','none');		// 보기수정버튼
					$('#customExampleUl').css('display','none');	// 사용자정의 보기
				}
				// 숨김
				$('#infoSEUl').css('display','none');			// 안내 내용
				$('#exampleAttUl').css('display','none');		// 속성
				$('#minOrdUl').css('display','none');			// 최소순위
				$('#maxOrdUl').css('display','none');			// 최대순위
				$('#exampleAlignUl').css('display','none');		// 보기방향
				$('#exampleAlignCnt').css('display','none');	// 보기열수
				$('#exampleViewUl').css('display','none');		// 보기 뷰
				$('#exampleViewOptionUl').css('display','none');	// 보기뷰옵션
				$('#attExampleOption').css('display','none');		// 속성문항옵션
				$('#attResponseOption').css('display','none');		// 속성응답옵션
				$('#mediaurl').css('display','none');			// 동영상 url
				$('#mediatimer').css('display','none');				// 동영상 timer
			} else if(questionType == 'att') {
				// 속성 문항/응답 옵션				
				$('#exampleUl').css('display','');			// 보기
				$('#exampleTextarea').css('display','');	// 보기등록 textarea 보이기
				$('#exampleButton').prop('name','regExample');
				$('#exampleButton').css('display','');		// 보기수정버튼
				$('#exampleButton').html('보기 등록');				
				$('#exampleAttUl').css('display','');		// 속성
				$('#exampleAttTextarea').css('display','');	// 속성등록 textarea 보이기
				$('#exampleAttButton').prop('name','regAtt');
				$('#exampleAttButton').html('속성 등록');
				$('#attExampleOption').css('display','');		// 속성문항옵션
				$('#attResponseOption').css('display','');		// 속성응답옵션
				
				$('#infoSEUl').css('display','none');			// 안내 내용
				$('#exampleInput').css('display','none');	// 보기옵션 숨기기
				$('#customExampleUl').css('display','none');	// 사용자정의 보기
				$('#exampleAttInput').css('display','none');	// 속성옵션 숨기기
				$('#minOrdUl').css('display','none');			// 최소순위
				$('#maxOrdUl').css('display','none');			// 최대순위
				$('#exampleAlignUl').css('display','none');		// 보기방향
				$('#exampleAlignCnt').css('display','none');	// 보기열수
				$('#exampleViewUl').css('display','none');		// 보기 뷰
				$('#exampleViewOptionUl').css('display','none');	// 보기뷰옵션
				$('#mediaurl').css('display','none');			// 동영상 url
				$('#mediatimer').css('display','none');				// 동영상 timer
			} else if(questionType == 'info') {
				$('#infoSEUl').css('display','');
				$('#infoSELi').html('<textarea class="contents" id="smartEditor4" name="smartEditor4" style="width: 100%;"></textarea>');
				
				nhn.husky.EZCreator.createInIFrame({
			        oAppRef: oEditors,
			        elPlaceHolder: 'smartEditor4',
			        sSkinURI: "/resources/editor/SmartEditor2Skin.html",
			        htParams : {
			            bUseToolbar : true,            
			            bUseVerticalResizer : false,
			            bUseModeChanger : true,
			        },
			    });				
				
				$('#exampleUl').css('display','none');			// 보기
				$('#exampleAttUl').css('display','none');		// 속성				
				$('#exampleInput').css('display','none');		// 보기옵션 숨기기
				$('#customExampleUl').css('display','none');	// 사용자정의 보기
				$('#exampleAttInput').css('display','none');	// 속성옵션 숨기기
				$('#minOrdUl').css('display','none');			// 최소순위
				$('#maxOrdUl').css('display','none');			// 최대순위
				$('#exampleAlignUl').css('display','none');		// 보기방향
				$('#exampleAlignCnt').css('display','none');	// 보기열수
				$('#exampleViewUl').css('display','none');		// 보기 뷰
				$('#exampleViewOptionUl').css('display','none');// 보기뷰옵션
				$('#attExampleOption').css('display','none');	// 속성문항옵션
				$('#attResponseOption').css('display','none');	// 속성응답옵션
				$('#mediaurl').css('display','none');			// 동영상 url
				$('#mediatimer').css('display','none');				// 동영상 timer
			} else if(questionType == 'media') {
				$('#mediaurl').css('display','');				// 동영상 url
				$('#mediatimer').css('display','');					// 동영상 timer

				$('#infoSEUl').css('display','none');			// 안내 내용
				$('#exampleUl').css('display','none');			// 보기
				$('#customExampleUl').css('display','none');	// 사용자정의 보기
				$('#exampleAttUl').css('display','none');		// 속성				
				$('#exampleInput').css('display','none');		// 보기옵션 숨기기
				$('#exampleAttInput').css('display','none');	// 속성옵션 숨기기
				$('#minOrdUl').css('display','none');			// 최소순위
				$('#maxOrdUl').css('display','none');			// 최대순위
				$('#exampleAlignUl').css('display','none');		// 보기방향
				$('#exampleAlignCnt').css('display','none');	// 보기열수
				$('#exampleViewUl').css('display','none');		// 보기 뷰
				$('#exampleViewOptionUl').css('display','none');// 보기뷰옵션
				$('#attExampleOption').css('display','none');	// 속성문항옵션
				$('#attResponseOption').css('display','none');	// 속성응답옵션
				$('#previousResponseUl').css('display','none');	// 이전응답내용
				$('#responseLimitUl').css('display','none');	// 응답제한시간
			}
			// 보기의 버튼 이벤트(보기 등록/수정은 상단)
			questionRegJs.exampleBtnEvent();
		});
		
		// 보기 등록/수정 이벤트
		$('#exampleButton').on('click',function(){
			
			var exampleName = $(this).prop("name");
			//console.log('exampleName',exampleName);
			
			if(exampleName == 'reg') {
				// 등록 (단일,중복,숫자)
				$('#exampleButton').prop('name','update');
				$('#exampleButton').html('보기 수정');
				// textarea > input
				questionRegJs.exampleInput('update');
			} else if(exampleName == 'regTex') {
				// 등록(오픈)
				$('#exampleButton').prop('name','updateTex');
				$('#exampleButton').html('보기 수정');
				// textarea > input
				questionRegJs.exampleInput('updateTex');
			} else if(exampleName == 'regSca') {
				// 등록(속성)
				$('#exampleButton').prop('name','updateSca');
				$('#exampleButton').html('보기 수정');
				// textarea > input
				questionRegJs.exampleInput('updateSca');
			} else if(exampleName == 'regExample') {
				// 등록(속성)
				$('#exampleButton').prop('name','updateExample');
				$('#exampleButton').html('보기 수정');
				// textarea > input
				questionRegJs.exampleInput('updateExample');
			} else if(exampleName == 'update') {
				// 수정(단일,중복) 
				$('#exampleButton').prop('name','reg');
				$('#exampleButton').html('보기 등록');
				// input > textarea 
				questionRegJs.exampleTextarea('update');
			} else if(exampleName == 'updateSca') {
				// 수정(척도)
				$('#exampleButton').prop('name','regSca');
				$('#exampleButton').html('보기 등록');
				// input > textarea 
				questionRegJs.exampleTextarea('updateSca');
			} else if(exampleName == 'updateNum') {
				// 수정(숫자)
				$('#exampleButton').prop('name','reg');
				$('#exampleButton').html('보기 등록');
				// input > textarea 
				questionRegJs.exampleTextarea('updateNum');
			} else if(exampleName == 'updateTex') {
				// 수정(오픈)
				$('#exampleButton').prop('name','regTex');
				$('#exampleButton').html('보기 등록');
				// input > textarea 
				questionRegJs.exampleTextarea('updateTex');
			} else if(exampleName == 'updateExample') {
				// 수정(속성)
				$('#exampleButton').prop('name','regExample');
				$('#exampleButton').html('보기 등록');
				// input > textarea 
				questionRegJs.exampleTextarea('updateExample');
			}
		});
		
		// 사용자정의 보기
		$('#customExampleSelect').on('change',function(){
			var customExampleSelect = $('#customExampleSelect option:selected').val();
			console.log('customExampleSelect',customExampleSelect);
			if(customExampleSelect != 0) {
				// 사용자정의 보기 보이기
				var customExampleHtml = '';
				/*var customExampleText = ''
									+	'<input type="checkbox" name="customOnlykorean" value="onlykorean">한글 '
									+	'<input type="checkbox" name="customOnlyenglish" value="onlyenglish">영문 '
									+	'<input type="checkbox" name="customOnlynumber" value="onlynumber">숫자 '
									+	'<input type="checkbox" name="customOnlymoney" value="onlymoney">금액 '
									+	'<input type="checkbox" id="customOnlyphone" name="customOnlyphone" value="onlyphone">전화번호 '
									+	'<input type="checkbox" id="customOnlyemail" name="customOnlyemail" value="onlyemail">이메일 '
									+	'<input type="checkbox" name="customOnlytext" value="onlytext">특수문자포함 '
									+	'텍스트 크기: <input type="text" name="customTextWidth" style="width: 80px;"> px'
									+	'<br>';*/
									
				for(var i=1; i<=customExampleSelect; i++){
					customExampleHtml += '<input type="text" class="customText" id="customText_'+i+'" name="customText_'+i+'" style="width:150px;" placeholder="설명 '+i+'"> ';
					customExampleHtml += '<input type="text" class="customExample" name="customExample_'+i+'" value="오픈 응답 '+i+'" style="width:100px; text-align:center; background:#f0f0f0;" readonly> ';
					if(customExampleSelect == i) {
						customExampleHtml += '<input type="text" class="customText" id="customText_'+(i+1)+'" name="customText_'+(i+1)+'" style="width:150px;" placeholder="설명 '+(i+1)+'"> ';
					}
					//console.log('index',i);
				}
				//$('#customExampleText').html(customExampleText);
				$('#customExampleView').html(customExampleHtml);				
				$('#customExampleText').css('display','');
				//$('#customExampleView').css('display','');
			} else {
				// 사용자정의 보기 숨기기
				//$('#customExampleText').html('');
				$('#customExampleView').html('');
				$('#customExampleText').css('display','none');
				//$('#customExampleView').css('display','none');
			}		
		});
		
		// 사용자정의 보기 입력제어(전화번호)
		$('#customOnlyphone, #customOnlyemail').on('click',function(){
			console.log('customOnlyphone click');
			var customOnlyphone = $('#customOnlyphone').is(':checked');
			var customOnlyemail = $('#customOnlyemail').is(':checked');
			var customExampleHtml = '';
			// 체크 시
			if(customOnlyphone || customOnlyemail) {
				// 응답 값 하나로 변경
				$('#customExampleSelect option:eq(1)').prop('selected','selected');				
				//customExampleHtml += '<input type="text" class="customText" name="customText_1" style="width:150px;" placeholder="설명 1"> ';
				if(customOnlyphone) {
					customExampleHtml += '<input type="text" class="customExample" name="customExample_1" value="전화번호 입력" style="width:150px; text-align:center; background:#f0f0f0;" readonly> ';
				} else if(customOnlyemail) {
					customExampleHtml += '<input type="text" class="customExample" name="customExample_1" value="이메일 입력" style="width:150px; text-align:center; background:#f0f0f0;" readonly> ';
				}
				//customExampleHtml += '<input type="text" class="customText" name="customText_2" style="width:150px;" placeholder="설명 2"> ';
				//$('.customText').css('display','none');
				//$('.customExample').prop('placeholder','전화번호 입력');
			} else {
				customExampleHtml += '<input type="text" class="customText" id="customText_1" name="customText_1" style="width:150px;" placeholder="설명 1"> ';
				customExampleHtml += '<input type="text" class="customExample" name="customExample_1" value="오픈 응답 1" style="width:100px; text-align:center; background:#f0f0f0;" readonly> ';
				customExampleHtml += '<input type="text" class="customText" id="customText_2" name="customText_2" style="width:150px;" placeholder="설명 2"> ';
			}
			$('#customExampleView').html(customExampleHtml);						
		});
		
		// 속성 등록/수정 이벤트
		$('#exampleAttButton').on('click',function(){
			
			var exampleAttName = $(this).prop("name");
			//console.log('exampleAttName',exampleAttName);
			
			if(exampleAttName == 'regAtt') {
				// 등록
				$('#exampleAttButton').prop('name','updateAtt');
				$('#exampleAttButton').html('속성 수정');
				// textarea > input
				questionRegJs.exampleAttInput('updateAtt');
			} else if(exampleAttName == 'updateAtt') {
				// 숫자형 수정
				$('#exampleAttButton').prop('name','regAtt');
				$('#exampleAttButton').html('속성 등록');
				// input > textarea 
				questionRegJs.exampleAttTextarea('updateAtt');
			}
		});
		
		// 보기 방향 이벤트
		$('#exampleAlign').on('change',function(){
			var exampleAlign = $('#exampleAlign option:selected').val();
			//console.log('exampleAlign',exampleAlign);
			if(exampleAlign == 1 || exampleAlign == '선택하세요') {
				// 보기방향 세로
				$('#exampleAlignCnt').css('display','none');
			} else {
				// 보기방향 가로
				$('#exampleAlignCnt').css('display','');
			}
		});
		
		// 보기 뷰 이벤트
		$('#exampleView').on('change',function(){
			var exampleView = $('#exampleView option:selected').val();
			console.log('exampleView',exampleView);
			if(exampleView != 0) {
				// 보기선택 > 보기뷰옵션 보이기
				$('#exampleViewOptionUl').css('display','');
			} else {
				// 보기선택X > 보기뷰옵션 숨기기
				$('#exampleViewOptionUl').css('display','none');
			}		
		});
	},
	setQuestionInsert : function(queType) {
		loading.show();
		var projectId = $('[name="projectId"]').val();
		var questionId = $('[name="questionId"').val();
		
		// 질문유형  > 단일형
		$('#sin').prop('checked',true);
		
		// (지문,문항,하단내용)스마트에디터 설정
		$('.contents').each(function(index,value){
			var seId = "smartEditor" + (index+1);
			//console.log('seId',seId);
			/*
			console.log('questionHeader',questionHeader);
			console.log('questionFooter',questionFooter);
			console.log(seId == 'smartEditor1' && questionHeader != null);
			console.log(seId == 'smartEditor3' && questionFooter != null);
			*/
			if(index != 3) {
			    nhn.husky.EZCreator.createInIFrame({
			        oAppRef: oEditors,
			        elPlaceHolder: seId,
			        sSkinURI: "/resources/editor/SmartEditor2Skin.html",
			        htParams : {
			            bUseToolbar : true,            
			            bUseVerticalResizer : false,
			            bUseModeChanger : true,
			        }
			    });
			}
		});
		
		// 숨김
		$('#infoSEUl').css('display','none');				// 안내 내용
		$('#minOrdUl').css('display','none');				// 최소순위
		$('#maxOrdUl').css('display','none');				// 최대순위
		$('#customExampleUl').css('display','none');		// 사용자정의 보기
		$('#exampleAttUl').css('display','none');			// 속성			
		$('#exampleAlignCnt').css('display','none');		// 보기열수
		$('#exampleViewOptionUl').css('display','none');	// 보기뷰옵션
		$('#mediaurl').css('display','none');				// 동영상 url
		$('#mediatimer').css('display','none');					// 동영상 timer
		
		loading.hide();		
	},
	getQuestionUpdate : function() {
		loading.show();
		var projectId = $('[name="projectId"]').val();
		var questionId = $('[name="questionId"').val();
		var urlVal = '/question/getQuestionUpdate';
		console.log("projectId",projectId);
		console.log("urlVal",urlVal);
		$.ajax({
		    url   		: urlVal,
		    type  		: "post",
		    dataType    : "json",
		    contentType : "application/json",
		    data  		: JSON.stringify( {projectId:projectId, questionId:questionId} ),				
		    success     : function(responseData){
		    	console.log("getQuestionUpdate",responseData);
		    	//setResponseData = responseData;
		    	if (null != responseData) {
		    		questionRegJs.setQuestionUpdate(responseData);
		    	}
		    	loading.hide();
		    },
		    error : function(e){
		    	//console.log("error",e);
		    	loading.hide();
		    }		    
		});		
	},
	setQuestionUpdate : function(responseData) {
		var listSlExample = responseData.listSlExample;
		var listSlQuestionFunction = responseData.listSlQuestionFunction;
		var listSlQuestionLogic = responseData.listSlQuestionLogic;
		var listSlQuestionViewPage = responseData.listSlQuestionViewPage;
		var listSlQuestion = responseData.listSlQuestion;
		var selectSlQuestion = responseData.selectSlQuestion;
		
		var questionType = selectSlQuestion.questionType;
		var questionHeader = selectSlQuestion.questionHeader;
		var questionTitle = selectSlQuestion.questionTitle;
		var questionFooter = selectSlQuestion.questionFooter;		
		var questionName = selectSlQuestion.questionName;
		
		var setEnter = ' \n';
		
		// 질문유형 설정
		$('#'+questionType).prop('checked', true);
		$('[name="questionType"]').prop('disabled', true);
		
		// 문항번호 설정
		$('#questionName').val(questionName);
		
		// (지문,문항,하단내용)스마트에디터 설정
		$('.contents').each(function(index,value){
			var seId = "smartEditor" + (index+1);
			//console.log('seId',seId);
			var exampleText = '';
			if(questionType == 'info') {
				exampleText = listSlExample[0].exampleText;
			}
			/*
			console.log('questionHeader',questionHeader);
			console.log('questionFooter',questionFooter);
			console.log(seId == 'smartEditor1' && questionHeader != null);
			console.log(seId == 'smartEditor3' && questionFooter != null);
			*/
		    nhn.husky.EZCreator.createInIFrame({
		        oAppRef: oEditors,
		        elPlaceHolder: seId,
		        sSkinURI: "/resources/editor/SmartEditor2Skin.html",
		        htParams : {
		            bUseToolbar : true,            
		            bUseVerticalResizer : false,
		            bUseModeChanger : true,
		        },
	        	fOnAppLoad : function() {
	        		//기존 저장된 내용의 text 내용을 에디터상에 뿌려주고자 할때 사용
	        		if(seId == 'smartEditor1' && questionHeader != null) {	        		
	        			oEditors.getById["smartEditor1"].exec("PASTE_HTML", [questionHeader]);
	        		} else if(seId == 'smartEditor2') {	        		
	        			oEditors.getById["smartEditor2"].exec("PASTE_HTML", [questionTitle]);
	        		} else if(seId == 'smartEditor3' && questionFooter != null) {	        		
	        			oEditors.getById["smartEditor3"].exec("PASTE_HTML", [questionFooter]);
	        		} else if(seId == 'smartEditor4' && questionType == 'info' && exampleText != null) {
	        			oEditors.getById["smartEditor4"].exec("PASTE_HTML", [exampleText]);
	        		}
		    	},
		    });
		});
		
		// 보기 설정
		console.log('questionType',questionType);
		var exampleHtml = '';
		var customExampleHtml = '';
		if(questionType == 'sin' || questionType == 'mul' || questionType == 'ord') {
			// 단일, 중복, 순위
			
			// 보기옵션
			var listSlExampleLength = listSlExample.length;
			var etcCnt = -1;
			var notExistCnt = -1;
			var onlykorean = '';
			var onlyenglish = '';
			var onlynumber = '';
			var onlyemail = '';
			var onlytext = '';
			var etcNotExist = '';
			$.each(listSlQuestionFunction, function(index, value) {
				//console.log('value.functionText',value.functionText);
				if(value.functionText.indexOf("ETC:") != -1){
					var etcArray = value.functionText.split(":");
					etcCnt = etcArray[1]; 
				} else if(value.functionText.indexOf("ETC") != -1){		
					etcCnt = listSlExampleLength; 
				} else if(value.functionText.indexOf("notExist:") != -1){
					var notArray = value.functionText.split(":");
					notExistCnt = notArray[1];
				} else if(value.functionText == "onlykorean"){
					onlykorean = 'onlykorean';
				} else if(value.functionText == "onlyenglish"){
					onlyenglish = 'onlyenglish';
				} else if(value.functionText == "onlynumber"){
					onlynumber = 'onlynumber';
				} else if(value.functionText == "onlyemail"){
					onlyemail = 'onlyemail';
				} else if(value.functionText == "onlytext"){
					onlytext = 'onlytext';
				} else if(value.functionText == "989"){
					etcNotExist = 'etcNotExist';
				} 
			});
			//console.log('etcCnt',etcCnt);
			//console.log('listSlExample.length-1',listSlExample.length-1);
			//console.log('notExistCnt',notExistCnt);
			var listQuestionLogic = new Array();
			// 다음 이동
			$.each(listSlQuestionLogic, function(index, value) {
				var setObject = new Object();
				setObject.logicType = value.logicType;
				setObject.exampleNameBase = value.exampleNameBase;
				setObject.exampleValueBase = value.exampleValueBase;
				setObject.questionNameTarget = value.questionNameTarget;	
				listQuestionLogic[value.exampleNameBase] = setObject;
				//console.log('listQuestionLogic[index]',listQuestionLogic[index]);
			});
			console.log('listQuestionLogic',listQuestionLogic);
			//console.log('listQuestionLogic[0].exampleNameBase',listQuestionLogic[0].exampleNameBase);
			$.each(listSlExample, function(index, value) {
				// 보기
				//console.log('value.exampleLogicText',value.exampleLogicText);
				//console.log('value.exampleLogicText != null',value.exampleLogicText != null);
				//console.log("value.exampleLogicText != ''",value.exampleLogicText != '');
				if(value.exampleLogicText != null && value.exampleLogicText != '' && value.exampleLogicText){
					exampleHtml += '<input type="text" class="exampleInput" id="exampleInput'+(index+1)+'" style="width: 400px; margin-bottom: 10px;" value="'+value.exampleText+value.exampleLogicText+'"> ';
				} else {
					exampleHtml += '<input type="text" class="exampleInput" id="exampleInput'+(index+1)+'" style="width: 400px; margin-bottom: 10px;" value="'+value.exampleText+'"> ';
				}
				// 기타
				if(etcCnt == index+1) {
					exampleHtml += ' <input type="checkbox" class="etc" name="etc'+(index+1)+'" checked>기타';
				} else {
					exampleHtml += ' <input type="checkbox" class="etc" name="etc'+(index+1)+'">기타';
				}
				// 이중에 없음
				if(notExistCnt == index+1) {
					exampleHtml += ' <input type="checkbox" name="notExist'+(index+1)+'" checked>이중에 없음';
				} else {
					exampleHtml += ' <input type="checkbox" name="notExist'+(index+1)+'">이중에 없음';
				}
				// 다음 이동
				//console.log('listQuestionLogic[index+1]', listQuestionLogic[index+1]);
				if(listQuestionLogic[index+1] != undefined && listQuestionLogic[index+1].logicType == 'move' && listQuestionLogic[index+1].exampleNameBase == index+1) {
					//console.log('listQuestionLogic[index+1].exampleNameBase',listQuestionLogic[index+1].exampleNameBase);
					exampleHtml += ' <input type="checkbox" class="move" name="move'+(index+1)+'" checked>다음이동'
					+ ' <input type="text" class="moveQuestion" name="moveQuestion'+(index+1)+'" style="width: 80px;" placeholder="문항 번호" value="'+listQuestionLogic[index+1].questionNameTarget+'">';
				} else {
					exampleHtml += ' <input type="checkbox" class="move" name="move'+(index+1)+'">다음이동'
					+ ' <input type="text" class="moveQuestion" name="moveQuestion'+(index+1)+'" style="width: 80px; display: none;" placeholder="문항 번호">';
				}
				// 기타 상세내용
				if(index == 0) {
					exampleHtml += ' <span class="allCon" style="display: none;">'
								+ ' 	<input type="checkbox" class="allMove" name="allCheck"> 전체 체크'
								+ ' 	<input type="checkbox" class="allMove" name="allInput"> 전체 입력'
								+ ' </span>';
				}						
				exampleHtml += ' <br>';
				if(etcCnt == index+1) {
					exampleHtml += ' <div name="etcAttr'+(index+1)+'" style="margin-bottom: 10px; font-size: 13px;">';
				} else {
					exampleHtml += ' <div name="etcAttr'+(index+1)+'" style="display: none; margin-bottom: 10px; font-size: 13px;">';
				}
				exampleHtml += '		텍스트 위치: '
							+ ' 	<input type="radio" id="back" name="etcLocation'+(index+1)+'" checked>뒤'
							+ ' 	<input type="radio" id="front" name="etcLocation'+(index+1)+'">앞'						
							+ ' 	<input type="radio" id="everything" name="etcLocation'+(index+1)+'">앞, 뒤'
							+ ' <div style="margin-bottom: 5px;"></div>'
							+ '		입력제어 : ';
				if(onlykorean == 'onlykorean') {
					exampleHtml += ' <input type="checkbox" name="onlykorean'+(index+1)+'" value="onlykorean" checked>한글';
					//exampleHtml += ' <input type="radio" class="inputControl" id="onlykorean'+(index+1)+'" name="inputControl'+(index+1)+'" value="onlykorean" checked>한글';					
				} else {
					exampleHtml += ' <input type="checkbox" name="onlykorean'+(index+1)+'" value="onlykorean">한글';
					//exampleHtml += ' <input type="radio" class="inputControl" id="onlykorean'+(index+1)+'" name="inputControl'+(index+1)+'" value="onlykorean" >한글';
				}
				
				if(onlyenglish == 'onlyenglish') {
					exampleHtml += ' <input type="checkbox" name="onlyenglish'+(index+1)+'" value="onlyenglish" checked>영문';
					//exampleHtml += ' <input type="radio" class="inputControl" id="onlyenglish'+(index+1)+'" name="inputControl'+(index+1)+'" value="onlyenglish" checked>영문';
				} else {
					exampleHtml += ' <input type="checkbox" name="onlyenglish'+(index+1)+'" value="onlyenglish">영문';
					//exampleHtml += ' <input type="radio" class="inputControl" id="onlyenglish'+(index+1)+'" name="inputControl'+(index+1)+'" value="onlyenglish" >영문';
				}
				
				if(onlynumber == 'onlynumber') {
					exampleHtml += ' <input type="checkbox" name="onlynumber'+(index+1)+'" value="onlynumber" checked>숫자';
					//exampleHtml += ' <input type="radio" class="inputControl" id="onlynumber'+(index+1)+'" name="inputControl'+(index+1)+'" value="onlynumber" checked>숫자';
				} else {
					exampleHtml += ' <input type="checkbox" name="onlynumber'+(index+1)+'" value="onlynumber">숫자';
					//exampleHtml += ' <input type="radio" class="inputControl"id="onlynumber'+(index+1)+'" name="inputControl'+(index+1)+'" value="onlynumber" >숫자';
				}	
				
				if(onlyemail == 'onlyemail') {
					exampleHtml += ' <input type="checkbox" name="onlyemail'+(index+1)+'" value="onlyemail" checked>이메일';
					//exampleHtml += ' <input type="radio" id="onlyemail'+(index+1)+'" name="inputControl'+(index+1)+'" value="onlyemail" checked>이메일';
				} else {
					exampleHtml += ' <input type="checkbox" name="onlyemail'+(index+1)+'" value="onlyemail">이메일';
					//exampleHtml += ' <input type="radio" id="onlyemail'+(index+1)+'" name="inputControl'+(index+1)+'" value="onlyemail" >이메일';
				}
				
				if(onlytext == 'onlytext') {
					exampleHtml += ' <input type="checkbox" name="onlytext'+(index+1)+'" value="onlytext" checked>특수문자포함';
				} else {
					exampleHtml += ' <input type="checkbox" name="onlytext'+(index+1)+'" value="onlytext">특수문자포함';
				}
				
				if(etcNotExist == 'etcNotExist' && etcCnt == index+1) {
					exampleHtml += ' <input type="checkbox" name="etcNotExist'+(index+1)+'" value="etcNotExist" checked>이중에없음';
				} else {
					exampleHtml += ' <input type="checkbox" name="etcNotExist'+(index+1)+'" value="etcNotExist">이중에없음';
				}	
				
				if(listQuestionLogic[index+1] != undefined && listQuestionLogic[index+1].logicType == 'textWidth') {
					exampleHtml +=	' <div style="margin-bottom: 5px;"></div>'
						+ '		텍스트 크기 : '
						+ ' 	<input type="text" name="textWidth'+(index+1)+'" style="width: 80px;" value="'+listQuestionLogic[index+1].exampleValueBase+'"> px'						
						+ ' </div>';
					//console.log('listQuestionLogic[index+1].exampleValueBase',listQuestionLogic[index+1].exampleValueBase);
				} else {
					exampleHtml +=	' <div style="margin-bottom: 5px;"></div>'
						+ '		텍스트 크기 : '
						+ ' 	<input type="text" name="textWidth'+(index+1)+'" style="width: 80px;"> px'
						+ ' </div>';
				}
				
			});
			
			// 보기등록 input 보이기
			$('#exampleInput').append(exampleHtml);
			
			// 보기 등록/수정 버튼 설정
			$('#exampleButton').prop('name','update');
			$('#exampleButton').html('보기 수정');
					
			// 보기의 버튼 이벤트(보기 등록/수정은 상단)
			questionRegJs.exampleBtnEvent();
			
			// 보기 뷰 목록 설정
			var questionHtml = '<option value="0">선택하세요</option>';		
			$.each(listSlQuestion, function(index, value) {
				var slQuestionId = value.questionId;
				var slQuestionName = value.questionName;
				var slQuestionType = value.questionType;
				
				// 이전 문항만 조회함
				if(slQuestionName == questionName) {
					return false;
				}
				questionHtml += '<option value="'+ slQuestionName +'" qId="'+ slQuestionId +'" qtype="'+ slQuestionType +'">'+ slQuestionName +'</option>';
			});			
			$('#exampleView').html(questionHtml);

			// 숨김
			if(questionType == 'sin' || questionType == 'mul') {
				$('#minOrdUl').css('display','none');			// 최소순위
				$('#maxOrdUl').css('display','none');			// 최대순위
			}			
			$('#infoSEUl').css('display','none');
			$('#exampleTextarea').css('display','none');	// 보기등록 textarea 숨기기
			$('#customExampleUl').css('display','none');	// 사용자정의 보기
			$('#exampleAttUl').css('display','none');		// 속성			
			$('#exampleAlignCnt').css('display','none');	// 보기열수
			$('#exampleViewOptionUl').css('display','none');	// 보기뷰옵션
			$('#mediaurl').css('display','none');			// 동영상 URL
			$('#mediatimer').css('display','none');				// 동영상 타이머
		} else if(questionType == 'sca') {
			// 척도형
			$.each(listSlExample, function(index, value) {
				exampleHtml += '<input type="text" class="exampleInput" id="exampleInput'+(index+1)+'" style="width: 400px; margin-bottom: 10px;" value="'+value.exampleText+'"> '	
				 			+ ' <input type="checkbox" class="move" name="move'+(index+1)+'">다음이동'
							+ ' <input type="text" class="moveQuestion" name="moveQuestion'+(index+1)+'" style="width: 80px; display: none;" placeholder="문항 번호">';
				if(index == 0) {
					exampleHtml += ' <span class="allCon" style="display: none;">'
								+ ' 	<input type="checkbox" class="allMove" name="allCheck"> 전체 체크'
								+ ' 	<input type="checkbox" class="allMove" name="allInput"> 전체 입력'
								+ ' </span>';
				}						
				exampleHtml += ' <br>';
			});
			
			// 보기등록 input 보이기
			$('#exampleInput').append(exampleHtml);
			
			// 보기 등록/수정 버튼 설정
			$('#exampleButton').prop('name','updateSca');
			$('#exampleButton').html('보기 수정');
					
			// 보기의 버튼 이벤트(보기 등록/수정은 상단)
			questionRegJs.exampleBtnEvent();
			
			// 숨김
			$('#infoSEUl').css('display','none');
			$('#minOrdUl').css('display','none');			// 최소순위
			$('#maxOrdUl').css('display','none');			// 최대순위
			$('#exampleTextarea').css('display','none');	// 보기등록 textarea 숨기기 
			$('#customExampleUl').css('display','none');	// 사용자정의 보기
			$('#exampleAttUl').css('display','none');		// 속성			
			$('#exampleAlignUl').css('display','none');		// 보기방향
			$('#exampleAlignCnt').css('display','none');	// 보기열수
			$('#exampleViewUl').css('display','none');		// 보기 뷰
			$('#exampleViewOptionUl').css('display','none');	// 보기뷰옵션
			$('#mediaurl').css('display','none');			// 동영상 URL
			$('#mediatimer').css('display','none');				// 동영상 타이머
		} else if(questionType == 'num') {
			// 숫자형
			var questionOption = null;

			// 텍스트 크기
			var listQuestionLogic = new Array();

			$.each(listSlQuestionLogic, function(index, value) {
				var setObject = new Object();
				setObject.logicType = value.logicType;
				setObject.exampleNameBase = value.exampleNameBase;
				setObject.exampleValueBase = value.exampleValueBase;
				setObject.questionNameTarget = value.questionNameTarget;	
				listQuestionLogic[index] = setObject;
				//console.log('listQuestionLogic[index]',listQuestionLogic[index]);
			});
			console.log('listQuestionLogic',listQuestionLogic);
			
			if(selectSlQuestion.questionOption != null) {
				questionOption = selectSlQuestion.questionOption.split('|');	// 기타 앞/뒤 내용
				
				exampleHtml += '앞 : <input type="text" class="numHeaderInput" id="numHeaderInput" style="width: 200px; margin-bottom: 10px;" value="'+questionOption[0]+'"> '
							+ '	텍스트 크기 : ';
							if(listQuestionLogic[0] != undefined && listQuestionLogic[0].logicType == 'textWidth') {
								exampleHtml += ' <input type="text" name="textWidth" style="width: 80px;" value="'+listQuestionLogic[0].exampleValueBase+'"> px';											
							} else {
								exampleHtml += ' <input type="text" name="textWidth" style="width: 80px;"> px';
							}	
							
				exampleHtml += ' <br>'
							/*
							+ ' <input type="checkbox" class="numLimitCheck" name="numLimitCheck">범위입력'
							+ ' <input type="text" class="numLimit" name="numLimit" style="width: 80px; display: none;" placeholder="최소|최대">'
							*/
							+ '뒤 : <input type="text" class="numFooterInput" id="numFooterInput" style="width: 200px; margin-bottom: 10px;" value="'+questionOption[1]+'"> ';
							/*
							+ '		텍스트 크기 : '
							+ ' 	<input type="text" name="textWidthFooter" style="width: 80px;"> px';
							*/
			} else {
				exampleHtml += '앞 : <input type="text" class="numHeaderInput" id="numHeaderInput" style="width: 200px; margin-bottom: 10px;" value=""> '
							+ '	텍스트 크기 : '
							if(listQuestionLogic[0] != undefined && listQuestionLogic[0].logicType == 'textWidth') {
								exampleHtml += ' <input type="text" name="textWidth" style="width: 80px;" value="'+listQuestionLogic[0].exampleValueBase+'"> px';											
							} else {
								exampleHtml += ' <input type="text" name="textWidth" style="width: 80px;"> px';
							}	
							
				exampleHtml += ' <br>'
							/*
							+ ' <input type="checkbox" class="numLimitCheck" name="numLimitCheck">범위입력'
							+ ' <input type="text" class="numLimit" name="numLimit" style="width: 80px; display: none;" placeholder="최소|최대">'
							*/
							+ '뒤 : <input type="text" class="numFooterInput" id="numFooterInput" style="width: 200px; margin-bottom: 10px;" value=""> ';
							/*
							+ '	텍스트 크기 : '
							+ ' <input type="text" name="textWidthFooter" style="width: 80px;"> px';
							*/
			}							
			//console.log(questionOption);
			
			// 보기등록 input 보이기
			$('#exampleInput').append(exampleHtml);
			
			// 보기 등록/수정 버튼 설정
			$('#exampleButton').prop('name','updateNum');
			$('#exampleButton').html('보기 수정');			
			
			// 숨김
			$('#infoSEUl').css('display','none');
			$('#exampleTextarea').css('display','none');	// 보기등록 textarea 숨기기 
			$('#exampleButton').css('display','none');		// 보기수정버튼
			$('#customExampleUl').css('display','none');	// 사용자정의 보기
			$('#exampleAttUl').css('display','none');		// 속성
			$('#minOrdUl').css('display','none');			// 최소순위
			$('#maxOrdUl').css('display','none');			// 최대순위
			$('#exampleAlignUl').css('display','none');		// 보기방향
			$('#exampleAlignCnt').css('display','none');	// 보기열수
			$('#exampleViewUl').css('display','none');		// 보기 뷰
			$('#exampleViewOptionUl').css('display','none');	// 보기뷰옵션
			$('#mediaurl').css('display','none');			// 동영상 URL
			$('#mediatimer').css('display','none');				// 동영상 타이머
		
		} else if(questionType == 'tex' || questionType == 'textarea') {
			// 오픈형, 오픈문장형
			// 보기 옵션
			var onlykorean = '';
			var onlyenglish = '';
			var onlynumber = '';
			var onlymoney = '';
			var onlyphone = '';
			var onlyemail = '';
			var onlytext = '';
			var customOnlyphone = '';
			var customOnlyemail = '';
			
			var customExampleCheck = false; // 사용자정의 보기 판별
			
			if(questionType == 'tex') {		
				
				// 텍스트 크기
				var listQuestionLogic = new Array();

				$.each(listSlQuestionLogic, function(index, value) {
					var setObject = new Object();
					setObject.logicType = value.logicType;
					setObject.exampleNameBase = value.exampleNameBase;
					setObject.exampleValueBase = value.exampleValueBase;
					setObject.questionNameTarget = value.questionNameTarget;	
					listQuestionLogic[index] = setObject;
					//console.log('listQuestionLogic[index]',listQuestionLogic[index]);
				});
				console.log('listQuestionLogic',listQuestionLogic);
				
				// 입력제어 정보
				$.each(listSlQuestionFunction, function(index, value) {
					//console.log('value.functionText',value.functionText);
					if(value.functionText == "onlykorean"){
						onlykorean = 'onlykorean';
					} else if(value.functionText == "onlyenglish"){
						onlyenglish = 'onlyenglish';
					} else if(value.functionText == "onlynumber"){
						onlynumber = 'onlynumber';
					} else if(value.functionText == "onlymoney"){
						onlymoney = 'onlymoney';
					} else if(value.functionText == "onlyphone"){
						onlyphone = 'onlyphone';
					} else if(value.functionText == "onlyemail"){
						onlyemail = 'onlyemail';
					} else if(value.functionText == "onlytext"){
						onlytext = 'onlytext';
					} else if(value.functionText == "customOnlyphone"){
						customOnlyphone = 'customOnlyphone';
					} else if(value.functionText == "customOnlyemail"){
						customOnlyemail = 'customOnlyemail';
					}
				});
				
				// 사용자정의 보기 판별
				var questionOption = selectSlQuestion.questionOption;
				if(questionOption == 'customExample') {
					customExampleCheck = true;
				}
				/*
				$.each(listSlExample, function(index, value) {
					if(value.exampleLogicText == 'customExample') {
						customExampleCheck = true;
						return false;
					}
				});
				*/
				console.log('customExampleCheck',customExampleCheck);
				
				// 사용자정의 보기 문항이 아닌 일반문항
				if(!customExampleCheck) {
					if(onlykorean == 'onlykorean') {
						exampleHtml += ' <input type="checkbox" name="onlykorean" value="onlykorean" checked>한글';
						//exampleHtml += ' <input type="radio" id="onlykorean" name="inputControl" value="onlykorean" checked>한글';
					} else {
						exampleHtml += ' <input type="checkbox" name="onlykorean" value="onlykorean">한글';
						//exampleHtml += ' <input type="radio" id="onlykorean" name="inputControl" value="onlykorean" >한글';
					}
					if(onlyenglish == 'onlyenglish') {
						exampleHtml += ' <input type="checkbox" name="onlyenglish" value="onlyenglish" checked>영문';
						//exampleHtml += ' <input type="radio" id="onlyenglish" name="inputControl" value="onlyenglish" checked>영문';
					} else {
						exampleHtml += ' <input type="checkbox" name="onlyenglish" value="onlyenglish">영문';
						//exampleHtml += ' <input type="radio" id="onlyenglish" name="inputControl" value="onlyenglish" >영문';
					}
					if(onlynumber == 'onlynumber') {
						exampleHtml += ' <input type="checkbox" name="onlynumber" value="onlynumber" checked>숫자';
						//exampleHtml += ' <input type="radio" id="onlynumber" name="inputControl" value="onlynumber" checked>숫자';
					} else {
						exampleHtml += ' <input type="checkbox" name="onlynumber" value="onlynumber">숫자';
						//exampleHtml += ' <input type="radio" id="onlynumber" name="inputControl" value="onlynumber" >숫자';
					} 
					if(onlymoney == 'onlymoney') {
						exampleHtml += ' <input type="checkbox" name="onlymoney" value="onlymoney" checked>금액';
						//exampleHtml += ' <input type="radio" id="onlymoney" name="inputControl" value="onlymoney" checked>금액';
					} else {
						exampleHtml += ' <input type="checkbox" name="onlymoney" value="onlymoney">금액';
						//exampleHtml += ' <input type="radio" id="onlymoney" name="inputControl" value="onlymoney" >금액';
					}
					if(onlyphone == 'onlyphone') {
						exampleHtml += ' <input type="checkbox" name="onlyphone" value="onlyphone" checked>전화번호';
						//exampleHtml += ' <input type="radio" id="onlyphone" name="inputControl" value="onlyphone" checked>전화번호';
					} else {
						exampleHtml += ' <input type="checkbox" name="onlyphone" value="onlyphone">전화번호';
						//exampleHtml += ' <input type="radio" id="onlyphone" name="inputControl" value="onlyphone" checked>전화번호';
					}
					if(onlyemail == 'onlyemail') {
						exampleHtml += ' <input type="checkbox" name="onlyemail" value="onlyemail" checked>이메일';
						//exampleHtml += ' <input type="radio" id="onlyemail" name="inputControl" value="onlyemail" checked>이메일';
					} else {					
						exampleHtml += ' <input type="checkbox" name="onlyemail" value="onlyemail">이메일';
						//exampleHtml += ' <input type="radio" id="onlyemail" name="inputControl" value="onlyemail" >이메일';
					}
					if(onlytext == 'onlytext') {
						exampleHtml += ' <input type="checkbox" name="onlytext" value="onlytext" checked>특수문자포함';					
					} else {					
						exampleHtml += ' <input type="checkbox" name="onlytext" value="onlytext" >특수문자포함';					
					}
					
					exampleHtml += ' 텍스트 크기 : ';
					if(listQuestionLogic[0] != undefined && listQuestionLogic[0].logicType == 'textWidth') {
						exampleHtml += ' <input type="text" name="textWidth" style="width: 80px;" value="'+listQuestionLogic[0].exampleValueBase+'"> px';											
					} else {
						exampleHtml += ' <input type="text" name="textWidth" style="width: 80px;"> px';
					}
					
					exampleHtml += ' <br><br>';
				} else {
					// 사용자 정의 문항
					if(onlykorean == 'onlykorean') {
						$('[name="customOnlykorean"]').prop('checked', true);
					}
					if(onlyenglish == 'onlyenglish') {
						$('[name="customOnlyenglish"]').prop('checked', true);
					}
					if(onlynumber == 'onlynumber') {
						$('[name="customOnlynumber"]').prop('checked', true);
					} 
					if(onlymoney == 'onlymoney') {
						$('[name="customOnlymoney"]').prop('checked', true);
					}
					if(customOnlyphone == 'customOnlyphone') {
						$('[name="customOnlyphone"]').prop('checked', true);
					}
					if(customOnlyemail == 'customOnlyemail') {
						$('[name="customOnlyemail"]').prop('checked', true);
					}
					if(onlytext == 'onlytext') {
						$('[name="customOnlytext"]').prop('checked', true);
					}
					if(listQuestionLogic[0] != undefined && listQuestionLogic[0].logicType == 'customTextWidth') {
						$('#customTextWidth').val(listQuestionLogic[0].exampleValueBase);
					}
					console.log('listQuestionLogic[0]', listQuestionLogic[0]);
					
					// 앞 뒤 설명
					if(customOnlyphone == 'customOnlyphone') {
						customExampleHtml += '<input type="text" class="customExample" name="customExample_1" value="전화번호 입력" style="width:150px; text-align:center; background:#f0f0f0;" readonly="">';						
					} else if(customOnlyemail == 'customOnlyemail') {
						customExampleHtml += '<input type="text" class="customExample" name="customExample_1" value="이메일 입력" style="width:150px; text-align:center; background:#f0f0f0;" readonly="">';
					} else {
						console.log('listSlExample.length',listSlExample.length);
						if(listSlExample.length > 0) {
							$.each(listSlExample, function(index, value){
								// 설명 입력 폼
								customExampleHtml += '<input type="text" class="customText" id="customText_'+(index+1)+'" name="customText_'+(index+1)+'" style="width:150px;" placeholder="설명 '+(index+1)+'" value="'+value.exampleText+'"> ';						
								if(listSlExample.length-1 > index) {	
									// 오픈 응답 입력 폼
									customExampleHtml += '<input type="text" class="customExample" name="customExample_'+(index+1)+'" value="오픈 응답 '+(index+1)+'" style="width:100px; text-align:center; background:#f0f0f0;" readonly="">';
								}
							});
							$('#customExampleSelect').val(listSlExample.length-1);	// 사용자정의 보기 selectbox
						} else {
							customExampleHtml += '<input type="text" class="customText" id="customText_1" name="customText_1" style="width:150px;" placeholder="설명 1" value=""> '
												+ '<input type="text" class="customExample" name="customExample_1" value="오픈 응답 1" style="width:100px; text-align:center; background:#f0f0f0;" readonly=""> '
												+ '<input type="text" class="customText" id="customText_2" name="customText_2" style="width:150px;" placeholder="설명 2" value=""> ';
							$('#customExampleSelect').val(1);	// 사용자정의 보기 selectbox
						}
					}										
					
					$('#customExampleText').css('display','');			// 입력제어 보이기
					$('#customExampleView').html(customExampleHtml);	// 입력 폼
				}
								
			} else if(questionType == 'textarea') {
				
				exampleHtml += ' <input type="checkbox" name="onlykorean" value="onlykorean">한글'
							+ ' <input type="checkbox" name="onlyenglish" value="onlyenglish">영문'
							+ ' <input type="checkbox" name="onlynumber" value="onlynumber">숫자'
							+ ' <input type="checkbox" name="onlytext" value="onlytext" >특수문자포함';
				
				/*
				exampleHtml += ' <input type="radio" id="onlykorean" name="inputControl" value="onlykorean">한글'
					+ ' <input type="radio" id="onlyenglish" name="inputControl" value="onlyenglish">영문'					
					+ ' <input type="radio" id="onlynumber" name="inputControl" value="onlynumber">숫자'
					+ ' <input type="checkbox" name="onlytext" value="onlytext" >특수문자포함';		
				*/
			}
			
			

			var listSlExampleLength = listSlExample.length;
			//console.log('listSlExample', listSlExample);
			
			// 사용자정의 보기 문항이 아닌 일반문항
			if(!customExampleCheck) {
				if(listSlExampleLength > 0) {
					// 응답값 2개이상 오픈문항
					$.each(listSlExample, function(index, value) {
						// 보기
						if(value.exampleLogicText != null && value.exampleLogicText != ''){
							exampleHtml += '<input type="text" class="exampleInput" id="exampleInput'+(index+1)+'" style="width: 300px; margin-bottom: 10px;" value="'+value.exampleText + value.exampleLogicText+'"> '					
										+ ' <br>';
						} else {
							exampleHtml += '<input type="text" class="exampleInput" id="exampleInput'+(index+1)+'" style="width: 300px; margin-bottom: 10px;" value="'+value.exampleText+'"> '					
										+ ' <br>';
						}
					});
					// 보기등록 input 보이기
					$('#exampleInput').append(exampleHtml);
					// 보기 등록/수정 버튼 설정
					$('#exampleButton').prop('name','updateTex');
					$('#exampleButton').html('보기 수정');
				} else {
					// 보기등록 input 보이기
					$('#exampleInput').append(exampleHtml);
					$('#exampleButton').css('display','none');		// 보기수정버튼
				}			
				
				$('#exampleTextarea').css('display','none');	// 보기등록 textarea 숨기기 
			} else {
				$.each(listSlExample, function(index, value) {
					customExampleHtml = '';
				});
				
				$('#exampleTextarea').css('display','');	// 보기등록 textarea 숨기기 
			}
			//console.log('exampleHtml',exampleHtml);
			
			// 숨김
			$('#infoSEUl').css('display','none');
			$('#exampleAttUl').css('display','none');		// 속성
			$('#minOrdUl').css('display','none');			// 최소순위
			$('#maxOrdUl').css('display','none');			// 최대순위
			$('#exampleAlignUl').css('display','none');		// 보기방향
			$('#exampleAlignCnt').css('display','none');	// 보기열수
			$('#exampleViewUl').css('display','none');		// 보기 뷰
			$('#exampleViewOptionUl').css('display','none');	// 보기뷰옵션
			$('#mediaurl').css('display','none');			// 동영상 URL
			$('#mediatimer').css('display','none');				// 동영상 타이머
		} else if(questionType == 'att') {
			// 속성형
			var attHtml = '';			
			var attCheck = false;
			var exampleList = new Array();
			var attributeList = new Array();
			var attCnt = 0;
			$.each(listSlExample, function(index, value) {
				if(value.exampleText == '$$@@$$') {
					attCheck = true;	// 속성, 보기 구분 인자
				} else {
					if(!attCheck) {
						exampleList[index] = value.exampleText;			// 보기
					} else {
						attributeList[attCnt] = value.exampleText;		// 속성
						attCnt++;
					}
				}
				//console.log('exampleList',exampleList);
				//console.log('attributeList',attributeList);
			});
			
			var etcCnt = -1;
			var attQuetionOption = '';
			var attResponseOption = '';			
			$.each(listSlQuestionFunction, function(index, value) {
				//console.log('value.functionText',value.functionText);
				if(value.functionText.indexOf("ETC:" != -1)){
					var etcArray = value.functionText.split(":");
					etcCnt = etcArray[1]; 
				}
				if(value.functionText == "addrow"){
					attQuetionOption = 'addrow';
					attResponseOption = 'sin';
				} else if(value.functionText == "addrowmul"){
					attQuetionOption = 'addrow';
					attResponseOption = 'mul';
				} else if(value.functionText == "addcol"){
					attQuetionOption = 'addcol';
					attResponseOption = 'sin';
				} else if(value.functionText == "addcolmul"){
					attQuetionOption = 'addcol';
					attResponseOption = 'mul';
				}
			});
			
			// 보기 설정
			$.each(exampleList, function(index, value) {
				exampleHtml += '<input type="text" class="exampleInput" id="exampleInput'+(index+1)+'" style="width: 400px; margin-bottom: 10px;" value="'+value+'"> '
							+ ' <br>';	
			});			
			// 보기등록 input 보이기
			$('#exampleInput').append(exampleHtml);			
			// 보기 등록/수정 버튼 설정
			$('#exampleButton').prop('name','updateExample');
			$('#exampleButton').html('보기 수정');
			
			// 속성 설정
			$.each(attributeList, function(index, value) {
				attHtml += '<input type="text" class="exampleAttInput" id="exampleAttInput'+(index+1)+'" style="width: 400px; margin-bottom: 10px;" value="'+value+'"> '
						if(etcCnt == index+1) {
							attHtml += ' <input type="checkbox" class="attEtc" name="attEtc'+(index+1)+'" checked>기타';
						} else {
							attHtml += ' <input type="checkbox" class="attEtc" name="attEtc'+(index+1)+'">기타';
						}
				attHtml += '	텍스트 크기 : '
						+ ' <input type="text" name="attTextWidth'+(index+1)+'" style="width: 80px;"> px'
						+ ' <br>';
			});			
			// 속성 등록 input 보이기
			$('#exampleAttInput').append(attHtml);			
			// 속성 등록/수정 버튼 설정			
			$('#exampleAttButton').prop('name','updateAtt');
			$('#exampleAttButton').html('속성 수정');
			
			// 속성 문항/응답 옵션
			attHtml = '';
			attHtml += ' <ul id="attExampleOption">'
			+ ' 	<li>속성문항옵션</li>'
			+ '		<li> '
			+ ' 		<select name="attQuetionOption">';
			if(attQuetionOption == 'addrow') {
				attHtml += ' 		<option value="addrow" selected>행 추가(down)</option>'
						+ ' 		<option value="addcol">열 추가(right)</option>';
			} else if(attQuetionOption == 'addcol') {
				attHtml += ' 		<option value="addrow">행 추가(down)</option>'
						+ ' 		<option value="addcol" selected>열 추가(right)</option>';
			}
			attHtml += '</select>'
			+ '		</li> '
			+ '	</ul> '
			+ ' <ul id="attResponseOption">'
			+ ' 	<li>속성응답옵션</li>'
			+ '		<li> '
			+ ' 		<select name="attResponseOption">';
			if(attResponseOption == 'sin') {
				attHtml += ' 	<option value="sin" selected>단일</option>'
						+ ' 	<option value="mul">중복</option>';
			} else if(attResponseOption == 'mul') {
				attHtml += ' 	<option value="sin">단일</option>'
						+ ' 	<option value="mul" selected>중복</option>';
			}
			attHtml += '</select>'
			+ '		</li> '
			+ '	</ul> ';
			
			$('#exampleAttUl').after(attHtml);
			
			// 숨김
			$('#infoSEUl').css('display','none');
			$('#exampleTextarea').css('display','none');		// 보기등록 textarea 숨기기 
			$('#exampleAttTextarea').css('display','none');		// 속성등록 textarea 숨기기
			$('#minOrdUl').css('display','none');			// 최소순위
			$('#maxOrdUl').css('display','none');			// 최대순위
			$('#exampleAlignUl').css('display','none');			// 보기방향
			$('#exampleAlignCnt').css('display','none');		// 보기열수
			$('#exampleViewUl').css('display','none');			// 보기 뷰
			$('#exampleViewOptionUl').css('display','none');	// 보기뷰옵션
			$('#mediaurl').css('display','none');			// 동영상 URL
			$('#mediatimer').css('display','none');				// 동영상 타이머
		} else if(questionType == 'info') {
			// 보기 설정
			$.each(listSlExample, function(index, value) {
				exampleHtml += '<input type="hidden" class="exampleInput" id="exampleInput'+(index+1)+'" style="width: 400px; margin-bottom: 10px;" value="'+value+'"> '
							+ ' <br>';	
			});	
			// 보기등록 input 보이기
			$('#exampleInput').append(exampleHtml);
			
			// 보임
			$('#infoSEUl').css('display','');	// 안내 내용			
			// 숨김
			$('#exampleUl').css('display','none');	// 보기
			//$('#exampleTextarea').css('display','none');	// 보기등록 textarea 숨기기 
			//$('#exampleButton').css('display','none');	// 보기수정버튼
			$('#exampleAttUl').css('display','none');		// 속성
			$('#minOrdUl').css('display','none');			// 최소순위
			$('#maxOrdUl').css('display','none');			// 최대순위
			$('#exampleAlignUl').css('display','none');		// 보기방향
			$('#exampleAlignCnt').css('display','none');	// 보기열수
			$('#exampleViewUl').css('display','none');		// 보기 뷰
			$('#exampleViewOptionUl').css('display','none');	// 보기뷰옵션
			$('#previousResponseUl').css('display','none');	// 이전응답내용
			$('#mediaurl').css('display','none');			// 동영상 URL
			$('#mediatimer').css('display','none');				// 동영상 타이머
		} else if(questionType == 'media') {
			
			// 타이머
			$.each(listSlQuestionFunction, function(index, value){
				var functionTextArray = value.functionText;
				var functionText = functionTextArray.split(':');
				
				if(functionText[0] == 'mediatimer') {
					$('[name="mediatimer"]').val(functionText[1]);					
				} else if(functionText[0] == 'mediaurl') {
					$('[name="mediaurl"]').val(functionText[1]);
				}
			});
			
			// 숨김
			$('#infoSEUl').css('display','none');
			$('#exampleUl').css('display','none');	// 보기
			//$('#exampleTextarea').css('display','none');	// 보기등록 textarea 숨기기 
			//$('#exampleButton').css('display','none');	// 보기수정버튼
			$('#exampleAttUl').css('display','none');		// 속성
			$('#minOrdUl').css('display','none');			// 최소순위
			$('#maxOrdUl').css('display','none');			// 최대순위
			$('#exampleAlignUl').css('display','none');		// 보기방향
			$('#exampleAlignCnt').css('display','none');	// 보기열수
			$('#exampleViewUl').css('display','none');		// 보기 뷰
			$('#exampleViewOptionUl').css('display','none');	// 보기뷰옵션
			$('#previousResponseUl').css('display','none');	// 이전응답내용
			$('#responseLimitUl').css('display','none');	// 응답제한시간
		}
		
		// 응답제한시간
		$.each(listSlQuestionFunction, function(index, value){
			var functionTextArray = value.functionText;
			var functionText = functionTextArray.split(':');
			
			if(functionText[0] == 'timer') {
				$('[name="responseLimit"]').val(functionText[1]);
				return false;
			}
		});
	},
	exampleTextarea : function(type) {
		var exampleTextareaHtml = '';
		if(type == 'update' || type == 'updateExample' || type == 'updateTex' || type == 'updateSca') {
			$('.exampleInput').each(function(index, value) {
				exampleTextareaHtml += $(this).val()
								+ '\n';
			});
		} else if(type == 'updateNum') {
			exampleTextareaHtml = $('.exampleInput').val();		
		}
		
		// input > textarea 값 표시
		$('#example').html(exampleTextareaHtml);
		//console.log('exampleTextareaHtml',exampleTextareaHtml);
		
		// 보기등록 textarea 보이기 
		$('#exampleTextarea').css('display','');	
		$('#exampleInput').css('display','none');
	},
	exampleInput : function(type) {
		if(type == 'update') {
			var exampleInputVal = $('#example').val();
			//console.log('exampleInputVal',exampleInputVal);
			
			var exampleList = exampleInputVal.trim().split('\n');
			//console.log('exampleList',exampleList);
			
			// textarea > input 값 표시
			var exampleInputHtml = '';
			$.each(exampleList, function(index, value) {
				exampleInputHtml += '<input type="text" class="exampleInput" id="exampleInput'+(index+1)+'" style="width: 400px; margin-bottom: 10px;" value="'+value+'"> '
								+ ' <input type="checkbox" class="etc" name="etc'+(index+1)+'">기타'
								+ ' <input type="checkbox" name="notExist'+(index+1)+'">이중에 없음'
								+ ' <input type="checkbox" class="move" name="move'+(index+1)+'">다음이동'
								+ ' <input type="text" class="moveQuestion" name="moveQuestion'+(index+1)+'" style="width: 80px; display: none;" placeholder="문항 번호">';
								if(index == 0) {
									exampleInputHtml += ' <span class="allCon" style="display: none;">'
													+ ' 	<input type="checkbox" class="allMove" name="allCheck"> 전체 체크'
													+ ' 	<input type="checkbox" class="allMove" name="allInput"> 전체 입력'
													+ ' </span>';
								}						
				exampleInputHtml += ' <br>'
								+ ' <div name="etcAttr'+(index+1)+'" style="display: none; margin-bottom: 10px; font-size: 13px;">'
								+ '		텍스트 위치: '
								+ ' 	<input type="radio" id="back" name="etcLocation'+(index+1)+'" checked>뒤'
								+ ' 	<input type="radio" id="front" name="etcLocation'+(index+1)+'">앞'						
								+ ' 	<input type="radio" id="everything" name="etcLocation'+(index+1)+'">앞, 뒤'
								+ ' <div style="margin-bottom: 5px;"></div>'
								+ '		입력제어 : '
								+ ' 	<input type="checkbox" name="onlykorean'+(index+1)+'" value="onlykorean">한글'
								+ ' 	<input type="checkbox" name="onlyenglish'+(index+1)+'" value="onlyenglish">영문'
								+ ' 	<input type="checkbox" name="onlynumber'+(index+1)+'" value="onlynumber">숫자'
								+ ' 	<input type="checkbox" name="onlyemail'+(index+1)+'" value="onlyemail">이메일'
								/*
								+ ' 	<input type="radio" id="onlykorean'+(index+1)+'" name="inputControl'+(index+1)+'" value="onlykorean" >한글'
								+ ' 	<input type="radio" id="onlyenglish'+(index+1)+'" name="inputControl'+(index+1)+'" value="onlyenglish" >영문'
								+ ' 	<input type="radio" id="onlynumber'+(index+1)+'" name="inputControl'+(index+1)+'" value="onlynumber" >숫자'
								+ ' 	<input type="radio" id="onlyemail'+(index+1)+'" name="inputControl'+(index+1)+'" value="onlyemail" >이메일'
								*/
								+ ' 	<input type="checkbox" name="onlytext'+(index+1)+'" value="onlytext">특수문자포함'
								+ ' 	<input type="checkbox" name="etcNotExist'+(index+1)+'" value="etcNotExist">이중에없음'
								+ ' <div style="margin-bottom: 5px;"></div>'
								+ '		텍스트 크기 : '
								+ ' 	<input type="text" name="textWidth'+(index+1)+'" style="width: 80px;"> px'
								+ ' </div>';
			});
		} else if(type == 'updateSca') {
			var exampleInputVal = $('#example').val();
			//console.log('exampleInputVal',exampleInputVal);
			
			var exampleList = exampleInputVal.trim().split('\n');
			//console.log('exampleList',exampleList);
			
			// textarea > input 값 표시
			var exampleInputHtml = '';
			$.each(exampleList, function(index, value) {
				exampleInputHtml += '<input type="text" class="exampleInput" id="exampleInput'+(index+1)+'" style="width: 400px; margin-bottom: 10px;" value="'+value+'"> '								
								+ ' <input type="checkbox" class="move" name="move'+(index+1)+'">다음이동'
								+ ' <input type="text" class="moveQuestion" name="moveQuestion'+(index+1)+'" style="width: 80px; display: none;" placeholder="문항 번호">';
								if(index == 0) {
									exampleInputHtml += ' <span class="allCon" style="display: none;">'
													+ ' 	<input type="checkbox" class="allMove" name="allCheck"> 전체 체크'
													+ ' 	<input type="checkbox" class="allMove" name="allInput"> 전체 입력'
													+ ' </span>';
								}						
				exampleInputHtml += ' <br>';

			});
		} else if(type == 'updateTex') {
			var exampleInputVal = $('#example').val();
			//console.log('exampleInputVal',exampleInputVal);			
			var exampleList = exampleInputVal.trim().split('\n');
			//console.log('exampleList',exampleList);
			
			// textarea > input 값 표시
			var exampleInputHtml = '';
			
			// 보기 옵션
			
			exampleInputHtml += ' <input type="checkbox" name="onlykorean" value="onlykorean">한글'
				+ ' <input type="checkbox" name="onlyenglish" value="onlyenglish">영문'
				+ ' <input type="checkbox" name="onlynumber" value="onlynumber">숫자'
				+ ' <input type="checkbox" name="onlymoney" value="onlymoney">금액'
				+ ' <input type="checkbox" name="onlyphone" value="onlyphone">전화번호'
				+ ' <input type="checkbox" name="onlyemail" value="onlyemail">이메일'	
				+ ' <input type="checkbox" name="onlytext" value="onlytext">특수문자포함'
				+ '	텍스트 크기 : '
				+ ' <input type="text" name="textWidth" style="width: 80px;"> px'
				+ ' <br><br>';
			/*
			exampleInputHtml += ' <input type="radio" id="onlykorean" name="inputControl" value="onlykorean">한글'
				+ ' <input type="radio" id="onlyenglish" name="inputControl" value="onlyenglish">영문'
				+ ' <input type="radio" id="onlynumber" name="inputControl" value="onlynumber">숫자'
				+ ' <input type="radio" id="onlymoney" name="inputControl" value="onlymoney">금액'
				+ ' <input type="radio" id="onlyphone" name="inputControl" value="onlyphone">전화번호'					
				+ ' <input type="radio" id="onlyemail" name="inputControl" value="onlyemail">이메일'
				+ ' <input type="checkbox" name="onlytext" value="onlytext">특수문자포함'
				+ ' 텍스트 크기 : <input type="text" name="textWidth" style="width: 80px;"> px'								 
				+ ' <br><br>';	
			*/
			$.each(exampleList, function(index, value) {
				exampleInputHtml += '<input type="text" class="exampleInput" id="exampleInput'+(index+1)+'" style="width: 300px; margin-bottom: 10px;" value="'+value+'"> '					
								+ ' <br>';
			});
			//console.log('exampleList',exampleList);
			//console.log('exampleInputHtml',exampleInputHtml);
		} else if(type == 'updateExample') {
			var exampleInputVal = $('#example').val();
			//console.log('exampleInputVal',exampleInputVal);
			
			var exampleList = exampleInputVal.trim().split('\n');
			//console.log('exampleList',exampleList);
			
			// textarea > input 값 표시
			var exampleInputHtml = '';
			$.each(exampleList, function(index, value) {
				exampleInputHtml += '<input type="text" class="exampleInput" id="exampleInput'+(index+1)+'" style="width: 400px; margin-bottom: 10px;" value="'+value+'"> '
								//+ ' <input type="checkbox" class="etc" name="etc'+(index+1)+'">기타'
								+ ' <br>';								
			});
		}
		
		$('#exampleInput').html(exampleInputHtml);
		
		// 보기수정 input 보이기 
		$('#exampleTextarea').css('display','none');
		$('#exampleInput').css('display','');
				
		// 보기의 버튼 이벤트(보기 등록/수정은 상단)
		questionRegJs.exampleBtnEvent();
	},
	exampleAttTextarea : function(type) {
		var exampleAttTextareaHtml = '';
		if(type == 'updateAtt') {
			$('.exampleAttInput').each(function(index, value) {
				exampleAttTextareaHtml += $(this).val()
								+ '\n';
			});
		}
		
		// input > textarea 값 표시
		$('#exampleAtt').html(exampleAttTextareaHtml);
		//console.log('exampleAttTextareaHtml',exampleAttTextareaHtml);
		
		// 보기등록 textarea 보이기 
		$('#exampleAttTextarea').css('display','');	
		$('#exampleAttInput').css('display','none');
	},
	exampleAttInput : function(type) {
		if(type == 'updateAtt') {
			var exampleAttInputVal = $('#exampleAtt').val();
			//console.log('exampleAttInputVal',exampleAttInputVal);
			
			var exampleAttList = exampleAttInputVal.trim().split('\n');
			//console.log('exampleAttList',exampleAttList);
			
			// textarea > input 값 표시
			var exampleAttInputHtml = '';
			$.each(exampleAttList, function(index, value) {
				exampleAttInputHtml += '<input type="text" class="exampleAttInput" id="exampleAttInput'+(index+1)+'" style="width: 400px; margin-bottom: 10px;" value="'+value+'"> '
								+ ' <input type="checkbox" class="attEtc" name="attEtc'+(index+1)+'">기타'
								+ '	텍스트 크기 : '
								+ ' <input type="text" name="attTextWidth'+(index+1)+'" style="width: 80px;"> px'
								+ ' <br>';								
			});
		}		
		$('#exampleAttInput').html(exampleAttInputHtml);
		
		// 속성 수정 input 보이기 
		$('#exampleAttTextarea').css('display','none');
		$('#exampleAttInput').css('display','');
	},
	exampleBtnEvent : function() {
		// 기타 체크 이벤트
		$('.etc').on('click',function(){
			
			var etcCheck = $(this).prop("checked");
			var etcName = $(this).prop("name");
			var etcNo = '';
			console.log('etcName',etcName);
			console.log('etcName.length',etcName.length);
			if(etcName.length <= 4) {
				etcNo = etcName.substring(3,4);
			} else if(etcName.length > 4) {
				etcNo = etcName.substring(3,5);
			}
			console.log('etcNo',etcNo);
			
			if(etcCheck) {
				$('[name="etcAttr'+etcNo+'"]').css('display','');
				$('[name="etcAttr'+etcNo+'"]').prop('checked',true);
			} else {
				$('[name="etcAttr'+etcNo+'"]').css('display','none');
			}
		});
		// 특수문자 이벤트
		$('.inputControl').on('click',function(){
			
			var etcCheck = $(this).prop("checked");
			var etcName = $(this).prop("name");
			var etcNo = '';
			console.log('etcName',etcName);
			console.log('etcName.length',etcName.length);
			if(etcName.length <= 4) {
				etcNo = etcName.substring(3,4);
			} else if(etcName.length > 4) {
				etcNo = etcName.substring(3,5);
			}
			console.log('etcNo',etcNo);
			
			if(etcCheck) {
				$('[name="etcAttr'+etcNo+'"]').css('display','');
				$('[name="etcAttr'+etcNo+'"]').prop('checked',true);
			} else {
				$('[name="etcAttr'+etcNo+'"]').css('display','none');
			}
		});
		// 다음이동 체크 이벤트
		$('.move').on('click',function(){
			
			var moveCheck = $(this).prop("checked");
			var moveName = $(this).prop("name");
			var moveNo = '';
			console.log('moveName',moveName);
			console.log('moveName.length',moveName.length);
			if(moveName.length <= 5) {
				moveNo = moveName.substring(4,5);
			} else if(moveName.length > 5) {
				moveNo = moveName.substring(4,6);
			}
			console.log('moveNo',moveNo);
			
			if(moveCheck) {
				$('[name="moveQuestion'+moveNo+'"]').css('display','');
				$('.allCon').css('display','');
			} else {
				$('[name="moveQuestion'+moveNo+'"]').css('display','none');
				$('.allCon').css('display','none');
			}
		});
		// 전체 체크 이벤트
		$('.allMove').on('click',function(){
			
			var allName = $(this).prop("name");
			var allCheck = $(this).prop("checked");
			var allVal = $(this).val();

			if(allName == 'allCheck') {				
				// 전체체크
				if(allCheck) {
					$('.move').prop('checked',true);
					$('.moveQuestion').css('display','');
				} else {
					$('.move').prop('checked',false);
					$('[name="move1"').prop('checked',true);
					$('.moveQuestion').css('display','none');
					$('[name="moveQuestion1"]').css('display','');					
				}	
			} else if(allName == 'allInput') {
				// 전체입력
				var moveQuestion1 = $('[name="moveQuestion1"').val();
				if(allCheck) {
					$('.moveQuestion').val(moveQuestion1);
				} else {
					$('.moveQuestion').val('');
					$('[name="moveQuestion1"').val(moveQuestion1);
				}
			}
		});
	},
	checkValidation : function(){
		var returnVal = true;
		
		// 문항번호
		if ( !commonJs.checkValidation('questionName', '문항번호를 입력하세요', 'text') ) {
			returnVal = false;
			return false; 
		}
		/*
		// 지문내용
		if ( !commonJs.checkValidation('smartEditor2', '문항내용을 입력하세요', 'text') ) {
			returnVal = false;
			return false; 
		}
		*/
		//console.log($('.exampleInput'));
		/*
		// 보기
		$.each($('.exampleInput'), function(index, value){
			if ( !commonJs.checkValidation2('exampleInput', index+1, '보기를 입력하세요', 'text') ) {
				returnVal = false;
				return false; 
			}
		});
		*/
		// 사용자정의 보기 설명
		console.log('checkValidation', $('[name="customExampleSelect"] :selected').val());
		if($('[name="customExampleSelect"] :selected').val() > 0) {
			$.each($('.customText'), function(index, value){
				if ( !commonJs.checkValidation2('customText', '_'+(index+1), '설명 '+(index+1)+'을 입력하세요.', 'text') ) {
					returnVal = false;
					return false; 
				}
			});
		}
		return returnVal;
	},
	setData : function(){
		var projectId = $('[name="projectId"]').val();
		var questionId = $('[name="questionId"]').val();
		var gubun = $('[name="gubun"]').val();
		
		// 문항 타입, 문항번호
		var questionType = $('[name="questionType"]:checked').prop("id");
		var questionName = $('[name="questionName"]').val();
		var questionOption = '';
		
		// 상단,지문,하단,안내 내용 (스마트에디터)
		oEditors.getById["smartEditor1"].exec("UPDATE_CONTENTS_FIELD", []);
		oEditors.getById["smartEditor2"].exec("UPDATE_CONTENTS_FIELD", []);
		oEditors.getById["smartEditor3"].exec("UPDATE_CONTENTS_FIELD", []);
		if(questionType == 'info') {
			oEditors.getById["smartEditor4"].exec("UPDATE_CONTENTS_FIELD", []);
		}
		
		var smartEditor1 = $('#smartEditor1').val();
		var smartEditor2 = $('#smartEditor2').val();
		var smartEditor3 = $('#smartEditor3').val();
		var smartEditor4 = null;
		/*
		if(smartEditor1 == "<p>&nbsp;</p>") {
			smartEditor1 = null;
		}
		if(smartEditor3 == "<p>&nbsp;</p>") {
			smartEditor3 = null;
		}
		*/
		if(questionType == 'info') {	// 안내형일때만 값 세팅
			smartEditor4 = $('#smartEditor4').val();
		}
		//console.log('smartEditor4',smartEditor4);
		
		// 보기 값 세팅을 위한 변수 (보기,보기옵션,보기로직 등)
		var exampleText = $('.exampleInput');
		var exampleTextLen = exampleText.length;
		var listSlExample = new Array(exampleTextLen);
		var listSlFunctionQuestion = new Array(); // 문항 기능
		var exampleOptionCnt = 0; // 보기옵션 cnt
		var logicCnt = 0;			// 로직 cnt
		var listSlQuestionLogic = new Array();	// 문항 로직
		// 최소,최대 순위입력
		var minOrd = '';
		var maxOrd = '';
		// 보기방향, 보기열수
		var exampleAlign = '';
		var exampleAlignCnt = '';
		// 보기 뷰, 보기 뷰 옵션
		var exampleView = '';
		var exampleViewOption = '';
		// 오픈문항 앞/뒤 내용,크기
		var numHeaderInput = '';
		var numFooterInput = '';
		var textWidthHeader = '';
		var textWidthFooter = '';
		
		console.log('setData questionType',questionType);
		
		// 단일,복수,순위,척도
		if(questionType == 'sin' || questionType == 'mul' || questionType == 'ord' || questionType == 'sca') {

			//var exampleOptionCnt = 0; // 보기옵션 cnt
			//var logicCnt = 0; 			// 로직 cnt
			$.each($('.exampleInput'), function(index, value){
				//console.log('index',index);
				//console.log('value',value);
				var exampleText = $(this).val();	// 보기 내용
				var exampleValue = (index+1);		// 보기 값
				var exampleOrder = 0;				// 보기 순서
				var columnName = '';				// 해당 문항번호 
				var pageType = 'base';				// 페이지 타입 기본 base
				if(questionType != 'sin'){
					// 단일응답 제외한 모든 문항
					exampleOrder = (index+1);
				} else if(questionType == 'sin'){
					//단일응답만
					columnName = questionName;
				}
				
				var setObject = new Object();				
				// # | 값 구분 저장
				if(exampleText.indexOf("#") != -1){
					// 보기 값 저장
					var exampleTextArray = exampleText.split("#");
					setObject.exampleText = exampleTextArray[0];
					setObject.exampleLogicText = '#' + exampleTextArray[1];
					//console.log('exampleTextArray[0]',exampleTextArray[0]);
					// 조회 문항_번호	exampleArray[0]
					// 조회 값		exampleArray[1]	
					var exampleArray = exampleTextArray[1].split("=");	// # 로직 저장
					//console.log('exampleArray[0]',exampleArray[0]);
					//console.log('exampleArray[1]',exampleArray[1]);
					var setLogicObject = new Object();					
					setLogicObject.logicType = '#';						// 로직 타입
					setLogicObject.state = 'Y';							// 로직 상태
					setLogicObject.questionNameBase = questionName;		// 기준 문항 이름
					setLogicObject.exampleNameBase = exampleValue;		// 기준 문항 값
					setLogicObject.questionNameTarget = exampleArray[0];// 조회할 문항_번호
					setLogicObject.exampleNameTarget = exampleArray[1];	// 조회할 값

					listSlQuestionLogic[logicCnt++] = setLogicObject;	// 다음 이동 설정 값
				} else if(exampleText.indexOf("|") != -1){
					// 보기 값 저장
					var exampleTextArray = exampleText.split("|");
					setObject.exampleText = exampleTextArray[0];
					setObject.exampleLogicText = '|' + exampleTextArray[1];
					//console.log('exampleTextArray[0]',exampleTextArray[0]);
					// 조회 문항_번호	exampleArray[0]
					// 조회 값		exampleArray[1]	
					var exampleArray = exampleTextArray[1].split("=");	// # 로직 저장
					//console.log('exampleArray[0]',exampleArray[0]);
					//console.log('exampleArray[1]',exampleArray[1]);
					var setLogicObject = new Object();					
					setLogicObject.logicType = '|';						// 로직 타입
					setLogicObject.state = 'Y';							// 로직 상태
					setLogicObject.questionNameBase = questionName;		// 기준 문항 이름
					setLogicObject.exampleNameBase = exampleValue;		// 기준 문항 값
					setLogicObject.questionNameTarget = exampleArray[0];// 조회할 문항_번호
					setLogicObject.exampleNameTarget = exampleArray[1];	// 조회할 값

					listSlQuestionLogic[logicCnt++] = setLogicObject;	// 다음 이동 설정 값
				}else {
					setObject.exampleText = exampleText;
				}
				
				setObject.exampleValue = exampleValue;
				setObject.exampleOrder = parseInt(exampleOrder);
				setObject.columnName = columnName;
				setObject.pageType = pageType;
				listSlExample[index] = setObject;
				// 보기옵션 
				var exampleValue = (index+1);		// 보기 값				
				// 기타				
				var etc = $('[name="etc'+exampleValue+'"]').is(':checked');
				if (etc) {
					var setExampleOptionObject = new Object();
					setExampleOptionObject.functionType = 'option';
					setExampleOptionObject.functionText = "ETC:" + exampleValue;
					//console.log('setExampleOptionObject.functionText ETC',setExampleOptionObject);
					//console.log('exampleOptionCnt',exampleOptionCnt);
					listSlFunctionQuestion[exampleOptionCnt++] = setExampleOptionObject;	// 기타인 경우 삽입					
					//console.log('listSlFunctionQuestion',listSlFunctionQuestion);
					//console.log('exampleOptionCnt',exampleOptionCnt);
					
					// 한글
					var onlykorean = $('[name="onlykorean'+exampleValue+'"]').is(':checked');
					if (onlykorean) {
						var setExampleOptionObject = new Object();
						setExampleOptionObject.functionType = 'option';
						setExampleOptionObject.functionText = "onlykorean";
						//console.log('setExampleOptionObject.functionText onlykorean',setExampleOptionObject);
						listSlFunctionQuestion[exampleOptionCnt++] = setExampleOptionObject;	// 한글 경우 삽입
						//console.log('exampleOptionCnt',exampleOptionCnt);
					}
					// 영문
					var onlyenglish = $('[name="onlyenglish'+exampleValue+'"]').is(':checked');
					if (onlyenglish) {
						var setExampleOptionObject = new Object();
						setExampleOptionObject.functionType = 'option';
						setExampleOptionObject.functionText = "onlyenglish";
						//console.log('setExampleOptionObject.functionText onlyenglish',setExampleOptionObject);
						listSlFunctionQuestion[exampleOptionCnt++] = setExampleOptionObject;	// 영문 경우 삽입
						//console.log('exampleOptionCnt',exampleOptionCnt);
					}
					// 숫자
					var onlynumber = $('[name="onlynumber'+exampleValue+'"]').is(':checked');
					if (onlynumber) {
						var setExampleOptionObject = new Object();
						setExampleOptionObject.functionType = 'option';
						setExampleOptionObject.functionText = "onlynumber";
						//console.log('setExampleOptionObject.functionText onlynumber',setExampleOptionObject);
						listSlFunctionQuestion[exampleOptionCnt++] = setExampleOptionObject;	// 숫자 경우 삽입
						//console.log('exampleOptionCnt',exampleOptionCnt);
					}
					// 이메일
					var onlyemail = $('[name="onlyemail'+exampleValue+'"]').is(':checked');
					if (onlyemail) {
						var setExampleOptionObject = new Object();
						setExampleOptionObject.functionType = 'option';
						setExampleOptionObject.functionText = "onlyemail";
						//console.log('setExampleOptionObject.functionText onlyemail',setExampleOptionObject);
						listSlFunctionQuestion[exampleOptionCnt++] = setExampleOptionObject;	// 이메일 경우 삽입
						//console.log('exampleOptionCnt',exampleOptionCnt);
					}
					/*
					// 입력제어 삽입
					var inputControl = $('[name="inputControl'+exampleValue+'"]').is(':checked');
					if (inputControl) {				
						var inputControlValue = $('[name="inputControl'+exampleValue+'"]:checked').val();
						var setExampleOptionObject = new Object();
						setExampleOptionObject.functionType = 'option';
						setExampleOptionObject.functionText = inputControlValue;
						//console.log('setExampleOptionObject.functionText etcNotExist',setExampleOptionObject);
						listSlFunctionQuestion[exampleOptionCnt++] = setExampleOptionObject;	// 입력제어 삽입	
						//console.log('listSlFunctionQuestion['+exampleOptionCnt+']',listSlFunctionQuestion[exampleOptionCnt]);
						//console.log('exampleOptionCnt',exampleOptionCnt);
					}
					*/
					// 기타 특수문자포함
					var onlytext = $('[name="onlytext'+exampleValue+'"]').is(':checked');
					if (onlytext) {				
						var setExampleOptionObject = new Object();
						setExampleOptionObject.functionType = 'option';
						setExampleOptionObject.functionText = "onlytext";
						//console.log('setExampleOptionObject.functionText etcNotExist',setExampleOptionObject);
						listSlFunctionQuestion[exampleOptionCnt++] = setExampleOptionObject;	// 특수문자포함 경우 삽입	
						//console.log('listSlFunctionQuestion['+exampleOptionCnt+']',listSlFunctionQuestion[exampleOptionCnt]);
						//console.log('exampleOptionCnt',exampleOptionCnt);
					}
					
					// 기타 이중에없음
					var etcNotExist = $('[name="etcNotExist'+exampleValue+'"]').is(':checked');
					if (etcNotExist) {				
						var setExampleOptionObject = new Object();
						setExampleOptionObject.functionType = 'option';
						setExampleOptionObject.functionText = "989";
						//console.log('setExampleOptionObject.functionText etcNotExist',setExampleOptionObject);
						listSlFunctionQuestion[exampleOptionCnt++] = setExampleOptionObject;	// 이중에없음 경우 삽입	
						//console.log('listSlFunctionQuestion['+exampleOptionCnt+']',listSlFunctionQuestion[exampleOptionCnt]);
						//console.log('exampleOptionCnt',exampleOptionCnt);
					}
					
					// 텍스트 크기
					var textWidth = $('[name="textWidth'+exampleValue+'"]').val();	
					if (textWidth > 0) {
						var setLogicObject = new Object();			
						//setLogicObject.questionMove = questionMove;		// 다음이동 사용여부
						setLogicObject.logicType = 'textWidth';				// 로직 타입
						setLogicObject.state = 'Y';							// 로직 상태
						setLogicObject.questionNameBase = questionName;		// 로직 기준 문항
						setLogicObject.exampleNameBase = exampleValue;		// 로직 기준 보기
						setLogicObject.exampleValueBase = textWidth;		// 로직 기준 텍스트 크기 값

						listSlQuestionLogic[logicCnt++] = setLogicObject;	// 다음 이동 설정 값
					}
				}
				// 이중에 없음
				var notExist = $('[name="notExist'+exampleValue+'"]').is(':checked');
				if(notExist) {
					var setExampleOptionObject = new Object();
					setExampleOptionObject.functionType = 'option';
					setExampleOptionObject.functionText = "notExist:" + exampleValue;
					//console.log('setExampleOptionObject.functionText notExist',setExampleOptionObject);
					listSlFunctionQuestion[exampleOptionCnt++] = setExampleOptionObject;	// 보기 이중에없음(notExist)
					//console.log('exampleOptionCnt',exampleOptionCnt);
				}
				
				// 다음이동
				var setLogicObject = new Object();
				var questionMove = $('[name="move'+exampleValue+'"]').is(':checked');
				var logicType = 'move';				
				if(questionMove) {
					console.log('logicCnt',logicCnt);
					var moveQuestion = $('[name="moveQuestion'+exampleValue+'"]').val();				
					//setLogicObject.questionMove = questionMove;		// 다음이동 사용여부
					setLogicObject.logicType = logicType;				// 로직 타입
					setLogicObject.state = 'Y';							// 로직 상태
					setLogicObject.questionNameBase = questionName;		// 로직 기준 문항
					setLogicObject.exampleNameBase = exampleValue;		// 로직 기준 보기
					setLogicObject.exampleValueBase = exampleText;		// 로직 기준 보기 값
					setLogicObject.questionNameTarget = moveQuestion;	// 로직 적용 문항

					listSlQuestionLogic[logicCnt++] = setLogicObject;	// 다음 이동 설정 값
				}								
			});
			
			//console.log('listSlFunctionQuestion',listSlFunctionQuestion);	
			
			// 최소, 최대 순위입력
			minOrd = $('[name="minOrd"]').val();
			maxOrd = $('[name="maxOrd"]').val();			
			// 보기방향, 보기열수
			exampleAlign = $('[name="exampleAlign"] :selected').val();
			exampleAlignCnt = $('[name="exampleAlignCnt"]').val();
			// 보기 뷰, 보기 뷰 옵션
			exampleView = $('[name="exampleView"]').val();
			exampleViewOption = $('[name="exampleViewOption"] :selected').val();
		} else if(questionType == 'num') {	
			// 숫자형
			numHeaderInput = $('#numHeaderInput').val();
			numFooterInput = $('#numFooterInput').val();
			
			//textWidthFooter = $('[name="textWidthFooter"]').val();
			
			//console.log('textWidthHeader > 0',textWidthHeader > 0);
			//console.log('textWidthFooter > 0',textWidthFooter > 0);
			
			// 텍스트 크기
			var textWidth = $('[name="textWidth"]').val();	
			if (textWidth > 0) {
				var setLogicObject = new Object();			
				//setLogicObject.questionMove = questionMove;		// 다음이동 사용여부
				setLogicObject.logicType = 'textWidth';				// 로직 타입
				setLogicObject.state = 'Y';							// 로직 상태
				setLogicObject.questionNameBase = questionName;		// 로직 기준 문항
				setLogicObject.exampleNameBase = exampleValue;		// 로직 기준 보기
				setLogicObject.exampleValueBase = textWidth;		// 로직 기준 텍스트 크기 값

				listSlQuestionLogic[logicCnt++] = setLogicObject;	// 다음 이동 설정 값
			}
			
			/*
			// 앞 텍스트 크기
			if (textWidthHeader > 0) {	
				var setLogicObject = new Object();
				var textWidthHeaderVal = $('[name="textWidthHeader"]').val();				
				//setLogicObject.questionMove = questionMove;		// 다음이동 사용여부
				setLogicObject.logicType = 'textWidthHeader';				// 로직 타입
				setLogicObject.state = 'Y';							// 로직 상태
				setLogicObject.questionNameBase = questionName;		// 로직 기준 문항
				//setLogicObject.exampleNameBase = exampleValue;		// 로직 기준 보기
				setLogicObject.exampleValueBase = textWidthHeaderVal;		// 로직 기준 텍스트 크기 값

				listSlQuestionLogic[logicCnt++] = setLogicObject;	// 다음 이동 설정 값
			}
			
			// 뒤 텍스트 크기
			if (textWidthFooter > 0) {		
				var setLogicObject = new Object();
				var textWidthFooterVal = $('[name="textWidthFooter"]').val();				
				//setLogicObject.questionMove = questionMove;		// 다음이동 사용여부
				setLogicObject.logicType = 'textWidthFooter';				// 로직 타입
				setLogicObject.state = 'Y';							// 로직 상태
				setLogicObject.questionNameBase = questionName;		// 로직 기준 문항
				//setLogicObject.exampleNameBase = exampleValue;		// 로직 기준 보기
				setLogicObject.exampleValueBase = textWidthFooterVal;		// 로직 기준 텍스트 크기 값

				listSlQuestionLogic[logicCnt++] = setLogicObject;	// 다음 이동 설정 값
			}
			*/
		} else if(questionType == 'tex' || questionType == 'textarea') {
			// 오픈형
			
			// 사용자정의 보기( 보기응답의  앞,뒤 내용을 저장 )
			var customExampleSelect = $('[name="customExampleSelect"] :selected').val();
			console.log('customExampleSelect',customExampleSelect);
			if(customExampleSelect != 0) {
				// 사용자정의 보기
				questionOption = 'customExample';		// 문항칼럼에 사용자보기 데이터삽입
				$.each($('.customText'), function(index, value){
					var exampleText = $(this).val();	// 보기 내용
					var exampleLogicText = 'customExample';	// 사용자 보기
					var exampleValue = (index+1);		// 보기 값
					var exampleOrder = (index+1);		// 보기 순서
					var columnName = '';				// 해당 문항번호 
					var pageType = 'base';				// 페이지 타입 기본 base
					
					var setObject = new Object();
					setObject.exampleText = exampleText;
					setObject.exampleLogicText = exampleLogicText;
					setObject.exampleValue = exampleValue;
					setObject.exampleOrder = parseInt(exampleOrder);
					setObject.columnName = columnName;
					setObject.pageType = pageType;
					listSlExample[index] = setObject;
				});
				// 입력제어
				// 한글
				var onlykorean = $('[name="customOnlykorean"]').is(':checked');
				if (onlykorean) {
					var setExampleOptionObject = new Object();
					setExampleOptionObject.functionType = 'option';
					setExampleOptionObject.functionText = "onlykorean";
					//console.log('setExampleOptionObject.functionText onlykorean',setExampleOptionObject);
					listSlFunctionQuestion[exampleOptionCnt++] = setExampleOptionObject;	// 한글 경우 삽입
					//console.log('exampleOptionCnt',exampleOptionCnt);
				}
				// 영문
				var onlyenglish = $('[name="customOnlyenglish"]').is(':checked');
				if (onlyenglish) {
					var setExampleOptionObject = new Object();
					setExampleOptionObject.functionType = 'option';
					setExampleOptionObject.functionText = "onlyenglish";
					//console.log('setExampleOptionObject.functionText onlyenglish',setExampleOptionObject);
					listSlFunctionQuestion[exampleOptionCnt++] = setExampleOptionObject;	// 영문 경우 삽입
					//console.log('exampleOptionCnt',exampleOptionCnt);
				}
				// 숫자
				var onlynumber = $('[name="customOnlynumber"]').is(':checked');
				if (onlynumber) {
					var setExampleOptionObject = new Object();
					setExampleOptionObject.functionType = 'option';
					setExampleOptionObject.functionText = "onlynumber";
					//console.log('setExampleOptionObject.functionText onlynumber',setExampleOptionObject);
					listSlFunctionQuestion[exampleOptionCnt++] = setExampleOptionObject;	// 숫자 경우 삽입
					//console.log('exampleOptionCnt',exampleOptionCnt);
				}
				// 금액
				var onlymoney = $('[name="customOnlymoney"]').is(':checked');
				if (onlymoney) {
					var setExampleOptionObject = new Object();
					setExampleOptionObject.functionType = 'option';
					setExampleOptionObject.functionText = "onlymoney";
					//console.log('setExampleOptionObject.functionText onlynumber',setExampleOptionObject);
					listSlFunctionQuestion[exampleOptionCnt++] = setExampleOptionObject;	// 숫자 경우 삽입
					//console.log('exampleOptionCnt',exampleOptionCnt);
				}
				// 전화번호 
				var onlyphone = $('[name="customOnlyphone"]').is(':checked');
				if (onlyphone) {
					var setExampleOptionObject = new Object();
					setExampleOptionObject.functionType = 'option';
					setExampleOptionObject.functionText = "customOnlyphone";
					//console.log('setExampleOptionObject.functionText onlynumber',setExampleOptionObject);
					listSlFunctionQuestion[exampleOptionCnt++] = setExampleOptionObject;	// 숫자 경우 삽입
					//console.log('exampleOptionCnt',exampleOptionCnt);
				}
				// 이메일 
				var onlyemail = $('[name="customOnlyemail"]').is(':checked');
				if (onlyemail) {
					var setExampleOptionObject = new Object();
					setExampleOptionObject.functionType = 'option';
					setExampleOptionObject.functionText = "customOnlyemail";
					//console.log('setExampleOptionObject.functionText onlynumber',setExampleOptionObject);
					listSlFunctionQuestion[exampleOptionCnt++] = setExampleOptionObject;	// 이메일 경우 삽입
					//console.log('exampleOptionCnt',exampleOptionCnt);
				}
				// 기타 특수문자포함
				var onlytext = $('[name="customOnlytext"]').is(':checked');
				if (onlytext) {				
					var setExampleOptionObject = new Object();
					setExampleOptionObject.functionType = 'option';
					setExampleOptionObject.functionText = "onlytext";
					//console.log('setExampleOptionObject.functionText etcNotExist',setExampleOptionObject);
					listSlFunctionQuestion[exampleOptionCnt++] = setExampleOptionObject;	// 특수문자포함 경우 삽입
					//console.log('exampleOptionCnt',exampleOptionCnt);
				}
				
				// 텍스트 크기
				var customTextWidth = $('[name="customTextWidth"]').val();	
				if (customTextWidth > 0) {
					var setLogicObject = new Object();			
					//setLogicObject.questionMove = questionMove;		// 다음이동 사용여부
					setLogicObject.logicType = 'customTextWidth';		// 로직 타입
					setLogicObject.state = 'Y';							// 로직 상태
					setLogicObject.questionNameBase = questionName;		// 로직 기준 문항
					setLogicObject.exampleNameBase = exampleValue;		// 로직 기준 보기
					setLogicObject.exampleValueBase = customTextWidth;	// 로직 기준 텍스트 크기 값

					listSlQuestionLogic[logicCnt++] = setLogicObject;	// 다음 이동 설정 값
				}
			} else {
				// 일반 보기
				$.each($('.exampleInput'), function(index, value){
					//console.log('index',index);
					//console.log('value',value);
					var exampleText = $(this).val();	// 보기 내용
					var exampleValue = (index+1);		// 보기 값
					var exampleOrder = 0;				// 보기 순서
					var columnName = '';				// 해당 문항번호 
					var pageType = 'base';				// 페이지 타입 기본 base
					if(questionType != 'sin'){
						// 단일응답 제외한 모든 문항
						exampleOrder = (index+1);
					} else if(questionType == 'sin'){
						//단일응답만
						columnName = questionName;
					}
					
					var setObject = new Object();				
					// # 값 구분 저장
					if(exampleText.indexOf("#") != -1){
						// 보기 값 저장
						var exampleTextArray = exampleText.split("#");
						setObject.exampleText = exampleTextArray[0];
						setObject.exampleLogicText = '#' + exampleTextArray[1];
						//console.log('exampleTextArray[0]',exampleTextArray[0]);
						// 조회 문항_번호	exampleArray[0]
						// 조회 값		exampleArray[1]	
						var exampleArray = exampleTextArray[1].split("=");	// # 로직 저장
						//console.log('exampleArray[0]',exampleArray[0]);
						//console.log('exampleArray[1]',exampleArray[1]);
						var setLogicObject = new Object();					
						setLogicObject.logicType = '#';						// 로직 타입
						setLogicObject.state = 'Y';							// 로직 상태
						setLogicObject.questionNameBase = questionName;		// 기준 문항 이름
						setLogicObject.exampleNameBase = exampleValue;		// 기준 문항 값
						setLogicObject.questionNameTarget = exampleArray[0];// 조회할 문항_번호
						setLogicObject.exampleNameTarget = exampleArray[1];	// 조회할 값
	
						listSlQuestionLogic[logicCnt++] = setLogicObject;	// 다음 이동 설정 값
					} else {
						setObject.exampleText = exampleText;
					}			
					
					//setObject.exampleText = exampleText;
					setObject.exampleValue = exampleValue;
					setObject.exampleOrder = parseInt(exampleOrder);
					setObject.columnName = columnName;
					setObject.pageType = pageType;
					listSlExample[index] = setObject;
				});
				
				// 한글
				var onlykorean = $('[name="onlykorean"]').is(':checked');
				if (onlykorean) {
					var setExampleOptionObject = new Object();
					setExampleOptionObject.functionType = 'option';
					setExampleOptionObject.functionText = "onlykorean";
					//console.log('setExampleOptionObject.functionText onlykorean',setExampleOptionObject);
					listSlFunctionQuestion[exampleOptionCnt++] = setExampleOptionObject;	// 한글 경우 삽입
					//console.log('exampleOptionCnt',exampleOptionCnt);
				}
				// 영문
				var onlyenglish = $('[name="onlyenglish"]').is(':checked');
				if (onlyenglish) {
					var setExampleOptionObject = new Object();
					setExampleOptionObject.functionType = 'option';
					setExampleOptionObject.functionText = "onlyenglish";
					//console.log('setExampleOptionObject.functionText onlyenglish',setExampleOptionObject);
					listSlFunctionQuestion[exampleOptionCnt++] = setExampleOptionObject;	// 영문 경우 삽입
					//console.log('exampleOptionCnt',exampleOptionCnt);
				}
				// 숫자
				var onlynumber = $('[name="onlynumber"]').is(':checked');
				if (onlynumber) {
					var setExampleOptionObject = new Object();
					setExampleOptionObject.functionType = 'option';
					setExampleOptionObject.functionText = "onlynumber";
					//console.log('setExampleOptionObject.functionText onlynumber',setExampleOptionObject);
					listSlFunctionQuestion[exampleOptionCnt++] = setExampleOptionObject;	// 숫자 경우 삽입
					//console.log('exampleOptionCnt',exampleOptionCnt);
				}
				// 금액
				var onlymoney = $('[name="onlymoney"]').is(':checked');
				if (onlymoney) {
					var setExampleOptionObject = new Object();
					setExampleOptionObject.functionType = 'option';
					setExampleOptionObject.functionText = "onlymoney";
					//console.log('setExampleOptionObject.functionText onlynumber',setExampleOptionObject);
					listSlFunctionQuestion[exampleOptionCnt++] = setExampleOptionObject;	// 숫자 경우 삽입
					//console.log('exampleOptionCnt',exampleOptionCnt);
				}
				// 전화번호 
				var onlyphone = $('[name="onlyphone"]').is(':checked');
				if (onlyphone) {
					var setExampleOptionObject = new Object();
					setExampleOptionObject.functionType = 'option';
					setExampleOptionObject.functionText = "onlyphone";
					//console.log('setExampleOptionObject.functionText onlynumber',setExampleOptionObject);
					listSlFunctionQuestion[exampleOptionCnt++] = setExampleOptionObject;	// 숫자 경우 삽입
					//console.log('exampleOptionCnt',exampleOptionCnt);
				}
				// 이메일 
				var onlyemail = $('[name="onlyemail"]').is(':checked');
				if (onlyemail) {
					var setExampleOptionObject = new Object();
					setExampleOptionObject.functionType = 'option';
					setExampleOptionObject.functionText = "onlyemail";
					//console.log('setExampleOptionObject.functionText onlynumber',setExampleOptionObject);
					listSlFunctionQuestion[exampleOptionCnt++] = setExampleOptionObject;	// 이메일 경우 삽입
					//console.log('exampleOptionCnt',exampleOptionCnt);
				}
				/*
				// 입력제어 삽입
				var inputControl = $('[name="inputControl"]').is(':checked');
				if (inputControl) {				
					var inputControlValue = $('[name="inputControl"]:checked').val();
					var setExampleOptionObject = new Object();
					setExampleOptionObject.functionType = 'option';
					setExampleOptionObject.functionText = inputControlValue;
					//console.log('setExampleOptionObject.functionText etcNotExist',setExampleOptionObject);
					listSlFunctionQuestion[exampleOptionCnt++] = setExampleOptionObject;	// 입력제어 삽입				
					//console.log('exampleOptionCnt',exampleOptionCnt);
				}
				*/
				// 기타 특수문자포함
				var onlytext = $('[name="onlytext"]').is(':checked');
				if (onlytext) {				
					var setExampleOptionObject = new Object();
					setExampleOptionObject.functionType = 'option';
					setExampleOptionObject.functionText = "onlytext";
					//console.log('setExampleOptionObject.functionText etcNotExist',setExampleOptionObject);
					listSlFunctionQuestion[exampleOptionCnt++] = setExampleOptionObject;	// 특수문자포함 경우 삽입
					//console.log('exampleOptionCnt',exampleOptionCnt);
				}
				
				// 텍스트 크기
				var textWidth = $('[name="textWidth"]').val();	
				if (textWidth > 0) {
					var setLogicObject = new Object();			
					//setLogicObject.questionMove = questionMove;		// 다음이동 사용여부
					setLogicObject.logicType = 'textWidth';				// 로직 타입
					setLogicObject.state = 'Y';							// 로직 상태
					setLogicObject.questionNameBase = questionName;		// 로직 기준 문항
					setLogicObject.exampleNameBase = exampleValue;		// 로직 기준 보기
					setLogicObject.exampleValueBase = textWidth;		// 로직 기준 텍스트 크기 값

					listSlQuestionLogic[logicCnt++] = setLogicObject;	// 다음 이동 설정 값
				}
			}
		} else if(questionType == 'att') {
			// 속성형			
			$.each($('.exampleInput'), function(index, value){
				//console.log('index',index);
				//console.log('value',value);
				var exampleText = $(this).val();	// 보기 내용
				var exampleValue = (index+1);		// 보기 값
				var exampleOrder = 0;				// 보기 순서
				var columnName = '';				// 해당 문항번호 
				var pageType = 'base';				// 페이지 타입 기본 base
				if(questionType != 'sin'){
					// 단일응답 제외한 모든 문항
					exampleOrder = (index+1);
				} else if(questionType == 'sin'){
					//단일응답만
					columnName = questionName;
				}
				
				var setObject = new Object();			
				setObject.exampleText = exampleText;
				setObject.exampleValue = exampleValue;
				setObject.exampleOrder = parseInt(exampleOrder);
				setObject.columnName = columnName;
				setObject.pageType = pageType;
				listSlExample[index] = setObject;
			});
			
			// 구분값 삽입 ($$@@$$)
			var exampleLength = listSlExample.length;
			var exampleText = "$$@@$$";				// 보기 내용
			var exampleValue = (exampleLength+1);	// 보기 값
			var exampleOrder = 0;					// 보기 순서
			var columnName = '';					// 해당 문항번호 
			var pageType = 'base';					// 페이지 타입 기본 base
			if(questionType != 'sin'){
				// 단일응답 제외한 모든 문항
				exampleOrder = (exampleLength+1);
			} else if(questionType == 'sin'){
				//단일응답만
				columnName = questionName;
			}
			var setObject = new Object();			
			setObject.exampleText = exampleText;
			setObject.exampleValue = exampleValue;
			setObject.exampleOrder = parseInt(exampleOrder);
			setObject.columnName = columnName;
			setObject.pageType = pageType;
			listSlExample[exampleLength] = setObject;
			exampleLength += 2;	// 보기 + $$@@$$ 의 길이
			
			// 속성
			//var exampleOptionCnt = 0;	// 보기옵션 cnt
			$.each($('.exampleAttInput'), function(index, value){
				//console.log('index',index);
				//console.log('value',value);
				var exampleAttText = $(this).val();			// 보기 내용
				var exampleAttValue = exampleLength+index;	// 보기 값
				var exampleAttOrder = 0;					// 보기 순서
				var columnName = '';						// 해당 문항번호 
				var pageType = 'base';						// 페이지 타입 기본 base
				if(questionType != 'sin'){
					// 단일응답 제외한 모든 문항
					exampleAttOrder = (exampleLength+index);
				} else if(questionType == 'sin'){
					//단일응답만
					columnName = questionName;
				}
				
				var setObject = new Object();			
				setObject.exampleText = exampleAttText;
				setObject.exampleValue = exampleAttValue;
				setObject.exampleOrder = parseInt(exampleAttOrder);
				setObject.columnName = columnName;
				setObject.pageType = pageType;
				listSlExample[exampleLength+(index-1)] = setObject;
				
				// 보기옵션 
				var exampleValue = (index+1);		// 보기 값				
				// 기타				
				var attEtc = $('[name="attEtc'+exampleValue+'"]').is(':checked');
				if (attEtc) {
					var setExampleOptionObject = new Object();
					setExampleOptionObject.functionType = 'option';
					setExampleOptionObject.functionText = "ETC:" + exampleValue;
					//console.log('setExampleOptionObject.functionText ETC',setExampleOptionObject);
					//console.log('exampleOptionCnt',exampleOptionCnt);
					listSlFunctionQuestion[exampleOptionCnt++] = setExampleOptionObject;	// 기타인 경우 삽입					
					//console.log('listSlFunctionQuestion',listSlFunctionQuestion);
					//console.log('exampleOptionCnt',exampleOptionCnt);
				}
				
				// 텍스트 크기
				var attTextWidth = $('[name="attTextWidth'+exampleValue+'"]').val();
				if (attTextWidth > 0) {
					var setLogicObject = new Object();
					//setLogicObject.questionMove = questionMove;		// 다음이동 사용여부
					setLogicObject.logicType = 'attTextWidth';			// 로직 타입
					setLogicObject.state = 'Y';							// 로직 상태
					setLogicObject.questionNameBase = questionName;		// 로직 기준 문항
					setLogicObject.exampleNameBase = exampleValue;		// 로직 기준 보기
					setLogicObject.exampleValueBase = attTextWidth;		// 로직 기준 텍스트 크기 값

					listSlQuestionLogic[logicCnt++] = setLogicObject;	// 다음 이동 설정 값
				}
			});
			// 속성형 옵션
			var attQuetionOption = $('[name="attQuetionOption"] :selected').val();
			var attResponseOption = $('[name="attResponseOption"] :selected').val();			
			var setExampleOptionObject = new Object();
			
			if(attResponseOption == "sin"){				
				setExampleOptionObject.functionType = 'option';
				setExampleOptionObject.functionText = attQuetionOption;
				listSlFunctionQuestion[exampleOptionCnt++] = setExampleOptionObject;
			} else if(attResponseOption == "mul"){
				attQuetionOption = attQuetionOption + attResponseOption
				setExampleOptionObject.functionType = 'option';
				setExampleOptionObject.functionText = attQuetionOption;
				listSlFunctionQuestion[exampleOptionCnt++] = setExampleOptionObject;
			}
			
			console.log('attResponseOption',attResponseOption);
			console.log('attQuetionOption',attQuetionOption);
			
		} else if(questionType == 'info') {	
			// 안내형		
			//$.each($('.exampleInput'), function(index, value){
				var exampleText = smartEditor4;		// 안내 내용
				var exampleValue = 1;		// 보기 값
				var exampleOrder = 0;				// 보기 순서
				var columnName = '';				// 해당 문항번호 
				var pageType = 'base';				// 페이지 타입 기본 base
				if(questionType != 'sin'){
					// 단일응답 제외한 모든 문항
					exampleOrder = 1;
				} else if(questionType == 'sin'){
					//단일응답만
					columnName = questionName;
				}
				
				var setObject = new Object();			
				setObject.exampleText = exampleText;
				setObject.exampleValue = exampleValue;
				setObject.exampleOrder = parseInt(exampleOrder);
				setObject.columnName = columnName;
				setObject.pageType = pageType;
				listSlExample[0] = setObject;
			//});
		} else if(questionType == 'media') {
			// 동영상
			var mediaurl = $('[name="mediaurl"]').val();
			var mediatimer = $('[name="mediatimer"]').val();			
			if(mediaurl != null) {
				var setExampleOptionObject = new Object();
				setExampleOptionObject.functionType = 'option';
				setExampleOptionObject.functionText = "mediaurl:" + mediaurl;
				listSlFunctionQuestion[exampleOptionCnt++] = setExampleOptionObject;
			} 
			if(mediatimer != null) {
				var setExampleOptionObject = new Object();
				setExampleOptionObject.functionType = 'option';
				setExampleOptionObject.functionText = "mediatimer:" + mediatimer;
				listSlFunctionQuestion[exampleOptionCnt++] = setExampleOptionObject;
			}
		}
		
		// 이전응답내용
		var previousResponse = $('[name="previousResponse"]').val();
		
		// 응답제한시간
		var responseLimit = $('[name="responseLimit"]').val();
		if(responseLimit != null && responseLimit != '') {
			var setExampleOptionObject = new Object();
			setExampleOptionObject.functionType = 'option';
			setExampleOptionObject.functionText = "timer:" + responseLimit;
			listSlFunctionQuestion[exampleOptionCnt++] = setExampleOptionObject;	// 기타인 경우 삽입
		}
		
		// 문항뷰
		var questionView = $('[name="questionView"]').val();

		// 최종 데이터
		var returnData = {
				projectId : projectId,						// 플젝 id
				questionId : questionId,					// 질문 id
				gubun : gubun,								// 삽입/수정
				questionType : questionType,				// 질문유형 sl_question > questionType
				questionName : questionName,				// 문항번호 sl_question > questionName
				questionOption : questionOption,			// 문항옵션 sl_question > questionOption
				questionHeader : smartEditor1,				// 지문내용 sl_question > questionHeader
				questionTitle : smartEditor2,				// 문항내용 sl_question > questionTitle
				questionFooter : smartEditor3,				// 하단 내용 sl_question > questionFooter
//				smartEditor4 : smartEditor4,				// 안내 내용 sl_example > exampleText
				listSlExample : listSlExample,				// 보기 sl_example
				// 이름 조심
				listSlQuestionFunction : listSlFunctionQuestion,// 보기옵션 sl_question_function
				listSlQuestionLogic : listSlQuestionLogic, 		// -보기로직 sl_questionLogic
//				minOrd : minOrd,							// -최소순위
//				maxOrd : maxOrd,							// -최대순위
//				exampleAlign : exampleAlign,				// -보기방향
//				exampleAlignCnt : exampleAlignCnt,			// -보기열수
//				exampleView : exampleView,					// -보기뷰
//				exampleViewOption : exampleViewOption,		// -보기뷰옵션
//				numHeaderInput : numHeaderInput,			// !!오픈숫자형 앞 문구
//				numFooterInput : numFooterInput,			// !!오픈숫자형 뒤 문구
//				textWidthHeader : textWidthHeader,			// -오픈숫자형 앞 텍스트 크기
//				textWidthFooter : textWidthFooter,			// -오픈숫자형 뒤 텍스트 크기
//				previousResponse : previousResponse,		// -이전응답내용
//				responseLimit : responseLimit				// -응답제한시간
//				questionView : questionView					// -문항뷰
		};
		
		return returnData;
	},
	insertQuestion : function(btnType) {
		var projectId = $('[name="projectId"]').val();
		var questionId = $('[name="questionId"').val();
		console.log('btnType',btnType);
		var checkValidation = questionRegJs.checkValidation();
		console.log('insertQuestion checkValidation',checkValidation);
		
		if(checkValidation){
			var setInsertData = questionRegJs.setData();
			console.log('setInsertData',setInsertData);
			
			loading.show();
			var urlVal = '/project/insertQuestion';
			console.log("urlVal",urlVal);
			$.ajax({
			    url   		: urlVal,
			    type  		: "post",
			    dataType    : "json",
			    contentType : "application/json",
			    data  		: JSON.stringify( setInsertData ),
			    success     : function(responseData){
			    	var insertCheck = false;
			    	console.log("questionRegJs insertQuestion",responseData);			    	
			    	if (null != responseData) {
			    		if(responseData.questionType == "num" || responseData.questionType == "tex" || responseData.questionType == "textarea" || responseData.questionType == "info" || responseData.questionType == "media") {
			    			if(responseData.webInsertSlQuestion) {
			    				insertCheck = true;
			    			}
			    		} else {
			    			if(responseData.webInsertSlQuestion && responseData.webInsertSlExample) {
			    				insertCheck = true;
			    			}
			    		}
			    		console.log('insertCheck',insertCheck);
			    		if (insertCheck) {
			    			alert('등록 성공');
			    			if(btnType != 'continue') {
			    				location.href='/question/questionList?projectId='+projectId;
			    			} else {
			    				location.href='/question/questionReg?gubun=insert&projectId='+projectId+'&questionId=0';
			    			}
			    		}
			    	}
			    	loading.hide();
			    },
			    error : function(e){
			    	//console.log("error",e);
			    	loading.hide();
			    }
			});
			
		}
	},
	updateQuestion : function(){
		var projectId = $('[name="projectId"]').val();
		var questionId = $('[name="questionId"').val();
		
		var checkValidation = questionRegJs.checkValidation();
		console.log('updateQuestion checkValidation',checkValidation);
		
		if(checkValidation){
			var setUpdateData = questionRegJs.setData();
			console.log('setUpdateData',setUpdateData);
			
			loading.show();
			var urlVal = '/project/updateQuestion';
			console.log("urlVal",urlVal);
			$.ajax({
			    url   		: urlVal,
			    type  		: "post",
			    dataType    : "json",
			    contentType : "application/json",
			    data  		: JSON.stringify( setUpdateData ),
			    success     : function(responseData){
			    	var updateCheck = false;
			    	console.log("questionRegJs updateQuestion",responseData);
			    	if (null != responseData) {
			    		if(responseData.questionType == "num" 
			    			|| responseData.questionType == "tex" 
			    			|| responseData.questionType == "textarea" 
			    			|| responseData.questionType == "info"
			    			|| responseData.questionType == "media") {
			    			if(responseData.webUpdateSlQuestion) {
			    				updateCheck = true;
			    			}
			    		} else {
			    			if (responseData.webUpdateSlQuestion && responseData.webDeleteSlExample && responseData.webInsertSlExample) {			    		
			    				updateCheck = true;
			    			}
			    		}
			    		console.log('updateCheck',updateCheck);
			    		if(updateCheck) {
			    			alert('수정 성공');
			    			location.href='/question/questionList?projectId='+projectId;
			    		}
			    	}
			    	loading.hide();
			    },
			    error : function(e){
			    	//console.log("error",e);
			    	loading.hide();
			    }
			});
			
		}
	}
}

$(function(){
	questionRegJs.init();
});