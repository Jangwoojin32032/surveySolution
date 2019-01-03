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
import kr.co.netpoint.vo.project.SlExampleVO;
import kr.co.netpoint.vo.project.SlProjectVO;
import kr.co.netpoint.vo.project.SlQuestionVO;
import kr.co.netpoint.vo.project.SlQuestionViewPageVO;
import kr.co.netpoint.vo.project.SlRotationExampleVO;
import kr.co.netpoint.vo.project.SlRotationMainVO;
import kr.co.netpoint.vo.project.SlRotationPartVO;
import kr.co.netpoint.vo.project.SlRotationQuestionVO;

@Controller
public class RotationController {

	static final Logger logger = LoggerFactory.getLogger(RotationController.class);

	@Autowired
	private ProjectService projectService;
	@Autowired
	private CommonService commonService;
	@Autowired
	private ConfigProperty configProperty;

	@RequestMapping(value = "/rotation/rotation")
	public ModelAndView rotation(Authentication authentication, HttpServletRequest request
								, @RequestParam(value = "projectId", defaultValue = "0", required = false) int projectId) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.addObject("projectId", Integer.valueOf(projectId));
		mv.setViewName("/rotation/rotation");
		return mv;
	}

	@ResponseBody
	@RequestMapping(value = "/rotation/setRotation", method = RequestMethod.POST)
	public ModelAndView setRotation(@RequestBody SlRotationMainVO slRotationMainVO, HttpServletRequest request) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		int projectId = slRotationMainVO.getProjectId();

		int countSlRotationMain = this.projectService.countSlRotationMain(slRotationMainVO);

		List<SlRotationPartVO> listSlRotationPart = slRotationMainVO.getListSlRotationPart();
		List<SlRotationExampleVO> listSlRotationExample = slRotationMainVO.getListSlRotationExample();

		boolean insertSlRotationMain = true;
		boolean insertSlRotationPart = true;
		boolean insertSlRotationQuestion = true;
		boolean insertSlRotationExample = true;

		String rotMainType = slRotationMainVO.getRotMainType();
		if ("qRotPart".equals(rotMainType) || "qRot".equals(rotMainType)) {			// 문항 로테이션

			if (null != listSlRotationPart && 0 < listSlRotationPart.size()) {

				if ("qRotPart".equals(rotMainType)) {

					if (0 == countSlRotationMain) {

						int rotMainQuestionId = slRotationMainVO.getRotMainQuestionId();

						SlExampleVO slExampleVO = new SlExampleVO();
						slExampleVO.setProjectId(projectId);
						slExampleVO.setQuestionId(rotMainQuestionId);
						int countSlExample = projectService.countSlExample(slExampleVO);

						slRotationMainVO.setRotMMaxCount(countSlExample);
						insertSlRotationMain = this.projectService.insertSlRotationMain(slRotationMainVO);
						if (insertSlRotationMain) {

							SlRotationMainVO slRotationMainVO2 = new SlRotationMainVO();
							slRotationMainVO2.setRotMainType(rotMainType);
							slRotationMainVO2.setRotMainQuestionId(rotMainQuestionId);

							for (SlRotationPartVO srpv : listSlRotationPart) {
								srpv.setRotMainId(slRotationMainVO.getRotMainId());

								boolean insertSlRotationPart2 = this.projectService.updateSlRotationPart("update",srpv,slRotationMainVO2);
								if (!insertSlRotationPart2) {
									insertSlRotationPart = insertSlRotationPart2;
								}
							}
						}
					} else {
						insertSlRotationMain = false;
					}

				} else if ("qRot".equals(rotMainType)) {

					for (SlRotationPartVO srpv : listSlRotationPart) {
						srpv.setRotMainId(slRotationMainVO.getRotMainId());

						boolean insertSlRotationPart2 = this.projectService.insertSlRotationPart(srpv);
						if (!insertSlRotationPart2) {
							insertSlRotationPart = insertSlRotationPart2;
						}
						if (insertSlRotationPart2) {

							List<SlRotationQuestionVO> listSlRotationQuestion = srpv.getListSlRotationQuestion();
							if (null != listSlRotationQuestion && 0 < listSlRotationQuestion.size()) {

								int insertIndexSlRotationQuestion = 0;
								for (SlRotationQuestionVO srqv : listSlRotationQuestion) {

									int countSlRotationQuestion = this.projectService.countSlRotationQuestion(srqv);
									if (0 == countSlRotationQuestion) {

										srqv.setRotPartId(srpv.getRotPartId());
										boolean insertSlRotationQuestion2 = this.projectService.insertSlRotationQuestion(srqv, request);
										if (!insertSlRotationQuestion2) {
											insertSlRotationQuestion = insertSlRotationQuestion2;
										}
										insertIndexSlRotationQuestion++;
									}
								}
								if (0 == insertIndexSlRotationQuestion) {
									boolean deleteSlRotationPart = this.projectService.deleteSlRotationPart(srpv);
									insertSlRotationPart = false;
								}
							}
						}
					}
				}
			}

		} else if ("eRot".equals(rotMainType)) {

			if (null != listSlRotationExample && 0 < listSlRotationExample.size()) {

				if (0 == countSlRotationMain) {

					boolean insertSlRotationMain2 = this.projectService.insertSlRotationMain(slRotationMainVO);
					if (!insertSlRotationMain2) {
						insertSlRotationMain = insertSlRotationMain2;
					}
					if (insertSlRotationMain2) {
						for (SlRotationExampleVO srev : listSlRotationExample) {
							srev.setRotMainId(slRotationMainVO.getRotMainId());

							boolean insertSlRotationExample2 = this.projectService.insertSlRotationExample(srev);
							if (!insertSlRotationExample2) {
								insertSlRotationExample = insertSlRotationExample2;
							}
						}
					}
				} else {
					insertSlRotationMain = false;
				}
			}
		}

		mv.addObject("projectId", Integer.valueOf(projectId));
		mv.addObject("insertSlRotationMain", Boolean.valueOf(insertSlRotationMain));
		mv.addObject("insertSlRotationPart", Boolean.valueOf(insertSlRotationPart));
		mv.addObject("insertSlRotationQuestion", Boolean.valueOf(insertSlRotationQuestion));
		mv.addObject("insertSlRotationExample", Boolean.valueOf(insertSlRotationExample));

		return mv;
	}

	@ResponseBody
	@RequestMapping(value = "/rotation/getRotation", method = RequestMethod.POST)
	public ModelAndView getRotation(@RequestBody SlRotationMainVO slRotationMainVO) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		int projectId = slRotationMainVO.getProjectId();

		SlProjectVO selectSlProject = null;
		if (projectId > 0) {
			SlProjectVO slProjectVO = new SlProjectVO();
			slProjectVO.setProjectId(projectId);
			selectSlProject = this.projectService.selectSlProject(slProjectVO);
			mv.addObject("selectSlProject", selectSlProject);
		}

		List<SlQuestionVO> listSlQuestion = null;
		List<SlQuestionViewPageVO> listSlQuestionViewPage = null;

		if (null != selectSlProject) {
			SlQuestionVO slQuestionVO = new SlQuestionVO();
			slQuestionVO.setProjectId(projectId);
			listSlQuestion = this.projectService.listSlQuestion(slQuestionVO);

			SlQuestionViewPageVO slQuestionViewPageVO = new SlQuestionViewPageVO();
			slQuestionViewPageVO.setProjectId(projectId);
			listSlQuestionViewPage = this.projectService.listSlQuestionViewPage(slQuestionViewPageVO);
		}

		if (null != listSlQuestion) {
			for (int i = 0; i < listSlQuestion.size(); i++) {
				int questionId = listSlQuestion.get(i).getQuestionId();

				SlExampleVO slExampleVO = new SlExampleVO();
				slExampleVO.setProjectId(projectId);
				slExampleVO.setQuestionId(questionId);
				List<SlExampleVO> listSlExample = this.projectService.listSlExample(slExampleVO);

				if (null != listSlExample) {
					listSlQuestion.get(i).setListSlExample(listSlExample);
				}
			}
		}

		if (null != selectSlProject) {

			List<SlRotationMainVO> listSlRotationMain = this.projectService.listSlRotationMain(slRotationMainVO);
			mv.addObject("listSlRotationMain", listSlRotationMain);

			SlRotationPartVO slRotationPartVO = new SlRotationPartVO();
			slRotationPartVO.setProjectId(projectId);
			List<SlRotationPartVO> listSlRotationPart = this.projectService.listSlRotationPart(slRotationPartVO);
			mv.addObject("listSlRotationPart", listSlRotationPart);
		}

		mv.addObject("listSlQuestion", listSlQuestion);
		mv.addObject("listSlQuestionViewPage", listSlQuestionViewPage);
		return mv;
	}

	@ResponseBody
	@RequestMapping(value = "/rotation/deleteRotation", method = RequestMethod.POST)
	public ModelAndView deleteRotation(@RequestBody SlRotationMainVO slRotationMainVO) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		int projectId = slRotationMainVO.getProjectId();
		int rotMainId = slRotationMainVO.getRotMainId();
		String rotMainType = slRotationMainVO.getRotMainType();
		int rotMainQuestionId = slRotationMainVO.getRotMainQuestionId();
		logger.info(">>> /rotation/deleteRotation rotMainType:" + rotMainType);
		logger.info(">>> /rotation/deleteRotation rotMainQuestionId:" + rotMainQuestionId);

		boolean deleteSlRotationMain = true;
		boolean deleteSlRotationExample = true;
		boolean deleteSlRotationPart = true;
		boolean deleteSlRotationQuestion = true;
		if (0 < projectId && null != rotMainType && !"".equals(rotMainType)) {

			if (0 < rotMainId) {

				if ("eRot".equals(rotMainType)) {

					SlRotationExampleVO slRotationExampleVO = new SlRotationExampleVO();
					slRotationExampleVO.setProjectId(projectId);
					slRotationExampleVO.setRotMainId(rotMainId);
					deleteSlRotationExample = this.projectService.deleteSlRotationExample(slRotationExampleVO);
					if (deleteSlRotationExample) {
						deleteSlRotationMain = this.projectService.deleteSlRotationMain(slRotationMainVO);
					}

				} else if ("qRotPart".equals(rotMainType)) {

					SlRotationPartVO slRotationPartVO = new SlRotationPartVO();
					slRotationPartVO.setProjectId(projectId);
					slRotationPartVO.setRotMainId(rotMainId);
					List<SlRotationPartVO> listSlRotationPart = this.projectService.listSlRotationPart(slRotationPartVO);

					SlRotationMainVO slRotationMainVO2 = new SlRotationMainVO();
					slRotationMainVO2.setRotMainType(rotMainType);
					slRotationMainVO2.setRotMainQuestionId(rotMainQuestionId);

					for (SlRotationPartVO srpv : listSlRotationPart) {
						srpv.setRotMainId(0);
						boolean deleteSlRotationPart2 = this.projectService.updateSlRotationPart("delete",srpv,slRotationMainVO2);
						if (!deleteSlRotationPart2) {
							deleteSlRotationPart = deleteSlRotationPart2;
						}
					}
					if ((deleteSlRotationQuestion) && (deleteSlRotationPart)) {
						deleteSlRotationMain = this.projectService.deleteSlRotationMain(slRotationMainVO);
					}
				}
			}

			if ("qRot".equals(rotMainType)) {

				List<SlRotationPartVO> listSlRotationPart = slRotationMainVO.getListSlRotationPart();
				for (SlRotationPartVO srpv : listSlRotationPart) {
					srpv.setProjectId(projectId);
					boolean deleteSlRotationPart2 = this.projectService.deleteSlRotationPart(srpv);
					if (!deleteSlRotationPart2) {
						deleteSlRotationPart = deleteSlRotationPart2;
					}
				}
			}
		}

		mv.addObject("rotMainType", rotMainType);
		mv.addObject("deleteSlRotationMain", deleteSlRotationMain);
		mv.addObject("deleteSlRotationExample", deleteSlRotationExample);
		mv.addObject("deleteSlRotationPart", deleteSlRotationPart);
		mv.addObject("deleteSlRotationQuestion", deleteSlRotationQuestion);

		return mv;
	}
}
