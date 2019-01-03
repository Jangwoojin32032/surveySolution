package kr.co.netpoint.vo.project;

import java.util.List;

public class SlQuestionViewPageVO {
	private int vPageId;
	private int projectId;
	private String pageTitleQuestionId;
	private String pageTitleQuestionName;
	private String pageTitleQuestionCheckNum;
	private String pageQuestionIds;
	private String pageQuestionNames;
	private int pageOrder;
	private String pageType;
	private String regdate;
	private String questionType;
	private String checkMoveQType;
	private List<SlQuestionVO> listSlQuestion;
	private String deleteType;

	public int getvPageId() {
		return this.vPageId;
	}

	public void setvPageId(int vPageId) {
		this.vPageId = vPageId;
	}

	public int getProjectId() {
		return this.projectId;
	}

	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}

	public String getPageTitleQuestionId() {
		return this.pageTitleQuestionId;
	}

	public void setPageTitleQuestionId(String pageTitleQuestionId) {
		this.pageTitleQuestionId = pageTitleQuestionId;
	}

	public String getPageTitleQuestionName() {
		return this.pageTitleQuestionName;
	}

	public void setPageTitleQuestionName(String pageTitleQuestionName) {
		this.pageTitleQuestionName = pageTitleQuestionName;
	}

	public String getPageTitleQuestionCheckNum() {
		return this.pageTitleQuestionCheckNum;
	}

	public void setPageTitleQuestionCheckNum(String pageTitleQuestionCheckNum) {
		this.pageTitleQuestionCheckNum = pageTitleQuestionCheckNum;
	}

	public String getPageQuestionIds() {
		return this.pageQuestionIds;
	}

	public void setPageQuestionIds(String pageQuestionIds) {
		this.pageQuestionIds = pageQuestionIds;
	}

	public String getPageQuestionNames() {
		return this.pageQuestionNames;
	}

	public void setPageQuestionNames(String pageQuestionNames) {
		this.pageQuestionNames = pageQuestionNames;
	}

	public int getPageOrder() {
		return this.pageOrder;
	}

	public void setPageOrder(int pageOrder) {
		this.pageOrder = pageOrder;
	}
	
	public String getPageType() {
		return pageType;
	}

	public void setPageType(String pageType) {
		this.pageType = pageType;
	}

	public String getRegdate() {
		return this.regdate;
	}

	public void setRegdate(String regdate) {
		this.regdate = regdate;
	}

	public List<SlQuestionVO> getListSlQuestion() {
		return this.listSlQuestion;
	}

	public void setListSlQuestion(List<SlQuestionVO> listSlQuestion) {
		this.listSlQuestion = listSlQuestion;
	}

	public String getQuestionType() {
		return this.questionType;
	}

	public void setQuestionType(String questionType) {
		this.questionType = questionType;
	}

	public String getCheckMoveQType() {
		return this.checkMoveQType;
	}

	public void setCheckMoveQType(String checkMoveQType) {
		this.checkMoveQType = checkMoveQType;
	}

	public String getDeleteType() {
		return deleteType;
	}

	public void setDeleteType(String deleteType) {
		this.deleteType = deleteType;
	}
	
}
