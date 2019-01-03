<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script>
	var gnbDep1 = 1;
	var gnbDep2 = 1;
</script>
<input type="hidden" value="${projectId}" name="projectId"/>
<section id="contents">
	<article class="article_write">
		<div class="div">
			쿼터 보기 
		</div>
		<div class="div">
			<input type="text" name="clip_target" id="clip_target" value="" />
			<input type="button" name="bt_clip" id="bt_clip" value="주소복사"/>
		</div>
		<div class="qlist">
			<div>Quoater</div>
			<div id="setquaterBody">		
			<!-- 테이블 뿌려 지는영역 -->
			</div>	
			
			<div>Boost Quoater</div>
			<div id="setBoostBody">
			</div>		
		</div>
	</article>
</section>