package com.prometheus.domain;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.FetchType.EAGER;
import static javax.persistence.GenerationType.IDENTITY;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;

import com.prometheus.request.RegistrationRequest;

@Entity
public class JwtUser {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	private Long id;

	@Column(unique = true)
	private String username;

	@Column(nullable = false)
	private String password;

	@Column(nullable = false)
	private boolean enabled;

	@OneToOne(fetch = EAGER, mappedBy = "user", cascade = ALL)
	private JwtAccount account;

	@ManyToMany(fetch = EAGER, cascade = ALL)
	private Set<JwtAuthority> authorities;

	public JwtUser() {
		setAuthorities(new HashSet<JwtAuthority>());
		setEnabled(true);
	}

	public JwtUser(RegistrationRequest jwtRegistrationRequest) {
		this();
		setUsername(jwtRegistrationRequest.getUsername());
		setPassword(jwtRegistrationRequest.getPassword());
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public Set<JwtAuthority> getAuthorities() {
		return authorities;
	}

	public JwtAccount getAccount() {
		return account;
	}

	public void setAccount(JwtAccount account) {
		this.account = account;
	}

	public void setAuthorities(Set<JwtAuthority> authorities) {
		this.authorities = authorities;
	}

	public void addAuthority(JwtAuthority authority) {
		authorities.add(authority);
	}

}