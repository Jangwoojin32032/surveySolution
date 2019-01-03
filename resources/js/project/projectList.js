
var searchProjectId = 0;
var searchProjectState = 0;
var dataProjectState = 0;
var useResearList = 0;
var loading = "";

var projectListJs = {
		
	init : function(){
		loading = $('<div id="loading" class="loading"></div><img id="loading_img" alt="loading" src="/resources/img/loading2.gif" />').appendTo(document.body).hide();		
		projectListJs.setListProject(1,'N');
		projectListJs.setEvent();
	},
	setEvent : function () {
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
	},
	setSearchData : function () {
		var returnData = {
				searchType : $('[name="searchType"]').val(),
				searchValue : $('[name="searchValue"]').val(),
				projectState : $('[name="projectState"]').val()
    	};
		return returnData;
	},
	searchListProject : function () {
		console.log('setSearchData',projectListJs.setSearchData());
		
		var searchData = projectListJs.setSearchData();
		var searchValue = searchData.searchValue;
		//if (null == searchData || null == searchValue || "" == searchValue.trim()) {
		//	alert('input search text');
		//	$('[name="searchValue"]').focus();
			
		//} else {
			projectListJs.setListProject(1,'Y');
		//}
	},
	setListProject : function (pageNo, searchState) {
		
		var searchData = projectListJs.setSearchData();
		searchData.searchState = searchState;
		
		var pageRow = 10;
    	var pageSize = 5;
    	
    	loading.show();
		var urlVal = '/project/setProjectList';
		console.log("urlVal",urlVal);
		console.log("searchVO",searchData);
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
		    	console.log("projectRegJs init",responseData);
		    	if (null != responseData) {
		    		if (null != responseData.listSlProject) {
			    		projectListJs.listSlProject(responseData.listSlProject, responseData.listPmCode, responseData.listClientVendorGroup, responseData.paging, responseData.setCheckSearch);
			    		pagingJs.paging(responseData.paging, 0, "projectListJs.setListProject");			    		
		    		}		    		
		    	}
		    	loading.hide();
		    },
		    error : function(e){
		    	//console.log("error",e);
		    	loading.hide();
		    }		    
		});				
	},
	listSlProject : function (listSlProject, listPmCode, listcustomerCode, paging, setCheckSearch) {
		
		$('#setHtml').html('');
		var setHtml = "";
		//console.log('listSlProject',listSlProject);
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
			
			if ("0" == projectState) {
				setClassBtProjectState = "on3";
				setValueProjectState = "등록";
			} else if ("1" == projectState) {
				setClassBtProjectState = "on1";
				setValueProjectState = "시작";
			} else if ("2" == projectState) {
				setClassBtProjectState = "on2";
				setValueProjectState = "진행";
			} else if ("3" == projectState) {
				setClassBtProjectState = "on2";
				setValueProjectState = "완료";
			} else if ("4" == projectState) {
				setClassBtProjectState = "on1";
				setValueProjectState = "종료";
			}
			
			var progress = '0 / 0';
			if (null != value.selectSlQuaterCount) {
				var slQuaterCount = value.selectSlQuaterCount;
				var quaterActiveCount = slQuaterCount.quaterActiveCount;
				var quaterTotalCount = slQuaterCount.quaterTotalCount;
				if ( 0 !=quaterActiveCount && 0!= quaterTotalCount ) {
					//progress = (quaterActiveCount / quaterTotalCount) * 100;
					//progress = Math.floor(progress);
					progress = quaterActiveCount +' / '+ quaterTotalCount;
				}
			}
			
			setHtml = setHtml
			+'<tr>'
			+'	<td class="w">'+ value.rNum +'</td>'
			+'	<td class="aa"><a class="block" href="/project/projectReg?projectId='+ projectId +'">'+ value.projectNameInner +'</a></td>'
			+'	<td data-cell-header="진행률">'+ progress +'</td>'
			+'	<td data-cell-header="담당자">'+ setPmName +'</td>'
			+'	<td data-cell-header="고객사">'+ setCustomerName +'</td>'
			+'	<td data-cell-header="작성일">'+ regDate +'</td>'
			+'	<td data-cell-header="작업">'
			+'		<input type="button" value="엑셀등록" name="bt_survey" id="bt_survey_'+ projectId +'" onclick="javascript:projectListJs.setButtonEvent(\'survey\','+ projectId +','+ projectState +')">'
			+'		<input type="button" value="설문등록" name="bt_question" id="bt_question_'+ projectId +'" onclick="javascript:projectListJs.setButtonEvent(\'question\','+ projectId +','+ projectState +')">'
			+'		<input type="button" value="테스트" name="bt_tes"t id="bt_test_'+ projectId +'" onclick="javascript:projectListJs.serveyGoTest(\''+ projectId +'\',\''+ value.serveyGoPath +'\','+ projectState +')">'
			+'		<input type="button" value="데이터" name="bt_data" id="bt_data_'+ projectId +'" onclick="javascript:projectListJs.setButtonEvent(\'data\','+ projectId +','+ projectState +')">'
			+'		<input type="button" value="쿼터설정" name="bt_quater" id="bt_quater_'+ projectId +'" onclick="javascript:projectListJs.setButtonEvent(\'quater\','+ projectId +','+ projectState +')">'
			+'		<input type="button" value="로테이션" name="bt_rotation" id="bt_rotation_'+ projectId +'" onclick="javascript:projectListJs.setButtonEvent(\'rotation\','+ projectId +','+ projectState +')">'
			if(cpno != null && cpno != '') {	// 리스트 조사시 cpno 확인 버튼 생성			
				setHtml += '<input type="button" value="CPNO" name="bt_cpno" id="bt_cpno_'+ projectId +'" cpno="'+ cpno +'" onclick="javascript:projectListJs.setButtonEvent(\'cpno\','+ projectId +','+ projectState +')">'
			}
			setHtml = setHtml
			+'		<input type="button" value="스크립트" name="bt_customScript" id="bt_customScript_'+ projectId +'" onclick="javascript:projectListJs.setButtonEvent(\'customScript\','+ projectId +','+ projectState +')">'
			+'		<input class="'+ setClassBtProjectState +'" type="button" value="'+ setValueProjectState 
			+'" name="bt_projectState" id="bt_projectState_'+ projectId +'" onclick="projectListJs:projectListJs.setButtonEvent(\'projectState\','+ projectId +','+ projectState +','+ useResearList +')">'
			+'		<input type="button" value="가이드" name="bt_guide" id="bt_guide_'+ projectId +'" onclick="javascript:projectListJs.setButtonEvent(\'guide\',\''+ projectId +'\')">'
			+'		<input type="button" value="가이드2" name="bt_guide" id="bt_guide_'+ projectId +'" onclick="javascript:projectListJs.serveyGoGuide(\''+ projectId +'\',\''+ value.serveyGoPath +'\','+ projectState +')">'
			+'	</td>'
			+'</tr>';
		});
		$('#setHtml').html(setHtml);
		
		$('.totalPage').html('');
		console.log('paging.pageLastIndex',paging.pageLastIndex);
		$('.totalPage').html(paging.pageNo + ' / ' + (parseInt(paging.pageLastIndex)+1));
		
		loading.hide();
	},
	setButtonEvent : function(type, projectId, projectState, researchList){
		//console.log('setButtonEvent');
		//console.log('projectId', projectId);
		//console.log('projectState', projectState);
		//console.log('setButtonEvent researchList', researchList);
		
		var checkSurveyFile = projectListJs.checkSurveyFile(projectId, "Q1.jsp");
		//console.log("checkSurveyFile",checkSurveyFile);
		//console.log("type",type);
		
		if (!checkSurveyFile && type != 'survey' && type != 'projectState') {
			alert('설문생성이 필요합니다.');
			return false;
		}
		
		if ('survey' == type) {
			if("2" == projectState) {
				alert('설문 진행중인 경우 할 수 없습니다.');
				return false;
			} else {
				console.log('bt_survey');
				location.href='/hardCoding/fileUpload?projectId='+projectId;
			}
		} else if ('question' == type) {
			/*
			if("2" == projectState) {
				alert('설문 진행중인 경우 할 수 없습니다.');
				return false;
			} else {
				console.log('bt_question');
				location.href='/question/questionList?projectId='+projectId;
			}
			*/
			console.log('bt_question');
			location.href='/question/questionList?projectId='+projectId;
		} else if ('projectState' == type) {
			
			//console.log('projectState',projectState);
			searchProjectId = parseInt(projectId);
			projectState = parseInt(projectState);			
			searchProjectState = projectState;
			useResearList = researchList;
			
			/*if (0 < projectState && 4 > projectState) {
				$('#div_pStateVal1').html('상태값 :  <b>시작</b>');
			} else if (4 == projectState) {
				$('#div_pStateVal1').html('상태값 :  <b>종료</b>');
			} else {
				$('#div_pStateVal1').html('상태값 :  <b>등록</b>');
			}
			
			if (2 == projectState) {
				$('#div_pStateVal2').html('상태값 :  <b>진행</b>');
			} else if (3 == projectState) {
				$('#div_pStateVal2').html('상태값 :  <b>완료</b>');
			} else {
				$('#div_pStateVal2').html('상태값 :  <b>등록</b>');
			}*/
			
			var arrClass = new Array('', '', '', '');
			arrClass[(projectState-1)] = 'class="spantextcolor"';
			
			var setHtml = '<span '+ arrClass[0] +'>시작</span> > <span '+ arrClass[1] +'>진행</span> > <span '+ arrClass[2] +'>완료</span> > <span '+ arrClass[3] +'>종료</span>';
			$('#div_pStateVal').html(setHtml);
			$('body').css('overflow','hidden');
			$('#pop_projectState').css('display','');
			
		} else if ('data' == type) {	
			
			searchProjectId = parseInt(projectId);
			dataProjectState = projectState;
			
			$('body').css('overflow','hidden');
			$('#pop_data').css('display','');
			
		} else if ('guide' == type) {
			console.log('bt_guide');

			var message = '다운로드를 하시겠습니까?';
			var url = '/project/excelDownloadSurveyGuide?projectId='+projectId;		 
			if(confirm(message)){
				//projectListJs.excelDownloadSurveyData(searchProjectId, dataUCode, dataState);
				$(location).attr('href',url);
			}					
		}else {
			
			if ('quater' == type) {
				if("2" == projectState) {
					alert('설문 진행중인 경우 할 수 없습니다.');
					return false;
				} else {
					console.log('bt_quater');
					var quaterUrl = '/project/projectQuater?projectId=' + projectId;
					location.href=quaterUrl;
				}
			} else if ('rotation' == type) {
				if("2" == projectState) {
					alert('설문 진행중인 경우 할 수 없습니다.');
					return false;
				} else {
					console.log('bt_rotation');
					var quaterUrl = '/rotation/rotation?projectId=' + projectId;
					location.href=quaterUrl;
				}
			} else if ('customScript' == type) {
				console.log('bt_customScript');
				var quaterUrl = '/customScript/customScript?projectId=' + projectId;
				location.href=quaterUrl;
			} else if ('cpno' == type) {
				searchProjectId = parseInt(projectId);
				var cpno = $('#bt_cpno_'+ projectId).attr('cpno');
				
				console.log('cpno',cpno);
				//$('#cpnoTitle').html('CPNO(' + projectId + ')');
				
				$('#cpnoValue').html(cpno);				
				$('#surveyLink').html('http://210.117.6.48/survey/info?projectId='+projectId+'&uCode=[$FN1$]&HDCPNo='+cpno);
				$('body').css('overflow','hidden');
				$('#pop_cpno').css('display','');
			} else {
				//alert('Can not be used when started');
				alert('시작시 사용할 수 없습니다.');
			}
		}
	},
	serveyGoTest : function (projectId, serveyGoPath, projectState) {
		
		var checkSurveyFile = projectListJs.checkSurveyFile(projectId, "SQ1.jsp");
		//console.log("checkSurveyFile",checkSurveyFile);
		//console.log("type",type);
		
		if (!checkSurveyFile) {
			alert('설문생성이 필요합니다.');
			return false;
		}
		
		if("2" == projectState) {
			alert('설문 진행중인 경우 할 수 없습니다.');
			return false;
		}
		
		console.log('serveyGoTest projectId',projectId);
		console.log('serveyGoTest serveyGoPath',serveyGoPath);
		var popStatus;
		var fullUrl = '/survey/info?projectId='+ projectId + '&uCode=1111';
		popStatus = window.open(fullUrl, "Test Window", "width=1200, height=1000, toolbar=no, menubar=no, scrollbars=no, resizable=yes");
		popStatus.focus();
	},
	setProjectStateEvent : function (projectId, projectState) {
		
		var returnVal = false;
		//var useResearList = useResearList;
		
		console.log('setProjectStateEvent useResearList',useResearList);
		
		// tb_project 시작 종료 칼럼
		var regDate = commonJs.todayYYYYMMDD();
		
		if (null != projectId && null != projectState) {
			
			var urlVal = '/project/updateProjectReg';
			console.log("urlVal",urlVal);
			$.ajax({
				url   		: urlVal,
				type  		: "post",
				dataType    : "json",
				contentType : "application/json",
				async		: false,
				data  		: JSON.stringify({ projectId : projectId, projectState : projectState, useResearList : useResearList, regDate : regDate}),
				success     : function(responseData){
					console.log("projectRegJs init",responseData);
					if (null != responseData) {
						if (null != responseData.updateSlProject) {
							//alert("update success");
							alert("수정이 완료되었습니다.");
							returnVal = true;
						}
					}
				},
				error : function(e){
					//console.log("error",e);
				}
			});
		}
		return returnVal;
	},
	setProjectState : function (setPState) {
		
		var projectId = searchProjectId;
		var projectState = searchProjectState;
		
		var checkVal = false;
		if (null != projectState && null != projectState) {
			
			if (null == projectState || '' == projectState) {
				projectState = 0;
			} else {
				projectState = parseInt(projectState);
			}
			console.log('projectState',projectState);
			console.log('setPState',setPState);
			
			checkVal = true;
			if ( projectState >= setPState ) {
				
				checkVal = false;
				if (3 == projectState) {
					
					if (2 == setPState) {
						checkVal = true;
					}
				}
			}
			console.log('checkVal',checkVal);
		}
		
		//if (checkVal && 4 != projectState) {
			var returnVal = projectListJs.setProjectStateEvent(projectId, setPState);
			if (returnVal) {
				$('#pop_projectState').css('display','none');
				projectListJs.setListProject(1,'N');
			}
		//} else {
			//alert('Does not meet the procedure.');
		//	alert('(종료/완료) 된 (프로젝트/설문) 은 다시 (시작/진행) 으로 변경할 수 없습니다.');
		//}
	},
	setDataEvent : function (type) {
		
		if (null != searchProjectId && '' != searchProjectId && 0 < searchProjectId) {
			
			console.log('setDataEvent type',type);
			console.log('setDataEvent searchProjectId',searchProjectId);
			console.log('setDataEvent dataProjectState',dataProjectState);
			var returnVal = true;
			
			if ('downData' == type) {
				
				dataUCode = $('#dataDownUcode').val();
				dataState = $('[name="dataDownProjectState"] option:selected').val();
				console.log('setDataEvent dataUCode',dataUCode);
				console.log('setDataEvent dataState',dataState);
				
				/*if (null == dataUCode || '' == dataUCode) {
					returnVal = false;
					$('#dataDownUcode').focus();
				}
				if (null == dataState || '' == dataState) {
					returnVal = false;
					$('#dataDownProjectState').focus();
				}
				*/
				if (returnVal) {
					var message = '다운로드를 하시겠습니까?';
					var url = "/project/excelDownloadSurveyData?target=survey&projectId="+ searchProjectId +"&uCode="+ dataUCode +"&projectState="+ dataState;		 
					if(confirm(message)){
						//projectListJs.excelDownloadSurveyData(searchProjectId, dataUCode, dataState);
						$(location).attr('href',url);
					}
				}
				
			} else if ('deleteData' == type) {
				if("2" == dataProjectState) {
					alert('설문 진행중인 경우 할 수 없습니다.');
					return false;
				} else {
					dataUCode = $('#dataDelUcode').val();
					dataState = $('[name="dataDelProjectState"] option:selected').val();
					console.log('setDataEvent dataUCode',dataUCode);
					console.log('setDataEvent dataState',dataState);
					
					if (null == dataUCode || '' == dataUCode) {
						alert('ucode를 입력해주세요');
						returnVal = false;
						$('#dataDelUcode').focus();
					} 
					/*if (null == dataState || '' == dataState) {
						returnVal = false;
						$('#dataDelProjectState').focus();
					}*/
					
					if (returnVal) {
						var message = '삭제하시겠습니까??';
						if(confirm(message)){
							projectListJs.setProjectDataDel(searchProjectId, dataUCode, dataState);
						}
					}
				}
			}
			
		} else {
			//alert('Does not meet the procedure.');
			alert('절차를 충족시키지 못합니다.');
		}
	},
	setProjectDataDel : function (setProjectId, setUCode, setState) {
		
		var urlVal = '/project/setProjectDataDel';
		console.log("urlVal",urlVal);
		$.ajax({
			url   		: urlVal,
			type  		: "post",
			dataType    : "json",
			contentType : "application/json",
			async		: false,
			data  		: JSON.stringify({ projectId : setProjectId, uCode : setUCode, projectState : setState}),
			success     : function(responseData){
				console.log("setProjectDataDownDel responseData",responseData);
				if (null != responseData) {
					alert('삭제 되었습니다.');
				}
			},
			error : function(e){
				alert('삭제 실패');
			}
		});
	},
	excelDownloadSurveyData : function (setProjectId, setUCode, setState) {
		
		var urlVal = '/project/excelDownloadSurveyData';
		console.log("urlVal",urlVal);
		$.ajax({
			url   		: urlVal,
			type  		: "post",
			dataType    : "json",
			contentType : "application/json",
			async		: false,
			data  		: JSON.stringify({ projectId : setProjectId, uCode : setUCode, projectState : setState}),
			success     : function(responseData){
				console.log("excelDownloadSurveyData responseData",responseData);
				if (null != responseData) {
				}
			},
			error : function(e){}
		});
	},
	setSearchDataRemove : function () {
		searchProjectId = 0;
		searchProjectState = 0;
	},
	checkSurveyFile : function (projectId, fileName) {
		console.log('projectId',projectId);
		console.log('fileName',fileName);
		var returnVal = false;
		var urlVal = '/file/checkSurveyFile';
		$.ajax({
			url   		: urlVal,
			type  		: "post",
			dataType    : "json",
			async		: false,
			data  		: {projectId:projectId, fileName:fileName},
			success     : function(responseData){
				console.log("checkSurveyFile data",responseData);
				if (null != responseData) {
					if (responseData.checkFile) {
						console.log("responseData.checkFile",responseData.checkFile);
						returnVal = true;
					}
				}
			},
			error : function(e){
				//console.log("error",e);
			}
		});
		return returnVal;
	},
	serveyGoGuide : function (projectId, serveyGoPath, projectState) {
		
		var checkSurveyFile = projectListJs.checkSurveyFile(projectId, "test.jsp");
		//console.log("checkSurveyFile",checkSurveyFile);
		//console.log("type",type);

		console.log('serveyGoTest projectId',projectId);
		if (!checkSurveyFile) {
			alert('설문생성이 필요합니다.');
			return false;
		}
		
		console.log('serveyGoTest projectId',projectId);
		console.log('serveyGoTest serveyGoPath',serveyGoPath);
		var popStatus;
		var fullUrl = serveyGoPath + 'test.jsp?uCode=1111&surveyState=testList';
		popStatus = window.open(fullUrl, "Test Window", "width=1200, height=1000, toolbar=no, menubar=no, scrollbars=no, resizable=yes");
		popStatus.focus();
		
	}
	
}

$(function(){
	projectListJs.init();
});