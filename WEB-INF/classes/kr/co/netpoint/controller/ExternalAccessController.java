package kr.co.netpoint.controller;

import javax.servlet.http.HttpServletRequest;
import kr.co.netpoint.service.CommonService;
import kr.co.netpoint.service.ProjectService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ExternalAccessController {
	
	static final Logger logger = LoggerFactory.getLogger(ExternalAccessController.class);
	
	@Autowired
	private ProjectService projectService;
	@Autowired
	private CommonService commonService;

	@RequestMapping(value = "/externalAccess/project/projectReg")
	public ModelAndView projectReg (Authentication authentication, HttpServletRequest request
									, @RequestParam(value = "projectId", defaultValue = "0", required = false) int projectId
									, @RequestParam(value = "projId", defaultValue = "0", required = false) int projId) throws Exception {
		logger.info(">>> /popup/projectReg projId:" + projId);
		ModelAndView mv = new ModelAndView();
		mv.addObject("projectId", Integer.valueOf(projectId));
		mv.addObject("projId", Integer.valueOf(projId));
		mv.setViewName("/externalAccess/project/projectReg");
		return mv;
	}
}
