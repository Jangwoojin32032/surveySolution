package kr.co.netpoint.vo.project;

public class SlQuestionFunctionVO {
	private int projectId;
	private int questionId;
	private int functionId;
	private String functionType;
	private String functionText;
	private String functionValue;
	private int functionOrder;
	private String regDate;
	private String deleteYn;

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

	public int getFunctionId() {
		return this.functionId;
	}

	public void setFunctionId(int functionId) {
		this.functionId = functionId;
	}

	public String getFunctionType() {
		return this.functionType;
	}

	public void setFunctionType(String functionType) {
		this.functionType = functionType;
	}

	public String getFunctionText() {
		return this.functionText;
	}

	public void setFunctionText(String functionText) {
		this.functionText = functionText;
	}

	public String getFunctionValue() {
		return this.functionValue;
	}

	public void setFunctionValue(String functionValue) {
		this.functionValue = functionValue;
	}

	public int getFunctionOrder() {
		return this.functionOrder;
	}

	public void setFunctionOrder(int functionOrder) {
		this.functionOrder = functionOrder;
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
}
