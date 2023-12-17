package com.prometheus.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prometheus.security.JwtUserDetails;
import com.prometheus.security.JwtUtility;

@Service
public class DistributedAuthenticationService {

	@Autowired
	private JwtUtility jwtUtility;

	public JwtUserDetails user(String token) {
		return jwtUtility.getUserDetailsFromToken(token);
	}

}
