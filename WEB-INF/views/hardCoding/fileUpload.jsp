<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script>
	var gnbDep1 = 2;
	var gnbDep2 = 1;
</script>

<style>
	.filebtn{
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
	footer{position: absolute;bottom: 0;}
	.atext:hover{cursor: pointer;background: #636363;color: white;}
</style>

<section id="contents">
	<article class="article_write">
		<div class="div">
			하드코딩 등록
		</div>
		<ul>
			<li>
				엑셀 등록
			</li>
			<li>	
				<form id="excelUploadForm" method="post" action="" enctype="multipart/form-data">
			        <input type="file" id="uploadFile" name="uploadFile"/>
					<a href="javascript:void(0);" id="fileDown">양식다운로드</a>
					
			        <input type="hidden" id="fileDirectory" name="fileDirectory" value="hardCoding"/>
			        <input type="hidden" id="uploadVersion" name="uploadVersion" value="${HardCodingVersion}"/>
		        	<input type="hidden" id="projectId" name="projectId" value="${projectId}" />
		        	<input type="hidden" id="hardCodingId" name="hardCodingId" value="" />
			        <div style="margin-top: 10px;">
				        <button class="filebtn" type="button" name="bt_excelUpload">엑셀등록</button>
				        <a class="atext" href="javascript:void(0);" id="hardCodingFileDown" ><span name="fileText"></span></a>
			        </div>
			    </form>
		        <input type="hidden" id="fileDirectory" name="fileDirectory" value=""/>
		        <input type="hidden" id="fileFullPath" name="fileFullPath" value=""/>
		        <input type="hidden" id="fileSaveName" name="fileSaveName" value=""/>
		        <input type="hidden" id="fileOriginalName" name="fileOriginalName" value=""/>
			</li>
		</ul>
		<div class="regfooter" align="center">
			<!-- <input type="button" value="DB등록" name="bt_insert"> -->
			<input type="button" value="설문생성" name="bt_survey">
			<input type="button" value="미리보기" name="bt_test">
			<input type="button" value="뒤로가기" name="bt_cancel">
		</div>
	</article>
</section>