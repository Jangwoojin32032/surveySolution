package kr.co.netpoint.vo.project;

public class SlQuaterCountVO {
	private int quaterCountId;
	private int projectId;
	private int quaterTotalCount;
	private int quaterActiveCount;
	private String quaterContent;
	private String quaterPosition;
	private int quaterOrder;
	private String quaterType;
	private String regDate;

	public int getQuaterCountId() {
		return this.quaterCountId;
	}

	public void setQuaterCountId(int quaterCountId) {
		this.quaterCountId = quaterCountId;
	}

	public int getProjectId() {
		return this.projectId;
	}

	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}

	public int getQuaterTotalCount() {
		return this.quaterTotalCount;
	}

	public void setQuaterTotalCount(int quaterTotalCount) {
		this.quaterTotalCount = quaterTotalCount;
	}

	public int getQuaterActiveCount() {
		return this.quaterActiveCount;
	}

	public void setQuaterActiveCount(int quaterActiveCount) {
		this.quaterActiveCount = quaterActiveCount;
	}

	public String getQuaterContent() {
		return this.quaterContent;
	}

	public void setQuaterContent(String quaterContent) {
		this.quaterContent = quaterContent;
	}

	public String getQuaterPosition() {
		return this.quaterPosition;
	}

	public void setQuaterPosition(String quaterPosition) {
		this.quaterPosition = quaterPosition;
	}

	public int getQuaterOrder() {
		return this.quaterOrder;
	}

	public void setQuaterOrder(int quaterOrder) {
		this.quaterOrder = quaterOrder;
	}

	public String getQuaterType() {
		return quaterType;
	}

	public void setQuaterType(String quaterType) {
		this.quaterType = quaterType;
	}

	public String getRegDate() {
		return this.regDate;
	}

	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}
}
