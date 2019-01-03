<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

	<section class="container">
		<article class="bitcoin">
			<!-- 머리 -->
			<header>
				<img id="imgLog" src="/resources/img/logo.png">
				<aside>
					<div>100%</div>
				</aside>
				<div class="size">
					<!-- data-cell="설문키우기" -->
					<span class="numberUpDown">1</span>
					<div>
						<a class="reset">초기화</a>
					</div>
					<div>
						<a class="increaseQuantity">+</a>
					</div>
					<div>
						<a class="decreaseQuantity">-</a>
					</div>
				</div>
			</header>
			<input type="hidden" name="projectId" value="67"> <input
				type="hidden" name="hardCodingId" value="46"> <input
				type="hidden" name="uCode" value="1111"> <input
				type="hidden" name="surveyState" value="testList">
			<div id="setBody">
				<section class="contents">
					<article>
						<div>Q1.</div>
						<div>성별을 선택해 주세요.</div>
					</article>
					<article class="survey_form">
						<ul>
							<li><label><input type="radio" name="Q1" id="Q1_1"
									value="1" exampletext="Q1" exampleindex="1">남</label></li>
							<li><label><input type="radio" name="Q1" id="Q1_2"
									value="2" exampletext="Q1" exampleindex="2">여</label></li>
							<li><label><input type="radio" name="Q1" id="Q1_3"
									value="3" exampletext="Q1" exampleindex="3">자웅동체</label></li>
						</ul>
					</article>
				</section>
				<section class="contents">
					<article>
						<div>Q2.</div>
						<div>귀하의 나이는?</div>
					</article>
					<article class="survey_form">
						<ul>
							<li><label><input type="radio" name="Q2" id="Q2_1"
									value="1" exampletext="Q2" exampleindex="1">10대</label></li>
							<li><label><input type="radio" name="Q2" id="Q2_2"
									value="2" exampletext="Q2" exampleindex="2" sreadonly="Q2_text">20대</label>
								( <input type="text" name="Q2_text" id="Q2_text" value=""
								exampletext="Q2_text" exampleindex="2" textwidth="155"
								readonly="" style="width: 155px;"> )</li>
							<li><label><input type="radio" name="Q2" id="Q2_3"
									value="3" exampletext="Q2" exampleindex="3">30대</label></li>
							<li><label><input type="radio" name="Q2" id="Q2_4"
									value="4" exampletext="Q2" exampleindex="4">40대</label></li>
							<li><label><input type="radio" name="Q2" id="Q2_5"
									value="5" exampletext="Q2" exampleindex="5">50대</label></li>
							<li><label><input type="radio" name="Q2" id="Q2_6"
									value="6" exampletext="Q2" exampleindex="6">60대이상</label></li>
						</ul>
					</article>
				</section>
				<section class="contents">
					<article>
						<div>Q3.</div>
						<div>소유 물품은</div>
					</article>
					<article class="survey_form">
						<ul>
							<li><label><input type="checkbox" name="Q3"
									id="Q3_1" value="1" exampletext="Q3" exampleindex="1">자전거</label></li>
							<li><label><input type="checkbox" name="Q3"
									id="Q3_2" value="2" exampletext="Q3" exampleindex="2">냉장고</label></li>
							<li><label><input type="checkbox" name="Q3"
									id="Q3_3" value="3" exampletext="Q3" exampleindex="3"
									sreadonly="Q3_text" scheckedfalse="">컴퓨터</label> ( <input
								type="text" id="Q3_text" name="Q3_text" value=""
								exampletext="Q3_text" exampleindex="3" textwidth="155"
								readonly="" style="width: 155px;"> )</li>
							<li><label><input type="checkbox" name="Q3"
									id="Q3_4" value="4" exampletext="Q3" exampleindex="4">휴대폰</label></li>
							<li><label><input type="checkbox" name="Q3"
									id="Q3_5" value="5" exampletext="Q3" exampleindex="5">이중에
									없음</label></li>
						</ul>
					</article>
				</section>
				<section class="contents">
					<article>
						<div>Q4.</div>
						<div>귀하의 학력은?</div>
					</article>
					<article class="survey_form">
						<ul>
							<li><label><input type="text"
									style="width: 40px; text-align: center; margin-right: 5px;"
									name="Q4" id="Q4_1" value="" exampletext="Q4_1"
									exampleindex="1" sorder="" readonly="">중졸</label></li>
							<li><label><input type="text"
									style="width: 40px; text-align: center; margin-right: 5px;"
									name="Q4" id="Q4_2" value="" exampletext="Q4_2"
									exampleindex="2" sorder="" readonly="">고졸</label></li>
							<li><label><input type="text"
									style="width: 40px; text-align: center; margin-right: 5px;"
									name="Q4" id="Q4_3" value="" exampletext="Q4_3"
									exampleindex="3" sorder="" readonly="">대졸</label></li>
							<li><label><input type="text"
									style="width: 40px; text-align: center; margin-right: 5px;"
									name="Q4" id="Q4_4" value="" exampletext="Q4_4"
									exampleindex="4" sorder="" sreadonly="Q4_text" readonly="">대학원이상</label>
								( <input type="text" name="Q4_text" id="Q4_text" value=""
								exampletext="Q4_text" exampleindex="4" textwidth="155"
								readonly="" style="width: 155px;"> )</li>
						</ul>
					</article>
				</section>
				<section class="contents">
					<article>
						<div>Q5.</div>
						<div>귀하의 거주지역은?</div>
					</article>
					<article class="survey_form">
						<ul>
							<li><label><input type="radio" name="Q5" id="Q5_1"
									value="1" exampletext="Q5" exampleindex="1">서울</label></li>
							<li><label><input type="radio" name="Q5" id="Q5_2"
									value="2" exampletext="Q5" exampleindex="2">시골</label></li>
						</ul>
					</article>
				</section>
				<section class="contents">
					<article>
						<div>Q6.</div>
						<div>오픈</div>
					</article>
					<article class="survey_form">
						<table class="measure">
							<colgroup>
								<col width="*">
								<col width="50%">
							</colgroup>
							<thead>
							</thead>
							<tbody>
								<tr>
									<td class="item_title">test1</td>
									<td><input type="text" name="Q6_1" id="Q6_1" value=""
										exampletext="Q6_1" exampleindex="1" onlyenglish=""
										textwidth="155" style="width: 155px;"></td>
								</tr>
								<tr>
									<td class="item_title">test2</td>
									<td><input type="text" name="Q6_2" id="Q6_2" value=""
										exampletext="Q6_2" exampleindex="2" onlyenglish=""
										textwidth="155" style="width: 155px;"></td>
								</tr>
							</tbody>
						</table>
					</article>
				</section>
				<section class="contents">
					<article>
						<div>Q7.</div>
						<div>오픈숫자</div>
					</article>
					<article class="survey_form">
						<ul>
							<li><input type="text" name="Q7" id="Q7" exampletext="Q7"
								value="" onlynumber="" textwidth="155" style="width: 155px;"></li>
						</ul>
					</article>
				</section>
				<section class="contents">
					<article>
						<div>Q8.</div>
						<div>척도</div>
					</article>
					<article class="survey_form">
						<table class="measure">
							<thead>
								<tr>
									<td>만족</td>
									<td>보통</td>
									<td>불만족</td>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td onclick="return captionclick(this)"><input
										type="radio" name="Q8" id="Q8_1" value="1" exampletext="Q8"
										exampleindex="1"></td>
									<td onclick="return captionclick(this)"><input
										type="radio" name="Q8" id="Q8_2" value="2" exampletext="Q8"
										exampleindex="2"></td>
									<td onclick="return captionclick(this)"><input
										type="radio" name="Q8" id="Q8_3" value="3" exampletext="Q8"
										exampleindex="3"></td>
								</tr>
							</tbody>
						</table>
					</article>
				</section>
				<section class="contents">
					<article>
						<div>Q9.</div>
						<div>속성형</div>
					</article>
					<article class="survey_form">
						<table class="measure addcol">
							<colgroup>
								<col width="*">
								<col width="10%">
								<col width="10%">
								<col width="10%">
								<col width="10%">
								<col width="10%">
								<col width="10%">
							</colgroup>
							<thead>
								<tr>
									<td>질문</td>
									<td>첫번째문항</td>
									<td>두번째문항</td>
									<td>세번째문항</td>
									<td>네번째문항</td>
									<td>다섯번째문항</td>
									<td>여섯번째문항</td>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td class="item_title">매우만족</td>
									<td onclick="return captionclick(this)"><input
										type="radio" name="Q9_1" id="Q9_1_1" value="1"
										exampletext="Q9_1" exampleindex="1"></td>
									<td onclick="return captionclick(this)" style="display: none;"><input
										type="radio" name="Q9_2" id="Q9_2_1" value="1"
										exampletext="Q9_2" exampleindex="1"></td>
									<td onclick="return captionclick(this)" style="display: none;"><input
										type="radio" name="Q9_3" id="Q9_3_1" value="1"
										exampletext="Q9_3" exampleindex="1"></td>
									<td onclick="return captionclick(this)" style="display: none;"><input
										type="radio" name="Q9_4" id="Q9_4_1" value="1"
										exampletext="Q9_4" exampleindex="1"></td>
									<td onclick="return captionclick(this)" style="display: none;"><input
										type="radio" name="Q9_5" id="Q9_5_1" value="1"
										exampletext="Q9_5" exampleindex="1"></td>
									<td onclick="return captionclick(this)" style="display: none;"><input
										type="radio" name="Q9_6" id="Q9_6_1" value="1"
										exampletext="Q9_6" exampleindex="1"></td>
								</tr>
								<tr>
									<td class="item_title">만족</td>
									<td onclick="return captionclick(this)"><input
										type="radio" name="Q9_1" id="Q9_1_2" value="2"
										exampletext="Q9_1" exampleindex="2"></td>
									<td onclick="return captionclick(this)" style="display: none;"><input
										type="radio" name="Q9_2" id="Q9_2_2" value="2"
										exampletext="Q9_2" exampleindex="2"></td>
									<td onclick="return captionclick(this)" style="display: none;"><input
										type="radio" name="Q9_3" id="Q9_3_2" value="2"
										exampletext="Q9_3" exampleindex="2"></td>
									<td onclick="return captionclick(this)" style="display: none;"><input
										type="radio" name="Q9_4" id="Q9_4_2" value="2"
										exampletext="Q9_4" exampleindex="2"></td>
									<td onclick="return captionclick(this)" style="display: none;"><input
										type="radio" name="Q9_5" id="Q9_5_2" value="2"
										exampletext="Q9_5" exampleindex="2"></td>
									<td onclick="return captionclick(this)" style="display: none;"><input
										type="radio" name="Q9_6" id="Q9_6_2" value="2"
										exampletext="Q9_6" exampleindex="2"></td>
								</tr>
								<tr>
									<td class="item_title">보통 ( <input type="text"
										name="Q9_text" id="Q9_text" value="" exampletext="Q9_text"
										exampleindex="3" textwidth="155" style="width: 155px;">
										)
									</td>
									<td onclick="return captionclick(this)"><input
										type="radio" name="Q9_1" id="Q9_1_3" value="3"
										exampletext="Q9_1" exampleindex="3"></td>
									<td onclick="return captionclick(this)" style="display: none;"><input
										type="radio" name="Q9_2" id="Q9_2_3" value="3"
										exampletext="Q9_2" exampleindex="3"></td>
									<td onclick="return captionclick(this)" style="display: none;"><input
										type="radio" name="Q9_3" id="Q9_3_3" value="3"
										exampletext="Q9_3" exampleindex="3"></td>
									<td onclick="return captionclick(this)" style="display: none;"><input
										type="radio" name="Q9_4" id="Q9_4_3" value="3"
										exampletext="Q9_4" exampleindex="3"></td>
									<td onclick="return captionclick(this)" style="display: none;"><input
										type="radio" name="Q9_5" id="Q9_5_3" value="3"
										exampletext="Q9_5" exampleindex="3"></td>
									<td onclick="return captionclick(this)" style="display: none;"><input
										type="radio" name="Q9_6" id="Q9_6_3" value="3"
										exampletext="Q9_6" exampleindex="3"></td>
								</tr>
								<tr>
									<td class="item_title">불만족</td>
									<td onclick="return captionclick(this)"><input
										type="radio" name="Q9_1" id="Q9_1_4" value="4"
										exampletext="Q9_1" exampleindex="4"></td>
									<td onclick="return captionclick(this)" style="display: none;"><input
										type="radio" name="Q9_2" id="Q9_2_4" value="4"
										exampletext="Q9_2" exampleindex="4"></td>
									<td onclick="return captionclick(this)" style="display: none;"><input
										type="radio" name="Q9_3" id="Q9_3_4" value="4"
										exampletext="Q9_3" exampleindex="4"></td>
									<td onclick="return captionclick(this)" style="display: none;"><input
										type="radio" name="Q9_4" id="Q9_4_4" value="4"
										exampletext="Q9_4" exampleindex="4"></td>
									<td onclick="return captionclick(this)" style="display: none;"><input
										type="radio" name="Q9_5" id="Q9_5_4" value="4"
										exampletext="Q9_5" exampleindex="4"></td>
									<td onclick="return captionclick(this)" style="display: none;"><input
										type="radio" name="Q9_6" id="Q9_6_4" value="4"
										exampletext="Q9_6" exampleindex="4"></td>
								</tr>
								<tr>
									<td class="item_title">매우불만족</td>
									<td onclick="return captionclick(this)"><input
										type="radio" name="Q9_1" id="Q9_1_5" value="5"
										exampletext="Q9_1" exampleindex="5"></td>
									<td onclick="return captionclick(this)" style="display: none;"><input
										type="radio" name="Q9_2" id="Q9_2_5" value="5"
										exampletext="Q9_2" exampleindex="5"></td>
									<td onclick="return captionclick(this)" style="display: none;"><input
										type="radio" name="Q9_3" id="Q9_3_5" value="5"
										exampletext="Q9_3" exampleindex="5"></td>
									<td onclick="return captionclick(this)" style="display: none;"><input
										type="radio" name="Q9_4" id="Q9_4_5" value="5"
										exampletext="Q9_4" exampleindex="5"></td>
									<td onclick="return captionclick(this)" style="display: none;"><input
										type="radio" name="Q9_5" id="Q9_5_5" value="5"
										exampletext="Q9_5" exampleindex="5"></td>
									<td onclick="return captionclick(this)" style="display: none;"><input
										type="radio" name="Q9_6" id="Q9_6_5" value="5"
										exampletext="Q9_6" exampleindex="5"></td>
								</tr>
							</tbody>
						</table>
					</article>
				</section>
				<section class="contents">
					<article>
						<div>Q10.</div>
						<div>귀하의 학력은2?</div>
					</article>
					<article class="survey_form">
						<ul>
							<li><label><input type="text"
									style="width: 40px; text-align: center; margin-right: 5px;"
									name="Q10" id="Q10_1" value="" exampletext="Q10_1"
									exampleindex="1" sorder="" readonly="">중졸2</label></li>
							<li><label><input type="text"
									style="width: 40px; text-align: center; margin-right: 5px;"
									name="Q10" id="Q10_2" value="" exampletext="Q10_2"
									exampleindex="2" sorder="" readonly="">고졸2</label></li>
							<li><label><input type="text"
									style="width: 40px; text-align: center; margin-right: 5px;"
									name="Q10" id="Q10_3" value="" exampletext="Q10_3"
									exampleindex="3" sorder="" readonly="">대졸2</label></li>
							<li><label><input type="text"
									style="width: 40px; text-align: center; margin-right: 5px;"
									name="Q10" id="Q10_4" value="" exampletext="Q10_4"
									exampleindex="4" sorder="" sreadonly="Q10_text" readonly="">대학원이상2</label>
								( <input type="text" name="Q10_text" id="Q10_text" value=""
								exampletext="Q10_text" exampleindex="4" textwidth="155"
								readonly="" style="width: 155px;"> )</li>
						</ul>
					</article>
				</section>
				<section class="contents">
					<article>
						<div>Q11.</div>
						<div>속성형</div>
					</article>
					<article class="survey_form">
						<table class="measure addrowmul">
							<colgroup>
								<col width="*">
								<col width="10%">
								<col width="10%">
								<col width="10%">
								<col width="10%">
								<col width="10%">
								<col width="10%">
							</colgroup>
							<thead>
								<tr>
									<td>질문</td>
									<td>매우만족2</td>
									<td>만족2</td>
									<td>보통2</td>
									<td>불만족2</td>
									<td>매우불만족2</td>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td class="item_title">첫번째문항2</td>
									<td onclick="return captionclick(this)"><input
										type="checkbox" name="Q11_1" id="Q11_1_0" value="0"
										exampletext="Q11_1" exampleindex="0"></td>
									<td onclick="return captionclick(this)"><input
										type="checkbox" name="Q11_1" id="Q11_1_1" value="1"
										exampletext="Q11_1" exampleindex="1"></td>
									<td onclick="return captionclick(this)"><input
										type="checkbox" name="Q11_1" id="Q11_1_2" value="2"
										exampletext="Q11_1" exampleindex="2"></td>
									<td onclick="return captionclick(this)"><input
										type="checkbox" name="Q11_1" id="Q11_1_3" value="3"
										exampletext="Q11_1" exampleindex="3"></td>
									<td onclick="return captionclick(this)"><input
										type="checkbox" name="Q11_1" id="Q11_1_4" value="4"
										exampletext="Q11_1" exampleindex="4"></td>
									<td style="border: none;"><input type="button"
										name="bt_addrowmul" value="next"></td>
								</tr>
								<tr style="display: none;">
									<td class="item_title">두번째문항2</td>
									<td onclick="return captionclick(this)"><input
										type="checkbox" name="Q11_2" id="Q11_2_0" value="0"
										exampletext="Q11_2" exampleindex="0"></td>
									<td onclick="return captionclick(this)"><input
										type="checkbox" name="Q11_2" id="Q11_2_1" value="1"
										exampletext="Q11_2" exampleindex="1"></td>
									<td onclick="return captionclick(this)"><input
										type="checkbox" name="Q11_2" id="Q11_2_2" value="2"
										exampletext="Q11_2" exampleindex="2"></td>
									<td onclick="return captionclick(this)"><input
										type="checkbox" name="Q11_2" id="Q11_2_3" value="3"
										exampletext="Q11_2" exampleindex="3"></td>
									<td onclick="return captionclick(this)"><input
										type="checkbox" name="Q11_2" id="Q11_2_4" value="4"
										exampletext="Q11_2" exampleindex="4"></td>
									<td style="border: none;"><input type="button"
										name="bt_addrowmul" value="next"></td>
								</tr>
								<tr style="display: none;">
									<td class="item_title">세번째문항2</td>
									<td onclick="return captionclick(this)"><input
										type="checkbox" name="Q11_3" id="Q11_3_0" value="0"
										exampletext="Q11_3" exampleindex="0"></td>
									<td onclick="return captionclick(this)"><input
										type="checkbox" name="Q11_3" id="Q11_3_1" value="1"
										exampletext="Q11_3" exampleindex="1"></td>
									<td onclick="return captionclick(this)"><input
										type="checkbox" name="Q11_3" id="Q11_3_2" value="2"
										exampletext="Q11_3" exampleindex="2"></td>
									<td onclick="return captionclick(this)"><input
										type="checkbox" name="Q11_3" id="Q11_3_3" value="3"
										exampletext="Q11_3" exampleindex="3"></td>
									<td onclick="return captionclick(this)"><input
										type="checkbox" name="Q11_3" id="Q11_3_4" value="4"
										exampletext="Q11_3" exampleindex="4"></td>
									<td style="border: none;"><input type="button"
										name="bt_addrowmul" value="next"></td>
								</tr>
							</tbody>
						</table>
					</article>
				</section>
				<section class="contents">
					<article>
						<div>Q12.</div>
						<div>textarea</div>
					</article>
					<article class="survey_form">
						<textarea cols="100" rows="10" name="Q12" id="Q12"
							exampletext="Q12"></textarea>
					</article>
				</section>
				<section class="contents">
					<article>
						<div>Q13.</div>
						<div>소유 물품은</div>
					</article>
					<article class="survey_form">
						<ul>
							<li><label><input type="checkbox" name="Q13"
									id="Q13_1" value="1" exampletext="Q13" exampleindex="1">자전거</label></li>
							<li><label><input type="checkbox" name="Q13"
									id="Q13_2" value="2" exampletext="Q13" exampleindex="2">냉장고</label></li>
							<li><label><input type="checkbox" name="Q13"
									id="Q13_3" value="3" exampletext="Q13" exampleindex="3"
									sreadonly="Q13_text" scheckedfalse="">컴퓨터</label> ( <input
								type="text" id="Q13_text" name="Q13_text" value=""
								exampletext="Q13_text" exampleindex="3" textwidth="155"
								readonly="" style="width: 155px;"> )</li>
							<li><label><input type="checkbox" name="Q13"
									id="Q13_4" value="4" exampletext="Q13" exampleindex="4">휴대폰</label></li>
							<li><label><input type="checkbox" name="Q13"
									id="Q13_5" value="5" exampletext="Q13" exampleindex="5">이중에
									없음</label></li>
						</ul>
					</article>
				</section>
				<section class="contents">
					<article>
						<div>Q14.</div>
						<div>오픈금액</div>
					</article>
					<article class="survey_form">
						<ul>
							<li><input type="text" name="Q14" id="Q14" exampletext="Q14"
								value="" onlymoney="" textwidth="155" style="width: 155px;">
							<div>금액을 등록하면 한글로 표시 됩니다.</div></li>
						</ul>
					</article>
				</section>
				<section class="contents">
					<article>
						<div>Q15.</div>
						<div>오픈전화번호</div>
					</article>
					<article class="survey_form">
						<ul>
							<li><input type="text" name="Q15" id="Q15" exampletext="Q15"
								value="" onlyphone="" textwidth="155" style="width: 155px;">
							<div>"-" 기호 없이 등록 하세요. 예) 01012341234</div></li>
						</ul>
					</article>
				</section>
				<section class="contents">
					<article>
						<div>Q16.</div>
						<div>오픈이메일</div>
					</article>
					<article class="survey_form">
						<ul>
							<li><input type="text" name="Q16" id="Q16" exampletext="Q16"
								value="" onlyemail="" textwidth="155" style="width: 155px;">
							<div>메일 형식에 맞게 등록 하세요. 예) smart@smartpanel.com</div></li>
						</ul>
					</article>
				</section>
				<section class="contents">
					<article>
						<div>Q17.</div>
						<div>음료수</div>
					</article>
					<article class="survey_form">
						<ul>
							<li><label><input type="radio" name="Q17" id="Q17_1"
									value="1" exampletext="Q17" exampleindex="1">커피</label></li>
							<li><label><input type="radio" name="Q17" id="Q17_2"
									value="2" exampletext="Q17" exampleindex="2">녹차</label></li>
							<li><label><input type="radio" name="Q17" id="Q17_3"
									value="3" exampletext="Q17" exampleindex="3">홍차</label></li>
							<li><label><input type="radio" name="Q17" id="Q17_4"
									value="4" exampletext="Q17" exampleindex="4">자스민</label></li>
							<li><label><input type="radio" name="Q17" id="Q17_5"
									value="5" exampletext="Q17" exampleindex="5">케모마일</label></li>
						</ul>
					</article>
				</section>
				<section class="contents">
					<article>
						<div>Q18.</div>
						<div>군것질</div>
					</article>
					<article class="survey_form">
						<ul>
							<li><label><input type="radio" name="Q18" id="Q18_1"
									value="1" exampletext="Q18" exampleindex="1">커피</label></li>
							<li><label><input type="radio" name="Q18" id="Q18_2"
									value="2" exampletext="Q18" exampleindex="2">초콜릿</label></li>
							<li><label><input type="radio" name="Q18" id="Q18_3"
									value="3" exampletext="Q18" exampleindex="3">과자</label></li>
							<li><label><input type="radio" name="Q18" id="Q18_4"
									value="4" exampletext="Q18" exampleindex="4">음료수</label></li>
						</ul>
					</article>
				</section>
				<section class="contents">
					<article>
						<div>Q19.</div>
						<div>휴가지</div>
					</article>
					<article class="survey_form">
						<ul>
							<li><label><input type="radio" name="Q19" id="Q19_1"
									value="1" exampletext="Q19" exampleindex="1">집</label></li>
							<li><label><input type="radio" name="Q19" id="Q19_2"
									value="2" exampletext="Q19" exampleindex="2">국내</label></li>
							<li><label><input type="radio" name="Q19" id="Q19_3"
									value="3" exampletext="Q19" exampleindex="3">동남아</label></li>
							<li><label><input type="radio" name="Q19" id="Q19_4"
									value="4" exampletext="Q19" exampleindex="4">유럽</label></li>
						</ul>
					</article>
				</section>
				<section class="contents">
					<article>
						<div>Q20.</div>
						<div>media</div>
					</article>
					<article class="survey_form">
						<iframe frameborder="0" height="281" smedia=""
							src="http://naver.com" timer="10" allowfullscreen=""
							mozallowfullscreen="" webkitallowfullscreen="" width="500"></iframe>
						<div id="msgTimer">
							현재 남은 시간은 <font color="red">0분 0초</font> 입니다.
						</div>
					</article>
				</section>
				<section class="contents">
					<article>
						<div>Q21.</div>
						<div>media</div>
					</article>
					<article class="survey_form">
						<iframe frameborder="0" height="281" smedia=""
							src="http://player.vimeo.com/video/113572210?title=1&amp;byline=0&amp;portrait=0&amp;autoplay=1&amp;loop=0"
							timer="10" allowfullscreen="" mozallowfullscreen=""
							webkitallowfullscreen="" width="500"></iframe>
						<div id="msgTimer"></div>
					</article>
				</section>
			</div>

			<!-- 다리 -->
			<footer>
				<button id="bt_next">다음</button>
			</footer>
		</article>
		<!-- 내용틀 -->
	</section>
	<!-- 시작틀 -->
