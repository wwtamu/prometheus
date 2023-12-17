package com.prometheus.controller;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prometheus.request.AuthenticationRequest;
import com.prometheus.request.RegistrationRequest;
import com.prometheus.request.VerifyRequest;
import com.prometheus.service.RequestFormService;

@RestController
@RequestMapping("${prometheus.form.path}")
public class RequestFormController {
	
	@Autowired
	private RequestFormService requestFormService;
	
	@RequestMapping(value = "${prometheus.verify}", method = GET)
	public ResponseEntity<?> verifyRequestForm() {
		return ResponseEntity.ok(requestFormService.craftRequestForm(VerifyRequest.class));
	}

	@RequestMapping(value = "${prometheus.register}", method = GET)
	public ResponseEntity<?> registrationRequestForm() {
		return ResponseEntity.ok(requestFormService.craftRequestForm(RegistrationRequest.class));
	}

	@RequestMapping(value = "${prometheus.token}", method = GET)
	public ResponseEntity<?> loginRequestForm() {
		return ResponseEntity.ok(requestFormService.craftRequestForm(AuthenticationRequest.class));
	}

}
