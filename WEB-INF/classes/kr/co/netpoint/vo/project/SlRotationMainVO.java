package kr.co.netpoint.vo.project;

import java.util.List;

public class SlRotationMainVO {
	private int rotMainId;
	private String rotMainTitle;
	private String rotMainType;
	private String rotMainSetUser;
	private int projectId;
	private int rotMainQuestionId;
	private String rotMainQuestionName;
	private String rotMainQuestionType;
	private String rotMainQuestionCheckNum;
	private String rotQuestionNames;
	private String rotFinalQuestionName;
	private String exitQuestionName;
	private int rotMMaxCount;
	private String regDate;
	private String delYn;
	private List<SlRotationPartVO> listSlRotationPart;
	private List<SlRotationExampleVO> listSlRotationExample;
	private SlRotationQuestionVO slRotationQuestion;

	public int getRotMainId() {
		return this.rotMainId;
	}

	public void setRotMainId(int rotMainId) {
		this.rotMainId = rotMainId;
	}

	public String getRotMainTitle() {
		return this.rotMainTitle;
	}

	public void setRotMainTitle(String rotMainTitle) {
		this.rotMainTitle = rotMainTitle;
	}

	public String getRotMainType() {
		return this.rotMainType;
	}

	public void setRotMainType(String rotMainType) {
		this.rotMainType = rotMainType;
	}

	public String getRotMainSetUser() {
		return this.rotMainSetUser;
	}

	public void setRotMainSetUser(String rotMainSetUser) {
		this.rotMainSetUser = rotMainSetUser;
	}

	public int getProjectId() {
		return this.projectId;
	}

	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}

	public int getRotMainQuestionId() {
		return this.rotMainQuestionId;
	}

	public void setRotMainQuestionId(int rotMainQuestionId) {
		this.rotMainQuestionId = rotMainQuestionId;
	}

	public String getRotMainQuestionName() {
		return this.rotMainQuestionName;
	}

	public void setRotMainQuestionName(String rotMainQuestionName) {
		this.rotMainQuestionName = rotMainQuestionName;
	}

	public String getRotMainQuestionType() {
		return this.rotMainQuestionType;
	}

	public void setRotMainQuestionType(String rotMainQuestionType) {
		this.rotMainQuestionType = rotMainQuestionType;
	}

	public String getRotMainQuestionCheckNum() {
		return this.rotMainQuestionCheckNum;
	}

	public void setRotMainQuestionCheckNum(String rotMainQuestionCheckNum) {
		this.rotMainQuestionCheckNum = rotMainQuestionCheckNum;
	}

	public String getRotQuestionNames() {
		return rotQuestionNames;
	}

	public void setRotQuestionNames(String rotQuestionNames) {
		this.rotQuestionNames = rotQuestionNames;
	}

	public String getRotFinalQuestionName() {
		return rotFinalQuestionName;
	}

	public void setRotFinalQuestionName(String rotFinalQuestionName) {
		this.rotFinalQuestionName = rotFinalQuestionName;
	}

	public String getExitQuestionName() {
		return exitQuestionName;
	}

	public void setExitQuestionName(String exitQuestionName) {
		this.exitQuestionName = exitQuestionName;
	}

	public int getRotMMaxCount() {
		return rotMMaxCount;
	}

	public void setRotMMaxCount(int rotMMaxCount) {
		this.rotMMaxCount = rotMMaxCount;
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

	public List<SlRotationPartVO> getListSlRotationPart() {
		return this.listSlRotationPart;
	}

	public void setListSlRotationPart(List<SlRotationPartVO> listSlRotationPart) {
		this.listSlRotationPart = listSlRotationPart;
	}

	public List<SlRotationExampleVO> getListSlRotationExample() {
		return this.listSlRotationExample;
	}

	public void setListSlRotationExample(List<SlRotationExampleVO> listSlRotationExample) {
		this.listSlRotationExample = listSlRotationExample;
	}

	public SlRotationQuestionVO getSlRotationQuestion() {
		return this.slRotationQuestion;
	}

	public void setSlRotationQuestion(SlRotationQuestionVO slRotationQuestion) {
		this.slRotationQuestion = slRotationQuestion;
	}
}
