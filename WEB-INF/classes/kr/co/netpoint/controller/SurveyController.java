package kr.co.netpoint.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kr.co.netpoint.property.ConfigProperty;
import kr.co.netpoint.service.ProjectService;
import kr.co.netpoint.vo.project.PnProjectVO;
import kr.co.netpoint.vo.project.SlBoosterVO;
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
import kr.co.netpoint.vo.project.SlRotationMainVO;
import kr.co.netpoint.vo.project.SlRotationPartVO;
import kr.co.netpoint.vo.project.SlSurveyVO;
import kr.co.netpoint.vo.survey.SurveyInquiryVO;

@Controller
public class SurveyController {
	static final Logger logger = LoggerFactory.getLogger(SurveyController.class);
	@Autowired
	private ProjectService projectService;
	@Autowired
	private ConfigProperty configProperty;

	@RequestMapping(value = "/survey/{page1}")
	public ModelAndView surveyHardCodingPage(@PathVariable("page1") String page1
											, Authentication authentication, HttpServletRequest request) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("/survey/" + page1);
		return mv;
	}

	@RequestMapping(value = "/survey/info")
	public ModelAndView surveyInfo(HttpServletRequest request
									, @RequestParam(value = "uCode", defaultValue = "0", required = false) String uCode
									, @RequestParam(value = "projectId", defaultValue = "0", required = false) int projectId
									, @RequestParam(value = "CType", defaultValue = "0", required = false) int cType
									, @RequestParam(value = "HDCPNo", defaultValue = "0", required = false) String cpno) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("/survey/info");
		mv.addObject("uCode", uCode);
		mv.addObject("projectId", Integer.valueOf(projectId));
		mv.addObject("cpno", cpno);
		mv.addObject("cType", Integer.valueOf(cType));
		return mv;
	}

	@ResponseBody
	@RequestMapping(value = "/survey/getInfo", method = RequestMethod.POST)
	public ModelAndView getInfo(@RequestBody SlQuestionVO slQuestionVO) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		int projectId = slQuestionVO.getProjectId();
		String uCode = slQuestionVO.getuCode();
		int cType = slQuestionVO.getcType();

		logger.info(">>> getInfo uCode:" + uCode);
		logger.info(">>> getInfo cType:" + cType);

		boolean slProject = false;
		boolean slHardCoding = false;
		String serveyGoPath = "";
		if (null != uCode && 0 < projectId) {

			SlProjectVO slProjectVO = new SlProjectVO();
			slProjectVO.setProjectId(projectId);
			SlProjectVO selectSlProject = this.projectService.selectSlProject(slProjectVO);
			String useFollowing = selectSlProject.getUseFollowing();
			mv.addObject("selectSlProject", selectSlProject);

			SlHardCodingVO slHardCodingVO = new SlHardCodingVO();
			slHardCodingVO.setProjectId(projectId);
			SlHardCodingVO selectSlHardCoding = this.projectService.selectSlHardCoding(slHardCodingVO);

			String hardCodingTableName = "";
			int hardCodingId = 0;
			if (null != selectSlHardCoding) {
				hardCodingTableName = selectSlHardCoding.getHardCodingTableName();
				hardCodingId = selectSlHardCoding.getHardCodingId();
			}

			if (null != this.configProperty) {
				this.configProperty.setProjectId(projectId);
				serveyGoPath = this.configProperty.getServeyGoPath();
			}
			SlQuestionViewPageVO slQuestionViewPageVO = new SlQuestionViewPageVO();
			slQuestionViewPageVO.setProjectId(projectId);
			List<SlQuestionViewPageVO> listSlQuestionViewPage = this.projectService.listSlQuestionViewPage(slQuestionViewPageVO);
			mv.addObject("listSlQuestionViewPage", listSlQuestionViewPage);

			if(listSlQuestionViewPage != null && listSlQuestionViewPage.size() > 0) {
				SlQuestionViewPageVO selectSlQuestionViewPage = listSlQuestionViewPage.get(0);
				mv.addObject("selectSlQuestionViewPage", selectSlQuestionViewPage);
				mv.addObject("slQuestionViewPageCheck", true);
			} else {
				mv.addObject("slQuestionViewPageCheck", false);
			}
			SlQuaterVO slQuaterVO = new SlQuaterVO();
			slQuaterVO.setProjectId(projectId);
			SlQuaterVO selectSlQuater = this.projectService.selectSlQuater(slQuaterVO);
			mv.addObject("selectSlQuater", selectSlQuater);

			SlQuaterCountVO slQuaterCountVO = new SlQuaterCountVO();
			slQuaterCountVO.setProjectId(projectId);
			List<SlQuaterCountVO> listSlQuaterCount = this.projectService.listSlQuaterCount(slQuaterCountVO);
			mv.addObject("listSlQuaterCount", listSlQuaterCount);

			if (!"".equals(hardCodingTableName) && 0 < hardCodingId && "1".equals(useFollowing)) {
				String sql = "select * from " + hardCodingTableName + " " + "where projectId=" + projectId
							+ "	and hardCodingId=" + hardCodingId
							+ "	and uCode='" + uCode + "' ";

				HashMap<String, Object> map = new HashMap();
				map.put("sql", sql);
				HashMap selectTable = this.projectService.selectTable(map);
				mv.addObject("selectTable", selectTable);

				// redirectUrl 응답테이블에 설정하기
				if(0 != cType) {
					// 응답테이블에서 변경
					boolean updateCType = false;
					SlQuestionVO cTypeVO = new SlQuestionVO();
					cTypeVO.setcType(cType);
					cTypeVO.setProjectId(projectId);
					cTypeVO.setTableName(hardCodingTableName);
					cTypeVO.setuCode(uCode);

					updateCType = this.projectService.updateCType(cTypeVO);

					mv.addObject("updateCType", updateCType);
				}
			}
		}
		mv.addObject("serveyGoPath", serveyGoPath);
		return mv;
	}

	@ResponseBody
	@RequestMapping(value = "/survey/getSurvey", method = RequestMethod.POST)
	public ModelAndView getSurvey(@RequestBody SlQuestionVO slQuestionVO) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		int projectId = slQuestionVO.getProjectId();
		int hardCodingId = slQuestionVO.getHardCodingId();
		String surveyState = slQuestionVO.getSurveyState();
		int questionId = slQuestionVO.getQuestionId();
		String questionName = slQuestionVO.getQuestionName();
		String uCode = slQuestionVO.getuCode();
		int cType = slQuestionVO.getcType();

		SlProjectVO selectSlProject = null;
		String projectState = "0";
		String checkNum = "";

		if (projectId > 0) {
			SlProjectVO slProjectVO = new SlProjectVO();
			slProjectVO.setProjectId(projectId);
			selectSlProject = this.projectService.selectSlProject(slProjectVO);
			mv.addObject("selectSlProject", selectSlProject);
			projectState = selectSlProject.getProjectState().trim();
		}

		if (null != selectSlProject) {
			SlRedirectUrlVO slRedirectUrlVO = new SlRedirectUrlVO();
			slRedirectUrlVO.setProjectId(projectId);
			List<SlRedirectUrlVO> listSlRedirectUrl = this.projectService.listSlRedirectUrl(slRedirectUrlVO);
			mv.addObject("listSlRedirectUrl", listSlRedirectUrl);

			if (selectSlProject.getProjId() > 0) {
				PnProjectVO pnProjectVO = new PnProjectVO();
				pnProjectVO.setProjId(selectSlProject.getProjId());
				PnProjectVO selectPnProject = this.projectService.selectPnProject(pnProjectVO);
				mv.addObject("selectPnProject", selectPnProject);
			}

			SlHardCodingVO slHardCodingVO = new SlHardCodingVO();
			slHardCodingVO.setProjectId(projectId);
			SlHardCodingVO selectSlHardCoding = this.projectService.selectSlHardCoding(slHardCodingVO);
			mv.addObject("selectSlHardCoding", selectSlHardCoding);

			if (!"testList".equals(surveyState) && 0 < questionId) {
				SlQuestionVO selectSlQuestion = this.projectService.selectSlQuestion(slQuestionVO);
				mv.addObject("selectSlQuestion", selectSlQuestion);
				checkNum = selectSlQuestion.getCheckNum();
			}

			if (!"testList".equals(surveyState) && 0 < questionId) {
				SlQuestionFunctionVO slQuestionFunctionVO = new SlQuestionFunctionVO();
				slQuestionFunctionVO.setProjectId(projectId);
				List<SlQuestionFunctionVO> listSlQuaterQuestion = this.projectService.listSlQuaterQuestion(slQuestionFunctionVO);
				mv.addObject("listSlQuaterQuestion", listSlQuaterQuestion);
			}

			if (!"testList".equals(surveyState) && 0 < projectId) {

				SlQuaterVO slQuaterVO = new SlQuaterVO();
				slQuaterVO.setProjectId(projectId);

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

			if (!"testList".equals(surveyState) && 0 < questionId) {
				SlRotationMainVO slRotationMainVO = new SlRotationMainVO();
				slRotationMainVO.setProjectId(projectId);
				//slRotationMainVO.setRotMainQuestionId(questionId);
				slRotationMainVO.setRotMainQuestionName(questionName);
				SlRotationMainVO selectSlRotationMain = this.projectService.selectSlRotationMain(slRotationMainVO);
				mv.addObject("selectSlRotationMain", selectSlRotationMain);
			}

			if (!"testList".equals(surveyState) && 0 < questionId) {
				SlQuestionFunctionVO slQuestionFunctionVO = new SlQuestionFunctionVO();
				slQuestionFunctionVO.setProjectId(projectId);
				slQuestionFunctionVO.setQuestionId(questionId);
				List<SlQuestionFunctionVO> listSlQuestionFunction = this.projectService.listSlQuestionFunction(slQuestionFunctionVO);
				mv.addObject("listSlQuestionFunction", listSlQuestionFunction);
			}

			if (!"testList".equals(surveyState) && 0 < questionId) {
				SlQuestionLogicVO slQuestionLogicVO = new SlQuestionLogicVO();
				slQuestionLogicVO.setProjectId(projectId);
				slQuestionLogicVO.setQuestionId(questionId);
				List<SlQuestionLogicVO> listSlQuestionLogic = this.projectService.listSlQuestionLogic(slQuestionLogicVO);
				mv.addObject("listSlQuestionLogic", listSlQuestionLogic);
			}

			SlQuestionViewPageVO slQuestionViewPageVO = new SlQuestionViewPageVO();
			slQuestionViewPageVO.setProjectId(projectId);
			List<SlQuestionViewPageVO> listSlQuestionViewPage = this.projectService.listSlQuestionViewPage(slQuestionViewPageVO);
			mv.addObject("listSlQuestionViewPage", listSlQuestionViewPage);

			slQuestionVO.setQuestionId(0);
			List<SlQuestionVO> listSlQuestion = this.projectService.listSlQuestion(slQuestionVO);
			mv.addObject("listSlQuestion", listSlQuestion);

			logger.info(">>> getSurvey listSlQuestion:" + listSlQuestion);
			logger.info(">>> getSurvey listSlQuestion.size():" + listSlQuestion.size());

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

					logger.info(">>> getSurvey slQuestionFunctionVO projectId:" + projectId);
					logger.info(">>> getSurvey slQuestionFunctionVO questionIds:" + questionIds);

					SlQuestionFunctionVO slQuestionFunctionVO = new SlQuestionFunctionVO();
					slQuestionFunctionVO.setProjectId(projectId);
					slQuestionFunctionVO.setQuestionId(questionIds);
					List<SlQuestionFunctionVO> listSlQuestionFunction = this.projectService.listSlQuestionFunction(slQuestionFunctionVO);

					if (null != listSlQuestionFunction && 0 < listSlQuestionFunction.size()) {
						listSlQuestion.get(i).setListSlQuestionFunction(listSlQuestionFunction);
					}

					SlQuestionLogicVO slQuestionLogicVO = new SlQuestionLogicVO();
					slQuestionLogicVO.setProjectId(projectId);
					slQuestionLogicVO.setQuestionId(questionIds);
					List<SlQuestionLogicVO> listSlQuestionLogic = this.projectService.listSlQuestionLogic(slQuestionLogicVO);

					if (null != listSlQuestionLogic && 0 < listSlQuestionLogic.size()) {
						listSlQuestion.get(i).setListSlQuestionLogic(listSlQuestionLogic);
					}
				}
			}

			String tableName = "";
			String usePageHistory = "";
			String pageHistory = "";
			if (null != selectSlHardCoding && null != selectSlHardCoding.getHardCodingTableName()) {

				tableName = selectSlHardCoding.getHardCodingTableName();
				usePageHistory = selectSlHardCoding.getUsePageHistory();

				if ("0".equals(usePageHistory)) {
					pageHistory = selectSlHardCoding.getPageBaseHistory();
				} else if ("1".equals(usePageHistory)) {
					pageHistory = selectSlHardCoding.getPageLotationHistory();
				}
			}

			logger.info(">>> getSurvey selectSlHardCoding.getHardCodingTableName():" + selectSlHardCoding.getHardCodingTableName());
			logger.info(">>> getSurvey tableName:" + tableName);

			if (null != selectSlHardCoding && null != tableName && !"".equals(tableName)) {

				String hardCodingTableName = selectSlHardCoding.getHardCodingTableName();
				int countTable = this.projectService.countTable(hardCodingTableName);

				logger.info(">>> getSurvey countTable:" + countTable);

				if (0 < countTable) {
					boolean insertSlSurvey = false;

					SlSurveyVO slSurveyVO = new SlSurveyVO();
					slSurveyVO.setTableName(tableName);
					slSurveyVO.setuCode(uCode);
					slSurveyVO.setProjectId(projectId);
					slSurveyVO.setHardCodingId(hardCodingId);
					int countSlSurvey = this.projectService.countSlSurvey(slSurveyVO);

					if (0 == countSlSurvey) {
						Random rnd = new Random();
						rnd.setSeed(System.currentTimeMillis());
						int setNum = rnd.nextInt(1000);

						String sql = "";
						sql = sql + "insert into " + tableName + " ";
						sql = sql + "	(uCode, projectId, hardCodingId, checkNum, regDate, cType";
						sql = sql + " 	, pageSaveQuestionId, pageSaveQuestionName, pageLastQuestionId, pageLastQuestionName";
						if (!"".equals(pageHistory)) {
							sql = sql + "	, pageHistory";
						}
						sql = sql + "	)";
						sql = sql + "values ('" + uCode + "', " + projectId + ", " + hardCodingId + ", " + setNum
								+ "	, sysdate(), " + cType;
						sql = sql + "	, '', '', '', '' ";
						if (!"".equals(pageHistory)) {
							sql = sql + "	, '" + pageHistory + "'";
						}
						sql = sql + ")";
						HashMap<String, Object> map = new HashMap();
						map.put("sql", sql);
						insertSlSurvey = this.projectService.insertSlSurvey(map);
					}
				}
				/*
				if (0 == countTable) {
					boolean insertSlSurvey = false;

					SlSurveyVO slSurveyVO = new SlSurveyVO();
					slSurveyVO.setTableName(tableName);
					slSurveyVO.setuCode(uCode);
					slSurveyVO.setProjectId(projectId);
					slSurveyVO.setHardCodingId(hardCodingId);
					int countSlSurvey = 0;

					try {
						countSlSurvey = this.projectService.countSlSurvey(slSurveyVO);
					} catch(Exception e) {
						e.printStackTrace();
					}

					if (0 == countSlSurvey) {
						Random rnd = new Random();
						rnd.setSeed(System.currentTimeMillis());
						int setNum = rnd.nextInt(1000);

						String sql = "";
						sql = sql + "insert into " + tableName + " ";
						sql = sql + "	(uCode, projectId, hardCodingId, checkNum, regDate";
						sql = sql + " 	, pageSaveQuestionId, pageSaveQuestionName, pageLastQuestionId, pageLastQuestionName";
						if (!"".equals(pageHistory)) {
							sql = sql + "	, pageHistory";
						}
						sql = sql + "	)";
						sql = sql + "values ('" + uCode + "', " + projectId + ", " + hardCodingId + ", " + setNum
								+ "	, sysdate()";
						sql = sql + "	, '', '', '', '' ";
						if (!"".equals(pageHistory)) {
							sql = sql + "	, '" + pageHistory + "'";
						}
						sql = sql + ")";
						HashMap<String, Object> map = new HashMap();
						map.put("sql", sql);
						insertSlSurvey = this.projectService.insertSlSurvey(map);
					}
				}
				*/
				String sql = "select * from " + hardCodingTableName + " "
							+ "where projectId=" + projectId
							+ "	and hardCodingId=" + hardCodingId + "	and uCode='" + uCode + "' ";

				logger.info(">>> getSurvey sql:" + sql);

				try {
					HashMap<String, Object> map = new HashMap();
					map.put("sql", sql);
					HashMap selectTable = this.projectService.selectTable(map);
					mv.addObject("selectTable", selectTable);
				} catch(Exception e) {
					e.printStackTrace();
				}

				SlRotationMainVO slRotationMainVO = new SlRotationMainVO();
				slRotationMainVO.setProjectId(projectId);
				List<SlRotationMainVO> listSlRotationMain = this.projectService.listSlRotationMain(slRotationMainVO);
				mv.addObject("listSlRotationMain", listSlRotationMain);

				SlRotationPartVO slRotationPartVO = new SlRotationPartVO();
				slRotationPartVO.setProjectId(projectId);
				List<SlRotationPartVO> listSlRotationPart = this.projectService.listSlRotationPart(slRotationPartVO);
				mv.addObject("listSlRotationPart", listSlRotationPart);
			}
		}
		mv.addObject("checkNum", checkNum);
		mv.addObject("projectState", projectState);
		mv.addObject("configProperty", this.configProperty);
		return mv;
	}

	@ResponseBody
	@RequestMapping(value = "/survey/setSurvey", method = RequestMethod.POST)
	public ModelAndView setSurvey(@RequestBody SlQuestionVO slQuestionVO) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		String uCode = slQuestionVO.getuCode();
		int projectId = slQuestionVO.getProjectId();
		int hardCodingId = slQuestionVO.getHardCodingId();
		String checkMoveQType = slQuestionVO.getCheckMoveQType();
		String sQuestionName = slQuestionVO.getQuestionName();
		String questionType = slQuestionVO.getQuestionType();

		logger.info(">>> /survey/setSurvey sQuestionName:" + sQuestionName);
		logger.info(">>> /survey/setSurvey questionType:" + questionType);

		int nowPageIndex = slQuestionVO.getPageIndex();
		String nowPageId = slQuestionVO.getPageId();
		String nowPageName = slQuestionVO.getPageName();
		int nextPageIndex = slQuestionVO.getPageIndex2();
		String nextPageId = slQuestionVO.getPageId2();
		String nextPageName = slQuestionVO.getPageName2();

		SlHardCodingVO slHardCodingVO = new SlHardCodingVO();
		slHardCodingVO.setProjectId(projectId);
		slHardCodingVO.setHardCodingId(hardCodingId);
		SlHardCodingVO selectSlHardCoding = this.projectService.selectSlHardCoding(slHardCodingVO);

		String tableName = "";
		String columnName = "";
		String usePageHistory = "";
		String pageHistory = "";
		if (null != selectSlHardCoding && null != selectSlHardCoding.getHardCodingTableName()) {

			tableName = selectSlHardCoding.getHardCodingTableName();
			usePageHistory = selectSlHardCoding.getUsePageHistory();

			if ("0".equals(usePageHistory)) {
				pageHistory = selectSlHardCoding.getPageBaseHistory();
			} else if ("1".equals(usePageHistory)) {
				pageHistory = selectSlHardCoding.getPageLotationHistory();
			}
		}

		boolean updateSlSurvey = false;
		boolean updateSlSurvey2 = false;
		if (!"".equals(tableName)) {

			Map<String, Object> setColumn;
			int checkIndex;
			if (!"N".equals(checkMoveQType)) {

				setColumn = new HashMap();
				List<HashMap> listcolumnName = this.projectService.listcolumnName(tableName);
				logger.info(">>> /survey/setSurvey tableName:" + tableName);
				logger.info(">>> /survey/setSurvey listcolumnName.size():" + listcolumnName.size());
				for (HashMap m : listcolumnName) {
					String colurmName = (String) m.get("colurmName");
					logger.info(">>> /survey/setSurvey colurmName:" + colurmName);
					setColumn.put(colurmName, colurmName);

					if("mul".equals(questionType) || "ord".equals(questionType)) {
						String colurmNamelist = colurmName + "_";
						//logger.info(">>> /survey/setSurvey colurmName.indexOf(sQuestionName):" + colurmName.indexOf(sQuestionName));
						if(colurmNamelist.indexOf(sQuestionName+"_") != -1) {
							columnName += "`" +colurmName+ "`" + "='',";
						}
					}
				}

				if (null != slQuestionVO && null != slQuestionVO.getListSlSurvey()) {
					logger.info(">>> /survey/setSurvey uCode:" + uCode);
					logger.info(">>> /survey/setSurvey projectId:" + projectId);
					logger.info(">>> /survey/setSurvey hardCodingId:" + hardCodingId);

					// 문항이름으로 칼럼 검색하여 해당 문항의 보기 초기화(중복형(mul), 순위형만(ord))
					if("mul".equals(questionType) || "ord".equals(questionType)) {
						logger.info(">>> /survey/setSurvey columnName:" + columnName);
						logger.info(">>> /survey/setSurvey columnName.substring(0,(columnName.length()-1)):" + columnName.substring(0,(columnName.length()-1)));
						logger.info(">>> /survey/setSurvey columnName:" + columnName);
						columnName = columnName.substring(0,(columnName.length()-1));
						String sql = "update " + tableName + " "
								+ "set " + columnName + " "
								+ "where uCode='" + uCode + "' and projectId=" + projectId
								+ "	and hardCodingId=" + hardCodingId;

						HashMap<String, Object> map = new HashMap();
						map.put("sql", sql);
						updateSlSurvey = this.projectService.updateSlSurvey(map);
					}

					String checkQuestionName = "";
					checkIndex = 0;
					for (SlSurveyVO ssv : slQuestionVO.getListSlSurvey()) {
						String setUCode = ssv.getuCode();
						int setProjectId = ssv.getProjectId();
						int setHardCodingId = ssv.getHardCodingId();
						String exampleText = ssv.getExampleText();
						String exampleValue = ssv.getExampleValue();
						String questionName = ssv.getQuestionName();

						//logger.info(">>> /survey/setSurvey setUCode:" + setUCode);
						//logger.info(">>> /survey/setSurvey setProjectId:" + setProjectId);
						//logger.info(">>> /survey/setSurvey setHardCodingId:" + setHardCodingId);
						logger.info(">>> /survey/setSurvey exampleText:" + exampleText);
						logger.info(">>> /survey/setSurvey setColumn.get(exampleText):" + (String)setColumn.get(exampleText));

						if (null != (String) setColumn.get(exampleText)) {
							String sql1 = "update " + tableName + " "
									+ "set " +"`"+ exampleText +"`"+ "='" + exampleValue
									+ "', updateDate=sysdate() "
									+ "where uCode='" + setUCode + "' and projectId=" + setProjectId
									+ "	and hardCodingId=" + setHardCodingId;

							HashMap<String, Object> map1 = new HashMap();
							map1.put("sql", sql1);
							updateSlSurvey = this.projectService.updateSlSurvey(map1);
						}
						if (0 == checkIndex) {
							String sql2 = "update " + tableName + " "
										+ "set surveyHistory = CONCAT( IFNULL("
										+ 	tableName + ".surveyHistory,''), '>" + questionName + "') "
										+ " , surveyLast='" + questionName + "' " + " , pageSaveIndex='" + nowPageIndex + "' "
										+ " , pageSaveQuestionId='" + nowPageId + "' "
										+ " , pageSaveQuestionName='"+ nowPageName + "' "
										+ " , pageLastIndex='" + nextPageIndex + "' "
										+ " , pageLastQuestionId='" + nextPageId + "' "
										+ "	, pageLastQuestionName='"+ nextPageName + "' "
										+ "where uCode='" + setUCode + "' and projectId="
										+ 	setProjectId + "	and hardCodingId=" + setHardCodingId;

							HashMap<String, Object> map2 = new HashMap();
							map2.put("sql", sql2);
							updateSlSurvey2 = this.projectService.updateSlSurvey(map2);
						}
						checkIndex++;
					}
				}
			} else {
				String sql2 = "update " + tableName + " "
							+ "set surveyHistory = CONCAT( IFNULL(" + tableName
							+ ".surveyHistory,''), '>" + nextPageName + "') "
							+ " , surveyLast='" + nextPageName + "' "
							+ " , pageLastIndex='" + nextPageIndex + "' "
							+ " , pageLastQuestionId='" + nextPageId + "' "
							+ " , pageLastQuestionName='" + nextPageName + "' "
							+ "where uCode='" + uCode + "' "
							+ "	and projectId=" + projectId + "	and hardCodingId=" + hardCodingId;

				HashMap<String, Object> map2 = new HashMap();
				map2.put("sql", sql2);
				updateSlSurvey2 = this.projectService.updateSlSurvey(map2);
				updateSlSurvey = updateSlSurvey2;
			}
		}
		mv.addObject("updateSlSurvey", Boolean.valueOf(updateSlSurvey));
		mv.addObject("updateSlSurvey2", Boolean.valueOf(updateSlSurvey2));
		return mv;
	}

	@ResponseBody
	@RequestMapping(value = "/survey/setGoBackPage", method = RequestMethod.POST)
	public ModelAndView setGoBackPage(@RequestBody SlQuestionVO slQuestionVO) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		String uCode = slQuestionVO.getuCode();
		int projectId = slQuestionVO.getProjectId();
		int hardCodingId = slQuestionVO.getHardCodingId();
		int pageIndex = slQuestionVO.getPageIndex();
		String pageId = slQuestionVO.getPageId();
		String pageName = slQuestionVO.getPageName();

		if (null != uCode && 0 < projectId && 0 < hardCodingId && 0 < pageIndex
				&& null != pageId && !"".equals(pageId)
				&& null != pageName && !"".equals(pageName)) {
			SlHardCodingVO slHardCodingVO = new SlHardCodingVO();
			slHardCodingVO.setProjectId(projectId);
			slHardCodingVO.setHardCodingId(hardCodingId);
			SlHardCodingVO selectSlHardCoding = this.projectService.selectSlHardCoding(slHardCodingVO);

			String tableName = "";
			if (null != selectSlHardCoding && null != selectSlHardCoding.getHardCodingTableName()) {
				tableName = selectSlHardCoding.getHardCodingTableName();
			}
			logger.info(">>> setGoBackPage tableName: " + tableName);
			boolean updateSlSurvey = false;
			if (!"".equals(tableName)) {
				String sql = "update " + tableName + " "
							+ "	set pageLastIndex = " + pageIndex
							+ "	, pageLastQuestionId = " + pageId
							+ "	, pageLastQuestionName = '" + pageName + "'"
							+ " where uCode='" + uCode + "'	and projectId=" + projectId + "	and hardCodingId="+ hardCodingId;

				logger.info(">>> setGoBackPage sql: " + sql);
				HashMap<String, Object> map = new HashMap();
				map.put("sql", sql);
				updateSlSurvey = this.projectService.updateSlSurvey(map);
			}
			mv.addObject("updateSlSurvey", Boolean.valueOf(updateSlSurvey));
		}
		return mv;
	}

	@ResponseBody
	@RequestMapping(value = "/survey/insertInquiry", method = RequestMethod.POST)
	public ModelAndView insertInquiry(@RequestBody SurveyInquiryVO surveyInquiryVO) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		int projectId = surveyInquiryVO.getProjectId();
		String uCode = surveyInquiryVO.getuCode();
		String userEmail = surveyInquiryVO.getUserEmail();
		String inquiryTitle = surveyInquiryVO.getInquiryTitle();
		String inquiryContents = surveyInquiryVO.getInquiryContents();

		String tmp_inquiryTitle = "조사 중 문의(" + projectId + ") " + inquiryTitle;
		surveyInquiryVO.setInquiryTitle(tmp_inquiryTitle);

		if (0 < projectId
				&& null != uCode && !"".equals(uCode)
				&& null != userEmail && !"".equals(userEmail)
				&& null != inquiryTitle && !"".equals(inquiryTitle)
				&& null != inquiryContents && !"".equals(inquiryContents)) {

			boolean insertInquiry = false;
			insertInquiry = this.projectService.insertInquiry(surveyInquiryVO);
			logger.info(">>> insertInquiry insertInquiry: " + insertInquiry);
			mv.addObject("insertInquiry", Boolean.valueOf(insertInquiry));
		}
		return mv;
	}
}
