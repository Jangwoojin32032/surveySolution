package kr.co.netpoint.controller;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Enumeration;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class SampleController {
	private static final Logger logger = LoggerFactory.getLogger(SampleController.class);

	@RequestMapping(value = "/sample/editor")
	public ModelAndView main() {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("sample/editor");
		return mv;
	}

	@RequestMapping(value = "/file_uploader_html5", method = RequestMethod.POST)
	@ResponseBody
	public String multiplePhotoUpload(HttpServletRequest request
										, @RequestHeader("file-name") String fileName
										, @RequestHeader("file-size") String fileSize) {

		Enumeration<String> requestHeaderNames = request.getHeaderNames();
		while (requestHeaderNames.hasMoreElements()) {
			String headerName = (String) requestHeaderNames.nextElement();
			Enumeration<String> headers = request.getHeaders(headerName);
			while (headers.hasMoreElements()) {
				String headerValue = (String) headers.nextElement();
			}
		}
		
		StringBuffer sb = new StringBuffer();
		try {
			String oldName = request.getHeader("file-name");

			String filePath = "D:/workspace-sts-test/SurveyProject/src/main/webapp/resources/photoUpload/";
			String saveName = new SimpleDateFormat("yyyyMMddHHmmss").format(Long.valueOf(System.currentTimeMillis()))
													+ UUID.randomUUID().toString() + oldName.substring(oldName.lastIndexOf("."));

			InputStream is = request.getInputStream();
			OutputStream os = new FileOutputStream(filePath + saveName);

			byte[] b = new byte[Integer.parseInt(request.getHeader("file-size"))];
			int numRead;
			while ((numRead = is.read(b, 0, b.length)) != -1) {
				os.write(b, 0, numRead);
			}
			os.flush();
			os.close();

			sb = new StringBuffer();
			sb.append("&bNewLine=true").append("&sFileName=").append(oldName).append("&sFileURL=")
					.append("http://localhost:8080/resources/photoUpload/").append(saveName);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return sb.toString();
	}

	@RequestMapping(value = "/sample/insertEditor", method = RequestMethod.POST)
	@ResponseBody
	public void insertEditor(HttpServletRequest request, HttpServletResponse response, String smarteditor) throws IOException {

		Enumeration<String> requestHeaderNames = request.getHeaderNames();
		while (requestHeaderNames.hasMoreElements()) {
			String headerName = (String) requestHeaderNames.nextElement();
			Enumeration<String> headers = request.getHeaders(headerName);
			while (headers.hasMoreElements()) {
				//String headerValue = (String) headers.nextElement();
				headers.nextElement();
			}
		}
	}

	@RequestMapping(value = "/sample/tableEx1")
	public ModelAndView tableEx1() {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("sample/tableEx1");
		return mv;
	}

	@RequestMapping(value = "/sample/tableEx2")
	public ModelAndView tableEx2() {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("sample/tableEx2");
		return mv;
	}
}
