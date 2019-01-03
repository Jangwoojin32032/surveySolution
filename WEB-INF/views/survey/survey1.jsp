<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
	<meta name='viewport' content='width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no'/>
	<meta name='format-detection' content='telephone=no, address=no, email=no'/>
	<title>조사 조사</title>
	<link rel='stylesheet' type='text/css' href='/resources/css/survey.css'>
	<script type='text/javascript' charset='utf-8' src='/resources/lib/jquery-1.11.1/jquery-1.11.1.min.js' ></script>
	<script type='text/javascript' charset='utf-8' src='/resources/js/jquery-1.11.2.min.js' ></script>
	<script type='text/javascript' charset='utf-8' src='/resources/js/common/common.js' ></script>
	<script type='text/javascript' charset='utf-8' src='/resources/js/survey/survey1.js' ></script>
</head>
<script>
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
		<article>		
			<!-- 머리 -->
			<header>
				<aside>
					<div>
						100%
					</div> 
				</aside>	
			</header>
		<input type='text' name='projectId' value='33' /> 
		<input type='text' name='hardCodingId' value='8' /> 
		<input type='text' name='questionId' value='101' /> 
		<input type='text' name='questionName' value='Q1' /> 
		<input type='text' name='questionType' value='sin' /> 
		<div id='setBody'> 
		</div> 
			<!-- 다리 -->
			<footer>
				<button>다음</button>			
			</footer>			
		</article><!-- 내용틀 -->
	</section><!-- 시작틀 -->
</body>
</html>

