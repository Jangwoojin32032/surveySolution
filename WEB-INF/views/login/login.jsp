<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script>
	var gnbDep1 = 1;
	var gnbDep2 = 1;
</script>
<style>
	footer{position: absolute;bottom: 0;}
</style>

<header class="header">
	<div>
		<section>
			<span>Best Research Company Smart Panel</span>
		</section>
	</div>
</header>
<section id="contents">
	<article class="login">
		<div>
			<!-- <form action=""> -->
				<fieldset>
					<legend> 솔루션 로그인 </legend>
					<div>
						ID
						<input class="inputText1" type="text" id="id" name="id">
						<!-- <label class="labelText1" >아이디</label> -->
						<div class="divMotion1" ></div>
					</div>
					
					<div>
						PW
						<input  class="inputText2" type="password" id="passWd" name="passWd">
						<!-- <label class="labelText2">비밀번호</label> -->
						<div class="divMotion2"></div>
					</div>									
					<button  id="bt_login" onclick="javascript:void(0);">로그인</button>
				</fieldset>
			<!-- </form> -->
		</div>
	</article>
</section>
<footer>
	<div>
		<p>COPYRIGHT 1999-2018 넷포인트엔터프라이즈 ALL RIGHTS RESERVED.</p>
		<p><a href="http://www.netpoint.co.kr/html/front/main.jsp" target="_blank">넷포인트</a> 
		＊ <a href="http://renewal.smartpanel.kr/" target="_blank">스마트패널</a> 
		＊ <a href="http://www.panel-i.kr/" target="_blank">패널아이</a></p>
	</div>
</footer>
