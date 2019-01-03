<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags" %>
<%@ page session="true" %>
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
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"/>
	<meta name="format-detection" content="telephone=no, address=no, email=no"/>
	<title>surveyLayout</title>
	
	<link rel="stylesheet" type="text/css" href="/resources/css/survey.css"><!--   -->
	<link rel="stylesheet" type="text/css" href="/resources/css/default.css">
	<script type="text/javascript" charset="utf-8" src="/resources/lib/jquery-1.11.1/jquery-1.11.1.min.js" ></script>
	<script type="text/javascript" charset="utf-8" src="/resources/js/jquery-1.11.2.min.js" ></script>
	<script type="text/javascript" charset="utf-8" src="/resources/js/jquery.easing.1.3.js" ></script>
	<script type="text/javascript" charset="utf-8" src="/resources/js/default.js" ></script>
	<script type="text/javascript" charset="utf-8" src="/resources/js/common/common.js" ></script><!--   -->
	<script type="text/javascript" charset="utf-8" src="/resources/js/survey/surveyCommon.js" ></script>
	<script type="text/javascript" charset="utf-8" src="/resources/js/survey/survey1.js" ></script><!--   -->
	<script type="text/javascript" charset="utf-8" src="/resources/js/<tiles:getAsString name='jsfile' ignore='true'/>" ></script>
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

<script>
	var gnbDep1 = 1;
	var gnbDep2 = 1;
</script>

<body class="web">
	<tiles:insertAttribute name="body" />
</body>
</html>
