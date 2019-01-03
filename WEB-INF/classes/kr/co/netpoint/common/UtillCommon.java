package kr.co.netpoint.common;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class UtillCommon {
	public String encryptString(String sOrigin, String sShaGubun) {
		String sReturn = "";
		try {
			MessageDigest md = MessageDigest.getInstance(sShaGubun);
			md.reset();
			md.update(sOrigin.getBytes());
			byte[] byteData = md.digest();
			StringBuffer sb = new StringBuffer();
			for (int i = 0; i < byteData.length; i++) {
				sb.append(Integer.toString((byteData[i] & 0xFF) + 256, 16).substring(1));
			}
			sReturn = sb.toString();
		} catch (NoSuchAlgorithmException e) {
			sReturn = null;
		}
		return sReturn;
	}

	public String encryptStringIteration(String sOrigin, String sShaGubun, int iterationNb) {
		String sReturn = "";
		try {
			MessageDigest md = MessageDigest.getInstance(sShaGubun);
			md.reset();
			md.update(sOrigin.getBytes());
			byte[] byteData = md.digest();
			for (int i = 0; i < iterationNb; i++) {
				md.reset();
				byteData = md.digest(byteData);
			}
			StringBuffer sb = new StringBuffer();
			for (int i = 0; i < byteData.length; i++) {
				sb.append(Integer.toString((byteData[i] & 0xFF) + 256, 16).substring(1));
			}
			sReturn = sb.toString();
		} catch (NoSuchAlgorithmException e) {
			sReturn = null;
		}
		return sReturn;
	}

	public static String encSession(String sValue) {
		String sEncSession = "";

		AES aes = new AES();
		aes.setKey4Session();
		try {
			sEncSession = AES.encString(sValue);
		} catch (Exception e) {
			sEncSession = "";
		}
		return sEncSession;
	}

	public static String decSession(String sValue) {
		String sDecSession = "";

		AES aes = new AES();
		aes.setKey4Session();
		try {
			sDecSession = AES.decString(sValue);
		} catch (Exception e) {
			sDecSession = "";
		}
		return sDecSession;
	}

	public String getSessionEnc(String sSessionName, HttpServletRequest request) {
		String sSessionVal = "";
		if (!sSessionName.equals("")) {
			HttpSession session = request.getSession();
			sSessionVal = ((String) session.getAttribute(sSessionName)).trim();
		}
		if (!sSessionVal.equals("")) {
			sSessionVal = decSession(sSessionVal);
		}
		return sSessionVal;
	}
}
