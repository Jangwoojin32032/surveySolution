<script>

	$(function(){
		var currentSize = 1;	
		var $speech = $("article.bitcoin");
		var stat = $('.numberUpDown').text();
		var num = parseInt(stat);
		
	
		$('.increaseQuantity').click(function(){
			num++;
			if(num>5){	
				alert('더이상 키울수 없습니다.');
				num=5;
			}else if($(this).attr('class') == "increaseQuantity"){
				currentSize *= 1.1;	
			}
			$speech.css("transform", "scale( " + currentSize + ")" ).css("margin-bottom","50px");
			console.log("+currentSize",currentSize);
			$('.numberUpDown').text(num);
		});
		
		$('.decreaseQuantity').click(function(){
			num--;
			if(num<=0){	
				alert('더이상 줄일수 없습니다.');
				num =1;
			} else if($(this).attr('class') == "decreaseQuantity") {
				currentSize /= 1.1;	
			}
			$speech.css("transform","scale( " + currentSize + ")" ).css("margin-bottom","0");	
			console.log("-currentSize",currentSize);
			$('.numberUpDown').text(num);
		});
		
		$('.reset').click(function(){
			num=1;
			currentSize = 1;
			$speech.css("transform","scale( " + currentSize + ")" ).css("margin-bottom","0");	
			$('.numberUpDown').text(num);
		});
		
		
		
	});
	
	function captionclick(obj) {
	    if ("INPUT" == event.srcElement.tagName)
	        event.cancelBubble = true;
	    else {
	        obj.children[0].click();
	        return false;
	    }
	}
	function setInquiry(projectId, projectNameOuter, uCode) {
		// 조사관련 문의
			
		var projectId = $('[name="projectId"]').val();
		
		var openUrl = '/popup/inquiryPopup?projectId='+ projectId +'&projectNameOuter='+ projectNameOuter + '&uCode=' + uCode;
		popStatus = window.open(openUrl, "Quater Popup", "width=900, height=767, toolbar=no, menubar=no, scrollbars=no, resizable=yes");
		popStatus.focus();
	}
</script>