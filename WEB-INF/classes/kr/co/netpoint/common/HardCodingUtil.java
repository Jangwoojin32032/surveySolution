package kr.co.netpoint.common;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import kr.co.netpoint.vo.project.SlExampleVO;
import kr.co.netpoint.vo.project.SlQuestionFunctionVO;
import kr.co.netpoint.vo.project.SlQuestionVO;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCreationHelper;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.FormulaEvaluator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class HardCodingUtil {
	static final Logger logger = LoggerFactory.getLogger(HardCodingUtil.class);

	public List<SlQuestionVO> readExcel(MultipartFile excelFile) {
		List<SlQuestionVO> listSlQuestion = new ArrayList();

		int uploadSize = 0;
		HSSFWorkbook workbook = null;
		try {
			workbook = new HSSFWorkbook(excelFile.getInputStream());

			int sheetSize = workbook.getNumberOfSheets();
			HSSFSheet curSheet = workbook.getSheetAt(0);
			FormulaEvaluator evaluator = workbook.getCreationHelper().createFormulaEvaluator();

			int rowSize = curSheet.getPhysicalNumberOfRows();
			for (int rowIndex = 1; rowIndex < rowSize; rowIndex++) {
				if (rowIndex != 0) {
					Map<Object, String> setCellMap = new HashMap();

					HSSFRow curRow = curSheet.getRow(rowIndex);
					int cellCount = curRow.getPhysicalNumberOfCells();
					for (int cellIndex = 0; cellIndex < cellCount; cellIndex++) {
						HSSFCell curCell = curRow.getCell(cellIndex);
						String value = "";
						if (null != curCell) {
							value = "";
							switch (curCell.getCellType()) {
							case 2:
								if (curCell.toString() != "") {
									if (evaluator.evaluateFormulaCell(curCell) == 0) {
										value = String.valueOf(new Double(curCell.getNumericCellValue()).intValue());
									} else if (evaluator.evaluateFormulaCell(curCell) == 1) {
										value = curCell.getStringCellValue();
									} else if (evaluator.evaluateFormulaCell(curCell) == 4) {
										value = String.valueOf(curCell.getBooleanCellValue());
									}
								}
								break;
							case 0:
								value = String.valueOf(new Double(curCell.getNumericCellValue()).intValue());
								break;
							case 1:
								value = curCell.getStringCellValue() == null ? new String("")
										: curCell.getStringCellValue();
								break;
							case 4:
								value = String.valueOf(curCell.getBooleanCellValue());
								break;
							case 3:
								value = curCell.getBooleanCellValue() + "";
								break;
							case 5:
								value = curCell.getErrorCellValue() + "";
								break;
							default:
								value = new String();
							}
						}
						setCellMap.put(Integer.valueOf(cellIndex), value);
					}
					SlQuestionVO insertRowQuestion = insertRowQuestion(setCellMap, cellCount);
					listSlQuestion.add(rowIndex - 1, insertRowQuestion);
				}
			}
		} catch (Exception e) {
			logger.info(">>> readExcel e:" + e);
		}
		return listSlQuestion;
	}

	public SlQuestionVO insertRowQuestion(Map map, int cellCount) {
		SlQuestionVO slQuestionVO = new SlQuestionVO();
		for (int cellNo = 0; cellNo < cellCount; cellNo++) {
			String value = (String) map.get(Integer.valueOf(cellNo));
			if (null == value) {
				value = "";
			}
			if (0 == cellNo) {
				slQuestionVO.setQuestionName(value);
			} else if (1 == cellNo) {
				slQuestionVO.setQuestionTitle(value);
			} else if (2 == cellNo) {
				String[] lines = value.split("\\r?\\n");
				int indexMap = 0;
				List<SlExampleVO> setListSlExample = new ArrayList();
				for (String s : lines) {
					if ((null != s) && (!"".equals(s)) && (!"false".equals(s))) {
						SlExampleVO slExampleVO = new SlExampleVO();
						slExampleVO.setExampleText(s);
						slExampleVO.setExampleValue(String.valueOf(indexMap + 1));
						slExampleVO.setExampleOrder(indexMap + 1);
						setListSlExample.add(indexMap, slExampleVO);
						indexMap++;
					}
				}
				slQuestionVO.setListSlExample(setListSlExample);
			} else if (3 == cellNo) {
				String[] lines = value.split("\\r?\\n");
				int indexMap = 0;
				List<SlQuestionFunctionVO> setListSlQuestionFunction = new ArrayList();
				for (String s : lines) {
					if ((null != s) && (!"".equals(s.trim())) && (!"false".equals(s.trim()))) {
						logger.info(">>> set SlQuestionFunction text2:", s);
						SlQuestionFunctionVO slQuestionFunctionVO = new SlQuestionFunctionVO();
						slQuestionFunctionVO.setFunctionType("option");
						slQuestionFunctionVO.setFunctionText(s);
						setListSlQuestionFunction.add(indexMap, slQuestionFunctionVO);
						indexMap++;
					}
				}
				slQuestionVO.setListSlQuestionFunction(setListSlQuestionFunction);
			} else if (4 == cellNo) {
				slQuestionVO.setQuestionType(value);
			} else if (5 == cellNo) {
				slQuestionVO.setQuestionDivision(value);
			} else if (6 == cellNo) {
				slQuestionVO.setQuestionLogic(value);
			}
		}
		return slQuestionVO;
	}
}
