
var loading = "";
var customScriptJs = {
		
	init : function(){
		loading = $('<div id="loading" class="loading"></div><img id="loading_img" alt="loading" src="/resources/img/loading2.gif" />').appendTo(document.body).hide();
		customScriptJs.btEvent();			// set button event
		customScriptJs.getCustomScript();	// get customScript info
	},
	btEvent : function () {
		var projectId = $('[name="projectId"]').val();
		console.log('projectId',projectId);
		
		$('#bt_reg').on('click',function(){ location.href = '/customScript/regCustomScript?projectId=' + projectId; });		
		$('#bt_delete').on('click',function(){ customScriptJs.delCustomScript(); });
		$('[name="bt_apply"]').on('click',function(){ customScriptJs.applyCustomScript(); });
		$('[name="bt_cancel"]').on('click',function(){ location.href='/project/projectList'; });		
		/*		
		$('#bt_qRotInsert3').on('click',function(){ $('#rotationType').val('qRotPart'); });
		$('#bt_insertRotation').on('click',function(){ rotationJs.setRotation(); });
		*/		
	},
	getCustomScript : function () {
		var projectId = $('[name="projectId"]').val();
		
		var urlVal = localhost+'/customScript/getCustomScript';
		$.ajax({
			url   		: urlVal,
			type  		: "post",
			dataType    : "json",
			contentType : "application/json",
			async		: false,
			data  		: JSON.stringify( {projectId:projectId} ),
			success     : function(responseData){
				console.log("getCustomScript data",responseData);
				if (null != responseData) {
					customScriptJs.setCustomScriptListHtml(responseData);
				//	rotationJs.setInitialization();
				}
			},
			error : function(e){
				loading.hide();
			}
		});
	},
	setCustomScriptListHtml : function(data) {
		
		$("#hardCodingId").val(data.hardCodingId);
		
		var customScriptListHtml = "";
		var applyQuestion = "";
		$.each(data.listSlCustomScript, function(index, value){
			if(value.customScriptApplyQuestion == '') {
				applyQuestion = '모든 문항';
			} else {
				applyQuestion = value.customScriptApplyQuestion;
			}
			console.log('applyQuestion',applyQuestion);
			if(value.deleteYn == 'N') {
				
				customScriptListHtml += '<tr>'
									+ '		<td>'+(index+1)+'</td>'
									+ '		<td>'+value.customScriptGubun+'</td>'
									+ '		<td>'+value.customScriptName+'</td>'
									+ '		<td>'+applyQuestion+'</td>'
									+ '		<td>'+value.regDate+'</td>'
									+ '		<td><input type="button" value="내용보기" id="bt_contents" onclick="customScriptJs.customScriptContents(\''+value.customScriptId+'\')"></td>'
									+ '		<td><input type="button" value="삭제" id="bt_delete" onclick="customScriptJs.delCustomScript(\''+value.customScriptId+'\')"></td>'
									+ '	</tr>';
			}
		});
		
		$("#setHtml").html(customScriptListHtml);
	},
	customScriptContents : function(customScriptId) {
		
		var projectId = $('[name="projectId"]').val();
		
		var openUrl = '/popup/customScriptPopup?projectId='+ projectId +'&customScriptId='+ customScriptId; 
		popStatus = window.open(openUrl, "Quater Popup", "width=1200, height=1000, toolbar=no, menubar=no, scrollbars=no, resizable=yes");
		popStatus.focus();
	},
	delCustomScript : function(customScriptId) {
		var projectId = $('[name="projectId"]').val();
		
		var urlVal = localhost+'/customScript/delCustomScript';
		$.ajax({
			url   		: urlVal,
			type  		: "post",
			dataType    : "json",
			contentType : "application/json",
			async		: false,
			data  		: JSON.stringify( {projectId:projectId, customScriptId:customScriptId} ),
			success     : function(responseData){
				console.log("delCustomScript data",responseData);
				if (null != responseData) {
					if(responseData.delResult == true) {
						//alert("delete success.");
						alert("삭제 성공");
						customScriptJs.getCustomScript();
					} else {
						//alert("delete fail");
						alert("삭제 실패");
						return false;
					}
				}
			},
			error : function(e){}
		});		
	},
	applyCustomScript : function(customScriptId) {
		var projectId = $('[name="projectId"]').val();
		var hardCodingId = $('[name="hardCodingId"]').val();
		
		var urlVal = localhost+'/file/customScriptFileReadWrite';
		$.ajax({
			url   		: urlVal,
			type  		: "post",
			dataType    : "json",
			contentType : "application/json",
			async		: false,
			data  		: JSON.stringify( {projectId:projectId, hardCodingId:hardCodingId} ),
			success     : function(responseData){
				console.log("applyCustomScript data",responseData);
				if (null != responseData) {
					if(responseData.returnVal == true) {
						//alert("apply success");
						alert("적용 성공");
					} else {
						//alert("apply fail");
						alert("적용 실패");
						return false;
					}
				}
			},
			error : function(e){
			}
		});		
	},
}

$(function(){
	customScriptJs.init();
});