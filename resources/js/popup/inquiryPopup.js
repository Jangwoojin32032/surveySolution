
var loading = "";
var inquiryPopup = {
		
	init : function(){
		loading = $('<div id="loading" class="loading"></div><img id="loading_img" alt="loading" src="/resources/img/loading2.gif" />').appendTo(document.body).hide();
		var projectId = $('[name="projectId"]').val();
		var uCode = $('[name="uCode"]').val();
		console.log('projectId',projectId);
		console.log('uCode',uCode);
		inquiryPopup.buttonEvent();
	},
	buttonEvent : function () {    	
    	$('[name="bt_inquiry"]').on("click", function() {
    		//alert("등록하기");    		
    		inquiryPopup.checkValidation();
    	});
    	$('[name="bt_cancel"]').on("click", function() {
    		if(confirm("창을 닫으시겠습니까?")) {
				window.close();
			}
    	});
    },
    checkValidation : function () {    	
    	if ( !commonJs.checkValidation('userEmail', '이메일을 입력하세요', 'text') ) { $('[name="userEmail"]').focus(); return false; }
    	if ( !commonJs.checkValidation('inquiryTitle', '제목을 입력하세요', 'text') ) { $('[name="inquiryTitle"]').focus(); return false; }    	
		if ( !commonJs.checkValidation('inquiryContents', '문의내용을 입력하세요', 'text') ) { $('[name="inquiryContents"]').focus(); return false; }

		if(confirm("등록하시겠습니까?")) {
			inquiryPopup.insertInquiry();
		}
    },
    getHtml2Text : function (sHtml) {
    	sHtml.replace("<","&lt;");
    	sHtml.replace(">","&gt;");
    	sHtml.replace("\"","&quot;");
		return sHtml;
    },
    setData : function () {
    	var projectId = $('[name="projectId"]').val();
    	var uCode = $('[name="uCode"]').val();
    	var userEmail = $('[name="userEmail"]').val();
    	var inquiryTitle = $('[name="inquiryTitle"]').val();
    	//var tmp_inquiryContents = ($('[name="inquiryContents"]').val()).replace("\r\n"," ");
    	var tmp_inquiryContents = ($('[name="inquiryContents"]').val()).replace(/(?:\r\n|\r|\n)/g, ' ');
    	//replace(/(?:\r\n|\r|\n)/g, '	')
    	console.log('tmp_inquiryContents',tmp_inquiryContents);
    	var inquiryContents = inquiryPopup.getHtml2Text(tmp_inquiryContents);
    	
    	var returnData = {    			
    			projectId : projectId,
    			uCode : uCode,
    			userEmail : userEmail,
    			inquiryTitle : inquiryTitle,
    			inquiryContents : inquiryContents
    	};
    	//console.log('returnData',returnData);
    	return returnData;
    },
    insertInquiry : function() {
    	loading.show();
    	
    	var urlVal = "/survey/insertInquiry";
    	$.ajax({
            url   		: urlVal,
            type  		: "post",
            dataType    : "json",
            contentType : "application/json",
            data  		: JSON.stringify( inquiryPopup.setData() ),
            success     : function(responseData){
            	//console.log("responseData",responseData);
            	if (null != responseData) {
        			if (responseData.insertInquiry) {
            			alert("문의가 등록되었습니다.");
            			if(confirm("창을 닫으시겠습니까?")) {
            				window.close();
            			}
            		}
            	}
            },
            error : function(e){
            	//console.log("error",e);
            }            
    	});
    	loading.hide();
    }
	
}

$(function(){
	inquiryPopup.init();
});