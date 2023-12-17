package com.prometheus.model.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prometheus.model.Sidecard;

@Repository
public interface SidecardRepo extends JpaRepository<Sidecard, Long> {
	
}
