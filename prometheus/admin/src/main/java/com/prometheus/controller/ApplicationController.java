package com.prometheus.controller;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prometheus.domain.JwtApplication;
import com.prometheus.domain.repo.JwtApplicationRepo;

@RestController
@RequestMapping("/application")
@PreAuthorize("hasRole('ADMIN')")
public class ApplicationController {

	@Autowired
	private JwtApplicationRepo jwtApplicationRepo;

	@RequestMapping(value = "/all", method = GET)
	public ResponseEntity<List<JwtApplication>> getAllApplications() {
		return ResponseEntity.ok(jwtApplicationRepo.findAll());
	}

	@RequestMapping(value = "/{name}", method = GET)
	public ResponseEntity<JwtApplication> getApplicationByName(@PathVariable String name) {
		return ResponseEntity.ok(jwtApplicationRepo.findByName(name).get());
	}

}
