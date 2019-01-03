package kr.co.netpoint.controller;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
import kr.co.netpoint.vo.PagingVO;
import kr.co.netpoint.vo.SearchVO;
import kr.co.netpoint.vo.project.PnProjectVO;
import kr.co.netpoint.vo.project.SlBoosterMainVO;
import kr.co.netpoint.vo.project.SlBoosterVO;
import kr.co.netpoint.vo.project.SlCodeVO;
import kr.co.netpoint.vo.project.SlExampleVO;
import kr.co.netpoint.vo.project.SlHardCodingVO;
import kr.co.netpoint.vo.project.SlProjectVO;
import kr.co.netpoint.vo.project.SlQuaterCountVO;
import kr.co.netpoint.vo.project.SlQuaterVO;
import kr.co.netpoint.vo.project.SlQuestionFunctionVO;
import kr.co.netpoint.vo.project.SlQuestionLogicVO;
import kr.co.netpoint.vo.project.SlQuestionVO;
import kr.co.netpoint.vo.project.SlQuestionViewPageVO;
import kr.co.netpoint.vo.project.SlRedirectUrlVO;
import kr.co.netpoint.vo.project.SlSurveyVO;
import kr.co.netpoint.vo.project.TbAnswer2VO;
import kr.co.netpoint.vo.project.TbProjectVO;

@Controller
public class ProjectController {

	static final Logger logger = LoggerFactory.getLogger(ProjectController.class);

	@Autowired
	private ProjectService projectService;
	@Autowired
	private CommonService commonService;
	@Autowired
	private ConfigProperty configProperty;

	@RequestMapping(value = "/project/projectReg")
	public ModelAndView projectReg( Authentication authentication, HttpServletRequest request
								, @RequestParam(value = "projectId", defaultValue = "0", required = false) int projectId
								, @RequestParam(value = "projId", defaultValue = "0", required = false) int projId
								, @RequestParam(value = "projectNum", defaultValue = "0", required = false) int projectNum) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.addObject("projectId", Integer.valueOf(projectId));
		mv.addObject("projId", Integer.valueOf(projId));
		mv.addObject("projectNum", Integer.valueOf(projectNum));
		mv.setViewName("/project/projectReg");
		return mv;
	}

	@RequestMapping(value = "/project/surveyOpenReg")
	public ModelAndView surveyOpenReg(Authentication authentication, HttpServletRequest request) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("/project/surveyOpenReg");
		return mv;
	}

	@ResponseBody
	@RequestMapping(value = "/project/setProjectReg", method = RequestMethod.POST)
	public ModelAndView setProjectReg(@RequestBody SlProjectVO slProjectVO) throws Exception {
		int projectId = slProjectVO.getProjectId();
		int projId = slProjectVO.getProjId();

		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		if (projectId > 0) {
			slProjectVO.setProjectId(projectId);
			SlProjectVO selectSlProject = this.projectService.selectSlProject(slProjectVO);
			mv.addObject("selectSlProject", selectSlProject);

			if (null != selectSlProject) {
				SlRedirectUrlVO slRedirectUrlVO = new SlRedirectUrlVO();
				slRedirectUrlVO.setProjectId(projectId);
				List<SlRedirectUrlVO> listSlRedirectUrl = this.projectService.listSlRedirectUrl(slRedirectUrlVO);
				mv.addObject("listSlRedirectUrl", listSlRedirectUrl);
			}
		}
		if (projId > 0) {
			PnProjectVO pnProjectVO = new PnProjectVO();
			pnProjectVO.setProjId(projId);
			PnProjectVO selectPnProject = this.projectService.selectPnProject(pnProjectVO);
			mv.addObject("selectPnProject", selectPnProject);
		}
		SlCodeVO codeVO = new SlCodeVO();
		codeVO.setCodeType("jobCode");
		List<SlCodeVO> listJobCode = this.commonService.listCode(codeVO);

		List<Map<String, Object>> listClientVendorGroup = this.projectService.listClientVendorGroup(null);

		codeVO = new SlCodeVO();
		codeVO.setCodeType("pmCode");
		List<SlCodeVO> listPmCode = this.commonService.listCode(codeVO);
		logger.info(">>> setProjectReg listPmCode:" + listPmCode.size());

		mv.addObject("listJobCode", listJobCode);
		mv.addObject("customerCode", listClientVendorGroup);
		mv.addObject("listPmCode", listPmCode);

		return mv;
	}

	@RequestMapping(value = "/project/projectList")
	public ModelAndView projectList(Authentication authentication, HttpServletRequest request) throws Exception {
		logger.info(">>> /project/projectList");
		ModelAndView mv = new ModelAndView();
		mv.setViewName("/project/projectList");
		return mv;
	}

	@ResponseBody
	@RequestMapping(value = "/project/setProjectList", method = RequestMethod.POST)
	public ModelAndView setProjectList(@RequestBody PagingVO pagingVO) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		boolean setCheckSearch = true;
		String setSearchValue = "";

		if (null != pagingVO.getSearchVO()) {

			SearchVO searchVO = pagingVO.getSearchVO();
			String searchType = searchVO.getSearchType();
			String searchValue = searchVO.getSearchValue();
			//logger.info(">>> /project/setProjectList searchValue.length() :" + searchValue.length());

			if(searchValue.length() > 0) {
				if ("pmCode".equals(searchType)) {
					SlCodeVO codeVO = new SlCodeVO();
					codeVO.setCodeType("pmCode");
					codeVO.setSearchVO(searchVO);

					SlCodeVO selectCode = this.commonService.selectCode(codeVO);

					if (null != selectCode) {
						setSearchValue = selectCode.getCodeId();
						searchVO.setSearchValue(setSearchValue);
						pagingVO.setSearchVO(searchVO);
					} else {
						setCheckSearch = false;
					}
				} else if ("customerCode".equals(searchType)) {

					String vendorName = searchValue;

					if(null != searchValue) {
						Map selectClientVendorGroup = this.projectService.selectClientVendorGroup(vendorName);
						if (null != selectClientVendorGroup) {
							setSearchValue = String.valueOf(selectClientVendorGroup.get("VENDORID"));
							searchVO.setSearchValue(setSearchValue);
							pagingVO.setSearchVO(searchVO);
						} else {
							setCheckSearch = false;
						}
					}
				/*
				} else if ("projectNameInner".equals(searchType)) {

					String projectNameInner = searchValue;

					if(null != searchValue) {
						setSearchValue = projectNameInner;
						searchVO.setSearchValue(setSearchValue);
						pagingVO.setSearchVO(searchVO);
						logger.info(">>> /project/setProjectList pagingVO.getSearchVO().getSearchValue() :" + pagingVO.getSearchVO().getSearchValue());
					} else {
						setCheckSearch = false;
					}
				*/
				}

			}
		}

		int totalSlProject = 0;
		List<SlProjectVO> listSlProject = null;
		List<SlCodeVO> listPmCode = null;
		List<Map<String, Object>> listClientVendorGroup = null;

		if (setCheckSearch) {

			SlProjectVO slProjectVO = new SlProjectVO();
			slProjectVO.setSearchVO(pagingVO.getSearchVO());
			logger.info(">>> /project/setProjectList slProjectVO.getSearchVO().getSearchValue() :" + slProjectVO.getSearchVO().getSearchValue());
			totalSlProject = this.projectService.totalSlProject(slProjectVO);

			pagingVO.setTotCountPage(totalSlProject);
			pagingVO.setPagingVO();
			slProjectVO.setsRNum(pagingVO.getsRNum());
			slProjectVO.seteRNum(pagingVO.geteRNum());
			listSlProject = this.projectService.listSlProject(slProjectVO);



			int setIndex;
			if ((null != listSlProject) && (0 < listSlProject.size())) {
				setIndex = 0;

				for (SlProjectVO spv : listSlProject) {
					this.configProperty.setProjectId(spv.getProjectId());
					String serveyGoPath = this.configProperty.getServeyGoPath();
					listSlProject.get(setIndex).setServeyGoPath(serveyGoPath);
					setIndex++;
				}
			}
			SlCodeVO codeVO = new SlCodeVO();
			codeVO.setCodeType("pmCode");
			listPmCode = this.commonService.listCode(codeVO);

			listClientVendorGroup = this.projectService.listClientVendorGroup(null);
		}

		mv.addObject("totalSlProject", Integer.valueOf(totalSlProject));
		mv.addObject("listSlProject", listSlProject);
		mv.addObject("listPmCode", listPmCode);
		mv.addObject("listClientVendorGroup", listClientVendorGroup);
		mv.addObject("setCheckSearch", setCheckSearch);	// 검색 결과
		mv.addObject("paging", pagingVO);
		return mv;
	}

	@ResponseBody
	@RequestMapping(value = "/project/insertProjectReg", method = RequestMethod.POST)
	public ModelAndView insertProjectReg(@RequestBody SlProjectVO slProjectVO) throws Exception {
		logger.info(">>> insertProjectReg getProjectId:" + slProjectVO.getProjectId());
		int projectId = slProjectVO.getProjectId();
		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		boolean insertProject = false;
		boolean insertRedirectUrl = false;
		boolean insertSlQuaterCount = false;
		int selectTbProject = 1;
		boolean insertTbProject = false;
		boolean updateTbProject = false;
		String selectCPNOTbProject = "";
		boolean updateCPNOSlProject = false;
		boolean updateSlProject = false;
		boolean updateRedirectUrl = false;
		boolean deleteSlRedirectUrl = false;

		if ((null != slProjectVO) && (0 < slProjectVO.getProjectId())) {
			updateSlProject = this.projectService.updateSlProject(slProjectVO);

			if (updateSlProject) {
				SlRedirectUrlVO delslRedirectUrlVO = new SlRedirectUrlVO();
				delslRedirectUrlVO.setProjectId(slProjectVO.getProjectId());
				deleteSlRedirectUrl = this.projectService.deleteSlRedirectUrl(delslRedirectUrlVO);

				for (SlRedirectUrlVO slRedirectUrlVO : slProjectVO.getListSlRedirectUrl()) {
					slRedirectUrlVO.setProjectId(slProjectVO.getProjectId());
					updateRedirectUrl = this.projectService.insertRedirectUrl(slRedirectUrlVO);
				}
			}

		} else if ((null != slProjectVO) && (0 == slProjectVO.getProjectId())) {
			insertProject = this.projectService.insertProject(slProjectVO);

			if (insertProject) {

				for (SlRedirectUrlVO slRedirectUrlVO : slProjectVO.getListSlRedirectUrl()) {
					slRedirectUrlVO.setProjectId(slProjectVO.getProjectId());
					insertRedirectUrl = this.projectService.insertRedirectUrl(slRedirectUrlVO);
				}
			}
		}

		String cPCode = slProjectVO.getRegDate() + "01" + "-0";

		// cProjectId select 해보고 삽입
		TbProjectVO tbProjectVO = new TbProjectVO();
		tbProjectVO.setCProjectId(slProjectVO.getProjectId());
		tbProjectVO.setCPName(slProjectVO.getProjectNameOuter());
		tbProjectVO.setCPEx(slProjectVO.getProjectNameInner());
		selectTbProject = this.projectService.selectTbProject(tbProjectVO);

		if("1".equals(slProjectVO.getUseResearList())) {
			if(0 == selectTbProject) {
				// tb_project 해당 프로젝트 조회(없을 경우만 삽입)
				for(int i=1; i<10; i++) {
					cPCode = slProjectVO.getRegDate() + "0" + i + "-0";
					tbProjectVO.setCPCode(cPCode);
					//logger.info(">>> insertProjectReg cPCode:" + cPCode);
					selectTbProject = this.projectService.selectTbProject(tbProjectVO);
					//logger.info(">>> insertProjectReg selectTbProject:" + selectTbProject);
					if(selectTbProject == 0) {
						//slProjectVO.setProjectNum(cPCode);
						break;
					}
				}

				insertTbProject = this.projectService.insertTbProject(tbProjectVO);
				//logger.info(">>> insertProjectReg getProjectNum:" + slProjectVO.getProjectNum());
				//logger.info(">>> insertProjectReg getProjectNameOuter:" + slProjectVO.getProjectNameOuter());
				logger.info(">>> insertProjectReg insertTbProject:" + insertTbProject);

				// tb_project 삽입 후 자동 생성된 cpno >> sl_project에 넣기
				if(insertTbProject) {
					selectCPNOTbProject = this.projectService.selectCPNOTbProject(tbProjectVO);
					logger.info(">>> insertProjectReg selectCPNOTbProject:" + selectCPNOTbProject);
					if(!"".equals(selectCPNOTbProject) && null != selectCPNOTbProject) {
						slProjectVO.setCpno(selectCPNOTbProject);
						updateCPNOSlProject = this.projectService.updateSlProject(slProjectVO);
					}
				}
			} else {
				// tb_project 해당 프로젝트 있는 경우
				updateTbProject = this.projectService.updateTbProject(tbProjectVO);
				logger.info(">>> insertProjectReg updateTbProject:" + updateTbProject);
			}
		}


		mv.addObject("insertProject", Boolean.valueOf(insertProject));
		mv.addObject("insertRedirectUrl", Boolean.valueOf(insertRedirectUrl));
		mv.addObject("insertTbProject", Boolean.valueOf(insertTbProject));
		mv.addObject("updateTbProject", Boolean.valueOf(updateTbProject));
		mv.addObject("selectCPNOTbProject", selectCPNOTbProject);
		mv.addObject("updateCPNOSlProject", Boolean.valueOf(updateCPNOSlProject));
		mv.addObject("updateSlProject", Boolean.valueOf(updateSlProject));
		mv.addObject("updateRedirectUrl", Boolean.valueOf(updateRedirectUrl));
		return mv;
	}

	// 리스트 조사인경우 완료자 tb_answer2 테이블에 데이터 삽입
	@RequestMapping(value = "/project/insertTbAnswer2")
	public ModelAndView insertTbAnswer2(HttpServletRequest request,
			@RequestParam(value = "cpno", defaultValue = "0", required = false) String cpno,
			@RequestParam(value = "uCode", defaultValue = "0", required = false) String uCode) throws Exception {

		logger.info(">>> insertTbAnswer2 cpno:" + cpno);
		logger.info(">>> insertTbAnswer2 uCode:" + uCode);

		int selectTbAnswer2 = 1;
		boolean insertTbAnswer2 = false;
		TbAnswer2VO tbAnswer2VO = new TbAnswer2VO();
		String regIp = request.getRemoteAddr();

		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		// 데이터 세팅
		tbAnswer2VO.setCpno(cpno);
		tbAnswer2VO.setCqno(9998);
		tbAnswer2VO.setCsubqno("Q9998");
		tbAnswer2VO.setCuserid(uCode);
		tbAnswer2VO.setCuserIP(regIp);

		// 데이터 확인
		selectTbAnswer2 = this.projectService.selectTbAnswer2(tbAnswer2VO);
		logger.info(">>> insertTbAnswer2 selectTbAnswer2:" + selectTbAnswer2);

		// 데이터 삽입
		if(selectTbAnswer2 == 0) {
			insertTbAnswer2 = this.projectService.insertTbAnswer2(tbAnswer2VO);
			logger.info(">>> insertTbAnswer2 insertTbAnswer2:" + insertTbAnswer2);
		}

		mv.addObject("selectTbAnswer2", selectTbAnswer2);
		mv.addObject("insertTbAnswer2", insertTbAnswer2);

		return mv;
	}

	@ResponseBody
	@RequestMapping(value = "/project/updateProjectReg", method = RequestMethod.POST)
	public ModelAndView updateProjectReg(@RequestBody SlProjectVO slProjectVO) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");
		boolean updateSlProject = this.projectService.updateSlProject(slProjectVO);
		mv.addObject("updateSlProject", Boolean.valueOf(updateSlProject));

		// 리스트 조사인경우 tb_project 날짜 수정
		if("1".equals(slProjectVO.getUseResearList())) {
			// (tb_project) 설문 진행(2) > CStartDate // 완료(3) > CEndDate 수정
			boolean updateTbProject = false;

			logger.info(">>> updateProjectReg getProjectState:" + slProjectVO.getProjectState());
			logger.info(">>> updateProjectReg getProjectId:" + slProjectVO.getProjectId());

			if("2".equals(slProjectVO.getProjectState())) {
				updateTbProject = this.projectService.updateTbProjectCStartDate(slProjectVO);
			} else if("3".equals(slProjectVO.getProjectState())) {
				updateTbProject = this.projectService.updateTbProjectCEndDate(slProjectVO);
			}
			mv.addObject("updateTbProject", Boolean.valueOf(updateTbProject));
		}

		return mv;
	}

	@RequestMapping(value = "/project/projectQuater")
	public ModelAndView projectQuater(Authentication authentication, HttpServletRequest request
									, @RequestParam(value = "projectId", defaultValue = "0", required = false) int projectId) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.addObject("projectId", Integer.valueOf(projectId));
		mv.setViewName("/project/projectQuater");
		return mv;
	}

	@ResponseBody
	@RequestMapping(value = "/project/getProjectQuater", method = RequestMethod.POST)
	public ModelAndView getProjectQuater(@RequestBody SlQuaterVO slQuaterVO) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		int projectId = slQuaterVO.getProjectId();

		SlProjectVO selectSlProject = null;
		String projectState = "0";
		if (projectId > 0) {

			SlProjectVO slProjectVO = new SlProjectVO();
			slProjectVO.setProjectId(projectId);
			selectSlProject = this.projectService.selectSlProject(slProjectVO);
			mv.addObject("selectSlProject", selectSlProject);
			projectState = selectSlProject.getProjectState().trim();
		}
		if (null != selectSlProject) {

			SlQuestionVO slQuestionVO = new SlQuestionVO();
			slQuestionVO.setProjectId(projectId);
			List<SlQuestionVO> listSlQuestion = this.projectService.listSlQuestion(slQuestionVO);
			mv.addObject("listSlQuestion", listSlQuestion);

			if (null != listSlQuestion && 0 < listSlQuestion.size()) {

				for (int i = 0; i < listSlQuestion.size(); i++) {
					int questionIds = listSlQuestion.get(i).getQuestionId();

					SlExampleVO slExampleVO = new SlExampleVO();
					slExampleVO.setProjectId(projectId);
					slExampleVO.setQuestionId(questionIds);
					List<SlExampleVO> listSlExample = this.projectService.listSlExample(slExampleVO);

					if (null != listSlExample && 0 < listSlExample.size()) {
						listSlQuestion.get(i).setListSlExample(listSlExample);
					}
					SlQuestionFunctionVO slQuestionFunctionVO = new SlQuestionFunctionVO();
					slQuestionFunctionVO.setProjectId(projectId);
					slQuestionFunctionVO.setQuestionId(questionIds);

					List<SlQuestionFunctionVO> listSlQuestionFunction = this.projectService.listSlQuestionFunction(slQuestionFunctionVO);
					if (null != listSlQuestionFunction && 0 < listSlQuestionFunction.size()) {
						listSlQuestion.get(i).setListSlQuestionFunction(listSlQuestionFunction);
					}
				}
			}
		}
		if (projectId > 0) {

			SlQuaterVO selectSlQuater = this.projectService.selectSlQuater(slQuaterVO);

			if (null != selectSlQuater) {
				SlQuaterCountVO slQuaterCountVO = new SlQuaterCountVO();
				slQuaterCountVO.setProjectId(projectId);
				List<SlQuaterCountVO> listSlQuaterCount = this.projectService.listSlQuaterCount(slQuaterCountVO);
				selectSlQuater.setListSlQuaterCount(listSlQuaterCount);
			}
			mv.addObject("selectSlQuater", selectSlQuater);

			SlBoosterVO slBoosterVO = new SlBoosterVO();
			slBoosterVO.setProjectId(projectId);
			List<SlBoosterVO> listSlBooster = this.projectService.listSlBooster(slBoosterVO);
			mv.addObject("listSlBooster", listSlBooster);
		}
		mv.addObject("projectState", projectState);
		mv.addObject("configProperty", this.configProperty);
		return mv;
	}

	@ResponseBody
	@RequestMapping(value = "/project/setProjectQuater", method = RequestMethod.POST)
	public ModelAndView setProjectQuater(@RequestBody SlQuaterVO slQuaterVO) throws Exception {
		int projectId = slQuaterVO.getProjectId();
		String quaterRowInfo = slQuaterVO.getQuaterRowInfo();
		String quaterRowQueName = slQuaterVO.getQuaterRowQueName();
		String quaterRowQueId = slQuaterVO.getQuaterRowQueId();
		String quaterColInfo = slQuaterVO.getQuaterColInfo();
		String quaterColQueName = slQuaterVO.getQuaterColQueName();
		String quaterColQueId = slQuaterVO.getQuaterColQueId();
		String quaterType = slQuaterVO.getQuaterType();

		logger.info(">>> /project/setProjectQuater projectId: " + projectId);
		logger.info(">>> /project/setProjectQuater quaterRowInfo: " + quaterRowInfo);
		logger.info(">>> /project/setProjectQuater quaterRowQueName: " + quaterRowQueName);
		logger.info(">>> /project/setProjectQuater quaterRowQueId: " + quaterRowQueId);
		logger.info(">>> /project/setProjectQuater quaterColInfo: " + quaterColInfo);
		logger.info(">>> /project/setProjectQuater quaterColQueName: " + quaterColQueName);
		logger.info(">>> /project/setProjectQuater quaterColQueId: " + quaterColQueId);
		logger.info(">>> /project/setProjectQuater quaterType: " + quaterType);
		/*
		String quaterFinalQueNamne = "";

		if(Integer.parseInt(quaterRowQueId) < Integer.parseInt(quaterColQueId)) {
			quaterFinalQueNamne = quaterColQueName;
		} else {
			quaterFinalQueNamne = quaterRowQueName;
		}
		*/
		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		boolean insertSlQuater = true;
		boolean insertSlQuaterCount = true;
		if (0 < projectId) {
			int countSlQuater = this.projectService.countSlQuater(slQuaterVO);

			boolean deleteSlQuater = true;
			boolean deleteSlQuaterCount = true;
			if (0 < countSlQuater) {
				deleteSlQuater = this.projectService.deleteSlQuater(slQuaterVO);
				SlQuaterCountVO slQuaterCountVO = new SlQuaterCountVO();
				slQuaterCountVO.setProjectId(projectId);
				deleteSlQuaterCount = this.projectService.deleteSlQuaterCount(slQuaterCountVO);
			}
			if (deleteSlQuater && deleteSlQuaterCount && !this.projectService.insertSlQuater(slQuaterVO)) {
				insertSlQuater = false;
			}
		}
		if (insertSlQuater) {
			for (SlQuaterCountVO scv : slQuaterVO.getListSlQuaterCount()) {
				if (!this.projectService.insertSlQuaterCount(scv)) {
					insertSlQuaterCount = false;
				}
			}
		}
		mv.addObject("insertSlQuater", Boolean.valueOf(insertSlQuater));
		mv.addObject("insertSlQuaterCount", Boolean.valueOf(insertSlQuaterCount));
		return mv;
	}

	@ResponseBody
	@RequestMapping(value = "/project/delProjectQuater", method = RequestMethod.POST)
	public ModelAndView delProjectQuater(@RequestBody SlQuaterVO slQuaterVO) throws Exception {
		logger.info(">>> /project/delProjectQuater: " + slQuaterVO.getProjectId());
		int projectId = slQuaterVO.getProjectId();

		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		boolean deleteSlQuater = false;
		boolean deleteSlQuaterCount = false;
		if (0 < projectId) {
			int countSlQuater = this.projectService.countSlQuater(slQuaterVO);

			if (0 < countSlQuater) {
				deleteSlQuater = this.projectService.deleteSlQuater(slQuaterVO);
				SlQuaterCountVO slQuaterCountVO = new SlQuaterCountVO();
				slQuaterCountVO.setProjectId(projectId);
				deleteSlQuaterCount = this.projectService.deleteSlQuaterCount(slQuaterCountVO);
			}
		}

		mv.addObject("deleteSlQuater", Boolean.valueOf(deleteSlQuater));
		mv.addObject("deleteSlQuaterCount", Boolean.valueOf(deleteSlQuaterCount));
		return mv;
	}

	@ResponseBody
	@RequestMapping(value = "/project/setSlQuaterCount", method = RequestMethod.POST)
	public ModelAndView setSlQuaterCount(@RequestBody SlQuaterCountVO slQuaterCountVO) throws Exception {
		logger.info(">>> /project/setSlQuaterCount getProjectId: " + slQuaterCountVO.getProjectId());
		logger.info(">>> /project/setSlQuaterCount getQuaterContent: " + slQuaterCountVO.getQuaterContent());
		int projectId = slQuaterCountVO.getProjectId();

		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		boolean updateSlQuaterCount = false;

		if (0 < projectId) {
			updateSlQuaterCount = this.projectService.updateSlQuaterActiveCount(slQuaterCountVO);
		}

		mv.addObject("updateSlQuaterCount", Boolean.valueOf(updateSlQuaterCount));
		return mv;
	}

	@ResponseBody
	@RequestMapping(value = { "/project/setProjectBooster" }, method = {
			org.springframework.web.bind.annotation.RequestMethod.POST })
	public ModelAndView setProjectBooster(@RequestBody SlBoosterMainVO slBoosterMainVO) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		int projectId = slBoosterMainVO.getProjectId();
		String checkSave = slBoosterMainVO.getCheckSave();

		if (0 < projectId) {
			boolean insertSlBooster = true;
			List<SlBoosterVO> listSlBooster = slBoosterMainVO.getListSlBooster();

			if (null != listSlBooster && 0 < listSlBooster.size()) {
				boolean deleteSlBooster;

				if ("save".equals(checkSave)) {
					SlBoosterVO sbv = new SlBoosterVO();
					sbv.setProjectId(projectId);
					deleteSlBooster = this.projectService.deleteSlBooster(sbv);
					for (SlBoosterVO slBoosterVO : listSlBooster) {
						if (deleteSlBooster && !this.projectService.insertSlBooster(slBoosterVO)) {
							insertSlBooster = false;
						}
					}
				}
				if (insertSlBooster) {

					for (SlBoosterVO slBoosterVO : listSlBooster) {

						int questionId = slBoosterVO.getQuestionId();
						String boosterInfo = slBoosterVO.getBoosterInfo();
						String boosterPosition = slBoosterVO.getBoosterPosition();

						SlHardCodingVO slHardCodingVO = new SlHardCodingVO();
						slHardCodingVO.setProjectId(projectId);
						SlHardCodingVO selectSlHardCoding = this.projectService.selectSlHardCoding(slHardCodingVO);

						if (null != selectSlHardCoding) {

							int hardCodingId = selectSlHardCoding.getHardCodingId();
							String hardCodingTableName = selectSlHardCoding.getHardCodingTableName();

							SlQuestionVO slQuestionVO = new SlQuestionVO();
							slQuestionVO.setProjectId(projectId);
							slQuestionVO.setQuestionId(questionId);
							SlQuestionVO selectSlQuestion = this.projectService.selectSlQuestion(slQuestionVO);
							String questionType = selectSlQuestion.getQuestionType();
							String questionName = selectSlQuestion.getQuestionName();
							slBoosterVO.setBoosterType(questionType);

							SlExampleVO slExampleVO = new SlExampleVO();
							slExampleVO.setProjectId(projectId);
							slExampleVO.setQuestionId(questionId);
							List<SlExampleVO> listSlExample = this.projectService.listSlExample(slExampleVO);

							ArrayList<String> listColumnName = new ArrayList();
							if (null != listSlExample && 0 < listSlExample.size()) {

								for (SlExampleVO sev : listSlExample) {
									String columnName = sev.getColumnName();

									if (null != listColumnName && 0 < listColumnName.size()) {
										boolean checkNeq = true;

										for (int i = 0; i < listColumnName.size(); i++) {
											String cn = listColumnName.get(i).trim();

											if (cn.equals(columnName)) {
												checkNeq = false;
											}
										}
										if (checkNeq) {
											listColumnName.add(columnName);
										}
									} else {
										listColumnName.add(columnName);
									}
								}

							} else {
								listColumnName.add(questionName);
							}
							slBoosterVO.setCheckColumnName(listColumnName);

							if (("sin".equals(questionType)) || ("sca".equals(questionType))) {

								int setSelectIndex = 1;
								String selectColumn = "";
								String selectFrom = "";
								for (SlExampleVO sev : listSlExample) {
									selectColumn = selectColumn + ", max(e" + setSelectIndex + ") as e_"+ setSelectIndex;
									selectFrom = selectFrom + ", if(" + questionName + "='" + setSelectIndex+ "',count(" + questionName + "),0) as e" + setSelectIndex;
									setSelectIndex++;
								}
								String selectQuery = "select questionName" + selectColumn
													+ " from ("
													+ "		select "
													+ "			'" + questionName + "' as questionName "
													+ 			selectFrom
													+ "		from " + hardCodingTableName
													+ "		group by " + questionName
													+ ") sq1";

								HashMap<String, Object> map = new HashMap();
								map.put("sql", selectQuery);
								HashMap selectTable = this.projectService.selectTable(map);

								List<HashMap> selectBooster = new ArrayList();
								selectBooster.add(selectTable);
								slBoosterVO.setListBoosterData(selectBooster);

							} else if ("mul".equals(questionType)) {

								int setSelectIndex = 1;
								String selectColumn = "";
								String selectFrom = "";
								String selectFrom2 = "";
								for (SlExampleVO sev : listSlExample) {

									selectColumn = selectColumn + " WHEN " + setSelectIndex + " THEN e" + setSelectIndex+ " ";

									String setComma = "";
									if (1 < setSelectIndex) {
										setComma = ",";
									}
									selectFrom = selectFrom + setComma + " REPLACE(SUBSTRING(SUBSTRING_INDEX("
															+ questionName + ", ',', " + setSelectIndex + "),"
															+ "LENGTH(SUBSTRING_INDEX(Q3, ',', " + setSelectIndex + " -1)) + 1),"
															+ "',', '') as e" + setSelectIndex + " ";
									if (1 == setSelectIndex) {
										selectFrom2 = selectFrom2 + " SELECT " + setSelectIndex + " m ";
									} else {
										selectFrom2 = selectFrom2 + "UNION ALL SELECT  " + setSelectIndex + " ";
									}
									setSelectIndex++;
								}
								String selectQuery = "select * "
													+"from (	"
													+"	select v as cVal, count(v) as cCount "
													+"	from ( "
													+"		select CASE b.m "
													+ 			selectColumn
													+ "			END v "
													+ "		from ( "
													+ "			select " + selectFrom
													+ "			from " + hardCodingTableName + " "
													+ "		) a "
													+ "		, ( "
													+ 			selectFrom2
													+ "		) b "
													+ "	)c "
													+ "	group by c.v "
													+ ") d "
													+ "where cVal is not null and cVal !='' ";

								logger.info(">>> listColumnName mul selectQuery:" + selectQuery);
								HashMap<String, Object> map = new HashMap();
								map.put("sql", selectQuery);
								List<HashMap> selectTable = this.projectService.listTable(map);
								slBoosterVO.setListBoosterData(selectTable);

							} else if ("att".equals(questionType) || "ord".equals(questionType)) {

								String selectColumn = "";
								String selectFrom = "";
								String selectGroup = "";

								int setSelectIndex1 = 1;
								for (String cn : listColumnName) {

									if ((null != cn) && (!"".equals(cn)) && (!"0".equals(cn))) {
										String selectIndexStr1 = String.valueOf(setSelectIndex1);

										boolean checkExampleText = true;
										int setSelectIndex2 = 1;
										for (SlExampleVO sev : listSlExample) {
											String exampleText = sev.getExampleText();
											String selectIndexStr2 = String.valueOf(setSelectIndex2);

											if ("$$@@$$".equals(exampleText)) {
												checkExampleText = false;
											}
											if (checkExampleText) {
												selectColumn = selectColumn + ", sum(e" + selectIndexStr1
																			+ selectIndexStr2 + ") as e_" + selectIndexStr1 + "_"
																			+ selectIndexStr2 + " ";
												selectFrom = selectFrom + ", if(" + questionName + "_" + selectIndexStr1
																		+ "='" + selectIndexStr2 + "',count(" + questionName + "_"
																		+ selectIndexStr1 + "),0) as e" + selectIndexStr1
																		+ selectIndexStr2 + " ";
											}
											setSelectIndex2++;
										}
										String setComma = "";
										if (1 < setSelectIndex1) {
											setComma = ",";
										}
										selectGroup = selectGroup + " " + setComma + cn;
										setSelectIndex1++;
									}
								}
								String selectQuery = "select questionName "
													+ 	selectColumn + " "
													+ "from ("
													+ "		select "
													+ "			'" + questionName + "' as questionName "
													+ 			selectFrom
													+ "		from " + hardCodingTableName + " "
													+ "		group by " + selectGroup + " "
													+ ") sq1 ";
								HashMap<String, Object> map = new HashMap();
								map.put("sql", selectQuery);
								List<HashMap> selectTable = this.projectService.listTable(map);
								slBoosterVO.setListBoosterData(selectTable);
							}
						}
					}
				}
			}
			mv.addObject("listSlBooster", listSlBooster);
		}
		return mv;
	}
	@ResponseBody
	@RequestMapping(value = "/project/delProjectBooster", method = RequestMethod.POST)
	public ModelAndView delProjectBooster(@RequestBody SlBoosterVO slBoosterVO) throws Exception {

		logger.info(">>> /project/delProjectBooster: " + slBoosterVO.getProjectId());
		int projectId = slBoosterVO.getProjectId();

		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		boolean deleteBooster = false;

		if (0 < projectId) {
			deleteBooster = this.projectService.deleteSlBooster(slBoosterVO);
		}

		mv.addObject("deleteBooster", Boolean.valueOf(deleteBooster));
		return mv;
	}

	@ResponseBody
	@RequestMapping(value = "/project/setProjectDataDel", method = RequestMethod.POST)
	public ModelAndView setProjectDataDel(@RequestBody SlSurveyVO slSurveyVO) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		String uCode = slSurveyVO.getuCode();
		int projectId = slSurveyVO.getProjectId();
		String projectState = slSurveyVO.getProjectState();

		SlProjectVO slProjectVO = new SlProjectVO();
		slProjectVO.setProjectId(projectId);
		SlProjectVO selectSlProject = this.projectService.selectSlProject(slProjectVO);

		boolean deleteSlSurvey = false;
		if (null != selectSlProject) {
			String selectProjectState = selectSlProject.getProjectState();
			mv.addObject("selectProjectState", selectProjectState);

			boolean checkDel = false;
			if (!"".equals(selectProjectState)) {
				if (projectState.equals(selectProjectState)) {
					checkDel = true;
				} else {
					checkDel = false;
				}
			} else {
				checkDel = true;
			}
			if (checkDel) {
				SlHardCodingVO slHardCodingVO = new SlHardCodingVO();
				slHardCodingVO.setProjectId(projectId);
				SlHardCodingVO selectSlHardCoding = this.projectService.selectSlHardCoding(slHardCodingVO);

				if (null != selectSlHardCoding) {
					int hardCodingId = selectSlHardCoding.getHardCodingId();
					String hardCodingTableName = selectSlHardCoding.getHardCodingTableName();
					slSurveyVO.setTableName(hardCodingTableName);
					slSurveyVO.setProjectId(projectId);
					slSurveyVO.setHardCodingId(hardCodingId);

					if (null != hardCodingTableName && !"".equals(hardCodingTableName)
						&& 0 < projectId && null != uCode) {
						deleteSlSurvey = this.projectService.deleteSlSurvey(slSurveyVO);
					}
				}
			}
		}
		mv.addObject("deleteSlSurvey", deleteSlSurvey);
		return mv;
	}

	@ResponseBody
	@RequestMapping(value = "/project/excelDownloadSurveyData", method = RequestMethod.GET, produces = "text/plain;charset=UTF-8")
	public ModelAndView excelDownloadSurveyData(HttpServletResponse response
												, @RequestParam(value = "target", defaultValue = "") String target
												, @RequestParam(value = "uCode", defaultValue = "") String uCode
												, @RequestParam(value = "projectId", defaultValue = "") String projectId
												, @RequestParam(value = "projectState", defaultValue = "") String projectState) throws Exception {
		ModelAndView mv = new ModelAndView();

		String tableName = "";
		SlHardCodingVO slHardCodingVO = new SlHardCodingVO();
		slHardCodingVO.setProjectId(Integer.parseInt(projectId));
		SlHardCodingVO selectSlHardCoding = this.projectService.selectSlHardCoding(slHardCodingVO);
		logger.info(">>> /project/excelDownloadSurveyData selectSlHardCoding: " + selectSlHardCoding);
		if (null != selectSlHardCoding) {
			tableName = selectSlHardCoding.getHardCodingTableName();
			logger.info(">>> /project/excelDownloadSurveyData tableName: " + tableName);
		}

		String questionSaveColumn = "";
		if (!"".equals(tableName)) {
			String sql = "select * from " + tableName + " " + "where projectId=" + projectId;
			if (!"".equals(uCode)) {
				sql = sql + "	and uCode=" + uCode;
			}
			sql += "	and uCode != 0";	// ucode가 0인 데이터는 다운로드 제외

			HashMap<String, Object> map = new HashMap();
			map.put("sql", sql);
			List<HashMap> listTable = this.projectService.listTable(map);

			if (null != listTable && 0 < listTable.size()) {
				response.setContentType("application/ms-excel; charset=UTF-8");
				response.setCharacterEncoding("UTF-8");
				response.setHeader("Content-disposition", "attachment; filename=survey_" + projectId + ".xlsx");

				mv.setViewName("excelView");
				mv.addObject("excelList", listTable);
				questionSaveColumn = selectSlHardCoding.getQuestionSaveColumn();
				logger.info(">>> /project/excelDownloadSurveyData questionSaveColumn: " + questionSaveColumn);
				mv.addObject("questionSaveColumn", questionSaveColumn);

			} else {

				PrintWriter out = response.getWriter();
				response.setContentType("text/html; charset=utf-8");
				out.println("<script language='javascript'>");
				out.println("	alert('No Data!!');");
				out.println("	location.href='/project/projectList';");
				out.println("</script>");
				out.flush();
				mv.setViewName("jsonView");
				mv.setViewName("/project/projectList");
			}
		}
		return mv;
	}

	// 웹 페이지 등록/수정 메소드 시작

	// 문항 수정
	@ResponseBody
	@RequestMapping(value = "/project/updateQuestion", method = RequestMethod.POST)
	public ModelAndView updateQuestion(@RequestBody SlQuestionVO slQuestionVO) throws Exception {
		logger.info(">>> updateQuestion getProjectId:" + slQuestionVO.getProjectId());
		logger.info(">>> updateQuestion getQuestionId:" + slQuestionVO.getQuestionId());
		logger.info(">>> updateQuestion questionOption:" + slQuestionVO.getQuestionOption());
		logger.info(">>> updateQuestion listSlExample.size():" + slQuestionVO.getListSlExample().size());
		logger.info(">>> updateQuestion listSlQuestionFunction().size():" + slQuestionVO.getListSlQuestionFunction().size());

		int projectId = slQuestionVO.getProjectId();
		int questionId = slQuestionVO.getQuestionId();
		String questionType = slQuestionVO.getQuestionType();
		String questionName = slQuestionVO.getQuestionName();
		String questionOption = slQuestionVO.getQuestionOption();

		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		boolean webUpdateSlQuestion = false;
		boolean webUpdateSlQuestionViewPage = false;
		boolean webDeleteSlExample = false;
		boolean webInsertSlExample = false;
		boolean webDeleteSlQuestionFunction = false;
		boolean webInsertSlQuestionFunction = false;
		boolean webDeleteSlQuestionLogic = false;
		boolean webInsertSlQuestionLogic = false;

		if ((null != slQuestionVO) && (0 < slQuestionVO.getProjectId())) {
			// 문항 수정
			webUpdateSlQuestion = this.projectService.webUpdateSlQuestion(slQuestionVO);
			logger.info(">>> updateQuestion webUpdateSlQuestion:" + webUpdateSlQuestion);

			// 문항 순서 수정
			SlQuestionViewPageVO slQuestionViewPageVO = new SlQuestionViewPageVO();
			slQuestionViewPageVO.setProjectId(projectId);
			slQuestionViewPageVO.setPageTitleQuestionId(String.valueOf(questionId));
			slQuestionViewPageVO.setPageTitleQuestionName(questionName);
			slQuestionViewPageVO.setPageQuestionNames(">" + questionName);

			webUpdateSlQuestionViewPage = this.projectService.webUpdateSlQuestionViewPage(slQuestionViewPageVO);
			logger.info(">>> updateQuestion webUpdateSlQuestionViewPage:" + webUpdateSlQuestionViewPage);

			// 보기 수정(삭제 후 삽입)
			if (webUpdateSlQuestion) {
				// 보기 삭제
				webDeleteSlExample = this.projectService.webDeleteSlExample(slQuestionVO);
				logger.info(">>> updateQuestion webDeleteSlExample:" + webDeleteSlExample);
				if (webDeleteSlExample) {
					// 보기 삽입
					List<SlExampleVO> listSlExample = slQuestionVO.getListSlExample();
					for (SlExampleVO slExampleVO : listSlExample) {
						//logger.info(">>> updateQuestion exampleCheck:" + slExampleVO.getExampleText());
						//logger.info(">>> updateQuestion if:" + (!("").equals(slExampleVO.getExampleText()) && slExampleVO.getExampleText() != null));
						// 내용이 있으면 삽입
						String exampleCheck = slExampleVO.getExampleText();
						if(!("").equals(exampleCheck) && exampleCheck != null) {
							slExampleVO.setProjectId(projectId);
							slExampleVO.setQuestionId(questionId);

							//logger.info(">>> updateQuestion slExampleVO:" + slExampleVO.getQuestionId());
							//logger.info(">>> updateQuestion slExampleVO:" + slExampleVO.getProjectId());
							//logger.info(">>> updateQuestion slExampleVO:" + slExampleVO.getExampleText());
							//logger.info(">>> updateQuestion slExampleVO:" + slExampleVO.getExampleValue());
							//logger.info(">>> updateQuestion slExampleVO:" + slExampleVO.getExampleOrder());
							//logger.info(">>> updateQuestion slExampleVO:" + slExampleVO.getColumnName());

							webInsertSlExample = this.projectService.webInsertSlExample(slExampleVO);
							logger.info(">>> updateQuestion webInsertSlExample:" + webInsertSlExample);
						}
					}
				}

				// 보기 옵션 삭제
				webDeleteSlQuestionFunction = this.projectService.webDeleteSlQuestionFunction(slQuestionVO);
				//webDeleteSlQuestionFunction = true;
				logger.info(">>> updateQuestion webDeleteSlQuestionFunction:" + webDeleteSlQuestionFunction);
				if (webDeleteSlQuestionFunction) {
					// 보기 옵션 삽입
					List<SlQuestionFunctionVO> listSlQuestionFunction = slQuestionVO.getListSlQuestionFunction();
					for (SlQuestionFunctionVO slQuestionFunctionVO : listSlQuestionFunction) {

						logger.info(">>> updateQuestion functionCheck:" + slQuestionFunctionVO.getFunctionText());
						logger.info(">>> updateQuestion if:" + (!("").equals(slQuestionFunctionVO.getFunctionText()) && slQuestionFunctionVO.getFunctionText() != null));

						String functionCheck = slQuestionFunctionVO.getFunctionText();
						// 내용이 있으면 삽입
						if(!("").equals(functionCheck) && functionCheck != null) {
							slQuestionFunctionVO.setProjectId(projectId);
							slQuestionFunctionVO.setQuestionId(questionId);

							logger.info(">>> updateQuestion slQuestionFunctionVO:" + slQuestionFunctionVO.getQuestionId());
							logger.info(">>> updateQuestion slQuestionFunctionVO:" + slQuestionFunctionVO.getProjectId());
							logger.info(">>> updateQuestion slQuestionFunctionVO:" + slQuestionFunctionVO.getFunctionText());

							webInsertSlQuestionFunction = this.projectService.webInsertSlQuestionFunction(slQuestionFunctionVO);
							logger.info(">>> updateQuestion webInsertSlQuestionFunction:" + webInsertSlQuestionFunction);
						}
					}
				}

				// 다음 이동 삭제
				webDeleteSlQuestionLogic = this.projectService.webDeleteSlQuestionLogic(slQuestionVO);
				//webDeleteSlQuestionLogic = true;
				logger.info(">>> updateQuestion webDeleteSlQuestionLogic:" + webDeleteSlQuestionLogic);
				if (webDeleteSlQuestionLogic) {
					// 다음 이동 삽입
					List<SlQuestionLogicVO> listSlQuestionLogic = slQuestionVO.getListSlQuestionLogic();
					for (SlQuestionLogicVO slQuestionLogicVO : listSlQuestionLogic) {

						String LogicCheck = slQuestionLogicVO.getQuestionNameBase();
						logger.info(">>> updateQuestion LogicCheck:" + slQuestionLogicVO.getQuestionNameBase());
						logger.info(">>> updateQuestion if:" + (!("").equals(LogicCheck) && LogicCheck != null));
						if(!("").equals(LogicCheck) && LogicCheck != null) {

							slQuestionLogicVO.setProjectId(projectId);
							slQuestionLogicVO.setQuestionId(questionId);

							logger.info(">>> updateQuestion slQuestionFunctionVO:" + slQuestionLogicVO.getQuestionId());
							logger.info(">>> updateQuestion slQuestionFunctionVO:" + slQuestionLogicVO.getProjectId());

							webInsertSlQuestionLogic = this.projectService.webInsertSlQuestionLogic(slQuestionLogicVO);
							logger.info(">>> updateQuestion webInsertSlQuestionLogic:" + webInsertSlQuestionLogic);
						}
					}
				}
			}
		}

		mv.addObject("questionType", questionType);
		mv.addObject("webUpdateSlQuestion", Boolean.valueOf(webUpdateSlQuestion));
		mv.addObject("webDeleteSlExample", Boolean.valueOf(webDeleteSlExample));
		mv.addObject("webInsertSlExample", Boolean.valueOf(webInsertSlExample));
		mv.addObject("webDeleteSlQuestionFunction", Boolean.valueOf(webDeleteSlQuestionFunction));
		mv.addObject("webInsertSlQuestionFunction", Boolean.valueOf(webInsertSlQuestionFunction));
		mv.addObject("webDeleteSlQuestionLogic", Boolean.valueOf(webDeleteSlQuestionLogic));
		mv.addObject("webInsertSlQuestionLogic", Boolean.valueOf(webInsertSlQuestionLogic));

		return mv;
	}

	// 문항 삭제
	@ResponseBody
	@RequestMapping(value = "/project/deleteQuestion", method = RequestMethod.POST)
	public ModelAndView deleteQuestion(@RequestBody SlQuestionVO slQuestionVO) throws Exception {
		logger.info(">>> deleteQuestion getProjectId:" + slQuestionVO.getProjectId());
		logger.info(">>> deleteQuestion getQuestionId:" + slQuestionVO.getQuestionId());
		logger.info(">>> deleteQuestion getQuestionName:" + slQuestionVO.getQuestionName());

		int projectId = slQuestionVO.getProjectId();
		int questionId = slQuestionVO.getQuestionId();
		String questionName = slQuestionVO.getQuestionName();

		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		boolean webCheckSlBooster = false;
		boolean webCheckSlQuoter = false;
		boolean webCheckSlrotMain = false;
		boolean webCheckSlrotQuestion = false;
		boolean webCheckSlCustomScript = false;
		boolean webDeleteSlQuestionLogic = false;
		boolean webDeleteSlQuestionFunction = false;
		boolean webDeleteSlExample = false;
		boolean webUpdateSlQuestionOrder = false;
		boolean webDeleteSlQuestion = false;
		boolean webUpdateSlQuestionViewPage = false;
		boolean webDeleteSlQuestionViewPage = false;


		// 부스트쿼터 체크
		int boosterCnt = this.projectService.webCountSlBooster(slQuestionVO);
		logger.info(">>> deleteQuestion boosterCnt:" + boosterCnt);
		if(boosterCnt > 0) {
			webCheckSlBooster = true;
			logger.info(">>> deleteQuestion webCheckSlBooster:" + webCheckSlBooster);
		}

		// 쿼터 체크
		int quoterCnt = this.projectService.webCountSlQuoter(slQuestionVO);
		logger.info(">>> deleteQuestion quoterCnt:" + quoterCnt);
		if(quoterCnt > 0) {
			webCheckSlQuoter = true;
			logger.info(">>> deleteQuestion webCheckSlQuoter:" + webCheckSlQuoter);
		}

		// 로테이션 체크
		int rotMainCnt = this.projectService.webCountSlRotationMain(slQuestionVO);
		int rotQuestionCnt = this.projectService.webCountSlRotationQuestion(slQuestionVO);
		logger.info(">>> deleteQuestion rotMainCnt:" + rotMainCnt);
		logger.info(">>> deleteQuestion rotQuestionCnt:" + rotQuestionCnt);

		if(rotMainCnt > 0) {
			webCheckSlrotMain = true;
			logger.info(">>> deleteQuestion webCheckSlrotMain:" + webCheckSlrotMain);
		}
		if(rotQuestionCnt > 0) {
			webCheckSlrotQuestion = true;
			logger.info(">>> deleteQuestion webCheckSlrotQuestion:" + webCheckSlrotQuestion);
		}

		// 사용자 정의 스크립트 체크
		int customScriptCnt = this.projectService.webCountSlCustomScript(slQuestionVO);
		logger.info(">>> deleteQuestion customScriptCnt:" + customScriptCnt);
		if(customScriptCnt > 0) {
			webCheckSlCustomScript = true;
			logger.info(">>> deleteQuestion webCheckSlCustomScript:" + webCheckSlCustomScript);
		}

		// 삭제 조건 충족 시 >>> 삭제
		if(!webCheckSlBooster && !webCheckSlQuoter && !webCheckSlrotMain && !webCheckSlrotQuestion && !webCheckSlCustomScript) {
			// 문항로직
			webDeleteSlQuestionLogic = this.projectService.webDeleteSlQuestionLogic(slQuestionVO);

			// 보기옵션
			webDeleteSlQuestionFunction = this.projectService.webDeleteSlQuestionFunction(slQuestionVO);

			// 보기
			webDeleteSlExample = this.projectService.webDeleteSlExample(slQuestionVO);

			// 문항
			webDeleteSlQuestion = this.projectService.webDeleteSlQuestion(slQuestionVO);

			// 문항 순서 삭제(sl_questionViewPage)
			webDeleteSlQuestionViewPage = this.projectService.webDeleteSlQuestionViewPage(slQuestionVO);

			// 문항 조회
			List<SlQuestionVO> listSlQuestion = this.projectService.webListSlQuestion(slQuestionVO);

			// 문항 순서 조회
			List<SlQuestionViewPageVO> listSlQuestionViewPage  = this.projectService.webListSlQuestionViewPage(slQuestionVO);

			// 문항 순서 변경
			int questionOrder = 1;
			int setPageOrder = 1;

			for (SlQuestionVO slQuestionVo : listSlQuestion) {
				slQuestionVo.setQuestionOrder(questionOrder);
				logger.info(">>> deleteQuestion getProjectId:" + slQuestionVo.getProjectId());
				logger.info(">>> deleteQuestion getQuestionOrder:" + slQuestionVo.getQuestionOrder());

				webUpdateSlQuestionOrder = this.projectService.webUpdateSlQuestionOrder(slQuestionVo);
				logger.info(">>> deleteQuestion webUpdateSlQuestionOrder:" + webUpdateSlQuestionOrder);
				questionOrder++;
			}

			for (SlQuestionViewPageVO slQuestionViewPageVO : listSlQuestionViewPage) {
				slQuestionViewPageVO.setPageOrder(setPageOrder);
				logger.info(">>> deleteQuestion getProjectId:" + slQuestionViewPageVO.getProjectId());
				logger.info(">>> deleteQuestion getPageTitleQuestionId:" + slQuestionViewPageVO.getPageTitleQuestionId());
				logger.info(">>> deleteQuestion getPageOrder:" + slQuestionViewPageVO.getPageOrder());

				webUpdateSlQuestionViewPage = this.projectService.webUpdateSlQuestionViewPage(slQuestionViewPageVO);
				logger.info(">>> deleteQuestion webUpdateSlQuestionViewPage:" + webUpdateSlQuestionViewPage);
				setPageOrder++;
			}

			// 응답 테이블 칼럼 삭제
			// 중복형, 순위형, 속성형 > 보기마다 칼럼 존재
			// 기타 > 문항번호_text
		}

		mv.addObject("webCheckSlBooster", Boolean.valueOf(webCheckSlBooster));
		mv.addObject("webCheckSlQuoter", Boolean.valueOf(webCheckSlQuoter));
		mv.addObject("webCheckSlrotMain", Boolean.valueOf(webCheckSlrotMain));
		mv.addObject("webCheckSlrotQuestion", Boolean.valueOf(webCheckSlrotQuestion));
		mv.addObject("webCheckSlCustomScript", Boolean.valueOf(webCheckSlCustomScript));
		mv.addObject("webDeleteSlQuestionLogic", Boolean.valueOf(webDeleteSlQuestionLogic));
		mv.addObject("webDeleteSlQuestionFunction", Boolean.valueOf(webDeleteSlQuestionFunction));
		mv.addObject("webDeleteSlExample", Boolean.valueOf(webDeleteSlExample));
		mv.addObject("webDeleteSlQuestion", Boolean.valueOf(webDeleteSlQuestion));
		mv.addObject("webUpdateSlQuestionOrder", Boolean.valueOf(webUpdateSlQuestionOrder));
		mv.addObject("webDeleteSlQuestionViewPage", Boolean.valueOf(webDeleteSlQuestionViewPage));
		mv.addObject("webUpdateSlQuestionViewPage", Boolean.valueOf(webUpdateSlQuestionViewPage));

		return mv;
	}

	// 문항 등록
	@ResponseBody
	@RequestMapping(value = "/project/insertQuestion", method = RequestMethod.POST)
	public ModelAndView insertQuestion(@RequestBody SlQuestionVO slQuestionVO) throws Exception {
		logger.info(">>> insertQuestion getProjectId:" + slQuestionVO.getProjectId());
		logger.info(">>> insertQuestion getQuestionId:" + slQuestionVO.getQuestionId());
		logger.info(">>> insertQuestion questionOption:" + slQuestionVO.getQuestionOption());
		logger.info(">>> insertQuestion listSlExample.size():" + slQuestionVO.getListSlExample().size());
		logger.info(">>> insertQuestion listSlQuestionFunction().size():" + slQuestionVO.getListSlQuestionFunction().size());

		int projectId = slQuestionVO.getProjectId();
		int questionId = slQuestionVO.getQuestionId();
		String questionType = slQuestionVO.getQuestionType();
		String questionOption = slQuestionVO.getQuestionOption();

		boolean questionEtc = false;
		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		boolean webInsertSlQuestion = false;
		boolean webInsertSlQuestionViewPage = false;
		boolean webInsertSlExample = false;
		boolean webInsertSlQuestionFunction = false;
		boolean webDeleteSlQuestionLogic = false;
		boolean webInsertSlQuestionLogic = false;

		if ((null != slQuestionVO) && (0 < slQuestionVO.getProjectId())) {
			// [ 문항 삽입 ]
			// 하드코딩id 조회
			SlHardCodingVO slHardCodingVO = new SlHardCodingVO();
			slHardCodingVO.setProjectId(projectId);
			SlHardCodingVO selectHardCoding = this.projectService.selectSlHardCoding(slHardCodingVO);
			int hardCodingId = selectHardCoding.getHardCodingId();

			// 체크넘 생성
			Random rnd = new Random();
			rnd.setSeed(System.currentTimeMillis());
			int setNum = rnd.nextInt(1000);

			// 문항순서 조회
			int countSlQuestion = this.projectService.countSlQuestion(slQuestionVO);
			int questionOrder = 1;

			logger.info(">>> insertQuestion countSlQuestion:" + countSlQuestion);
			if(countSlQuestion > 0) {
				// 가장 큰 순서 +1
				questionOrder = this.projectService.selectQuestionOrder(slQuestionVO);
				logger.info(">>> insertQuestion questionOrder:" + questionOrder);
				questionOrder++;
			}
			logger.info(">>> insertQuestion questionOrder:" + questionOrder);

			slQuestionVO.setHardCodingId(hardCodingId);
			slQuestionVO.setCheckNum(String.valueOf(setNum));
			slQuestionVO.setQuestionOrder(questionOrder);
			slQuestionVO.setQuestionOption(questionOption);
			slQuestionVO.setQuestionDivision("p");
			webInsertSlQuestion = this.projectService.webInsertSlQuestion(slQuestionVO);
			logger.info(">>> insertQuestion webInsertSlQuestion:" + webInsertSlQuestion);
			// questionId 값 설정
			questionId = slQuestionVO.getQuestionId();
			logger.info(">>> insertQuestion slQuestionVO.getQuestionId():" + slQuestionVO.getQuestionId());
			logger.info(">>> insertQuestion slQuestionVO.getQuestionName():" + slQuestionVO.getQuestionName());

			// [ sl_questionViewPage 데이터 삽입 ]
			// pageTitleQuestionId 			6818
			// pageTitleQuestionName 		Q21
			// pageTitleQuestionCheckNum	781
			// pageQuestionIds				>6818
			// pageQuestionNames			>Q21
			// pageOrder					12
			String pageTitleQuestionId = String.valueOf(questionId);;
			String pageTitleQuestionName = slQuestionVO.getQuestionName();
			String pageTitleQuestionCheckNum = String.valueOf(setNum);
			String pageQuestionIds = ">" + pageTitleQuestionId;
			String pageQuestionNames = ">" + pageTitleQuestionName;
			int pageOrder = questionOrder;

			SlQuestionViewPageVO slQuestionViewPageVO = new SlQuestionViewPageVO();
			slQuestionViewPageVO.setProjectId(projectId);
			slQuestionViewPageVO.setPageTitleQuestionId(pageTitleQuestionId);
			slQuestionViewPageVO.setPageTitleQuestionName(pageTitleQuestionName);
			slQuestionViewPageVO.setPageTitleQuestionCheckNum(pageTitleQuestionCheckNum);
			slQuestionViewPageVO.setPageQuestionIds(pageQuestionIds);
			slQuestionViewPageVO.setPageQuestionNames(pageQuestionNames);
			slQuestionViewPageVO.setPageOrder(pageOrder);

			webInsertSlQuestionViewPage = this.projectService.webInsertSlQuestionViewPage(slQuestionViewPageVO);
			logger.info(">>> insertQuestion webInsertSlQuestionViewPage:" + webInsertSlQuestionViewPage);

			if (webInsertSlQuestion && webInsertSlQuestionViewPage) {
				// 보기 삽입
				List<SlExampleVO> listSlExample = slQuestionVO.getListSlExample();
				for (SlExampleVO slExampleVO : listSlExample) {
					//logger.info(">>> insertQuestion exampleCheck:" + slExampleVO.getExampleText());
					//logger.info(">>> insertQuestion if:" + (!("").equals(slExampleVO.getExampleText()) && slExampleVO.getExampleText() != null));
					// 내용이 있으면 삽입
					String exampleCheck = slExampleVO.getExampleText();
					if(!("").equals(exampleCheck) && exampleCheck != null) {
						slExampleVO.setProjectId(projectId);
						slExampleVO.setQuestionId(questionId);

						logger.info(">>> insertQuestion slExampleVO:" + slExampleVO.getQuestionId());
						logger.info(">>> insertQuestion slExampleVO:" + slExampleVO.getProjectId());
						logger.info(">>> insertQuestion slExampleVO:" + slExampleVO.getExampleText());
						logger.info(">>> insertQuestion slExampleVO:" + slExampleVO.getExampleValue());
						logger.info(">>> insertQuestion slExampleVO:" + slExampleVO.getExampleOrder());
						logger.info(">>> insertQuestion slExampleVO:" + slExampleVO.getColumnName());

						webInsertSlExample = this.projectService.webInsertSlExample(slExampleVO);
						logger.info(">>> insertQuestion webInsertSlExample:" + webInsertSlExample);
					}
				}


				// 보기 옵션 삽입
				List<SlQuestionFunctionVO> listSlQuestionFunction = slQuestionVO.getListSlQuestionFunction();
				for (SlQuestionFunctionVO slQuestionFunctionVO : listSlQuestionFunction) {
					//logger.info(">>> insertQuestion functionCheck:" + slQuestionFunctionVO.getFunctionText());
					//logger.info(">>> insertQuestion if:" + (!("").equals(slQuestionFunctionVO.getFunctionText()) && slQuestionFunctionVO.getFunctionText() != null));

					String functionCheck = slQuestionFunctionVO.getFunctionText();

					if(!("").equals(functionCheck) && functionCheck != null) {
						// 내용이 있으면 삽입
						slQuestionFunctionVO.setProjectId(projectId);
						slQuestionFunctionVO.setQuestionId(questionId);

						// 보기옵션중 기타옵션이 포함됨
						int etcCheck = slQuestionFunctionVO.getFunctionText().indexOf("ETC");
						if(etcCheck != -1) {
							questionEtc = true;
						}

						//logger.info(">>> insertQuestion slQuestionFunctionVO:" + slQuestionFunctionVO.getQuestionId());
						//logger.info(">>> insertQuestion slQuestionFunctionVO:" + slQuestionFunctionVO.getProjectId());
						//logger.info(">>> insertQuestion slQuestionFunctionVO:" + slQuestionFunctionVO.getFunctionText());

						webInsertSlQuestionFunction = this.projectService.webInsertSlQuestionFunction(slQuestionFunctionVO);
						logger.info(">>> insertQuestion webInsertSlQuestionFunction:" + webInsertSlQuestionFunction);
					}
				}

				// 다음 이동 삭제
				webDeleteSlQuestionLogic = this.projectService.webDeleteSlQuestionLogic(slQuestionVO);
				//webDeleteSlQuestionLogic = true;
				logger.info(">>> insertQuestion webDeleteSlQuestionLogic:" + webDeleteSlQuestionLogic);
				if (webDeleteSlQuestionLogic) {
					// 다음 이동 삽입
					List<SlQuestionLogicVO> listSlQuestionLogic = slQuestionVO.getListSlQuestionLogic();
					for (SlQuestionLogicVO slQuestionLogicVO : listSlQuestionLogic) {

						String LogicCheck = slQuestionLogicVO.getQuestionNameBase();
						logger.info(">>> insertQuestion LogicCheck:" + slQuestionLogicVO.getQuestionNameBase());
						logger.info(">>> insertQuestion if:" + (!("").equals(LogicCheck) && LogicCheck != null));
						if(!("").equals(LogicCheck) && LogicCheck != null) {

							slQuestionLogicVO.setProjectId(projectId);
							slQuestionLogicVO.setQuestionId(questionId);

							logger.info(">>> insertQuestion slQuestionFunctionVO:" + slQuestionLogicVO.getQuestionId());
							logger.info(">>> insertQuestion slQuestionFunctionVO:" + slQuestionLogicVO.getProjectId());

							webInsertSlQuestionLogic = this.projectService.webInsertSlQuestionLogic(slQuestionLogicVO);
							logger.info(">>> insertQuestion webInsertSlQuestionLogic:" + webInsertSlQuestionLogic);
						}
					}
				}
			}
		}

		mv.addObject("questionType", questionType);
		mv.addObject("webInsertSlQuestion", Boolean.valueOf(webInsertSlQuestion));
		mv.addObject("webInsertSlQuestionViewPage", Boolean.valueOf(webInsertSlQuestionViewPage));
		mv.addObject("webInsertSlExample", Boolean.valueOf(webInsertSlExample));
		mv.addObject("webInsertSlQuestionFunction", Boolean.valueOf(webInsertSlQuestionFunction));
		mv.addObject("webInsertSlQuestionLogic", Boolean.valueOf(webInsertSlQuestionLogic));

		return mv;
	}



	@ResponseBody
	@RequestMapping(value = "/project/excelDownloadSurveyGuide", method = RequestMethod.GET, produces = "text/plain;charset=UTF-8")
	public ModelAndView excelDownloadSurveyGuide(HttpServletResponse response
												, @RequestParam(value = "target", defaultValue = "") String target
												, @RequestParam(value = "uCode", defaultValue = "") String uCode
												, @RequestParam(value = "projectId", defaultValue = "") String projectId
												, @RequestParam(value = "projectState", defaultValue = "") String projectState) throws Exception {
		ModelAndView mv = new ModelAndView();

		String tableName = "";
		SlHardCodingVO slHardCodingVO = new SlHardCodingVO();
		slHardCodingVO.setProjectId(Integer.parseInt(projectId));
		SlHardCodingVO selectSlHardCoding = this.projectService.selectSlHardCoding(slHardCodingVO);
		logger.info(">>> /project/excelDownloadSurveyGuide selectSlHardCoding: " + selectSlHardCoding);
		if (null != selectSlHardCoding) {
			tableName = selectSlHardCoding.getHardCodingTableName();
			logger.info(">>> /project/excelDownloadSurveyGuide tableName: " + tableName);
		}

		String questionSaveColumn = "";
		if (!"".equals(tableName)) {
			String sql = "select * from sl_question sq, sl_example se " + "where sq.questionid = se.questionid and sq.projectid =" + projectId;
			sql += "	order by sq.questionOrder, se.exampleOrder, convert(se.exampleValue,int) asc";

			HashMap<String, Object> map = new HashMap();
			map.put("sql", sql);
			List<HashMap> listTable = this.projectService.listTable(map);

			if (null != listTable && 0 < listTable.size()) {
				response.setContentType("application/ms-excel; charset=UTF-8");
				response.setCharacterEncoding("UTF-8");
				response.setHeader("Content-disposition", "attachment; filename=guide_" + projectId + ".xlsx");

				mv.setViewName("excelGuide");
				mv.addObject("excelList", listTable);
				questionSaveColumn = selectSlHardCoding.getQuestionSaveColumn();
				logger.info(">>> /project/excelDownloadSurveyGuide questionSaveColumn: " + questionSaveColumn);
				mv.addObject("questionSaveColumn", questionSaveColumn);

			} else {

				PrintWriter out = response.getWriter();
				response.setContentType("text/html; charset=utf-8");
				out.println("<script language='javascript'>");
				out.println("	alert('No question!!');");
				out.println("	location.href='/project/projectList';");
				out.println("</script>");
				out.flush();
				mv.setViewName("jsonView");
				mv.setViewName("/project/projectList");
			}
		}
		return mv;
	}
}

