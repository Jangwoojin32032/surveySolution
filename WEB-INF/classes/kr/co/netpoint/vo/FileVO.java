package kr.co.netpoint.vo;

public class FileVO {
	private String fileSaveName;
	private String fileOriginalName;
	private String fileDirectory;
	private String fileFullPath;
	private String fileSaveDirectory;
	private String fileLoadDirectory;

	public String getFileSaveName() {
		return this.fileSaveName;
	}

	public void setFileSaveName(String fileSaveName) {
		this.fileSaveName = fileSaveName;
	}

	public String getFileOriginalName() {
		return this.fileOriginalName;
	}

	public void setFileOriginalName(String fileOriginalName) {
		this.fileOriginalName = fileOriginalName;
	}

	public String getFileDirectory() {
		return this.fileDirectory;
	}

	public void setFileDirectory(String fileDirectory) {
		this.fileDirectory = fileDirectory;
	}

	public String getFileFullPath() {
		return this.fileFullPath;
	}

	public void setFileFullPath(String fileFullPath) {
		this.fileFullPath = fileFullPath;
	}

	public String getFileSaveDirectory() {
		return this.fileSaveDirectory;
	}

	public void setFileSaveDirectory(String fileSaveDirectory) {
		this.fileSaveDirectory = fileSaveDirectory;
	}

	public String getFileLoadDirectory() {
		return this.fileLoadDirectory;
	}

	public void setFileLoadDirectory(String fileLoadDirectory) {
		this.fileLoadDirectory = fileLoadDirectory;
	}
}
