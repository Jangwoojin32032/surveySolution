package kr.co.netpoint.vo.project;

public class SlRotationQuestionVO {
	private int rotId;
	private int rotPartId;
	private String rotTitle;
	private int projectId;
	private int rotQuestionId;
	private String rotQuestionName;
	private String rotQuestionType;
	private String rotQuestionCheckNum;
	private String rotSaveFileName;
	private String regDate;
	private String delYn;

	public int getRotId() {
		return this.rotId;
	}

	public void setRotId(int rotId) {
		this.rotId = rotId;
	}

	public int getRotPartId() {
		return this.rotPartId;
	}

	public void setRotPartId(int rotPartId) {
		this.rotPartId = rotPartId;
	}

	public String getRotTitle() {
		return this.rotTitle;
	}

	public void setRotTitle(String rotTitle) {
		this.rotTitle = rotTitle;
	}

	public int getProjectId() {
		return this.projectId;
	}

	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}

	public int getRotQuestionId() {
		return this.rotQuestionId;
	}

	public void setRotQuestionId(int rotQuestionId) {
		this.rotQuestionId = rotQuestionId;
	}

	public String getRotQuestionName() {
		return this.rotQuestionName;
	}

	public void setRotQuestionName(String rotQuestionName) {
		this.rotQuestionName = rotQuestionName;
	}

	public String getRotQuestionType() {
		return this.rotQuestionType;
	}

	public void setRotQuestionType(String rotQuestionType) {
		this.rotQuestionType = rotQuestionType;
	}

	public String getRotQuestionCheckNum() {
		return this.rotQuestionCheckNum;
	}

	public void setRotQuestionCheckNum(String rotQuestionCheckNum) {
		this.rotQuestionCheckNum = rotQuestionCheckNum;
	}

	public String getRotSaveFileName() {
		return rotSaveFileName;
	}

	public void setRotSaveFileName(String rotSaveFileName) {
		this.rotSaveFileName = rotSaveFileName;
	}

	public String getRegDate() {
		return this.regDate;
	}

	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}

	public String getDelYn() {
		return this.delYn;
	}

	public void setDelYn(String delYn) {
		this.delYn = delYn;
	}
}
