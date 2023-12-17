package com.prometheus.utility;

import static com.prometheus.constants.Constants.CIPHER_ALGORITHM;
import static com.prometheus.constants.Constants.RAW_DATA_DELIMETER;
import static javax.crypto.Cipher.DECRYPT_MODE;
import static javax.crypto.Cipher.ENCRYPT_MODE;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class CryptoUtility {

	@Value("${prometheus.crypto.secret}")
	private String secret;

	public String generateToken(String content, String type) throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException {
		Date now = new Date();
		String rawToken = now.getTime() + RAW_DATA_DELIMETER + content + RAW_DATA_DELIMETER + type;
		SecretKeySpec skeySpec = new SecretKeySpec(secret.getBytes(), CIPHER_ALGORITHM);
		Cipher cipher = Cipher.getInstance(CIPHER_ALGORITHM);
		cipher.init(ENCRYPT_MODE, skeySpec);
		return Base64.getEncoder().encodeToString(cipher.doFinal(rawToken.getBytes()));
	}

	public String[] validateToken(String token, String type) throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException {
		SecretKeySpec skeySpec = new SecretKeySpec(secret.getBytes(), CIPHER_ALGORITHM);
		Cipher cipher = Cipher.getInstance(CIPHER_ALGORITHM);
		cipher.init(DECRYPT_MODE, skeySpec);
		return new String(cipher.doFinal(Base64.getDecoder().decode(token))).split(RAW_DATA_DELIMETER);
	}

}