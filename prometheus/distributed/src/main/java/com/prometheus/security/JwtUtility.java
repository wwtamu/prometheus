package com.prometheus.security;

import static com.prometheus.constants.Constants.CIPHER_ALGORITHM;
import static com.prometheus.constants.Constants.HASH_ALGORITHM;
import static com.prometheus.constants.Constants.HASH_ALGORITHM_KEY;
import static com.prometheus.constants.Constants.TOKEN_TYPE;
import static com.prometheus.constants.Constants.TOKEN_TYPE_KEY;
import static javax.crypto.Cipher.DECRYPT_MODE;
import static org.apache.commons.codec.binary.Base64.decodeBase64;

import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.Key;
import java.security.NoSuchAlgorithmException;

import javax.annotation.PostConstruct;
import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.jwt.JwtHelper;
import org.springframework.security.jwt.crypto.sign.MacSigner;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.prometheus.exception.InvalidTokenException;

@Service
public class JwtUtility {

	@Autowired
	private ObjectMapper objectMapper;

	@Value("${prometheus.jwt.secret}")
	private String secret;

	@Value("${prometheus.jwt.duration}")
	private Long duration;

	private MacSigner hmac;

	private Cipher decryptor;

	@PostConstruct
	private void setup() throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, JsonProcessingException {
		ObjectNode headers = objectMapper.createObjectNode();
		headers.put(HASH_ALGORITHM_KEY, HASH_ALGORITHM);
		headers.put(TOKEN_TYPE_KEY, TOKEN_TYPE);
		hmac = new MacSigner(secret);
		Key cipherKey = new SecretKeySpec(secret.getBytes(), CIPHER_ALGORITHM);
		decryptor = Cipher.getInstance(CIPHER_ALGORITHM);
		decryptor.init(DECRYPT_MODE, cipherKey);
	}

	public JwtUserDetails getUserDetailsFromToken(String token) {
		return checkExpiration(mapClaimsToUserDetails(decodeAndVerify(token)));
	}

	public JwtUserDetails checkExpiration(JwtUserDetails userDetails) {
		if (System.currentTimeMillis() >= userDetails.getExpiration()) {
			userDetails.setExpired(true);
		}
		return userDetails;
	}

	private JwtUserDetails mapClaimsToUserDetails(JsonNode claims) {
		JwtUserDetails userDetails = null;
		try {
			userDetails = objectMapper.treeToValue(claims, JwtUserDetails.class);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return userDetails;
	}

	public synchronized JsonNode decodeAndVerify(String token) throws InvalidTokenException {
		try {
			String jwt = new String(decryptor.doFinal(decodeBase64(token)));
			try {
				return objectMapper.readValue(JwtHelper.decodeAndVerify(jwt, hmac).getClaims(), JsonNode.class);
			} catch (IOException e) {
				e.printStackTrace();
				throw new InvalidTokenException(e.getMessage());
			}
		} catch (IllegalBlockSizeException | BadPaddingException e) {
			e.printStackTrace();
			throw new InvalidTokenException(e.getMessage());
		}
	}

}
