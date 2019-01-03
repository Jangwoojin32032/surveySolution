package kr.co.netpoint.vo.project;

public class PnProjectVO {
	private int projId;
	private String titleInner;
	private String titleOuter;
	private String projNum;
	private String pmName;

	public int getProjId() {
		return this.projId;
	}

	public void setProjId(int projId) {
		this.projId = projId;
	}

	public String getTitleInner() {
		return this.titleInner;
	}

	public void setTitleInner(String titleInner) {
		this.titleInner = titleInner;
	}

	public String getTitleOuter() {
		return this.titleOuter;
	}

	public void setTitleOuter(String titleOuter) {
		this.titleOuter = titleOuter;
	}

	public String getProjNum() {
		return this.projNum;
	}

	public void setProjNum(String projNum) {
		this.projNum = projNum;
	}

	public String getPmName() {
		return this.pmName;
	}

	public void setPmName(String pmName) {
		this.pmName = pmName;
	}
}
