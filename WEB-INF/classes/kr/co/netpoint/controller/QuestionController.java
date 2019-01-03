package kr.co.netpoint.controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kr.co.netpoint.property.ConfigProperty;
import kr.co.netpoint.service.ProjectService;
import kr.co.netpoint.vo.project.SlCustomScriptVO;
import kr.co.netpoint.vo.project.SlExampleVO;
import kr.co.netpoint.vo.project.SlHardCodingVO;
import kr.co.netpoint.vo.project.SlProjectVO;
import kr.co.netpoint.vo.project.SlQuaterVO;
import kr.co.netpoint.vo.project.SlQuestionFunctionVO;
import kr.co.netpoint.vo.project.SlQuestionLogicVO;
import kr.co.netpoint.vo.project.SlQuestionVO;
import kr.co.netpoint.vo.project.SlQuestionViewPageVO;
import kr.co.netpoint.vo.project.SlRotationMainVO;

@Controller
public class QuestionController {

	private static final Logger logger = LoggerFactory.getLogger(QuestionController.class);

	@Autowired
	private ProjectService projectService;

	@Autowired
	private ConfigProperty configProperty;

	@RequestMapping(value = "/question/questionList")
	public ModelAndView questionList(HttpServletRequest request
			, @RequestParam(value = "projectId", defaultValue = "0", required = false) String projectId) {
		logger.info(">>> question/questionList");
		ModelAndView mv = new ModelAndView();
		mv.addObject("projectId", projectId);
		mv.setViewName("question/questionList");
		return mv;
	}

	@ResponseBody
	@RequestMapping(value = "/question/setQuestionList", method = RequestMethod.POST)
	public ModelAndView setQuestionList(@RequestBody SlQuestionVO questionVO) throws Exception {

		int projectId = questionVO.getProjectId();
		String tableName = "sl_survey_" + projectId;
		String sql = "";

		boolean insertSlHardCoding = false;
		boolean createTable = false;

		logger.info(">>> /question/setQuestionList projectId :" + projectId);
		logger.info(">>> /question/setQuestionList tableName :" + tableName);

		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		// 첫 진입 시 테이블 생성
		// sl_hardcoding
		SlHardCodingVO slHardCodingVO = new SlHardCodingVO();
		slHardCodingVO.setProjectId(projectId);				// projectId
		String fileSaveDirectory = configProperty.getFileSaveDirectory();
		String fileFullPath = fileSaveDirectory + "/v02/hardCoding";

		int countSlHardCoding = projectService.countSlHardCoding(slHardCodingVO);
		mv.addObject("countSlHardCoding", countSlHardCoding);

		if(countSlHardCoding == 0) {
			// 하드코딩  삽입
			slHardCodingVO.setHardCodingTableName(tableName);	// hardCodingTableName
			slHardCodingVO.setFileDirectory("hardCoding");	// fileDirectory
			slHardCodingVO.setFileFullPath(fileFullPath);	// fileFullPath

			insertSlHardCoding = projectService.insertSlHardCoding(slHardCodingVO);
			logger.info(">>> /question/setQuestionList hardCodingId :" + slHardCodingVO.getHardCodingId());

			mv.addObject("insertSlHardCoding", insertSlHardCoding);
			mv.addObject("hardCodingId", slHardCodingVO.getHardCodingId());
		} else {
			SlHardCodingVO selectSlHardCoding = this.projectService.selectSlHardCoding(slHardCodingVO);

			logger.info(">>> /question/setQuestionList selectSlHardCoding :" + selectSlHardCoding.getHardCodingId());
			mv.addObject("hardCodingId", selectSlHardCoding.getHardCodingId());
		}

		// sl_survey_000
		int countTable = projectService.countTable(tableName);
		mv.addObject("countTable", countTable);
		if (0 == countTable) {
			// 응답테이블 삽입
			sql = "CREATE TABLE " + tableName + " (" + "	surveyId INT(11) NOT NULL AUTO_INCREMENT,"
					+ "	uCode VARCHAR(50) NULL DEFAULT NULL," + "	projectId INT(11) NULL DEFAULT NULL ,"
					+ "	hardCodingId INT(11) NULL DEFAULT NULL,"
					+ "	regDate VARCHAR(50) NULL DEFAULT NULL,"
					+ "	updateDate VARCHAR(50) NULL DEFAULT NULL," + "	deleteYn VARCHAR(50) NULL DEFAULT 'N',"
					+ "	surveyState VARCHAR(10) NULL DEFAULT NULL DEFAULT '0',"
					+ "	surveyLast VARCHAR(50) NULL DEFAULT NULL," + "	surveyHistory VARCHAR(500) NULL DEFAULT NULL,"
					+ "	pageHistory VARCHAR(500) NULL DEFAULT NULL," + "	pageSaveIndex INT(10) NULL DEFAULT 0,"
					+ "	pageSaveQuestionId VARCHAR(50) NULL DEFAULT NULL,"
					+ "	pageSaveQuestionName VARCHAR(50) NULL DEFAULT NULL,"
					+ "	pageLastIndex INT(10) NULL DEFAULT 0," + "	pageLastQuestionId VARCHAR(50) NULL DEFAULT NULL,"
					+ "	pageLastQuestionName VARCHAR(50) NULL DEFAULT NULL,"
					+ "	pageQuestionId INT(10) NULL DEFAULT 0," + "	checkNum INT(100) NULL DEFAULT NULL,"
					+ "	PRIMARY KEY (`surveyId`)" + ")";

			HashMap<String, Object> map = new HashMap<String, Object>();
			map.put("sql", sql);

			createTable = projectService.createTable(map);
			mv.addObject("createTable", createTable);
		}

		// 문항정보 sl_question
		SlQuestionVO slQuestionVO = new SlQuestionVO();
		slQuestionVO.setProjectId(projectId);
		List<SlQuestionVO> listSlQuestion = this.projectService.webListSlQuestion(slQuestionVO);
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

		// 문항순서 sl_questionViewPage
		SlQuestionViewPageVO slQuestionViewPageVO = new SlQuestionViewPageVO();
		slQuestionViewPageVO.setProjectId(projectId);
		List<SlQuestionViewPageVO> listSlQuestionViewPage = this.projectService.listSlQuestionViewPage(slQuestionViewPageVO);
		mv.addObject("listSlQuestionViewPage", listSlQuestionViewPage);

		// 문항 안 보기 옵션정보 sl_question_function
		SlQuestionFunctionVO slQuestionFunctionVO = new SlQuestionFunctionVO();
		slQuestionFunctionVO.setProjectId(projectId);
		List<SlQuestionFunctionVO> listSlQuestionFunction = this.projectService.listSlQuestionFunction(slQuestionFunctionVO);
		mv.addObject("listSlQuestionFunction", listSlQuestionFunction);

		// 문항 안 보기 옵션정보 sl_question_function
		SlQuestionLogicVO slQuestionLogicVO = new SlQuestionLogicVO();
		slQuestionLogicVO.setProjectId(projectId);
		List<SlQuestionLogicVO> listSlQuestionLogic = this.projectService.listSlQuestionLogic(slQuestionLogicVO);
		mv.addObject("listSlQuestionLogic", listSlQuestionLogic);

		// 보기정보 sl_example
		SlExampleVO slExampleVO = new SlExampleVO();
		slExampleVO.setProjectId(projectId);
		List<SlExampleVO> listSlExample = this.projectService.listSlExample(slExampleVO);
		mv.addObject("listSlExample", listSlExample);

		// 로테이션 정보 sl_rotationMain
		SlRotationMainVO slRotationMainVO = new SlRotationMainVO();
		slRotationMainVO.setProjectId(projectId);
		List<SlRotationMainVO> listSlRotationMain = this.projectService.listSlRotationMain(slRotationMainVO);
		mv.addObject("listSlRotationMain", listSlRotationMain);

		// 쿼터 정보 sl_quater
		SlQuaterVO slQuaterVO = new SlQuaterVO();
		slQuaterVO.setProjectId(projectId);
		SlQuaterVO selectSlQuater = this.projectService.selectSlQuater(slQuaterVO);
		mv.addObject("selectSlQuater", selectSlQuater);

		return mv;
	}

	@RequestMapping(value = "/question/questionReg")
	public ModelAndView questionReg(HttpServletRequest request
			, @RequestParam(value = "gubun", defaultValue = "0", required = false) String gubun
			, @RequestParam(value = "projectId", defaultValue = "0", required = false) int projectId
			, @RequestParam(value = "questionId", defaultValue = "0", required = false) int questionId) throws Exception {
		logger.info(">>> question/questionReg");

		ModelAndView mv = new ModelAndView();

		logger.info(">>> question/questionReg: " + gubun);
		logger.info(">>> question/questionReg: " + projectId);
		logger.info(">>> question/questionReg: " + questionId);

		mv.addObject("gubun", gubun);
		mv.addObject("projectId", projectId);
		mv.addObject("questionId", questionId);

		mv.setViewName("question/questionReg");
		return mv;
	}

	@ResponseBody
	@RequestMapping(value = "/question/getQuestionUpdate", method = RequestMethod.POST)
	public ModelAndView getQuestionUpdate(@RequestBody SlQuestionVO questionVO) throws Exception {

		int projectId = questionVO.getProjectId();
		int questionId = questionVO.getQuestionId();

		logger.info(">>> /question/getQuestionUpdate projectId :" + projectId);
		logger.info(">>> /question/getQuestionUpdate questionId :" + questionId);
		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		// 문항정보 리스트 sl_question
		SlQuestionVO slQuestionVO = new SlQuestionVO();
		slQuestionVO.setProjectId(projectId);
		List<SlQuestionVO> listSlQuestion = this.projectService.listSlQuestion(slQuestionVO);
		mv.addObject("listSlQuestion", listSlQuestion);

		// 문항정보 sl_question
		slQuestionVO.setQuestionId(questionId);
		SlQuestionVO selectSlQuestion = this.projectService.selectSlQuestion(slQuestionVO);
		mv.addObject("selectSlQuestion", selectSlQuestion);

		// 보기정보 sl_example
		SlExampleVO slExampleVO = new SlExampleVO();
		slExampleVO.setProjectId(projectId);
		slExampleVO.setQuestionId(questionId);
		List<SlExampleVO> listSlExample = this.projectService.listSlExample(slExampleVO);
		mv.addObject("listSlExample", listSlExample);

		// 문항순서 sl_questionViewPage
		SlQuestionViewPageVO slQuestionViewPageVO = new SlQuestionViewPageVO();
		slQuestionViewPageVO.setProjectId(projectId);
		List<SlQuestionViewPageVO> listSlQuestionViewPage = this.projectService.listSlQuestionViewPage(slQuestionViewPageVO);
		mv.addObject("listSlQuestionViewPage", listSlQuestionViewPage);

		// 문항 안 보기 옵션정보 sl_question_function
		SlQuestionFunctionVO slQuestionFunctionVO = new SlQuestionFunctionVO();
		slQuestionFunctionVO.setProjectId(projectId);
		slQuestionFunctionVO.setQuestionId(questionId);
		List<SlQuestionFunctionVO> listSlQuestionFunction = this.projectService.listSlQuestionFunction(slQuestionFunctionVO);
		mv.addObject("listSlQuestionFunction", listSlQuestionFunction);

		// 문항 로직
		SlQuestionLogicVO slQuestionLogicVO = new SlQuestionLogicVO();
		slQuestionLogicVO.setProjectId(projectId);
		slQuestionLogicVO.setQuestionId(questionId);
		List<SlQuestionLogicVO> listSlQuestionLogic = this.projectService.listSlQuestionLogic(slQuestionLogicVO);
		mv.addObject("listSlQuestionLogic", listSlQuestionLogic);

		return mv;
	}

	@ResponseBody
	@RequestMapping(value = "/question/allcopyExecution", method = RequestMethod.POST)
	public ModelAndView allcopySearch(@RequestBody SlProjectVO slProjectVO) throws Exception {

		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		SlHardCodingVO slHardCodingVO = new SlHardCodingVO();
		slHardCodingVO.setProjectId(slProjectVO.getProjectId());
		slHardCodingVO = this.projectService.selectSlHardCoding(slHardCodingVO);

		int projectId = slProjectVO.getProjectId();						// 복사 할 프로젝트
		int copyTagetProjectId = slProjectVO.getCopyTagetProjectId(); 	// 복사 대상 프로젝트
		int hardCodingId = slHardCodingVO.getHardCodingId();

		slProjectVO.setHardCodingId(hardCodingId);

		logger.info(">>> /question/allcopyExecution projectId :" + projectId);
		logger.info(">>> /question/allcopyExecution copyTagetProjectId :" + copyTagetProjectId);
		logger.info(">>> /question/allcopyExecution hardCodingId :" + hardCodingId);



		boolean deleteSlQuestion = false;
		boolean deleteSlExample = false;
		boolean deleteSlQuestionLogic = false;
		boolean deleteSlQuestionFunction = false;
		boolean deleteSlQuestionViewPage = false;
		boolean deleteSlCustomScript = false;
		boolean deleteSlRedirectUrl = false;

		boolean insertCopySlQuestion = false;
		boolean insertCopySlExample = false;
		boolean insertCopySlQuestionLogic = false;
		boolean insertCopySlQuestionFunction = false;
		boolean insertCopySlQuestionViewPage = false;
		boolean insertCopySlCustomScript = false;



		if (projectId > 0) {
			// 문항 삭제
			deleteSlQuestion = this.projectService.deleteSlQuestion(projectId);
			mv.addObject("deleteSlQuestion", deleteSlQuestion);

			// 문항 삽입
			insertCopySlQuestion = this.projectService.insertCopySlQuestion(slProjectVO);
			mv.addObject("insertCopySlQuestion", insertCopySlQuestion);

			// 보기 삭제
			deleteSlExample = projectService.deleteSlExample(projectId);
			mv.addObject("deleteSlExample", deleteSlExample);

			// 문항 로직 삭제
			deleteSlQuestionLogic = this.projectService.deleteSlQuestionLogic(projectId);
			mv.addObject("deleteSlQuestionLogic", deleteSlQuestionLogic);

			// 문항 기능 삭제
			deleteSlQuestionFunction = this.projectService.deleteSlQuestionFunction(projectId);
			mv.addObject("deleteSlQuestionFunction", deleteSlQuestionFunction);

			// 문항 순서 삭제
			SlQuestionVO slQuestionVO = new SlQuestionVO();
			slQuestionVO.setProjectId(projectId);
			deleteSlQuestionViewPage = this.projectService.webDeleteSlQuestionViewPage(slQuestionVO);
			mv.addObject("deleteSlQuestionViewPage", deleteSlQuestionViewPage);

			// 복사대상 문항id로 조회 후 복사 할 문항id로 삽입
			slQuestionVO.setProjectId(copyTagetProjectId);	// 복사 대상 문항id
			List<SlQuestionVO> listSlQuestionTarget = this.projectService.listSlQuestion(slQuestionVO);	// 복사 대상 문항 조회

			slQuestionVO.setProjectId(projectId);	// 복사 할 문항id
			List<SlQuestionVO> listSlQuestion = this.projectService.listSlQuestion(slQuestionVO);	// 복사 할 문항 조회

			// 복사 대상 문항 조회 > 복사 할 문항(복사할 내용이 같으니 차례로 id값 변화 주며 삽입)
			for(int i=0; i<listSlQuestionTarget.size(); i++) {
				SlQuestionVO questionVO = new SlQuestionVO();
				int questionId = listSlQuestion.get(i).getQuestionId();					// 복사 할 문항id
				int copyTagetQuestionId = listSlQuestionTarget.get(i).getQuestionId();	// 복사 대상 문항id
				String checkNum = listSlQuestion.get(i).getCheckNum();					// 복사 할 문항의 checkNum

				questionVO.setProjectId(projectId);
				questionVO.setQuestionId(questionId);
				questionVO.setCopyTagetQuestionId(copyTagetQuestionId);
				questionVO.setCheckNum(checkNum);

				logger.info(">>> /question/allcopyExecution questionId :" + questionId);
				logger.info(">>> /question/allcopyExecution copyTagetQuestionId :" + copyTagetQuestionId);
				logger.info(">>> /question/allcopyExecution checkNum :" + checkNum);

				// 보기 삽입
				insertCopySlExample = this.projectService.insertCopySlExample(questionVO);
				mv.addObject("insertCopySlExample", insertCopySlExample);

				// 문항 로직 삽입
				insertCopySlQuestionLogic = this.projectService.insertCopySlQuestionLogic(questionVO);
				mv.addObject("insertCopySlQuestionLogic", insertCopySlQuestionLogic);

				// 문항 기능 삽입
				insertCopySlQuestionFunction = this.projectService.insertCopySlQuestionFunction(questionVO);
				mv.addObject("insertCopySlQuestionFunction", insertCopySlQuestionFunction);

				// 문항 순서 삽입
				insertCopySlQuestionViewPage = this.projectService.insertCopySlQuestionViewPage(questionVO);
				mv.addObject("insertCopySlQuestionViewPage", insertCopySlQuestionViewPage);

			}

			// 사용자 스크립트 삭제 ( deleteYn > Y )
			SlCustomScriptVO slCustomScriptVO = new SlCustomScriptVO();
			slCustomScriptVO.setProjectId(projectId);
			deleteSlCustomScript = this.projectService.deleteCustomScript(slCustomScriptVO);
			mv.addObject("deleteSlCustomScript", deleteSlCustomScript);

			// 사용자 스크립트 삽입
			insertCopySlCustomScript = this.projectService.insertCopySlCustomScript(slProjectVO);
			mv.addObject("insertCopySlCustomScript", insertCopySlCustomScript);
/*
			// redirectUrl 삭제
			SlRedirectUrlVO delslRedirectUrlVO = new SlRedirectUrlVO();
			delslRedirectUrlVO.setProjectId(slProjectVO.getProjectId());
			//deleteSlRedirectUrl = this.projectService.deleteSlRedirectUrl(delslRedirectUrlVO);
			//mv.addObject("deleteSlRedirectUrl", deleteSlRedirectUrl);
*/
		}

		return mv;
	}
	// 선택문항복사
	@ResponseBody
	@RequestMapping(value = "/question/partcopyList", method = RequestMethod.POST)
	public ModelAndView partcopyList(@RequestBody SlQuestionVO slQuestionVO) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		logger.info(">>> /question/partcopyList projectId :" + slQuestionVO.getProjectId());

		List<SlQuestionVO> listSlQuestion = this.projectService.webListSlQuestion(slQuestionVO);

		mv.addObject("listSlQuestion", listSlQuestion);
		//List<SlQuestionVO> listQuestionHtml
		return mv;
	}
	// 선택문항복사 > 복사
	@ResponseBody
	@RequestMapping(value = "/question/partcopyExecution", method = RequestMethod.POST)
	public ModelAndView partcopyExecution(@RequestBody SlProjectVO slProjectVO) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		int projectId = slProjectVO.getProjectId();
		int guideQuestionId = slProjectVO.getCopyTagetQuestionId();	// 복사 기준 문항(복사위치 문항id)

		boolean updatePartcopyQuestionOrder = false;
		boolean updatePartcopyPageOrder = false;

		boolean insertPartcopySlQuestion = false;
		boolean insertPartcopySlExample = false;
		boolean insertPartcopySlQuestionLogic = false;
		boolean insertPartcopySlQuestionFunction = false;
		boolean insertPartcopySlQuestionViewPage = false;

		//logger.info(">>> /question/partcopyExecution getProjectId() : " + slProjectVO.getProjectId());
		//logger.info(">>> /question/partcopyExecution getListQuestionHtml().size() : " + slProjectVO.getListQuestionHtml().size());
		//logger.info(">>> /question/partcopyExecution getCopyTagetQuestionId() : " + slProjectVO.getCopyTagetQuestionId());

		// 복사 대상 문항리스트, 개수
		List<SlQuestionVO> listSlQuestionTarget = slProjectVO.getListQuestionHtml();
		int copyCount = listSlQuestionTarget.size();

		// 뒤에 복사할 문항 순서 조회
		SlQuestionVO questionVO = new SlQuestionVO();
		questionVO.setProjectId(projectId);
		questionVO.setQuestionId(guideQuestionId);

		// 문항 테이블
		SlQuestionVO guideQuestionVO = this.projectService.selectPartcopySlQuestion(questionVO);
		int questionOrder = guideQuestionVO.getQuestionOrder(); // 문항 순서
		logger.info(">>> /question/partcopyExecution questionOrder : " + questionOrder);

		// 순서 테이블
		SlQuestionViewPageVO slQuestionViewPageVO = new SlQuestionViewPageVO();

		// 문항 순서 수정 (복사 위치 순서 +1 / 복사할 문항 개수)
		int updateQuestionOrder = (questionOrder+1) + copyCount;
		guideQuestionVO.setProjectId(projectId);
		guideQuestionVO.setQuestionOrder(questionOrder);
		List<SlQuestionVO> listSlQuestionOrder = this.projectService.partcopySelectQuestion(guideQuestionVO);
		logger.info(">>> /question/partcopyExecution listSlQuestionOrder.size() : " + listSlQuestionOrder.size());

		// 복사위치 뒷 문항 순서변경
		for(int i=0; i<listSlQuestionOrder.size(); i++) {
			logger.info(">>> /question/partcopyExecution listSlQuestionOrder listSlQuestionOrder.get(i).getQuestionId() : " + listSlQuestionOrder.get(i).getQuestionId());
			int questionOrderId = listSlQuestionOrder.get(i).getQuestionId();

			// sl_question
			questionVO.setQuestionId(questionOrderId);
			questionVO.setQuestionOrder(updateQuestionOrder);
			updatePartcopyQuestionOrder = this.projectService.webUpdateSlQuestionOrder(questionVO);

			logger.info(">>> /question/partcopyExecution updatePartcopyQuestionOrder : " + updatePartcopyQuestionOrder);
			logger.info(">>> /question/partcopyExecution updateQuestionOrder : " + updateQuestionOrder);

			// sl_questionViewPage
			slQuestionViewPageVO.setProjectId(projectId);
			slQuestionViewPageVO.setPageTitleQuestionId(Integer.toString(questionOrderId));
			slQuestionViewPageVO.setPageOrder(updateQuestionOrder);
			updatePartcopyPageOrder = this.projectService.webUpdateSlQuestionViewPage(slQuestionViewPageVO);

			logger.info(">>> /question/partcopyExecution updatePartcopyPageOrder : " + updatePartcopyPageOrder);

			updateQuestionOrder++;
		}

		// 복사 대상 문항 조회 > 복사 할 문항(복사할 내용이 같으니 차례로 id값 변화 주며 삽입)
		for(int i=0; i<listSlQuestionTarget.size(); i++) {

			int copyTagetQuestionId = listSlQuestionTarget.get(i).getQuestionId();
			String copyTagetQuestionName = listSlQuestionTarget.get(i).getQuestionName();

			logger.info(">>> /question/partcopyExecution projectId : " + projectId);
			logger.info(">>> /question/partcopyExecution copyTagetQuestionId : " + copyTagetQuestionId);
			logger.info(">>> /question/partcopyExecution copyTagetQuestionName : " + copyTagetQuestionName);

			// projectId question 설정
			SlProjectVO copyProjectVO = new SlProjectVO();
			copyProjectVO.setCopyTagetProjectId(projectId);
			copyProjectVO.setCopyTagetQuestionId(copyTagetQuestionId);
			copyProjectVO.setCopyTagetQuestionName(copyTagetQuestionName);

			// 문항 삽입
			copyProjectVO.setInsertQuestionOrder(++questionOrder);	// 순서 정의
			insertPartcopySlQuestion = this.projectService.insertPartcopySlQuestion(copyProjectVO);
			mv.addObject("insertPartcopySlQuestion", insertPartcopySlQuestion);

			// 복사한 문항아이디(questionId) 조회
			String copyName = "copy_" +  copyTagetQuestionName;
			logger.info(">>> /question/partcopyExecution copyName : " + copyName);
			questionVO.setQuestionId(0);				// 문항id 초기화
			questionVO.setQuestionName(copyName);		// 문항이름

			SlQuestionVO copyQuestionVO = this.projectService.selectPartcopySlQuestion(questionVO);
			logger.info(">>> /question/partcopyExecution copyQuestionVO.getQuestionId() : " + copyQuestionVO.getQuestionId());
			questionVO.setQuestionId(copyQuestionVO.getQuestionId());
			questionVO.setCopyTagetQuestionId(copyTagetQuestionId);
			questionVO.setCheckNum(copyQuestionVO.getCheckNum());

			// 보기 삽입
			insertPartcopySlExample = this.projectService.insertCopySlExample(questionVO);
			mv.addObject("insertPartcopySlExample", insertPartcopySlExample);

			// 문항 로직 삽입
			insertPartcopySlQuestionLogic = this.projectService.insertCopySlQuestionLogic(questionVO);
			mv.addObject("insertPartcopySlQuestionLogic", insertPartcopySlQuestionLogic);

			// 문항 기능 삽입
			insertPartcopySlQuestionFunction = this.projectService.insertCopySlQuestionFunction(questionVO);
			mv.addObject("insertPartcopySlQuestionFunction", insertPartcopySlQuestionFunction);

			// 순서 삽입
			questionVO.setQuestionOrder(questionOrder);	// 순서 정의
			logger.info(">>> /question/partcopyExecution questionVO.getQuestionOrder() : " + questionVO.getQuestionOrder());
			insertPartcopySlQuestionViewPage = this.projectService.insertPartcopySlQuestionViewPage(questionVO);
			mv.addObject("insertPartcopySlQuestionViewPage", insertPartcopySlQuestionViewPage);

		}

		return mv;
	}

	// 선택삭제 > 삭제
	@ResponseBody
	@RequestMapping(value = "/question/partdelExecution", method = RequestMethod.POST)
	public ModelAndView partdelExecution(@RequestBody SlProjectVO slProjectVO) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		int projectId = slProjectVO.getProjectId();
		int questionId = 0;
		int firstOrder = 0;

		boolean updatePartdelQuestionOrder = false;	// sl_question 순서
		boolean updatePartdelPageOrder = false;		// sl_quesionViewPage 순서

		boolean deletePartcopySlQuestion = false;
		boolean deletePartcopySlExample = false;
		boolean deletePartcopySlQuestionLogic = false;
		boolean deletePartcopySlQuestionFunction = false;
		boolean deletePartcopySlQuestionViewPage = false;

		//logger.info(">>> /question/partcopyExecution getListQuestionHtml().size() : " + slProjectVO.getListQuestionHtml().size());

		List<SlQuestionVO> listQuestionHtml = slProjectVO.getListQuestionHtml();

		SlQuestionVO slQuestionVO = new SlQuestionVO();
		slQuestionVO.setProjectId(projectId);


		// 선택한 문항 삭제
		for(int i=0; i<listQuestionHtml.size(); i++) {
			questionId = listQuestionHtml.get(i).getQuestionId();
			slQuestionVO.setQuestionId(questionId);

			firstOrder = questionId;	// 삭제할 문항 첫 순서

			deletePartcopySlQuestion = this.projectService.webDeleteSlQuestion(slQuestionVO);
			deletePartcopySlExample = this.projectService.webDeleteSlExample(slQuestionVO);
			deletePartcopySlQuestionLogic = this.projectService.webDeleteSlQuestionLogic(slQuestionVO);
			deletePartcopySlQuestionFunction = this.projectService.webDeleteSlQuestionFunction(slQuestionVO);
			deletePartcopySlQuestionViewPage = this.projectService.webDeleteSlQuestionViewPage(slQuestionVO);

			logger.info(">>> /question/partdelExecution "+(i)+" deletePartcopySlQuestion : " + deletePartcopySlQuestion);
			logger.info(">>> /question/partdelExecution "+(i)+" deletePartcopySlExample : " + deletePartcopySlExample);
			logger.info(">>> /question/partdelExecution "+(i)+" deletePartcopySlQuestionLogic : " + deletePartcopySlQuestionLogic);
			logger.info(">>> /question/partdelExecution "+(i)+" deletePartcopySlQuestionFunction : " + deletePartcopySlQuestionFunction);
			logger.info(">>> /question/partdelExecution "+(i)+" deletePartcopySlQuestionViewPage : " + deletePartcopySlQuestionViewPage);
		}

		// 문항 조회
		List<SlQuestionVO> listSlQuestion = this.projectService.webListSlQuestion(slQuestionVO);

		// 문항 순서 조회
		List<SlQuestionViewPageVO> listSlQuestionViewPage  = this.projectService.webListSlQuestionViewPage(slQuestionVO);

		// 문항 순서 변경
		int questionOrder = 1;
		int setPageOrder = 1;

		for (SlQuestionVO slQuestionVo : listSlQuestion) {
			slQuestionVo.setQuestionOrder(questionOrder);
			logger.info(">>> partdelExecution getProjectId:" + slQuestionVo.getProjectId());
			logger.info(">>> partdelExecution getQuestionOrder:" + slQuestionVo.getQuestionOrder());

			updatePartdelQuestionOrder = this.projectService.webUpdateSlQuestionOrder(slQuestionVo);
			logger.info(">>> partdelExecution updatePartdelQuestionOrder:" + updatePartdelQuestionOrder);
			questionOrder++;
		}

		for (SlQuestionViewPageVO slQuestionViewPageVO : listSlQuestionViewPage) {
			slQuestionViewPageVO.setPageOrder(setPageOrder);
			logger.info(">>> partdelExecution getProjectId:" + slQuestionViewPageVO.getProjectId());
			logger.info(">>> partdelExecution getPageTitleQuestionId:" + slQuestionViewPageVO.getPageTitleQuestionId());
			logger.info(">>> partdelExecution getPageOrder:" + slQuestionViewPageVO.getPageOrder());

			updatePartdelPageOrder = this.projectService.webUpdateSlQuestionViewPage(slQuestionViewPageVO);
			logger.info(">>> partdelExecution updatePartdelPageOrder:" + updatePartdelPageOrder);
			setPageOrder++;
		}

		mv.addObject("deletePartcopySlQuestion", deletePartcopySlQuestion);
		mv.addObject("deletePartcopySlExample", deletePartcopySlExample);
		mv.addObject("deletePartcopySlQuestionLogic", deletePartcopySlQuestionLogic);
		mv.addObject("deletePartcopySlQuestionFunction", deletePartcopySlQuestionFunction);
		mv.addObject("deletePartcopySlQuestionViewPage", deletePartcopySlQuestionViewPage);

		mv.addObject("updatePartdelQuestionOrder", updatePartdelQuestionOrder);
		mv.addObject("updatePartdelPageOrder", updatePartdelPageOrder);

		return mv;
	}

	// 순서 변경 > 변경
	@ResponseBody
	@RequestMapping(value = "/question/orderChangeExecution", method = RequestMethod.POST)
	public ModelAndView orderChangeExecution(@RequestBody SlProjectVO slProjectVO) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		boolean updatelQuestionOrder = false;	// sl_question 순서
		boolean updatePageOrder = false;		// sl_quesionViewPage 순서

		//logger.info(">>> /question/partcopyExecution getListQuestionHtml().size() : " + slProjectVO.getListQuestionHtml().size());

		// 변경할 순서대로 담긴 문항
		List<SlQuestionVO> listQuestionHtml = slProjectVO.getListQuestionHtml();

		SlQuestionViewPageVO slQuestionViewPageVO = new SlQuestionViewPageVO();

		// 문항 순서 변경
		int questionOrder = 1;
		int setPageOrder = 1;

		for (SlQuestionVO slQuestionVo : listQuestionHtml) {
			slQuestionVo.setQuestionOrder(questionOrder);
			logger.info(">>> orderChangeExecution slQuestionVo.getProjectId():" + slQuestionVo.getProjectId());
			logger.info(">>> orderChangeExecution slQuestionVo.getQuestionOrder():" + slQuestionVo.getQuestionOrder());
			logger.info(">>> orderChangeExecution slQuestionVo.getQuestionId():" + slQuestionVo.getQuestionId());

			// sl_question >>> questionOrder
			updatelQuestionOrder = this.projectService.webUpdateSlQuestionOrder(slQuestionVo);
			logger.info(">>> orderChangeExecution updatelQuestionOrder:" + updatelQuestionOrder);
			questionOrder++;

			slQuestionViewPageVO.setPageOrder(setPageOrder);
			slQuestionViewPageVO.setProjectId(slQuestionVo.getProjectId());
			slQuestionViewPageVO.setPageTitleQuestionId(slQuestionVo.getQuestionId()+"");

			logger.info(">>> orderChangeExecution slQuestionViewPageVO.getProjectId():" + slQuestionViewPageVO.getProjectId());
			logger.info(">>> orderChangeExecution slQuestionViewPageVO.getPageOrder():" + slQuestionViewPageVO.getPageOrder());
			logger.info(">>> orderChangeExecution slQuestionViewPageVO.getPageTitleQuestionId():" + slQuestionViewPageVO.getPageTitleQuestionId());

			// sl_questionViewPage >>> pageorder
			updatePageOrder = this.projectService.webUpdateSlQuestionViewPage(slQuestionViewPageVO);
			logger.info(">>> orderChangeExecution updatePageOrder:" + updatePageOrder);
			setPageOrder++;
		}

		mv.addObject("updatelQuestionOrder", updatelQuestionOrder);
		mv.addObject("updatePageOrder", updatePageOrder);

		return mv;
	}
}
