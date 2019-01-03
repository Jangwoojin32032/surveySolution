<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script>
	var gnbDep1 = 1;
	var gnbDep2 = 1;
</script>

<style>
	.imgfilebtn{
		font-size: 20px;
	    width: 191px;
	    height: 30px;
	    background: #00000;
	    outline: none;
	    color: white;
	    border: none;
	    cursor: pointer;
	    /* display: block; */
	    /* margin-top: 10px; */
	    position: inherit;
	}

</style>

<section id="contents">
	<article class="article_write">
		<div class="div">
			프로젝트 등록
		</div>
		<ul>
			<li>
				업종
			</li>
			<li>	
				<select name="jobCode">
					<option value="1">option1</option>
				</select>
			</li>
		</ul>	
		<ul>
			<li>
				프로젝트 명
			</li>
			<li>	
				<input name="projectNameInner" type="text">
			</li>
		</ul>
		<ul>
			<li>
				노출제목
			</li>
			<li>	
				<input name="projectNameOuter" type="text">
			</li>
		</ul>	
		<ul>
			<li>
				설문디자인
			</li>
			<li>	
				<label><input type="radio" name="surveyDisign" id="surveyDisign1" value="1" checked="checked"> A Type</label>
				<label><input type="radio" name="surveyDisign" id="surveyDisign2" value="2"> B Type</label>
				<label><input type="radio" name="surveyDisign" id="surveyDisign3" value="3"> C Type</label>  
			</li>
		</ul>	
		<ul>
			<li>
				고객사
			</li>
			<li>	
				<select name="customerCode">
					<option value="0">고객사</option>
				</select>
			</li>
		</ul>	
		<ul>
			<li>
				담당자
			</li>
			<li>	
				<select name="pmCode">
					<option value="0">pmCode</option>
				</select>
			</li>
		</ul>	
		<ul>
			<li>
				언어선택
			</li>
			<li>	
				<select name="useLanguage">
					<option value="0">한국어</option>
					<option value="1">영어</option>
					<option value="2">일본어</option>
				</select>
			</li>
		</ul>	
		<ul>
			<li>
				Select RedirectUrl 
			</li>
			<li>	
				 <select name="redirectUrlSelector">
				 </select>
			</li>
		</ul>	
		<ul>
			<li>
				redirectUrl
			</li>
			<li id="redirectUrlLi">	
				<div class="inputsize">
					Select RedirectUrl
				</div>
			</li>
		</ul>	
		<ul>
			<li>
				PC가능여부
			</li>
			<li>	
				<input type="checkbox" name="usePc" checked="checked"> PC가능 허용 (체크=허용) 
				<span class="bla"><input class="cnrk" type="checkbox" name="useMobile" checked="checked"> 모바일 허용 (체크=허용) </span>
			</li>
		</ul>	
		<ul>
			<li>
				이어하기
			</li>
			<li>	
				<input type="checkbox" name="useFollowing" checked="checked"> 이어하기 (체크=허용) 
			</li>
		</ul>		
		<ul>
			<li>
				뒤로가기허용
			</li>
			<li>	
				<input type="checkbox" name="useBack"> 뒤로가기 허용 (체크=허용) 
			</li>
		</ul>	
		<ul>
			<li>
				배너조사
			</li>
			<li>	
				<input type="checkbox" name="useResearBanner"> 배너조사 허용 (체크=배너조사) 
			</li>
		</ul>	
		<ul>
			<li>
				리스트조사
			</li>
			<li>	
				<input type="checkbox" name="useResearList"> 리스트조사   
			</li>
		</ul>	
		<ul>
			<li>
				로고이미지
			</li>
			<li>
				<input class="qweasd" type="checkbox"> 로고이미지 사용
				<div class="zxcasd" style="display: none;margin-top: 10px;">
					<!-- <input type="file" name="logoImg"> -->
					<form id="imgUploadForm" method="post" action="" enctype="multipart/form-data">
				        <input type="file" id="uploadFile" name="uploadFile"/>
				        <input type="hidden" id="fileDirectory" name="fileDirectory" value="logoImg"/>
				        <input type="hidden" id="uploadVersion" name=uploadVersion value=""/>
				        <div style="margin-top: 10px;">
					        <img name="imgFile" width="200px" height="50px" alt="" src="">
					        	고정 사이즈 width: 200px, height: 50px 
					    </div>
				        <div style="margin-top: 10px;">
					        <button class="imgfilebtn" type="button" name="bt_ImgUpload">등록</button>
					        <span name="fileText"></span>
				        </div>
				    </form>
			        <input type="hidden" id="logoImgDirectory" name="logoImgDirectory" value=""/>
			        <input type="hidden" id="logoImgFullPath" name="logoImgFullPath" value=""/>
			        <input type="hidden" id="logoImgSaveName" name="logoImgSaveName" value=""/>
			        <input type="hidden" id="logoImgOriginalName" name="logoImgOriginalName" value=""/>
				</div>	  
			</li>
		</ul>
		<ul>
			<li>
				작업
			</li>
			<li>	
				<input type="button" value="설문작성" name="bt_survey">
				<input type="button" value="테스트" name="bt_test">
				<input type="button" value="설문경로" name="bt_serveyUrl">
				<input type="button" value="쿼터" name="bt_quater">
				<input type="button" value="데이터" name="bt_data">
				<input type="button" value="프로젝트관리" name="bt_projectMnagement">
			</li>
			<input type="hidden" value="${projectId}" name="projectId"/>
			<input type="hidden" value="${projId}" name="projId"/>
			<input type="hidden" value="" name="projectState"/>
		</ul>	
		<div class="regfooter" align="center">
			<input type="button" value="등록" name="bt_insert">
			<input type="button" value="취소" name="bt_cancel">
		</div>
	</article>
</section>