package kr.co.netpoint.vo.project;

import java.util.HashMap;
import java.util.List;

public class SlBoosterVO {
	private int boosterId;
	private int projectId;
	private int questionId;
	private String boosterInfo;
	private String boosterPosition;
	private String boosterType;
	private String regDate;
	private List<String> checkColumnName;
	private List<HashMap> listBoosterData;

	public int getBoosterId() {
		return this.boosterId;
	}

	public void setBoosterId(int boosterId) {
		this.boosterId = boosterId;
	}

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

	public String getBoosterInfo() {
		return this.boosterInfo;
	}

	public void setBoosterInfo(String boosterInfo) {
		this.boosterInfo = boosterInfo;
	}

	public String getBoosterPosition() {
		return this.boosterPosition;
	}

	public void setBoosterPosition(String boosterPosition) {
		this.boosterPosition = boosterPosition;
	}

	public String getBoosterType() {
		return this.boosterType;
	}

	public void setBoosterType(String boosterType) {
		this.boosterType = boosterType;
	}

	public String getRegDate() {
		return this.regDate;
	}

	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}

	public List<String> getCheckColumnName() {
		return this.checkColumnName;
	}

	public void setCheckColumnName(List<String> checkColumnName) {
		this.checkColumnName = checkColumnName;
	}

	public List<HashMap> getListBoosterData() {
		return this.listBoosterData;
	}

	public void setListBoosterData(List<HashMap> listBoosterData) {
		this.listBoosterData = listBoosterData;
	}
}
