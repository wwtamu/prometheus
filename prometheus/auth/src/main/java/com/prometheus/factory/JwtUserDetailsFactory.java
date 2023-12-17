package com.prometheus.factory;

import com.prometheus.domain.JwtAccount;
import com.prometheus.domain.JwtUser;
import com.prometheus.security.JwtUserDetails;

public final class JwtUserDetailsFactory extends JwtUserDetailsJsonNodeFactory {

	public static JwtUserDetails create(JwtUser user) {
		JwtAccount jwtAccount = user.getAccount();
		return new JwtUserDetails(user.getId(), user.getUsername(), jwtAccount.getFirstName(), jwtAccount.getLastName(), jwtAccount.getEmail(), user.getPassword(), user.getAuthorities(), user.getEnabled());
	}

}