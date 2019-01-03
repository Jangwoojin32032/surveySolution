package kr.co.netpoint.vo.project;

import java.util.List;

public class SlQuaterVO {
	private int quaterId;
	private int projectId;
	private String quaterRowInfo;
	private String quaterRowQueName;
	private String quaterRowQueId;
	private String quaterColInfo;
	private String quaterColQueName;
	private String quaterColQueId;
	private String quaterType;
	private String regDate;
	private List<SlQuaterCountVO> listSlQuaterCount;

	public int getQuaterId() {
		return this.quaterId;
	}

	public void setQuaterId(int quaterId) {
		this.quaterId = quaterId;
	}

	public int getProjectId() {
		return this.projectId;
	}

	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}

	public String getQuaterRowInfo() {
		return this.quaterRowInfo;
	}

	public void setQuaterRowInfo(String quaterRowInfo) {
		this.quaterRowInfo = quaterRowInfo;
	}

	public String getQuaterColQueName() {
		return quaterColQueName;
	}

	public void setQuaterColQueName(String quaterColQueName) {
		this.quaterColQueName = quaterColQueName;
	}

	public String getQuaterColQueId() {
		return quaterColQueId;
	}

	public void setQuaterColQueId(String quaterColQueId) {
		this.quaterColQueId = quaterColQueId;
	}

	public String getQuaterColInfo() {
		return this.quaterColInfo;
	}

	public void setQuaterColInfo(String quaterColInfo) {
		this.quaterColInfo = quaterColInfo;
	}

	public String getQuaterRowQueName() {
		return quaterRowQueName;
	}

	public void setQuaterRowQueName(String quaterRowQueName) {
		this.quaterRowQueName = quaterRowQueName;
	}

	public String getQuaterRowQueId() {
		return quaterRowQueId;
	}

	public void setQuaterRowQueId(String quaterRowQueId) {
		this.quaterRowQueId = quaterRowQueId;
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

	public List<SlQuaterCountVO> getListSlQuaterCount() {
		return this.listSlQuaterCount;
	}

	public void setListSlQuaterCount(List<SlQuaterCountVO> listSlQuaterCount) {
		this.listSlQuaterCount = listSlQuaterCount;
	}
}
