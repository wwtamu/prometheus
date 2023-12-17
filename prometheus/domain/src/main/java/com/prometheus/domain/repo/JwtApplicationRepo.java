package com.prometheus.domain.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prometheus.domain.JwtApplication;

@Repository
public interface JwtApplicationRepo extends JpaRepository<JwtApplication, Long> {

	Optional<JwtApplication> findByName(String name);

}
