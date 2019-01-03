
var regCustomScriptJs = {
		
	init : function(){
		var projectId = $('[name="projectId"]').val();
		
		regCustomScriptJs.btEvent(projectId);			// set button event
		regCustomScriptJs.getCustomScript();			// get customScript info
	},
	btEvent : function (projectId) {
		$('#bt_reg').on('click',function(){ regCustomScriptJs.insertCustomScript(); });
		$('[name="bt_cancel"]').on('click',function(){ location.href='/customScript/customScript?projectId='+projectId; });
		/*
		$('#bt_qRotInsert2').on('click',function(){ $('#rotationType').val('qRot'); });
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
					regCustomScriptJs.setCustomScriptListHtml(responseData);
				//	rotationJs.setInitialization();
				}
			},
			error : function(e){}
		});
	},
	setCustomScriptListHtml : function (data) {
		
		// 프로젝트 이름 설정
		var selectSlProject = data.selectSlProject;
		var projectNameInner = selectSlProject.projectNameInner;
		console.log("setCustomScriptListHtml projectNameInner",projectNameInner);
		$('#projectNameInner').html(projectNameInner);
		
		var customScriptApplyCountHtml = "<option value=''>select</option><option value='All'>All</option>";
		var customScriptApplyQuestionHtml = "";
		var questionName = "";
		$.each(data.listSlQuestionViewPage, function(index, value){
			$.each(data.listSlQuestion, function(index2, value2){
				if(value.pageTitleQuestionName == value2.questionName) {
					questionName = value2.questionTitle;
					return false;
				}
			});
			customScriptApplyCountHtml += '<option value='+(index+1)+'>'+(index+1)+'</option>';
			customScriptApplyQuestionHtml += '<option value='+value.pageTitleQuestionName+'>'+value.pageTitleQuestionName+' '+questionName+'</option>';
			
		});
		$('#customScriptApplyCount').html(customScriptApplyCountHtml);
//		$('#customScriptApplyQuestion').html(customScriptApplyQuestionHtml);
		
		$('#customScriptApplyCount').on('change',function(){	// selectbox option 변경 시 '문항 로테이션(파트) 설정' > '메인 문항 선택'
			var selectedValue = $(this).val();
			
			// set Html question selectbox '문항 수 선택 만큼' > '문항 선택 selectbox 수 늘어남'
			//console.log('selectedValue',selectedValue);
			regCustomScriptJs.setSelectboxQuestion('tdQuestion','customScriptApplyQuestion',selectedValue,customScriptApplyQuestionHtml);
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
	insertCustomScript : function() {
		var checkValidation = regCustomScriptJs.checkValidation();
		console.log('insertCustomScript checkValidation',checkValidation);
		
		if(checkValidation){
			var setData = regCustomScriptJs.setData();
			console.log('setData',setData);
			
			var urlVal = localhost+'/customScript/insertCustomScript';
			console.log("urlVal",urlVal);
			$.ajax({
			    url   		: urlVal,
			    type  		: "post",
			    dataType    : "json",
			    contentType : "application/json",
			    data  		: JSON.stringify( setData ),
			    success     : function(responseData){
			    	console.log("regCustomScriptJs insertCustomScript",responseData);			    	
			    	if (null != responseData) {
			    		if (responseData.insResult) {
			    			//alert('insert success');
			    			alert("삽입 성공");
			    			location.href='/customScript/customScript?projectId='+setData.projectId;
			    		}
			    	}
			    },
			    error : function(e){
			    	//console.log("error",e);
			    }
			});
		}
	},	
	setData : function(){
		var projectId = $('[name="projectId"]').val();
		var customScriptName = $('[name="customScriptName"]').val();
		var customScriptGubun = $('[name="customScriptGubun"] :selected').val();
		var customScriptApplyCount = $('[name="customScriptApplyCount"] :selected').val();
		var customScriptApplyQuestion = "";
		for (var i=1; i<=customScriptApplyCount; i++) {
			customScriptApplyQuestion += $('[name="customScriptApplyQuestion_'+i+'"] :selected').val();
			if(i != customScriptApplyCount) {
				customScriptApplyQuestion += ",";
			}
		}
		var customScriptContents = $('[name="customScriptContents"]').val();
		customScriptContents = customScriptContents.replace("\r\n", "<br>");
		console.log('customScriptContents',customScriptContents);
		var returnData = {
				projectId : projectId,
				customScriptName : customScriptName,
				customScriptGubun : customScriptGubun,
				customScriptApplyCount : customScriptApplyCount,
				customScriptApplyQuestion : customScriptApplyQuestion,
				customScriptContents : customScriptContents,
		};
		
		return returnData;
	},
	checkValidation : function () {
		var returnVal = true;
		if ( !commonJs.checkValidation('customScriptName', 'input text customScriptName', 'text') ) {
			returnVal = false;
			return false; 
		}
		if ( !commonJs.checkValidation('customScriptGubun', 'select customScriptGubun', 'select') ) {
			returnVal = false;
			return false; 
		}
		if ( !commonJs.checkValidation('customScriptApplyCount', 'select customScriptApplyCount', 'select') ) {
			returnVal = false;
			return false; 
		}
		var queSel = $('#customScriptApplyCount').val();
		console.log('queSel',queSel);
		/*
		for(var i=1; i<=queSel; i++) {
			if ( !commonJs.checkValidation('customScriptApplyQuestion_'+i, 'select customScriptApplyQuestion_'+i, 'select') ) {
				returnVal = false;
				return false; 
			}
		}
		*/
		if ( !commonJs.checkValidation('customScriptContents', 'input text customScriptContents', 'textarea') ) {
			returnVal = false;
			return false; 
		}		
		
		return returnVal;
	}
}

$(function(){
	regCustomScriptJs.init();
});