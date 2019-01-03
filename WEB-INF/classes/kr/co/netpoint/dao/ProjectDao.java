package kr.co.netpoint.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import kr.co.netpoint.vo.project.PnClientVO;
import kr.co.netpoint.vo.project.PnProjectVO;
import kr.co.netpoint.vo.project.SlBoosterVO;
import kr.co.netpoint.vo.project.SlCustomScriptVO;
import kr.co.netpoint.vo.project.SlExampleVO;
import kr.co.netpoint.vo.project.SlHardCodingVO;
import kr.co.netpoint.vo.project.SlProjectVO;
import kr.co.netpoint.vo.project.SlQuaterCountVO;
import kr.co.netpoint.vo.project.SlQuaterUserVO;
import kr.co.netpoint.vo.project.SlQuaterVO;
import kr.co.netpoint.vo.project.SlQuestionFunctionVO;
import kr.co.netpoint.vo.project.SlQuestionLogicVO;
import kr.co.netpoint.vo.project.SlQuestionVO;
import kr.co.netpoint.vo.project.SlQuestionViewPageVO;
import kr.co.netpoint.vo.project.SlRedirectUrlVO;
import kr.co.netpoint.vo.project.SlRotationExampleVO;
import kr.co.netpoint.vo.project.SlRotationMainVO;
import kr.co.netpoint.vo.project.SlRotationPartVO;
import kr.co.netpoint.vo.project.SlRotationQuestionVO;
import kr.co.netpoint.vo.project.SlSurveyVO;
import kr.co.netpoint.vo.project.TbAnswer2VO;
import kr.co.netpoint.vo.project.TbProjectVO;
import kr.co.netpoint.vo.survey.SurveyInquiryVO;

@Repository("ProjectDao")
public class ProjectDao {

	private static final String oProjectNameSpace = "oProject";
	private static final String mProjectNameSpace = "mProject";
	private static final String msProjectNameSpace = "msProject";

	@Resource(name = "oracleSqlSessionTemplate")
	SqlSessionTemplate oracleSqlSessionTemplate;

	@Resource(name = "mysqlSqlSessionTemplate")
	SqlSessionTemplate mysqlSqlSessionTemplate;

	@Resource(name = "mssqlSqlSessionTemplate")
	SqlSessionTemplate mssqlSqlSessionTemplate;

	public List<PnClientVO> listPnClient(PnClientVO pnClientVO) {
		return this.oracleSqlSessionTemplate.selectList("oProject.listPnClient", pnClientVO);
	}

	public PnProjectVO selectPnProject(PnProjectVO pnProjectVO) {
		return (PnProjectVO) this.oracleSqlSessionTemplate.selectOne("oProject.selectPnProject", pnProjectVO);
	}

	public Map<String, Object> selectClientVendorGroup(String vendorName) {
		return (Map) this.oracleSqlSessionTemplate.selectOne("oProject.selectClientVendorGroup", vendorName);
	}

	public List<Map<String, Object>> listClientVendorGroup(String vendorName) {
		return this.oracleSqlSessionTemplate.selectList("oProject.selectClientVendorGroup", vendorName);
	}

	public int totalSlProject(SlProjectVO slProjectVO) {
		return ((Integer) this.mysqlSqlSessionTemplate.selectOne("mProject.totalSlProject", slProjectVO)).intValue();
	}

	public List<SlProjectVO> listSlProject(SlProjectVO slProjectVO) {
		return this.mysqlSqlSessionTemplate.selectList("mProject.listSlProject", slProjectVO);
	}

	public SlProjectVO selectSlProject(SlProjectVO slProjectVO) {
		return (SlProjectVO) this.mysqlSqlSessionTemplate.selectOne("mProject.selectSlProject", slProjectVO);
	}

	public boolean insertProject(SlProjectVO slProjectVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.insert("mProject.insertProject", slProjectVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean insertTbProject(TbProjectVO tbProjectVO) {
		boolean returnVal = false;
		try {
			this.mssqlSqlSessionTemplate.insert("msProject.insertTbProject", tbProjectVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public int selectTbProject(TbProjectVO tbProjectVO) {
		return this.mssqlSqlSessionTemplate.selectOne("msProject.selectTbProject", tbProjectVO);
	}

	public boolean updateTbProject(TbProjectVO tbProjectVO) {
		boolean returnVal = false;
		try {
			this.mssqlSqlSessionTemplate.update("msProject.updateTbProject", tbProjectVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}


	public boolean updateTbProjectCStartDate(SlProjectVO slProjectVO) {
		boolean returnVal = false;
		try {
			this.mssqlSqlSessionTemplate.update("msProject.updateTbProjectCStartDate", slProjectVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean updateTbProjectCEndDate(SlProjectVO slProjectVO) {
		boolean returnVal = false;
		try {
			this.mssqlSqlSessionTemplate.update("msProject.updateTbProjectCEndDate", slProjectVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public String selectCPNOTbProject(TbProjectVO tbProjectVO) {
		return (String) this.mssqlSqlSessionTemplate.selectOne("msProject.selectCPNOTbProject", tbProjectVO);
	}

	public int selectTbAnswer2(TbAnswer2VO tbAnswer2VO) {
		return this.mssqlSqlSessionTemplate.selectOne("msProject.selectTbAnswer2", tbAnswer2VO);
	}

	public boolean insertTbAnswer2(TbAnswer2VO tbAnswer2VO) {
		boolean returnVal = false;
		try {
			this.mssqlSqlSessionTemplate.insert("msProject.insertTbAnswer2", tbAnswer2VO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean insertRedirectUrl(SlRedirectUrlVO slRedirectUrlVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.insert("mProject.insertRedirectUrl", slRedirectUrlVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean updateSlProject(SlProjectVO slProjectVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.update("mProject.updateSlProject", slProjectVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean updateRedirectUrl(SlRedirectUrlVO slRedirectUrlVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.update("mProject.updateRedirectUrl", slRedirectUrlVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean deleteSlRedirectUrl(SlRedirectUrlVO slRedirectUrlVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.update("mProject.deleteSlRedirectUrl", slRedirectUrlVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public List<SlRedirectUrlVO> listSlRedirectUrl(SlRedirectUrlVO slRedirectUrlVO) {
		return this.mysqlSqlSessionTemplate.selectList("mProject.listSlRedirectUrl", slRedirectUrlVO);
	}

	public int countSlHardCoding(SlHardCodingVO slHardCodingVO) {
		return this.mysqlSqlSessionTemplate.selectOne("mProject.countSlHardCoding", slHardCodingVO);
	}
	public SlHardCodingVO selectSlHardCoding(SlHardCodingVO slHardCodingVO) {
		return (SlHardCodingVO) this.mysqlSqlSessionTemplate.selectOne("mProject.selectSlHardCoding", slHardCodingVO);
	}

	public boolean insertSlHardCoding(SlHardCodingVO slHardCodingVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.insert("mProject.insertSlHardCoding", slHardCodingVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}
	public boolean deleteSlHardCoding(SlHardCodingVO slHardCodingVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.delete("mProject.deleteSlHardCoding", slHardCodingVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}
	public boolean updateSlHardCoding(SlHardCodingVO slHardCodingVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.update("mProject.updateSlHardCoding", slHardCodingVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean insertSlQuestion(SlQuestionVO slQuestionVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.insert("mProject.insertSlQuestion", slQuestionVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean insertSlExample(SlExampleVO slExampleVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.insert("mProject.insertSlExample", slExampleVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean updateSlExample(SlExampleVO slExampleVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.insert("mProject.updateSlExample", slExampleVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean deleteSlQuestion(int projectId) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.delete("mProject.deleteSlQuestion", Integer.valueOf(projectId));
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean deleteSlExample(int projectId) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.delete("mProject.deleteSlExample", Integer.valueOf(projectId));
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}
	public boolean deleteSlQuestionLogic(int projectId) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.delete("mProject.deleteSlQuestionLogic", Integer.valueOf(projectId));
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}


	public SlQuestionVO selectSlQuestion(SlQuestionVO slQuestionVO) {
		return (SlQuestionVO) this.mysqlSqlSessionTemplate.selectOne("mProject.selectSlQuestion", slQuestionVO);
	}

	public SlQuestionVO selectMinSlQuestion(SlQuestionVO slQuestionVO) {
		return (SlQuestionVO) this.mysqlSqlSessionTemplate.selectOne("mProject.selectMinSlQuestion", slQuestionVO);
	}

	public List<SlQuestionVO> listSlQuestion(SlQuestionVO slQuestionVO) {
		return this.mysqlSqlSessionTemplate.selectList("mProject.selectSlQuestion", slQuestionVO);
	}

	public SlExampleVO selectSlExample(SlExampleVO slExampleVO) {
		return (SlExampleVO) this.mysqlSqlSessionTemplate.selectOne("mProject.selectSlExample", slExampleVO);
	}

	public int countSlExample(SlExampleVO slExampleVO) {
		return this.mysqlSqlSessionTemplate.selectOne("mProject.countSlExample", slExampleVO);
	}
	public List<SlExampleVO> listSlExample(SlExampleVO slExampleVO) {
		return this.mysqlSqlSessionTemplate.selectList("mProject.selectSlExample", slExampleVO);
	}

	public boolean insertSlQuestionFunction(SlQuestionFunctionVO slQuestionFunctionVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.insert("mProject.insertSlQuestionFunction", slQuestionFunctionVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean deleteSlQuestionFunction(int projectId) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.delete("mProject.deleteSlQuestionFunction", Integer.valueOf(projectId));
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean deleteSlQuestionViewPage(int projectId) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.delete("mProject.deleteSlQuestionViewPage", Integer.valueOf(projectId));
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public SlQuestionFunctionVO selectSlQuestionFunction(SlQuestionFunctionVO slQuestionFunctionVO) {
		return this.mysqlSqlSessionTemplate.selectOne("mProject.selectSlQuestionFunction", slQuestionFunctionVO);
	}

	public List<SlQuestionFunctionVO> listSlQuestionFunction(SlQuestionFunctionVO slQuestionFunctionVO) {
		return this.mysqlSqlSessionTemplate.selectList("mProject.selectSlQuestionFunction", slQuestionFunctionVO);
	}

	public List<SlQuestionLogicVO> listSlQuestionLogic(SlQuestionLogicVO slQuestionLogicVO) {
		return this.mysqlSqlSessionTemplate.selectList("mProject.selectSlQuestionLogic", slQuestionLogicVO);
	}

	public int countSlSurvey(SlSurveyVO slSurveyVO) {
		return ((Integer) this.mysqlSqlSessionTemplate.selectOne("mProject.countSlSurvey", slSurveyVO)).intValue();
	}

	public int countTable(String tableName) {
		return ((Integer) this.mysqlSqlSessionTemplate.selectOne("mProject.countTable", tableName)).intValue();
	}

	public int countTableColumn(String tableName, String columnName) {
		HashMap<String,Object> map = new HashMap<String,Object>();
		map.put("tablename", tableName);
		map.put("columnname", columnName);
		return this.mysqlSqlSessionTemplate.selectOne("mProject.countTableColumn", map);
	}

	public boolean insertSlSurvey(Map sql) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.insert("mProject.insertSlSurvey", sql);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean updateSlSurvey(Map sql) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.update("mProject.updateSlSurvey", sql);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean deleteSlSurvey(SlSurveyVO slSurveyVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.delete("mProject.deleteSlSurvey", slSurveyVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean createTable(Map sql) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.insert("mProject.createTable", sql);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public List<HashMap> listcolumnName(String tableName) {
		return this.mysqlSqlSessionTemplate.selectList("mProject.listcolumnName", tableName);
	}

	public HashMap selectTable(Map sql) {
		return (HashMap) this.mysqlSqlSessionTemplate.selectOne("mProject.selectTable", sql);
	}

	public List<HashMap> listTable(Map sql) {
		return this.mysqlSqlSessionTemplate.selectList("mProject.selectTable", sql);
	}

	public int countSlQuater(SlQuaterVO slQuaterVO) {
		return ((Integer) this.mysqlSqlSessionTemplate.selectOne("mProject.countSlQuater", slQuaterVO)).intValue();
	}

	public SlQuaterVO selectSlQuater(SlQuaterVO slQuaterVO) {
		return (SlQuaterVO) this.mysqlSqlSessionTemplate.selectOne("mProject.selectSlQuater", slQuaterVO);
	}

	public SlQuaterCountVO selectSlQuaterCount(SlQuaterCountVO slQuaterCountVO) {
		return (SlQuaterCountVO) this.mysqlSqlSessionTemplate.selectOne("mProject.selectSlQuaterCount",
				slQuaterCountVO);
	}

	public SlQuaterUserVO selectSlQuaterUser(SlQuaterUserVO slQuaterUserVO) {
		return (SlQuaterUserVO) this.mysqlSqlSessionTemplate.selectOne("mProject.selectSlQuaterUser", slQuaterUserVO);
	}

	public List<SlQuaterVO> listSlQuater(SlQuaterVO slQuaterVO) {
		return this.mysqlSqlSessionTemplate.selectList("mProject.selectSlQuater", slQuaterVO);
	}

	public List<SlQuaterCountVO> listSlQuaterCount(SlQuaterCountVO slQuaterCountVO) {
		return this.mysqlSqlSessionTemplate.selectList("mProject.selectSlQuaterCount", slQuaterCountVO);
	}

	public List<SlQuaterUserVO> listSlQuaterUser(SlQuaterUserVO slQuaterUserVO) {
		return this.mysqlSqlSessionTemplate.selectList("mProject.selectSlQuaterUser", slQuaterUserVO);
	}

	public List<SlQuestionFunctionVO> listSlQuaterQuestion(SlQuestionFunctionVO slQuestionFunctionVO) {
		return this.mysqlSqlSessionTemplate.selectList("mProject.selectSlQuaterQuestion", slQuestionFunctionVO);
	}

	public boolean insertSlQuater(SlQuaterVO slQuaterVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.insert("mProject.insertSlQuater", slQuaterVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean insertSlQuaterCount(SlQuaterCountVO slQuaterCountVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.insert("mProject.insertSlQuaterCount", slQuaterCountVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean insertSlQuaterUser(SlQuaterUserVO slQuaterUserVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.insert("mProject.insertSlQuaterUser", slQuaterUserVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean updateSlSlQuater(SlQuaterVO slQuaterVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.update("mProject.updateSlSlQuater", slQuaterVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean updateSlQuaterCount(SlQuaterCountVO slQuaterCountVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.update("mProject.updateSlQuaterCount", slQuaterCountVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean updateSlQuaterActiveCount(SlQuaterCountVO slQuaterCountVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.update("mProject.updateSlQuaterActiveCount", slQuaterCountVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean updateSlQuaterUser(SlQuaterUserVO slQuaterUserVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.update("mProject.updateSlQuaterUser", slQuaterUserVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean deleteSlQuater(SlQuaterVO slQuaterVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.delete("mProject.deleteSlQuater", slQuaterVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean deleteSlQuaterCount(SlQuaterCountVO slQuaterCountVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.delete("mProject.deleteSlQuaterCount", slQuaterCountVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean deleteSlQuaterUser(SlQuaterUserVO slQuaterUserVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.delete("mProject.deleteSlQuaterUser", slQuaterUserVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public String selectSurveyCheckNum(SlQuestionVO slQuestionVO) {
		return (String) this.mysqlSqlSessionTemplate.selectOne("mProject.selectSurveyCheckNum", slQuestionVO);
	}

	public SlBoosterVO selectSlBooster(SlBoosterVO slBoosterVO) {
		return (SlBoosterVO) this.mysqlSqlSessionTemplate.selectOne("mProject.selectSlBooster", slBoosterVO);
	}

	public List<SlBoosterVO> listSlBooster(SlBoosterVO slBoosterVO) {
		return this.mysqlSqlSessionTemplate.selectList("mProject.selectSlBooster", slBoosterVO);
	}

	public boolean insertSlBooster(SlBoosterVO slBoosterVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.insert("mProject.insertSlBooster", slBoosterVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean updateSlBooster(SlBoosterVO slBoosterVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.update("mProject.updateSlBooster", slBoosterVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean deleteSlBooster(SlBoosterVO slBoosterVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.delete("mProject.deleteSlBooster", slBoosterVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public int countSlQuestionViewPage(SlQuestionViewPageVO slQuestionViewPageVO) {
		return this.mysqlSqlSessionTemplate.selectOne("mProject.countSlQuestionViewPage", slQuestionViewPageVO);
	}
	public SlQuestionViewPageVO selectSlQuestionViewPage(SlQuestionViewPageVO slQuestionViewPageVO) {
		return this.mysqlSqlSessionTemplate.selectOne("mProject.selectSlQuestionViewPage", slQuestionViewPageVO);
	}
	public List<SlQuestionViewPageVO> listSlQuestionViewPage(SlQuestionViewPageVO slQuestionViewPageVO) {
		return this.mysqlSqlSessionTemplate.selectList("mProject.listSlQuestionViewPage", slQuestionViewPageVO);
	}

	public boolean insertSlQuestionViewPage(SlQuestionViewPageVO slQuestionViewPageVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.insert("mProject.insertSlQuestionViewPage", slQuestionViewPageVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean updateSlQuestionViewPage(SlQuestionViewPageVO slQuestionViewPageVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.update("mProject.updateSlQuestionViewPage", slQuestionViewPageVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean deleteSlQuestionViewPage(SlQuestionViewPageVO slQuestionViewPageVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.delete("mProject.deleteSlQuestionViewPage", slQuestionViewPageVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean insertSlRotationMain(SlRotationMainVO slRotationMainVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.insert("mProject.insertSlRotationMain", slRotationMainVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean insertSlRotationPart(SlRotationPartVO slRotationPartVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.insert("mProject.insertSlRotationPart", slRotationPartVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean insertSlRotationQuestion(SlRotationQuestionVO slRotationQuestionVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.insert("mProject.insertSlRotationQuestion", slRotationQuestionVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean insertSlRotationExample(SlRotationExampleVO slRotationExampleVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.insert("mProject.insertSlRotationExample", slRotationExampleVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public SlRotationMainVO selectSlRotationMain(SlRotationMainVO slRotationMainVO) {
		return (SlRotationMainVO) this.mysqlSqlSessionTemplate.selectOne("mProject.selectSlRotationMain",slRotationMainVO);
	}

	public List<SlRotationMainVO> listSlRotationMain(SlRotationMainVO slRotationMainVO) {
		return this.mysqlSqlSessionTemplate.selectList("mProject.selectSlRotationMain", slRotationMainVO);
	}

	public List<SlRotationPartVO> listSlRotationPart(SlRotationPartVO slRotationPartVO) {
		return this.mysqlSqlSessionTemplate.selectList("mProject.selectSlRotationPart", slRotationPartVO);
	}

	public SlRotationQuestionVO selectSlRotationQuestion(SlRotationQuestionVO slRotationQuestionVO) {
		return this.mysqlSqlSessionTemplate.selectOne("mProject.selectSlRotationQuestion", slRotationQuestionVO);
	}
	public List<SlRotationQuestionVO> listSlRotationQuestion(SlRotationQuestionVO slRotationQuestionVO) {
		return this.mysqlSqlSessionTemplate.selectList("mProject.selectSlRotationQuestion", slRotationQuestionVO);
	}

	public List<SlRotationExampleVO> listSlRotationExample(SlRotationExampleVO slRotationExampleVO) {
		return this.mysqlSqlSessionTemplate.selectList("mProject.selectSlRotationExample", slRotationExampleVO);
	}

	public boolean updateSlRotationMain(SlRotationMainVO slRotationMainVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.update("mProject.updateSlRotationMain", slRotationMainVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean updateSlRotationPart(SlRotationPartVO slRotationPartVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.update("mProject.updateSlRotationPart", slRotationPartVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean deleteSlRotationMain(SlRotationMainVO slRotationMainVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.delete("mProject.deleteSlRotationMain", slRotationMainVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean deleteSlRotationPart(SlRotationPartVO slRotationPartVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.delete("mProject.deleteSlRotationPart", slRotationPartVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean deleteSlRotationQuestion(SlRotationQuestionVO slRotationQuestionVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.delete("mProject.deleteSlRotationQuestion", slRotationQuestionVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean deleteSlRotationExample(SlRotationExampleVO slRotationExampleVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.delete("mProject.deleteSlRotationExample", slRotationExampleVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public int countSlRotationMain(SlRotationMainVO slRotationMainVO) {
		return ((Integer) this.mysqlSqlSessionTemplate.selectOne("mProject.countSlRotationMain", slRotationMainVO))
				.intValue();
	}

	public int countSlRotationQuestion(SlRotationQuestionVO slRotationQuestionVO) {
		return ((Integer) this.mysqlSqlSessionTemplate.selectOne("mProject.countSlRotationQuestion",
				slRotationQuestionVO)).intValue();
	}

	public boolean updateSlRotationQuestion(SlRotationQuestionVO slRotationQuestionVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.update("mProject.updateSlRotationQuestion", slRotationQuestionVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public List<SlCustomScriptVO> listSlCustomScript(SlCustomScriptVO slCustomScript) {
		return this.mysqlSqlSessionTemplate.selectList("mProject.selectSlCustomScript", slCustomScript);
	}

	public SlCustomScriptVO customScriptContents(SlCustomScriptVO slCustomScriptVO) {
		return this.mysqlSqlSessionTemplate.selectOne("mProject.selectCustomScriptContents", slCustomScriptVO);
	}

	public boolean deleteCustomScript(SlCustomScriptVO slCustomScriptVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.update("mProject.deleteCustomScript", slCustomScriptVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean insertCustomScript(SlCustomScriptVO slCustomScriptVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.insert("mProject.insertCustomScript", slCustomScriptVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public int countSlCustomScript(SlCustomScriptVO slCustomScriptVO) {
		return this.mysqlSqlSessionTemplate.selectOne("mProject.countSlCustomScript", slCustomScriptVO);
	}

	public boolean insertInquiry(SurveyInquiryVO surveyInquiryVO) {
		boolean returnVal = false;
		try {
			this.oracleSqlSessionTemplate.insert("oProject.insertInquiry", surveyInquiryVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean webUpdateSlQuestion(SlQuestionVO slQuestionVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.update("mProject.webUpdateSlQuestion", slQuestionVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean webDeleteSlExample(SlQuestionVO slQuestionVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.delete("mProject.webDeleteSlExample", slQuestionVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean webInsertSlExample(SlExampleVO slExampleVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.insert("mProject.webInsertSlExample", slExampleVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean webDeleteSlQuestionFunction(SlQuestionVO slQuestionVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.delete("mProject.webDeleteSlQuestionFunction", slQuestionVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean webInsertSlQuestionFunction(SlQuestionFunctionVO slQuestionFunctionVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.insert("mProject.webInsertSlQuestionFunction", slQuestionFunctionVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public int webCountSlBooster(SlQuestionVO slQuestionVO) {
		return this.mysqlSqlSessionTemplate.selectOne("mProject.webCountSlBooster", slQuestionVO);
	}

	public int webCountSlQuoter(SlQuestionVO slQuestionVO) {
		return this.mysqlSqlSessionTemplate.selectOne("mProject.webCountSlQuoter", slQuestionVO);
	}

	public int webCountSlRotationMain(SlQuestionVO slQuestionVO) {
		return this.mysqlSqlSessionTemplate.selectOne("mProject.webCountSlRotationMain", slQuestionVO);
	}

	public int webCountSlRotationQuestion(SlQuestionVO slQuestionVO) {
		return this.mysqlSqlSessionTemplate.selectOne("mProject.webCountSlRotationQuestion", slQuestionVO);
	}

	public int webCountSlCustomScript(SlQuestionVO slQuestionVO) {
		return this.mysqlSqlSessionTemplate.selectOne("mProject.webCountSlCustomScript", slQuestionVO);
	}

	public boolean webDeleteSlQuestionLogic(SlQuestionVO slQuestionVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.delete("mProject.webDeleteSlQuestionLogic", slQuestionVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean webDeleteSlQuestion(SlQuestionVO slQuestionVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.delete("mProject.webDeleteSlQuestion", slQuestionVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean webDeleteSlQuestionViewPage(SlQuestionVO slQuestionVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.delete("mProject.webDeleteSlQuestionViewPage", slQuestionVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public List<SlQuestionVO> webListSlQuestion(SlQuestionVO slQuestionVO) {
		return this.mysqlSqlSessionTemplate.selectList("mProject.webListSlQuestion", slQuestionVO);
	}

	public boolean webUpdateSlQuestionOrder(SlQuestionVO slQuestionVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.update("mProject.webUpdateSlQuestionOrder", slQuestionVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public List<SlQuestionViewPageVO> webListSlQuestionViewPage(SlQuestionVO slQuestionVO) {
		return this.mysqlSqlSessionTemplate.selectList("mProject.webListSlQuestionViewPage", slQuestionVO);
	}

	public boolean webUpdateSlQuestionViewPage(SlQuestionViewPageVO slQuestionViewPageVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.update("mProject.webUpdateSlQuestionViewPage", slQuestionViewPageVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean webInsertSlQuestion(SlQuestionVO slQuestionVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.insert("mProject.webInsertSlQuestion", slQuestionVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public int countSlQuestion(SlQuestionVO slQuestionVO) {
		return this.mysqlSqlSessionTemplate.selectOne("mProject.countSlQuestion", slQuestionVO);
	}

	public int selectQuestionOrder(SlQuestionVO slQuestionVO) {
		return this.mysqlSqlSessionTemplate.selectOne("mProject.selectQuestionOrder", slQuestionVO);
	}

	public boolean webInsertSlQuestionViewPage(SlQuestionViewPageVO slQuestionViewPageVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.insert("mProject.webInsertSlQuestionViewPage", slQuestionViewPageVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean webInsertSlQuestionLogic(SlQuestionLogicVO slQuestionLogicVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.insert("mProject.webInsertSlQuestionLogic", slQuestionLogicVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	// 전체 문항 복사
	public boolean insertCopySlQuestion(SlProjectVO slProjectVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.update("mProject.insertCopySlQuestion", slProjectVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean insertCopySlCustomScript(SlProjectVO slProjectVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.update("mProject.insertCopySlCustomScript", slProjectVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean insertCopySlExample(SlQuestionVO questionVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.update("mProject.insertCopySlExample", questionVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean insertCopySlQuestionLogic(SlQuestionVO questionVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.update("mProject.insertCopySlQuestionLogic", questionVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean insertCopySlQuestionFunction(SlQuestionVO questionVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.update("mProject.insertCopySlQuestionFunction", questionVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public boolean insertCopySlQuestionViewPage(SlQuestionVO questionVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.update("mProject.insertCopySlQuestionViewPage", questionVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	// 선택 문항 복사
	public boolean insertPartcopySlQuestion(SlProjectVO copyProjectVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.update("mProject.insertPartcopySlQuestion", copyProjectVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public SlQuestionVO selectPartcopySlQuestion(SlQuestionVO questionVO) {
		return this.mysqlSqlSessionTemplate.selectOne("mProject.selectPartcopySlQuestion", questionVO);
	}

	public boolean insertPartcopySlQuestionViewPage(SlQuestionVO questionVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.update("mProject.insertPartcopySlQuestionViewPage", questionVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}

	public List<SlQuestionVO> partcopySelectQuestion(SlQuestionVO guideQuestionVO) {
		return this.mysqlSqlSessionTemplate.selectList("mProject.partcopySelectQuestion", guideQuestionVO);
	}

	public boolean updateCType(SlQuestionVO cTypeVO) {
		boolean returnVal = false;
		try {
			this.mysqlSqlSessionTemplate.update("mProject.updateCType", cTypeVO);
			returnVal = true;
		} catch (Exception localException) {
		}
		return returnVal;
	}






















}
