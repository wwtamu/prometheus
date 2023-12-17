package com.prometheus.init;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.prometheus.model.Sidebar;
import com.prometheus.model.repo.SidebarRepo;

@Component
public class SidebarServiceInitializer implements CommandLineRunner {

	@Autowired
	private ResourceLoader resourceLoader;

	@Autowired
	private ObjectMapper objectMapper;

	@Autowired
	private SidebarRepo sidebarRepo;

	@Override
	public void run(String... arg0) throws Exception {
		Resource sidebarsDirectory = resourceLoader.getResource("classpath:sidebars");
		if (sidebarsDirectory.exists()) {
			for (File sidebarFile : sidebarsDirectory.getFile().listFiles()) {
				sidebarRepo.save(objectMapper.readValue(sidebarFile, Sidebar.class));
			}
		}
	}

}
