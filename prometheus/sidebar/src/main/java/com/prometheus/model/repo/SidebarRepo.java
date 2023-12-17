package com.prometheus.model.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prometheus.model.Sidebar;

@Repository
public interface SidebarRepo extends JpaRepository<Sidebar, Long> {
	
	Optional<Sidebar> findByNameAndUsername(String name, String username);
	
}
