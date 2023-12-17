package com.prometheus.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.prometheus.deserializer.JwtUserDetailsDeserializer;

@JsonDeserialize(using = JwtUserDetailsDeserializer.class)
public class JwtUserDetails implements UserDetails {

	private static final long serialVersionUID = 4771985025480850796L;

	private Long id;

	private String username;

	private String firstName;

	private String lastName;

	private String email;

	private String password;

	private Collection<? extends GrantedAuthority> authorities;

	private boolean enabled;

	private boolean expired;

	private long expiration;

	public JwtUserDetails() {
		setExpired(false);
	}

	public JwtUserDetails(Long id, String username, String firstName, String lastName, String email, Collection<? extends GrantedAuthority> authorities, boolean enabled) {
		this();
		this.id = id;
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.authorities = authorities;
		this.enabled = enabled;
	}

	public JwtUserDetails(Long id, String username, String firstName, String lastName, String email, Collection<? extends GrantedAuthority> authorities, boolean enabled, long expiration) {
		this(id, username, firstName, lastName, email, authorities, enabled);
		this.expiration = expiration;
	}

	public JwtUserDetails(Long id, String username, String firstName, String lastName, String email, String password, Collection<? extends GrantedAuthority> authorities, boolean enabled) {
		this(id, username, firstName, lastName, email, authorities, enabled);
		this.password = password;
	}

	public Long getId() {
		return id;
	}

	@Override
	public String getUsername() {
		return username;
	}

	@JsonIgnore
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@JsonIgnore
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@JsonIgnore
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@JsonIgnore
	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public boolean isEnabled() {
		return enabled;
	}

	public boolean isExpired() {
		return expired;
	}

	public void setExpired(boolean expired) {
		this.expired = expired;
	}

	public long getExpiration() {
		return expiration;
	}

	public void setExpiration(long expiration) {
		this.expiration = expiration;
	}

}