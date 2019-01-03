
var projectRegJs = {
		
	init : function(){
		
		var projectId = $('[name="projectId"]').val();
		var projId = $('[name="projId"]').val();
		console.log("projectRegJs projectId",projectId);
		//console.log("projId",projId);
			
		var urlVal = '/project/setProjectReg';
		console.log("urlVal",urlVal);
		$.ajax({
			url   		: urlVal,
			type  		: "post",
			dataType    : "json",
			contentType : "application/json",
			data  		: JSON.stringify( {projectId:projectId, projId:projId} ),
			success     : function(responseData){
				console.log("setProjectReg data",responseData);
				if (null != responseData) {
					projectRegJs.setProjectReg(responseData);
					projectRegJs.setEvent(responseData);
				}
			},
			error : function(e){
				//console.log("error",e);
			}
		});
	},
	setProjectReg : function (data) {
		
		var setHtml = "";
		
		if (null != data.listJobCode) {
			
			$('[name="jobCode"]').html('');
			var listJobCode = data.listJobCode;
			$.each(listJobCode, function(index, value){
				var codeId = value.codeId;
				var codeValue = value.codeValue;
				if (0==index) {
					setHtml = setHtml + '<option value="">select</option>';
				}
				setHtml = setHtml + '<option value="'+ codeId +'">'+ codeValue +'</option>';
			});
			$('[name="jobCode"]').append(setHtml);
		}
		
		setHtml = "";
		if (null != data.customerCode) {
			
			$('[name="customerCode"]').html('');
			var customerCode = data.customerCode;
			$.each(customerCode, function(index, value){
				var vendorId = value.VENDORID;
				var vendorName = value.VENDORNAME;
				if (0==index) {
					setHtml = setHtml + '<option value="">select</option>';
				}
				setHtml = setHtml + '<option value="'+ vendorId +'">'+ vendorName +'</option>';
			});
			$('[name="customerCode"]').append(setHtml);
		}
		
		setHtml = "";
		if (null != data.listPmCode) {
			
			$('[name="pmCode"]').html('');
			var listPmCode = data.listPmCode;
			$.each(listPmCode, function(index, value){
				var codeId = value.codeId;
				var codeValue = value.codeValue;
				var userId = $('[name="userId"]').val();
				var attrSelected = '';
				if (codeId == userId) {
					attrSelected = 'selected';
				}
				if (0==index) {
					setHtml = setHtml + '<option value="">select</option>';
				}
				setHtml = setHtml + '<option value="'+ codeId +'" '+ attrSelected +'>'+ codeValue +'</option>';
			});
			$('[name="pmCode"]').append(setHtml);
		}
		
		setHtml = "";
		$('[name="redirectUrlSelector"]').html('');
		for (var i=0; i<13; i++) {
			if (0==i) {
				setHtml = setHtml + '<option value="'+ i +'">select value</option>';
			} else {
				setHtml = setHtml + '<option value="'+ i +'">redirectUrl '+ i +'</option>';
			}
		}
		$('[name="redirectUrlSelector"]').append(setHtml);
		
		if (null != data.selectSlProject) {
			
			var slProject = data.selectSlProject;
			if (null != slProject.jobCode) {
				$('[name="jobCode"]').val(slProject.jobCode).attr('selected','selected');
			}
			if (null != slProject.projectNameInner) {
				$('[name="projectNameInner"]').val(slProject.projectNameInner);
				$('[name="projectNameInnerText"]').val(slProject.projectNameInner);
			}
			if (null != slProject.projectNameOuter) {
				$('[name="projectNameOuter"]').val(slProject.projectNameOuter);
			}
			if (null != slProject.surveyDisign) {
				$('input:radio[name="surveyDisign"]:radio[value="'+ slProject.surveyDisign +'"]').prop('checked',true);
			}
			if (null != slProject.customerCode) {
				$('[name="customerCode"]').val(slProject.customerCode).attr('selected','selected');
			}
			if (null != slProject.pmCode) {
				$('[name="pmCode"]').val(slProject.pmCode).attr('selected','selected');
			}
			if (null != slProject.useLanguage) {
				$('[name="useLanguage"]').val(slProject.useLanguage).attr('selected','selected');
			}
			
			if (null != slProject.logoImgDirectory) {
				$('[name="logoImgDirectory"]').val(slProject.logoImgDirectory);
			}
			if (null != slProject.logoImgSaveName) {
				$('[name="logoImgSaveName"]').val(slProject.logoImgSaveName);
			}
			if (null != slProject.projId) {
				$('[name="projId"]').val(slProject.projId);
			}
			if (null != slProject.logoImgOriginalName && '' != slProject.logoImgOriginalName) {
				$('[name="logoImgOriginalName"]').val(slProject.logoImgOriginalName);
				$('[name="fileText"]').html(slProject.logoImgOriginalName);
				
				$('[name="imgFile"]').attr('alt',slProject.logoImgOriginalName);
				$('[name="imgFile"]').attr('src',slProject.logoImgDirectory + "/" + slProject.logoImgSaveName);
				
				$("input:checkbox[class='qweasd']").attr('checked',true);
			    $('.zxcasd').css("display","block");   	
			}
			if (null != slProject.projectState) {
				$('[name="projectState"]').val(slProject.projectState);
			}
			
			if (null != slProject.usePc) {
				var checkUsePc = false;
				if ("1" == slProject.usePc) {
					checkUsePc = true;
				}
				$('[name="usePc"]').prop('checked', checkUsePc) ;
			}
			if (null != slProject.useMobile) {
				var checkUseMobile = false;
				if ("1" == slProject.useMobile) {
					checkUseMobile = true;
				}
				$('[name="useMobile"]').prop('checked', checkUseMobile) ;
			}
			if (null != slProject.useBack) {
				var checkUseBack = false;
				if ("1" == slProject.useBack) {
					checkUseBack = true;
				}
				$('[name="useBack"]').prop('checked', checkUseBack) ;
			}
			if (null != slProject.useResearBanner) {
				var checkUseResearBanner = false;
				if ("1" == slProject.useResearBanner) {
					checkUseResearBanner = true;
				}
				$('[name="useResearBanner"]').prop('checked', checkUseResearBanner) ;
			}
			if (null != slProject.useResearList) {
				var checkUseResearList = false;
				if ("1" == slProject.useResearList) {
					checkUseResearList = true;
				}
				$('[name="useResearList"]').prop('checked', checkUseResearList) ;
			}
			if (null != slProject.useFollowing) {
				var checkUseFollowing = false;
				if ("1" == slProject.useFollowing) {
					checkUseFollowing = true;
				}
				$('[name="useFollowing"]').prop('checked', checkUseFollowing) ;
			}
			
			$('[name="bt_insert"]').val('수정');
		}
		
		if (null != data.listSlRedirectUrl) {
			
			$.each(data.listSlRedirectUrl, function(index, value){
				
				var setNum = value.redirectType;
				if (10 > setNum) {
					setNum = '0'+setNum;
				}
				//console.log('setNum',setNum);
				var redirectUrlId = 'redirectUrl'+ setNum;
				setHtml = '<div class="inputsize"> <b>'+ setNum +'</b>. redirectUrl : '
				+'<input type="text" redirectUrlIndex="'+ setNum +'" name="redirectUrl" id="'+ redirectUrlId +'" value="'+ value.redirectUrl +'"> '
				+'<a class="abtn" name="minus"><img class="aimg" src="/resources/img/xbutton.png"></a></div>';
				$('#redirectUrlLi').append(setHtml);
			});
		}
		
		if (null != data.selectPnProject) {
			var pnProject = data.selectPnProject;
			$('[name="projectNameInner"]').val(pnProject.titleInner);
			$('[name="projectNameOuter"]').val(pnProject.titleOuter + " (" + pnProject.projNum +")");
			
			$.each($('[name="pmCode"] option'), function(){
				if (pnProject.pmName == $(this).text()) {
					$(this).attr("selected", "selected");
				}
			});
		}
	},
	setEvent : function(data){
		
		var setHtml = '';
		$('[name="redirectUrlSelector"]').on('change',function(){
			
			var numVal = $(this).val();
			var setNum = numVal;
			var setValue = "";
			if (0!=setNum) {
				
				if (10 > setNum) {
					setNum = '0'+setNum;
				}
				
				var redirectUrlId = 'redirectUrl'+ setNum;
				if ($('#'+redirectUrlId).length > 0) {
					//alert('values exist '+ redirectUrlId);
					alert('값이 존재합니다. '+ redirectUrlId);
				} else {
					
					if (null != data && null != data.listSlRedirectUrl) {
						
						var listSlRedirectUrl = data.listSlRedirectUrl;
						$.each(listSlRedirectUrl, function(index, value){
							console.log('numVal',numVal);
							console.log('setNum',setNum);
							console.log('listSlRedirectUrl value.redirectType',value.redirectType);
							if (numVal == value.redirectType) {
								setValue = value.redirectUrl;
							}
						});
					}
					
					setHtml = '<div class="inputsize"> <b>'+ setNum +'</b>. redirectUrl : '
					+'<input type="text" redirectUrlIndex="'+ numVal +'" name="redirectUrl" id="'+ redirectUrlId +'" value="'+ setValue +'"> '
					+'<a class="abtn" name="minus"><img class="aimg" src="/resources/img/xbutton.png"></a></div>';
					$('#redirectUrlLi').append(setHtml);
				}
			}
		});
		
		$('#redirectUrlLi').on('click','[name="minus"]',function(){ $(this).parents('div').remove(); });
		
		$('[name="bt_survey"]').on('click',function(){ projectRegJs.openPopup('survey',data.selectSlProject); });
		$('[name="bt_test"]').on('click',function(){ projectRegJs.openPopup('test',data.selectSlProject); });
		$('[name="bt_serveyUrl"]').on('click',function(){ projectRegJs.openPopup('serveyUrl',data.selectSlProject); });
		$('[name="bt_quater"]').on('click',function(){ projectRegJs.openPopup('quater',data.selectSlProject); });
		$('[name="bt_data"]').on('click',function(){ projectRegJs.openPopup('data',data.selectSlProject); });
		$('[name="bt_projectMnagement"]').on('click',function(){ projectRegJs.openPopup('projectMnagement',data.selectSlProject); });
		
		$('[name="bt_insert"]').on('click',function(){ projectRegJs.insertProject(); });
		$('[name="bt_cancel"]').on('click',function(){ console.log('bt_cancel'); location.href='/project/projectList'; });
		$('[name="bt_ImgUpload"]').on('click',function(){ projectRegJs.checkFile(); });
		
		$(".qweasd").click(function(){
		    if($("input:checkbox[class='qweasd']").is(":checked")){
		        $('.zxcasd').css("display","block");   	
		    }else{
		        $('.zxcasd').css("display","none");	
		    }
	    });
		
		var projectNameInner = $('[name="projectNameInner"]');
		projectNameInner.focusout(function(){
			
			var projectNameInnerVal = projectNameInner.val();
			var projectNumVal = $('[name="projectNum"]').val();
			
			var checkProjectNum = 0;
			var addProjectNumVal = '';
			if (null != projectNumVal && '' != projectNumVal && 0 < projectNumVal) {
				addProjectNumVal = '_'+ projectNumVal;
				checkProjectNum = projectNameInnerVal.indexOf(addProjectNumVal);
			}
			console.log('checkProjectNum',checkProjectNum);
			
			if ( 0 > checkProjectNum ) {
				$('[name="projectNameInnerText"]').val( projectNameInnerVal + addProjectNumVal );
			} else {
				$('[name="projectNameInnerText"]').val( projectNameInnerVal );
			}
		});
		
		// 배너조사 선택 시 조건
		$('[name="useResearBanner"]').on('change',function(){
			if($('[name="useResearBanner"]').is(':checked')) {
				alert('배너조사 선택시 \n이어하기 기능과 리스트조사는 선택할 수 없습니다.');
				$('[name="useFollowing"]').attr('checked', false);
				$('[name="useFollowing"]').attr('onclick', 'return false;');
				$('[name="useResearList"]').attr('checked', false);
				$('[name="useResearList"]').attr('onclick', 'return false;');
			} else {
				//alert('체크 해제');
				$('[name="useFollowing"]').removeAttr('onclick');
				$('[name="useResearList"]').removeAttr('onclick');
			}
		});
		
	}, 
	checkValidation : function(){
		var returnVal = true;
		if ( !commonJs.checkValidation('jobCode', 'select jobCode', 'select') ) {
			returnVal = false;
			return false; 
		}
		if ( !commonJs.checkValidation('projectNameInner', 'input projectNameInner', 'text') ) {
			returnVal = false;
			return false; 
		}
		if ( !commonJs.checkValidation('projectNameOuter', 'input projectNameOuter', 'text') ) {
			returnVal = false;
			return false; 
		}
		if ( !commonJs.checkValidation('surveyDisign', 'check surveyDisign', 'radio') ) {
			returnVal = false;
			return false; 
		}
		if ( !commonJs.checkValidation('customerCode', 'select customerCode', 'select') ) {
			returnVal = false;
			return false; 
		}
		if ( !commonJs.checkValidation('pmCode', 'select pmCode', 'select') ) {
			returnVal = false;
			return false; 
		}
		if ( !commonJs.checkValidation('useLanguage', 'select useLanguage', 'select') ) {
			returnVal = false;
			return false; 
		}
		
		var rText = $('#redirectUrlLi input:text');
		$.each($('#redirectUrlLi input:text'), function(index, value){
			var redirectType = $(this).attr('id');
			var redirectUrl = $(this).val();
			if (null == redirectUrl || "" == redirectUrl) {
				//alert('insert text '+redirectType);
				alert('텍스트 삽입 '+redirectType);
				$('#' + redirectType).focus();
				returnVal = false;
				return false;
			}
		});
		return returnVal;
	},
	setData : function(){
		var projectId = $('[name="projectId"]').val();
		var projId = $('[name="projId"]').val();
		var jobCode = $('[name="jobCode"] :selected').val();
		
		var regDate = commonJs.todayYYYYMMDD();
		
		var projectNameInner = $('[name="projectNameInner"]').val();
		var projectNameInnerText = $('[name="projectNameInnerText"]').val();
		if (null != projectNameInnerText && '' != projectNameInnerText) {
			
			var projectNumVal = $('[name="projectNum"]').val();
			var checkProjectNum = 0;
			var addProjectNumVal = '';
			
			if (null != projectNumVal && '' != projectNumVal && 0 < projectNumVal) {
				addProjectNumVal = '_'+ projectNumVal;
				checkProjectNum = projectNameInnerText.indexOf(addProjectNumVal);
			}
			
			if ( 0 > checkProjectNum ) {
				projectNameInner = projectNameInnerText + addProjectNumVal;
			} else {
				projectNameInner = projectNameInnerText;
			}
		}
		
		var projectNameOuter = $('[name="projectNameOuter"]').val();
		var surveyDisign = $('[name="surveyDisign"]:checked').val();
		var customerCode = $('[name="customerCode"] :selected').val();
		var pmCode = $('[name="pmCode"] :selected').val();
		var useLanguage = $('[name="useLanguage"] :selected').val();
		
		var usePc = $('[name="usePc"]').is(':checked');
		if (usePc) {usePc='1'} else {usePc='0'};
		var useMobile = $('[name="useMobile"]').is(':checked');
		if (useMobile) {useMobile='1'} else {useMobile='0'};
		var useBack = $('[name="useBack"]').is(':checked');
		if (useBack) {useBack='1'} else {useBack='0'};
		var useResearBanner = $('[name="useResearBanner"]').is(':checked');
		if (useResearBanner) {useResearBanner='1'} else {useResearBanner='0'};
		var useResearList = $('[name="useResearList"]').is(':checked');
		if (useResearList) {useResearList='1'} else {useResearList='0'};
		var useFollowing = $('[name="useFollowing"]').is(':checked');
		if (useFollowing) {useFollowing='1'} else {useFollowing='0'};
		
		var logoImgDirectory = $('[name="logoImgDirectory"]').val();
		var logoImgFullPath = $('[name="logoImgFullPath"]').val();
		var logoImgSaveName = $('[name="logoImgSaveName"]').val();
		var logoImgOriginalName = $('[name="logoImgOriginalName"]').val();
		
		var rText = $('#redirectUrlLi input:text');
		var rTextLen = rText.length;
		var listSlRedirectUrl = new Array(rTextLen);
		//console.log($('#redirectUrlLi input:text').length);
		$.each($('#redirectUrlLi input:text'), function(index, value){
			var redirectType = $(this).attr('id');
			var redirectUrlIndex = $(this).attr('redirectUrlIndex');
			var redirectUrl = $(this).val();
			var setObject = new Object();
			//setObject.redirectType = redirectType;
			setObject.redirectType = parseInt(redirectUrlIndex);
			setObject.redirectUrl = redirectUrl;
			listSlRedirectUrl[index] = setObject;
		});
		//console.log('listSlRedirectUrl',listSlRedirectUrl);
		
		var returnData = {
				projectId : projectId,
				projId : projId,
				jobCode : jobCode,		
				regDate : regDate,
				projectNameInner : projectNameInner,
				projectNameOuter : projectNameOuter,
				surveyDisign : surveyDisign,
				customerCode : customerCode,
				pmCode : pmCode,
				useLanguage : useLanguage,
				usePc : usePc,
				useMobile : useMobile,
				useBack : useBack,
				useResearBanner : useResearBanner,
				useResearList : useResearList,
				useFollowing : useFollowing,
				listSlRedirectUrl : listSlRedirectUrl,
				logoImgDirectory : logoImgDirectory,
				logoImgFullPath : logoImgFullPath,
				logoImgSaveName : logoImgSaveName,
				logoImgOriginalName : logoImgOriginalName,
		};
		
		return returnData;
	},
	insertProject : function(){
		
		var checkValidation = projectRegJs.checkValidation();
		console.log('insertProject checkValidation',checkValidation);
		
		if(checkValidation){
			var setData = projectRegJs.setData();
			console.log('setData',setData);
			
			var urlVal = '/project/insertProjectReg';
			console.log("urlVal",urlVal);
			$.ajax({
			    url   		: urlVal,
			    type  		: "post",
			    dataType    : "json",
			    contentType : "application/json",
			    data  		: JSON.stringify( setData ),
			    success     : function(responseData){
			    	console.log("projectRegJs insertProjectReg",responseData);
			    	if (null != responseData) {
			    		//projectRegJs.setProjectReg(responseData);
			    		if (responseData.insertProject) {
			    			//alert('insert success');
			    			alert('삽입 성공');
			    			location.href='/project/projectList';
			    		}
			    		if (responseData.updateSlProject) {
			    			//alert('update success');
			    			alert('수정 성공');
			    			location.href='/project/projectList';
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
			
			/*var ext = uploadFile.val().split('.').pop().toLowerCase();
			if($.inArray(ext, ['jpg']) == -1) {
				alert('Jsp only upload files');
				return;
			}else{
				projectRegJs.imgUpload();
			}*/
			projectRegJs.imgUpload();
			
		} else{
			//alert("select Img");
			alert('이미지를 선택하세요');
		}
	},
	imgUpload : function () {
		
		var urlVal = "/file/fileUpload";
		var form = new FormData(document.getElementById('imgUploadForm'));
		$.ajax({
            url         : urlVal,
            type        : 'POST',
            data  		: form,
            dataType    : 'json',
            contentType     : false,
            processData		: false,
            success           : function(data){
                  console.log("data.fileVO",data.fileVO);
                  if (null != data && null != data.fileVO) {
                	  projectRegJs.setLogoImg(data.fileVO);
                	  if (null != data.fileVO.fileSaveName && "" != data.fileVO.fileSaveName) {
                		  //alert("Save Success");
                		  alert('저장 성공');
                	  }
                  }
            },
            error       : function(request,status,error){
                  //console.log("error request",request);                  
                  //console.log("error status",status);                  
                  //console.log("error error",error);                  
            }            
      });   
		
	},
	setLogoImg : function (logImg) {
		$('[name="logoImgDirectory"]').val(logImg.fileDirectory);
		$('[name="logoImgFullPath"]').val(logImg.fileFullPath);
		$('[name="logoImgSaveName"]').val(logImg.fileSaveName);
		$('[name="logoImgOriginalName"]').val(logImg.fileOriginalName);
		$('[name="fileText"]').text(logImg.fileOriginalName);
		$('[name="imgFile"]').attr('alt',logImg.fileOriginalName);
		$('[name="imgFile"]').attr('src',logImg.fileDirectory + "/" + logImg.fileSaveName);
	},
	openPopup : function (type, selectSlProject) {
		
		if (null != selectSlProject) {
			
			var projectState = selectSlProject.projectState;
			
			if ('1' == projectState || '3' == projectState) {
				
				var checkVal = false;
				if ('survey' == type) {
					checkVal = true;
				} else if ('quater' == type) {
					checkVal = true;
				} else if ('projectMnagement' == type) {
					checkVal = true;
				}
				if (checkVal) {
					//alert('Can not be used when started');
					alert('시작시 사용할 수 없습니다.');
					return false;
				}
			} else {
				
				var projectId = $('[name="projectId"]').val();
				
				if ('survey' == type) {
					console.log('bt_survey');
					location.href='/hardCoding/fileUpload?projectId='+projectId;
				} else if ('test' == type) {
					console.log('bt_test');
				} else if ('serveyUrl' == type) {
					console.log('bt_serveyUrl');
				} else if ('quater' == type) {
					console.log('bt_quater');
				} else if ('data' == type) {
					console.log('bt_data');
				} else if ('projectMnagement' == type) {
					console.log('bt_projectMnagement');
				} else {
					
				}
			}
		} else {
			//alert('can not use');
			alert('사용할 수 없음.');
			return false;
		}
		
	}
}

$(function(){
	projectRegJs.init();
});