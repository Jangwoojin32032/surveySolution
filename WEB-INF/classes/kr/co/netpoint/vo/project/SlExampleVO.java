package kr.co.netpoint.vo.project;

public class SlExampleVO {
	private int projectId;
	private int questionId;
	private int exampleId;
	private String exampleText;
	private String exampleLogicText;
	private String exampleValue;
	private int exampleOrder;
	private String regDate;
	private String deleteYn;
	private String columnName;

	public int getProjectId() {
		return this.projectId;
	}

	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}

	public int getQuestionId() {
		return this.questionId;
	}

	public void setQuestionId(int questionId) {
		this.questionId = questionId;
	}

	public int getExampleId() {
		return this.exampleId;
	}

	public void setExampleId(int exampleId) {
		this.exampleId = exampleId;
	}

	public String getExampleText() {
		return this.exampleText;
	}

	public void setExampleText(String exampleText) {
		this.exampleText = exampleText;
	}

	public String getExampleLogicText() {
		return exampleLogicText;
	}

	public void setExampleLogicText(String exampleLogicText) {
		this.exampleLogicText = exampleLogicText;
	}

	public String getExampleValue() {
		return this.exampleValue;
	}

	public void setExampleValue(String exampleValue) {
		this.exampleValue = exampleValue;
	}

	public int getExampleOrder() {
		return this.exampleOrder;
	}

	public void setExampleOrder(int exampleOrder) {
		this.exampleOrder = exampleOrder;
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

	public String getColumnName() {
		return this.columnName;
	}

	public void setColumnName(String columnName) {
		this.columnName = columnName;
	}
}
