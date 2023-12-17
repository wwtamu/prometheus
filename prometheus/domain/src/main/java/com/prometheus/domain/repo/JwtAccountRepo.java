package com.prometheus.domain.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prometheus.domain.JwtAccount;

@Repository
public interface JwtAccountRepo extends JpaRepository<JwtAccount, Long> {

	Optional<JwtAccount> findByEmail(String email);

}
