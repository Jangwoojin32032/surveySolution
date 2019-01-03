<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags" %>

<header class="header">
	<div>
		<section>
			<span>Best Research Company SmartPanel</span>
			<div>
				<input type="hidden" name="userId" value=""/>
				<span id="setId">SCV 님</span>
				<span><a href="/login/logOut">로그아웃</a></span>
			</div>
		</section>
	</div>
	<button id="btn_menu">메뉴열기</button>
	<div id="nav_bg"></div>
	<nav>
		<h2><a href="/project/projectList">스마트패널 홈으로</a></h2>
		<div>	
			<input type="hidden" name="userId" value=""/>
			<span id="setId">SCV 님</span>
		</div>
		<ul id="gnb">	
			<li>
				<a href="/project/projectList">프로젝트 관리</a>
				<ul>
					<li><a href="/project/projectList">프로젝트 관리</a></li>
				</ul>
			</li>
			<li>
				<a href="#">설문 관리</a>
				<ul>
					<li><a href="#">설문 관리</a></li>		
				</ul>
			</li>
		</ul>	
		<div><a href="/login/logOut"><button class="logoutbtn">로그아웃</button></a></div>
	</nav>
	<button id="btn_close">메뉴닫기</button>
</header>