
var loading = "";
var loginJs = {
		
	init : function(){
		loading = $('<div id="loading" class="loading"></div><img id="loading_img" alt="loading" src="/resources/img/loading2.gif" />').appendTo(document.body).hide();
		$('#bt_login').on('click',function(){ 
			loginJs.setEvent();
		});
		
		$('#passWd').keypress(function(event){ 
			console.log(event);
			if ((event.which == 13) || (event.keyCode == 13)) {
				loginJs.setEvent();
			}			
		});
	},
	setEvent : function () {
		
		loading.show();
		var id = $('#id').val();
		var passWd = $('#passWd').val();
		console.log("id",id);
		console.log("passWd",passWd);
		
		var urlVal = '/login/setLogin';
		console.log("urlVal",urlVal);
		$.ajax({
		    url   		: urlVal,
		    type  		: "post",
		    dataType    : "json",
		    contentType : "application/json",
		    data  		: JSON.stringify( {id:id, passWd:passWd} ),
		    success     : function(responseData){
		    	console.log("loginJs setLogin",responseData);
		    	if (null != responseData) {
		    		if(responseData.isCheckLogin) {
		    			//alert('login success');
		    			alert('로그인 성공');
		    			loading.hide();
		    			location.href='/project/projectList';
		    		} else {
		    			//alert('login fail');
		    			alert('아이디 또는 비밀번호를 확인하여 주세요.');
		    			loading.hide();
		    			location.href='/login/login';
		    		}
		    	} else {
		    		//alert('login fail');
		    		alert('로그인 실패');
		    		loading.hide();
		    		location.href='/login/login';
		    	}
		    },
		    error : function(e){
		    	loading.hide();
		    	//console.log("error",e);
		    }
		});
	}
}

$(function(){
	loginJs.init();
});