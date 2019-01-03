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

<input type="hidden" value="${projectId}" name="projectId"/>
<!-- 로테이션 -->
<section id="contents">
	<article class="article_write">
		<input type="hidden" id="projectId" name="projectId" value="${projectId}"/>
		<input type="hidden" id="rotationType" name="rotationType" value="eRot" />
		<input type="hidden" id="questionType" name="questionType" value="" />
		<div class="div">
			로테이션
			<div class="explanation">
				<div>
					보기 로테이션
				</div>
				<div>
					문항 로테이션
				</div>
				(<div>
					<div>M</div><span>메인</span>
				</div>
				<div>
					<div>S</div><span>서브</span>
				</div>)
			</div>
		</div>
		
		<div class="qlist">
			<aside>
				<ul>
					<li>
						문항
					</li>
					<li class="quarterlist">	
						<dl class="tabList" id="questionList">	
							<dd>							
								<div>
									<div class="randomCompletion"><b>SQ1</b></div>
									<div>성별을 선택해 주세요.</div>	
									<div>
										<div class="signM">M</div>
									</div>
								</div>
							</dd>
							<dd>	
								<div>
									<div class="viewCompletion"><b>SQ2</b></div>
									<div>귀하의나이는?</div>
									<div>
										<div class="signS">S</div>
									</div>
								</div>
							</dd>
							<dd>	
								<div>
									<div class="randomCompletion"><b>SQ3</b></div>
									<div>귀하의 학력은?</div>
									<div>
										<div class="signM">M</div>
									</div>
								</div>
							</dd>
							<dd>	
								<div>
									<div class="randomCompletion"><b>SQ4</b></div>
									<div>귀하의 학력은?귀하의 학력은?귀하의 학력은?귀하의 학력은?귀하의 학력은?귀하의 학력은?귀하의 학력은?</div>
									<div>
										<div class="signS">S</div>
									</div>
								</div>
							</dd>	
						</dl>	
					</li>
				</ul>	
			</aside>
			
			<aside class="tabago" id='rotationHtml' style="display: none;">
				<dl class="galaxy1">
					<dd><a id="bt_eRotInsert1">보기 로테이션</a></dd>
					<dd><a id="bt_qRotInsert2">문항 로테이션 등록</a></dd>
					<dd><a id="bt_qRotInsert3">문항 로테이션(파트) 설정</a></dd>
				</dl>
				<div class="space1" id="exampleList">
					<ul>
						<li>
							보기
						</li>
						<li>
							<div>
								<div>
									로테이션 명
									<input type="text" id="eRotMainTitle" name="eRotMainTitle" value="no title" onclick="javascript:if(this.value == 'no title') this.value='';"/>
								</div>
								<div>
									메인 문항 선택
									<select id="selExamMainQuestionList" name="selExamMainQuestionList">
									</select>
								</div>
							</div>
						</li>
						<li>
							<div id="exampleCheckList">
								<!-- 문항선택
								<div>
									<input type="checkbox" id="example_1_Q1" eId="1" qId="Q1"> 1) 문항의 보기
								</div>
								<div>
									<input type="checkbox" id="example_2_Q1" eId="2" qId="Q1"> 2) 문항의 보기
								</div>	
								<div>
									<input type="checkbox" id="example_3_Q1" eId="3" qId="Q1"> 3) 문항의 보기
								</div> -->	
							</div>
						</li>
					</ul>	
				</div>	
				<div class="space1" id='randomList'>
					<ul>
						<li>
							등록
						</li>
						<li>
							<div>
								로테이션 명
								<input type="text" id="qRotPartTitle" name="qRotPartTitle" value="no title" onclick="javascript:if(this.value == 'no title') this.value='';"/>
							</div>
							<div>
								로테이션 문항 수 선택
								<select id="selQuestionCount">
								</select>
							</div>
						</li>
						<li>								
							로테이션 문항 선택
							<div id="rotationSelList">
								<div>
									<select id='selQuestionList_0'>
									</select>
								</div>
							</div>
						</li>
					</ul>	
				</div>
				<div class="space1" id='randomList'>
					<ul>
						<li>
							설정
						</li>
						<li>
							<div>
								로테이션(파트) 명
								<input type="text" id="qRotMainTitle" name="qRotMainTitle" value="no title" onclick="javascript:if(this.value == 'no title') this.value='';"/>
							</div>
							<div>
								메인 문항 선택
								<select id="selLotMainQuestionList" name="selLotMainQuestionList">
								</select>
							</div>
							<div>								
								<input id="useUser" name="useUser" type="checkbox" checked="checked"> 사용자 선택 형
							</div>
						</li>
						<li>
							<div>
								로테이션(파트) 수 선택
								<select id="selPartCount">
									<option value="">select</option>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									<option value="5">5</option>
								</select>
							</div>
								로테이션(파트) 리스트 선택
							<div id="partRotationSelList">
								<div>
									<select id="selPartRotaion_1">
									</select>
								</div>
							</div>
						</li>
					</ul>	
				</div>
				<div>
					<button class="bta" id="bt_insertRotation">등록</button>
				</div>
			</aside>	
		</div>
		
		<div>Example List</div>
		<div class="rotationTable" id="eRotationHtml">
		</div>	
		<div>Rotation List</div>
		<div class="rotationTable" id="qrotationHtml">
		</div>
		<div>Part Question List</div>
		<div class="rotationTable" id="pRotationHtml">
		</div>
		
		<div class="regfooter" align="center">
			<!-- <input type="button" value="등록"> -->
			<input type="button" value="뒤로가기" name="bt_cancel">
		</div>
	</article>
</section>
