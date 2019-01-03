<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script>
	var gnbDep1 = 1;
	var gnbDep2 = 1;
	
	/* $('.tabList dd:first-child div>div:nth-child(2)').attr('class','on'); */
	//$('[class^="bbk"]').show();
	/* $('[class^=tabago]').eq(0).show(); */
	$('.tabList dd').click(function(){
		var liIndex = $(this).index();
		$('[class^=tabago]').hide();
		$('[class^=tabago]').eq(liIndex).show();
		  
		var tabLiIndex = liIndex + 1 ;
		$('.tabList dd:nth-child('+ tabLiIndex +') div>div:nth-child(2)').attr('class','on');
		$('.tabList dd:not(:nth-child('+ tabLiIndex +')) div>div:nth-child(2)').attr('class','');
	});
	
</script>

<style>
.totalPage {
	text-align: right;
}
.article_write ul li:nth-child(1){
	 width: 80%;
}

</style>

<input type="hidden" value="${projectId}" name="projectId"/>
<!-- 사용자 등록 스크립트 -->
<section id="contents">
	<article class="article_write">
		<input type="hidden" id="projectId" name="projectId" value="${projectId}"/>
		<div class="div">
			사용자 등록 스크립트
		</div>
		
		<table>
			<tbody>
				<tr>
					<td>프로젝트 명</td>
					<td>
						<div id="projectNameInner">테스트 프로젝트</div>
					</td>
				</tr>
				<tr>
					<td>스크립트 이름</td>
					<td>
						<input type="text" id="customScriptName" name="customScriptName" value="no title" onclick="javascript:if(this.value == 'no title') this.value='';"/>
					</td>
				</tr>
				<tr>
					<td>구분</td>
					<td>
						<select id="customScriptGubun" name="customScriptGubun">
							<option value="">select</option>
							<option value="start">시작</option>
							<option value="end">종료</option>							
						</select>								
					</td>
				</tr>
				<tr>
					<td>문항 수 선택</td>
					<td>
						<select id="customScriptApplyCount" name="customScriptApplyCount">
							<option value="">select</option>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
						</select>								
					</td>
				</tr>
				<tr>
					<td>문항 선택</td>
					<td id="tdQuestion">
						<select id="customScriptApplyQuestion" name="customScriptApplyQuestion">
							<option value="">select</option>
							<option value="1">문항 수를 먼저 선택하세요.</option>
						</select>								
					</td>
				</tr>
				<tr>
					<td rowspan="3">스크립트 내용</td>
					<td rowspan="5" style="text-align: left;">
						&lt;script type="text/javascript" &gt;<br>
						<textarea id="customScriptContents" name="customScriptContents" rows="30" cols="140"></textarea><br>
						&lt;/script&gt;
					</td>
					
				</tr>
			</tbody>
		</table>
		
		<div class="regfooter" align="center">
			<input type="button" id="bt_reg" value="등록">
			<input type="button" name="bt_cancel" value="취소">
		</div>
	</article>
</section>
