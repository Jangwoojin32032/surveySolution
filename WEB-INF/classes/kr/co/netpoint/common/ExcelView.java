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

public class ExcelView extends AbstractExcelPOIView {
	static final Logger logger = LoggerFactory.getLogger(ExcelView.class);

	@Override
	protected void buildExcelDocument(Map<String, Object> model, Workbook workbook, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		logger.info(">>> ExcelView buildExcelDocument");

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

		logger.info(">>> ExcelView excelList" + model.get("excelList"));
		logger.info(">>> ExcelView excelList" + (String) model.get("questionSaveColumn"));

		if ((null != excelList) && (null != questionSaveColumn)) {
			int excelListLen = excelList.size();
			String[] qColumnArray = questionSaveColumn.split(">");
			int qColumnArrayLen = qColumnArray.length;
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

						cell.setCellValue("uCode");
						cell = row.createCell(celCount++);

						cell.setCellValue("projectId");
						for (int j = 1; j < qColumnArrayLen; j++) {
							String columnName = qColumnArray[j];
							String columnValue = (String) excelMap.get(columnName);

							cell = row.createCell(celCount++);

							cell.setCellValue(columnName);
						}
					}
					row = sheet.createRow(rowCount++);
					celCount = 0;

					Object uCode = excelMap.get("uCode");
					Object projectId = excelMap.get("projectId");
					cell = row.createCell(celCount++);

					cell.setCellValue(String.valueOf(uCode));
					cell = row.createCell(celCount++);

					cell.setCellValue(String.valueOf(projectId));
					for (int j = 1; j < qColumnArrayLen; j++) {
						String columnName = qColumnArray[j];
						String columnValue = (String) excelMap.get(columnName);
						if (null == columnValue) {
							columnValue = "";
						}
						cell = row.createCell(celCount++);

						cell.setCellValue(columnValue);
					}
				}
			}
		}
	}

	@Override
	protected Workbook createWorkbook() {
		return new XSSFWorkbook();
	}
}
