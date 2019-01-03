<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script>
	var gnbDep1 = 1;
	var gnbDep2 = 1;
</script>

<style>
.totalPage {
	text-align: right;
}
</style>

<!-- 사용자 등록 스크립트 -->
<section id="contents">
	<article class="article_write">
		<input type="hidden" id="projectId" name="projectId" value="${projectId}"/>
		<input type="hidden" id="hardCodingId" name="hardCodingId" value=""/>
		<div class="div">
			사용자 등록 스크립트			
		</div>
		<div>
			<button class="bta" id="bt_reg" style="width:100px;">작성</button>
		</div>
		<table>
			<colgroup>
				<col width="5%" />
				<col width="10%" />
				<col width="25%" />
				<col width="25%" />
				<col width="10%" />
				<col width="15%" />
				<col width="10%" />				
			</colgroup>
			<thead>
				<tr>
					<th>번호</th>
					<th>구분</th>		
					<th>스크립트 이름</th>
					<th>적용문항</th>			
					<th>작성일</th>
					<th>내용보기</th>
					<th>삭제</th>					
				</tr>
			</thead>
			<tbody id="setHtml">
			</tbody>
		</table>
		
		<div class="regfooter" align="center">
			<input type="button" name="bt_apply" value="js 적용">
			<input type="button" name="bt_cancel" value="뒤로가기">
		</div>
	</article>
</section>
