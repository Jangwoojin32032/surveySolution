package kr.co.netpoint.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kr.co.netpoint.common.MemberCommon;
import kr.co.netpoint.service.CommonService;
import kr.co.netpoint.service.ProjectService;
import kr.co.netpoint.vo.project.PnAdminVO;

@Controller
public class LoginController {

	static final Logger logger = LoggerFactory.getLogger(LoginController.class);

	@Autowired
	private ProjectService projectService;
	@Autowired
	private CommonService commonService;
	@Autowired
	private MemberCommon memberCommon;

	@RequestMapping(value = "/login/login")
	public ModelAndView login(Authentication authentication, HttpServletRequest request) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("/login/login");
		return mv;
	}

	@ResponseBody
	@RequestMapping(value = "/login/setLogin", method = RequestMethod.POST)
	public ModelAndView setLogin(@RequestBody PnAdminVO pnAdminVO, HttpServletRequest request) throws Exception {
		logger.info(">>> setLogin getId:" + pnAdminVO.getId());
		logger.info(">>> setLogin getPassWd:" + pnAdminVO.getPassWd());
		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		PnAdminVO setLogin = this.memberCommon.checkLogin(pnAdminVO);
		boolean isCheckLogin = false;

		logger.info(">>> setLogin setLogin:" + setLogin);
		if (null != setLogin) {
			this.memberCommon.setSession(request, setLogin, 1);
			isCheckLogin = setLogin.isCheckLogin();
			logger.info(">>> setLogin isCheckLogin:" + setLogin.isCheckLogin());
		}

		mv.addObject("isCheckLogin", isCheckLogin);
		return mv;
	}

	@RequestMapping(value = "/login/logOut")
	public ModelAndView logOut(Authentication authentication, HttpServletRequest request) throws Exception {
		ModelAndView mv = new ModelAndView();
		PnAdminVO pnAdminVO = new PnAdminVO();
		this.memberCommon.setSession(request, pnAdminVO, 2);
		mv.setViewName("/login/login");
		return mv;
	}

	@ResponseBody
	@RequestMapping(value = "/login/checkLogin", method = RequestMethod.POST)
	public ModelAndView checkLogin(HttpServletRequest request) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		HttpSession session = request.getSession();
		PnAdminVO pnAdminVO = (PnAdminVO) session.getAttribute("pnAdminVO");

		mv.addObject("pnAdminVO", pnAdminVO);
		return mv;
	}
}
