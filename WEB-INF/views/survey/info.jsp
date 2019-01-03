<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script>
	var gnbDep1 = 1;
	var gnbDep2 = 1;
</script>

<section id="contents">
	<article class="article_write">
		Info Test uCode : ${uCode } , projectId : ${projectId}
		<input type="hidden" name="projectId" value="${projectId}" />
		<input type="hidden" name="uCode" value="${uCode}" />
		<input type="hidden" name="cpno" value="${cpno}" />
		<input type="hidden" name="cType" value="${cType}" />
		
		<div class="regfooter" align="center">
			<input type="button" value="다음" id="bt_next">
		</div>
	</article><!-- 내용틀 -->
</section><!-- 시작틀 -->

