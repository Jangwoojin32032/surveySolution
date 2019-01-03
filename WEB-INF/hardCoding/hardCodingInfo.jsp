<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
    request.setCharacterEncoding("utf-8");
	String uCode = request.getParameter("uCode"); 
	if(null == uCode || "".equals(uCode)){
		uCode = "";
	}
	String surveyState = request.getParameter("surveyState"); 
	if(null == surveyState || "".equals(surveyState)){
		surveyState = "";
	}
%>
<html>
<head>
	<meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
	<meta name='viewport' content='width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no'/>
	<meta name='format-detection' content='telephone=no, address=no, email=no'/>
	<title>project_out</title>
	<link rel='stylesheet' type='text/css' href='http://localhost:8080/upload/hardCoding/v02/55/css/survey.css'>
	<script type='text/javascript' charset='utf-8' src='http://localhost:8080/upload/hardCoding/lib/jquery-1.11.1/jquery-1.11.1.min.js' ></script>
	<script type='text/javascript' charset='utf-8' src='http://localhost:8080/upload/hardCoding/js/jquery-1.11.2.min.js' ></script>
	<script type='text/javascript' charset='utf-8' src='http://localhost:8080/upload/hardCoding/js/common/common.js' ></script>
	<script type='text/javascript' charset='utf-8' src='http://localhost:8080/upload/hardCoding/v02/55/js/survey/surveyCommon.js' ></script>
	<script type='text/javascript' charset='utf-8' src='http://localhost:8080/upload/hardCoding/v02/55/js/survey/survey1.js' ></script>
	<script type='text/javascript' charset='utf-8' src='http://localhost:8080/upload/hardCoding/v02/55/js/survey/Q1.js' ></script>
</head>

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
</script>


<body>	
	<section class="container">
		<article class="bitcoin">
			<!-- <header>
				<img src="/resources/img/logo.png">
				<aside>
					<div>
						100%
					</div> 
				</aside>	
				<div class="size">
					<span class="numberUpDown">1</span>
					<div>
						<a class="reset">초기화</a>
					</div>
					<div>
						<a class="increaseQuantity">+</a>
					</div>
					<div>
						<a class="decreaseQuantity">-</a>
					</div>
				</div>
			</header> -->
			
			Info Test uCode : ${uCode } , projectId : ${projectId}
			<input type="hidden" name="projectId" value="${projectId}" />
			<input type="hidden" name="uCode" value="${uCode}" />
			
			<footer>
				<button id='bt_next'>다음</button>			
			</footer>		
		</article><!-- 내용틀 -->
	</section><!-- 시작틀 -->
</body>
</html>

