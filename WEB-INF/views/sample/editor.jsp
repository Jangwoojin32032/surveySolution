<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
 
<script src="https://code.jquery.com/jquery-latest.js"></script>
<script type="text/javascript" src="/resources/editor/js/HuskyEZCreator.js" charset="utf-8"></script>

<script>
	var gnbDep1 = 1;
	var gnbDep2 = 2;
</script>
<script type="text/javascript">

// 참조 사이트 : http://handcoding.tistory.com/16

	$(function(){
		//전역변수
		var obj = [];             
		//스마트에디터 프레임생성
		nhn.husky.EZCreator.createInIFrame({
			oAppRef: obj,
			elPlaceHolder: "smarteditor",
			sSkinURI: "/resources/editor/SmartEditor2Skin.html",
			htParams : {
				// 툴바 사용 여부
				bUseToolbar : true,           
				// 입력창 크기 조절바 사용 여부
				bUseVerticalResizer : true,   
				// 모드 탭(Editor | HTML | TEXT) 사용 여부
				bUseModeChanger : true,
			}
		});
		//전송버튼
		$("#insertBoard").click(function(){
			//id가 smarteditor인 textarea에 에디터에서 대입
			obj.getById["smarteditor"].exec("UPDATE_CONTENTS_FIELD", []);

			//폼 submit
			$("#insertBoardFrm").submit();
		});
	});
</script>
 
  <form action="/sample/insertEditor" method="post" id="insertBoardFrm" enctype="multipart/form-data">
    <textarea name="smarteditor" id="smarteditor" style="width: 700px; height: 400px;"></textarea>
    <input type="button" id="insertBoard" value="등록" />
  </form>
 
