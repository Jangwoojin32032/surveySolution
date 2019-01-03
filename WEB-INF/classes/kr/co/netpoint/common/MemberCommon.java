package kr.co.netpoint.common;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import kr.co.netpoint.service.CommonService;
import kr.co.netpoint.vo.project.PnAdminVO;

@Component
public class MemberCommon {
	static final Logger logger = LoggerFactory.getLogger(MemberCommon.class);
	@Autowired
	private CommonService commonService;

	public PnAdminVO checkLogin(PnAdminVO pnAdminVO) {
		boolean checkLogin = false;
		String id = pnAdminVO.getId();
		String passWd = pnAdminVO.getPassWd();
		logger.info(">>> MemberCommon checkLogin getId:" + pnAdminVO.getId());
		logger.info(">>> MemberCommon checkLogin getPassWd:" + pnAdminVO.getPassWd());

		UtillCommon utillCommon = new UtillCommon();

		PnAdminVO setPnAdminVO = new PnAdminVO();
		setPnAdminVO.setId(id);
		PnAdminVO selectPnAdmin = this.commonService.selectPnAdmin(setPnAdminVO);
		if (null != selectPnAdmin) {
			String salt = selectPnAdmin.getSalt();
			logger.info(">>> checkLogin salt:" + salt);

			String shSalt = utillCommon.encryptString(salt, "SHA-256");
			String shPasswd = utillCommon.encryptString(passWd, "SHA-256");

			String digest = utillCommon.encryptStringIteration(shSalt + shPasswd, "SHA-256", 1000);
			logger.info(">>> checkLogin digest:" + digest);
			logger.info(">>> checkLogin passWd2:" + selectPnAdmin.getPassWd());
			if (digest.equals(selectPnAdmin.getPassWd())) {
				checkLogin = true;
			}
			selectPnAdmin.setCheckLogin(checkLogin);
		}


		return selectPnAdmin;
	}

	public void setSession(HttpServletRequest request, PnAdminVO checkLogin, int type) {
		HttpSession session = request.getSession();
		session.setMaxInactiveInterval(36000);
		if (1 == type) {
			UtillCommon utillCommon = new UtillCommon();
			session.setAttribute("id", UtillCommon.encSession(checkLogin.getId()));
			session.setAttribute("name", UtillCommon.encSession(checkLogin.getName()));
			session.setAttribute("email", UtillCommon.encSession(checkLogin.getEmail()));
			session.setAttribute("auth", UtillCommon.encSession(checkLogin.getAuth()));
			session.setAttribute("company", UtillCommon.encSession(checkLogin.getCompany()));
			session.setAttribute("pnAdminVO", checkLogin);
		} else {
			session.invalidate();
		}
	}
}
