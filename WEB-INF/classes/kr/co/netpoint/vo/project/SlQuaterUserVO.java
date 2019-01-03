package kr.co.netpoint.vo.project;

public class SlQuaterUserVO {
	private int quaterUserId;
	private int projectId;
	private String questionContent;
	private String quaterInOut;
	private String regDate;

	public int getQuaterUserId() {
		return this.quaterUserId;
	}

	public void setQuaterUserId(int quaterUserId) {
		this.quaterUserId = quaterUserId;
	}

	public int getProjectId() {
		return this.projectId;
	}

	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}

	public String getQuestionContent() {
		return this.questionContent;
	}

	public void setQuestionContent(String questionContent) {
		this.questionContent = questionContent;
	}

	public String getQuaterInOut() {
		return this.quaterInOut;
	}

	public void setQuaterInOut(String quaterInOut) {
		this.quaterInOut = quaterInOut;
	}

	public String getRegDate() {
		return this.regDate;
	}

	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}
}
