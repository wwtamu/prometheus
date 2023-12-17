package com.prometheus.model.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prometheus.model.SidecardLink;

@Repository
public interface SidecardLinkRepo extends JpaRepository<SidecardLink, Long> {
	
}
