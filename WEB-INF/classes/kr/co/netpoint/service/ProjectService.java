package kr.co.netpoint.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import kr.co.netpoint.vo.project.PnClientVO;
import kr.co.netpoint.vo.project.PnProjectVO;
import kr.co.netpoint.vo.project.SlBoosterVO;
import kr.co.netpoint.vo.project.SlCustomScriptVO;
import kr.co.netpoint.vo.project.SlExampleVO;
import kr.co.netpoint.vo.project.SlHardCodingVO;
import kr.co.netpoint.vo.project.SlProjectVO;
import kr.co.netpoint.vo.project.SlQuaterCountVO;
import kr.co.netpoint.vo.project.SlQuaterUserVO;
import kr.co.netpoint.vo.project.SlQuaterVO;
import kr.co.netpoint.vo.project.SlQuestionFunctionVO;
import kr.co.netpoint.vo.project.SlQuestionLogicVO;
import kr.co.netpoint.vo.project.SlQuestionVO;
import kr.co.netpoint.vo.project.SlQuestionViewPageVO;
import kr.co.netpoint.vo.project.SlRedirectUrlVO;
import kr.co.netpoint.vo.project.SlRotationExampleVO;
import kr.co.netpoint.vo.project.SlRotationMainVO;
import kr.co.netpoint.vo.project.SlRotationPartVO;
import kr.co.netpoint.vo.project.SlRotationQuestionVO;
import kr.co.netpoint.vo.project.SlSurveyVO;
import kr.co.netpoint.vo.project.TbAnswer2VO;
import kr.co.netpoint.vo.project.TbProjectVO;
import kr.co.netpoint.vo.survey.SurveyInquiryVO;

public interface ProjectService {

	List<PnClientVO> listPnClient(PnClientVO pnClientVO) throws Exception;
	PnProjectVO selectPnProject(PnProjectVO pnProjectVO) throws Exception;
	Map<String,Object> selectClientVendorGroup(String vendorName) throws Exception;
	List<Map<String,Object>> listClientVendorGroup(String vendorName) throws Exception;

	int totalSlProject(SlProjectVO slProjectVO) throws Exception;
	SlProjectVO selectSlProject(SlProjectVO slProjectVO) throws Exception;
	List<SlProjectVO> listSlProject(SlProjectVO slProjectVO) throws Exception;

	boolean insertProject(SlProjectVO slProjectVO) throws Exception;
	boolean updateSlProject(SlProjectVO slProjectVO) throws Exception;

	boolean insertTbProject(TbProjectVO tbProjectVO) throws Exception;
	int selectTbProject(TbProjectVO tbProjectVO) throws Exception;
	boolean updateTbProject(TbProjectVO tbProjectVO) throws Exception;
	String selectCPNOTbProject(TbProjectVO tbProjectVO) throws Exception;
	int selectTbAnswer2(TbAnswer2VO tbAnswer2VO) throws Exception;
	boolean insertTbAnswer2(TbAnswer2VO tbAnswer2VO) throws Exception;

	boolean updateTbProjectCStartDate(SlProjectVO slProjectVO) throws Exception;
	boolean updateTbProjectCEndDate(SlProjectVO slProjectVO) throws Exception;

	boolean insertRedirectUrl(SlRedirectUrlVO slRedirectUrlVO) throws Exception;
	boolean updateRedirectUrl(SlRedirectUrlVO slRedirectUrlVO) throws Exception;

	List<SlRedirectUrlVO> listSlRedirectUrl(SlRedirectUrlVO slRedirectUrlVO) throws Exception;
	boolean deleteSlRedirectUrl(SlRedirectUrlVO slRedirectUrlVO) throws Exception;

	int countSlHardCoding(SlHardCodingVO slHardCodingVO) throws Exception;
	SlHardCodingVO selectSlHardCoding(SlHardCodingVO slHardCodingVO) throws Exception;
	boolean insertSlHardCoding(SlHardCodingVO slHardCodingVO) throws Exception;
	boolean deleteSlHardCoding(SlHardCodingVO slHardCodingVO) throws Exception;
	boolean updateSlHardCoding(SlHardCodingVO slHardCodingVO) throws Exception;

	boolean insertSlQuestion(SlQuestionVO slQuestionVO) throws Exception;
	boolean insertSlExample(SlExampleVO slExampleVO) throws Exception;
	boolean insertSlQuestionFunction(SlQuestionFunctionVO slQuestionFunctionVO) throws Exception;
	boolean updateSlExample(SlExampleVO slExampleVO) throws Exception;
	boolean deleteSlQuestion(int projectId) throws Exception;
	boolean deleteSlExample(int projectId) throws Exception;
	boolean deleteSlQuestionFunction(int projectId) throws Exception;
	boolean deleteSlQuestionLogic(int projectId) throws Exception;
	boolean deleteSlQuestionViewPage(int projectId) throws Exception;

	SlQuestionVO selectSlQuestion(SlQuestionVO slQuestionVO) throws Exception;
	List<SlQuestionVO> listSlQuestion(SlQuestionVO slQuestionVO) throws Exception;

	SlExampleVO selectSlExample(SlExampleVO slExampleVO) throws Exception;
	int countSlExample(SlExampleVO slExampleVO) throws Exception;
	List<SlExampleVO> listSlExample(SlExampleVO slExampleVO) throws Exception;

	SlQuestionFunctionVO selectSlQuestionFunction(SlQuestionFunctionVO slQuestionFunctionVO) throws Exception;
	List<SlQuestionFunctionVO> listSlQuestionFunction(SlQuestionFunctionVO slQuestionFunctionVO) throws Exception;
	List<SlQuestionLogicVO> listSlQuestionLogic(SlQuestionLogicVO slQuestionLogicVO) throws Exception;

	int countSlSurvey(SlSurveyVO slSurveyVO) throws Exception;
	boolean insertSlSurvey(Map sql) throws Exception ;
	boolean updateSlSurvey(Map sql) throws Exception ;
	boolean deleteSlSurvey(SlSurveyVO slSurveyVO) throws Exception;

	int countTable(String tableName) throws Exception;
	int countTableColumn(String tableName, String checkColumnName) throws Exception;
	boolean createTable(Map sql) throws Exception;
	List<HashMap> listTable(Map sql) throws Exception;
	HashMap selectTable(Map sql) throws Exception;
	List<HashMap> listcolumnName(String tableName) throws Exception;

	int countSlQuater(SlQuaterVO slQuaterVO) throws Exception;
	SlQuaterVO selectSlQuater(SlQuaterVO slQuaterVO) throws Exception;
	SlQuaterCountVO selectSlQuaterCount(SlQuaterCountVO slQuaterCountVO) throws Exception;
	SlQuaterUserVO selectSlQuaterUser(SlQuaterUserVO slQuaterUserVO) throws Exception;
	List<SlQuaterVO> listSlQuater(SlQuaterVO slQuaterVO) throws Exception;
	List<SlQuaterCountVO> listSlQuaterCount(SlQuaterCountVO slQuaterCountVO) throws Exception;
	List<SlQuaterUserVO> listSlQuaterUser(SlQuaterUserVO slQuaterUserVO) throws Exception;
	List<SlQuestionFunctionVO> listSlQuaterQuestion(SlQuestionFunctionVO slQuestionFunctionVO);
	boolean insertSlQuater(SlQuaterVO slQuaterVO) throws Exception;
	boolean insertSlQuaterCount(SlQuaterCountVO slQuaterCountVO) throws Exception;
	boolean insertSlQuaterUser(SlQuaterUserVO slQuaterUserVO) throws Exception;
	boolean updateSlSlQuater(SlQuaterVO slQuaterVO) throws Exception;
	boolean updateSlQuaterCount(SlQuaterCountVO slQuaterCountVO) throws Exception;
	boolean updateSlQuaterActiveCount(SlQuaterCountVO slQuaterCountVO) throws Exception;
	boolean updateSlQuaterUser(SlQuaterUserVO slQuaterUserVO) throws Exception;
	boolean deleteSlQuater(SlQuaterVO slQuaterVO) throws Exception;
	boolean deleteSlQuaterCount(SlQuaterCountVO slQuaterCountVO) throws Exception;
	boolean deleteSlQuaterUser(SlQuaterUserVO slQuaterUserVO) throws Exception;
	SlQuestionVO selectMinSlQuestion(SlQuestionVO slQuestionVO);
	String selectSurveyCheckNum(SlQuestionVO slQuestionVO);

	SlBoosterVO selectSlBooster(SlBoosterVO slBoosterVO) throws Exception;
	List<SlBoosterVO> listSlBooster(SlBoosterVO slBoosterVO) throws Exception;
	boolean insertSlBooster(SlBoosterVO slBoosterVO) throws Exception;
	boolean updateSlBooster(SlBoosterVO slBoosterVO) throws Exception;
	boolean deleteSlBooster(SlBoosterVO slBoosterVO) throws Exception;

	int countSlQuestionViewPage(SlQuestionViewPageVO slQuestionViewPageVO) throws Exception;
	SlQuestionViewPageVO selectSlQuestionViewPage(SlQuestionViewPageVO slQuestionViewPageVO) throws Exception;
	List<SlQuestionViewPageVO> listSlQuestionViewPage(SlQuestionViewPageVO slQuestionViewPageVO) throws Exception;
	boolean insertSlQuestionViewPage(SlQuestionViewPageVO slQuestionViewPageVO) throws Exception;
	boolean updateSlQuestionViewPage(SlQuestionViewPageVO slQuestionViewPageVO) throws Exception;
	boolean deleteSlQuestionViewPage(SlQuestionViewPageVO slQuestionViewPageVO) throws Exception;

	boolean insertSlRotationMain(SlRotationMainVO slRotationMainVO) throws Exception;
	boolean insertSlRotationPart(SlRotationPartVO slRotationPartVO) throws Exception;
	boolean insertSlRotationQuestion(SlRotationQuestionVO slRotationQuestionVO, HttpServletRequest request) throws Exception;
	String makeSlRotationQuestionFile(SlRotationQuestionVO slRotationQuestionVO, int rotCount) throws Exception;
	String removeSlRotationQuestionFile(SlRotationQuestionVO slRotationQuestionVO, int rotCount) throws Exception;
	boolean insertSlRotationExample(SlRotationExampleVO slRotationExampleVO) throws Exception;

	boolean updateSlRotationPart(String updateType, SlRotationPartVO slRotationPartVO, SlRotationMainVO slRotationMainVO) throws Exception;
	boolean updateSlRotationQuestion(SlRotationQuestionVO slRotationQuestionVO) throws Exception;

	SlRotationMainVO selectSlRotationMain(SlRotationMainVO slRotationMainVO) throws Exception;
	List<SlRotationMainVO> listSlRotationMain(SlRotationMainVO slRotationMainVO) throws Exception;
	List<SlRotationPartVO> listSlRotationPart(SlRotationPartVO slRotationPartVO) throws Exception;
	SlRotationQuestionVO selectSlRotationQuestion(SlRotationQuestionVO slRotationQuestionVO) throws Exception;
	List<SlRotationQuestionVO> listSlRotationQuestion(SlRotationQuestionVO slRotationQuestionVO) throws Exception;
	List<SlRotationExampleVO> listSlRotationExample(SlRotationExampleVO slRotationExampleVO) throws Exception;

	boolean deleteSlRotationMain(SlRotationMainVO slRotationMainVO) throws Exception;
	boolean deleteSlRotationPart(SlRotationPartVO slRotationPartVO) throws Exception;
	boolean deleteSlRotationQuestion(SlRotationQuestionVO slRotationQuestionVO) throws Exception;
	boolean deleteSlRotationExample(SlRotationExampleVO slRotationExampleVO) throws Exception;

	int countSlRotationMain(SlRotationMainVO slRotationMainVO) throws Exception;
	int countSlRotationQuestion(SlRotationQuestionVO slRotationQuestionVO) throws Exception;

	boolean updateSlQuestionViewPageRotation(int projectId,List<SlRotationQuestionVO> listSlRotationQuestion, int listSlExampleLen, int rotMainId) throws Exception;
	boolean deleteSlQuestionViewPageRotation(int projectId,List<SlRotationQuestionVO> listSlRotationQuestion) throws Exception;

	List<SlCustomScriptVO> listSlCustomScript(SlCustomScriptVO slCustomScript) throws Exception;
	SlCustomScriptVO customScriptContents(SlCustomScriptVO slCustomScriptVO) throws Exception;
	boolean deleteCustomScript(SlCustomScriptVO slCustomScriptVO) throws Exception;
	boolean insertCustomScript(SlCustomScriptVO slCustomScriptVO) throws Exception;
	int countSlCustomScript(SlCustomScriptVO slCustomScriptVO) throws Exception;
	boolean insertInquiry(SurveyInquiryVO surveyInquiryVO) throws Exception;

	boolean webUpdateSlQuestion(SlQuestionVO slQuestionVO) throws Exception;
	boolean webDeleteSlExample(SlQuestionVO slQuestionVO) throws Exception;
	boolean webInsertSlExample(SlExampleVO slExampleVO) throws Exception;
	boolean webDeleteSlQuestionFunction(SlQuestionVO slQuestionVO) throws Exception;
	boolean webInsertSlQuestionFunction(SlQuestionFunctionVO slQuestionFunctionVO) throws Exception;
	int webCountSlBooster(SlQuestionVO slQuestionVO) throws Exception;
	int webCountSlQuoter(SlQuestionVO slQuestionVO) throws Exception;
	int webCountSlRotationMain(SlQuestionVO slQuestionVO) throws Exception;
	int webCountSlRotationQuestion(SlQuestionVO slQuestionVO) throws Exception;
	int webCountSlCustomScript(SlQuestionVO slQuestionVO) throws Exception;
	boolean webDeleteSlQuestionLogic(SlQuestionVO slQuestionVO) throws Exception;
	boolean webInsertSlQuestionLogic(SlQuestionLogicVO slQuestionLogicVO) throws Exception;
	boolean webDeleteSlQuestion(SlQuestionVO slQuestionVO) throws Exception;
	boolean webUpdateSlQuestionOrder(SlQuestionVO slQuestionVO) throws Exception;
	boolean webDeleteSlQuestionViewPage(SlQuestionVO slQuestionVO) throws Exception;
	List<SlQuestionVO> webListSlQuestion(SlQuestionVO slQuestionVO) throws Exception;
	List<SlQuestionViewPageVO> webListSlQuestionViewPage(SlQuestionVO slQuestionVO) throws Exception;
	boolean webUpdateSlQuestionViewPage(SlQuestionViewPageVO slQuestionViewPageVO) throws Exception;
	boolean webInsertSlQuestion(SlQuestionVO slQuestionVO) throws Exception;
	int countSlQuestion(SlQuestionVO slQuestionVO) throws Exception;
	int selectQuestionOrder(SlQuestionVO slQuestionVO) throws Exception;
	boolean webInsertSlQuestionViewPage(SlQuestionViewPageVO slQuestionViewPageVO) throws Exception;

	// 전체문항 복사
	boolean insertCopySlQuestion(SlProjectVO slProjectVO) throws Exception;
	boolean insertCopySlCustomScript(SlProjectVO slProjectVO) throws Exception;
	boolean insertCopySlExample(SlQuestionVO questionVO) throws Exception;
	boolean insertCopySlQuestionLogic(SlQuestionVO questionVO) throws Exception;
	boolean insertCopySlQuestionFunction(SlQuestionVO questionVO) throws Exception;
	boolean insertCopySlQuestionViewPage(SlQuestionVO questionVO) throws Exception;

	// 선택문항 복사
	boolean insertPartcopySlQuestion(SlProjectVO copyProjectVO) throws Exception;
	SlQuestionVO selectPartcopySlQuestion(SlQuestionVO questionVO) throws Exception;
	boolean insertPartcopySlQuestionViewPage(SlQuestionVO questionVO) throws Exception;
	List<SlQuestionVO> partcopySelectQuestion(SlQuestionVO guideQuestionVO) throws Exception;

	// redirectUrl
	boolean updateCType(SlQuestionVO cTypeVO) throws Exception;





}
