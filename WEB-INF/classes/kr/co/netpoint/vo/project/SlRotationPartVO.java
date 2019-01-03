package kr.co.netpoint.vo.project;

import java.util.List;

public class SlRotationPartVO {
	private int rotPartId;
	private int rotMainId;
	private String rotPartTitle;
	private int rotPartOrder;
	private int projectId;
	private int rotPMaxCount;
	private String regDate;
	private String delYn;
	private List<SlRotationQuestionVO> listSlRotationQuestion;

	public int getRotPartId() {
		return this.rotPartId;
	}

	public void setRotPartId(int rotPartId) {
		this.rotPartId = rotPartId;
	}

	public int getRotMainId() {
		return this.rotMainId;
	}

	public void setRotMainId(int rotMainId) {
		this.rotMainId = rotMainId;
	}

	public String getRotPartTitle() {
		return this.rotPartTitle;
	}

	public void setRotPartTitle(String rotPartTitle) {
		this.rotPartTitle = rotPartTitle;
	}

	public int getRotPartOrder() {
		return this.rotPartOrder;
	}

	public void setRotPartOrder(int rotPartOrder) {
		this.rotPartOrder = rotPartOrder;
	}

	public int getProjectId() {
		return this.projectId;
	}

	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}
	
	public int getRotPMaxCount() {
		return rotPMaxCount;
	}

	public void setRotPMaxCount(int rotPMaxCount) {
		this.rotPMaxCount = rotPMaxCount;
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

	public List<SlRotationQuestionVO> getListSlRotationQuestion() {
		return this.listSlRotationQuestion;
	}

	public void setListSlRotationQuestion(List<SlRotationQuestionVO> listSlRotationQuestion) {
		this.listSlRotationQuestion = listSlRotationQuestion;
	}
}
