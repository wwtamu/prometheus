package com.prometheus.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.prometheus.domain.JwtUser;
import com.prometheus.domain.repo.JwtUserRepo;
import com.prometheus.factory.JwtUserDetailsFactory;

@Service
public class JwtUserDetailsService implements UserDetailsService {

	@Autowired
	private JwtUserRepo jwtUserRepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<JwtUser> user = jwtUserRepo.findByUsername(username);
		if (!user.isPresent()) {
			throw new UsernameNotFoundException(String.format("No user found with username '%s'.", username));
		} else {
			return JwtUserDetailsFactory.create(user.get());
		}
	}

}
