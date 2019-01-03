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

<section id="contents">
	<article class="article_write">
	
		 <div class="headerser">
		 	<div>
			 	조사상태
			 	<select name="projectState">
			 		<option value="">전체</option>
			 		<option value="0">등록</option>
			 		<option value="1">시작</option>
			 		<option value="2">종료</option>
			 		<!-- <option value="3">진행</option> -->
			 	</select>
		 	</div>
		 	<div>
			 	<select name="searchType">
			 		<option value="projectNameInner">프로젝트명</option>
			 		<option value="pmCode">담당자</option>
			 		<option value="customerCode">고객사</option>
			 	</select>
			 	<input class="text" type="text" name="searchValue">
			 	<input class="btn" type="button" value="검색" id="bt_search">	
		 	</div>
		 </div>
		<table>
			<colgroup>
				<col width="4%" />
				<col width="32%" />
				<col width="7%" />
				<col width="7%" />
				<col width="9%" />
				<col width="9%" />
				<col width="32%" />
			</colgroup>
			<thead>
				<tr>
					<th>번호</th>
					<th>프로젝트명</th>
					<th>진행률</th>
					<th>담당자</th>
					<th>고객사</th>
					<th>작성일</th>
					<th>작업</th>
				</tr>
			</thead>
			<tbody id="setHtml">
				<!-- <tr>
					<td>10</td>
					<td class="aa"><a href="#">알레르망 프로젝트</a></td>
					<td>80%</td>
					<td>홍길동</td>
					<td>글로벌리서치</td>
					<td>2017.12.08</td>
					<td>
						<input type="button" value="설문작성">
						<input type="button" value="테스트">
						<input type="button" value="데이터">
						<input type="button" value="쿼터설정">
						<input class="on1" type="button" value="시작">
					</td>
				</tr>
				<tr>
					<td>9</td>
					<td class="aa"><a href="#">알레르망 프로젝트</a></td>
					<td>80%</td>
					<td>홍길동</td>
					<td>글로벌리서치</td>
					<td>2017.12.08</td>
					<td>
						<input type="button" value="설문작성">
						<input type="button" value="테스트">
						<input type="button" value="데이터">
						<input type="button" value="쿼터설정">
						<input class="on2" type="button" value="시작">
					</td>
				</tr>
				<tr>
					<td>8</td>
					<td class="aa"><a href="#">알레르망 프로젝트</a></td>
					<td>80%</td>
					<td>홍길동</td>
					<td>글로벌리서치</td>
					<td>2017.12.08</td>
					<td>
						<input type="button" value="설문작성">
						<input type="button" value="테스트">
						<input type="button" value="데이터">
						<input type="button" value="쿼터설정">
						<input type="button" value="시작">
					</td>
				</tr>
				<tr class="ab">
					<td>7</td>
					<td class="aa"><a href="#">알레르망 프로젝트</a></td>
					<td>80%</td>
					<td>홍길동</td>
					<td>글로벌리서치</td>
					<td>2017.12.08</td>
					<td>
						<input type="button" value="설문작성">
						<input type="button" value="테스트">
						<input type="button" value="데이터">
						<input type="button" value="쿼터설정">
						<input type="button" value="시작">
					</td>
				</tr>
				<tr>
					<td>6</td>
					<td class="aa"><a href="#">알레르망 프로젝트</a></td>
					<td>80%</td>
					<td>홍길동</td>
					<td>글로벌리서치</td>
					<td>2017.12.08</td>
					<td>
						<input type="button" value="설문작성">
						<input type="button" value="테스트">
						<input type="button" value="데이터">
						<input type="button" value="쿼터설정">
						<input type="button" value="시작">
					</td>
				</tr>
				<tr>
					<td>5</td>
					<td class="aa"><a href="#">알레르망 프로젝트</a></td>
					<td>80%</td>
					<td>홍길동</td>
					<td>글로벌리서치</td>
					<td>2017.12.08</td>
					<td>
						<input type="button" value="설문작성">
						<input type="button" value="테스트">
						<input type="button" value="데이터">
						<input type="button" value="쿼터설정">
						<input type="button" value="시작">
					</td>
				</tr>
				<tr>
					<td>4</td>
					<td class="aa"><a href="#">알레르망 프로젝트</a></td>
					<td>80%</td>
					<td>홍길동</td>
					<td>글로벌리서치</td>
					<td>2017.12.08</td>
					<td>
						<input type="button" value="설문작성">
						<input type="button" value="테스트">
						<input type="button" value="데이터">
						<input type="button" value="쿼터설정">
						<input type="button" value="시작">
					</td>
				</tr>
				<tr>
					<td>3</td>
					<td class="aa"><a href="#">알레르망 프로젝트</a></td>
					<td>80%</td>
					<td>홍길동</td>
					<td>글로벌리서치</td>
					<td>2017.12.08</td>
					<td>
						<input type="button" value="설문작성">
						<input type="button" value="테스트">
						<input type="button" value="데이터">
						<input type="button" value="쿼터설정">
						<input type="button" value="시작">
					</td>
				</tr>
				<tr>
					<td>2</td>
					<td class="aa"><a href="#">알레르망 프로젝트</a></td>
					<td>80%</td>
					<td>홍길동</td>
					<td>글로벌리서치</td>
					<td>2017.12.08</td>
					<td>
						<input type="button" value="설문작성">
						<input type="button" value="테스트">
						<input type="button" value="데이터">
						<input type="button" value="쿼터설정">
						<input type="button" value="시작">
					</td>
				</tr>
				<tr>
					<td>1</td>
					<td class="aa"><a href="#">알레르망 프로젝트</a></td>
					<td>80%</td>
					<td>홍길동</td>
					<td>글로벌리서치</td>
					<td>2017.12.08</td>
					<td>
						<input type="button" value="설문작성">
						<input type="button" value="테스트">
						<input type="button" value="데이터">
						<input type="button" value="쿼터설정">
						<input type="button" value="시작">
					</td>
				</tr> -->
				
			</tbody>
		</table>
		<div class="foodiv">
			<button id="bt_projectReg">프로젝트 등록</button>
			<div class="totalPage">page/page</div>
		</div>
		
		<p class="pagination"></p>
	
	</article>
</section>

<!-- 프러젝트 시작 버튼 -->
<!-- <div class="layout" style="display:none;" id="pop_projectState">
	<div class="layoutcontents one">
		<section>
			<article>
				프로젝트
			</article>
			<article>
				<button id="bt_psStart">시작</button> <button id="bt_psEnd">종료</button>
			</article>
			<div id="div_pStateVal1">
				상태값 :  <b>시작</b>
			</div>
		</section>
		<section>
			<article>
				설문
			</article>
			<article>
				<button id="bt_psProgress">진행</button> <button id="bt_psCompletion">완료</button>
			</article>
			<div id="div_pStateVal2">
				상태값 :  <b>진행</b>
			</div>
		</section>
		<div class="hite">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
			<button class="cancel">닫기</button>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
		</div>
	</div>
</div> -->

<div class="layout" style="display:none;" id="pop_projectState">
	<div class="layoutcontents one">
    	<div>
        	<section>
            	<article>프로젝트 설정</article>            	
				<article>
					<aside>
						초기화
					</aside>
					<aside>
						<button id="bt_psRegister">등록</button>
					</aside>
				</article>
               	<article>
                   	<aside>
						프로젝트
					</aside>
					<aside>
                       	<button id="bt_psStart">시작</button>
						<button id="bt_psEnd">종료</button>
					</aside>
				</article>
				<article>
					<aside>
						설문
					</aside>
					<aside>
						<button id="bt_psProgress">진행</button>
						<button id="bt_psCompletion">완료</button>
					</aside>
				</article>
			</section>
			<section>
				<article>프로젝트 상태</article>
				<article id="div_pStateVal">
					<span>시작</span> > <span class="spantextcolor">진행</span> > <span>완료</span> > <span>종료</span>
				</article>      
			</section>
		</div>
		<div class="hite">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
			<button class="cancel">닫기</button>
		</div>
	</div>
</div>

<!-- 다운로드및삭제 -->
<div class="layout" style="display:none;" id="pop_data">
	<div class="layoutcontents">
		<ul class="tabMenu">
			<li><a>데이터다운</a></li>
			<li><a>데이터삭제</a></li>  
		</ul>
		<div class="tabgo">
			<div class="cass">
				<div class="rhdrks">● ucode</div> <input type="text" id="dataDownUcode" name="dataDownUcode" onlynumber />
			</div>
			<div>
				<div class="rhdrks">● 조사상태</div> 
				<select id="dataDownProjectState" name="dataDownProjectState">
					<option value="">-</option>
					<option value="0">등록</option>
					<option value="1">시작</option>
					<option value="2">진행</option>
					<option value="3">완료</option>
					<option value="4">종료</option>
				</select>
			</div>
			<div class="data">
				<button id="bt_dataDwon">다운로드</button>
			</div>
		</div>
		<div class="tabgo">
			<div class="cass">
				<div class="rhdrks">● ucode</div> <input type="text" id="dataDelUcode" name="dataDelUcode" onlynumber />
			</div>
			<div>
				<div class="rhdrks">● 조사상태</div> 
				<select id="dataDelProjectState" name="dataDelProjectState">
					<option value="">-</option>
					<option value="0">등록</option>
					<option value="1">시작</option>
					<option value="2">진행</option>
					<option value="3">완료</option>
					<option value="4">종료</option>
				</select>
			</div>
			<div class="data">
				<button id="bt_dataDel">데이터삭제</button>
			</div>
		</div>
		<div class="hite">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
			<button class="cancel">닫기</button>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
		</div>
	</div>
</div>

<!-- CPNO -->
<div class="layout" style="display:none;" id="pop_cpno">
	<div class="layoutcontents one">
    	<div>
        	<section>
				<article id="cpnoTitle">설문경로</article>				
				<div>
					● CPNO
					<span id="cpnoValue"></span>
				</div>
				<div>
					● 주소
					<span id="surveyLink"></span>
				</div>
			</section>
	    	<div class="hite">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
				<button class="cancel">닫기</button>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
			</div>
		</div>
	</div>
</div>