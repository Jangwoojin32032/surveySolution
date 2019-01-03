package kr.co.netpoint.vo.project;

import java.util.List;

import kr.co.netpoint.vo.SearchVO;

public class SlProjectVO {
	private int projectId;
	private int projId;
	private String projectNum;
	private String businessId;
	private String jobCode;
	private String projectNameInner;
	private String projectNameOuter;
	private String surveyDisign;
	private String customerCode;
	private String pmCode;
	private String usePc;
	private String useMobile;
	private String logoImgDirectory;
	private String logoImgFullPath;
	private String logoImgSaveName;
	private String logoImgOriginalName;
	private String useBack;
	private String useResearBanner;
	private String useResearList;
	private String useLanguage;
	private String surveyUrl;
	private String serveyTestUrl;
	private String useTest;
	private String useFollowing;
	private String projectState;
	private String quater;
	private String cpno;
	private String regDate;
	private int hardCodingId;
	private List<SlRedirectUrlVO> listSlRedirectUrl;
	private SlQuaterCountVO selectSlQuaterCount;
	private List<SlQuestionVO> listQuestionHtml;
	private String rNum;
	private int sRNum;
	private int eRNum;
	private String serveyGoPath;
	private SearchVO searchVO;
	private int copyTagetProjectId;
	private int copyTagetQuestionId;
	private String copyTagetQuestionName;
	private int insertQuestionId;
	private int insertQuestionOrder;

	public int getProjectId() {
		return this.projectId;
	}

	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}

	public int getProjId() {
		return this.projId;
	}

	public void setProjId(int projId) {
		this.projId = projId;
	}

	public String getProjectNum() {
		return this.projectNum;
	}

	public void setProjectNum(String projectNum) {
		this.projectNum = projectNum;
	}

	public String getBusinessId() {
		return this.businessId;
	}

	public void setBusinessId(String businessId) {
		this.businessId = businessId;
	}

	public String getJobCode() {
		return this.jobCode;
	}

	public void setJobCode(String jobCode) {
		this.jobCode = jobCode;
	}

	public String getProjectNameInner() {
		return this.projectNameInner;
	}

	public void setProjectNameInner(String projectNameInner) {
		this.projectNameInner = projectNameInner;
	}

	public String getProjectNameOuter() {
		return this.projectNameOuter;
	}

	public void setProjectNameOuter(String projectNameOuter) {
		this.projectNameOuter = projectNameOuter;
	}

	public String getSurveyDisign() {
		return this.surveyDisign;
	}

	public void setSurveyDisign(String surveyDisign) {
		this.surveyDisign = surveyDisign;
	}

	public String getCustomerCode() {
		return this.customerCode;
	}

	public void setCustomerCode(String customerCode) {
		this.customerCode = customerCode;
	}

	public String getPmCode() {
		return this.pmCode;
	}

	public void setPmCode(String pmCode) {
		this.pmCode = pmCode;
	}

	public String getUsePc() {
		return this.usePc;
	}

	public void setUsePc(String usePc) {
		this.usePc = usePc;
	}

	public String getLogoImgDirectory() {
		return this.logoImgDirectory;
	}

	public void setLogoImgDirectory(String logoImgDirectory) {
		this.logoImgDirectory = logoImgDirectory;
	}

	public String getLogoImgFullPath() {
		return this.logoImgFullPath;
	}

	public void setLogoImgFullPath(String logoImgFullPath) {
		this.logoImgFullPath = logoImgFullPath;
	}

	public String getLogoImgSaveName() {
		return this.logoImgSaveName;
	}

	public void setLogoImgSaveName(String logoImgSaveName) {
		this.logoImgSaveName = logoImgSaveName;
	}

	public String getLogoImgOriginalName() {
		return this.logoImgOriginalName;
	}

	public void setLogoImgOriginalName(String logoImgOriginalName) {
		this.logoImgOriginalName = logoImgOriginalName;
	}

	public String getUseBack() {
		return this.useBack;
	}

	public void setUseBack(String useBack) {
		this.useBack = useBack;
	}

	public String getUseResearBanner() {
		return this.useResearBanner;
	}

	public void setUseResearBanner(String useResearBanner) {
		this.useResearBanner = useResearBanner;
	}

	public String getUseResearList() {
		return this.useResearList;
	}

	public void setUseResearList(String useResearList) {
		this.useResearList = useResearList;
	}

	public String getUseLanguage() {
		return this.useLanguage;
	}

	public void setUseLanguage(String useLanguage) {
		this.useLanguage = useLanguage;
	}

	public String getSurveyUrl() {
		return this.surveyUrl;
	}

	public void setSurveyUrl(String surveyUrl) {
		this.surveyUrl = surveyUrl;
	}

	public String getServeyTestUrl() {
		return this.serveyTestUrl;
	}

	public void setServeyTestUrl(String serveyTestUrl) {
		this.serveyTestUrl = serveyTestUrl;
	}

	public String getUseTest() {
		return this.useTest;
	}

	public void setUseTest(String useTest) {
		this.useTest = useTest;
	}

	public String getProjectState() {
		return this.projectState;
	}

	public void setProjectState(String projectState) {
		this.projectState = projectState;
	}

	public String getQuater() {
		return this.quater;
	}

	public void setQuater(String quater) {
		this.quater = quater;
	}

	public String getCpno() {
		return cpno;
	}

	public void setCpno(String cpno) {
		this.cpno = cpno;
	}

	public String getRegDate() {
		return this.regDate;
	}

	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}

	public List<SlRedirectUrlVO> getListSlRedirectUrl() {
		return this.listSlRedirectUrl;
	}

	public void setListSlRedirectUrl(List<SlRedirectUrlVO> listSlRedirectUrl) {
		this.listSlRedirectUrl = listSlRedirectUrl;
	}

	public SlQuaterCountVO getSelectSlQuaterCount() {
		return this.selectSlQuaterCount;
	}

	public void setSelectSlQuaterCount(SlQuaterCountVO selectSlQuaterCount) {
		this.selectSlQuaterCount = selectSlQuaterCount;
	}

	public String getrNum() {
		return this.rNum;
	}

	public void setrNum(String rNum) {
		this.rNum = rNum;
	}

	public int getsRNum() {
		return this.sRNum;
	}

	public void setsRNum(int sRNum) {
		this.sRNum = sRNum;
	}

	public int geteRNum() {
		return this.eRNum;
	}

	public void seteRNum(int eRNum) {
		this.eRNum = eRNum;
	}

	public SearchVO getSearchVO() {
		return this.searchVO;
	}

	public void setSearchVO(SearchVO searchVO) {
		this.searchVO = searchVO;
	}

	public int getHardCodingId() {
		return this.hardCodingId;
	}

	public void setHardCodingId(int hardCodingId) {
		this.hardCodingId = hardCodingId;
	}

	public String getUseMobile() {
		return this.useMobile;
	}

	public void setUseMobile(String useMobile) {
		this.useMobile = useMobile;
	}

	public String getUseFollowing() {
		return this.useFollowing;
	}

	public void setUseFollowing(String useFollowing) {
		this.useFollowing = useFollowing;
	}

	public String getServeyGoPath() {
		return this.serveyGoPath;
	}

	public void setServeyGoPath(String serveyGoPath) {
		this.serveyGoPath = serveyGoPath;
	}

	public List<SlQuestionVO> getListQuestionHtml() {
		return this.listQuestionHtml;
	}

	public void setListQuestionHtml(List<SlQuestionVO> listQuestionHtml) {
		this.listQuestionHtml = listQuestionHtml;
	}

	public int getCopyTagetProjectId() {
		return copyTagetProjectId;
	}

	public void setCopyTagetProjectId(int copyTagetProjectId) {
		this.copyTagetProjectId = copyTagetProjectId;
	}

	public int getCopyTagetQuestionId() {
		return copyTagetQuestionId;
	}

	public void setCopyTagetQuestionId(int copyTagetQuestionId) {
		this.copyTagetQuestionId = copyTagetQuestionId;
	}

	public String getCopyTagetQuestionName() {
		return copyTagetQuestionName;
	}

	public void setCopyTagetQuestionName(String copyTagetQuestionName) {
		this.copyTagetQuestionName = copyTagetQuestionName;
	}

	public int getInsertQuestionId() {
		return insertQuestionId;
	}

	public void setInsertQuestionId(int insertQuestionId) {
		this.insertQuestionId = insertQuestionId;
	}

	public int getInsertQuestionOrder() {
		return insertQuestionOrder;
	}

	public void setInsertQuestionOrder(int insertQuestionOrder) {
		this.insertQuestionOrder = insertQuestionOrder;
	}
}
