
var loading = "";
var rotationJs = {
		
	init : function(){		
		loading = $('<div id="loading" class="loading"></div><img id="loading_img" alt="loading" src="/resources/img/loading2.gif" />').appendTo(document.body).hide();
		rotationJs.btEvent();		// set button event
		rotationJs.getRotation();	// get rotation info
	},
	btEvent : function () {
		$('#bt_eRotInsert1').on('click',function(){ $('#rotationType').val('eRot'); });
		$('#bt_qRotInsert2').on('click',function(){ $('#rotationType').val('qRot'); });
		$('#bt_qRotInsert3').on('click',function(){ $('#rotationType').val('qRotPart'); });
		$('#bt_insertRotation').on('click',function(){ rotationJs.setRotation(); });
		$('[name="bt_cancel"]').on('click',function(){ location.href='/project/projectList'; });
	},
	getRotation : function () {
		loading.show();
		var projectId = $('[name="projectId"]').val();
		var urlVal = localhost+'/rotation/getRotation';
		$.ajax({
			url   		: urlVal,
			type  		: "post",
			dataType    : "json",
			contentType : "application/json",
			async		: false,
			data  		: JSON.stringify( {projectId:projectId} ),
			success     : function(responseData){
				console.log("getRotation data",responseData);
				if (null != responseData) {
					rotationJs.setQuestionHtml(responseData);
					rotationJs.setInitialization();					
				}				
			},
			error : function(e){
				loading.hide();
			}			
		});
		
	},
	setQuestionHtml : function (data) {
		
		if (null != data.listSlQuestion) {
			
			var listSlQuestion = data.listSlQuestion;
			var listSlQuestionLen = data.listSlQuestion.length;
			var listSlQuestionViewPage = data.listSlQuestionViewPage;
			var listSlRotationMain = data.listSlRotationMain;
			
			rotationJs.setQuestionListHtml(listSlQuestion, listSlQuestionViewPage, listSlRotationMain);
			
			var listSlRotationPart = data.listSlRotationPart;
			if (null != listSlRotationPart && 0 < listSlRotationPart.length) {
				
				var slRotationPartLen = listSlRotationPart.length;
				var setPartOptionHtml = '';
				var setPOptionIndex = 1;
				var setPOptionHtml = '';
				$.each(listSlRotationPart,function(index,value){
					var rotPartId = value.rotPartId;
					var rotPartTitle = value.rotPartTitle;
					//var projectId = value.projectId;
					
					if (0 == index) {
						setPOptionHtml = setPOptionHtml + '<option value="">select</option>';
					}
					setPOptionHtml = setPOptionHtml + '<option value="'+ setPOptionIndex +'">'+ setPOptionIndex +'</option>';
					setPOptionIndex++;
					setPartOptionHtml = setPartOptionHtml + '<option value="'+ rotPartId +'" >'+ rotPartTitle +'</option>';
				});
				
				$('#selPartCount').html(setPOptionHtml);	// set html selectbox option '문항 로테이션(파트) 설정' > '메인 문항 선택'
				
				$('#selPartCount').on('change',function(){	// selectbox option 변경 시 '문항 로테이션(파트) 설정' > '메인 문항 선택'
					var selectedValue = $(this).val();
					// set Html question selectbox '문항 로테이션(파트) 설정' > '로테이션(파트) 리스트 선택'
					console.log('setExampleHtml selPartCount change',setPartOptionHtml);
					rotationJs.setSelectboxQuestion('partRotationSelList','selPartRotaion',selectedValue,setPartOptionHtml);
				});
			}
			
			$('[name^="viewLotation"]').on('click',function(){	// click question list
				var questionName = $(this).attr('viewName');
				var questionId = $(this).attr('viewQId');
				var questionType = $(this).attr('viewQType');
				
				if (null != questionName && '' != questionName
						&& null != questionId && '' != questionId) {
					
					$('#rotationHtml').css('display','');	// show rotationHtml
					
					$('#selExamMainQuestionList').val(questionName);	// '보기 로테이션' > '메인 문항 선택'
					$('#selLotMainQuestionList').val(questionName);		// '문항 로테이션(파트) 설정' > '메인 문항 선택'
					// set Html '보기 로테이션' > '보기 선택'
					rotationJs.setExampleHtml(questionId, questionName, questionType, listSlQuestion, listSlRotationMain);
				}
			});
			
			$('#bt_eRotInsert1, #bt_qRotInsert2, #bt_qRotInsert3').on('click',function(){	// click rotation tab
				rotationJs.setQuestionListHtml(listSlQuestion, listSlQuestionViewPage, listSlRotationMain);
			});
			
			// set Html (save rotation list)
			rotationJs.setRotationList(listSlRotationMain, listSlRotationPart);
		}
		
	},
	setQuestionListHtml : function (listSlQuestion, listSlQuestionViewPage, listSlRotationMain) {
		console.log('setQuestionListHtml');
		
		var rotationType = $('#rotationType').val();
		
		// 문항 리스트 초기화
		$('#questionList').html('');
		var setQuestionHtml = "";
		
		var setOptionIndex = 1;				// '로테이션 문항 수' option value
		var setOptionHtml = '';				// '로테이션 문항 수' option html
		var setQuestionOptionHtml = '';		// '메인 문항 선택' option html
		
		var setQuestionIndex = 0;			// 'p' 기능 페이지 구분 (실제 페이지 번호)
		
		$.each(listSlQuestion, function(index, value){

			var questionId = value.questionId;
			var questionName = value.questionName;
			
			var checkSlQuestionViewPage = false;
			if ('eRot' == rotationType) {
				$.each(listSlQuestionViewPage, function(index2, value2){	// 'p' 기능 리스트 
					var pageTitleQuestionId = value2.pageTitleQuestionId;
					var pageTitleQuestionName = value2.pageTitleQuestionName;
					
					if (questionId == pageTitleQuestionId && questionName==pageTitleQuestionName) {
						setQuestionIndex = index2 + 1;		// listSlQuestionViewPage 와 일치 시 인덱스 증가
					}
				});
				checkSlQuestionViewPage = true;
			} else {
				
				$.each(listSlQuestionViewPage, function(index2, value2){	// 'p' 기능 리스트 
					var pageTitleQuestionId = value2.pageTitleQuestionId;
					var pageTitleQuestionName = value2.pageTitleQuestionName;
					
					if (questionId == pageTitleQuestionId && questionName==pageTitleQuestionName) {
						setQuestionIndex = index2 + 1;		// listSlQuestionViewPage 와 일치 시 인덱스 증가
						checkSlQuestionViewPage = true;
					}
				});
			}
			
			if (checkSlQuestionViewPage) {
				
				var rotEType = false;		// 보기 로테이션 구분
				var rotQType = false;		// 문항 로에치션 구분
				var rotMainType = false;	// main type
				var rotSubType = false;		// sub type
				$.each(listSlRotationMain, function(index2, value2){	// chekc question main, sub
					var rotMainQuestionId = value2.rotMainQuestionId;
					var rotMainQuestionName = value2.rotMainQuestionName;
					var rotMainType2 = value2.rotMainType;
					
					// rotMainType = eRot:보기, qRot:로테이션, qRotPart:문항
					if (questionId == rotMainQuestionId && questionName == rotMainQuestionName) {
						if ('eRot' == rotMainType2) {
							rotEType = true;
							rotMainType = true;
						} else if ('qRotPart' == rotMainType2) {
							rotQType = true;
							rotMainType = true;
						}
						
					} else {
						
						var listSlRotationPart = value2.listSlRotationPart;
						if (null != listSlRotationPart && 0 < listSlRotationPart.length) {
							
							$.each(listSlRotationPart, function(index3, value3){
								
								var listSlRotationQuestion = value3.listSlRotationQuestion;
								if (null != listSlRotationQuestion && 0 < listSlRotationQuestion.length) {
									
									$.each(listSlRotationQuestion, function(index4, value4){
										
										var rotQuestionId2 = value4.rotQuestionId;
										var rotQuestionName2 = value4.rotQuestionName;
										if (questionId == rotQuestionId2 && questionName == rotQuestionName2) {	// check sub
											rotQType = true;
											rotSubType = true;
										}
									});
								}
							});
						}
					}
				});
				
				if ('QQ' != questionName) {
					
					var questionTitle = value.questionTitle;
					var questionType = value.questionType;
					
					var completionHtml = '';	// 보기, 문항 style class 구분
					var signClass = '';			// main, sub style class 구분
					var signText = '';			// main, sub text 구분
					if (rotEType) { completionHtml = 'randomCompletion'; }
					if (rotQType) { completionHtml = 'viewCompletion'; }
					if (rotMainType) { signClass = 'signM'; signText = 'M';}
					if (rotSubType) { signClass = 'signS'; signText = 'S'}
					
					setQuestionHtml = setQuestionHtml + '<dd>'							
					+ '	<div>'
					//+ '		<div class="viewCompletion"><b>SQ1</b></div>'
					+ '		<div class="'+ completionHtml +'"><b>'+ questionName +'</b></div>'
					+ '		<div name="viewLotation_'+ index +'" viewName="'+ questionName +'" viewQId="'+ questionId +'" viewQType="'+ questionType +'">[P'+ setQuestionIndex +','+ questionType +'] '+ questionTitle +'</div>'	
					+ '		<div>'
					//+ '			<div class="signS">S</div>'
					+ '			<div class="'+ signClass +'">'+ signText +'</div>'
					+ '		</div>'
					+ '	</div>'
					+ '</dd>';
					
					if (0 == index) {
						setOptionHtml = setOptionHtml + '<option value="">select</option>';
					}
					setOptionHtml = setOptionHtml + '<option value="'+ setOptionIndex +'">'+ setOptionIndex +'</option>';
					setOptionIndex++;
					
					setQuestionOptionHtml = setQuestionOptionHtml + '<option value="'+ questionName +'" qId="'+ questionId +'" qtype="'+ questionType +'">'+ questionName +'</option>';
				}
			}
		});	// listSlQuestion each listSlQuestion
		
		$('#questionList').html(setQuestionHtml);	// set Html '문항 리스트'
		
		$('#selExamMainQuestionList').html(setQuestionOptionHtml);	// set Html '메인 문항 선택(보기 로테이션)'
		$('#selLotMainQuestionList').html(setQuestionOptionHtml);	// set Html '메인 문항 선택(문항 로테이션, 파트)'
		
		rotationJs.setExampleRotationEvent(listSlQuestion, listSlRotationMain);		// set html '보기 로테이션' > '보기 선택'
		
		$('#selQuestionCount').html(setOptionHtml);		// set selectbox option '문항 로테이션 등록' > '로테이션 문항 수 선택'
		
		$('#selQuestionCount').on('change',function(){	// '문항 로테이션 등록' > '로테이션 문항 수 선택' 변경 시
			var selectedValue = $(this).val();
			// set Html question selectbox '문항 로테이션 등록' > '로테이션 문항 선택'
			rotationJs.setSelectboxQuestion('rotationSelList','selQuestionList',selectedValue,setQuestionOptionHtml);
		});
	},
	setExampleRotationEvent : function (listSlQuestion, listSlRotationMain, listSlRotationPart) {
		
		// 로드 시  set '보기로테이션' > '메인 문항 선택' html 
		var eQuestionName = $('#selExamMainQuestionList option:selected').val();
		var eQuestionId = $('#selExamMainQuestionList option:selected').attr('qid');
		var eQuestionType = $('#selExamMainQuestionList option:selected').attr('qtype');
		if (null != eQuestionName && '' != eQuestionName
			&& null != eQuestionId && '' != eQuestionId) {
			// '보기 로테이션' > '보기선택' set Html
			rotationJs.setExampleHtml(eQuestionId, eQuestionName, eQuestionType, listSlQuestion, listSlRotationMain, listSlRotationPart);
		}
		
		$('#selExamMainQuestionList').on('change',function(){	// '메인 문항 선택' (보기로테이션) 변경 시
			
			var questionId = $(this).children('option:selected').attr('qid');
			var questionType = $(this).children('option:selected').attr('qtype');
			var questionName = $(this).val();
			// '보기 로테이션' > '보기선택' set Html
			rotationJs.setExampleHtml(questionId, questionName, questionType, listSlQuestion, listSlRotationMain, listSlRotationPart);
		});
	},
	// set Html question selectbox 
	setSelectboxQuestion : function (setHtmlId, setSelectId, choiceCount, setQuestionOptionHtml) {
		
		var setChoiceListHtml = '';
		for (var i=1; i<=choiceCount; i++) {
			
			setChoiceListHtml = setChoiceListHtml + '<div>'	
				+'	<select id="'+ setSelectId +'_'+ i +'" name="'+ setSelectId +'_'+ i +'">'
				+		setQuestionOptionHtml
				+'	</select>'
				+'</div>';
		}
		$('#'+setHtmlId).html(setChoiceListHtml);
	},
	setExampleHtml : function (qId, qName, qType, listData, listSlRotationMain) {
		
		// 일치하는 문항 정보 추가 삽입
		var listSlExample = rotationJs.setExample(qId, qName, listData);
		//console.log('selQuestionCount listSlExample',listSlExample);
		
		var setHtml = '';
		if (null != listSlExample) {
			$.each(listSlExample,function(index,value){
				
				var questionId = value.questionId;
				var questionName = value.questionName;
				var questionType = value.questionType;
				var exampleId = value.exampleId;
				var exampleValue = value.exampleValue;
				var exampleText = value.exampleText;
				var exampleOrder = value.exampleOrder;
				
				if (0 == index) {
					setHtml = setHtml +'	보기 선택';
				}
				
				if ('$$@@$$' == exampleText) {
					
					//setHtml = setHtml +'	<div></div>';
					setHtml = setHtml +'<div style="display:none">'
					+ '	<input type="checkbox" checked="checked" id="eRot_'+ exampleValue +'_'+ questionName +'" name="eRot_'+ exampleValue +'_'+ questionName +'" value="'+ exampleValue +'" eid="'+ exampleId +'" eval="'+ exampleValue +'"etext="'+ exampleText +'" qid="'+ questionId +'" qname="'+ questionName +'" qtype="'+ questionType +'" > '
					+ 	(index+1) +') '+ exampleText
					+ '</div>';
					
				} else {	// set Html '보기 로테이션' > '보기 선택' checkbox 
					
					setHtml = setHtml +'<div>'
					+ '	<input type="checkbox" id="eRot_'+ exampleValue +'_'+ questionName +'" name="eRot_'+ exampleValue +'_'+ questionName +'" value="'+ exampleValue +'" eid="'+ exampleId +'" eval="'+ exampleValue +'"etext="'+ exampleText +'" qid="'+ questionId +'" qname="'+ questionName +'" qtype="'+ questionType +'" > '
					+ 	(index+1) +') '+ exampleText
					+ '</div>';
				}				
			});
			setHtml = setHtml +'<div>'
			+ '	<input type="checkbox" name="allCheck" onclick="rotationJs.allCheck();"> '
			+ ' 전체 체크'
			+ '</div>';
		}
		//console.log('setHtml',setHtml);
		
		$('#exampleCheckList').html(setHtml);	// set Html '보기 로테이션' > '보기 선택'
		$('#questionType').val(qType);			// set hidden questionType
		
		if (null != listSlRotationMain) {
			
			$.each(listSlRotationMain,function(index,value){
				
				var rotMainQuestionId = value.rotMainQuestionId;
				var rotMainQuestionName = value.rotMainQuestionName;
				
				if (qId == rotMainQuestionId && qName == rotMainQuestionName) {
					
					var rotMainType = value.rotMainType;
					var rotMainQuestionType = value.rotMainQuestionType;
					var rotMainTitle = value.rotMainTitle;
					var rotMainSetUser = value.rotMainSetUser;
					
					if ('eRot' == rotMainType) {
						
						$('#eRotMainTitle').val(rotMainTitle);						// set text '보기 로테이션' > '로테이션 명'
						$('#selExamMainQuestionList').val(rotMainQuestionName);		// selected '보기 로테이션' > '메인 문항 선택'
						
						var listSlRotationExample = value.listSlRotationExample;
						if (null != listSlRotationExample) {
							
							$.each(listSlRotationExample,function(eIndex,eValue){
								
								var rotExampleId = eValue.rotExampleId;
								var rotExampleValue = eValue.rotExampleValue;
								$('#eRot_'+ rotExampleValue +'_'+ rotMainQuestionName).attr("checked", true);	// checked '보기 로테이션' > '보기 선택'
							});
						}
						
					} else if ('qRotPart' == rotMainType) {
						
						$('#qRotMainTitle').val(rotMainTitle);
						$('#selLotMainQuestionList').val(rotMainQuestionName);
						
						
						var listSlRotationPart = value.listSlRotationPart;
						if (null != listSlRotationPart && 0 < listSlRotationPart.length) {
							
							var slRotationPartLen = listSlRotationPart.length;
							$('#selPartCount').val(slRotationPartLen);		// set selectbox option '문항 로테이션(파트) 설정' > '로테이션 문항 수 선택'
							
							var setPartOptionHtml = '';
							$.each(listSlRotationPart,function(pIndex1,pValue1){
								var rotPartId = pValue1.rotPartId;
								var rotPartTitle = pValue1.rotPartTitle;
								setPartOptionHtml = setPartOptionHtml + '<option value="'+ rotPartId +'" >'+ rotPartTitle +'</option>';
							});
							// set selectbox option '문항 로테이션 등록' > '로테이션 문항 선택'
							// set Html question selectbox
							console.log('setExampleHtml setPartOptionHtml',setPartOptionHtml);
							rotationJs.setSelectboxQuestion('partRotationSelList','selPartRotaion',slRotationPartLen,setPartOptionHtml);
							
							$.each(listSlRotationPart,function(pIndex2,pValue2){
								var rotPartId = pValue2.rotPartId;
								$('#selPartRotaion_'+ (rotPartId+1)).val(rotPartId);	// selected '문항 로테이션(파트) 설정' > '로테이션 문항 선택'
							});
						}
						
					} else {
						
					}
					
				} else {
					rotationJs.setInitialization();
				}
			});
		}
	},
	// 일치하는 문항 정보 추가 삽입
	setExample : function (qId, qName, listData) {
		//console.log('setExample qId',qId);
		//console.log('setExample qName',qName);
		
		var returnVal = null;
		if (null != listData) {
			
			$.each(listData, function(index, value){
				
				var questionId = value.questionId;
				var questionName = value.questionName;
				var questionType = value.questionType;
				/*console.log('setExample questionId',questionId);
				console.log('setExample questionName',questionName);
				console.log('setExample questionType',questionType);*/
				
				if (qId == questionId && qName == questionName) {
					
					var listSlExample = value.listSlExample;
					if (null != listSlExample) {
						
						$.each(listSlExample, function(index2, value2){
							value2.questionId=questionId;
							value2.questionName=questionName;
							value2.questionType=questionType;
						});
						returnVal = value.listSlExample;
						//console.log('returnVal',returnVal);
					}
				}
			});
		}
		return returnVal;
	},
	setRotation : function () {
		
		var rotationType = $('#rotationType').val();
		var questionType = $('#questionType').val();
		var projectId = $('#projectId').val();
		var rotMainTitle = '';
		
		var rotMainQuestionId = 0;
		var rotMainQuestionName = '';
		var rotMainQuestionType = '';
		
		var listSlRotationExample = new Array();
		var listSlRotationPart = new Array();
		
		if ('eRot' == rotationType) {
			
			rotMainQuestionName = $('[name="selExamMainQuestionList"]').val();
			rotMainQuestionId = $('[name="selExamMainQuestionList"] option:selected').attr('qid');
			rotMainQuestionType = $('[name="selExamMainQuestionList"] option:selected').attr('qtype');
			
			rotMainTitle = $('[name="eRotMainTitle"]').val();
			
			//var listSlRotationExample = new Array();
			/*<input type="checkbox" id="eRot_4_Q2" name="eRot_4_Q2" value="4" eid="12888" eval="4" qid="3381" qname="Q2" qtype="sin">*/
			var rotExampleType = 'q';
			$.each($('input:checkbox[name^="eRot_"]'),function(){
				
				var checkQuestionType = false; 
				
				var rotExampleText = $(this).attr('etext');
				if ('$$@@$$' == rotExampleText) {
					rotExampleType = 'e';
				}
				var slRotationExample = new Object(); 
				var rotExampleId = $(this).attr('eid');
				var rotExampleValue = $(this).val();
				slRotationExample.rotExampleId = rotExampleId;
				slRotationExample.rotExampleValue = rotExampleValue;
				slRotationExample.rotExampleText = rotExampleText;
				slRotationExample.rotExampleType = rotExampleType;
				slRotationExample.projectId = projectId;
				
				var rotExampleChecked = 'N';
				if ($(this).is(':checked')) {
					rotExampleChecked = 'Y';
				} 
				slRotationExample.rotExampleChecked = rotExampleChecked;
				
				listSlRotationExample.push(slRotationExample);
			});
			
		} else if ('qRot' == rotationType) {
			
			rotMainTitle = $('[name="qRotPartTitle"]').val();
			
			var listSlRotationQuestion = new Array();
			$.each($('[name^="selQuestionList"] option:selected'),function(){
				
				var slRotationQuestion = new Object();
				var rotQuestionId = $(this).attr('qid');
				var rotQuestionName = $(this).val();
				var rotQuestionType = $(this).attr('qtype');
				slRotationQuestion.rotQuestionId = rotQuestionId;
				slRotationQuestion.rotQuestionName = rotQuestionName;
				slRotationQuestion.rotQuestionType = rotQuestionType;
				slRotationQuestion.projectId = projectId;
				listSlRotationQuestion.push(slRotationQuestion);
			});
			
			if (null != listSlRotationQuestion && 0 < listSlRotationQuestion.length) {
				
				listSlRotationPart = new Array();
				var slRotationPart = new Object();
				slRotationPart.listSlRotationQuestion = listSlRotationQuestion;
				slRotationPart.rotPartTitle = rotMainTitle;
				slRotationPart.projectId = projectId;
				listSlRotationPart.push(slRotationPart);
				
			} else {
				//alert('error!');
				alert('오류!');
			}
			
		} else if ('qRotPart' == rotationType) {
		
			rotMainTitle = $('[name="qRotMainTitle"]').val();
			rotMainQuestionName = $('[name="selLotMainQuestionList"]').val();
			rotMainQuestionId = $('[name="selLotMainQuestionList"] option:selected').attr('qid');
			rotMainQuestionType = $('[name="selLotMainQuestionList"] option:selected').attr('qtype');
			
			listSlRotationPart = new Array();
			$.each($('[name^="selPartRotaion"] option:selected'),function(){
				var rotPartId = $(this).val();
				var slRotationPart = new Object();
				slRotationPart.rotPartId = rotPartId;
				slRotationPart.projectId = projectId;
				slRotationPart.rotMainId = rotMainQuestionId;
				listSlRotationPart.push(slRotationPart);
			});
		}
		
		if (null != projectId && '' != projectId
				&& null != rotationType && '' != rotationType
				&& null != questionType && '' != questionType) {
			
			var returnObject = new Object();
			
			returnObject.rotMainTitle = rotMainTitle;
			returnObject.rotMainType = rotationType;
			returnObject.projectId = projectId;
			
			returnObject.rotMainQuestionId = rotMainQuestionId;
			returnObject.rotMainQuestionName = rotMainQuestionName;
			returnObject.rotMainQuestionType = rotMainQuestionType;
			returnObject.rotMainQuestionCheckNum = '';
			
			returnObject.listSlRotationExample = listSlRotationExample
			returnObject.listSlRotationPart = listSlRotationPart
			
			var rotMainSetUser = 'N';
			if ('eRot' == rotationType) {
				returnObject.rotMainSetUser = rotMainSetUser;
			} else if ('qRotPart' == rotationType) {
				//returnObject.rotMainSetUser = rotMainSetUser;
				//rotMainSetUser = $('[name="useUser"]:checked').val();
				if($('[name="useUser"]').is(':checked')) {
					rotMainSetUser = "Y";					
				}				
				returnObject.rotMainSetUser = rotMainSetUser;
			} else if ('qRot' == rotationType) {
				//rotMainSetUser = $('[name="useUser"]:checked').val();
				//returnObject.rotMainSetUser = rotMainSetUser;
				returnObject.rotMainSetUser = rotMainSetUser;
			}
			
			console.log('returnObject',returnObject);
			rotationJs.insertRotation(returnObject);
		}
	},
	insertRotation : function (returnObject) {
		loading.show();
		$('html').scrollTop(0);
		if (null != returnObject) {
			
			var urlVal = '/rotation/setRotation';
			$.ajax({
				url   		: urlVal,
				type  		: "post",
				dataType    : "json",
				contentType : "application/json",
				data  		: JSON.stringify( returnObject ),
				success     : function(responseData){
					console.log("setRotation data",responseData);
					if (null != responseData) {
						if (null != responseData.projectId) {
							
							var projectId = responseData.projectId;
							var insertSlRotationMain = responseData.insertSlRotationMain;
							var insertSlRotationPart = responseData.insertSlRotationPart;
							var insertSlRotationQuestion = responseData.insertSlRotationQuestion;
							var insertSlRotationExample = responseData.insertSlRotationExample;
							if (insertSlRotationMain && insertSlRotationPart && insertSlRotationQuestion && insertSlRotationExample) {
								//alert('save success!!');
								alert('저장 성공');
								//rotationJs.init();
								rotationJs.getRotation();								
							} else {
								//alert('save fail!!');
								alert('저장 실패');
								loading.hide();
								return false;
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
	setRotationList : function (listSlRotationMain, listSlRotationPart) {
		
		var rMainExampleHtml = '';
		var rMainQuestionHtml = '';
		var rotMainQuestionId = '';
		$.each(listSlRotationMain,function(index,value){
			
			var rotMainType = value.rotMainType;
			var rotMainId = value.rotMainId;
			rotMainQuestionId = value.rotMainQuestionId;
			console.log('setRotationList listSlRotationMain rotMainQuestionId',rotMainQuestionId);
			var rotMainQuestionName = value.rotMainQuestionName;
			var rotMainQuestionType = value.rotMainQuestionType;
			var rotMainSetUser = value.rotMainSetUser;
			var rotMainTitle = value.rotMainTitle;
			var regDate = value.regDate;
			
			if ('eRot' == rotMainType) {
				
				var listSlRotationExample = value.listSlRotationExample;
				if (null != listSlRotationExample && 0 < listSlRotationExample.length) {
					
					var rExampleLen = listSlRotationExample.length
					$.each(listSlRotationExample,function(eIndex,eValue){
						console.log('listSlRotationExample value',eValue);
						
						var rotExampleId = eValue.rotExampleId;
						var rotExampleValue = eValue.rotExampleValue;
						var rotExampleText = eValue.rotExampleText;
						var rotExampleChecked = eValue.rotExampleChecked;
						//var rotMainQuestionId = eValue.rotMainQuestionId;
						//console.log('setRotationList eRot rotMainQuestionId',rotMainQuestionId);
						var lineThroughStyle = '';
						if ('Y' != rotExampleChecked) {
							lineThroughStyle = ' style="text-decoration: line-through; opacity:0.4;" ';
						}
						var rExampleHtml = '<td '+ lineThroughStyle +'>'+ rotExampleText +' ('+ rotExampleValue +') </td>';
						
						if (0 == eIndex) {
							rMainExampleHtml = rMainExampleHtml + '		<tr>'
																+ '			<td rowspan="'+ rExampleLen +'">'+ rotMainTitle +'<br><a href="javascript:void(0);" onclick="rotationJs.setDeleteRotMainQuestion(\''+ rotMainId +'\',\''+ rotExampleId +'\',\''+ rotMainType +'\',\''+ rotMainQuestionName +'\',\''+ rotMainQuestionId +'\');">[delete]</a></td>' 
																+ '			<td rowspan="'+ rExampleLen +'">'+ rotMainQuestionName +' ('+ rotMainQuestionType +')</td>' 
																+ rExampleHtml + '		</tr>';
						} else {
							rMainExampleHtml = rMainExampleHtml +'		<tr>'+ rExampleHtml +'		</tr>';
						}
					});
				}
				
			} else if ('qRotPart' == rotMainType) {
				
				var listSlRotationPart2 = value.listSlRotationPart;
				if (null != listSlRotationPart2 && 0 < listSlRotationPart2.length) {
					
					var setMainRowSpan = 0;
					$.each(listSlRotationPart2,function(pIndex,pValue){
						var listSlRotationQuestion = pValue.listSlRotationQuestion;
						if (null != listSlRotationQuestion) {
							var srqLen = listSlRotationQuestion.length;
							setMainRowSpan = setMainRowSpan + srqLen;
						}
					});
					
					var rPartLen = listSlRotationPart2.length;
					$.each(listSlRotationPart2,function(pIndex,pValue){
						
						var rotPartTitle = pValue.rotPartTitle;
						var listSlRotationQuestion = pValue.listSlRotationQuestion;
						
						
						if (null != listSlRotationQuestion && 0 < listSlRotationQuestion.length) {
							
							var rQuestionLen = listSlRotationQuestion.length
							
							$.each(listSlRotationQuestion,function(qIndex,qValue){
								
								var rotQuestionId = qValue.rotQuestionId;
								var rotQuestionName = qValue.rotQuestionName;
								var rotQuestionType = qValue.rotQuestionType;
								//var rotMainQuestionId = qValue.rotMainQuestionId;
								//console.log('setRotationList qRotPart rotMainQuestionId',rotMainQuestionId);
								var rQuestionHtml = '<td>'+ rotQuestionName +' ('+ rotQuestionType +')</td>';
								
								if (0 == pIndex && 0 == qIndex) {
									rMainQuestionHtml = rMainQuestionHtml + '<tr><td rowspan="'+ setMainRowSpan +'">'+ rotMainTitle +'<br><a href="javascript:void(0);" onclick="rotationJs.setDeleteRotMainQuestion(\''+ rotMainId +'\',\''+ rotQuestionId +'\',\''+ rotMainType +'\',\''+ rotMainQuestionName +'\',\''+ rotMainQuestionId +'\');">[delete]</a></td>'
																		+'<td rowspan="'+ setMainRowSpan +'">'+ rotMainQuestionName +' ('+ rotMainQuestionType +')</td>'
																		+'<td rowspan="'+ rQuestionLen +'">'
																		+ rotPartTitle +'</td>'+ rQuestionHtml +'</tr>';
								} else {
									if (0 == qIndex) {
										rMainQuestionHtml = rMainQuestionHtml + '<tr><td rowspan="'+ rQuestionLen +'">'+ rotPartTitle +'</td>'+ rQuestionHtml +'</tr>';
									} else {
										rMainQuestionHtml = rMainQuestionHtml + '<tr>'+ rQuestionHtml +'</tr>';
									}
								}
								
							});
						}
					});
				}
			}
		});
		
		//console.log('rMainExampleHtml end',rMainExampleHtml);
		$('#eRotationHtml').html('<div>' + '	<table>'
								+ '		<thead><tr><td width="30%">Main Question Title</td><td width="30%">Main Question Name</td><td width="40%">Example Info</td></tr></thead>'
								+ '		<tbody>'+ rMainExampleHtml + '</tbody>'
								+ '	</table>' + '</div>');
		$('#pRotationHtml').html('<div>' + '	<table>'
								+ '		<thead><tr><td width="25%">Main Question Title</td><td width="25%">Main Question Name</td><td width="25%">Part Title</td><td width="25%">Question Info</td></tr></thead>'
								+ '		<tbody>'+  rMainQuestionHtml + '</tbody>'
								+ '	</table>' + '</div>');
		
		var rotationHtml = '';
		if (null != listSlRotationPart && 0 < listSlRotationPart.length) {
			
			var rPartLen = listSlRotationPart.length;
			$.each(listSlRotationPart,function(pIndex,pValue){
				
				var rotPartId = pValue.rotPartId;
				var rotPartTitle = pValue.rotPartTitle;
				var listSlRotationQuestion = pValue.listSlRotationQuestion;
				
				if (null != listSlRotationQuestion && 0 < listSlRotationQuestion.length) {
					
					var rQuestionLen = listSlRotationQuestion.length
					$.each(listSlRotationQuestion,function(qIndex,qValue){
						
						var rotQuestionId = qValue.rotQuestionId;
						var rotQuestionName = qValue.rotQuestionName;
						var rotQuestionType = qValue.rotQuestionType;
						//var rotMainQuestionId = qValue.rotMainQuestionId;
						//console.log('setRotationList qRot rotMainQuestionId',rotMainQuestionId);
						var rQuestionHtml = '<td>'+ rotQuestionName +' ('+ rotQuestionType +')</td>';
						
						if (0 == qIndex) {
							rotationHtml = rotationHtml + '<tr><td rowspan="'+ rQuestionLen +'">'+ rotPartTitle +'<br><a href="javascript:void(0);" onclick="rotationJs.setDeleteRotMainQuestion(\''+ rotPartId +'\',\''+ rotQuestionId +'\',\'qRot\',\''+ rotQuestionName +'\',\''+ rotMainQuestionId +'\');">[delete]</a></td>'+ rQuestionHtml +'</tr>';
						} else {
							rotationHtml = rotationHtml + '<tr>'+ rQuestionHtml +'</tr>';
						}
						//console.log('rotationHtml',rotationHtml);
					});
				}
			});
		}
		//console.log('rotationHtml end',rotationHtml);
		$('#qrotationHtml').html('<div>' + '	<table>'
				+ '		<thead><tr><td width="50%">Rotation Title</td><td width="50%">Question Info</td></tr></thead>'
				+ '		<tbody>'+  rotationHtml + '</tbody>'
				+ '	</table>' + '</div>');
		
		loading.hide();
	},
	setDeleteRotMainQuestion : function (highRankId, lowRankId, rotMainType, fileName, rotMainQuestionId) {
		var result = confirm('삭제하시겠습니까?');
		if (result) {
			
			var projectId = $('[name="projectId"]').val();
			
			if (null != projectId && '' != projectId
				&& null != highRankId && '' != highRankId) {
				
				var returnObject = new Object();
				returnObject.projectId = parseInt(projectId);
				returnObject.rotMainType = rotMainType;
				returnObject.rotMainQuestionId = rotMainQuestionId;
				
				console.log('setDeleteRotMainQuestion rotMainQuestionId',rotMainQuestionId);
				if ('qRot' != rotMainType) {
					
					returnObject.rotMainId = parseInt(highRankId);
					
				} else {
					
					var slRotationPartArray = new Array();
					var slRotationPartObject = new Object();
					slRotationPartObject.rotPartId = parseInt(highRankId);
					slRotationPartObject.rotSaveFileName = fileName;
					
					slRotationPartArray.push(slRotationPartObject);
					
					returnObject.listSlRotationPart = slRotationPartArray;
				}
				
				$('html').scrollTop(0);
				loading.show();				
				var urlVal = '/rotation/deleteRotation';
				$.ajax({
					url   		: urlVal,
					type  		: "post",
					dataType    : "json",
					contentType : "application/json",
					data  		: JSON.stringify( returnObject ),
					success     : function(responseData){
						console.log("deleteRotation data",responseData);
						if (null != responseData) {
							
							var deleteSlRotationMain = responseData.deleteSlRotationMain
							var deleteSlRotationExample = responseData.deleteSlRotationExample
							var deleteSlRotationPart = responseData.deleteSlRotationPart
							var deleteSlRotationQuestion = responseData.deleteSlRotationQuestion
							if (deleteSlRotationMain && deleteSlRotationExample && deleteSlRotationPart && deleteSlRotationQuestion) {
								//alert('save success!!');
								alert('삭제 성공');
								//rotationJs.init();
								rotationJs.getRotation();
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
			return false;
		}
	},
	setInitialization : function () {
		//console.log('setInitialization');
		/*
		eRotMainTitle
		selExamMainQuestionList
		eRot_1_Q1
		
		qRotPartTitle
		selQuestionCount
		selQuestionList_0
		
		qRotMainTitle
		selLotMainQuestionList
		useUser
		selPartCount
		selPartRotaion_1
		*/
		
		$('#eRotMainTitle').val('no title');
		$('#qRotPartTitle').val('no title');
		$('#qRotMainTitle').val('no title');
		
		$('[name="selExamMainQuestionList"] option:eq(0)').attr('selected','selected');
		$('[name="selLotMainQuestionList"] option:eq(0)').attr('selected','selected');
		$('[name="selQuestionCount"] option:eq(0)').attr('selected','selected');
		$('[name="selPartCount"] option:eq(0)').attr('selected','selected');
		
		$('[name="useUser"]').attr('checked',true);
		//$('[name^="eRot_"]').attr('checked',false);
		$.each($('[name^="eRot_"]'),function(){
			var etext = $(this).attr('etext');
			if ('$$@@$$' != etext) {
				$(this).attr('checked',false);
			}
		});
		
		$('#rotationSelList').html('<div>'
									+ '	<select id="selQuestionList_1">'
									+ '	</select>'
									+ '</div>');
		$('#partRotationSelList').html('<div>'
									+ '	<select id="selPartRotaion_1" name="selPartRotaion_1">'
									+ '	</select>'
									+ '</div>');
		
	},
	allCheck : function () {
		//console.log($('input:checkbox[name="allCheck"]').prop("checked"));
		//console.log($("div>input[type=checkbox]"));
		//console.log($("#exampleCheckList>div>input[type=checkbox]"));
		
		if($('input:checkbox[name="allCheck"]').prop("checked")) { 
			$("#exampleCheckList>div>input[type=checkbox]").prop("checked",true); 
		} else {  
			$("#exampleCheckList>div>input[type=checkbox]").prop("checked",false); 
		}
	}
}

$(function(){
	rotationJs.init();
});