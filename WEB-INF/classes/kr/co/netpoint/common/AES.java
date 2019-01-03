package kr.co.netpoint.common;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class AES {
	private static String ENC_KEY;
	private static String IV;
	private static String ENC_TYPE;

	public void setKey(String sKey) {
		ENC_KEY = sKey;
	}

	public void setIV(String sIV) {
		IV = sIV;
	}

	public void setEncType(String sEncType) {
		ENC_TYPE = sEncType;
	}

	public static byte[] encrypt(String plainText) throws Exception {
		Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
		SecretKeySpec key = new SecretKeySpec(ENC_KEY.getBytes(ENC_TYPE), "AES");
		cipher.init(1, key, new IvParameterSpec(IV.getBytes(ENC_TYPE)));

		return cipher.doFinal(plainText.getBytes(ENC_TYPE));
	}

	public static String decrypt(byte[] cipherText) throws Exception {
		Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
		SecretKeySpec key = new SecretKeySpec(ENC_KEY.getBytes(ENC_TYPE), "AES");
		cipher.init(2, key, new IvParameterSpec(IV.getBytes(ENC_TYPE)));

		return new String(cipher.doFinal(cipherText), ENC_TYPE);
	}

	public static String encString(String plainText) throws Exception {
		byte[] encByte = encrypt(plainText);

		String sEncText = byte2Hex(encByte);

		return sEncText;
	}

	public static String decString(String sEncText) throws Exception {
		byte[] decByte = hexToBytes(sEncText);

		String sDecText = decrypt(decByte);

		return sDecText;
	}

	public static String byte2Hex(byte[] ba) {
		if (ba == null) {
			return null;
		}
		int iLen = ba.length;
		String sByteString = "";
		for (int i = 0; i < iLen; i++) {
			if ((ba[i] & 0xFF) < 16) {
				sByteString = sByteString + "0" + Integer.toHexString(ba[i] & 0xFF);
			} else {
				sByteString = sByteString + Integer.toHexString(ba[i] & 0xFF);
			}
		}
		return sByteString;
	}

	public static byte[] hexToBytes(String hexString) {
		if (hexString == null) {
			return null;
		}
		if (hexString.length() < 2) {
			return null;
		}
		int iLen = hexString.length() / 2;
		byte[] bBuffer = new byte[iLen];
		for (int i = 0; i < iLen; i++) {
			bBuffer[i] = ((byte) Integer.parseInt(hexString.substring(i * 2, i * 2 + 2), 16));
		}
		return bBuffer;
	}

	public void setKey4Session() {
		String sKey = "75E4917E56B49273";
		String sIV = "2AF0D8C10236305A";
		String sEncType = "EUC-KR";

		setKey(sKey);
		setIV(sIV);
		setEncType(sEncType);
	}

	public void setKeyAES() {
		String sKey = "6D080ABDF5328717";
		String sIV = "4BC66E2312448D3D";
		String sEncType = "EUC-KR";

		setKey(sKey);
		setIV(sIV);
		setEncType(sEncType);
	}
}
