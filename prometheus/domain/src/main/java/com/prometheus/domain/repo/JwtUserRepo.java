package com.prometheus.domain.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prometheus.domain.JwtUser;

@Repository
public interface JwtUserRepo extends JpaRepository<JwtUser, Long> {

	Optional<JwtUser> findByUsername(String username);

}
