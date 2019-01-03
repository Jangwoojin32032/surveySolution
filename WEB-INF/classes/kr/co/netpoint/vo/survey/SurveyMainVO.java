package kr.co.netpoint.vo.survey;

public class SurveyMainVO {
	private int sMainIndex;
	private String sMTitle;
	private String sMText;
	private String sMRegDate;
	private SurveyMainContentVO surveyMainContentVO;

	public int getsMainIndex() {
		return this.sMainIndex;
	}

	public void setsMainIndex(int sMainIndex) {
		this.sMainIndex = sMainIndex;
	}

	public String getsMTitle() {
		return this.sMTitle;
	}

	public void setsMTitle(String sMTitle) {
		this.sMTitle = sMTitle;
	}

	public String getsMText() {
		return this.sMText;
	}

	public void setsMText(String sMText) {
		this.sMText = sMText;
	}

	public String getsMRegDate() {
		return this.sMRegDate;
	}

	public void setsMRegDate(String sMRegDate) {
		this.sMRegDate = sMRegDate;
	}

	public SurveyMainContentVO getSurveyMainContentVO() {
		return this.surveyMainContentVO;
	}

	public void setSurveyMainContentVO(SurveyMainContentVO surveyMainContentVO) {
		this.surveyMainContentVO = surveyMainContentVO;
	}
}
