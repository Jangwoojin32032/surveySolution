package kr.co.netpoint.vo.project;

public class SlCustomScriptVO {
	private int projectId;
	private int customScriptId;
	private String customScriptGubun;
	private String customScriptName;
	private String customScriptContents;
	private String customScriptApplyQuestion;
	private String customScriptApplyCount;
	private String codeId;
	private String regDate;
	private String deleteYn;

	public int getProjectId() {
		return projectId;
	}
	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}
	public int getCustomScriptId() {
		return customScriptId;
	}
	public void setCustomScriptId(int customScriptId) {
		this.customScriptId = customScriptId;
	}
	public String getCustomScriptGubun() {
		return customScriptGubun;
	}
	public void setCustomScriptGubun(String customScriptGubun) {
		this.customScriptGubun = customScriptGubun;
	}
	public String getCustomScriptName() {
		return customScriptName;
	}
	public void setCustomScriptName(String customScriptName) {
		this.customScriptName = customScriptName;
	}
	public String getCustomScriptContents() {
		return customScriptContents;
	}
	public void setCustomScriptContents(String customScriptContents) {
		this.customScriptContents = customScriptContents;
	}
	public String getCustomScriptApplyQuestion() {
		return customScriptApplyQuestion;
	}
	public void setCustomScriptApplyQuestion(String customScriptApplyQuestion) {
		this.customScriptApplyQuestion = customScriptApplyQuestion;
	}
	public String getCustomScriptApplyCount() {
		return customScriptApplyCount;
	}
	public void setCustomScriptApplyCount(String customScriptApplyCount) {
		this.customScriptApplyCount = customScriptApplyCount;
	}
	public String getCodeId() {
		return codeId;
	}
	public void setCodeId(String codeId) {
		this.codeId = codeId;
	}
	public String getRegDate() {
		return regDate;
	}
	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}
	public String getDeleteYn() {
		return deleteYn;
	}
	public void setDeleteYn(String deleteYn) {
		this.deleteYn = deleteYn;
	}
}
