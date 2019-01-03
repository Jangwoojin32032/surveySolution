package kr.co.netpoint.vo.survey;

public class SurveyInquiryVO {
	private int projectId;
	private String uCode;
	private String userEmail;
	private String inquiryTitle;
	private String inquiryContents;

	public int getProjectId() {
		return projectId;
	}
	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}
	public String getuCode() {
		return uCode;
	}
	public void setuCode(String uCode) {
		this.uCode = uCode;
	}
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	public String getInquiryTitle() {
		return inquiryTitle;
	}
	public void setInquiryTitle(String inquiryTitle) {
		this.inquiryTitle = inquiryTitle;
	}
	public String getInquiryContents() {
		return inquiryContents;
	}
	public void setInquiryContents(String inquiryContents) {
		this.inquiryContents = inquiryContents;
	}
}
