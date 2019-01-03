package kr.co.netpoint.common;

import java.util.Map;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.springframework.web.servlet.view.AbstractView;

public abstract class AbstractExcelPOIView extends AbstractView {
	private static final String CONTENT_TYPE_XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

	protected boolean generatesDownloadContent() {
		return true;
	}

	protected final void renderMergedOutputModel(Map<String, Object> model
												, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Workbook workbook = createWorkbook();
		setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
		buildExcelDocument(model, workbook, request, response);
		response.setContentType(getContentType());

		ServletOutputStream out = response.getOutputStream();
		out.flush();
		workbook.write(out);
		out.flush();
		if ((workbook instanceof SXSSFWorkbook)) {
			((SXSSFWorkbook) workbook).dispose();
		}
	}

	protected abstract Workbook createWorkbook();

	protected abstract void buildExcelDocument(Map<String, Object> paramMap, Workbook paramWorkbook
										, HttpServletRequest paramHttpServletRequest, HttpServletResponse paramHttpServletResponse) throws Exception;
}
