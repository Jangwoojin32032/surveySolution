package kr.co.netpoint.common;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import kr.co.netpoint.property.ConfigProperty;
import kr.co.netpoint.vo.FileVO;

@Component
public class UtilFile {
	@Autowired
	private ConfigProperty configProperty;
	static final Logger logger = LoggerFactory.getLogger(UtilFile.class);
	String fileName = "";

	public FileVO fileUpload(MultipartHttpServletRequest request, MultipartFile uploadFile, FileVO fileVO) {
		String fileDirectory = fileVO.getFileDirectory();
		String fileSaveDirectory = fileVO.getFileSaveDirectory();
		String fileLoadDirectory = fileVO.getFileLoadDirectory();
		logger.info(">>> UtilFile fileUpload fileDirectory : " + fileDirectory);
		logger.info(">>> UtilFile fileUpload fileSaveDirectory : " + fileSaveDirectory);
		logger.info(">>> UtilFile fileUpload fileLoadDirectory : " + fileLoadDirectory);

		String savePath = "";
		String fileName = "";
		String fileOriginalName = "";

		OutputStream out = null;
		PrintWriter printWriter = null;
		try {
			fileOriginalName = uploadFile.getOriginalFilename();
			fileName = fileOriginalName;
			byte[] bytes = uploadFile.getBytes();

			savePath = fileSaveDirectory + "/" + fileDirectory;
			logger.info(">>> UtilFile fileUpload fileName : " + fileName);
			logger.info(">>> UtilFile fileUpload uploadFullPath : " + savePath);

			File file = new File(savePath);
			if ((fileName != null) && (!fileName.equals(""))) {
				if (!file.exists()) {
					file.mkdirs();
				}
				if (file.exists()) {
					fileName = System.currentTimeMillis() + "_" + fileName;
					file = new File(savePath + "/" + fileName);
				}
			}
			logger.info(">>> UtilFile fileUpload final fileName : " + fileName);
			logger.info(">>> UtilFile fileUpload file : " + file);

			out = new FileOutputStream(file);

			logger.info(">>> UtilFile fileUpload out : " + out);

			out.write(bytes);
			try {
				if (out != null) {
					out.close();
				}
				if (printWriter != null) {
					printWriter.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
			fileVO.setFileDirectory(fileLoadDirectory + "/" + fileDirectory);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (out != null) {
					out.close();
				}
				if (printWriter != null) {
					printWriter.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		fileVO.setFileFullPath(savePath);
		fileVO.setFileOriginalName(fileOriginalName);
		fileVO.setFileSaveName(fileName);

		logger.info(">>> UtilFile fileUpload fileVO.getFileDirectory : " + fileVO.getFileDirectory());
		logger.info(">>> UtilFile fileUpload fileVO.getFileFullPath() : " + fileVO.getFileFullPath());
		logger.info(">>> UtilFile fileUpload fileVO.getFileOriginalName() : " + fileVO.getFileOriginalName());
		logger.info(">>> UtilFile fileUpload fileVO.getFileSaveName() : " + fileVO.getFileSaveName());

		return fileVO;
	}
}
