package com.prometheus.service;

import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.prometheus.factory.HttpEntityFactory;
import com.prometheus.request.AuthenticationRequest;
import com.prometheus.request.RegistrationRequest;
import com.prometheus.request.VerifyRequest;
import com.prometheus.response.AuthenticationResponse;
import com.prometheus.response.GenericResponse;
import com.prometheus.security.JwtUserDetails;

@Service
public class RemoteAuthenticationService {

	private static final String PROTOCOL_STRING = "http://";

	@Autowired
	private RestTemplate restTemplate;

	@Value("${prometheus.auth.name}")
	private String authName;

	@Value("${prometheus.auth.path}")
	private String authPath;

	@Value("${prometheus.token}")
	private String token;

	@Value("${prometheus.refresh}")
	private String refresh;

	@Value("${prometheus.verify}")
	private String verify;

	@Value("${prometheus.register}")
	private String register;

	@Value("${prometheus.user}")
	private String user;

	public ResponseEntity<GenericResponse> verify(VerifyRequest verifyRequest) {
		return restTemplate.exchange(PROTOCOL_STRING + authName + authPath + verify, POST, HttpEntityFactory.requestWithBody(verifyRequest), GenericResponse.class);
	}

	public ResponseEntity<GenericResponse> register(RegistrationRequest registrationRequest) {
		return restTemplate.exchange(PROTOCOL_STRING + authName + authPath + register, POST, HttpEntityFactory.requestWithBody(registrationRequest), GenericResponse.class);
	}

	public ResponseEntity<AuthenticationResponse> token(AuthenticationRequest authenticationRequest) {
		return restTemplate.exchange(PROTOCOL_STRING + authName + authPath + token, POST, HttpEntityFactory.requestWithBody(authenticationRequest), AuthenticationResponse.class);
	}

	public ResponseEntity<AuthenticationResponse> refresh(String token) {
		return restTemplate.exchange(PROTOCOL_STRING + authName + authPath + refresh, GET, HttpEntityFactory.requestWithAuthentication(token), AuthenticationResponse.class);
	}

	public ResponseEntity<JwtUserDetails> user(String token) throws HttpClientErrorException {
		return restTemplate.exchange(PROTOCOL_STRING + authName + authPath + user, GET, HttpEntityFactory.requestWithAuthentication(token), JwtUserDetails.class);
	}

}
