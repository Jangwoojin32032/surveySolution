package kr.co.netpoint.vo.project;

import java.util.List;

public class SlBoosterMainVO {
	private int projectId;
	private String checkSave;
	private List<SlBoosterVO> listSlBooster;

	public int getProjectId() {
		return this.projectId;
	}

	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}

	public String getCheckSave() {
		return this.checkSave;
	}

	public void setCheckSave(String checkSave) {
		this.checkSave = checkSave;
	}

	public List<SlBoosterVO> getListSlBooster() {
		return this.listSlBooster;
	}

	public void setListSlBooster(List<SlBoosterVO> listSlBooster) {
		this.listSlBooster = listSlBooster;
	}
}
