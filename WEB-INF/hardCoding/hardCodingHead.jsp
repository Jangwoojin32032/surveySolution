<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
    request.setCharacterEncoding("utf-8");
	String uCode = request.getParameter("uCode"); 
	if(null == uCode || "".equals(uCode)){
		uCode = "";
	}
	String surveyState = request.getParameter("surveyState"); 
	if(null == surveyState || "".equals(surveyState)){
		surveyState = "";
	}
	String checkNum = request.getParameter("checkNum"); 
	if(null == checkNum || "".equals(checkNum)){
		checkNum = "";
	}
%>
<html>