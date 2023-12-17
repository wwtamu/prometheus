package com.prometheus.controller;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.prometheus.service.AuthenticationService;

@RestController
@RequestMapping("${prometheus.auth.path}")
public class AuthenticationController extends AuthenticationExceptionHandler {

	@Autowired
	private AuthenticationService authenticationService;

	@RequestMapping(value = "${prometheus.verify}", method = POST)
	public GenericResponse verify(@Valid @RequestBody VerifyRequest verifyRequest) {
		return new GenericResponse(authenticationService.verify(verifyRequest));
	}

	@RequestMapping(value = "${prometheus.register}", method = POST)
	public GenericResponse register(@Valid @RequestBody RegistrationRequest registrationRequest) {
		return new GenericResponse(authenticationService.register(registrationRequest));
	}

	@RequestMapping(value = "${prometheus.token}", method = POST)
	public AuthenticationResponse token(@Valid @RequestBody AuthenticationRequest authenticationRequest) {
		return new AuthenticationResponse(authenticationService.token(authenticationRequest));
	}

	@RequestMapping(value = "${prometheus.refresh}", method = GET)
	public AuthenticationResponse refresh(Authentication authentication) {
		return new AuthenticationResponse(authenticationService.refresh((String) authentication.getCredentials()));
	}

	@RequestMapping(value = "${prometheus.user}", method = GET)
	public JwtUserDetails user(Authentication authentication) {
		return authenticationService.user((String) authentication.getCredentials());
	}

}
