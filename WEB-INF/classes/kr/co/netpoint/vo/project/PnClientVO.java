package kr.co.netpoint.vo.project;

public class PnClientVO {
	private int vendorId;
	private String clientManagerName;
	private String clientPhone;
	private String clientEmail;

	public int getVendorId() {
		return this.vendorId;
	}

	public void setVendorId(int vendorId) {
		this.vendorId = vendorId;
	}

	public String getClientManagerName() {
		return this.clientManagerName;
	}

	public void setClientManagerName(String clientManagerName) {
		this.clientManagerName = clientManagerName;
	}

	public String getClientPhone() {
		return this.clientPhone;
	}

	public void setClientPhone(String clientPhone) {
		this.clientPhone = clientPhone;
	}

	public String getClientEmail() {
		return this.clientEmail;
	}

	public void setClientEmail(String clientEmail) {
		this.clientEmail = clientEmail;
	}
}
