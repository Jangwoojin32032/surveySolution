<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags" %>
<%@ page session="true" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"/>
	<meta name="format-detection" content="telephone=no, address=no, email=no"/>
	<title>contentLayout</title>
	
	<link rel="stylesheet" type="text/css" href="/resources/css/default.css">
	<script type="text/javascript" charset="utf-8" src="/resources/lib/jquery-1.11.1/jquery-1.11.1.min.js" ></script>
	<script type="text/javascript" charset="utf-8" src="/resources/js/jquery-1.11.2.min.js" ></script>
	<script type="text/javascript" charset="utf-8" src="/resources/js/jquery.easing.1.3.js" ></script>
	<script type="text/javascript" charset="utf-8" src="/resources/js/default.js" ></script>
	<script type="text/javascript" charset="utf-8" src="/resources/js/common/common.js" ></script>
	<script type="text/javascript" charset="utf-8" src="/resources/js/common/paging.js" ></script>
	<script type="text/javascript" charset="utf-8" src="/resources/js/<tiles:getAsString name='jsfile' ignore='true'/>" ></script>
</head>

<body class="web">
	<section id="container">
		<section>
			<tiles:insertAttribute name="body" />
		</section>
	</section>
</body>
</html>
