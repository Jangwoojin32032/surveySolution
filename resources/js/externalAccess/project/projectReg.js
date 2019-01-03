
var projectRegJs = {
		
	init : function(){
		
		var projectId = $('[name="projectId"]').val();
		var projId = $('[name="projId"]').val();
		var projectState = "in";
		console.log("projectId",projectId);
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
					projectRegJs.setEvent(responseData);
					projectRegJs.setProjectReg(responseData);
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
			if (null != slProject.logoImgOriginalName) {
				$('[name="logoImgOriginalName"]').val(slProject.logoImgOriginalName);
				$('[name="fileText"]').html(slProject.logoImgOriginalName);
				
				$('[name="imgFile"]').attr('alt',slProject.logoImgOriginalName);
				$('[name="imgFile"]').attr('src',slProject.logoImgDirectory + "/" + slProject.logoImgSaveName);
			}
			
			if (null != slProject.usePc) {
				var checkUsePc = false;
				if ("1" == slProject.usePc) {
					checkUsePc = true;
				}
				$('[name="usePc"]').prop('checked', checkUsePc) ;
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
					alert('values exist '+ redirectUrlId);
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
		
		$('[name="bt_insert"]').on('click',function(){ projectRegJs.insertProject(); });
		$('[name="bt_cancel"]').on('click',function(){ location.href='/project/projectList'; });
		$('[name="bt_ImgUpload"]').on('click',function(){ projectRegJs.checkFile(); });
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
				alert('insert text '+redirectType);
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
		var projectNameInner = $('[name="projectNameInner"]').val();
		var projectNameOuter = $('[name="projectNameOuter"]').val();
		var surveyDisign = $('[name="surveyDisign"]:checked').val();
		var customerCode = $('[name="customerCode"] :selected').val();
		var pmCode = $('[name="pmCode"] :selected').val();
		var useLanguage = $('[name="useLanguage"] :selected').val();
		
		var usePc = $('[name="usePc"]').is(':checked');
		if (usePc) {usePc='1'} else {usePc='0'};
		var useBack = $('[name="useBack"]').is(':checked');
		if (useBack) {useBack='1'} else {useBack='0'};
		var useResearBanner = $('[name="useResearBanner"]').is(':checked');
		if (useResearBanner) {useResearBanner='1'} else {useResearBanner='0'};
		var useResearList = $('[name="useResearList"]').is(':checked');
		if (useResearList) {useResearList='1'} else {useResearList='0'};
		
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
				projectNameInner : projectNameInner,
				projectNameOuter : projectNameOuter,
				surveyDisign : surveyDisign,
				customerCode : customerCode,
				pmCode : pmCode,
				useLanguage : useLanguage,
				usePc : usePc,
				useBack : useBack,
				useResearBanner : useResearBanner,
				useResearList : useResearList,
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
			    			alert('insert success');
			    			location.href='/project/projectList';
			    		}
			    		if (responseData.updateSlProject) {
			    			alert('update success');
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
			
			var ext = uploadFile.val().split('.').pop().toLowerCase();
			if($.inArray(ext, ['jpg']) == -1) {
				alert('jpg 파일만 업로드 할수 있습니다.');
				return;
			}else{
				projectRegJs.imgUpload();
			}
		} else{
			alert("select Img");
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
                		  alert("Save Success");
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
		$('[name="logoImgFullPath"]').val(logImg.filePath);
		$('[name="logoImgSaveName"]').val(logImg.fileSaveName);
		$('[name="logoImgOriginalName"]').val(logImg.fileOriginalName);
		$('[name="fileText"]').text(logImg.fileOriginalName);
		$('[name="imgFile"]').attr('alt',logImg.fileOriginalName);
		$('[name="imgFile"]').attr('src',logImg.fileDirectory + "/" + logImg.fileSaveName);
	}
}

$(function(){
	projectRegJs.init();
});