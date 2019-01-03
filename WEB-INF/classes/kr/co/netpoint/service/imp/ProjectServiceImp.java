package kr.co.netpoint.service.imp;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.netpoint.dao.ProjectDao;
import kr.co.netpoint.property.ConfigProperty;
import kr.co.netpoint.service.FileService;
import kr.co.netpoint.service.ProjectService;
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

@Service("ProjectService")
public class ProjectServiceImp implements ProjectService {

	static final Logger logger = LoggerFactory.getLogger(ProjectServiceImp.class);

	@Autowired
	private ConfigProperty configProperty;

	@Autowired
    private ProjectDao projectDao;

	@Autowired
	private FileService fileService;

	@Override
	public List<PnClientVO> listPnClient(PnClientVO pnClientVO) throws Exception {
		return projectDao.listPnClient(pnClientVO);
	}
	@Override
	public PnProjectVO selectPnProject(PnProjectVO pnProjectVO) throws Exception {
		return projectDao.selectPnProject(pnProjectVO);
	}
	@Override
	public Map<String,Object> selectClientVendorGroup(String vendorId) throws Exception {
		return projectDao.selectClientVendorGroup(vendorId);
	}
	@Override
	public List<Map<String,Object>> listClientVendorGroup(String vendorName) throws Exception {
		return projectDao.listClientVendorGroup(vendorName);
	}

	@Override
	public int totalSlProject(SlProjectVO slProjectVO) throws Exception {
		return projectDao.totalSlProject(slProjectVO);
	}
	@Override
	public List<SlProjectVO> listSlProject(SlProjectVO slProjectVO) throws Exception {
		return projectDao.listSlProject(slProjectVO);
	}
	@Override
	public SlProjectVO selectSlProject(SlProjectVO slProjectVO) throws Exception {
		return projectDao.selectSlProject(slProjectVO);
	}
	@Override
	public boolean insertProject(SlProjectVO slProjectVO) throws Exception {
		return projectDao.insertProject(slProjectVO);
	}
	@Override
	public boolean updateSlProject(SlProjectVO slProjectVO) throws Exception {
		return projectDao.updateSlProject(slProjectVO);
	}
	@Override
	public boolean insertTbProject(TbProjectVO tbProjectVO) throws Exception {
		return projectDao.insertTbProject(tbProjectVO);
	}
	@Override
	public int selectTbProject(TbProjectVO tbProjectVO) throws Exception {
		return projectDao.selectTbProject(tbProjectVO);
	}
	@Override
	public boolean updateTbProject(TbProjectVO tbProjectVO) throws Exception {
		return projectDao.updateTbProject(tbProjectVO);
	}
	@Override
	public boolean updateTbProjectCStartDate(SlProjectVO slProjectVO) throws Exception {
		return projectDao.updateTbProjectCStartDate(slProjectVO);
	}
	@Override
	public boolean updateTbProjectCEndDate(SlProjectVO slProjectVO) throws Exception {
		return projectDao.updateTbProjectCEndDate(slProjectVO);
	}
	@Override
	public String selectCPNOTbProject(TbProjectVO tbProjectVO) throws Exception {
		return projectDao.selectCPNOTbProject(tbProjectVO);
	}
	@Override
	public int selectTbAnswer2(TbAnswer2VO tbAnswer2VO) throws Exception {
		return projectDao.selectTbAnswer2(tbAnswer2VO);
	}
	@Override
	public boolean insertTbAnswer2(TbAnswer2VO tbAnswer2VO) throws Exception {
		return projectDao.insertTbAnswer2(tbAnswer2VO);
	}
	@Override
	public boolean insertRedirectUrl(SlRedirectUrlVO slRedirectUrlVO) throws Exception {
		return projectDao.insertRedirectUrl(slRedirectUrlVO);
	}
	@Override
	public boolean updateRedirectUrl(SlRedirectUrlVO slRedirectUrlVO) throws Exception {
		return projectDao.updateRedirectUrl(slRedirectUrlVO);
	}
	@Override
	public boolean deleteSlRedirectUrl(SlRedirectUrlVO slRedirectUrlVO) throws Exception {
		return projectDao.deleteSlRedirectUrl(slRedirectUrlVO);
	}
	@Override
	public List<SlRedirectUrlVO> listSlRedirectUrl(SlRedirectUrlVO slRedirectUrlVO) throws Exception {
		return projectDao.listSlRedirectUrl(slRedirectUrlVO);
	}

	@Override
	public int countSlHardCoding(SlHardCodingVO slHardCodingVO) throws Exception {
		return projectDao.countSlHardCoding(slHardCodingVO);
	}
	@Override
	public SlHardCodingVO selectSlHardCoding(SlHardCodingVO slHardCodingVO) throws Exception {
		return projectDao.selectSlHardCoding(slHardCodingVO);
	}
	@Override
	public boolean insertSlHardCoding(SlHardCodingVO slHardCodingVO) throws Exception {
		return projectDao.insertSlHardCoding(slHardCodingVO);
	}
	@Override
	public boolean deleteSlHardCoding(SlHardCodingVO slHardCodingVO) throws Exception {
		return projectDao.deleteSlHardCoding(slHardCodingVO);
	}
	@Override
	public boolean updateSlHardCoding(SlHardCodingVO slHardCodingVO) throws Exception {
		return projectDao.updateSlHardCoding(slHardCodingVO);
	}
	@Override
	public boolean insertSlQuestion(SlQuestionVO slQuestionVO) throws Exception {
		return projectDao.insertSlQuestion(slQuestionVO);
	}
	@Override
	public boolean insertSlExample(SlExampleVO slExampleVO) throws Exception {
		return projectDao.insertSlExample(slExampleVO);
	}
	@Override
	public boolean updateSlExample(SlExampleVO slExampleVO) throws Exception {
		return projectDao.updateSlExample(slExampleVO);
	}
	@Override
	public boolean deleteSlQuestion(int projectId) throws Exception {
		return projectDao.deleteSlQuestion(projectId);
	}
	@Override
	public boolean deleteSlExample(int projectId) throws Exception {
		return projectDao.deleteSlExample(projectId);
	}
	@Override
	public boolean deleteSlQuestionLogic(int projectId) throws Exception {
		return projectDao.deleteSlQuestionLogic(projectId);
	}
	@Override
	public SlQuestionVO selectSlQuestion(SlQuestionVO slQuestionVO) throws Exception {
		return projectDao.selectSlQuestion(slQuestionVO);
	}
	@Override
	public List<SlQuestionVO> listSlQuestion(SlQuestionVO slQuestionVO) throws Exception {
		return projectDao.listSlQuestion(slQuestionVO);
	}
	@Override
	public SlExampleVO selectSlExample(SlExampleVO slExampleVO) throws Exception {
		return projectDao.selectSlExample(slExampleVO);
	}
	@Override
	public int countSlExample(SlExampleVO slExampleVO) throws Exception {
		return projectDao.countSlExample(slExampleVO);
	}
	@Override
	public List<SlExampleVO> listSlExample(SlExampleVO slExampleVO) throws Exception {
		return projectDao.listSlExample(slExampleVO);
	}
	@Override
	public boolean insertSlQuestionFunction(SlQuestionFunctionVO slQuestionFunctionVO) throws Exception {
		return projectDao.insertSlQuestionFunction(slQuestionFunctionVO);
	}
	@Override
	public boolean deleteSlQuestionFunction(int projectId) throws Exception {
		return projectDao.deleteSlQuestionFunction(projectId);
	}
	@Override
	public boolean deleteSlQuestionViewPage(int projectId) throws Exception {
		return projectDao.deleteSlQuestionViewPage(projectId);
	}
	@Override
	public SlQuestionFunctionVO selectSlQuestionFunction(SlQuestionFunctionVO slQuestionFunctionVO) throws Exception {
		return projectDao.selectSlQuestionFunction(slQuestionFunctionVO);
	}
	@Override
	public List<SlQuestionFunctionVO> listSlQuestionFunction(SlQuestionFunctionVO slQuestionFunctionVO) throws Exception {
		return projectDao.listSlQuestionFunction(slQuestionFunctionVO);
	}
	@Override
	public List<SlQuestionLogicVO> listSlQuestionLogic(SlQuestionLogicVO slQuestionLogicVO) throws Exception {
		return projectDao.listSlQuestionLogic(slQuestionLogicVO);
	}
	@Override
	public int countSlSurvey(SlSurveyVO slSurveyVO) throws Exception {
		return projectDao.countSlSurvey(slSurveyVO);
	}
	/*@Override
	public boolean insertSlSurvey(SlSurveyVO slSurveyVO) throws Exception {
		return projectDao.insertSlSurvey(slSurveyVO);
	}*/
	/*@Override
	public boolean updateSlSurvey(SlSurveyVO slSurveyVO) throws Exception {
		return projectDao.updateSlSurvey(slSurveyVO);
	}*/
	@Override
	public boolean insertSlSurvey(Map sql) throws Exception {
		return projectDao.insertSlSurvey(sql);
	}
	@Override
	public boolean updateSlSurvey(Map sql) throws Exception {
		return projectDao.updateSlSurvey(sql);
	}
	@Override
	public boolean deleteSlSurvey(SlSurveyVO slSurveyVO) throws Exception {
		return projectDao.deleteSlSurvey(slSurveyVO);
	}

	@Override
	public int countTable(String tableName) throws Exception {
		return projectDao.countTable(tableName);
	}
	@Override
	public int countTableColumn(String tableName, String columnName) throws Exception {
		return projectDao.countTableColumn(tableName, columnName);
	}
	@Override
	public boolean createTable(Map sql) throws Exception {
		return projectDao.createTable(sql);
	}
	@Override
	public List<HashMap> listcolumnName(String tableName) throws Exception {
		return projectDao.listcolumnName(tableName);
	}
	@Override
	public HashMap selectTable(Map sql) throws Exception {
		return projectDao.selectTable(sql);
	}
	@Override
	public List<HashMap> listTable(Map sql) throws Exception {
		return projectDao.listTable(sql);
	}

	@Override
	public int countSlQuater(SlQuaterVO slQuaterVO) throws Exception {
		return projectDao.countSlQuater(slQuaterVO);
	}
	@Override
	public SlQuaterVO selectSlQuater(SlQuaterVO slQuaterVO) throws Exception {
		return projectDao.selectSlQuater(slQuaterVO);
	}
	@Override
	public SlQuaterCountVO selectSlQuaterCount(SlQuaterCountVO slQuaterCountVO) throws Exception {
		return projectDao.selectSlQuaterCount(slQuaterCountVO);
	}
	@Override
	public SlQuaterUserVO selectSlQuaterUser(SlQuaterUserVO slQuaterUserVO) throws Exception {
		return projectDao.selectSlQuaterUser(slQuaterUserVO);
	}
	@Override
	public List<SlQuaterVO> listSlQuater(SlQuaterVO slQuaterVO) throws Exception {
		return projectDao.listSlQuater(slQuaterVO);
	}
	@Override
	public List<SlQuaterCountVO> listSlQuaterCount(SlQuaterCountVO slQuaterCountVO) throws Exception {
		return projectDao.listSlQuaterCount(slQuaterCountVO);
	}
	@Override
	public List<SlQuaterUserVO> listSlQuaterUser(SlQuaterUserVO slQuaterUserVO) throws Exception {
		return projectDao.listSlQuaterUser(slQuaterUserVO);
	}
	@Override
	public List<SlQuestionFunctionVO> listSlQuaterQuestion(SlQuestionFunctionVO slQuestionFunctionVO) {
		return projectDao.listSlQuaterQuestion(slQuestionFunctionVO);
	}
	@Override
	public boolean insertSlQuater(SlQuaterVO slQuaterVO) throws Exception {
		return projectDao.insertSlQuater(slQuaterVO);
	}
	@Override
	public boolean insertSlQuaterCount(SlQuaterCountVO slQuaterCountVO) throws Exception {
		return projectDao.insertSlQuaterCount(slQuaterCountVO);
	}
	@Override
	public boolean insertSlQuaterUser(SlQuaterUserVO slQuaterUserVO) throws Exception {
		return projectDao.insertSlQuaterUser(slQuaterUserVO);
	}
	@Override
	public boolean updateSlSlQuater(SlQuaterVO slQuaterVO) throws Exception {
		return projectDao.updateSlSlQuater(slQuaterVO);
	}
	@Override
	public boolean updateSlQuaterCount(SlQuaterCountVO slQuaterCountVO) throws Exception {
		return projectDao.updateSlQuaterCount(slQuaterCountVO);
	}
	@Override
	public boolean updateSlQuaterActiveCount(SlQuaterCountVO slQuaterCountVO) throws Exception {
		return projectDao.updateSlQuaterActiveCount(slQuaterCountVO);
	}
	@Override
	public boolean updateSlQuaterUser(SlQuaterUserVO slQuaterUserVO) throws Exception {
		return projectDao.updateSlQuaterUser(slQuaterUserVO);
	}
	@Override
	public boolean deleteSlQuater(SlQuaterVO slQuaterVO) throws Exception {
		return projectDao.deleteSlQuater(slQuaterVO);
	}
	@Override
	public boolean deleteSlQuaterCount(SlQuaterCountVO slQuaterCountVO) throws Exception {
		return projectDao.deleteSlQuaterCount(slQuaterCountVO);
	}
	@Override
	public boolean deleteSlQuaterUser(SlQuaterUserVO slQuaterUserVO) throws Exception {
		return projectDao.deleteSlQuaterUser(slQuaterUserVO);
	}
	@Override
	public SlQuestionVO selectMinSlQuestion(SlQuestionVO slQuestionVO) {
		return projectDao.selectMinSlQuestion(slQuestionVO);
	}
	@Override
	public String selectSurveyCheckNum(SlQuestionVO slQuestionVO) {
		return projectDao.selectSurveyCheckNum(slQuestionVO);
	}
	@Override
	public SlBoosterVO selectSlBooster(SlBoosterVO slBoosterVO) throws Exception {
		return projectDao.selectSlBooster(slBoosterVO);
	}
	@Override
	public List<SlBoosterVO> listSlBooster(SlBoosterVO slBoosterVO) throws Exception {
		return projectDao.listSlBooster(slBoosterVO);
	}
	@Override
	public boolean insertSlBooster(SlBoosterVO slBoosterVO) throws Exception {
		return projectDao.insertSlBooster(slBoosterVO);
	}
	@Override
	public boolean updateSlBooster(SlBoosterVO slBoosterVO) throws Exception {
		return projectDao.updateSlBooster(slBoosterVO);
	}
	@Override
	public boolean deleteSlBooster(SlBoosterVO slBoosterVO) throws Exception {
		return projectDao.deleteSlBooster(slBoosterVO);
	}
	@Override
	public int countSlQuestionViewPage(SlQuestionViewPageVO slQuestionViewPageVO) throws Exception {
		return projectDao.countSlQuestionViewPage(slQuestionViewPageVO);
	}
	@Override
	public SlQuestionViewPageVO selectSlQuestionViewPage(SlQuestionViewPageVO slQuestionViewPageVO) throws Exception {
		return projectDao.selectSlQuestionViewPage(slQuestionViewPageVO);
	}
	@Override
	public List<SlQuestionViewPageVO> listSlQuestionViewPage(SlQuestionViewPageVO slQuestionViewPageVO) throws Exception {

		int projectId = slQuestionViewPageVO.getProjectId();
		List<SlQuestionViewPageVO> listSlQuestionViewPage = projectDao.listSlQuestionViewPage(slQuestionViewPageVO);

		int setQuestionViewPageIndex = 0;
		for (SlQuestionViewPageVO sqvpv : listSlQuestionViewPage) {

			String pageQuestionIds = sqvpv.getPageQuestionIds();
			String pageQuestionNames = sqvpv.getPageQuestionNames();

			String[] pageQuestionIdArray = pageQuestionIds.split(">");
			String[] pageQuestionNameArray = pageQuestionNames.split(">");
			if (null != pageQuestionIdArray && null != pageQuestionNameArray) {

				int pqiaLen = pageQuestionIdArray.length;
				int pqnaLen = pageQuestionNameArray.length;
				if (pqiaLen == pqnaLen) {

					List<SlQuestionVO> listSlQuestion = new ArrayList<SlQuestionVO>();
					for (int i=1; i<pqiaLen; i++) {

						String pQuestionId = pageQuestionIdArray[i];
						SlQuestionVO slQuestionVO = new SlQuestionVO();
						slQuestionVO.setProjectId(projectId);
						slQuestionVO.setQuestionId(Integer.parseInt(pQuestionId));
						listSlQuestion.addAll(listSlQuestion(slQuestionVO));
					}
					listSlQuestionViewPage.get(setQuestionViewPageIndex).setListSlQuestion(listSlQuestion);
				}
			}
			setQuestionViewPageIndex++;
		}

		return listSlQuestionViewPage;
	}
	@Override
	public boolean insertSlQuestionViewPage(SlQuestionViewPageVO slQuestionViewPageVO) throws Exception {
		return projectDao.insertSlQuestionViewPage(slQuestionViewPageVO);
	}
	@Override
	public boolean updateSlQuestionViewPage(SlQuestionViewPageVO slQuestionViewPageVO) throws Exception {
		return projectDao.updateSlQuestionViewPage(slQuestionViewPageVO);
	}
	@Override
	public boolean deleteSlQuestionViewPage(SlQuestionViewPageVO slQuestionViewPageVO) throws Exception {
		return projectDao.deleteSlQuestionViewPage(slQuestionViewPageVO);
	}

	@Override
	public boolean insertSlRotationMain(SlRotationMainVO slRotationMainVO) throws Exception {
		return projectDao.insertSlRotationMain(slRotationMainVO);
	}
	@Override
	public boolean insertSlRotationPart(SlRotationPartVO slRotationPartVO) throws Exception {
		return projectDao.insertSlRotationPart(slRotationPartVO);
	}
	@Override
	public boolean insertSlRotationQuestion(SlRotationQuestionVO slRotationQuestionVO, HttpServletRequest request) throws Exception {
		return projectDao.insertSlRotationQuestion(slRotationQuestionVO);
	}

	@Override
	public String makeSlRotationQuestionFile(SlRotationQuestionVO slRotationQuestionVO, int rotCount) throws Exception {

		// make jsp file, alter table
		String makeSlRotationQuestionFileName = "";

		int projectId = slRotationQuestionVO.getProjectId();
		String fileSaveDirectory = configProperty.getFileSaveDirectory();
		String hardCodingSaveDirectory = configProperty.getHardCodingSaveDirectory();
		String hardCodingVersion = configProperty.getHardCodingVersion();
		String saveDirectory = fileSaveDirectory + hardCodingSaveDirectory +"/"+ hardCodingVersion  +"/"+ projectId;

		int rotQuestionId = slRotationQuestionVO.getRotQuestionId();
		String rotQuestionName = slRotationQuestionVO.getRotQuestionName();
		String rotQuestionType = slRotationQuestionVO.getRotQuestionType();

		SlExampleVO slExampleVO = new SlExampleVO();
		slExampleVO.setProjectId(projectId);
		slExampleVO.setQuestionId(rotQuestionId);
		slExampleVO.setExampleValue(String.valueOf(rotCount));
		SlExampleVO selectSlExample = this.selectSlExample(slExampleVO);

		String rotSaveFileName = "";
		String rotSaveName = "";
		if (null != rotQuestionName && !"".equals(rotQuestionName)) {

			rotSaveName = "rot"+ rotCount + rotQuestionName;
			rotSaveFileName = rotSaveName +".jsp";
			File inFileJsp = new File(saveDirectory, rotQuestionName +".jsp");
			File outFileJsp = new File(saveDirectory, rotSaveFileName);

			boolean delFileJsp = true;
			if (outFileJsp.exists()) {
				delFileJsp = outFileJsp.delete();
			}
			if (delFileJsp) {
				PrintWriter pwJsp = new PrintWriter(new FileWriter(outFileJsp, false));
				BufferedReader brJsp = new BufferedReader(new FileReader(inFileJsp));
				while(true) {
					String line = brJsp.readLine();
					if (line==null) break;

					//logger.info(">>> line.contains(rotQuestionName): " + line);
					//logger.info(">>> line.contains(rotQuestionName): " + line.contains(rotQuestionName));
					//logger.info(">>> !line.contains(rotQuestionName + \".js\"): " + line.contains(rotQuestionName + ".js"));

					if (line.contains(rotQuestionName)) {
						//if(!line.contains(rotQuestionName + ".js")) {
						if(!(line.contains(rotQuestionName + ".js") || line.contains(rotQuestionName + "."))) {
							line = line.replaceAll(rotQuestionName, rotSaveName);
						}
					}
					// 로테이션 jsp 생성 > js 파일 참조는 원본 문항을 참조하기 위함
					if (line.contains("questionName")) {
						line = line.replaceAll("value='"+ rotQuestionName +"'", "value='"+ rotSaveName +"'");
					}
					if (line.contains("rotationUse")) {
						line = line.replaceAll("value='N'", "value='Y'");
					}
					if (line.contains("rotationMain")) {
						line = line.replaceAll("value=''", "value='"+ rotQuestionName +"'");
					}
					if (line.contains("rotationIndex")) {
						line = line.replaceAll("value='1'", "value='"+ String.valueOf(rotCount) +"'");
					}
					if (line.contains("rotationValue")) {
						line = line.replaceAll("value=''", "value='"+ String.valueOf(rotCount) +"'");
					}
					pwJsp.println(line);
				}
				pwJsp.close();
				makeSlRotationQuestionFileName = rotSaveName;
			}
		}
		return makeSlRotationQuestionFileName;
	}

	@Override
	public String removeSlRotationQuestionFile(SlRotationQuestionVO slRotationQuestionVO, int rotCount) throws Exception {

		// remove jsp file, return alter table column name
		String removeSlRotationQuestionFile = "";

		int projectId = slRotationQuestionVO.getProjectId();
		String fileSaveDirectory = configProperty.getFileSaveDirectory();
		String hardCodingSaveDirectory = configProperty.getHardCodingSaveDirectory();
		String hardCodingVersion = configProperty.getHardCodingVersion();
		String saveDirectory = fileSaveDirectory + hardCodingSaveDirectory +"/"+ hardCodingVersion  +"/"+ projectId;

		int rotQuestionId = slRotationQuestionVO.getRotQuestionId();
		String rotQuestionName = slRotationQuestionVO.getRotQuestionName();
		String rotQuestionType = slRotationQuestionVO.getRotQuestionType();

		SlExampleVO slExampleVO = new SlExampleVO();
		slExampleVO.setProjectId(projectId);
		slExampleVO.setQuestionId(rotQuestionId);
		slExampleVO.setExampleValue(String.valueOf(rotCount));
		SlExampleVO selectSlExample = this.selectSlExample(slExampleVO);

		String rotRemoveFileName = "";
		String rotRemoveName = "";
		if (null != rotQuestionName && !"".equals(rotQuestionName)) {

			rotRemoveName = "rot"+ rotCount + rotQuestionName;
			rotRemoveFileName = rotRemoveName +".jsp";
			File outFileJsp = new File(saveDirectory, rotRemoveFileName);

			boolean delFileJsp = true;
			if (outFileJsp.exists()) {
				delFileJsp = outFileJsp.delete();
			}
			removeSlRotationQuestionFile = rotRemoveName;
		}
		return removeSlRotationQuestionFile;
	}

	@Override
	public boolean insertSlRotationExample(SlRotationExampleVO slRotationExampleVO) throws Exception {
		return projectDao.insertSlRotationExample(slRotationExampleVO);
	}
	@Override
	public SlRotationMainVO selectSlRotationMain(SlRotationMainVO slRotationMainVO) throws Exception {
		return projectDao.selectSlRotationMain(slRotationMainVO);
	}
	@Override
	public List<SlRotationMainVO> listSlRotationMain(SlRotationMainVO slRotationMainVO) throws Exception {

		List<SlRotationMainVO> listSlRotationMain = projectDao.listSlRotationMain(slRotationMainVO);
		if (null != listSlRotationMain && 0 < listSlRotationMain.size()) {
			int slRotationMainLen = listSlRotationMain.size();

			for (int i=0; i<slRotationMainLen; i++) {

				int rotMainId = listSlRotationMain.get(i).getRotMainId();
				int projectId = listSlRotationMain.get(i).getProjectId();

				SlRotationPartVO slRotationPartVO = new SlRotationPartVO();
				slRotationPartVO.setRotMainId(rotMainId);
				slRotationPartVO.setProjectId(projectId);
				List<SlRotationPartVO> listSlRotationPart = listSlRotationPart(slRotationPartVO);

				if (null != listSlRotationPart && 0 < listSlRotationPart.size()) {
					int slRotationPartLen = listSlRotationPart.size();

					for (int j=0; j<slRotationPartLen; j++) {

						int rotPartId = listSlRotationPart.get(j).getRotPartId();
						SlRotationQuestionVO slRotationQuestionVO = new SlRotationQuestionVO();
						slRotationQuestionVO.setRotPartId(rotPartId);
						slRotationQuestionVO.setProjectId(projectId);
						List<SlRotationQuestionVO> listSlRotationQuestion = listSlRotationQuestion(slRotationQuestionVO);

						if (null != listSlRotationQuestion && 0 < listSlRotationQuestion.size()) {
							listSlRotationPart.get(j).setListSlRotationQuestion(listSlRotationQuestion);
						}
					}
					listSlRotationMain.get(i).setListSlRotationPart(listSlRotationPart);
				}
				//

				SlRotationExampleVO slRotationExampleVO = new SlRotationExampleVO();
				slRotationExampleVO.setRotMainId(rotMainId);
				slRotationExampleVO.setProjectId(projectId);
				List<SlRotationExampleVO> listSlRotationExample = listSlRotationExample(slRotationExampleVO);

				if (null != listSlRotationExample && 0 < listSlRotationExample.size()) {
					listSlRotationMain.get(i).setListSlRotationExample(listSlRotationExample);
				}
			}
		}
		return listSlRotationMain;
	}
	@Override
	public List<SlRotationPartVO> listSlRotationPart(SlRotationPartVO slRotationPartVO) throws Exception {

		List<SlRotationPartVO> listSlRotationPart = projectDao.listSlRotationPart(slRotationPartVO);

		if (null != listSlRotationPart && 0 < listSlRotationPart.size()) {
			int slRotationPartLen = listSlRotationPart.size();

			for (int j=0; j<slRotationPartLen; j++) {

				int rotPartId = listSlRotationPart.get(j).getRotPartId();
				int projectId = listSlRotationPart.get(j).getProjectId();

				SlRotationQuestionVO slRotationQuestionVO = new SlRotationQuestionVO();
				slRotationQuestionVO.setRotPartId(rotPartId);
				slRotationQuestionVO.setProjectId(projectId);
				List<SlRotationQuestionVO> listSlRotationQuestion = listSlRotationQuestion(slRotationQuestionVO);

				if (null != listSlRotationQuestion && 0 < listSlRotationQuestion.size()) {

					listSlRotationPart.get(j).setListSlRotationQuestion(listSlRotationQuestion);
				}
			}
		}
		return listSlRotationPart;
	}
	@Override
	public SlRotationQuestionVO selectSlRotationQuestion(SlRotationQuestionVO slRotationQuestionVO) throws Exception {
		return projectDao.selectSlRotationQuestion(slRotationQuestionVO);
	}
	@Override
	public List<SlRotationQuestionVO> listSlRotationQuestion(SlRotationQuestionVO slRotationQuestionVO) throws Exception {
		return projectDao.listSlRotationQuestion(slRotationQuestionVO);
	}
	@Override
	public List<SlRotationExampleVO> listSlRotationExample(SlRotationExampleVO slRotationExampleVO) throws Exception {
		return projectDao.listSlRotationExample(slRotationExampleVO);
	}
	@Override
	public boolean updateSlRotationPart(String updateType, SlRotationPartVO slRotationPartVO, SlRotationMainVO slRotationMainVO) throws Exception {

		boolean updateSlRotationPart = projectDao.updateSlRotationPart(slRotationPartVO);

		int projectId = slRotationPartVO.getProjectId();
		int rotPartId = slRotationPartVO.getRotPartId();
		int rotMainId = slRotationPartVO.getRotMainId();
		String rotMainType = slRotationMainVO.getRotMainType();
		int rotMainQuestionId = slRotationMainVO.getRotMainQuestionId();

		//SlRotationMainVO slRotationMainVO = new SlRotationMainVO();
		slRotationMainVO.setProjectId(projectId);
		slRotationMainVO.setRotMainType(rotMainType);
		slRotationMainVO.setRotMainQuestionId(rotMainQuestionId);

		logger.info(">>> updateSlRotationPart projectId:" + projectId);
		logger.info(">>> updateSlRotationPart rotMainId:" + rotMainId);
		SlRotationMainVO selectSlRotationMain = this.selectSlRotationMain(slRotationMainVO);

		SlQuestionVO slQuestionVO = new SlQuestionVO();
		slQuestionVO.setProjectId(projectId);
		slQuestionVO.setQuestionId(rotMainQuestionId);
		SlQuestionVO selectSlQuestion = this.selectSlQuestion(slQuestionVO);

		SlExampleVO slExampleVO = new SlExampleVO();
		slExampleVO.setProjectId(projectId);
		slExampleVO.setQuestionId(rotMainQuestionId);
		List<SlExampleVO> listSlExample = this.listSlExample(slExampleVO);
		int listSlExampleLen = listSlExample.size();

		SlRotationQuestionVO slRotationQuestionVO = new SlRotationQuestionVO();
		slRotationQuestionVO.setProjectId(projectId);
		slRotationQuestionVO.setRotPartId(rotPartId);
		List<SlRotationQuestionVO> listSlRotationQuestion = this.listSlRotationQuestion(slRotationQuestionVO);

		// insert, update rotation sl_questionViewPage data
		if (updateSlRotationPart && "update".equals(updateType)) {

			// make jsp file (rotation question)
			// alter table column (rotation question)
			boolean checkExampleText = true;

			/*for (SlRotationQuestionVO srqv : listSlRotationQuestion) {

				int rotQuestionId = srqv.getRotQuestionId();
				String rotQuestionType = srqv.getRotQuestionType();*/

			int checkIndexExmple = 0;
			for (SlExampleVO sev : listSlExample) {		// 로테이션 메인(기준) 문항

				for (SlRotationQuestionVO srqv : listSlRotationQuestion) {	// 로테이션 문항

					int rotQuestionId = srqv.getRotQuestionId();
					String rotQuestionType = srqv.getRotQuestionType();

					logger.info(">>> updateSlRotationPart checkExampleText:" + checkExampleText);
					logger.info(">>> updateSlRotationPart checkIndexExmple:" + checkIndexExmple);
					logger.info(">>> updateSlRotationPart sev.getExampleText():" + sev.getExampleText());

					if ("$$@@$$".equals(sev.getExampleText())) {
						checkExampleText = false;
					}
					if (checkExampleText) {

						if (0 < checkIndexExmple) {

							String makeRotationQuestionName = this.makeSlRotationQuestionFile(srqv, (checkIndexExmple+1));

							if (null != makeRotationQuestionName && !"".equals(makeRotationQuestionName)) {

								boolean alterAddSurveyTableQuestion = fileService.alterAddDropSurveyTableQuestion("alterAdd", projectId, rotQuestionId, makeRotationQuestionName, rotQuestionType);
							}

						}
					}
					//checkIndexExmple++;
				}
				checkIndexExmple++;
			}

			// set Rotation QuestionViewPage
			boolean updateSlQuestionViewPageRotation = this.updateSlQuestionViewPageRotation(projectId, listSlRotationQuestion, listSlExampleLen, rotMainId);

		} else if (updateSlRotationPart && "delete".equals(updateType)) {

			boolean checkExampleText = true;

			for (SlRotationQuestionVO srqv : listSlRotationQuestion) {

				int rotQuestionId = srqv.getRotQuestionId();
				String rotQuestionType = srqv.getRotQuestionType();

				int checkIndexExmple = 0;
				for (SlExampleVO sev : listSlExample) {

					if ("$$@@$$".equals(sev.getExampleText())) {
						checkExampleText = false;
					}
					if (checkExampleText) {

						if (0 < checkIndexExmple) {

							String makeRotationQuestionName = this.removeSlRotationQuestionFile(srqv, (checkIndexExmple+1));

							if (null != makeRotationQuestionName && !"".equals(makeRotationQuestionName)) {

								boolean alterAddSurveyTableQuestion = fileService.alterAddDropSurveyTableQuestion("alterDrop", projectId, rotQuestionId, makeRotationQuestionName, rotQuestionType);
							}

						}
					}
					checkIndexExmple++;
				}
			}

			boolean deleteSlQuestionViewPageRotation = this.deleteSlQuestionViewPageRotation(projectId, listSlRotationQuestion);

		}

		return updateSlRotationPart;
	}
	@Override
	public boolean deleteSlRotationMain(SlRotationMainVO slRotationMainVO) throws Exception {
		return projectDao.deleteSlRotationMain(slRotationMainVO);
	}
	@Override
	public boolean deleteSlRotationPart(SlRotationPartVO slRotationPartVO) throws Exception {

		int projectId = slRotationPartVO.getProjectId();
		int rotPartId = slRotationPartVO.getRotPartId();
		logger.info(">>> deleteSlRotationPart projectId:" + projectId);
		logger.info(">>> deleteSlRotationPart rotPartId:" + rotPartId);

		SlRotationQuestionVO deleteQuestionVO = new SlRotationQuestionVO();
		deleteQuestionVO.setProjectId(projectId);
		deleteQuestionVO.setRotPartId(rotPartId);
		boolean deleteQuestion = projectDao.deleteSlRotationQuestion(deleteQuestionVO);

		boolean deleteSlRotationPart = false;
		if (deleteQuestion) {
			deleteSlRotationPart = projectDao.deleteSlRotationPart(slRotationPartVO);
		}
		return deleteSlRotationPart;
	}
	@Override
	public boolean deleteSlRotationQuestion(SlRotationQuestionVO slRotationQuestionVO) throws Exception {
		return projectDao.deleteSlRotationQuestion(slRotationQuestionVO);
	}
	@Override
	public boolean deleteSlRotationExample(SlRotationExampleVO slRotationExampleVO) throws Exception {
		return projectDao.deleteSlRotationExample(slRotationExampleVO);
	}
	@Override
	public int countSlRotationMain(SlRotationMainVO slRotationMainVO) throws Exception {
		return projectDao.countSlRotationMain(slRotationMainVO);
	}
	@Override
	public int countSlRotationQuestion(SlRotationQuestionVO slRotationQuestionVO) throws Exception {
		return projectDao.countSlRotationQuestion(slRotationQuestionVO);
	}
	@Override
	public boolean updateSlRotationQuestion(SlRotationQuestionVO slRotationQuestionVO) throws Exception {
		return projectDao.updateSlRotationQuestion(slRotationQuestionVO);
	}

	@Override
	public boolean updateSlQuestionViewPageRotation(int projectId, List<SlRotationQuestionVO> listSlRotationQuestion, int exampleLen, int rotMainId) throws Exception {

		boolean updateSlQuestionViewPageRotation = true;
		int rotationQuestionLen = listSlRotationQuestion.size();
		//logger.info(">>> updateSlQuestionViewPageRotation rotationQuestionLen:"+ rotationQuestionLen);
		//logger.info(">>> updateSlQuestionViewPageRotation exampleLen:"+ exampleLen);

		boolean tooMannySelect = false;
		// set check question
		List<SlQuestionViewPageVO> checkListQuestionView = new ArrayList<SlQuestionViewPageVO>();
		// set last rotation question
		int lastQuestionId = 0;
		int lastQuestionOrder = 0;
		String rotFinalQuestionName = "";
		String exitQuestionName = "";
		String rotQuestionNames = "";

		if (null != listSlRotationQuestion && !listSlRotationQuestion.isEmpty()) {

			// 마지막 문항 정보 얻기
			SlRotationQuestionVO lastSlRotationQuestion = listSlRotationQuestion.get(rotationQuestionLen-1);
			lastQuestionId = lastSlRotationQuestion.getRotQuestionId();

			for (SlRotationQuestionVO srqv : listSlRotationQuestion) {
				int rotQuestionId = srqv.getRotQuestionId();

				SlQuestionViewPageVO slQuestionViewPageVO = new SlQuestionViewPageVO();
				slQuestionViewPageVO.setProjectId(projectId);
				slQuestionViewPageVO.setPageTitleQuestionId(String.valueOf(rotQuestionId));
				int countSlQuestionViewPage = this.countSlQuestionViewPage(slQuestionViewPageVO);	// 문항조회(로테이션 문항은 여러개로 나와 순서 재정의 필요)

				logger.info(">>> checkListQuestionView srqv.getRotQuestionName() :"+ srqv.getRotQuestionName());
				logger.info(">>> checkListQuestionView countSlQuestionViewPage :"+ countSlQuestionViewPage);

				if (2 > countSlQuestionViewPage) {	// 로테이션 문항이면

					slQuestionViewPageVO.setPageType("base");	// 기준 문항 조회를 위해 설정
					SlQuestionViewPageVO selectSlQuestionViewPage = this.selectSlQuestionViewPage(slQuestionViewPageVO);	// 기준 문항 조회
					int pageOrder = selectSlQuestionViewPage.getPageOrder();	// 기준 문항의 pageOrder 얻기
					checkListQuestionView.add(selectSlQuestionViewPage);	// checkListQuestionView(SlQuestionViewPageVO) 에 담기

					logger.info(">>> checkListQuestionView selectSlQuestionViewPage.getPageTitleQuestionName() :"+ selectSlQuestionViewPage.getPageTitleQuestionName());


					if (rotQuestionId == lastQuestionId) {	// 마지막 문항이면
						lastQuestionOrder = pageOrder;		// 순서 마지막 설정
						rotFinalQuestionName = srqv.getRotQuestionName();
						logger.info(">>> checkListQuestionView rotFinalQuestionName :"+ rotFinalQuestionName);

						rotQuestionNames += srqv.getRotQuestionName();
						logger.info(">>> checkListQuestionView rotQuestionNames :"+ rotQuestionNames);
					} else {
						rotQuestionNames += srqv.getRotQuestionName() + ",";
						logger.info(">>> checkListQuestionView rotQuestionNames :"+ rotQuestionNames);
					}



				} else {	// 로테이션 문항이 아니면
					tooMannySelect = true;
				}
			}
			logger.info(">>> checkListQuestionView.size() :"+ checkListQuestionView.size());
		}

		//logger.info(">>> updateSlQuestionViewPageRotation lastQuestionId:"+ lastQuestionId);
		//logger.info(">>> updateSlQuestionViewPageRotation lastQuestionOrder:"+ lastQuestionOrder);
		//logger.info(">>> updateSlQuestionViewPageRotation checkListQuestionView size:"+ checkListQuestionView.size());
		//logger.info(">>> updateSlQuestionViewPageRotation tooMannySelect:"+ tooMannySelect);

		if (!tooMannySelect) {	// 로테이션 문항이면

			SlQuestionViewPageVO SlQuestionViewPageVO = new SlQuestionViewPageVO();
			SlQuestionViewPageVO.setProjectId(projectId);
			List<SlQuestionViewPageVO> listSlQuestionViewPage = this.listSlQuestionViewPage(SlQuestionViewPageVO);

			boolean checkUpdatePageOder = false;
			boolean checkExitQuestionName = false;
			int setPageOrder = lastQuestionOrder + ( (exampleLen-1) * rotationQuestionLen ) +1;
			// lastQuestionOrder 로테이션 시작할 문항 끝 순서
			// exampleLen 메인 로테이션 보기 수
			// rotationQuestionLen ??

			logger.info(">>> updateSlQuestionViewPageRotation updateSlQuestionViewPage lastQuestionOrder:"+ lastQuestionOrder );
			logger.info(">>> updateSlQuestionViewPageRotation updateSlQuestionViewPage exampleLen:"+ exampleLen );
			logger.info(">>> updateSlQuestionViewPageRotation updateSlQuestionViewPage rotationQuestionLen:"+ rotationQuestionLen );
			logger.info(">>> updateSlQuestionViewPageRotation updateSlQuestionViewPage listSlQuestionViewPage.size():"+ listSlQuestionViewPage.size() );
			for (SlQuestionViewPageVO sqvpv : listSlQuestionViewPage) {

				String pageTitleQuestionId = sqvpv.getPageTitleQuestionId();
				int pageTitleQuestionIdInt = Integer.parseInt(pageTitleQuestionId);
				int pageOrder = sqvpv.getPageOrder();

				// update pageOrder
				if (checkUpdatePageOder) {
					// 로테이션 문항으로 update 해야할 마지막 문항 pageOrder 수정작업
					logger.info(">>> updateSlQuestionViewPageRotation updateSlQuestionViewPage sqvpv.getPageTitleQuestionName():"+ sqvpv.getPageTitleQuestionName());
					logger.info(">>> updateSlQuestionViewPageRotation updateSlQuestionViewPage pageOrder:"+ pageOrder +", "+ setPageOrder);
					SlQuestionViewPageVO updateSlQuestionViewPageVO = new SlQuestionViewPageVO();
					updateSlQuestionViewPageVO.setProjectId(projectId);
					updateSlQuestionViewPageVO.setPageTitleQuestionId(pageTitleQuestionId);
					updateSlQuestionViewPageVO.setPageOrder(setPageOrder);
					boolean updateSlQuestionViewPage = this.updateSlQuestionViewPage(updateSlQuestionViewPageVO);
					if (!updateSlQuestionViewPage) {
						updateSlQuestionViewPageRotation = false;
					}

					// sl_rotationMain 로테이션 마지막 문항 정보 수정
					if(checkExitQuestionName) {
						SlRotationMainVO slRotationMainVO = new SlRotationMainVO();
						exitQuestionName = sqvpv.getPageTitleQuestionName();	// 로테이션 끝나고 다음 문항
						slRotationMainVO.setProjectId(projectId);
						slRotationMainVO.setRotMainId(rotMainId);
						slRotationMainVO.setExitQuestionName(exitQuestionName);
						slRotationMainVO.setRotFinalQuestionName(rotFinalQuestionName);
						slRotationMainVO.setRotQuestionNames(rotQuestionNames);

						logger.info(">>> updateSlQuestionViewPageRotation exitQuestionName:"+ exitQuestionName);
						logger.info(">>> updateSlQuestionViewPageRotation exitQuestionName:"+ exitQuestionName);

						boolean updateSlRotationMain = this.updateSlRotationMain(slRotationMainVO);

						logger.info(">>> updateSlQuestionViewPageRotation updateSlRotationMain:"+ updateSlRotationMain);

						if (!updateSlRotationMain) {
							updateSlQuestionViewPageRotation = false;
						} else {
							checkExitQuestionName = false;
						}
					}

					setPageOrder++;
				}

				if (pageTitleQuestionIdInt == lastQuestionId) {
					checkUpdatePageOder = true;
					checkExitQuestionName = true;
				}
			}

			// insert rotation questionViewPage
			// sl_questionViewPage의 로테이션 문항 삽입(pageOrder 정렬하여)
			/*for (SlQuestionViewPageVO sqvpv : checkListQuestionView) {	// checkListQuestionView 로테이션 문항 담아놓은 VO

				String pageTitleQuestionName = sqvpv.getPageTitleQuestionName();*/


			for (int i=2; i<=exampleLen; i++) {

				logger.info(">>> updateSlQuestionViewPageRotation i :"+ i );

				//SlQuestionViewPageVO sqvpv new SlQuestionViewPageVO();

				List<SlQuestionViewPageVO> slQuestionViewPageView = new ArrayList<SlQuestionViewPageVO>();
				slQuestionViewPageView = checkListQuestionView;

				int index22 = 0;
				for (SlQuestionViewPageVO sqvpv : slQuestionViewPageView) {	// checkListQuestionView 로테이션 문항 담아놓은 VO

					logger.info(">>> updateSlQuestionViewPageRotation slQuestionViewPageView.getPageTitleQuestionName() :"+ slQuestionViewPageView.get(index22).getPageTitleQuestionName());
					logger.info(">>> updateSlQuestionViewPageRotation sqvpv.getPageTitleQuestionName() :"+ sqvpv.getPageTitleQuestionName() );

					String pageTitleQuestionName = sqvpv.getPageTitleQuestionName();
					String rePageTitleQuestionName = "rot"+ (String.valueOf(i)) + pageTitleQuestionName;

					logger.info(">>> updateSlQuestionViewPageRotation pageTitleQuestionName :"+ pageTitleQuestionName );
					logger.info(">>> updateSlQuestionViewPageRotation rePageTitleQuestionName :"+ rePageTitleQuestionName );

					SlQuestionViewPageVO setSqvpv = new SlQuestionViewPageVO();
					setSqvpv = sqvpv;
					setSqvpv.setPageOrder(++lastQuestionOrder);
					setSqvpv.setPageTitleQuestionName(rePageTitleQuestionName);
					setSqvpv.setPageType("rotation");
					boolean insertSlQuestionViewPage = this.insertSlQuestionViewPage(setSqvpv);
					if (!insertSlQuestionViewPage) {
						updateSlQuestionViewPageRotation = false;
					}

					logger.info(">>> updateSlQuestionViewPageRotation pageTitleQuestionName :"+ pageTitleQuestionName );
					sqvpv.setPageTitleQuestionName(pageTitleQuestionName);
					logger.info(">>> updateSlQuestionViewPageRotation sqvpv.getPageTitleQuestionName() :"+ sqvpv.getPageTitleQuestionName() );
					index22++;
				}
			}
		}

		return updateSlQuestionViewPageRotation;
	}

	private boolean updateSlRotationMain(SlRotationMainVO slRotationMainVO) {
		return projectDao.updateSlRotationMain(slRotationMainVO);
	}
	@Override
	public boolean deleteSlQuestionViewPageRotation(int projectId, List<SlRotationQuestionVO> listSlRotationQuestion) throws Exception {

		boolean deleteSlQuestionViewPageRotation = true;

		for (SlRotationQuestionVO srqv : listSlRotationQuestion) {
			int rotQuestionId = srqv.getRotQuestionId();

			boolean deleteSlQuestionViewPage = true;

			SlQuestionViewPageVO slQuestionViewPageVO = new SlQuestionViewPageVO();
			slQuestionViewPageVO.setProjectId(projectId);
			slQuestionViewPageVO.setPageTitleQuestionId(String.valueOf(rotQuestionId));
			slQuestionViewPageVO.setDeleteType("rotation");
			boolean deleteQuestion = this.deleteSlQuestionViewPage(slQuestionViewPageVO);
			if(!deleteQuestion) {
				deleteSlQuestionViewPage = false;
			}

			int orderIndex = 1;
			if (deleteSlQuestionViewPage) {

				SlQuestionViewPageVO SlQuestionViewPageVO = new SlQuestionViewPageVO();
				SlQuestionViewPageVO.setProjectId(projectId);
				List<SlQuestionViewPageVO> listSlQuestionViewPage = this.listSlQuestionViewPage(SlQuestionViewPageVO);

				for (SlQuestionViewPageVO sqvpv : listSlQuestionViewPage) {

					SlQuestionViewPageVO updateSlQuestionViewPageVO = new SlQuestionViewPageVO();
					updateSlQuestionViewPageVO.setProjectId(projectId);
					updateSlQuestionViewPageVO.setPageTitleQuestionId(sqvpv.getPageTitleQuestionId());
					updateSlQuestionViewPageVO.setPageOrder(orderIndex);
					this.updateSlQuestionViewPage(updateSlQuestionViewPageVO);
					orderIndex++;
				}
			}
		}

		return deleteSlQuestionViewPageRotation;
	}
	@Override
	public List<SlCustomScriptVO> listSlCustomScript(SlCustomScriptVO slCustomScript) throws Exception {
		return projectDao.listSlCustomScript(slCustomScript);
	}
	@Override
	public SlCustomScriptVO customScriptContents(SlCustomScriptVO slCustomScriptVO) throws Exception {
		return projectDao.customScriptContents(slCustomScriptVO);
	}
	@Override
	public boolean deleteCustomScript(SlCustomScriptVO slCustomScriptVO) throws Exception {
		return projectDao.deleteCustomScript(slCustomScriptVO);
	}
	@Override
	public boolean insertCustomScript(SlCustomScriptVO slCustomScriptVO) throws Exception {
		return projectDao.insertCustomScript(slCustomScriptVO);
	}
	@Override
	public int countSlCustomScript(SlCustomScriptVO slCustomScriptVO) throws Exception {
		return projectDao.countSlCustomScript(slCustomScriptVO);
	}
	@Override
	public boolean insertInquiry(SurveyInquiryVO surveyInquiryVO) throws Exception {
		return projectDao.insertInquiry(surveyInquiryVO);
	}
	@Override
	public boolean webUpdateSlQuestion(SlQuestionVO slQuestionVO) throws Exception {
		return projectDao.webUpdateSlQuestion(slQuestionVO);
	}
	@Override
	public boolean webDeleteSlExample(SlQuestionVO slQuestionVO) throws Exception {
		return projectDao.webDeleteSlExample(slQuestionVO);
	}
	@Override
	public boolean webInsertSlExample(SlExampleVO slExampleVO) throws Exception {
		return projectDao.webInsertSlExample(slExampleVO);
	}
	@Override
	public boolean webDeleteSlQuestionFunction(SlQuestionVO slQuestionVO) throws Exception {
		return projectDao.webDeleteSlQuestionFunction(slQuestionVO);
	}
	@Override
	public boolean webInsertSlQuestionFunction(SlQuestionFunctionVO slQuestionFunctionVO) throws Exception {
		return projectDao.webInsertSlQuestionFunction(slQuestionFunctionVO);
	}
	@Override
	public int webCountSlBooster(SlQuestionVO slQuestionVO) throws Exception {
		return projectDao.webCountSlBooster(slQuestionVO);
	}
	@Override
	public int webCountSlQuoter(SlQuestionVO slQuestionVO) throws Exception {
		return projectDao.webCountSlQuoter(slQuestionVO);
	}
	@Override
	public int webCountSlRotationMain(SlQuestionVO slQuestionVO) throws Exception {
		return projectDao.webCountSlRotationMain(slQuestionVO);
	}
	@Override
	public int webCountSlRotationQuestion(SlQuestionVO slQuestionVO) throws Exception {
		return projectDao.webCountSlRotationQuestion(slQuestionVO);
	}
	@Override
	public int webCountSlCustomScript(SlQuestionVO slQuestionVO) throws Exception {
		return projectDao.webCountSlCustomScript(slQuestionVO);
	}
	@Override
	public boolean webDeleteSlQuestionLogic(SlQuestionVO slQuestionVO) throws Exception {
		return projectDao.webDeleteSlQuestionLogic(slQuestionVO);
	}
	@Override
	public boolean webDeleteSlQuestion(SlQuestionVO slQuestionVO) throws Exception {
		return projectDao.webDeleteSlQuestion(slQuestionVO);
	}
	@Override
	public boolean webDeleteSlQuestionViewPage(SlQuestionVO slQuestionVO) throws Exception {
		return projectDao.webDeleteSlQuestionViewPage(slQuestionVO);
	}
	@Override
	public List<SlQuestionVO> webListSlQuestion(SlQuestionVO slQuestionVO) throws Exception {
		return projectDao.webListSlQuestion(slQuestionVO);
	}
	@Override
	public boolean webUpdateSlQuestionOrder(SlQuestionVO slQuestionVO) throws Exception {
		return projectDao.webUpdateSlQuestionOrder(slQuestionVO);
	}
	@Override
	public List<SlQuestionViewPageVO> webListSlQuestionViewPage(SlQuestionVO slQuestionVO) throws Exception {
		return projectDao.webListSlQuestionViewPage(slQuestionVO);
	}
	@Override
	public boolean webUpdateSlQuestionViewPage(SlQuestionViewPageVO slQuestionViewPageVO) throws Exception {
		return projectDao.webUpdateSlQuestionViewPage(slQuestionViewPageVO);
	}
	@Override
	public boolean webInsertSlQuestion(SlQuestionVO slQuestionVO) throws Exception {
		return projectDao.webInsertSlQuestion(slQuestionVO);
	}
	@Override
	public int countSlQuestion(SlQuestionVO slQuestionVO) throws Exception {
		return projectDao.countSlQuestion(slQuestionVO);
	}
	@Override
	public int selectQuestionOrder(SlQuestionVO slQuestionVO) throws Exception {
		return projectDao.selectQuestionOrder(slQuestionVO);
	}
	@Override
	public boolean webInsertSlQuestionViewPage(SlQuestionViewPageVO slQuestionViewPageVO) throws Exception {
		return projectDao.webInsertSlQuestionViewPage(slQuestionViewPageVO);
	}
	@Override
	public boolean webInsertSlQuestionLogic(SlQuestionLogicVO slQuestionLogicVO) throws Exception {
		return projectDao.webInsertSlQuestionLogic(slQuestionLogicVO);
	}
	// 전체 문항 복사
	@Override
	public boolean insertCopySlQuestion(SlProjectVO slProjectVO) throws Exception {
		return projectDao.insertCopySlQuestion(slProjectVO);
	}
	@Override
	public boolean insertCopySlCustomScript(SlProjectVO slProjectVO) throws Exception {
		return projectDao.insertCopySlCustomScript(slProjectVO);
	}
	@Override
	public boolean insertCopySlExample(SlQuestionVO questionVO) throws Exception {
		return projectDao.insertCopySlExample(questionVO);
	}
	@Override
	public boolean insertCopySlQuestionLogic(SlQuestionVO questionVO) throws Exception {
		return projectDao.insertCopySlQuestionLogic(questionVO);
	}
	@Override
	public boolean insertCopySlQuestionFunction(SlQuestionVO questionVO) throws Exception {
		return projectDao.insertCopySlQuestionFunction(questionVO);
	}
	@Override
	public boolean insertCopySlQuestionViewPage(SlQuestionVO questionVO) throws Exception {
		return projectDao.insertCopySlQuestionViewPage(questionVO);
	}
	// 선택 문항 복사
	@Override
	public boolean insertPartcopySlQuestion(SlProjectVO copyProjectVO) throws Exception {
		return projectDao.insertPartcopySlQuestion(copyProjectVO);
	}
	@Override
	public SlQuestionVO selectPartcopySlQuestion(SlQuestionVO questionVO) throws Exception {
		return projectDao.selectPartcopySlQuestion(questionVO);
	}
	@Override
	public boolean insertPartcopySlQuestionViewPage(SlQuestionVO questionVO) throws Exception {
		return projectDao.insertPartcopySlQuestionViewPage(questionVO);
	}
	@Override
	public List<SlQuestionVO> partcopySelectQuestion(SlQuestionVO guideQuestionVO) throws Exception {
		return projectDao.partcopySelectQuestion(guideQuestionVO);
	}
	@Override
	public boolean updateCType(SlQuestionVO cTypeVO) throws Exception {
		return projectDao.updateCType(cTypeVO);
	}

}
