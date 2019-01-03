package kr.co.netpoint.vo.project;

import java.util.List;
import java.util.Map;

public class SlQuestionVO {
	private int projectId;
	private int hardCodingId;
	private int questionId;
	private String questionName;
	private String questionHeader;
	private String questionTitle;
	private String questionFooter;
	private String questionOption;
	private String questionType;
	private String questionDivision;
	private String questionLogic;
	private int questionOrder;
	private int responseLimit;
	private String regDate;
	private String deleteYn;
	private String uCode;
	private String tableName;
	private String surveyState;
	private List<SlExampleVO> listSlExample;
	private List<SlSurveyVO> listSlSurvey;
	private Map<Object, Object> exampleMap;
	private List<SlQuestionFunctionVO> listSlQuestionFunction;
	private List<SlQuestionLogicVO> listSlQuestionLogic;
	private String questionHtml;
	private int pageIndex;
	private String pageId;
	private String pageName;
	private int pageIndex2;
	private String pageId2;
	private String pageName2;
	private String CheckNum;
	private String checkMoveQType;
	private int copyTagetQuestionId;
	private int cType;

	public int getProjectId() {
		return this.projectId;
	}

	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}

	public int getHardCodingId() {
		return this.hardCodingId;
	}

	public void setHardCodingId(int hardCodingId) {
		this.hardCodingId = hardCodingId;
	}

	public int getQuestionId() {
		return this.questionId;
	}

	public void setQuestionId(int questionId) {
		this.questionId = questionId;
	}

	public String getQuestionName() {
		return this.questionName;
	}

	public void setQuestionName(String questionName) {
		this.questionName = questionName;
	}

	public String getQuestionHeader() {
		return questionHeader;
	}

	public void setQuestionHeader(String questionHeader) {
		this.questionHeader = questionHeader;
	}

	public String getQuestionTitle() {
		return this.questionTitle;
	}

	public void setQuestionTitle(String questionTitle) {
		this.questionTitle = questionTitle;
	}

	public String getQuestionFooter() {
		return questionFooter;
	}

	public void setQuestionFooter(String questionFooter) {
		this.questionFooter = questionFooter;
	}

	public String getQuestionOption() {
		return this.questionOption;
	}

	public void setQuestionOption(String questionOption) {
		this.questionOption = questionOption;
	}

	public String getQuestionType() {
		return this.questionType;
	}

	public void setQuestionType(String questionType) {
		this.questionType = questionType;
	}

	public String getQuestionDivision() {
		return this.questionDivision;
	}

	public void setQuestionDivision(String questionDivision) {
		this.questionDivision = questionDivision;
	}

	public String getQuestionLogic() {
		return this.questionLogic;
	}

	public void setQuestionLogic(String questionLogic) {
		this.questionLogic = questionLogic;
	}

	public int getQuestionOrder() {
		return this.questionOrder;
	}

	public void setQuestionOrder(int questionOrder) {
		this.questionOrder = questionOrder;
	}

	public int getResponseLimit() {
		return responseLimit;
	}

	public void setResponseLimit(int responseLimit) {
		this.responseLimit = responseLimit;
	}

	public String getuCode() {
		return this.uCode;
	}

	public void setuCode(String uCode) {
		this.uCode = uCode;
	}

	public String getTableName() {
		return this.tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	public String getSurveyState() {
		return this.surveyState;
	}

	public void setSurveyState(String surveyState) {
		this.surveyState = surveyState;
	}

	public List<SlExampleVO> getListSlExample() {
		return this.listSlExample;
	}

	public void setListSlExample(List<SlExampleVO> listSlExample) {
		this.listSlExample = listSlExample;
	}

	public Map<Object, Object> getExampleMap() {
		return this.exampleMap;
	}

	public void setExampleMap(Map<Object, Object> exampleMap) {
		this.exampleMap = exampleMap;
	}

	public String getRegDate() {
		return this.regDate;
	}

	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}

	public String getDeleteYn() {
		return this.deleteYn;
	}

	public void setDeleteYn(String deleteYn) {
		this.deleteYn = deleteYn;
	}

	public List<SlQuestionFunctionVO> getListSlQuestionFunction() {
		return this.listSlQuestionFunction;
	}

	public void setListSlQuestionFunction(List<SlQuestionFunctionVO> listSlQuestionFunction) {
		this.listSlQuestionFunction = listSlQuestionFunction;
	}

	public List<SlQuestionLogicVO> getListSlQuestionLogic() {
		return listSlQuestionLogic;
	}

	public void setListSlQuestionLogic(List<SlQuestionLogicVO> listSlQuestionLogic) {
		this.listSlQuestionLogic = listSlQuestionLogic;
	}

	public List<SlSurveyVO> getListSlSurvey() {
		return this.listSlSurvey;
	}

	public void setListSlSurvey(List<SlSurveyVO> listSlSurvey) {
		this.listSlSurvey = listSlSurvey;
	}

	public String getCheckNum() {
		return this.CheckNum;
	}

	public void setCheckNum(String checkNum) {
		this.CheckNum = checkNum;
	}

	public String getQuestionHtml() {
		return this.questionHtml;
	}

	public void setQuestionHtml(String questionHtml) {
		this.questionHtml = questionHtml;
	}

	public int getPageIndex() {
		return this.pageIndex;
	}

	public void setPageIndex(int pageIndex) {
		this.pageIndex = pageIndex;
	}

	public String getPageId() {
		return this.pageId;
	}

	public void setPageId(String pageId) {
		this.pageId = pageId;
	}

	public String getPageName() {
		return this.pageName;
	}

	public void setPageName(String pageName) {
		this.pageName = pageName;
	}

	public int getPageIndex2() {
		return this.pageIndex2;
	}

	public void setPageIndex2(int pageIndex2) {
		this.pageIndex2 = pageIndex2;
	}

	public String getPageId2() {
		return this.pageId2;
	}

	public void setPageId2(String pageId2) {
		this.pageId2 = pageId2;
	}

	public String getPageName2() {
		return this.pageName2;
	}

	public void setPageName2(String pageName2) {
		this.pageName2 = pageName2;
	}

	public String getCheckMoveQType() {
		return this.checkMoveQType;
	}

	public void setCheckMoveQType(String checkMoveQType) {
		this.checkMoveQType = checkMoveQType;
	}

	public int getCopyTagetQuestionId() {
		return copyTagetQuestionId;
	}

	public void setCopyTagetQuestionId(int copyTagetQuestionId) {
		this.copyTagetQuestionId = copyTagetQuestionId;
	}

	public int getcType() {
		return cType;
	}

	public void setcType(int cType) {
		this.cType = cType;
	}
}
