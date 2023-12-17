package com.prometheus.controller;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

import java.util.concurrent.ExecutionException;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prometheus.request.AuthenticationRequest;
import com.prometheus.request.RegistrationRequest;
import com.prometheus.request.VerifyRequest;
import com.prometheus.response.AuthenticationResponse;
import com.prometheus.response.GenericResponse;
import com.prometheus.security.JwtUserDetails;
import com.prometheus.service.RemoteAuthenticationService;

@RestController
@RequestMapping("${prometheus.auth.path}")
public class AuthenticationController extends AuthenticationExceptionHandler {

	@Autowired
	private RemoteAuthenticationService remoteAuthenticationService;

	@RequestMapping(value = "${prometheus.verify}", method = POST)
	public ResponseEntity<GenericResponse> verify(@Valid @RequestBody VerifyRequest verifyRequest) throws Exception {
		return remoteAuthenticationService.verify(verifyRequest);
	}

	@RequestMapping(value = "${prometheus.register}", method = POST)
	public ResponseEntity<GenericResponse> register(@Valid @RequestBody RegistrationRequest registrationRequest) throws Exception {
		return remoteAuthenticationService.register(registrationRequest);
	}

	@RequestMapping(value = "${prometheus.token}", method = POST)
	public ResponseEntity<AuthenticationResponse> token(@Valid @RequestBody AuthenticationRequest authenticationRequest) throws Exception {
		return remoteAuthenticationService.token(authenticationRequest);
	}

	@RequestMapping(value = "${prometheus.refresh}", method = GET)
	public ResponseEntity<AuthenticationResponse> refresh(Authentication authentication) throws Exception {
		return remoteAuthenticationService.refresh((String) authentication.getCredentials());
	}

	@RequestMapping(value = "${prometheus.user}", method = GET)
	public ResponseEntity<JwtUserDetails> user(Authentication authentication) throws InterruptedException, ExecutionException {
		return remoteAuthenticationService.user((String) authentication.getCredentials());
	}
}
