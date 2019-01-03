
var fileUploadJs = {
		
	init : function(){
		
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
					fileUploadJs.setEvent(responseData);
					fileUploadJs.setSlHardCoding(responseData);
				}
			},
			error : function(e){
				//console.log("error",e);
			}
		});
	},
	setSlHardCoding : function (data) {
		
		if (null != data.selectSlHardCoding) {
			
			var slHardCoding = data.selectSlHardCoding;
			if (null != slHardCoding.fileOriginalName) {
				
				$('[name="hardCodingId"]').val(slHardCoding.hardCodingId);
				//$('[name="fileDirectory"]').val(slHardCoding.fileDirectory);
				$('[name="fileFullPath"]').val(slHardCoding.fileFullPath);
				$('[name="fileSaveName"]').val(slHardCoding.fileSaveName);
				$('[name="fileOriginalName"]').val(slHardCoding.fileOriginalName);
				$('[name="fileText"]').html(slHardCoding.fileOriginalName);
				$('[name="bt_insert"]').val('수정');
			} 
		}else {
			$('[name="hardCodingId"]').val(0);
		}
	},
	setEvent : function(data){
		
		$('[name="bt_insert"]').on('click',function(){ fileUploadJs.insertSlHardCoding(); });
		$('[name="bt_cancel"]').on('click',function(){ location.href='/project/projectList'; });
		$('[name="bt_excelUpload"]').on('click',function(){ fileUploadJs.checkFile(); });
		$('[name="bt_test"]').on('click',function(){ fileUploadJs.test(); });
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
		else { alert('insert file'); }
		
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
			    		if (responseData.insertSlHardCoding) {
			    			alert('insert success');
			    			location.href='/project/projectList';
			    		}
			    		if (responseData.updateSlHardCoding) {
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
			if($.inArray(ext, ['xls']) == -1) {
				alert('xlsx file upload only');
				return;
			}else{
				fileUploadJs.excelUpload();
			}
		} else{
			alert("select Img");
		}
	},
	excelUpload : function () {
		
		var urlVal = "/file/fileUpload";
		var form = new FormData(document.getElementById('excelUploadForm'));
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
                	  fileUploadJs.setFileData(data.fileVO);
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
	setFileData : function (fileVO) {
		//$('[name="fileDirectory"]').val(fileVO.fileDirectory);
		$('[name="fileFullPath"]').val(fileVO.fileFullPath);
		$('[name="fileSaveName"]').val(fileVO.fileSaveName);
		$('[name="fileOriginalName"]').val(fileVO.fileOriginalName);
		$('[name="fileText"]').text(fileVO.fileOriginalName);
	}, 
	test : function () {
		var projectId = $('[name="projectId"]').val();
		var urlVal = "/file/fileReadWrite";
		console.log("test projectId",projectId);
		$.ajax({
			url   		: urlVal,
			type  		: "post",
			dataType    : "json",
			contentType : "application/json",
			data  		: JSON.stringify( {projectId:projectId} ),
			success     : function(responseData){
				console.log("setSlHardCoding data",responseData);
				if (null != responseData) {
				}
			},
			error : function(e){
				//console.log("error",e);
			}
		});
	}
}

$(function(){
	fileUploadJs.init();
});