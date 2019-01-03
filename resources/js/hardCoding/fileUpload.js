
var loading = "";
var fileUploadJs = {
		
	init : function(){
		loading = $('<div id="loading" class="loading"></div><img id="loading_img" alt="loading" src="/resources/img/loading2.gif" />').appendTo(document.body).hide();
		fileUploadJs.setSlHardCoding();
	},
	setSlHardCoding : function (data) {
		
		var projectId = $('[name="projectId"]').val();
		console.log("projectId",projectId);
			
		var urlVal = '/hardCoding/setSlHardCoding';
		console.log("urlVal",urlVal);
		$.ajax({
			url   		: urlVal,
			type  		: "post",
			dataType    : "json",
			contentType : "application/json",
			data  		: JSON.stringify( {projectId:projectId} ),
			success     : function(responseData){
				console.log("setSlHardCoding data",responseData);
				if (null != responseData) {
					fileUploadJs.setSlHardCodingHtml(responseData);
					fileUploadJs.setEvent(responseData);
				}
			},
			error : function(e){
				//console.log("error",e);
			}
		});
	},
	setSlHardCodingHtml : function (data) {
		
		if (null != data.selectSlHardCoding) {
			
			var slHardCoding = data.selectSlHardCoding;
			if (null != slHardCoding.fileOriginalName) {
				
				$('[name="hardCodingId"]').val(slHardCoding.hardCodingId);
				//$('[name="fileDirectory"]').val(slHardCoding.fileDirectory);
				$('[name="fileFullPath"]').val(slHardCoding.fileFullPath);
				$('[name="fileSaveName"]').val(slHardCoding.fileSaveName);
				$('[name="fileOriginalName"]').val(slHardCoding.fileOriginalName);
				$('[name="fileText"]').html(slHardCoding.fileOriginalName);
				$('[name="bt_insert"]').val('DB수정');
			} 
		}else {
			$('[name="hardCodingId"]').val(0);
		}
	},
	setEvent : function(data){
		
		$('[name="bt_insert"]').on('click',function(){ fileUploadJs.insertSlHardCoding(); });
		$('[name="bt_test"]').on('click',function(){ 
			var projectId = $('[name="projectId"]').val();
			var testUrl = data.testUrl;
			
			var checkSurveyFile = fileUploadJs.checkSurveyFile(projectId, "SQ1.jsp");
			console.log("checkSurveyFile",checkSurveyFile);
			if (checkSurveyFile && null != testUrl && "" != testUrl) {
				var popStatus;
				var fullTestUrl = testUrl + '/' + projectId + '/test.jsp?uCode=1111&surveyState=testList';
				popStatus = window.open(fullTestUrl, "Test Window", "width=1200, height=1000, toolbar=no, menubar=no, scrollbars=no, resizable=yes");
				popStatus.focus();
			} else {
				//alert('There is no test file');
				alert('테스트 파일이 없습니다.');
			}
		});
		$('[name="bt_cancel"]').on('click',function(){ location.href='/project/projectList'; });
		$('[name="bt_excelUpload"]').on('click',function(){ fileUploadJs.checkFile(); });
		$('[name="bt_survey"]').on('click',function(){
			var result = confirm('설문생성을 하시겠습니까?');	
			if (result) {
				var returnVal = fileUploadJs.fileReadWrite();
				
				if (returnVal) {
					fileUploadJs.testFileReadWrite();
				}
				
				//return false;
				location.reload();
				
			}
			
		});
		$('#fileDown').on('click',function(){ fileUploadJs.fileDown('form'); });
		$('#hardCodingFileDown').on('click',function(){ fileUploadJs.fileDown('hardCodingFile'); });
	}, 
	checkValidation : function(){
		var returnVal = false;
		var hardCodingId = $('[name="hardCodingId"]').val();
		var projectId = $('[name="projectId"]').val();
		var fileDirectory = $('[name="fileDirectory"]').val();
		var fileFullPath = $('[name="fileFullPath"]').val();
		var fileSaveName = $('[name="fileSaveName"]').val();
		var fileOriginalName = $('[name="fileOriginalName"]').val();
		if (null != hardCodingId
			&& null != projectId && '' != projectId
			&& null != fileDirectory && '' != fileDirectory
			&& null != fileFullPath && '' != fileFullPath
			&& null != fileSaveName && '' != fileSaveName
			&& null != fileOriginalName && '' != fileOriginalName) { returnVal = true; }
		else { 
			//alert('insert file'); 
			alert('파일 삽입');
		}
		
		return returnVal;
	},
	setData : function(){
		var projectId = $('[name="projectId"]').val();
		var hardCodingId = $('[name="hardCodingId"]').val();
		
		var fileDirectory = $('[name="fileDirectory"]').val();
		var fileFullPath = $('[name="fileFullPath"]').val();
		var fileSaveName = $('[name="fileSaveName"]').val();
		var fileOriginalName = $('[name="fileOriginalName"]').val();
		
		var returnData = {
				hardCodingId : hardCodingId,
				projectId : projectId,
				fileDirectory : fileDirectory,
				fileFullPath : fileFullPath,
				fileSaveName : fileSaveName,
				fileOriginalName : fileOriginalName,
		};
		
		return returnData;
	},
	insertSlHardCoding : function(){
		
		var checkValidation = fileUploadJs.checkValidation();
		//console.log('insertSlHardCoding checkValidation',checkValidation);
		
		if(checkValidation){
			var setData = fileUploadJs.setData();
			console.log('setData',setData);
			
			var urlVal = '/hardCoding/insertSlHardCoding';
			console.log("urlVal",urlVal);
			$.ajax({
			    url   		: urlVal,
			    type  		: "post",
			    dataType    : "json",
			    contentType : "application/json",
			    data  		: JSON.stringify( setData ),
			    success     : function(responseData){
			    	console.log("fileUploadJs insertSlHardCoding",responseData);
			    	if (null != responseData) {
			    		
			    		var checkInsetUpdate = false;
			    		if (responseData.insertSlHardCoding) {
			    			checkInsetUpdate = true;
			    			//alert('insert success');
			    			alert('삽입 성공');
			    			//location.href='/project/projectList';
			    		} else if (responseData.updateSlHardCoding) {
			    			checkInsetUpdate = true;
			    			//alert('update success');
			    			alert('수정 성공');
			    			//location.href='/project/projectList';
			    		}
			    		if (checkInsetUpdate) {
			    			fileUploadJs.setSlHardCoding();
			    		}
			    	}
			    },
			    error : function(e){
			    	//console.log("error",e);
			    }
			});
		}
	},
	checkFile : function() {
		
		var uploadFile = $('[name="uploadFile"]');
		if( uploadFile.val() != "" ){
			
			var ext = uploadFile.val().split('.').pop().toLowerCase();
			if($.inArray(ext, ['xls']) == -1) {
				alert('xls 파일만 업로드 가능합니다.');
				return;
			}else{				
				fileUploadJs.excelUpload();
			}
		} else{
			alert("파일을 선택하여 주세요");
		}
	},
	excelUpload : function () {

		loading.show();
		var urlVal = "/file/fileUpload";
		var form = new FormData(document.getElementById('excelUploadForm'));
		$.ajax({
			url         : urlVal,
			type        : 'POST',
			data  		: form,
			dataType    : 'json',
			contentType : false,
			processData	: false,
			success     : function(data){
				console.log("data",data);
				console.log("data.fileVO",data.fileVO);
				if (null != data && null != data.fileVO) {
					fileUploadJs.setFileData(data.fileVO);
					if (null != data.fileVO.fileSaveName && "" != data.fileVO.fileSaveName && data.insertSlHardCoding) {
						//alert("Save Success");
						alert("저장 성공");
						//fileUploadJs.insertSlHardCoding();
					} else {
						//alert("Save Faile");
						alert("저장 실패");
					}
				}
				loading.hide();
			},
			error	: function(request,status,error){
				//console.log("error request",request);                  
				//console.log("error status",status);                  
				//console.log("error error",error);         
				loading.hide();
			}            
		});	
	},
	setFileData : function (fileVO) {
		//$('[name="fileDirectory"]').val(fileVO.fileDirectory);
		$('[name="fileFullPath"]').val(fileVO.fileFullPath);
		$('[name="fileSaveName"]').val(fileVO.fileSaveName);
		$('[name="fileOriginalName"]').val(fileVO.fileOriginalName);
		$('[name="fileText"]').text(fileVO.fileOriginalName);
	}, 
	testFileReadWrite : function () {
		loading.show();
		var projectId = $('[name="projectId"]').val();
		var hardCodingId = $('[name="hardCodingId"]').val();
		var urlVal = "/file/testFileReadWrite";
		console.log("testFileReadWrite projectId",projectId);
		var listQuestionHtml = serveyJs.init('setHtml');
		
		$.ajax({
			url   		: urlVal,
			type  		: "post",
			dataType    : "json",
			contentType : "application/json",
			data  		: JSON.stringify( {projectId:projectId, hardCodingId:hardCodingId, listQuestionHtml:listQuestionHtml} ),
			success     : function(responseData){
				console.log("setSlHardCoding data",responseData);
				if (null != responseData) {
					if (null != responseData.returnVal && responseData.returnVal) {
						//alert("Save Success TestList");
						alert("테스트 저장 완료");
					} else {
						//alert("Save Faile TestList");
						alert("테스트 저장 실패");
					}
				}
				loading.hide();
			},
			error : function(e){
				loading.hide();
			}
		});
	},
	fileReadWrite : function () {				
		loading.show();
		var projectId = $('[name="projectId"]').val();
		var hardCodingId = $('[name="hardCodingId"]').val();
		var urlVal = "/file/fileReadWrite";
		console.log("fileReadWrite projectId",projectId);
		var listQuestionHtml = serveyJs.init('setHtml');
		console.log('listQuestionHtml',listQuestionHtml);
				
		var returnVal = false;
		$.ajax({
			url   		: urlVal,
			type  		: "post",
			dataType    : "json",
			contentType : "application/json",
			async		: false,
			data  		: JSON.stringify( {projectId:projectId, hardCodingId:hardCodingId, listQuestionHtml:listQuestionHtml} ),
			success     : function(responseData){
				console.log("setSlHardCoding data",responseData);
				if (null != responseData) {
					if (null != responseData.returnVal && responseData.returnVal) {
						if(null != responseData.createTableName && '' != responseData.createTableName) {
							//alert("Save Success Survey");
							alert("설문 저장 성공");
							returnVal = true;
						} else {
							alert("응답 테이블 생성 실패");							
						}
					} else {
						//alert("Save Faile Survey");
						alert("설문 저장 실패");
					}
				}
				loading.hide();
			},
			error : function(e){
				loading.hide();
			}
		});
		return returnVal;
		
	},
	customScriptFileReadWrite : function () {
		var projectId = $('[name="projectId"]').val();
		var hardCodingId = $('[name="hardCodingId"]').val();
		var urlVal = "/file/customScriptFileReadWrite";
		console.log("customScriptFileReadWrite projectId",projectId);
		/*
		var returnVal = false;
		$.ajax({
			url   		: urlVal,
			type  		: "post",
			dataType    : "json",
			contentType : "application/json",
			async		: false,
			data  		: JSON.stringify( {projectId:projectId, hardCodingId:hardCodingId} ),
			success     : function(responseData){
				console.log("setSlHardCoding data",responseData);
				if (null != responseData) {
					if (null != responseData.returnVal && responseData.returnVal) {
						alert("Save Success Survey");
						returnVal = true;
					} else {
						alert("Save Faile Survey");
					}
				}
			},
			error : function(e){
			}
		});
		return returnVal;*/
	},
	fileDown : function(val){
		
		var url = "";
		if ('form' == val) {
			url = "/file/fileDownload?path="+ val +"&fileName=test.xls";
		} else if ('hardCodingFile' == val) {
			var projectId = $('[name="projectId"]').val();
			url = "/file/fileDownload?path="+ val +"&projectId="+ projectId;
		}
		
		if ("" != url) {
			//var message = "File down?" ;
			var message = "파일을 다운로드 하시겠습니까?" ;
			console.log('url',url);
			if(confirm(message)){
				$(location).attr('href',url);
			}
		}
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
	}
}

$(function(){
	fileUploadJs.init();
});