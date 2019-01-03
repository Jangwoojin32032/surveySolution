package kr.co.netpoint.vo.project;

public class SlQuestionLogicVO {
	private int projectId;
	private int questionId;
	private int logicId;
	private String logicType;
	private String state;
	private String questionNameBase;
	private String exampleNameBase;
	private String exampleValueBase;
	private String questionNameTarget;
	private String exampleNameTarget;
	private String exampleValueTarget;

	public int getProjectId() {
		return projectId;
	}
	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}
	public int getQuestionId() {
		return questionId;
	}
	public void setQuestionId(int questionId) {
		this.questionId = questionId;
	}
	public int getLogicId() {
		return logicId;
	}
	public void setLogicId(int logicId) {
		this.logicId = logicId;
	}
	public String getLogicType() {
		return logicType;
	}
	public void setLogicType(String logicType) {
		this.logicType = logicType;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getQuestionNameBase() {
		return questionNameBase;
	}
	public void setQuestionNameBase(String questionNameBase) {
		this.questionNameBase = questionNameBase;
	}
	public String getExampleNameBase() {
		return exampleNameBase;
	}
	public void setExampleNameBase(String exampleNameBase) {
		this.exampleNameBase = exampleNameBase;
	}
	public String getExampleValueBase() {
		return exampleValueBase;
	}
	public void setExampleValueBase(String exampleValueBase) {
		this.exampleValueBase = exampleValueBase;
	}
	public String getQuestionNameTarget() {
		return questionNameTarget;
	}
	public void setQuestionNameTarget(String questionNameTarget) {
		this.questionNameTarget = questionNameTarget;
	}
	public String getExampleNameTarget() {
		return exampleNameTarget;
	}
	public void setExampleNameTarget(String exampleNameTarget) {
		this.exampleNameTarget = exampleNameTarget;
	}
	public String getExampleValueTarget() {
		return exampleValueTarget;
	}
	public void setExampleValueTarget(String exampleValueTarget) {
		this.exampleValueTarget = exampleValueTarget;
	}

}
