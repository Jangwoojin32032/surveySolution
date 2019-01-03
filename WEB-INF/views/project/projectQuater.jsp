<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script>
	var gnbDep1 = 1;
	var gnbDep2 = 1;
</script>
<input type="hidden" value="${projectId}" name="projectId"/>
<section id="contents">
	<article class="article_write">
		<div class="div">
			쿼터설정
		</div>
		<div class="qlist">
			<aside>
				<ul>
					<li>
						문항 리스트
					</li>
					<li class="quarterlist" id="setBody">	
					</li>
				</ul>	
			</aside>
			
			<aside>
				<ul>
					<li>
						쿼터 설정(sin)
					</li>
					<li>	
						<div>
							세로
							<select name="selectRow" id="selectRow">
							</select>
						</div>
						<div id="setRowBody">
						</div>								
					</li>
					<li>	
						<div>
							가로
							<select name="selectCol" id="selectCol">
							</select>
						</div>
						<div id="setColBody">
						</div>
					</li>
				</ul>
				<ul>
					<li>
						단독쿼터 설정
					</li>
					<li>
						<div>
							문항
						</div>
						<div id="setSingleBody">
						</div>						
					</li>
				</ul>
				<ul>
					<li>
						완료쿼터 설정
					</li>
					<li>
						<div id="setFinishBody">
						</div>
					</li>
				</ul>
				<ul>
					<li>
						부스트 쿼터
					</li>
					<li>	
						<div>
							등록수
							<select name="selectBoost" id="selectBoost">
								<option value="" selected>select</option>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
							</select>
						</div>
						<div id="setBoostQuestion">
						</div>								
					</li>
				</ul>	
			</aside>	
		</div>
		<div>
			<button class="bta" id="bt_delBoost" style="width:180px;">부스트쿼터 삭제</button>
			<button class="bta" id="bt_setBoost" style="width:180px;">부스트쿼터 생성</button>			
			<button class="bta" id="bt_delQuater">쿼터삭제</button>
			<button class="bta" id="bt_setQuater">쿼터생성</button>
		</div>
		
		<div>
			<div>Quoater</div>
			<div id="setquaterBody">		
			<!-- 테이블 뿌려 지는영역 -->
			</div>	
			
			<div>Boost Quoater</div>
			<div id="setBoostBody">
			</div>		
		</div>
			
		<div class="regfooter" align="center">
			<input type="button" value="쿼터등록" id="bt_quaterInsert">			
			<input type="button" value="미리보기" id="bt_quaterPop">
			<input type="button" value="뒤로가기" id="bt_quaterCancel">
		</div>
	</article>
</section>