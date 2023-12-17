package com.prometheus.controller;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prometheus.security.JwtUserDetails;
import com.prometheus.service.DistributedAuthenticationService;

@RestController
@RequestMapping("${prometheus.auth.path}")
public class AuthenticationController extends AuthenticationExceptionHandler {

	@Autowired
	private DistributedAuthenticationService distributedAuthenticationService;

	@RequestMapping(value = "${prometheus.user}", method = GET)
	public ResponseEntity<JwtUserDetails> user(Authentication authentication) throws InterruptedException, ExecutionException {
		return ResponseEntity.ok(distributedAuthenticationService.user((String) authentication.getCredentials()));
	}

}
