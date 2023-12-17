package com.prometheus.controller;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prometheus.domain.JwtAccount;
import com.prometheus.domain.repo.JwtAccountRepo;

@RestController
@RequestMapping("/account")
@PreAuthorize("hasRole('ADMIN')")
public class AccountController {

	@Autowired
	private JwtAccountRepo jwtAccountRepo;

	@RequestMapping(value = "/all", method = GET)
	public ResponseEntity<List<JwtAccount>> getAllAccounts() {
		return ResponseEntity.ok(jwtAccountRepo.findAll());
	}

	@RequestMapping(value = "/{email}", method = GET)
	public ResponseEntity<JwtAccount> getAccountByEmail(@PathVariable String email) {
		return ResponseEntity.ok(jwtAccountRepo.findByEmail(email).get());
	}

}
