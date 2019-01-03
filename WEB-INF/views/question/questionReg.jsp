<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<script type="text/javascript" src="/resources/editor/js/HuskyEZCreator.js" charset="utf-8"></script>

<section id="contents">
	<article class="article_write">
		<input type="hidden" id="gubun" name="gubun" value="${gubun}" />
		<input type="hidden" id="queType" name="queType" value="${queType}" />
		<input type="hidden" id="projectId" name="projectId" value="${projectId}" />
		<input type="hidden" id="questionId" name="questionId" value="${questionId}" />		
		<div class="div">
			문항 추가
		</div>
		<ul>
			<li>
				질문유형
			</li>
			<li>	
				<label><input type="radio" id="sin" name="questionType"> 단일형</label>
				<label><input type="radio" id="mul" name="questionType"> 중복형</label>
				<label><input type="radio" id="ord" name="questionType"> 순위형</label>  
				<label><input type="radio" id="num" name="questionType"> 숫자형</label>
				<!-- <label><input type="radio" id="textarea" name="questionType"> 합계계산형</label> -->
				<label><input type="radio" id="sca" name="questionType"> 척도형</label>  
				<label><input type="radio" id="att" name="questionType"> 속성형</label>
				<label><input type="radio" id="tex" name="questionType"> 오픈형</label>
				<label><input type="radio" id="textarea" name="questionType"> 오픈문장형</label>
				<label><input type="radio" id="info" name="questionType"> 알림형</label>
				<label><input type="radio" id="media" name="questionType"> 미디어형</label>    
				<!-- <label><input type="radio" id="ord" name="questionType"> 사용자정의형</label> -->  
			</li>
		</ul>	
		<ul>
			<li>
				문항번호
			</li>
			<li>	
				<input type="text" id="questionName" name="questionName" style="width: 150px;">						
			</li>
		</ul>
		<ul>
			<li>
				지문내용
			</li>
			<li>	
				<textarea class="contents" id="smartEditor1" name="smartEditor1" style="width: 100%;"></textarea>
			</li>
		</ul>	
		<ul>
			<li>
				문항내용
			</li>
			<li>	
				<textarea class="contents" id="smartEditor2" name="smartEditor2" style="width: 100%;"></textarea>
			</li>
		</ul>	
		<ul>
			<li>
				하단내용
			</li>
			<li>	
				<textarea class="contents" id="smartEditor3" name="smartEditor3" style="width: 100%;"></textarea>
			</li>
		</ul>	
		<ul id="infoSEUl">
			<li>
				안내 내용
			</li>
			<li id="infoSELi">	
				<textarea class="contents" id="smartEditor4" name="smartEditor4" style="width: 100%;"></textarea>
			</li>
		</ul>
		<ul id="exampleUl">
			<li>
				보기
			</li>
			<li>
				<div id="exampleTextarea">
					<textarea id="example" style="width: 70%; height: 200px;"></textarea>
				</div>				
				<div id="exampleInput">
				</div>
				<br>
				<button id="exampleButton" name="reg" style="position: inherit;font-size: 17px;width: 100px;height: 35px;margin: 10px 5px;">보기 등록</button>				
			</li>
		</ul>
		<ul id="customExampleUl">
			<li>
				사용자정의 보기
			</li>
			<li>
				<select id="customExampleSelect" name="customExampleSelect">
					<option value="0">선택하세요</option>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
				</select>
				<div id="customExampleText" style="margin-top: 10px;margin-bottom: 10px; display:none;">
					<input type="checkbox" name="customOnlykorean" value="onlykorean">한글 
					<input type="checkbox" name="customOnlyenglish" value="onlyenglish">영문 
					<input type="checkbox" name="customOnlynumber" value="onlynumber">숫자 
					<input type="checkbox" name="customOnlymoney" value="onlymoney">금액 
					<input type="checkbox" id="customOnlyphone" name="customOnlyphone" value="onlyphone">전화번호 
					<input type="checkbox" id="customOnlyemail" name="customOnlyemail" value="onlyemail">이메일 
					<input type="checkbox" name="customOnlytext" value="onlytext">특수문자포함 
					텍스트 크기: <input type="text" id="customTextWidth" name="customTextWidth" style="width: 80px;"> px
				</div>	
				<div id="customExampleView">
				</div>							
			</li>
		</ul>					
		<ul id="exampleAttUl">
			<li>
				속성
			</li>
			<li>
				<div id="exampleAttTextarea">
					<textarea id="exampleAtt" style="width: 70%; height: 200px;"></textarea>
				</div>				
				<div id="exampleAttInput">
				</div>
				<br>
				<button id="exampleAttButton" name="regAtt" style="position: inherit;font-size: 17px;width: 100px;height: 35px;margin: 10px 5px;">속성 등록</button>				
			</li>
		</ul>
		<ul id="attExampleOption" style="display: none;">
			<li>속성문항옵션</li>
			<li>
				<select name="attQuetionOption">
					<option value="addrow">행 추가(down)</option>
					<option value="addcol">열 추가(right)</option>
				</select>
			</li>
		</ul>
		<ul id="attResponseOption" style="display: none;">
			<li>속성응답옵션</li>
			<li>
				<select name="attResponseOption">
					<option value="sin">단일</option>
					<option value="mul">중복</option>
				</select>
			</li>
		</ul>
		<ul id="minOrdUl">
			<li>
				최소순위입력
			</li>
			<li>	
				<input type="text" name="minOrd" style="width: 100px;" value="1">
			</li>
		</ul>
		<ul id="maxOrdUl">
			<li>
				최대순위입력
			</li>
			<li>	
				<input type="text" name="maxOrd" style="width: 100px;">
			</li>
		</ul>
		<ul id="exampleAlignUl">
			<li>
				보기방향
			</li>
			<li>	
				<select id="exampleAlign" name="exampleAlign">
					<option>선택하세요</option>
					<option value="1">세로방향</option>
					<option value="2">가로방향</option>
				</select>
			</li>
		</ul>
		<ul id="exampleAlignCnt">
			<li>
				보기열수
			</li>
			<li>	
				<input type="text" name="exampleAlignCnt" style="width: 100px;"> (eg. 2 ~ 5)
			</li>
		</ul>	
		<ul id="exampleViewUl">
			<li>
				보기뷰
			</li>
			<li>	
				 <select id="exampleView" name="exampleView" multiple="multiple" style="height: 150px;">
				 <option value="0">선택하세요</option>
				</select>
			</li>
		</ul>	
		<ul id="exampleViewOptionUl">
			<li>
				보기뷰옵션
			</li>
			<li>	
				<select name="exampleViewOption">
					<option value="1">보기제외</option>
				</select>
			</li>
		</ul>
		<!-- 	
		<ul>
			<li>
				보기필체크
			</li>
			<li>	
				<select>
					<option>필수체크</option>
					<option>필수체크하지않음</option>
				</select>
			</li>
		</ul>				
		<ul>
			<li>
				텍스트박스Size
			</li>
			<li>	
				<input type="text" style="width: 200px;">
			</li>
		</ul>			
		<ul>
			<li>
				기타기입형태
			</li>
			<li>	
				<select>
					<option>일반</option>
					<option>숫자</option>
				</select>
			</li>
		</ul>	
		<ul>
			<li>
				다음이동문항
			</li>
			<li>	
				<input type="text" style="width: 150px;"> (eg. Q10, Q10-1)
			</li>
		</ul>			
		<ul>
			<li>
				로테이션
			</li>
			<li>	
				<select>
					<option>사용안함</option>
					<option>사용</option>
				</select>
			</li>
		</ul>	
		<ul>
			<li>
				로테이션그룹
			</li>
			<li>
				<input type="text" style="width: 150px;"> (eg. A ~ Z)
			</li>
		</ul>
		<ul>
			<li>
				로테이션NO
			</li>
			<li>	
				<input type="text" style="width: 150px;"> (eg. 1 ~ 99)
			</li>
		</ul>
		 -->
		 <ul id="mediaurl">
			<li>
				동영상 URL
			</li>
			<li>	
				<input type="text" name="mediaurl">
			</li>
		</ul>
		<ul id="mediatimer">
			<li>
				타이머
			</li>
			<li>	
				<input type="text" name="mediatimer" style="width: 100px;"> (단위: 초)
			</li>
		</ul>
		<ul id="previousResponseUl">
			<li>
				이전응답내용
			</li>
			<li>	
				<input type="text" name="previousResponse">
			</li>
		</ul>	
		<ul id="responseLimitUl">
			<li>
				응답제한시간
			</li>
			<li>	
				<input type="text" name="responseLimit" style="width: 100px;"> (단위: 초)
			</li>
		</ul>		
		<ul>
			<li>
				이미지(동영상)
			</li>
			<li>	
				<input type="file" style="width: 300px;"> (20M 이하)
			</li>
		</ul>
		<ul>
			<li>
				문항뷰
			</li>
			<li>	
				<input type="text" name="questionView" style="width: 300px;">
			</li>
		</ul>
		<!--	
		<ul>
			<li>
				검증문항
			</li>
			<li>	
				<input type="text" style="width: 300px;">
			</li>
		</ul>		 	
		<ul>
			<li>
				쿼터문항
			</li>
			<li>	
				<input type="text" style="width: 150px;"> (eg. 성별)
			</li>
		</ul>	
		<ul>
			<li>
				부스터쿼터
			</li>
			<li>	
				<select>
					<option>사용안함</option>
					<option>사용</option>
				</select>
			</li>
		</ul>	
 		-->
		
		<div class="regfooter" id="regFooter" align="center" style="display: none;">
			<input type="button" name="bt_insert" value="등록완료">
			<input type="button" name="bt_continue" value="계속등록">
			<input type="button" name="bt_cancel" value="목록">
		</div>
		<div class="regfooter" id="updateFooter" align="center" style="display: none;">			
			<input type="button" name="bt_update" value="수정">
			<input type="button" name="bt_cancel" value="목록">
		</div>
	</article>	
</section>

<script type="text/javascript">
	var gnbDep1 = 1;
	var gnbDep2 = 1;
</script>