package com.prometheus.controller;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prometheus.domain.JwtUser;
import com.prometheus.domain.repo.JwtUserRepo;

@RestController
@RequestMapping("/user")
@PreAuthorize("hasRole('ADMIN')")
public class UserController {

	@Autowired
	private JwtUserRepo jwtUserRepo;

	@RequestMapping(value = "/all", method = GET)
	public ResponseEntity<List<JwtUser>> getAllAccounts() {
		return ResponseEntity.ok(jwtUserRepo.findAll());
	}

	@RequestMapping(value = "/{username}", method = GET)
	public ResponseEntity<JwtUser> getUserByUsername(@PathVariable String username) {
		return ResponseEntity.ok(jwtUserRepo.findByUsername(username).get());
	}

}
