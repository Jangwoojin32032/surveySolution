<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
    request.setCharacterEncoding("UTF-8");
%>

<script>
	var gnbDep1 = 1;
	var gnbDep2 = 1;
</script>
<input type="hidden" value="${projectId}" name="projectId"/>
<input type="hidden" value="${uCode}" name="uCode"/>
<input type="hidden" value="${projectNameOuter}" name="projectNameOuter"/>
<section id="contents">
	<article class="article_write">
		<div class="div">
			조사관련 문의하기
		</div>		
		<div class="qlist">						
			<div></div>
			<div id="setBoostBody">
				<ul>
					<li>조사번호</li>
					<li><input name="projectId" type="text" value="${projectId}" readonly></li>
				</ul>
				<%-- 
				<ul>
					<li>조사명</li>
					<li><input name="projectNameOuter" type="text" value="${projectNameOuter}" readonly></li>
				</ul>
				 --%>
				<ul>
					<li>이메일</li>
					<li><input name="userEmail" type="text"></li>
				</ul>
				<ul>
					<li>제목</li>
					<li><input name="inquiryTitle" type="text"></li>
				</ul>
				<ul>
					<li>내용</li>
					<li><textarea cols="70" rows="10" name="inquiryContents" id="inquiryContents"></textarea></li>
				</ul>
				<div class="regfooter" align="center">
					<input type="button" value="문의하기" name="bt_inquiry">
					<input type="button" value="취소" name="bt_cancel">
				</div>
				<p>평일 업무시간(10:00 ~ 17:00)이외 문의는 신속한 응대가 안되오니 이점 양해부탁드립니다.</p>
			</div>		
		</div>
	</article>
</section>