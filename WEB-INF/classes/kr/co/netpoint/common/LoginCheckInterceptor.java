package kr.co.netpoint.common;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class LoginCheckInterceptor extends HandlerInterceptorAdapter {
	static final Logger logger = LoggerFactory.getLogger(LoginCheckInterceptor.class);

	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		HttpSession session = request.getSession();
		if (session == null) {
			response.sendRedirect(request.getContextPath() + "/login/login");
			return false;
		}
		String id = (String) session.getAttribute("id");
		logger.info(">>> LoginCheckInterceptor id:" + id);
		if ((null == id) || ("".equals(id))) {
			response.sendRedirect(request.getContextPath() + "/login/login");
			return false;
		}
		return true;
	}
}
