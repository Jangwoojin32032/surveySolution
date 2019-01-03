package kr.co.netpoint.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.netpoint.controller.FileController;
import kr.co.netpoint.vo.project.SlExampleVO;
import kr.co.netpoint.vo.project.SlHardCodingVO;
import kr.co.netpoint.vo.project.SlQuestionFunctionVO;

@Service("FileService")
public class FileService {

	static final Logger logger = LoggerFactory.getLogger(FileController.class);

	@Autowired
	private ProjectService projectService;

	public List<Map<String,Object>> getQuestionTypeInfo (String useType, String questionName, String questionType, String questionOption, boolean setEtc, boolean setCustomOnlyphone, boolean setCustomOnlyemail, List<SlExampleVO> listSlExample, String tableName) throws Exception {

		//String rotQuestionName = "rot"+ questionName;
		int eSize = listSlExample.size();

		List<Map<String,Object>> listQuestionTypeInfo = new ArrayList<Map<String,Object>>();
		Map<String, Object> map = new HashMap<String, Object>();

		if ("sin".equals(questionType)) {

			map = new HashMap<String,Object>();
			if ("alterAdd".equals(useType)) {
				map.put("alterSql", "alter table "+ tableName +" add "+ "`" + questionName + "`" +" VARCHAR(50) NULL DEFAULT NULL");
				map.put("columnName", questionName);

			} else if ("alterDrop".equals(useType)) {
				map.put("alterSql", "alter table "+ tableName +" drop "+ "`" + questionName + "`" +" ");
				map.put("columnName", questionName);

			} else if ("create".equals(useType)) {
				map.put("createSql", "`" + questionName + "`" +" VARCHAR(50) NULL DEFAULT NULL ,");
				map.put("questionHistory", ">"+questionName);
			}
			listQuestionTypeInfo.add(map);

			if ( setEtc ) {
				map = new HashMap<String,Object>();
				// alter
				if ("alterAdd".equals(useType)) {
					map.put("alterSql", "alter table "+ tableName +" add "+ "`" + questionName +"_text` VARCHAR(50) NULL DEFAULT NULL");
					map.put("columnName", questionName +"_text");

				} else if ("alterDrop".equals(useType)) {
					map.put("alterSql", "alter table "+ tableName +" drop "+ "`" + questionName +"_text` ");
					map.put("columnName", questionName +"_text");

				} else if ("create".equals(useType)) {
					// create
					map.put("createSql", "`" + questionName +"_text` VARCHAR(50) NULL DEFAULT NULL ,");
					map.put("questionHistory", ">"+ questionName +"_text");
				}
				listQuestionTypeInfo.add(map);
			}

			if ("create".equals(useType)) {
				int checkIndex = 0;
				for (int j=0; j<listSlExample.size(); j++) {
					setExampleColumnName(listSlExample.get(checkIndex).getExampleId(), questionName);
					checkIndex++;
				}
			}

		} else if ("mul".equals(questionType)) {
			/*
			map = new HashMap<String,Object>();
			// alter
			if ("alterAdd".equals(useType)) {
				map.put("alterSql", "alter table "+ tableName +" add "+ questionName +" VARCHAR(50) NULL DEFAULT NULL");
				map.put("columnName", questionName);

			} else if ("alterDrop".equals(useType)) {
				map.put("alterSql", "alter table "+ tableName +" drop "+ questionName +" ");
				map.put("columnName", questionName);

			} else if ("create".equals(useType)) {
				map.put("createSql", questionName +" VARCHAR(50) NULL DEFAULT NULL ,");
				map.put("questionHistory", ">"+questionName);
			}
			listQuestionTypeInfo.add(map);

			if ( setEtc ) {
				map = new HashMap<String,Object>();
				// alter
				if ("alterAdd".equals(useType)) {
					map.put("alterSql", "alter table "+ tableName +" add "+ questionName +"_text VARCHAR(50) NULL DEFAULT NULL");
					map.put("columnName", questionName +"_text");

				} else if ("alterDrop".equals(useType)) {
					map.put("alterSql", "alter table "+ tableName +" drop "+ questionName +"_text ");
					map.put("columnName", questionName +"_text");

				} else if ("create".equals(useType)) {
					map.put("createSql", questionName +"_text VARCHAR(50) NULL DEFAULT NULL ,");
					map.put("questionHistory", ">"+ questionName +"_text");
				}
				listQuestionTypeInfo.add(map);
			}

			if ("create".equals(useType)) {
				int checkIndex = 0;
				for (int j=0; j<listSlExample.size(); j++) {
					setExampleColumnName(listSlExample.get(checkIndex).getExampleId(), questionName);
					checkIndex++;
				}
			}
			*/

			int checkIndex = 0;
			for (int j=0; j<listSlExample.size(); j++) {

				String setCheckIndex = String.valueOf(checkIndex + 1);
				map = new HashMap<String,Object>();
				// alter
				if ("alterAdd".equals(useType)) {
					map.put("alterSql", "alter table "+ tableName +" add "+ "`" + questionName +"_"+ setCheckIndex +"` VARCHAR(50) NULL DEFAULT NULL");
					map.put("columnName", questionName +"_"+ setCheckIndex);

				} else if ("alterDrop".equals(useType)) {
					map.put("alterSql", "alter table "+ tableName +" drop "+ "`" + questionName +"_"+ setCheckIndex +"` ");
					map.put("columnName", questionName +"_"+ setCheckIndex);

				} else if ("create".equals(useType)) {
					map.put("createSql", "`" + questionName +"_"+ setCheckIndex + "` VARCHAR(50) NULL DEFAULT NULL ,");
					map.put("questionHistory", ">"+ questionName +"_"+ setCheckIndex);
				}
				listQuestionTypeInfo.add(map);

				if ( setEtc && eSize == (checkIndex+1) ) {
					map = new HashMap<String,Object>();
					if ("alterAdd".equals(useType)) {
						map.put("alterSql", "alter table "+ tableName +" add "+ "`" + questionName +"_text` VARCHAR(50) NULL DEFAULT NULL");
						map.put("columnName", questionName +"_text");

					} else if ("alterDrop".equals(useType)) {
						map.put("alterSql", "alter table "+ tableName +" drop "+ "`" + questionName +"_text` ");
						map.put("columnName", questionName +"_text");

					} else if ("create".equals(useType)) {
						map.put("createSql", "`" + questionName +"_text` VARCHAR(50) NULL DEFAULT NULL ,");
						map.put("questionHistory", ">"+ questionName +"_text");
					}
					listQuestionTypeInfo.add(map);
				}
				checkIndex++;
			}

		} else if ("ord".equals(questionType)) {

			int checkIndex = 0;
			for (int j=0; j<listSlExample.size(); j++) {

				String setCheckIndex = String.valueOf(checkIndex + 1);
				map = new HashMap<String,Object>();
				// alter
				if ("alterAdd".equals(useType)) {
					map.put("alterSql", "alter table "+ tableName +" add "+ "`" + questionName +"_"+ setCheckIndex +"` VARCHAR(50) NULL DEFAULT NULL");
					map.put("columnName", questionName +"_"+ setCheckIndex);

				} else if ("alterDrop".equals(useType)) {
					map.put("alterSql", "alter table "+ tableName +" drop "+ "`" + questionName +"_"+ setCheckIndex +"` ");
					map.put("columnName", questionName +"_"+ setCheckIndex);

				} else if ("create".equals(useType)) {
					map.put("createSql", "`" + questionName +"_"+ setCheckIndex + "` VARCHAR(50) NULL DEFAULT NULL ,");
					map.put("questionHistory", ">"+ questionName +"_"+ setCheckIndex);
				}
				listQuestionTypeInfo.add(map);

				if ( setEtc && eSize == (checkIndex+1) ) {
					map = new HashMap<String,Object>();
					if ("alterAdd".equals(useType)) {
						map.put("alterSql", "alter table "+ tableName +" add "+ "`" + questionName +"_text` VARCHAR(50) NULL DEFAULT NULL");
						map.put("columnName", questionName +"_text");

					} else if ("alterDrop".equals(useType)) {
						map.put("alterSql", "alter table "+ tableName +" drop "+ "`" + questionName +"_text` ");
						map.put("columnName", questionName +"_text");

					} else if ("create".equals(useType)) {
						map.put("createSql", "`" + questionName +"_text` VARCHAR(50) NULL DEFAULT NULL ,");
						map.put("questionHistory", ">"+ questionName +"_text");
					}
					listQuestionTypeInfo.add(map);
				}
				checkIndex++;
			}

		} else if ("tex".equals(questionType) || "num".equals(questionType)) {

			if (0 < eSize) {
				int checkIndex = 0;
				for (int j=0; j<listSlExample.size(); j++) {

					logger.info(">>> getQuestionTypeInfo listSlExample.get("+j+").getExampleLogicText():" + listSlExample.get(j).getExampleLogicText());

					if(listSlExample.get(j).getExampleLogicText() != null && "customExample".equals(listSlExample.get(j).getExampleLogicText())) {
						// 사용자정의 보기 앞뒤 설명이 있는 경우
						if(listSlExample.size() == 2) {
							// 설명이 2개인 경우 >>> 응답값은 1
							map = new HashMap<String,Object>();
							if ("alterAdd".equals(useType)) {
								map.put("alterSql", "alter table "+ tableName +" add "+ "`" + questionName +"` VARCHAR(50) NULL DEFAULT NULL");
								map.put("columnName", questionName);

							} else if ("alterDrop".equals(useType)) {
								map.put("alterSql", "alter table "+ tableName +" drop "+ "`" + questionName +"` ");
								map.put("columnName", questionName);

							} else if ("create".equals(useType)) {
								map.put("createSql", "`" + questionName +"` VARCHAR(50) NULL DEFAULT NULL ,");
								map.put("questionHistory", ">"+questionName);
							}
							listQuestionTypeInfo.add(map);
							break; // 응답칼럼 1개만들고 빠져나감
						} else {
							// 설명이 3개인 경우 >>> 응답값은 2...
							String setCheckIndex = String.valueOf(checkIndex + 1);
							map = new HashMap<String,Object>();
							if ("alterAdd".equals(useType)) {
								map.put("alterSql", "alter table "+ tableName +" add "+ "`" + questionName +"_"+ setCheckIndex +"` VARCHAR(50) NULL DEFAULT NULL");
								map.put("columnName", questionName +"_"+ setCheckIndex);

							} else if ("alterDrop".equals(useType)) {
								map.put("alterSql", "alter table "+ tableName +" drop "+ "`" + questionName +"_"+ setCheckIndex +"` ");
								map.put("columnName", questionName +"_"+ setCheckIndex);

							} else if ("create".equals(useType)) {
								map.put("createSql", "`" + questionName +"_"+ setCheckIndex + "` VARCHAR(50) NULL DEFAULT NULL ,");
								map.put("questionHistory", ">"+ questionName +"_"+ setCheckIndex);
							}
							// create
							listQuestionTypeInfo.add(map);
							checkIndex++;
							if(listSlExample.size() == j+2) {
								break; // 보기사이즈-1 응답칼럼 만들고 빠져나감
							}
						}
					} else {
						// 일반 오픈문항
						String setCheckIndex = String.valueOf(checkIndex + 1);
						map = new HashMap<String,Object>();
						if ("alterAdd".equals(useType)) {
							map.put("alterSql", "alter table "+ tableName +" add "+ "`" + questionName +"_"+ setCheckIndex +"` VARCHAR(50) NULL DEFAULT NULL");
							map.put("columnName", questionName +"_"+ setCheckIndex);

						} else if ("alterDrop".equals(useType)) {
							map.put("alterSql", "alter table "+ tableName +" drop "+ "`" + questionName +"_"+ setCheckIndex +"` ");
							map.put("columnName", questionName +"_"+ setCheckIndex);

						} else if ("create".equals(useType)) {
							map.put("createSql", "`" + questionName +"_"+ setCheckIndex + "` VARCHAR(50) NULL DEFAULT NULL ,");
							map.put("questionHistory", ">"+ questionName +"_"+ setCheckIndex);
						}
						// create
						listQuestionTypeInfo.add(map);
						checkIndex++;
					}
				}
			} else {
				// 사용자정의 보기 전화번호/이메일 입력 시
				if(null != questionOption && "customExample".equals(questionOption)) {
					logger.info(">>> getQuestionTypeInfo questionOption:" + questionOption);
					logger.info(">>> getQuestionTypeInfo setCustomOnlyphone:" + setCustomOnlyphone);
					logger.info(">>> getQuestionTypeInfo setCustomOnlyemail:" + setCustomOnlyemail);

					int checkIndex = 0;
					if(setCustomOnlyphone) {
						// 전화번호는 응답칼럼 문항_1 문항_2 문항_3
						for(int i=0; i<3; i++) {
							String setCheckIndex = String.valueOf(checkIndex + 1);
							map = new HashMap<String,Object>();
							if ("alterAdd".equals(useType)) {
								map.put("alterSql", "alter table "+ tableName +" add "+ "`" + questionName +"_"+ setCheckIndex +"` VARCHAR(50) NULL DEFAULT NULL");
								map.put("columnName", questionName +"_"+ setCheckIndex);

							} else if ("alterDrop".equals(useType)) {
								map.put("alterSql", "alter table "+ tableName +" drop "+ "`" + questionName +"_"+ setCheckIndex +"` ");
								map.put("columnName", questionName +"_"+ setCheckIndex);

							} else if ("create".equals(useType)) {
								map.put("createSql", "`" + questionName +"_"+ setCheckIndex + "` VARCHAR(50) NULL DEFAULT NULL ,");
								map.put("questionHistory", ">"+ questionName +"_"+ setCheckIndex);
							}
							// create
							listQuestionTypeInfo.add(map);
							checkIndex++;
						}
					} else if(setCustomOnlyemail) {
						// 전화번호는 응답칼럼 문항_1 문항_2 문항_3
						for(int i=0; i<2; i++) {
							String setCheckIndex = String.valueOf(checkIndex + 1);
							map = new HashMap<String,Object>();
							if ("alterAdd".equals(useType)) {
								map.put("alterSql", "alter table "+ tableName +" add "+ "`" + questionName +"_"+ setCheckIndex +"` VARCHAR(50) NULL DEFAULT NULL");
								map.put("columnName", questionName +"_"+ setCheckIndex);

							} else if ("alterDrop".equals(useType)) {
								map.put("alterSql", "alter table "+ tableName +" drop "+ "`" + questionName +"_"+ setCheckIndex +"` ");
								map.put("columnName", questionName +"_"+ setCheckIndex);

							} else if ("create".equals(useType)) {
								map.put("createSql", "`" + questionName +"_"+ setCheckIndex + "` VARCHAR(50) NULL DEFAULT NULL ,");
								map.put("questionHistory", ">"+ questionName +"_"+ setCheckIndex);
							}
							// create
							listQuestionTypeInfo.add(map);
							checkIndex++;
						}
					}
				} else {
					map = new HashMap<String,Object>();
					if ("alterAdd".equals(useType)) {
						map.put("alterSql", "alter table "+ tableName +" add "+ "`" + questionName +"` VARCHAR(50) NULL DEFAULT NULL");
						map.put("columnName", questionName);

					} else if ("alterDrop".equals(useType)) {
						map.put("alterSql", "alter table "+ tableName +" drop "+ "`" + questionName +"` ");
						map.put("columnName", questionName);

					} else if ("create".equals(useType)) {
						map.put("createSql", "`" + questionName +"` VARCHAR(50) NULL DEFAULT NULL ,");
						map.put("questionHistory", ">"+questionName);
					}
					listQuestionTypeInfo.add(map);
				}
			}

		} else if ("sca".equals(questionType)) {

			map = new HashMap<String,Object>();
			if ("alterAdd".equals(useType)) {
				map.put("alterSql", "alter table "+ tableName +" add "+ "`" + questionName +"` VARCHAR(50) NULL DEFAULT NULL");
				map.put("columnName", questionName);

			} else if ("alterDrop".equals(useType)) {
				map.put("alterSql", "alter table "+ tableName +" drop "+ "`" + questionName +"` ");
				map.put("columnName", questionName);

			} else if ("create".equals(useType)) {
				map.put("createSql", "`" + questionName +"` VARCHAR(50) NULL DEFAULT NULL ,");
				map.put("questionHistory", ">"+questionName);
			}
			listQuestionTypeInfo.add(map);

			if ("create".equals(useType)) {
				int checkIndex = 0;
				for (int j=0; j<listSlExample.size(); j++) {
					setExampleColumnName(listSlExample.get(checkIndex).getExampleId(), questionName);
					checkIndex++;
				}
			}

		} else if ("att".equals(questionType)) {

			int checkIndex = 0;
			boolean checkText = true;
			for (SlExampleVO sev : listSlExample) {

				String setCheckIndex = String.valueOf(checkIndex + 1);

				if ("$$@@$$".equals(sev.getExampleText())) { checkText = false; }
				if (checkText) {
					map = new HashMap<String,Object>();
					// alter
					if ("alterAdd".equals(useType)) {
						map.put("alterSql", "alter table "+ tableName +" add "+ "`" + questionName +"_"+ setCheckIndex +"` VARCHAR(50) NULL DEFAULT NULL");
						map.put("columnName", questionName +"_"+ setCheckIndex);

					} else if ("alterDrop".equals(useType)) {
						map.put("alterSql", "alter table "+ tableName +" drop "+ "`" + questionName +"_"+ setCheckIndex +"` ");
						map.put("columnName", questionName +"_"+ setCheckIndex);

					} else if ("create".equals(useType)) {
						map.put("createSql", "`" + questionName +"_"+ setCheckIndex + "` VARCHAR(50) NULL DEFAULT NULL ,");
						map.put("questionHistory", ">"+ questionName +"_"+ setCheckIndex);
					}
					listQuestionTypeInfo.add(map);
				}
				checkIndex++;
			}
			if ( setEtc && eSize == (checkIndex+1) ) {

				map = new HashMap<String,Object>();
				if ("alterAdd".equals(useType)) {
					map.put("alterSql", "alter table "+ tableName +" add "+ "`" + questionName +"_text` VARCHAR(50) NULL DEFAULT NULL");
					map.put("columnName", questionName +"_text");

				} else if ("alterDrop".equals(useType)) {
					map.put("alterSql", "alter table "+ tableName +" drop "+ "`" + questionName +"_text` ");
					map.put("columnName", questionName +"_text");

				} else if ("create".equals(useType)) {
					map.put("createSql", "`" + questionName +"_text` VARCHAR(50) NULL DEFAULT NULL ,");
					map.put("questionHistory", ">"+ questionName +"_text");
				}
				listQuestionTypeInfo.add(map);
			}

		} else if ("textarea".equals(questionType)) {
			map = new HashMap<String,Object>();
			// alter
			if ("alterAdd".equals(useType)) {
				map.put("alterSql", "alter table "+ tableName +" add "+ "`" + questionName +"` VARCHAR(500) NULL DEFAULT NULL");
				map.put("columnName", questionName);

			} else if ("alterDrop".equals(useType)) {
				map.put("alterSql", "alter table "+ tableName +" drop "+ "`" + questionName +"`  ");
				map.put("columnName", questionName);

			} else if ("create".equals(useType)) {
				// create
				map.put("createSql", "`" + questionName +"` VARCHAR(500) NULL DEFAULT NULL ,");
				map.put("questionHistory", ">"+questionName);
			}
			listQuestionTypeInfo.add(map);

		} else if ("media".equals(questionType)) {
			map = new HashMap<String,Object>();
			// alter
			if ("alterAdd".equals(useType)) {
				map.put("alterSql", "alter table "+ tableName +" add "+ "`" + questionName +"` VARCHAR(50) NULL DEFAULT NULL");
				map.put("columnName", questionName);

			} else if ("alterDrop".equals(useType)) {
				map.put("alterSql", "alter table "+ tableName +" drop "+ "`" + questionName +"`  ");
				map.put("columnName", questionName);

			} else if ("create".equals(useType)) {
				map.put("createSql", "`" + questionName +"` VARCHAR(50) NULL DEFAULT NULL ,");
				map.put("questionHistory", ">"+questionName);
			}
			listQuestionTypeInfo.add(map);

		} else if ("info".equals(questionType)) {}

		return listQuestionTypeInfo;
	}

	public boolean alterAddDropSurveyTableQuestion(String alterType, int projectId, int questionId, String questionName, String questionType) throws Exception {

		SlHardCodingVO slHardCodingVO = new SlHardCodingVO();
		slHardCodingVO.setProjectId(projectId);
		SlHardCodingVO selectSlHardCoding = projectService.selectSlHardCoding(slHardCodingVO);
		String tableName = "";
		if (null != selectSlHardCoding && null != selectSlHardCoding.getHardCodingTableName()) {
			tableName = selectSlHardCoding.getHardCodingTableName();
		}

		boolean alterTable = true;
		if ("" != tableName) {

			SlExampleVO slExampleVO = new SlExampleVO();
			slExampleVO.setProjectId(projectId);
			slExampleVO.setQuestionId(questionId);
			List<SlExampleVO> listSlExample = projectService.listSlExample(slExampleVO);
			int eSize = listSlExample.size();

			SlQuestionFunctionVO slQuestionFunctionVO = new SlQuestionFunctionVO();
			slQuestionFunctionVO.setProjectId(projectId);
			slQuestionFunctionVO.setQuestionId(questionId);
			List<SlQuestionFunctionVO> listSlQuestionFunction = projectService.listSlQuestionFunction(slQuestionFunctionVO);

			boolean setEtc = false;
			boolean setCustomOnlyphone = false;
			boolean setCustomOnlyemail = false;

			for (SlQuestionFunctionVO sqfv : listSlQuestionFunction) {
				if (questionId == sqfv.getQuestionId() && (sqfv.getFunctionText()).contains("ETC")) {
					setEtc = true;
				} else if (questionId == sqfv.getQuestionId() && (sqfv.getFunctionText()).contains("customOnlyphone")) {
					setCustomOnlyphone = true;
				} else if (questionId == sqfv.getQuestionId() && (sqfv.getFunctionText()).contains("customOnlyemail")) {
					setCustomOnlyemail = true;
				}
			}

			List<Map<String,Object>> listQuestionTypeInfo = getQuestionTypeInfo(alterType, questionName, questionType, "", setEtc, setCustomOnlyphone, setCustomOnlyemail, listSlExample, tableName);

			for (Map sqlMap : listQuestionTypeInfo) {

				if (null != sqlMap) {

					String sql = (String) sqlMap.get("alterSql");
					String checkColumnName = (String) sqlMap.get("columnName");
					logger.info(">>> alterSurveyTableQuestion sql:" + sql);
					logger.info(">>> alterSurveyTableQuestion checkColumnName:" + checkColumnName);

					if (null != sql && !"".equals(sql) && null != checkColumnName && !"".equals(checkColumnName)) {

						int countTableColumn = projectService.countTableColumn(tableName, checkColumnName);
						logger.info(">>> alterSurveyTableQuestion countTableColumn:" + countTableColumn);

						if ("alterAdd".equals(alterType)) {

							if (0 == countTableColumn) {
								HashMap<String,Object> map1 = new HashMap<String,Object>();
								map1.put("sql", sql);
								boolean createTable = projectService.createTable(map1);
								if (!createTable) {
									alterTable = createTable;
								}
							}

						} else if ("alterDrop".equals(alterType)) {

							if (0 < countTableColumn) {
								HashMap<String,Object> map1 = new HashMap<String,Object>();
								map1.put("sql", sql);
								boolean createTable = projectService.createTable(map1);
								if (!createTable) {
									alterTable = createTable;
								}
							}
						}

					}
				}
			}
		}

		return alterTable;
	}

	public boolean createFile(String filePath, String fileName, String updateText, String updateText2) throws Exception {

		boolean createFile = false;


		return createFile;
	}

	public boolean updateFile(String filePath, String fileName, String updateText, String updateText2) throws Exception {

		boolean updateFile = false;


		return updateFile;
	}

	public boolean setExampleColumnName (int exampleId, String columnName) throws Exception {

		boolean updateSlExample = false;
		if (0 < exampleId && !"".equals(columnName)) {

			SlExampleVO slExampleVO = new SlExampleVO();
			slExampleVO.setExampleId(exampleId);
			slExampleVO.setColumnName(columnName);
			updateSlExample = projectService.updateSlExample(slExampleVO);
		}

		return updateSlExample;
	}
}
