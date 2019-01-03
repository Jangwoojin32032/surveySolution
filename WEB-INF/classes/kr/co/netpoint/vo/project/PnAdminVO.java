package kr.co.netpoint.vo.project;

public class PnAdminVO {
	private String id;
	private String passWd;
	private String salt;
	private String name;
	private String email;
	private String auth;
	private String company;
	private String realYn;
	private boolean checkLogin;

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPassWd() {
		return this.passWd;
	}

	public void setPassWd(String passWd) {
		this.passWd = passWd;
	}

	public String getSalt() {
		return this.salt;
	}

	public void setSalt(String salt) {
		this.salt = salt;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAuth() {
		return this.auth;
	}

	public void setAuth(String auth) {
		this.auth = auth;
	}

	public String getCompany() {
		return this.company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getRealYn() {
		return this.realYn;
	}

	public void setRealYn(String realYn) {
		this.realYn = realYn;
	}

	public boolean isCheckLogin() {
		return this.checkLogin;
	}

	public void setCheckLogin(boolean checkLogin) {
		this.checkLogin = checkLogin;
	}
}
