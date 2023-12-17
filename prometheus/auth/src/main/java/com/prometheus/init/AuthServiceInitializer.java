package com.prometheus.init;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.prometheus.domain.JwtUser;
import com.prometheus.domain.repo.JwtUserRepo;

@Component
public class AuthServiceInitializer implements CommandLineRunner {

	@Autowired
	private ResourceLoader resourceLoader;

	@Autowired
	private ObjectMapper objectMapper;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private JwtUserRepo jwtUserRepo;

	@Override
	public void run(String... args) throws Exception {
		Resource userDirectory = resourceLoader.getResource("classpath:users");
		if (userDirectory.exists()) {
			for (File userFile : userDirectory.getFile().listFiles()) {
				JwtUser jwtUser = objectMapper.readValue(userFile, JwtUser.class);
				jwtUser.setPassword(passwordEncoder.encode(jwtUser.getPassword()));
				jwtUserRepo.save(jwtUser);
			}
		}
	}

}
