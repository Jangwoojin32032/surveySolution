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
	String checkNum = request.getParameter("checkNum"); 
	if(null == checkNum || "".equals(checkNum)){
		checkNum = "";
	}
%>
<html>
<head>
	<meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
	<meta name='viewport' content='width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no'/>
	<meta name='format-detection' content='telephone=no, address=no, email=no'/>
	<title>문항로테이션 순서 테스트4</title>
	<link rel='stylesheet' type='text/css' href='http://localhost:8080/upload/hardCoding/v02/125/css/survey.css'>
	<script type='text/javascript' charset='utf-8' src='http://localhost:8080/upload/hardCoding/lib/jquery-1.11.1/jquery-1.11.1.min.js' ></script>
	<script type='text/javascript' charset='utf-8' src='http://localhost:8080/upload/hardCoding/js/jquery-1.11.2.min.js' ></script>
	<script type='text/javascript' charset='utf-8' src='http://localhost:8080/upload/hardCoding/js/common/common.js' ></script>
	<script type='text/javascript' charset='utf-8' src='http://localhost:8080/upload/hardCoding/v02/125/js/survey/survey1.js' ></script>
	<script type='text/javascript' charset='utf-8' src='http://localhost:8080/upload/hardCoding/v02/125/js/survey/Q2.js' ></script>
</head>
	<script type='text/javascript' charset='utf-8' src='http://localhost:8080/upload/hardCoding/v02/125/js/survey/surveyCommon.js' ></script>
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
			<!-- 머리 -->
			<header>
				<img id="imgLog" src="/resources/img/logo.png">
				<aside>
					<div>
						100%
					</div> 
				</aside>	
				<div class="size"> <!-- data-cell="설문키우기" -->
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
			</header>
		<input type='hidden' name='projectId' value='125' /> 
		<input type='hidden' name='hardCodingId' value='141' /> 
		<input type='hidden' name='uCode' value='<%= uCode%>' /> 
		<input type='hidden' name='businessId' value='null' /> 
		<input type='hidden' name='surveyResult' value='' /> 
		<input type='hidden' name='nextPageName' value='' /> 
		<input type='hidden' name='checkNum' value='<%= checkNum%>' /> 
		<input type='hidden' name='questionId' value='5539' /> 
		<input type='hidden' name='questionName' value='rot2Q2' /> 
		<input type='hidden' name='checkMoveQType' value='Y' /> 
		<input type='hidden' name='rotationUse' value='Y' /> 
		<input type='hidden' name='rotationMain' value='Q2' /> 
		<input type='hidden' name='rotationIndex' value='2' /> 
		<input type='hidden' name='rotationValue' value='2' /> 

<div id='setBody'> 
<section class="contents"> 
	<article> 
		<div> 
			Q2.  
		</div> 
		<div> 
			지역을 선택해 주세요. 
		</div> 
	</article> 
	<article class="survey_form"> 
		<ul> 
			<li><label><input type="radio" name="rot2Q2" id="rot2Q2_1" value="1" exampletext="rot2Q2" exampleindex="1"  />서울</label></li> 
			<li><label><input type="radio" name="rot2Q2" id="rot2Q2_2" value="2" exampletext="rot2Q2" exampleindex="2"  />경기</label></li> 
			<li><label><input type="radio" name="rot2Q2" id="rot2Q2_3" value="3" exampletext="rot2Q2" exampleindex="3"  />인천</label></li> 
			<li><label><input type="radio" name="rot2Q2" id="rot2Q2_4" value="4" exampletext="rot2Q2" exampleindex="4"  />강원</label></li> 
			<li><label><input type="radio" name="rot2Q2" id="rot2Q2_5" value="5" exampletext="rot2Q2" exampleindex="5"  />대구</label></li> 
			<li><label><input type="radio" name="rot2Q2" id="rot2Q2_6" value="6" exampletext="rot2Q2" exampleindex="6"  />부산</label></li> 
			<li><label><input type="radio" name="rot2Q2" id="rot2Q2_7" value="7" exampletext="rot2Q2" exampleindex="7"  />경북</label></li> 
			<li><label><input type="radio" name="rot2Q2" id="rot2Q2_8" value="8" exampletext="rot2Q2" exampleindex="8"  />경남</label></li> 
		</ul> 
	</article> 
</section> 
 
</div> 

			<!-- 다리 -->
			<footer>
				<button id='bt_next'>다음</button>			
			</footer>			
		</article><!-- 내용틀 -->
	</section><!-- 시작틀 -->
</body>
</html>
