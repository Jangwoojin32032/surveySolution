package kr.co.netpoint.common;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ExcelGuide extends AbstractExcelPOIView {
	static final Logger logger = LoggerFactory.getLogger(ExcelGuide.class);

	@Override
	protected void buildExcelDocument(Map<String, Object> model, Workbook workbook, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		logger.info(">>> ExcelGuide buildExcelDocument");

		CellStyle numberStyle = workbook.createCellStyle();
		numberStyle.setAlignment((short) 3);
		numberStyle.setBorderTop((short) 1);
		numberStyle.setBorderLeft((short) 1);
		numberStyle.setBorderRight((short) 1);
		numberStyle.setBorderBottom((short) 1);

		CellStyle titleStyle = workbook.createCellStyle();
		titleStyle.setAlignment((short) 2);
		titleStyle.setBorderTop((short) 1);
		titleStyle.setBorderLeft((short) 1);
		titleStyle.setBorderRight((short) 1);
		titleStyle.setBorderBottom((short) 1);
		titleStyle.setVerticalAlignment((short) 1);

		CellStyle menuStyle = workbook.createCellStyle();
		menuStyle.setAlignment((short) 2);
		menuStyle.setBorderTop((short) 1);
		menuStyle.setBorderLeft((short) 1);
		menuStyle.setBorderRight((short) 1);
		menuStyle.setBorderBottom((short) 1);

		List<HashMap> excelList = (List) model.get("excelList");
		String questionSaveColumn = (String) model.get("questionSaveColumn");

		logger.info(">>> ExcelGuide excelList" + model.get("excelList"));
		logger.info(">>> ExcelGuide excelList" + (String) model.get("questionSaveColumn"));

		if ((null != excelList) && (null != questionSaveColumn)) {
			int excelListLen = excelList.size();
			String[] qColumnArray = questionSaveColumn.split(">");
			int qColumnArrayLen = qColumnArray.length;
			String sTmpName = "";
			String sTmpTypeN = "";
			String sTmp = "";
			int iTmp = 0;

			if ((0 < excelListLen) && (0 < qColumnArrayLen)) {
				Sheet sheet = workbook.createSheet("survey");

				Row row = null;
				Cell cell = null;
				int rowCount = 0;
				int celCount = 0;
				for (int i = 0; i < excelListLen; i++) {
					HashMap excelMap = excelList.get(i);
					if (0 == i) {
						row = sheet.createRow(rowCount++);

						cell = row.createCell(celCount++);
						cell.setCellValue("설문유형");

						cell = row.createCell(celCount++);
						cell.setCellValue("설문번호");

						cell = row.createCell(celCount++);
						cell.setCellValue("보기번호");

						cell = row.createCell(celCount++);
						cell.setCellValue("질문/보기");



					}
					row = sheet.createRow(rowCount++);
					celCount = 0;


					Object questionType = excelMap.get("questionType");
					Object questionName = excelMap.get("questionName");
					Object questionTitle = excelMap.get("questionTitle");
					Object exampleValue = excelMap.get("exampleValue");
					Object exampleText = excelMap.get("exampleText");

					if (sTmpName.equals(String.valueOf(questionName))){
						cell = row.createCell(celCount++);
						cell = row.createCell(celCount++);
						cell = row.createCell(celCount++);

						if ("att".equals(sTmp)){
							if ("$$@@$$".equals(String.valueOf(exampleText))){
								row = sheet.createRow(rowCount--);
								sTmp = "";
								iTmp = 0;
							}else{
								cell.setCellValue("속성");
								cell = row.createCell(celCount++);
								cell.setCellValue("- "+String.valueOf(exampleText));
							}
						}else{
							if ("att".equals(String.valueOf(questionType))){
								iTmp++;
								cell.setCellValue(String.valueOf(iTmp));
								cell = row.createCell(celCount++);
								cell.setCellValue(String.valueOf(exampleText));
							}else{
								cell.setCellValue(String.valueOf(exampleValue));
								cell = row.createCell(celCount++);
								cell.setCellValue(String.valueOf(exampleText));
							}
						}


					}else{
						cell = row.createCell(celCount++);
						if ("sin".equals(String.valueOf(questionType))){
							sTmpTypeN = "단일형";
						}else if ("mul".equals(String.valueOf(questionType))){
							sTmpTypeN = "복수형";
						}else if ("ord".equals(String.valueOf(questionType))){
							sTmpTypeN = "순위형";
						}else if ("tex".equals(String.valueOf(questionType)) || "num".equals(String.valueOf(questionType)) || "textarea".equals(String.valueOf(questionType))){
							sTmpTypeN = "오픈형";
						}else if ("sca".equals(String.valueOf(questionType))){
							sTmpTypeN = "척도형";
						}else if ("att".equals(String.valueOf(questionType))){
							sTmpTypeN = "속성형";
						}else if ("info".equals(String.valueOf(questionType))){
							sTmpTypeN = "안내";
						}else if ("media".equals(String.valueOf(questionType))){
							sTmpTypeN = "동영상";
						}else {
							sTmpTypeN = String.valueOf(questionType);
						}
						cell.setCellValue(sTmpTypeN);
						cell = row.createCell(celCount++);
						cell.setCellValue(String.valueOf(questionName));
						cell = row.createCell(celCount++);
						cell.setCellValue("문항");
						cell = row.createCell(celCount++);
						cell.setCellValue(String.valueOf(questionTitle));

						row = sheet.createRow(rowCount++);
						celCount = 0;

						cell = row.createCell(celCount++);
						cell = row.createCell(celCount++);
						cell = row.createCell(celCount++);
						if ("att".equals(String.valueOf(questionType))){
							cell.setCellValue("속성");
							cell = row.createCell(celCount++);
							cell.setCellValue("- "+String.valueOf(exampleText));
							sTmp = "att";
						}else{
							cell.setCellValue(String.valueOf(exampleValue));
							cell = row.createCell(celCount++);
							cell.setCellValue(String.valueOf(exampleText));
						}
					}


					sTmpName = String.valueOf(questionName);
				}
			}
		}
	}

	@Override
	protected Workbook createWorkbook() {
		return new XSSFWorkbook();
	}
}
