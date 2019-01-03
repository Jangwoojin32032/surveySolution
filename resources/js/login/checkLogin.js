
var checkLoginJs = {
		
	init : function(){
		checkLoginJs.setEvent();
	},
	setEvent : function () {
			
		var urlVal = '/login/checkLogin';
		console.log("urlVal",urlVal);
		$.ajax({
		    url   		: urlVal,
		    type  		: "post",
		    dataType    : "json",
		    contentType : "application/json",
		    //data  		: JSON.stringify( {id:id, passWd:passWd} ),
		    success     : function(responseData){
		    	console.log("checkLoginJs checkLogin",responseData);
		    	if (null != responseData && null != responseData.pnAdminVO) {
		    		checkLoginJs.setHtml(responseData.pnAdminVO);
		    	} else {
		    		alert('로그인이 필요합니다.');
		    		location.href='/login/login';
		    	}
		    },
		    error : function(e){
		    	//console.log("error",e);
		    }
		});
	},
	setHtml : function (pnAdminVO) {
		$('#setId').html('');
		$('#setId').html(pnAdminVO.id+' 님');
		$('[name="userId"]').val(pnAdminVO.id);
	}
}

$(function(){
	checkLoginJs.init();
});