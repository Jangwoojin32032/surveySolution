package kr.co.netpoint.vo.project;

import java.util.HashMap;

public class SlSurveyVO {
	private int surveyId;
	private String uCode;
	private int projectId;
	private int hardCodingId;
	private int questionId;
	private String questionType;
	private String questionName;
	private String exampleId;
	private int exampleIndex;
	private String exampleText;
	private String exampleValue;
	private String regDate;
	private String deleteYn;
	private String tableName;
	private String projectState;
	private String checkValue;
	private HashMap<String, Object> sql;

	public int getSurveyId() {
		return this.surveyId;
	}

	public void setSurveyId(int surveyId) {
		this.surveyId = surveyId;
	}

	public String getuCode() {
		return this.uCode;
	}

	public void setuCode(String uCode) {
		this.uCode = uCode;
	}

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

	public String getQuestionType() {
		return this.questionType;
	}

	public void setQuestionType(String questionType) {
		this.questionType = questionType;
	}

	public String getQuestionName() {
		return this.questionName;
	}

	public void setQuestionName(String questionName) {
		this.questionName = questionName;
	}

	public String getExampleId() {
		return this.exampleId;
	}

	public void setExampleId(String exampleId) {
		this.exampleId = exampleId;
	}

	public int getExampleIndex() {
		return this.exampleIndex;
	}

	public void setExampleIndex(int exampleIndex) {
		this.exampleIndex = exampleIndex;
	}

	public String getExampleText() {
		return this.exampleText;
	}

	public void setExampleText(String exampleText) {
		this.exampleText = exampleText;
	}

	public String getExampleValue() {
		return this.exampleValue;
	}

	public void setExampleValue(String exampleValue) {
		this.exampleValue = exampleValue;
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

	public String getTableName() {
		return this.tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	public String getProjectState() {
		return this.projectState;
	}

	public void setProjectState(String projectState) {
		this.projectState = projectState;
	}

	public String getCheckValue() {
		return this.checkValue;
	}

	public void setCheckValue(String checkValue) {
		this.checkValue = checkValue;
	}

	public HashMap<String, Object> getSql() {
		return this.sql;
	}

	public void setSql(HashMap<String, Object> sql) {
		this.sql = sql;
	}
}
