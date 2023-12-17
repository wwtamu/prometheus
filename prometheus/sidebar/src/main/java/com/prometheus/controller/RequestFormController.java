package com.prometheus.controller;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prometheus.request.SidecardLinkRequest;
import com.prometheus.request.SidecardRequest;
import com.prometheus.service.RequestFormService;

@RestController
@RequestMapping("${prometheus.form.path}")
public class RequestFormController {

	@Autowired
	private RequestFormService requestFormService;

	@RequestMapping(value = "${prometheus.sidecard}", method = GET)
	public ResponseEntity<?> sidecardRequestForm() {
		return ResponseEntity.ok(requestFormService.craftRequestForm(SidecardRequest.class));
	}

	@RequestMapping(value = "${prometheus.sidecard.link}", method = GET)
	public ResponseEntity<?> sidecardLinkRequestForm() {
		return ResponseEntity.ok(requestFormService.craftRequestForm(SidecardLinkRequest.class));
	}

}
