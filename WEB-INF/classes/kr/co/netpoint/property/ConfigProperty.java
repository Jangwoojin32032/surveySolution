package kr.co.netpoint.property;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ConfigProperty {
	
	@Value("#{config['hardCoding.saveDirectory']}")
	private String hardCodingSaveDirectory;
	
	@Value("#{config['hardCoding.version']}")
	private String hardCodingVersion;
	
	@Value("#{config['file.saveDirectory']}")
	private String fileSaveDirectory;
	
	@Value("#{config['file.loadDirectory']}")
	private String fileLoadDirectory;
	
	@Value("#{config['localhost.ip']}")
	private String localhostIp;
	
	@Value("#{config['localhost.port']}")
	private String localhostPort;
	
	private int projectId;
	
	private String serveyGoPath;
	
	private String fileDiretory;

	public String getHardCodingSaveDirectory() {
		return this.hardCodingSaveDirectory;
	}

	public void setHardCodingSaveDirectory(String hardCodingSaveDirectory) {
		this.hardCodingSaveDirectory = hardCodingSaveDirectory;
	}

	public String getHardCodingVersion() {
		return this.hardCodingVersion;
	}

	public void setHardCodingVersion(String hardCodingVersion) {
		this.hardCodingVersion = hardCodingVersion;
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

	public String getLocalhostIp() {
		return this.localhostIp;
	}

	public void setLocalhostIp(String localhostIp) {
		this.localhostIp = localhostIp;
	}

	public String getLocalhostPort() {
		return this.localhostPort;
	}

	public void setLocalhostPort(String localhostPort) {
		this.localhostPort = localhostPort;
	}

	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}

	public String getServeyGoPath() {
		return this.fileLoadDirectory + this.hardCodingSaveDirectory + "/" + this.hardCodingVersion + "/"
				+ this.projectId + "/";
	}

	public String getFileDiretory() {
		return this.fileSaveDirectory + this.hardCodingSaveDirectory + "/" + this.hardCodingVersion + "/"
				+ String.valueOf(this.projectId);
	}
}
