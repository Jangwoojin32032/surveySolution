<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script>
	var gnbDep1 = 1;
	var gnbDep2 = 1;
	
	function captionclick(obj) {
	    if ("INPUT" == event.srcElement.tagName)
	        event.cancelBubble = true;
	    else {
	        obj.children[0].click();
	        return false;
	    }
	}
	
</script>
<head>
	<script type="text/javascript" charset="utf-8" src="/resources/js/hardCoding/fileUpload.js" ></script>
	<style>
		.layoutcontents{top:45%;}
		#pop_questionList{border-collapse:collapse; width:100%}
		#pop_questionList thead{float:left; width:770px;}
		#pop_questionList tbody{overflow-y:auto; overflow-x:hidden; float:left; width:770px; height:550px;}
		#pop_questionList tbody tr{display:table; width:770px;}
		#pop_questionList th{height: 19px; padding: 3px; font-size:15px;}
		#pop_questionList tr{height: 19px; padding: 3px; font-size:15px;}
		#pop_questionList td{height: 19px; padding: 3px; font-size:15px;}
		#pop_questionList td:nth-child(1){padding-bottom: 8px;}
		#pop_questionList td:nth-child(3){text-align: left;}
		
		#partdel_questionList{border-collapse:collapse; width:100%}
		#partdel_questionList thead{float:left; width:770px;}
		#partdel_questionList tbody{overflow-y:auto; overflow-x:hidden; float:left; width:770px; height:550px;}
		#partdel_questionList tbody tr{display:table; width:770px;}
		#partdel_questionList th{height: 19px; padding: 3px; font-size:15px;}
		#partdel_questionList tr{height: 19px; padding: 3px; font-size:15px;}
		#partdel_questionList td{height: 19px; padding: 3px; font-size:15px;}
		#partdel_questionList td:nth-child(1){padding-bottom: 8px;}
		#partdel_questionList td:nth-child(3){text-align: left;}
	</style>
</head>

<!-- <link rel="stylesheet" type="text/css" href="/resources/css/survey.css"> -->


<section id="contents">
	<article class="article_write">
		<div class="div">
			설문 문항 리스트
		</div>
		<div style="overflow: auto;margin-top: 20px;">
			<aside style="float: left;width: 17%;padding: 0px 5px;box-sizing:border-box;">
				<input type="hidden" id="projectId" name="projectId" value="${projectId}" />
				<input type="hidden" id="hardCodingId" name="hardCodingId" value="" />
				<div>
					<span style="margin-right: 20px;"><input type="radio"> 전체보기</span>
					<input type="radio"> 트리보기
				</div>
				<div style="margin-top: 15px;height: 600px;">
					<ol class="tree">
					  <li>
					    <input type="checkbox" checked="checked" id="c1" />
					    <label class="tree_label" for="c1">문항리스트</label>
					    <ol id="questionList">
					       <li><span class="tree_label"><a href="#">1</a></span></li>
					       <li><span class="tree_label"><a href="#">2</a></span></li>
					       <li><span class="tree_label"><a href="#">3</a></span></li>
					       <li><span class="tree_label"><a href="#">4</a></span></li>
					       <li><span class="tree_label"><a href="#">5</a></span></li>
					       <li><span class="tree_label"><a href="#">6</a></span></li>
					       <li><span class="tree_label"><a href="#">7</a></span></li>
					       <li><span class="tree_label"><a href="#">8</a></span></li>
					       <li><span class="tree_label"><a href="#">9</a></span></li>
					       <li><span class="tree_label"><a href="#">10</a></span></li>
					                                                                                                                                                                        
					    </ol>
					  </li>
					</ol>
				</div>
			</aside>
			<aside style="float: left;width: 83%;">
				<div class="selec" style="padding: 20px;text-align: center;border: 1px solid #ccc;background-color: #f4f4f4;">
					<input type="button" name="allcopy" value="전체 문항 복사">
					<input type="button" name="question_insert" value="문항 추가">
					<input type="button" name="orderChange" value="순서 변경">					
					<input type="button" name="partcopy" value="부분 복사">
					<input type="button" name="partdel" value="부분 삭제">
				</div>
				<div style="margin-top: 20px; word-wrap: break-word; display: none;" id="questionView">
					<!-- 설문 -->
					<div>
						<section class="contents">
							<article id="survey_title">
								<div>		
									SQ1.
								</div>
								<div>
									성별을 선택해 주세요.(단수형 설문지)<br>
								</div>
							</article>
							<article class="survey_form" id="survey_form">
								<ul>
									<li>
										<label><input type="radio"> 남자</label>
									</li>
									<li>
										<label><input type="radio"> 여자</label>
									</li>
									<li>
										<label><input type="radio"> 자웅동체</label>
									</li>
								</ul>
							</article>
						</section>
					</div>
				</div>
				<!-- 버튼  -->										
				<div>
					<div id="questionViewOption" style="display: none;">
						문항옵션= [<span style="color: blue;">필수체크</span>: <span style="color: red;">사용</span>] [<span style="color: blue;">보기로테이션</span>: <span style="color: red;">사용</span>]
					</div>
					<div class="selec" id="questionViewBtn" style="display: none; margin-top:20px; text-align: right; padding-bottom: 30px; border-bottom: 1px solid silver;">									
						<input type="button" value="자바스크립트">
						<input type="button" name="question_insert" value="삽입">
						<input type="button" value="복사">
						<input type="button" name="question_update" value="수정">
						<input type="button" name="question_delete" value="삭제">
						<input type="button" value="보기이미지 등록">
					</div>
				</div>
			</aside>
		</div>
		<div class="regfooter" align="center">
			<input type="button" value="설문생성" name="bt_survey">
			<!-- <input type="button" value="미리보기" name="bt_test"> -->			
			<input type="button" value="뒤로가기" name="bt_cancel">
		</div>
	</article>
</section>
<div class="layout" style="display:none;" id="pop_allcopy">
	<div class="layoutcontents" style="max-width:800px;">
		<ul class="tabMenu">
			<li style="width: 100%;"><a>전체 문항 복사</a></li>		  
		</ul>
		<div class="tabgo" style="text-align: left; height: 100px; ">
			<div class="cass">
				<div class="rhdrks">● 프로젝트 명</div> 
				<input type="text" id="projectNameInner" name="projectNameInner" style="width: 200px;" />
				<input class="btn" type="button" value="검색" id="bt_search" name="bt_search">
			</div>
		</div>
		<table style="display:none;" id="pop_projectList">		
			<colgroup>
				<col width="4%" />
				<col width="32%" />
				<col width="7%" />
				<col width="7%" />
				<col width="9%" />
				<col width="9%" />
			</colgroup>
			<thead>
				<tr>
					<th>번호</th>
					<th>프로젝트명</th>
					<th>담당자</th>
					<th>고객사</th>
					<th>작성일</th>
				</tr>
			</thead>
			<tbody id="popProjectList"></tbody>
		</table>
		<div class="foodiv"></div>
		<p class="pagination"></p>
		<div class="hite">
			<button class="cancel">닫기</button>
		</div>
	</div>
</div>
<div class="layout" style="display:none;" id="pop_partcopy">
	<div class="layoutcontents" style="max-width:800px;">
		<ul class="tabMenu">
			<li style="width: 100%;"><a>부분 복사</a></li>		  
		</ul>
		<div class="tabgo" style="text-align: left; height: 100px; ">
		<!--
			<div class="cass">
				<div class="rhdrks">● 프로젝트 명</div> 
				<input type="text" id="projectNameInner" name="projectNameInner" style="width: 200px;" />
				<input class="btn" type="button" value="검색" id="bt_search" name="bt_search">
			</div>
		 -->
		</div>
		<table style="display:none;" id="pop_questionList">
			<!-- 
			<thead>
				<tr>
					<th width="6%">체크</th>
					<th width="9%">문항번호</th>
					<th width="80%">문항내용</th>				
				</tr>
			</thead>
			 -->
			<tbody id="popQuestionList"></tbody>
		</table>
		<div class="regfooter">
		복사위치<br>
		<select id="popselectList">
		</select>
		번 문항 뒤로 복사됩니다.
		</div>
		<div class="hite">
			<button class="copy" name="copy">복사</button>
			<button class="cancel">닫기</button>
		</div>
	</div>
</div>
<div class="layout" style="display:none;" id="pop_partdel">
	<div class="layoutcontents" style="max-width:800px;">
		<ul class="tabMenu">
			<li style="width: 100%;"><a>부분 삭제</a></li>		  
		</ul>
		<div class="tabgo" style="text-align: left; height: 100px; ">
		<!--
			<div class="cass">
				<div class="rhdrks">● 프로젝트 명</div> 
				<input type="text" id="projectNameInner" name="projectNameInner" style="width: 200px;" />
				<input class="btn" type="button" value="검색" id="bt_search" name="bt_search">
			</div>
		 -->
		</div>
		<table style="display:none;" id="partdel_questionList">
			<!-- 
			<thead>
				<tr>
					<th width="6%">체크</th>
					<th width="9%">문항번호</th>
					<th width="80%">문항내용</th>				
				</tr>
			</thead>
			 -->
			<tbody id="partdel_QuestionList"></tbody>
		</table>
		
		<div class="hite">
			<button class="del" name="del">삭제</button>
			<button class="cancel">닫기</button>
		</div>
	</div>
</div>
<div class="layout" style="display:none;" id="pop_orderChange">
	<div class="layoutcontents" style="max-width:800px;">
		<ul class="tabMenu">
			<li style="width: 100%;"><a>순서 변경</a></li>		  
		</ul>
		<div class="tabgo" style="text-align: left; height: 100px; ">
		</div>
		<div style="max-width:650px; max-heigth:570px; display: inline;">
			<select id="orderChange_questionList" name="orderChange_questionList" multiple="multiple" style="width: 640px; height: 570px;">	
			</select>
		</div>
		<div class="hite">
			<button id="orderUp" name="orderUp" style="position: relative; top: -370px; left: 370px;"> ▲ </button> 
			<button id="orderDown" name="orderDown" style="position: relative; top: -270px; left: 294px;"> ▼ </button>
		</div>
		* 한 개씩 이동 가능합니다.
		<div class="hite">
			<button class="btn_change" name="btn_change">변경</button>
			<button class="cancel">닫기</button>
		</div>
	</div>
</div>