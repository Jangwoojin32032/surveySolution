<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
	<meta name='viewport' content='width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no'/>
	<meta name='format-detection' content='telephone=no, address=no, email=no'/>
	<title>조사 조사</title>
	<link rel='stylesheet' type='text/css' href='/resources/css/survey.css'>
	<script type='text/javascript' charset='utf-8' src='/resources/lib/jquery-1.11.1/jquery-1.11.1.min.js' ></script>
</head>
<script>


	function captionclick(obj) {
	    if ("INPUT" == event.srcElement.tagName)
	        event.cancelBubble = true;
	    else {
	        obj.children[0].click();
	        return false;
	    }
	}


</script>
<body>
	
	<section class="container">
		<article>
			
			
			<!-- 머리 -->
			<header>
				<aside>
					<div>
						100%
					</div> 
				</aside>	
			</header>
			
			
			
			
			<!-- 몸 -->
			<section class="contents">
				<article>
					<div>
						SQ1.
					</div>
					<div>
						성별을 선택해 주세요.<br>
					</div>
				</article>
				<article class="survey_form">
					<ul>
						<li>
							<label><input type="radio"> 남자</label>
						</li>
						<li>
							<label><input type="radio"> 여자</label>
						</li>
						<li>
							<label><input type="radio"> 자웅동체</label>
						</li>
					</ul>
				</article>
			</section>
			
			<section class="contents">
				<article>
					<div>
						SQ2.
					</div>
					<div>
						귀하의 나이는?<br>
					</div>
				</article>
				<article class="survey_form">
					<ul>
						<li>
							<label><input type="radio"> 10대</label>
						</li>
						<li>
							<label><input type="radio"> 20대</label>
						</li>
						<li>
							<label><input type="radio"> 30대</label>
						</li>
						<li>
							<label><input type="radio"> 40대</label>
						</li>
						<li>
							<label><input type="radio"> 50대</label>
						</li>
						<li>
							<label><input type="radio"> 60대이상</label> ( <input type="text"> )
						</li>
					</ul>
				</article>
			</section>
			
			
			<section class="contents">
				<article>
					<div>
						SQ3.
					</div>
					<div>
						소유 물품은<br>
					</div>
				</article>
				<article class="survey_form">
					<ul>
						<li>
							<label><input type="checkbox"> 자전거</label>
						</li>
						<li>
							<label><input type="checkbox"> 냉장고</label>
						</li>
						<li>
							<label><input type="checkbox"> 컴퓨터</label>
						</li>
						<li>
							<label><input type="checkbox"> 휴대폰</label>
						</li>		
						<li>
							<label><input type="checkbox"> 이중에 없음</label> ( <input type="text"> )
						</li>
					</ul>
				</article>
			</section>
			
			
			
			<section class="contents">
				<article>
					<div>
						SQ4.
					</div>
					<div>
						귀하의 학력은<br>
					</div>
				</article>
				<article class="survey_form">
					<ul>
						<li>
							<label><input type="text" size="2"> 고졸</label>
						</li>
						<li>
							<label><input type="text" size="2"> 대졸</label>
						</li>
						<li>
							<label><input type="text" size="2"> 대학원이상</label> ( <input type="text"> )
						</li>
					</ul>
				</article>
			</section>
			
			
			
			<section class="contents">
				<article>
					<div>
						SQ5.
					</div>
					<div>
						귀하의 거주지역은?<br>
					</div>
				</article>
				<article class="survey_form">
					<ul>
						<li>
							<label><input type="radio"> 서울</label>
						</li>
						<li>
							<label><input type="radio"> 시골</label>
						</li>
					</ul>
				</article>
			</section>
			
			
			
			<section class="contents">
				<article>
					<div>
						SQ6.
					</div>
					<div>
						오픈<br>
					</div>
				</article>
				<article class="survey_form">
					<ul>
						<li>
							<input type="text">
						</li>
					</ul>
				</article>
			</section>
			
			
			
			<section class="contents">
				<article>
					<div>
						SQ7.
					</div>
					<div>
						오픈숫자<br>
					</div>
				</article>
				<article class="survey_form">
					<ul>
						<li>
							<input type="text">
						</li>
					</ul>
				</article>
			</section>
			
			
			
			
			<section class="contents">
				<article>
					<div>
						SQ8.
					</div>
					<div>
						척도<br>
					</div>
				</article>
				<article class="survey_form">
					<table class="measure">
						<thead>
							<tr>
								<td>
									만족
								</td>
								<td>
									보통
								</td>
								<td>
									불만족
								</td>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td onClick="return captionclick(this)">
									<input type="radio">
								</td>
								<td onClick="return captionclick(this)">
									<input type="radio">
								</td>
								<td onClick="return captionclick(this)">
									<input type="radio">
								</td>
							</tr>
						</tbody>
					</table>
				</article>
			</section>
			
			
			
			<section class="contents">
				<article>
					<div>
						SQ8.
					</div>
					<div>
						척도<br>
					</div>
				</article>
				<article class="survey_form">
					<table class="measure">
						<colgroup>
							<col width="50%" />
							<col width="10%" />
							<col width="10%" />
							<col width="10%" />
							<col width="10%" />
							<col width="10%" />
						</colgroup>
						<thead>
							<tr>
								<td>
									질문
								</td>
								<td>
									매우만족
								</td>
								<td>
									만족
								</td>
								<td>
									보통
								</td>
								<td>
									불만족
								</td>
								<td>
									매우불만족
								</td>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="item_title">
									첫번째문항
								</td>
								<td onClick="return captionclick(this)">
									<input type="radio">
								</td>
								<td onClick="return captionclick(this)">
									<input type="radio">
								</td>
								<td onClick="return captionclick(this)">
									<input type="radio">
								</td>
								<td onClick="return captionclick(this)">
									<input type="radio">
								</td>
								<td onClick="return captionclick(this)">
									<input type="radio">
								</td>
							</tr>
							<tr>
								<td class="item_title">
									두번째문항
								</td>
								<td onClick="return captionclick(this)">
									<input type="radio">
								</td>
								<td onClick="return captionclick(this)">
									<input type="radio">
								</td>
								<td onClick="return captionclick(this)">
									<input type="radio">
								</td>
								<td onClick="return captionclick(this)">
									<input type="radio">
								</td>
								<td onClick="return captionclick(this)">
									<input type="radio">
								</td>
							</tr>
							<tr>
								<td class="item_title">
									세번째문항
								</td>
								<td onClick="return captionclick(this)">
									<input type="radio">
								</td>
								<td onClick="return captionclick(this)">
									<input type="radio">
								</td>
								<td onClick="return captionclick(this)">
									<input type="radio">
								</td>
								<td onClick="return captionclick(this)">
									<input type="radio">
								</td>
								<td onClick="return captionclick(this)">
									<input type="radio">
								</td>
							</tr>
						</tbody>
					</table>
				</article>
			</section>
			
			
			
			<section class="contents">
				<article>
					<div>
						SQ10.
					</div>
					<div>
						버리고 싶은 물품은<br>
					</div>
				</article>
				<article class="survey_form">
					<ul>
						<li>
							<label><input type="checkbox"> 자전거</label>
						</li>
						<li>
							<label><input type="checkbox"> 냉장고</label>
						</li>
						<li>
							<label><input type="checkbox"> 컴퓨터</label>
						</li>
						<li>
							<label><input type="checkbox"> 휴대폰</label>
						</li>		
						<li>
							<label><input type="checkbox"> 이중에 없음</label> ( <input type="text"> )
						</li>
					</ul>
				</article>
			</section>
			
		
			
			
			<!-- 다리 -->
			<footer>
				<button>다음</button>			
			</footer>
			
			
			
			
			
		</article><!-- 내용틀 -->
	</section><!-- 시작틀 -->
</body>
</html>
