package kr.co.netpoint.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import kr.co.netpoint.common.HardCodingUtil;
import kr.co.netpoint.common.UtilFile;
import kr.co.netpoint.property.ConfigProperty;
import kr.co.netpoint.service.FileService;
import kr.co.netpoint.service.ProjectService;
import kr.co.netpoint.vo.FileVO;
import kr.co.netpoint.vo.PhotoVO;
import kr.co.netpoint.vo.project.SlCustomScriptVO;
import kr.co.netpoint.vo.project.SlExampleVO;
import kr.co.netpoint.vo.project.SlHardCodingVO;
import kr.co.netpoint.vo.project.SlProjectVO;
import kr.co.netpoint.vo.project.SlQuaterVO;
import kr.co.netpoint.vo.project.SlQuestionFunctionVO;
import kr.co.netpoint.vo.project.SlQuestionVO;
import kr.co.netpoint.vo.project.SlQuestionViewPageVO;
import kr.co.netpoint.vo.project.SlRotationMainVO;

@Controller
public class FileController {

	static final Logger logger = LoggerFactory.getLogger(FileController.class);

	@Autowired
	private ProjectService projectService;
	@Autowired
	private FileService fileService;

	@Autowired
	private ConfigProperty configProperty;

	@ResponseBody
	@RequestMapping(value = "/file/fileUpload", method = RequestMethod.POST)
	public ModelAndView fileUpload(MultipartHttpServletRequest request
									, @RequestParam("uploadFile") MultipartFile uploadFile
									, @RequestParam("fileDirectory") String fileDirectory
									, @RequestParam("uploadVersion") String uploadVersion
									, @RequestParam(value = "projectId", defaultValue = "0", required = false) int projectId
									, @RequestParam(value = "hardCodingId", defaultValue = "0", required = false) int hardCodingId) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		UtilFile utilFile = new UtilFile();

		String setFileDirectory = fileDirectory;
		if (null != uploadVersion && !"".equals(uploadVersion)) {
			setFileDirectory = uploadVersion + "/" + fileDirectory;
		}
		String fileSaveDirectory = configProperty.getFileSaveDirectory();
		String fileLoadDirectory = configProperty.getFileLoadDirectory();

		FileVO setFileVO = new FileVO();
		setFileVO.setFileDirectory(setFileDirectory);
		setFileVO.setFileSaveDirectory(fileSaveDirectory);
		setFileVO.setFileLoadDirectory(fileLoadDirectory);
		FileVO fileVO = utilFile.fileUpload(request, uploadFile, setFileVO);

		boolean insertSlHardCoding = false;
		boolean deleteSlHardCoding = false;
		if ("hardCoding".equals(fileDirectory)) {

			if (null != fileVO) {

				String tableName = "sl_survey_" + projectId;
				SlHardCodingVO slHardCodingVO = new SlHardCodingVO();
				slHardCodingVO.setProjectId(projectId);

				SlQuaterVO slQuaterVO = new SlQuaterVO();
				slQuaterVO.setProjectId(projectId);

				SlRotationMainVO slRotationMainVO = new SlRotationMainVO();
				slRotationMainVO.setProjectId(projectId);

				SlCustomScriptVO slCustomScriptVO = new SlCustomScriptVO();
				slCustomScriptVO.setProjectId(projectId);

				// 쿼터, 로테이션, 스크립트 설정 시 재등록 X
				int countSlQuater = projectService.countSlQuater(slQuaterVO);
				int countSlRotationMain = projectService.countSlRotationMain(slRotationMainVO);
				int countSlCustomScript = projectService.countSlCustomScript(slCustomScriptVO);
				logger.info(">>> fileUpload countSlQuater:" + countSlQuater);
				logger.info(">>> fileUpload countSlRotationMain:" +countSlRotationMain);
				logger.info(">>> fileUpload countSlCustomScript:" +countSlCustomScript);

				// 이미 생성했으면 쿼터, 로테이션, 스크립트 체크
				if (0 != hardCodingId) {
					if (0 == countSlQuater || 0 == countSlRotationMain || 0 == countSlCustomScript) {
						deleteSlHardCoding = projectService.deleteSlHardCoding(slHardCodingVO);
						hardCodingId = 0;
					}
				}

				if (0 == hardCodingId) {
					slHardCodingVO.setHardCodingTableName(tableName);
					int countSlHardCoding = projectService.countSlHardCoding(slHardCodingVO);
					if (0 == countSlHardCoding) {
						insertSlHardCoding = projectService.insertSlHardCoding(slHardCodingVO);
						hardCodingId = slHardCodingVO.getHardCodingId();
					}
				}

				if (insertSlHardCoding) {

					String pageHistory = "";

					HardCodingUtil hardCodingUtil = new HardCodingUtil();
					List<SlQuestionVO> listSlQuestion = hardCodingUtil.readExcel(uploadFile);
					if (null != listSlQuestion && 0 < listSlQuestion.size()) {

						boolean deleteSlQuestion = projectService.deleteSlQuestion(projectId);
						boolean deleteSlExample = projectService.deleteSlExample(projectId);
						boolean deleteSlQuestionFunction = projectService.deleteSlQuestionFunction(projectId);
						SlQuestionViewPageVO deleteSlQuestionViewPageVO = new SlQuestionViewPageVO();
						deleteSlQuestionViewPageVO.setProjectId(projectId);
						boolean deleteSlQuestionViewPage = projectService.deleteSlQuestionViewPage(deleteSlQuestionViewPageVO);

						if (deleteSlQuestion && deleteSlExample && deleteSlQuestionFunction) {

							String setPageTitleQuestionId = "";

							int setQuestionIndex = 1;
							int setquestionViewPageIndex = 1;
							for (SlQuestionVO sqv : listSlQuestion) {

								Random rnd = new Random();
								rnd.setSeed(System.currentTimeMillis());
								int setNum = rnd.nextInt(1000);

								sqv.setProjectId(projectId);
								sqv.setHardCodingId(hardCodingId);
								sqv.setCheckNum(String.valueOf(setNum));
								sqv.setQuestionOrder(setQuestionIndex);
								boolean insertSlQuestion = projectService.insertSlQuestion(sqv);

								boolean insertSlExample = false;
								if (insertSlQuestion && null != sqv.getListSlExample()) {
									for (SlExampleVO sev : sqv.getListSlExample()) {
										sev.setProjectId(projectId);
										sev.setQuestionId(sqv.getQuestionId());
										insertSlExample = projectService.insertSlExample(sev);
									}
								}
								logger.info(">>> fileUpload insert insertSlExample:" + insertSlExample);
								//System.out.println(">>> fileUpload insert insertSlExample:" + insertSlExample);
								boolean insertSlQuestionFunction = false;
								if (null != sqv.getListSlQuestionFunction()) {
									for (SlQuestionFunctionVO sfv : sqv.getListSlQuestionFunction()) {
										sfv.setProjectId(projectId);
										sfv.setQuestionId(sqv.getQuestionId());
										insertSlQuestionFunction = projectService.insertSlQuestionFunction(sfv);
									}
								}
								logger.info(">>> fileUpload insert insertSlQuestionFunction:" + insertSlQuestionFunction);
								//System.out.println(">>> fileUpload insert insertSlQuestionFunction:" + insertSlQuestionFunction);
								String questionDivision = sqv.getQuestionDivision();
								int questionId = sqv.getQuestionId();
								String questionName = sqv.getQuestionName();

								SlQuestionViewPageVO slQuestionViewPageVO = new SlQuestionViewPageVO();
								slQuestionViewPageVO.setProjectId(projectId);
								slQuestionViewPageVO.setPageTitleQuestionId(String.valueOf(questionId));
								slQuestionViewPageVO.setPageTitleQuestionName(questionName);
								slQuestionViewPageVO.setPageTitleQuestionCheckNum(String.valueOf(setNum));
								slQuestionViewPageVO.setPageQuestionIds(">" + String.valueOf(questionId));
								slQuestionViewPageVO.setPageQuestionNames(">" + questionName);
								slQuestionViewPageVO.setPageOrder(setquestionViewPageIndex);
								slQuestionViewPageVO.setPageType("base");

								logger.info(">>> fileUpload insert SlQuestionViewPageVO questionDivision:" + questionDivision);
								//System.out.println(">>> fileUpload insert SlQuestionViewPageVO questionDivision:" + questionDivision);

								if (null != questionDivision && !"".equals(questionDivision) && "p".equals(questionDivision)) {
									boolean insertSlQuestionViewPage = projectService.insertSlQuestionViewPage(slQuestionViewPageVO);
									logger.info(">>> fileUpload insert insertSlQuestionViewPage:" + insertSlQuestionViewPage);
									//System.out.println(">>> fileUpload insert insertSlQuestionViewPage:" + insertSlQuestionViewPage);
									setPageTitleQuestionId = String.valueOf(questionId);
									pageHistory = pageHistory + ">" + questionName;
									setquestionViewPageIndex++;

								} else {
									slQuestionViewPageVO.setPageOrder(0);
									slQuestionViewPageVO.setPageTitleQuestionId(setPageTitleQuestionId);
									boolean updateSlQuestionViewPage = projectService.updateSlQuestionViewPage(slQuestionViewPageVO);
								}
								setQuestionIndex++;
							}
							mv.addObject("listSlQuestion", listSlQuestion);
						}
					}

					if (0 < hardCodingId) {
						slHardCodingVO.setHardCodingId(hardCodingId);
						slHardCodingVO.setFileDirectory(fileDirectory);
						slHardCodingVO.setFileFullPath(fileVO.getFileFullPath());
						slHardCodingVO.setFileSaveName(fileVO.getFileSaveName());
						slHardCodingVO.setFileOriginalName(fileVO.getFileOriginalName());
						logger.info(">>> fileUpload update slHardCoding tableName:" + tableName);
						slHardCodingVO.setHardCodingTableName(tableName);
						if (!"".equals(pageHistory)) {
							slHardCodingVO.setPageBaseHistory(pageHistory);
							slHardCodingVO.setUsePageHistory("0");
						}
						projectService.updateSlHardCoding(slHardCodingVO);
					}
				}
			}
		}

		mv.addObject("insertSlHardCoding", insertSlHardCoding);
		mv.addObject("fileVO", fileVO);

		return mv;
	}

	public static String saveFile(MultipartFile uploadFile, String completeDir) throws IOException {

		if (null != uploadFile) {

			String fileName = uploadFile.getOriginalFilename();

			try {
				// Folder check, make
				File mkdirCheck = new File(completeDir);
				if (!mkdirCheck.exists()) {
					mkdirCheck.mkdirs();
				}

				File file = new File(completeDir + "\\" + fileName);
				uploadFile.transferTo(file);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return "";
	}

	@RequestMapping(value = "/file/fileReadWrite2", method = RequestMethod.POST)
	public ModelAndView fileReadWrite2( HttpServletRequest request
									, @RequestParam(value = "readFilePath", defaultValue = "", required = false) String readFilePath
									, @RequestParam(value = "readFileName", defaultValue = "", required = false) String readFileName
									, @RequestParam(value = "writeFilePath", defaultValue = "", required = false) String writeFilePath
									, @RequestParam(value = "writeFileName", defaultValue = "", required = false) String writeFileName
									, @RequestParam(value = "setQuestionHtml", defaultValue = "", required = false) String setQuestionHtml) throws Exception {

		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		if (null != readFilePath && !"".equals(readFilePath)) {
			File inFilePath = new File(readFilePath);
			if (!inFilePath.exists()) {
				inFilePath.mkdirs();
			}
		}

		if (null != writeFilePath && !"".equals(writeFilePath)) {
			File outFilePath = new File(writeFilePath);
			if (!outFilePath.exists()) {
				outFilePath.mkdirs();
			}
		}

		if (null != readFilePath && !"".equals(readFilePath)
				&& null != readFileName && !"".equals(readFileName)
				&& null != writeFilePath && !"".equals(writeFilePath)
				&& null != writeFileName && !"".equals(writeFileName)) {

			File inFile = new File(readFilePath, readFileName);
			File outFile = new File(writeFilePath, writeFileName);

			PrintWriter pw = new PrintWriter(new FileWriter(outFile, false));
			BufferedReader br = new BufferedReader(new FileReader(inFile));
			while (true) {
				String line = br.readLine();
				if (line == null)
					break;
				pw.println(line);
			}
			pw.close();
		}

		return mv;
	}

	@ResponseBody
	@RequestMapping(value = "/file/fileReadWrite", method = RequestMethod.POST)
	public ModelAndView fileReadWrite(@RequestBody SlProjectVO slProjectVO, HttpServletRequest request) throws Exception {
		logger.info(">>> /file/fileReadWrite");
		int projectId = slProjectVO.getProjectId();
		int hardCodingId = slProjectVO.getHardCodingId();
		// String questionHtml = slProjectVO.getQuestionHtml();

		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		SlProjectVO selectSlProject = projectService.selectSlProject(slProjectVO);

		SlQuestionViewPageVO slQuestionViewPageVO = new SlQuestionViewPageVO();
		slQuestionViewPageVO.setProjectId(projectId);
		List<SlQuestionViewPageVO> listSlQuestionViewPage = projectService.listSlQuestionViewPage(slQuestionViewPageVO);

		SlQuestionVO slQuestionVO = new SlQuestionVO();
		slQuestionVO.setProjectId(slProjectVO.getProjectId());
		slQuestionVO.setHardCodingId(slProjectVO.getHardCodingId());
		List<SlQuestionVO> listSlQuestion = projectService.listSlQuestion(slQuestionVO);

		logger.info(">>> /file/fileReadWrite listSlQuestion: " + listSlQuestion);
		logger.info(">>> /file/fileReadWrite listSlQuestion.size(): " + listSlQuestion.size());
/*
		for(int i=0; i<listSlQuestion.size(); i++) {
			int questionId = listSlQuestion.get(i).getQuestionId();
			SlQuestionFunctionVO slQuestionFunctionVO = new SlQuestionFunctionVO();
			slQuestionFunctionVO.setProjectId(projectId);
			slQuestionFunctionVO.setQuestionId(questionId);

			List<SlQuestionFunctionVO> listSlQuestionFunction = projectService.listSlQuestionFunction(slQuestionFunctionVO);
			listSlQuestion.get(i).setListSlQuestionFunction(listSlQuestionFunction);
		}
*/
		SlHardCodingVO slHardCodingVO = new SlHardCodingVO();
		slHardCodingVO.setProjectId(slProjectVO.getProjectId());
		slHardCodingVO.setHardCodingId(slProjectVO.getHardCodingId());
		SlHardCodingVO selectSlHardCoding = projectService.selectSlHardCoding(slHardCodingVO);
		String tableName = "";
		if (null != selectSlHardCoding && null != selectSlHardCoding.getHardCodingTableName()) {
			tableName = selectSlHardCoding.getHardCodingTableName();
		}

		logger.info(">>> /file/fileReadWrite tableName: " + tableName);

		String createTableName = "";
		String getQuestionNames = "";
		if (!"".equals(tableName)) {
			Map<String, Object> createTableMap = createTable(tableName, listSlQuestion);

			logger.info(">>> /file/fileReadWrite createTableName: " + createTableName);
			logger.info(">>> /file/fileReadWrite getQuestionNames: " + getQuestionNames);

			createTableName = (String)createTableMap.get("createTableName");
			getQuestionNames = (String) createTableMap.get("setQuestionNames");
			slHardCodingVO.setQuestionSaveColumn(getQuestionNames);

			logger.info(">>> /file/fileReadWrite createTableName: " + createTableName);
			logger.info(">>> /file/fileReadWrite getQuestionNames: " + getQuestionNames);
			mv.addObject("createTableName", createTableName);

			if (null != getQuestionNames && !"".equals(getQuestionNames)) {
				projectService.updateSlHardCoding(slHardCodingVO);
			}
		}

		int setIndex1 = 0;
		for (SlQuestionViewPageVO sqvpv : listSlQuestionViewPage) {

			List<SlQuestionVO> setListSlQuestion = sqvpv.getListSlQuestion();

			int setIndex2 = 0;
			for (SlQuestionVO lq : setListSlQuestion) {
				if (null != slProjectVO && null != slProjectVO.getListQuestionHtml() && 0 < slProjectVO.getListQuestionHtml().size()) {

					int qi = lq.getQuestionId();
					String qn = lq.getQuestionName();

					for (SlQuestionVO lq2 : slProjectVO.getListQuestionHtml()) {

						int qi2 = lq2.getQuestionId();
						String qn2 = lq2.getQuestionName();

						if (qi == qi2 && qn.equals(qn2)) {
							// listSlQuestion[setIndex].setQuestionHtml(lq2.getQuestionHtml());
							listSlQuestionViewPage.get(setIndex1).getListSlQuestion().get(setIndex2)
									.setQuestionHtml(lq2.getQuestionHtml());
						}
					}
				}
				setIndex2++;
			}
			setIndex1++;
		}

		boolean returnVal = false;
		// String setSrc = "/resources";

		if (null != selectSlProject) {
			// logger.info(">>> fileReadWrite selectSlProject is not null");

			String localhostIp = configProperty.getLocalhostIp();
			String localhostPort = configProperty.getLocalhostPort();
			String path = request.getSession().getServletContext().getRealPath("/");
			String hardCodingVersion = configProperty.getHardCodingVersion();
			String hardCodingSaveDirectory = configProperty.getHardCodingSaveDirectory();
			String fileLoadDirectory = configProperty.getFileLoadDirectory();
			String fileSaveDirectory = configProperty.getFileSaveDirectory();
			String saveFileNameJs = "survey1";
			String saveFileNameJs2 = "surveyCommon";

			String setUrl = "http://" + localhostIp + ":" + localhostPort + fileLoadDirectory + hardCodingSaveDirectory;
			String saveDirectory = fileSaveDirectory + hardCodingSaveDirectory + "/" + hardCodingVersion + "/"
					+ projectId;
			String saveDirectoryJs = fileSaveDirectory + hardCodingSaveDirectory + "/" + hardCodingVersion + "/"
					+ projectId + "/js/survey";
			String saveDirectoryCss = fileSaveDirectory + hardCodingSaveDirectory + "/" + hardCodingVersion + "/"
					+ projectId + "/css";

			// save css
			File mkdirCheckCss = new File(saveDirectoryCss);
			if (!mkdirCheckCss.exists()) {
				mkdirCheckCss.mkdirs();
			}
			File inFileCss = new File(path + "/resources/css/", "survey.css");
			File outFileCss = new File(saveDirectoryCss, "survey.css");
			PrintWriter pwCss = new PrintWriter(new FileWriter(outFileCss, false));
			BufferedReader brCss = new BufferedReader(new FileReader(inFileCss));
			while (true) {
				String line = brCss.readLine();
				if (line == null)
					break;
				pwCss.println(line);
			}
			pwCss.close();

			// save js
			File mkdirCheckJs = new File(saveDirectoryJs);
			if (!mkdirCheckJs.exists()) {
				mkdirCheckJs.mkdirs();
			}
			File inFileJs2 = new File(path + "/resources/js/survey", "surveyCommon.js");
			File outFileJs2 = new File(saveDirectoryJs, saveFileNameJs2 + ".js");
			boolean delFileJs2 = true;
			if (outFileJs2.exists()) {
				delFileJs2 = outFileJs2.delete();
			}
			if (delFileJs2) {
				PrintWriter pwJs2 = new PrintWriter(new FileWriter(outFileJs2, false));
				BufferedReader brJs2 = new BufferedReader(new FileReader(inFileJs2));
				while (true) {
					String line = brJs2.readLine();
					if (line == null)
						break;
					pwJs2.println(line);
				}
				pwJs2.close();
			}

			File inFileJs = new File(path + "/resources/js/survey", "survey1.js");
			File outFileJs = new File(saveDirectoryJs, saveFileNameJs + ".js");
			boolean delFileJs = true;
			if (outFileJs.exists()) {
				delFileJs = outFileJs.delete();
			}
			if (delFileJs) {
				PrintWriter pwJs = new PrintWriter(new FileWriter(outFileJs, false));
				BufferedReader brJs = new BufferedReader(new FileReader(inFileJs));
				while (true) {
					String line = brJs.readLine();
					if (line == null)
						break;
					pwJs.println(line);
				}
				pwJs.close();
			}

			// save Info
			File mkdirCheck = new File(saveDirectory);
			if (!mkdirCheck.exists()) {
				mkdirCheck.mkdirs();
			}
			File inFileInfo = new File(path + "/WEB-INF/hardCoding", "hardCodingInfo.jsp");
			File outFileInfo = new File(saveDirectory, "info.jsp");
			boolean delFileInfo = true;
			if (outFileInfo.exists()) {
				delFileInfo = outFileInfo.delete();
			}
			if (delFileInfo) {
				PrintWriter pwInfo = new PrintWriter(new FileWriter(outFileInfo, false));
				BufferedReader brInfo = new BufferedReader(new FileReader(inFileInfo));
				while (true) {
					String line = brInfo.readLine();
					if (line == null)
						break;
					pwInfo.println(line);
				}
				pwInfo.close();
			}

			for (SlQuestionViewPageVO sqvpv : listSlQuestionViewPage) {

				String projectIdStr = String.valueOf(projectId);
				String hardCodingIdStr = String.valueOf(hardCodingId);
				String projectNameOuter = selectSlProject.getProjectNameOuter();
				String businessId = selectSlProject.getBusinessId();

				String pageTitleQuestionId = sqvpv.getPageTitleQuestionId();
				String titleQuestionName = sqvpv.getPageTitleQuestionName();
				String checkMoveQType = sqvpv.getCheckMoveQType();

				String saveJsFileName = saveJsFile(titleQuestionName, saveDirectoryJs);
				//logger.info(">>> fileReadWrite saveJsFileName:" + saveJsFileName);


				List<String> listHeader = new ArrayList<String>();

				listHeader.add(0, "<head>");
				listHeader.add(1, "	<meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />");
				listHeader.add(2, "	<meta name='viewport' content='width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no'/>");
				listHeader.add(3, "	<meta name='format-detection' content='telephone=no, address=no, email=no'/>");
				listHeader.add(4, "	<title>" + projectNameOuter + "</title>");
				listHeader.add(5, "	<link rel='stylesheet' type='text/css' href='" + setUrl + "/" + hardCodingVersion+ "/" + projectIdStr + "/css/survey.css'>");
				listHeader.add(6, "	<script type='text/javascript' charset='utf-8' src='" + setUrl + "/lib/jquery-1.11.1/jquery-1.11.1.min.js' ></script>");
				listHeader.add(7, "	<script type='text/javascript' charset='utf-8' src='" + setUrl + "/js/jquery-1.11.2.min.js' ></script>");
				listHeader.add(8, "	<script type='text/javascript' charset='utf-8' src='" + setUrl + "/js/common/common.js' ></script>");
				listHeader.add(9, "	<script type='text/javascript' charset='utf-8' src='" + setUrl + "/" + hardCodingVersion + "/" + projectIdStr + "/js/survey/" + saveFileNameJs2 + ".js' ></script>");	// surveyCommon
				listHeader.add(9, "	<script type='text/javascript' charset='utf-8' src='" + setUrl + "/" + hardCodingVersion + "/" + projectIdStr + "/js/survey/" + saveFileNameJs + ".js' ></script>");	// survey1
				listHeader.add(10, "	<script type='text/javascript' charset='utf-8' src='" + setUrl + "/" + hardCodingVersion + "/" + projectIdStr + "/js/survey/" + saveJsFileName + "' ></script>");
				listHeader.add(11, "</head>");

				PrintWriter pw = null;

				try {

					File outFileTest = new File(saveDirectory, titleQuestionName + ".jsp");
					boolean delFileTest = true;
					if (outFileTest.exists()) {
						delFileTest = outFileTest.delete();
					}
					if (delFileTest) {

						pw = new PrintWriter(new FileWriter(outFileTest, false));

						File inFileHead = new File(path + "/WEB-INF/hardCoding", "hardCodingHead.jsp");
						File inFileScript = new File(path + "/WEB-INF/hardCoding", "hardCodingScript.jsp");
						File inFileBodyStart = new File(path + "/WEB-INF/hardCoding", "hardCodingBodyStart.jsp");
						File inFileBodyEnd = new File(path + "/WEB-INF/hardCoding", "hardCodingBodyEnd.jsp");
						// File inFileFooter = new
						// File(path+"/WEB-INF/hardCoding","hardCodingFooter.jsp");

						BufferedReader brFileHead = new BufferedReader(new FileReader(inFileHead));
						BufferedReader brFileScript = new BufferedReader(new FileReader(inFileScript));
						BufferedReader brFileBodyStart = new BufferedReader(new FileReader(inFileBodyStart));
						BufferedReader brFileBodyEnd = new BufferedReader(new FileReader(inFileBodyEnd));

						while (true) {
							String line = brFileHead.readLine();
							if (line == null)
								break;
							pw.println(line);
						}

						for (String s : listHeader) {
							pw.println(s);
						}

						while (true) {
							String line = brFileScript.readLine();
							if (line == null)
								break;
							pw.println(line);
						}

						while (true) {
							String line = brFileBodyStart.readLine();
							if (line == null)
								break;
							pw.println(line);
						}

						String questionIds = "";
						String questionNames = "";
						String orignQuestionName = "";
						String questionHtmls = "";
						int setSlQuestionIndex = 1;
						List<SlQuestionVO> setListSlQuestion = sqvpv.getListSlQuestion();

						for (SlQuestionVO sqv : setListSlQuestion) {

							int questionId = sqv.getQuestionId();
							// 로테이션 문항 이름 변경
							String questionName = titleQuestionName;
							String questionType = sqv.getQuestionType();
							String questionHtml = sqv.getQuestionHtml();

							if (1 == setSlQuestionIndex) {
								questionIds = questionIds + questionId;
								questionNames = questionNames + questionName;
							} else {
								questionIds = questionIds + "," + questionId;
								questionNames = questionNames + "," + questionName;
							}
							orignQuestionName = sqv.getQuestionName(); // 로테이션 원본 문항이름
							questionHtmls = questionHtmls + questionHtml;

							setSlQuestionIndex++;
						}
						String setHtml = "		<input type='hidden' name='projectId' value='" + projectIdStr + "' /> \n"
										+ "		<input type='hidden' name='hardCodingId' value='" + hardCodingIdStr + "' /> \n"
										+ "		<input type='hidden' name='uCode' value='<%= uCode%>' /> \n"
										+ "		<input type='hidden' name='businessId' value='" + businessId + "' /> \n"
										+ "		<input type='hidden' name='surveyResult' value='' /> \n"
										+ "		<input type='hidden' name='nextPageName' value='' /> \n"
										+ "		<input type='hidden' name='checkNum' value='<%= checkNum%>' /> \n"
										+ "		<input type='hidden' name='questionId' value='" + questionIds + "' /> \n"
										+ "		<input type='hidden' name='questionName' value='" + questionNames + "' /> \n"
										+ "		<input type='hidden' name='orignQuestionName' value='" + orignQuestionName + "' /> \n"
										+ "		<input type='hidden' name='checkMoveQType' value='" + checkMoveQType + "' /> \n"
										// +" <input type='hidden' name='questionType' value='"+ questionType +"' /> \n"
										+ "		<input type='hidden' name='rotationUse' value='N' /> \n"
										+ "		<input type='hidden' name='rotationMain' value='' /> \n"
										+ "		<input type='hidden' name='rotationIndex' value='1' /> \n"
										+ "		<input type='hidden' name='rotationValue' value='' /> \n"
										;

						pw.println(setHtml);
						pw.println("<div id='setBody'> \n" + questionHtmls + " \n</div> \n");

						//logger.info(">>> fileReadWrite questionHtmls:" + questionHtmls);

						while (true) {
							String line = brFileBodyEnd.readLine();
							if (line == null)
								break;
							pw.println(line);
						}

						returnVal = true;
					}

				} catch (FileNotFoundException e) {
					logger.info(">>> fileReadWrite FileNotFoundException:" + e.getMessage());
				} catch (Exception e) {
					logger.info(">>> fileReadWrite exception:" + e.getMessage());
				} finally {
					if (null != pw) {
						pw.close();
					}
				}

			}
			/*
			 * for (SlQuestionVO sqv : listSlQuestion) { returnVal = false;
			 *
			 * String projectIdStr = String.valueOf(projectId); String
			 * hardCodingIdStr = String.valueOf(hardCodingId); String
			 * projectNameOuter = selectSlProject.getProjectNameOuter();
			 * //logger.info(">>> fileReadWrite listSlQuestion2:" +
			 * projectIdStr);
			 *
			 * int questionId = sqv.getQuestionId(); String questionName =
			 * sqv.getQuestionName(); String questionType =
			 * sqv.getQuestionType(); String questionHtml =
			 * sqv.getQuestionHtml(); //String questionTitle =
			 * sqv.getQuestionTitle(); //String saveFileName =
			 * sqv.getQuestionName(); //String checkNum = sqv.getCheckNum();
			 *
			 * String saveJsFileName = saveJsFile(questionName,
			 * saveDirectoryJs);
			 *
			 * List<String> listHeader = new ArrayList<String>();
			 *
			 * listHeader.add(0,"<head>"); listHeader.add(1,
			 * "	<meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />"
			 * ); listHeader.add(2,
			 * "	<meta name='viewport' content='width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no'/>"
			 * ); listHeader.add(3,
			 * "	<meta name='format-detection' content='telephone=no, address=no, email=no'/>"
			 * ); listHeader.add(4,"	<title>"+ projectNameOuter +"</title>");
			 * listHeader.add(5,
			 * "	<link rel='stylesheet' type='text/css' href='"+ setUrl +"/"+
			 * hardCodingVersion +"/"+ projectIdStr +"/css/survey.css'>");
			 * listHeader.add(6,
			 * "	<script type='text/javascript' charset='utf-8' src='"+
			 * setUrl +"/lib/jquery-1.11.1/jquery-1.11.1.min.js' ></script>");
			 * listHeader.add(7,
			 * "	<script type='text/javascript' charset='utf-8' src='"+
			 * setUrl +"/js/jquery-1.11.2.min.js' ></script>");
			 * listHeader.add(8,
			 * "	<script type='text/javascript' charset='utf-8' src='"+
			 * setUrl +"/js/common/common.js' ></script>"); listHeader.add(9,
			 * "	<script type='text/javascript' charset='utf-8' src='"+
			 * setUrl +"/"+ hardCodingVersion +"/"+ projectIdStr
			 * +"/js/survey/"+saveFileNameJs2+".js' ></script>");
			 * listHeader.add(9,
			 * "	<script type='text/javascript' charset='utf-8' src='"+
			 * setUrl +"/"+ hardCodingVersion +"/"+ projectIdStr
			 * +"/js/survey/"+saveFileNameJs+".js' ></script>");
			 * listHeader.add(10,
			 * "	<script type='text/javascript' charset='utf-8' src='"+
			 * setUrl +"/"+ hardCodingVersion +"/"+ projectIdStr
			 * +"/js/survey/"+saveJsFileName+"' ></script>");
			 * listHeader.add(11,"</head>");
			 *
			 * PrintWriter pw = null;
			 *
			 * try {
			 *
			 * File outFileTest = new File(saveDirectory, questionName+".jsp");
			 * boolean delFileTest = true; if (outFileTest.exists()) {
			 * delFileTest = outFileTest.delete(); } if (delFileTest) {
			 *
			 * pw = new PrintWriter(new FileWriter(outFileTest, false));
			 *
			 * File inFileHead = new
			 * File(path+"/WEB-INF/hardCoding","hardCodingHead.jsp"); File
			 * inFileScript = new
			 * File(path+"/WEB-INF/hardCoding","hardCodingScript.jsp"); File
			 * inFileBodyStart = new
			 * File(path+"/WEB-INF/hardCoding","hardCodingBodyStart.jsp"); File
			 * inFileBodyEnd = new
			 * File(path+"/WEB-INF/hardCoding","hardCodingBodyEnd.jsp"); //File
			 * inFileFooter = new
			 * File(path+"/WEB-INF/hardCoding","hardCodingFooter.jsp");
			 *
			 * BufferedReader brFileHead = new BufferedReader(new
			 * FileReader(inFileHead)); BufferedReader brFileScript = new
			 * BufferedReader(new FileReader(inFileScript)); BufferedReader
			 * brFileBodyStart = new BufferedReader(new
			 * FileReader(inFileBodyStart)); BufferedReader brFileBodyEnd = new
			 * BufferedReader(new FileReader(inFileBodyEnd));
			 *
			 * String setHtml =
			 * "		<input type='hidden' name='projectId' value='"+
			 * projectIdStr +"' /> \n" +
			 * "		<input type='hidden' name='hardCodingId' value='"+
			 * hardCodingIdStr +"' /> \n" +
			 * "		<input type='hidden' name='questionId' value='"+
			 * questionId +"' /> \n" +
			 * "		<input type='hidden' name='questionName' value='"+
			 * questionName +"' /> \n" +
			 * "		<input type='hidden' name='questionType' value='"+
			 * questionType +"' /> \n" +
			 * "		<input type='hidden' name='uCode' value='<%= uCode%>' /> \n"
			 * // Test 시만 사용 //+
			 * "		<input type='hidden' name='checkNum' value='"+ checkNum
			 * +"' /> \n" +
			 * "		<input type='hidden' name='checkNum' value='<%= checkNum%>' /> \n"
			 * //+
			 * "		<input type='hidden' name='surveyState' value='<%= surveyState%>' /> \n"
			 * //+"		<input type='hidden' name='tableName' value='"+
			 * tableName +"' /> \n" ;
			 *
			 * while(true) { String line = brFileHead.readLine(); if
			 * (line==null) break; pw.println(line); }
			 *
			 * for (String s : listHeader) { pw.println(s); }
			 *
			 * while(true) { String line = brFileScript.readLine(); if
			 * (line==null) break; pw.println(line); }
			 *
			 * while(true) { String line = brFileBodyStart.readLine(); if
			 * (line==null) break; pw.println(line); }
			 *
			 * pw.println(setHtml); pw.println("<div id='setBody'> \n"+
			 * questionHtml +" \n</div> \n");
			 *
			 * while(true) { String line = brFileBodyEnd.readLine(); if
			 * (line==null) break; pw.println(line); }
			 *
			 * returnVal = true; } } catch (FileNotFoundException e) {
			 * logger.info(">>> fileReadWrite FileNotFoundException:" +
			 * e.getMessage()); } catch (Exception e) { logger.info(
			 * ">>> fileReadWrite exception:" + e.getMessage()); } finally { if
			 * (null != pw) { pw.close(); } } }
			 */
		}
		mv.addObject("returnVal", returnVal);
		return mv;
	}
	// 사용자 스크립트 등록시 js 덮어쓰기
	@ResponseBody
	@RequestMapping(value = "/file/customScriptFileReadWrite", method = RequestMethod.POST)
	public ModelAndView customScriptFileReadWrite(@RequestBody SlProjectVO slProjectVO, HttpServletRequest request) throws Exception {
		logger.info(">>> /file/customScriptFileReadWrite");
		int projectId = slProjectVO.getProjectId();
		// String questionHtml = slProjectVO.getQuestionHtml();
//		logger.info(">>> /file/customScriptFileReadWrite projectId: " + projectId);

		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		SlProjectVO selectSlProject = projectService.selectSlProject(slProjectVO);
//		logger.info(">>> /file/customScriptFileReadWrite selectSlProject: " + selectSlProject.getProjectId() );

		// 문항 조회
		SlQuestionViewPageVO slQuestionViewPageVO = new SlQuestionViewPageVO();
		slQuestionViewPageVO.setProjectId(projectId);
		List<SlQuestionViewPageVO> listSlQuestionViewPage = projectService.listSlQuestionViewPage(slQuestionViewPageVO);
//		logger.info(">>> /file/customScriptFileReadWrite listSlQuestionViewPage: " + listSlQuestionViewPage.size() );

		// 사용자 스크립트 조회
		SlCustomScriptVO slCustomScript = new SlCustomScriptVO();
		slCustomScript.setProjectId(projectId);
		List<SlCustomScriptVO> listSlCustomScript = this.projectService.listSlCustomScript(slCustomScript);
//		logger.info(">>> /file/customScriptFileReadWrite listSlCustomScript: " + listSlCustomScript.size() );

		boolean returnVal = false;

		if (null != selectSlProject) {

			String hardCodingVersion = configProperty.getHardCodingVersion();
			String hardCodingSaveDirectory = configProperty.getHardCodingSaveDirectory();
			String fileSaveDirectory = configProperty.getFileSaveDirectory();
			String saveDirectoryJs = fileSaveDirectory + hardCodingSaveDirectory + "/" + hardCodingVersion + "/"
					+ projectId + "/js/survey";
			String customScriptGubun = "";	// 스크립트 적용 구분(start / end)
			String textStartCustomJs = "";		// 스크립트 내용 start
			String textEndCustomJs = "";		// 스크립트 내용 end

			for (SlQuestionViewPageVO sqvpv : listSlQuestionViewPage) {							// 설문 문항 돌아가면서

				String titleQuestionName = sqvpv.getPageTitleQuestionName();					// 문항 이름

//				logger.info(">>> /file/customScriptFileReadWrite titleQuestionName: " + titleQuestionName);

				// 사용자 등록 스크립트
				for (SlCustomScriptVO scs : listSlCustomScript) {								// 사용자 스크립트 반복
					if(scs.getDeleteYn().equals("N")) {
						String customScriptApplyCount = scs.getCustomScriptApplyCount();				// 적용될 문항 수
						String customScriptApplyQuestion = scs.getCustomScriptApplyQuestion();		// 적용될 문항 들
						customScriptGubun = scs.getCustomScriptGubun();								// 적용될 스크립트 구분
	//					logger.info(">>> /file/customScriptFileReadWrite customScriptApplyQuestion: " + customScriptApplyQuestion);

						String[] applyQuestionArray = customScriptApplyQuestion.split(",");
	//					logger.info(">>> /file/customScriptFileReadWrite applyQuestionArray.length: " + applyQuestionArray.length);
						for(int i=0; i<applyQuestionArray.length; i++) {
							if("All".equals(customScriptApplyCount) || titleQuestionName.equals(applyQuestionArray[i])) {	// 전체적용 이거나 적용 문항과 문항이 일치하고
								if("start".equals(customScriptGubun)) {														// 구분따라 작성
									//logger.info(">>> scs.getCustomScriptContents(): "+ scs.getCustomScriptContents());
									textStartCustomJs += scs.getCustomScriptContents().replaceAll("\t","    ") + "\n";						// 스크립트 내용 작성
								} else if("end".equals(customScriptGubun)) {
									//logger.info(">>> scs.getCustomScriptContents(): "+ scs.getCustomScriptContents());
									textEndCustomJs += scs.getCustomScriptContents().replaceAll("\t","    ") + "\n";						// 스크립트 내용 작성
								}
								break;
							}
						}
					}
				}

				if(!("".equals(textStartCustomJs)) || !("".equals(textEndCustomJs)) ) {
					// 사용자 등록 스크립트 == 설문 문항
					String saveJsFileName = overwriteJsFile(titleQuestionName, saveDirectoryJs, textStartCustomJs, textEndCustomJs, customScriptGubun);	// js 저장
				}
				textStartCustomJs = "";
				textEndCustomJs = "";
			}
			returnVal = true;
		}

		mv.addObject("returnVal", returnVal);
		return mv;

	}

	@ResponseBody
	@RequestMapping(value = "/file/testFileReadWrite", method = RequestMethod.POST)
	public ModelAndView testFileReadWrite(@RequestBody SlProjectVO slProjectVO, HttpServletRequest request)
			throws Exception {

		int projectId = slProjectVO.getProjectId();
		int hardCodingId = slProjectVO.getHardCodingId();
		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		SlProjectVO selectSlProject = projectService.selectSlProject(slProjectVO);

		boolean returnVal = false;

		if (null != selectSlProject) {
			logger.info(">>> testFileReadWrite selectSlProject is not null");

			String localhostIp = configProperty.getLocalhostIp();
			String localhostPort = configProperty.getLocalhostPort();
			String path = request.getSession().getServletContext().getRealPath("/");
			String hardCodingVersion = configProperty.getHardCodingVersion();
			String hardCodingSaveDirectory = configProperty.getHardCodingSaveDirectory();
			String fileLoadDirectory = configProperty.getFileLoadDirectory();
			String fileSaveDirectory = configProperty.getFileSaveDirectory();
			String saveFileNameJs = "survey1";
			String saveFileNameJs2 = "surveyCommon";

			String setUrl = "http://" + localhostIp + ":" + localhostPort + fileLoadDirectory + hardCodingSaveDirectory;
			String saveDirectory = fileSaveDirectory + hardCodingSaveDirectory + "/" + hardCodingVersion + "/"+ projectId;
			String saveDirectoryJs = fileSaveDirectory + hardCodingSaveDirectory + "/" + hardCodingVersion + "/"+ projectId + "/js/survey";

			returnVal = false;
			String projectIdStr = String.valueOf(projectId);
			String hardCodingIdStr = String.valueOf(hardCodingId);
			String projectNameOuter = selectSlProject.getProjectNameOuter();
			String saveJsFileName = saveJsFile("testList", saveDirectoryJs);
			List<String> listHeader = new ArrayList<String>();

			listHeader.add(0, "<head>");
			listHeader.add(1, "	<meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />");
			listHeader.add(2,"	<meta name='viewport' content='width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no'/>");
			listHeader.add(3, "	<meta name='format-detection' content='telephone=no, address=no, email=no'/>");
			listHeader.add(4, "	<title>" + projectNameOuter + "</title>");
			listHeader.add(5, "	<link rel='stylesheet' type='text/css' href='" + setUrl + "/" + hardCodingVersion + "/"+ projectIdStr + "/css/survey.css'>");
			listHeader.add(6, "	<script type='text/javascript' charset='utf-8' src='" + setUrl+ "/lib/jquery-1.11.1/jquery-1.11.1.min.js' ></script>");
			listHeader.add(7, "	<script type='text/javascript' charset='utf-8' src='" + setUrl+ "/js/jquery-1.11.2.min.js' ></script>");
			listHeader.add(8, "	<script type='text/javascript' charset='utf-8' src='" + setUrl+ "/js/common/common.js' ></script>");
			listHeader.add(9, "	<script type='text/javascript' charset='utf-8' src='" + setUrl + "/" + hardCodingVersion+ "/" + projectIdStr + "/js/survey/" + saveFileNameJs2 + ".js' ></script>");	// surveyCommon
			listHeader.add(9, "	<script type='text/javascript' charset='utf-8' src='" + setUrl + "/" + hardCodingVersion+ "/" + projectIdStr + "/js/survey/" + saveFileNameJs + ".js' ></script>");		// survey1
			listHeader.add(10, "	<script type='text/javascript' charset='utf-8' src='" + setUrl + "/"+ hardCodingVersion + "/" + projectIdStr + "/js/survey/" + saveJsFileName + "' ></script>");
			listHeader.add(11, "</head>");

			PrintWriter pw = null;
			try {

				File mkdirCheck = new File(saveDirectory);
				if (!mkdirCheck.exists()) {
					mkdirCheck.mkdirs();
				}

				File outFileTest = new File(saveDirectory, "test.jsp");
				boolean delFileTest = true;
				if (outFileTest.exists()) {
					delFileTest = outFileTest.delete();
				}
				if (delFileTest) {

					pw = new PrintWriter(new FileWriter(outFileTest, false));

					File inFileHead = new File(path + "/WEB-INF/hardCoding", "hardCodingHead.jsp");
					File inFileScript = new File(path + "/WEB-INF/hardCoding", "hardCodingScript.jsp");
					File inFileBodyStart = new File(path + "/WEB-INF/hardCoding", "hardCodingBodyStart.jsp");
					File inFileBodyEnd = new File(path + "/WEB-INF/hardCoding", "hardCodingBodyEnd.jsp");

					BufferedReader brFileHead = new BufferedReader(new FileReader(inFileHead));
					BufferedReader brFileScript = new BufferedReader(new FileReader(inFileScript));
					BufferedReader brFileBodyStart = new BufferedReader(new FileReader(inFileBodyStart));
					BufferedReader brFileBodyEnd = new BufferedReader(new FileReader(inFileBodyEnd));

					String setHtml = "		<input type='hidden' name='projectId' value='" + projectIdStr + "' /> \n"
									+ "		<input type='hidden' name='hardCodingId' value='" + hardCodingIdStr + "' /> \n"
									+ "		<input type='hidden' name='uCode' value='<%= uCode%>' /> \n"
									+ "		<input type='hidden' name='surveyState' value='<%= surveyState%>' /> \n"
									+ "		<div id='setBody'> \n" + "		</div> \n";

					while (true) {
						String line = brFileHead.readLine();
						if (line == null)
							break;
						logger.info(">>> brFileHead line:" + line);
						pw.println(line);
					}
					for (String s : listHeader) {
						pw.println(s);
					}
					while (true) {
						String line = brFileScript.readLine();
						if (line == null)
							break;
						pw.println(line);
					}
					while (true) {
						String line = brFileBodyStart.readLine();
						if (line == null)
							break;
						pw.println(line);
					}
					pw.println(setHtml);
					while (true) {
						String line = brFileBodyEnd.readLine();
						if (line == null)
							break;
						pw.println(line);
					}
					returnVal = true;
				}

			} catch (FileNotFoundException e) {
				logger.info(">>> fileReadWrite FileNotFoundException:" + e.getMessage());
			} catch (Exception e) {
				logger.info(">>> fileReadWrite exception:" + e.getMessage());
			} finally {
				if (null != pw) {
					pw.close();
				}
			}
		}
		mv.addObject("returnVal", returnVal);
		return mv;
	}

	@RequestMapping(value = "/file/checkSurveyFile", method = RequestMethod.POST)
	public ModelAndView checkSurveyFile(
			@RequestParam(value = "projectId", defaultValue = "0", required = false) int projectId,
			@RequestParam(value = "fileName", defaultValue = "", required = false) String fileName,
			HttpServletRequest request) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		configProperty.setProjectId(projectId);
		String fileDiretory = configProperty.getFileDiretory();

		logger.info(">>> checkFile fileDiretory:" + fileDiretory);
		logger.info(">>> checkFile projectId:" + projectId);
		boolean checkFile = false;
		/*
		File file = new File(fileDiretory, fileName);
		if (file.isFile() && 0 < projectId) {
			checkFile = true;
		}
		*/
		if ( 0 < projectId) {
			checkFile = true;
		}

		mv.addObject("checkFile", checkFile);
		return mv;
	}

	@RequestMapping("/file/fileDownload")
	public ModelAndView fileDownload(@RequestParam(value = "path", defaultValue = "", required = false) String path,
			@RequestParam(value = "fileName", defaultValue = "", required = false) String fileName,
			@RequestParam(value = "projectId", defaultValue = "0", required = false) int projectId,
			HttpServletRequest request) throws Exception {

		String localhostIp = configProperty.getLocalhostIp();
		String localhostPort = configProperty.getLocalhostPort();
		String fullPath = "";

		if ("form".equals(path)) {
			String fileSaveDirectory = configProperty.getFileSaveDirectory();

			if("210.117.6.48".equals(localhostIp)) {
				fullPath = fileSaveDirectory + "/" + fileName;
			} else {
				fullPath = fileSaveDirectory + "\\" + fileName;
			}

			//String fileSaveDirectory = configProperty.getFileLoadDirectory();
			//fullPath = fileSaveDirectory + "\\" + fileName;
			// logger.info(">>> fileDownload fullPath:" + fullPath);
		} else if ("hardCodingFile".equals(path)) {

			String fileSaveDirectory = configProperty.getFileSaveDirectory();
			//String fileSaveDirectory = configProperty.getFileLoadDirectory();
			String hardCodingVersion = configProperty.getHardCodingVersion();
			String hardCodingSaveDirectory = configProperty.getHardCodingSaveDirectory();

			if (0 < projectId) {

				SlHardCodingVO slHardCodingVO = new SlHardCodingVO();
				slHardCodingVO.setProjectId(projectId);
				SlHardCodingVO selectSlHardCoding = projectService.selectSlHardCoding(slHardCodingVO);

				if (null != selectSlHardCoding) {
					String fileSaveName = selectSlHardCoding.getFileSaveName();
					if (null != fileSaveName && !"".equals(fileSaveName)) {
						fullPath = fileSaveDirectory + "/" + hardCodingVersion + hardCodingSaveDirectory + "/"+ selectSlHardCoding.getFileSaveName();
					}
				}
			}
		}

		logger.info(">>> fileDownload fileName:" + fileName);
		logger.info(">>> fileDownload fullPath:" + fullPath);

		File file = new File(fullPath);
		logger.info(">>> fileDownload file:" + file);
		return new ModelAndView("beanDownloadView", "downloadFile", file);
	}

	public FileOutputStream outputWrite(FileOutputStream output, FileInputStream input) {

		String line = System.getProperty("line.separator");
		int readBuffer = 0;
		byte[] buffer = new byte[512];
		try {
			while ((readBuffer = input.read(buffer)) != -1) {
				// logger.info(">>> fileReadWrite inFileFooter data:" +
				// readBuffer);
				// output.write(buffer, 0, readBuffer);
				String html = new String(buffer, 0, readBuffer);
				html = html + "\n";
				output.write(html.getBytes());
			}
		} catch (IOException e) {
			e.printStackTrace();
		}

		return output;
	}

	public Map<String, Object> createTable(String tableName, List<SlQuestionVO> listSlQuestion) throws Exception {

		String createTableName = "";
		String sql = "";
		String setSql = "";
		String setQuestionNames = "";

		sql = "drop table "+ tableName +" " ;
		HashMap<String,Object> dropMap = new HashMap<String,Object>();
		dropMap.put("sql", sql);
		boolean dropTable = projectService.createTable(dropMap);
		logger.info(">>> fileReadWrite dropTable:" + dropTable);

		int countTable = projectService.countTable(tableName);
		logger.info(">>> fileReadWrite countTable:" + countTable);

		/*
		 * sql = "drop table "+ tableName +" " ; HashMap<String,Object> map =
		 * new HashMap<String,Object>(); map.put("sql", sql); boolean dropTable
		 * = projectService.createTable(map);
		 */

		if (0 == countTable) {

			if (null != listSlQuestion && 0 < listSlQuestion.size()) {

				for (int i = 0; i < listSlQuestion.size(); i++) {

					int projectIds = listSlQuestion.get(i).getProjectId();
					int questionIds = listSlQuestion.get(i).getQuestionId();

					SlExampleVO slExampleVO = new SlExampleVO();
					slExampleVO.setProjectId(projectIds);
					slExampleVO.setQuestionId(questionIds);
					List<SlExampleVO> listSlExample = projectService.listSlExample(slExampleVO);
					int eSize = listSlExample.size();

					SlQuestionFunctionVO slQuestionFunctionVO = new SlQuestionFunctionVO();
					slQuestionFunctionVO.setProjectId(projectIds);
					slQuestionFunctionVO.setQuestionId(questionIds);
					List<SlQuestionFunctionVO> listSlQuestionFunction = projectService.listSlQuestionFunction(slQuestionFunctionVO);

					String questionName = listSlQuestion.get(i).getQuestionName();
					String questionType = listSlQuestion.get(i).getQuestionType();
					String questionOption = listSlQuestion.get(i).getQuestionOption();

					//logger.info(">>> createTable getQuestionOption:" + listSlQuestion.get(i).getQuestionOption());
					logger.info(">>> createTable getQuestionOption:" + listSlQuestion.get(i).getQuestionOption());

					boolean setEtc = false;
					boolean setCustomOnlyphone = false;
					boolean setCustomOnlyemail = false;

					for (SlQuestionFunctionVO sqfv : listSlQuestionFunction) {
						logger.info(">>> createTable questionIds:" + questionIds);
						logger.info(">>> createTable sqfv.getQuestionId():" + sqfv.getQuestionId());
						logger.info(">>> createTable sqfv.getFunctionText():" + sqfv.getFunctionText());
						if (questionIds == sqfv.getQuestionId() && (sqfv.getFunctionText()).contains("ETC")) {
							setEtc = true;
						} else if (questionIds == sqfv.getQuestionId() && (sqfv.getFunctionText()).contains("customOnlyphone")) {
							setCustomOnlyphone = true;
						} else if (questionIds == sqfv.getQuestionId() && (sqfv.getFunctionText()).contains("customOnlyemail")) {
							setCustomOnlyemail = true;
						}
					}

					List<Map<String, Object>> listQuestionTypeInfo = fileService.getQuestionTypeInfo("create", questionName, questionType, questionOption, setEtc, setCustomOnlyphone, setCustomOnlyemail, listSlExample, tableName);

					for (Map<String, Object> map : listQuestionTypeInfo) {

						String createSql = (String) map.get("createSql");
						String questionHistory = (String) map.get("questionHistory");
						setSql = setSql + createSql;
						setQuestionNames = setQuestionNames + questionHistory;
					}

					/*
					 * if ("sin".equals(questionType)) {
					 *
					 * setSql = setSql + questionName +
					 * " VARCHAR(50) NULL DEFAULT NULL ,"; setQuestionNames =
					 * setQuestionNames +">"+questionName;
					 *
					 * if ( setEtc ) { setSql = setSql + questionName +
					 * "_text VARCHAR(50) NULL DEFAULT NULL ,"; setQuestionNames
					 * = setQuestionNames +">"+ questionName +"_text"; }
					 *
					 * int checkIndex = 0; for (int j=0; j<listSlExample.size();
					 * j++) {
					 * setExampleColumnName(listSlExample.get(checkIndex).
					 * getExampleId(), questionName); checkIndex++; }
					 *
					 * } else if ("mul".equals(questionType)) {
					 *
					 * setSql = setSql + questionName +
					 * " VARCHAR(50) NULL DEFAULT NULL ,"; setQuestionNames =
					 * setQuestionNames +">"+questionName; if ( setEtc ) {
					 * setSql = setSql + questionName +
					 * "_text VARCHAR(50) NULL DEFAULT NULL ,"; setQuestionNames
					 * = setQuestionNames +">"+ questionName +"_text"; }
					 *
					 * int checkIndex = 0; for (int j=0; j<listSlExample.size();
					 * j++) {
					 * setExampleColumnName(listSlExample.get(checkIndex).
					 * getExampleId(), questionName); checkIndex++; }
					 *
					 * } else if ("ord".equals(questionType)) {
					 *
					 * int checkIndex = 0; //for (SlExampleVO sev :
					 * listSlExample) { for (int j=0; j<listSlExample.size();
					 * j++) {
					 *
					 * String setCheckIndex = String.valueOf(checkIndex + 1);
					 *
					 * setSql = setSql + questionName +"_"+ setCheckIndex +
					 * " VARCHAR(50) NULL DEFAULT NULL ,"; setQuestionNames =
					 * setQuestionNames +">"+ questionName +"_"+ setCheckIndex;
					 *
					 * setExampleColumnName(listSlExample.get(checkIndex).
					 * getExampleId(), questionName +"_"+ setCheckIndex);
					 *
					 * if ( setEtc && eSize == (checkIndex+1) ) { //setSql =
					 * setSql + questionName +"_"+ checkIndex +
					 * "_text VARCHAR(50) NULL DEFAULT NULL ,"; setSql = setSql
					 * + questionName +"_text VARCHAR(50) NULL DEFAULT NULL ,";
					 * setQuestionNames = setQuestionNames +">"+ questionName
					 * +"_text"; } checkIndex++; }
					 *
					 * } else if ("tex".equals(questionType) ||
					 * "num".equals(questionType)) {
					 *
					 * if (0 < eSize) { int checkIndex = 0; //for (SlExampleVO
					 * sev : listSlExample) { for (int j=0;
					 * j<listSlExample.size(); j++) {
					 *
					 * String setCheckIndex = String.valueOf(checkIndex + 1);
					 *
					 * setSql = setSql + questionName +"_"+ setCheckIndex +
					 * " VARCHAR(50) NULL DEFAULT NULL ,"; setQuestionNames =
					 * setQuestionNames +">"+ questionName +"_"+ setCheckIndex;
					 *
					 * setExampleColumnName(listSlExample.get(checkIndex).
					 * getExampleId(), questionName +"_"+ checkIndex);
					 *
					 * checkIndex++; } } else { setSql = setSql + questionName +
					 * " VARCHAR(50) NULL DEFAULT NULL ,"; setQuestionNames =
					 * setQuestionNames +">"+questionName; } } else if
					 * ("sca".equals(questionType)) {
					 *
					 * setSql = setSql + questionName +
					 * " VARCHAR(50) NULL DEFAULT NULL ,"; setQuestionNames =
					 * setQuestionNames +">"+questionName;
					 *
					 * int checkIndex = 0; for (int j=0; j<listSlExample.size();
					 * j++) {
					 * setExampleColumnName(listSlExample.get(checkIndex).
					 * getExampleId(), questionName); checkIndex++; }
					 *
					 * } else if ("att".equals(questionType)) {
					 *
					 * int checkIndex = 0; boolean checkText = true; for
					 * (SlExampleVO sev : listSlExample) {
					 *
					 * String setCheckIndex = String.valueOf(checkIndex + 1);
					 *
					 * if ("$$@@$$".equals(sev.getExampleText())) { checkText =
					 * false; } if (checkText) { setSql = setSql + questionName
					 * +"_"+ setCheckIndex + " VARCHAR(50) NULL DEFAULT NULL ,";
					 * setQuestionNames = setQuestionNames +">"+ questionName
					 * +"_"+ setCheckIndex;
					 *
					 * setExampleColumnName(listSlExample.get(checkIndex).
					 * getExampleId(), questionName +"_"+ setCheckIndex); } if (
					 * setEtc && eSize == (checkIndex+1) ) { setSql = setSql +
					 * questionName +"_text VARCHAR(50) NULL DEFAULT NULL ,";
					 * setQuestionNames = setQuestionNames +">"+ questionName
					 * +"_text"; } checkIndex++; } } else if
					 * ("textarea".equals(questionType)) {
					 *
					 * setSql = setSql + questionName +
					 * " VARCHAR(500) NULL DEFAULT NULL ,"; setQuestionNames =
					 * setQuestionNames +">"+questionName;
					 *
					 * } else if ("media".equals(questionType)) {
					 *
					 * setSql = setSql + questionName +
					 * " VARCHAR(50) NULL DEFAULT NULL ,"; setQuestionNames =
					 * setQuestionNames +">"+questionName;
					 *
					 * }else if ("info".equals(questionType)) {
					 *
					 * }
					 */

				}

				logger.info(">>> createTable setSql:" + setSql);
			}

			sql = "CREATE TABLE " + tableName + " (" + "	surveyId INT(11) NOT NULL AUTO_INCREMENT,"
					+ "	uCode VARCHAR(50) NULL DEFAULT NULL," + "	projectId INT(11) NULL DEFAULT NULL ,"
					+ "	hardCodingId INT(11) NULL DEFAULT NULL,"
					+ setSql
					+ "	cType VARCHAR(10) NULL DEFAULT NULL DEFAULT '0',"
					+ "	regDate VARCHAR(50) NULL DEFAULT NULL,"
					+ "	updateDate VARCHAR(50) NULL DEFAULT NULL," + "	deleteYn VARCHAR(50) NULL DEFAULT 'N',"
					+ "	surveyState VARCHAR(10) NULL DEFAULT NULL DEFAULT '0',"
					+ "	surveyLast VARCHAR(50) NULL DEFAULT NULL," + "	surveyHistory VARCHAR(500) NULL DEFAULT NULL,"
					+ "	pageHistory VARCHAR(500) NULL DEFAULT NULL," + "	pageSaveIndex INT(10) NULL DEFAULT 0,"
					+ "	pageSaveQuestionId VARCHAR(50) NULL DEFAULT NULL,"
					+ "	pageSaveQuestionName VARCHAR(50) NULL DEFAULT NULL,"
					+ "	pageLastIndex INT(10) NULL DEFAULT 0," + "	pageLastQuestionId VARCHAR(50) NULL DEFAULT NULL,"
					+ "	pageLastQuestionName VARCHAR(50) NULL DEFAULT NULL,"
					+ "	pageQuestionId INT(10) NULL DEFAULT 0," + "	checkNum INT(100) NULL DEFAULT NULL,"
					+ "	PRIMARY KEY (`surveyId`)" + ")"
			// +"COMMENT='설문 응답'"
			// +"COLLATE='utf8_general_ci'"
			// +"ENGINE=InnoDB"
			// +"AUTO_INCREMENT=46"
			;
			logger.info(">>> createTable sql:" + sql);
			HashMap<String, Object> map = new HashMap<String, Object>();
			map.put("sql", sql);
			boolean createTable = projectService.createTable(map);
			logger.info(">>> fileReadWrite createTable:" + createTable);
			if (createTable) {
				createTableName = tableName;
			}
		} else if (1 == countTable) {
			createTableName = tableName;
		}
		logger.info(">>> createTable createTableName:" + createTableName);
		/*
		 * String createTableName = ""; String sql = ""; if (0==countTable) {
		 * sql = "CREATE TABLE "+ tableName +" (" +
		 * "	surveyId INT(11) NOT NULL AUTO_INCREMENT," +
		 * "	uCode VARCHAR(50) NULL DEFAULT NULL," +
		 * "	projectId INT(11) NULL DEFAULT NULL ," +
		 * "	hardCodingId INT(11) NULL DEFAULT NULL," +
		 * "	questionId INT(11) NULL DEFAULT NULL ," +
		 * "	questionType VARCHAR(50) NULL DEFAULT NULL," +
		 * "	questionName VARCHAR(50) NULL DEFAULT NULL," +
		 * "	exampleId VARCHAR(50) NULL DEFAULT NULL ," +
		 * "	exampleIndex INT(11) NULL DEFAULT NULL," +
		 * "	exampleText VARCHAR(200) NULL DEFAULT NULL ," +
		 * "	exampleValue VARCHAR(200) NULL DEFAULT NULL ," +
		 * "	regDate VARCHAR(50) NULL DEFAULT NULL," +
		 * "	deleteYn VARCHAR(50) NULL DEFAULT 'N'," +
		 * "	PRIMARY KEY (`surveyId`)" +")" //+"COMMENT='설문 응답'"
		 * //+"COLLATE='utf8_general_ci'" //+"ENGINE=InnoDB"
		 * //+"AUTO_INCREMENT=46" ; HashMap map = new HashMap(); map.put("sql",
		 * sql); boolean createTable = projectService.createTable(map);
		 * logger.info(">>> fileReadWrite createTable:" + createTable); if
		 * (createTable) { createTableName = tableName; } } else if
		 * (1==countTable) { createTableName = tableName; }
		 */

		Map<String, Object> returnMap = new HashMap<String, Object>();
		returnMap.put("createTableName", createTableName);
		returnMap.put("setQuestionNames", setQuestionNames);
		return returnMap;
	}

	public String saveJsFile(String questionName, String saveDirectoryJs) {

		String saveJsFileName = questionName + ".js";
		String jsName = questionName + "Js";
		if(jsName.indexOf("-") != -1) {
			jsName = jsName.replace("-", "_");
		}
		FileOutputStream output = null;
		try {

			File mkdirCheck = new File(saveDirectoryJs);
			if (!mkdirCheck.exists()) {
				mkdirCheck.mkdirs();
			}

			File outFile = new File(saveDirectoryJs, saveJsFileName);
			output = new FileOutputStream(outFile);

			String line = System.getProperty("line.separator");

			String setHtml = "";
			if ("testList".equals(questionName)) {

				setHtml = "var " + jsName + " = { \n"
						+ "	init : function(){ \n"
						+ "		serveyJs.init('testList'); \n"
						+ "	} \n"
						+ "} \n"
						+ "$(function(){ \n"
						+ "		" + jsName+ ".init(); \n"
						+ "}); \n";
			} else {
				setHtml = "var " + jsName + " = { \n"
						+ "	init : function(){ \n"
						+ "		serveyJs.init(''); \n"
						+ "		$('#bt_next').on('click', function(){ " + jsName + ".clickBtNext(); }); \n"
						+ "	}, \n"
						+ "	clickBtNext : function(){ \n"
						+ "		/* \n"
						+ "		var checkVal = $(\"[name='Q1']:checked\").val(); \n"
						+ "		if(checkVal == 3) { \n"
						+ "			// 페이지 이동 \n"
						+ "			//$(\"[name='nextPageName']\").val('Q3'); \n"
						+ "			// 스크린 아웃 \n"
						+ "			//$(\"[name='surveyResult']\").val('S'); \n"
						+ "		} \n"
						+ "		*/ \n"
						+ "		var checkValidation = serveyJs.checkValidation(); \n"
						+ "		var addValidation = "
						+ jsName + ".addValidation(); \n"
						+ "		if (checkValidation && addValidation) { \n"
						+ "			serveyJs.clickBtNext(); \n"
						+ "		} \n"
						+ "	}, \n"
						+ "	addValidation : function () { \n"
						+ "		return true; \n"
						+ "	} \n"
						+ "} \n"
						+ "$(function(){ \n"
						+ "	" + jsName + ".init(); \n"
						+ "}); \n";
			}

			setHtml = setHtml.replace("\n", line);
			output.write(setHtml.getBytes());

		} catch (FileNotFoundException e) {
			logger.info(">>> saveJsFile FileNotFoundException:" + e.getMessage());
		} catch (Exception e) {
			logger.info(">>> saveJsFile exception:" + e.getMessage());
		} finally {
			try {
				output.close();
			} catch (IOException e) {
				logger.info(">>> saveJsFile close IOException:" + e.getMessage());
			}
		}

		return saveJsFileName;
	}

	// 사용자 스크립트 저장시 덮어쓸 js
	public String overwriteJsFile(String questionName, String saveDirectoryJs, String textStartCustomJs, String textEndCustomJs, String customScriptGubun) {

		String saveJsFileName = questionName + ".js";
		String jsName = questionName + "Js";
		if(jsName.indexOf("-") != -1) {
			jsName = jsName.replace("-", "_");
		}
		FileOutputStream output = null;

		// js 덮어쓰기
		try {

			// 폴더 없으면 생성
			File mkdirCheck = new File(saveDirectoryJs);
			if (!mkdirCheck.exists()) {
				mkdirCheck.mkdirs();
			}

			// 파일 생성
			File outFile = new File(saveDirectoryJs, saveJsFileName);

			// 파일 존재하면 삭제
			boolean delFileJs = true;
			if (outFile.exists()) {
				delFileJs = outFile.delete();
			}
			if (delFileJs) {
				output = new FileOutputStream(outFile);

				String line = System.getProperty("line.separator");

				String setHtml = "";
				if ("testList".equals(questionName)) {

					setHtml = "var " + jsName + " = { \n"
							+ "	init : function(){ \n"
							+ "		serveyJs.init('testList'); \n"
							+ "	} \n"
							+ "} \n"
							+ "$(function(){ \n"
							+ "		" + jsName+ ".init(); \n"
							+ "}); \n";
				} else {
					setHtml = "var " + jsName + " = { \n"
							+ "	init : function(){ \n"
							+ "		serveyJs.init(''); \n"
							+ "		$('#bt_next').on('click', function(){ " + jsName + ".clickBtNext(); }); \n"
							+ "\n" + textStartCustomJs + "\n"
							+ "	}, \n"
							+ "	clickBtNext : function(){ \n"
							+ "		var checkValidation = serveyJs.checkValidation(); \n"
							+ "		var addValidation = "
							+ jsName + ".addValidation(); \n"
							+ "		if (checkValidation && addValidation) { \n"
							+ "\n" + textEndCustomJs + "\n"
							+ "			serveyJs.clickBtNext(); \n"
							+ "		} \n"
							+ "	}, \n"
							+ "	addValidation : function () { \n"
							+ "		return true; \n"
							+ "	} \n"
							+ "} \n"
							+ "$(function(){ \n"
							+ "	" + jsName + ".init(); \n"
							+ "}); \n";
				}

				setHtml = setHtml.replace("\n", line);
				output.write(setHtml.getBytes());
			}

		} catch (FileNotFoundException e) {
			logger.info(">>> overwriteJsFile FileNotFoundException:" + e.getMessage());
		} catch (Exception e) {
			logger.info(">>> overwriteJsFile exception:" + e.getMessage());
		} finally {
			try {
				output.close();
			} catch (IOException e) {
				logger.info(">>> overwriteJsFile close IOException:" + e.getMessage());
			}
		}

		return saveJsFileName;
	}

	public boolean setExampleColumnName(int exampleId, String columnName) throws Exception {

		boolean updateSlExample = false;
		if (0 < exampleId && !"".equals(columnName)) {

			SlExampleVO slExampleVO = new SlExampleVO();
			slExampleVO.setExampleId(exampleId);
			slExampleVO.setColumnName(columnName);
			updateSlExample = projectService.updateSlExample(slExampleVO);
		}

		return updateSlExample;
	}

	//단일파일업로드
	@RequestMapping(value = "/editor/photoUpload", method = RequestMethod.POST)
	public String photoUpload(HttpServletRequest request, PhotoVO vo){
		logger.info(">>> /editor/photoUpload");
	    String callback = vo.getCallback();
	    String callback_func = vo.getCallback_func();
	    String file_result = "";

	    try {
	        if(vo.getFiledata() != null && vo.getFiledata().getOriginalFilename() != null && !vo.getFiledata().getOriginalFilename().equals("")){
	            //파일이 존재하면
	            String original_name = vo.getFiledata().getOriginalFilename();
	            String ext = original_name.substring(original_name.lastIndexOf(".")+1);
	            //파일 기본경로
	            //String defaultPath = request.getSession().getServletContext().getRealPath("/");
	            String defaultPath = "C:/workspace_sts/SurveySolution/src/main/webapp/";
	            //파일 기본경로 _ 상세경로
	            String path = defaultPath + "resources" + File.separator + "photoUpload" + File.separator;
	            File file = new File(path);

	            logger.info(">>> /editor/photoUpload defaultPath: " + defaultPath);
	            logger.info(">>> /editor/photoUpload path: " + path);

	            System.out.println("path:"+path);
	            //디렉토리 존재하지 않을경우 디렉토리 생성
	            if(!file.exists()) {
	                file.mkdirs();
	            }
	            //서버에 업로드 할 파일명(한글문제로 인해 원본파일은 올리지 않는것이 좋음)
	            String realname = UUID.randomUUID().toString() + "." + ext;
	            logger.info(">>> /editor/photoUpload realname: " + realname);
	        ///////////////// 서버에 파일쓰기 /////////////////
	            vo.getFiledata().transferTo(new File(path+realname));
	            file_result += "&bNewLine=true&sFileName="+original_name+"&sFileURL=/resources/photoUpload/"+realname;
	        } else {
	            file_result += "&errstr=error";
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	    }


	    return "redirect:" + callback + "?callback_func="+callback_func+file_result;
	}
}
