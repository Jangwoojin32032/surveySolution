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
			설문문항 리스트
		</div>
		<ul>
			<li>
				문항리스트
			</li>
			<li>	
				
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