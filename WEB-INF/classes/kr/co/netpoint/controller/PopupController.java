package kr.co.netpoint.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kr.co.netpoint.property.ConfigProperty;
import kr.co.netpoint.service.CommonService;
import kr.co.netpoint.service.ProjectService;
import kr.co.netpoint.vo.project.SlCustomScriptVO;


@Controller
public class PopupController {

	static final Logger logger = LoggerFactory.getLogger(ProjectController.class);

	@Autowired
	private ProjectService projectService;
	@Autowired
	private CommonService commonService;
	@Autowired
	private ConfigProperty configProperty;

	@RequestMapping(value = "/popup/projectQuaterPopup")
	public ModelAndView projectQuaterPopup( Authentication authentication, HttpServletRequest request
										, @RequestParam(value = "projectId", defaultValue = "0", required = false) int projectId) throws Exception {
		logger.info(">>> projectQuaterPopup projectId:" + projectId);
		ModelAndView mv = new ModelAndView();
		mv.addObject("projectId", Integer.valueOf(projectId));
		mv.setViewName("/popup/projectQuaterPopup");
		return mv;
	}

	@RequestMapping(value = "/popup/customScriptPopup")
	public ModelAndView customScriptContents( Authentication authentication, HttpServletRequest request
										, @RequestParam(value = "projectId", defaultValue = "0", required = false) int projectId
										, @RequestParam(value = "customScriptId", defaultValue = "0", required = false) int customScriptId) throws Exception {
		logger.info(">>> projectQuaterPopup projectId:" + projectId);
		logger.info(">>> customScriptContents customScriptId:" + customScriptId);

		ModelAndView mv = new ModelAndView();

		mv.addObject("projectId", Integer.valueOf(projectId));
		mv.addObject("customScriptId", Integer.valueOf(customScriptId));
		mv.setViewName("/popup/customScriptPopup");
		return mv;
	}

	@ResponseBody
	@RequestMapping(value = "/popup/getCustomScriptContents")
	public ModelAndView getCustomScriptContents(@RequestBody SlCustomScriptVO slCustomScriptVO) throws Exception {
		logger.info(">>> getCustomScriptContents projectId:" + slCustomScriptVO.getProjectId());
		logger.info(">>> getCustomScriptContents customScriptId:" + slCustomScriptVO.getCustomScriptId());

		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		if (0 != slCustomScriptVO.getCustomScriptId()) {
			// 사용자 등록 스크립트 내용 조회( projectId, customScriptId )
			SlCustomScriptVO slCustomScript = this.projectService.customScriptContents(slCustomScriptVO);
			mv.addObject("slCustomScript", slCustomScript);
		}
		return mv;
	}

	@RequestMapping(value = "/popup/inquiryPopup")
	public ModelAndView inquiryPopup( Authentication authentication, HttpServletRequest request
										, @RequestParam(value = "projectId", defaultValue = "0", required = false) int projectId
										, @RequestParam(value = "uCode", defaultValue = "0", required = false) int uCode
										, @RequestParam(value = "projectNameOuter", defaultValue = "", required = false) String projectNameOuter) throws Exception {
		logger.info(">>> inquiryPopup projectId:" + projectId);
		logger.info(">>> inquiryPopup uCode:" + uCode);
		logger.info(">>> inquiryPopup projectNameOuter:" + projectNameOuter);

		ModelAndView mv = new ModelAndView();

		mv.addObject("projectId", Integer.valueOf(projectId));
		mv.addObject("uCode", Integer.valueOf(uCode));
		mv.addObject("projectNameOuter", projectNameOuter);
		mv.setViewName("/popup/inquiryPopup");
		return mv;
	}
}
