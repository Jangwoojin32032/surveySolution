package kr.co.netpoint.controller;

import javax.servlet.http.HttpServletRequest;
import kr.co.netpoint.property.ConfigProperty;
import kr.co.netpoint.service.CommonService;
import kr.co.netpoint.service.ProjectService;
import kr.co.netpoint.vo.project.SlHardCodingVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HardCodingController {
	
	static final Logger logger = LoggerFactory.getLogger(HardCodingController.class);
	
	@Autowired
	private ConfigProperty configProperty;
	@Autowired
	private ProjectService projectService;
	@Autowired
	private CommonService commonService;

	@RequestMapping(value = "/hardCoding/fileUpload" )
	public ModelAndView fileUpload( Authentication authentication, HttpServletRequest request
								, @RequestParam(value = "projectId", defaultValue = "0", required = false) int projectId) throws Exception {
		ModelAndView mv = new ModelAndView();
		String HardCodingVersion = this.configProperty.getHardCodingVersion();

		mv.addObject("projectId", Integer.valueOf(projectId));
		mv.addObject("HardCodingVersion", HardCodingVersion);
		mv.setViewName("/hardCoding/fileUpload");
		return mv;
	}

	@ResponseBody
	@RequestMapping(value = "/hardCoding/setSlHardCoding", method = RequestMethod.POST)
	public ModelAndView setSlHardCoding(@RequestBody SlHardCodingVO slHardCodingVO) throws Exception {
		int projectId = slHardCodingVO.getProjectId();

		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		SlHardCodingVO selectSlHardCoding = this.projectService.selectSlHardCoding(slHardCodingVO);
		mv.addObject("selectSlHardCoding", selectSlHardCoding);

		String testUrl = "";
		if (null != this.configProperty) {
			testUrl = this.configProperty.getFileLoadDirectory() 
					+ this.configProperty.getHardCodingSaveDirectory()+ "/" 
					+ this.configProperty.getHardCodingVersion();
		}
		mv.addObject("testUrl", testUrl);

		return mv;
	}

	@ResponseBody
	@RequestMapping(value = "/hardCoding/insertSlHardCoding", method = RequestMethod.POST )
	public ModelAndView insertSlHardCoding(@RequestBody SlHardCodingVO slHardCodingVO) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		boolean insertSlHardCoding = false;
		boolean updateSlHardCoding = false;
		/*if ((null != slHardCodingVO) && (0 < slHardCodingVO.getHardCodingId())) {
			updateSlHardCoding = this.projectService.updateSlHardCoding(slHardCodingVO);
		} else if ((null != slHardCodingVO) && (0 == slHardCodingVO.getHardCodingId())) {
			insertSlHardCoding = this.projectService.insertSlHardCoding(slHardCodingVO);
		}*/
		
		int countSlHardCoding = projectService.countSlHardCoding(slHardCodingVO);
		if (0 < countSlHardCoding) {
			updateSlHardCoding = this.projectService.updateSlHardCoding(slHardCodingVO);
		} else {
			insertSlHardCoding = this.projectService.insertSlHardCoding(slHardCodingVO);
		}
		
		mv.addObject("insertSlHardCoding", Boolean.valueOf(insertSlHardCoding));
		mv.addObject("updateSlHardCoding", Boolean.valueOf(updateSlHardCoding));
		return mv;
	}
}
