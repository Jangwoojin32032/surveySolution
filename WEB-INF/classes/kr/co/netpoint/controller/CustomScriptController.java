package kr.co.netpoint.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

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

import kr.co.netpoint.property.ConfigProperty;
import kr.co.netpoint.service.CommonService;
import kr.co.netpoint.service.ProjectService;
import kr.co.netpoint.vo.project.SlCustomScriptVO;
import kr.co.netpoint.vo.project.SlExampleVO;
import kr.co.netpoint.vo.project.SlProjectVO;
import kr.co.netpoint.vo.project.SlQuestionVO;
import kr.co.netpoint.vo.project.SlQuestionViewPageVO;

@Controller
public class CustomScriptController {

	static final Logger logger = LoggerFactory.getLogger(ProjectController.class);

	@Autowired
	private ProjectService projectService;
	@Autowired
	private CommonService commonService;
	@Autowired
	private ConfigProperty configProperty;

	@RequestMapping(value = "/customScript/customScript")
	public ModelAndView customScript(Authentication authentication, HttpServletRequest request
								, @RequestParam(value = "projectId", defaultValue = "0", required = false) int projectId) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.addObject("projectId", Integer.valueOf(projectId));
		mv.setViewName("/customScript/customScript");
		return mv;
	}

	@RequestMapping(value = "/customScript/regCustomScript")
	public ModelAndView regCustomScript(Authentication authentication, HttpServletRequest request
								, @RequestParam(value = "projectId", defaultValue = "0", required = false) int projectId) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.addObject("projectId", Integer.valueOf(projectId));
		mv.setViewName("/customScript/regCustomScript");
		return mv;
	}

	@ResponseBody
	@RequestMapping(value = "/customScript/getCustomScript", method = RequestMethod.POST)
	public ModelAndView getRotation(@RequestBody SlCustomScriptVO slCustomScriptVO) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		int projectId = slCustomScriptVO.getProjectId();
		int hardCodingId = 0;

		SlProjectVO selectSlProject = null;
		if (projectId > 0) {
			// 프로젝트 정보 조회
			SlProjectVO slProjectVO = new SlProjectVO();
			slProjectVO.setProjectId(projectId);
			selectSlProject = this.projectService.selectSlProject(slProjectVO);
		}

		List<SlQuestionVO> listSlQuestion = null;
		List<SlQuestionViewPageVO> listSlQuestionViewPage = null;

		if (null != selectSlProject) {
			// 프로젝트 문항 조회
			SlQuestionVO slQuestionVO = new SlQuestionVO();
			slQuestionVO.setProjectId(projectId);
			listSlQuestion = this.projectService.listSlQuestion(slQuestionVO);
			hardCodingId = listSlQuestion.get(0).getHardCodingId();

			// 문항 진행 정보 조회
			SlQuestionViewPageVO slQuestionViewPageVO = new SlQuestionViewPageVO();
			slQuestionViewPageVO.setProjectId(projectId);
			listSlQuestionViewPage = this.projectService.listSlQuestionViewPage(slQuestionViewPageVO);
		}

		if (null != listSlQuestion) {
			// 문항 조회 된 수 만큼
			for (int i = 0; i < listSlQuestion.size(); i++) {
				// 보기 내용 조회 후 List에 담음
				int questionId = listSlQuestion.get(i).getQuestionId();

				SlExampleVO slExampleVO = new SlExampleVO();
				slExampleVO.setProjectId(projectId);
				slExampleVO.setQuestionId(questionId);
				List<SlExampleVO> listSlExample = this.projectService.listSlExample(slExampleVO);

				// SlQuestionVO 에 set
				if (null != listSlExample) {
					listSlQuestion.get(i).setListSlExample(listSlExample);
				}
			}
		}

		List<SlCustomScriptVO> listSlCustomScript = null;

		if (null != selectSlProject) {
			// 해당 프로젝트의 사용자 등록 script 조회
			SlCustomScriptVO slCustomScript = new SlCustomScriptVO();
			slCustomScript.setProjectId(projectId);
			listSlCustomScript = this.projectService.listSlCustomScript(slCustomScript);
		}
		mv.addObject("hardCodingId", hardCodingId);
		mv.addObject("selectSlProject", selectSlProject);
		mv.addObject("listSlQuestion", listSlQuestion);
		mv.addObject("listSlQuestionViewPage", listSlQuestionViewPage);
		mv.addObject("listSlCustomScript", listSlCustomScript);
		return mv;
	}
	@ResponseBody
	@RequestMapping(value = "/customScript/delCustomScript", method = RequestMethod.POST)
	public ModelAndView delCustomScript(@RequestBody SlCustomScriptVO slCustomScriptVO) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		int projectId = slCustomScriptVO.getProjectId();
		boolean delResult = false;

		if (projectId > 0) {
			// 스크립트 삭제 ( deleteYn > Y )
			delResult = this.projectService.deleteCustomScript(slCustomScriptVO);
			mv.addObject("delResult", delResult);
		}

		return mv;
	}
	@ResponseBody
	@RequestMapping(value = "/customScript/insertCustomScript", method = RequestMethod.POST)
	public ModelAndView insertCustomScript(@RequestBody SlCustomScriptVO slCustomScriptVO) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		int projectId = slCustomScriptVO.getProjectId();
		String customScriptContents = slCustomScriptVO.getCustomScriptContents();
		slCustomScriptVO.setCustomScriptContents(customScriptContents.replace("\r\n", "<br>"));
		boolean insResult = false;

		if (projectId > 0) {
			// 스크립트 삭제 ( deleteYn > Y )
			insResult = this.projectService.insertCustomScript(slCustomScriptVO);
			mv.addObject("insResult", insResult);
		}

		return mv;
	}
}
