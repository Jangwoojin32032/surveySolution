<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%
  //한글 인코딩을 위한 UTF-8 설정
    request.setCharacterEncoding("utf-8");
    out.println("에디터 결과"); 
    out.println(request.getParameter("smarteditor"));
    %>