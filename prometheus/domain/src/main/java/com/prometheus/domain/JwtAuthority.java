package com.prometheus.domain;

import static javax.persistence.CascadeType.DETACH;
import static javax.persistence.CascadeType.MERGE;
import static javax.persistence.CascadeType.PERSIST;
import static javax.persistence.CascadeType.REFRESH;
import static javax.persistence.EnumType.STRING;
import static javax.persistence.FetchType.EAGER;
import static javax.persistence.GenerationType.IDENTITY;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import org.springframework.security.core.GrantedAuthority;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class JwtAuthority implements GrantedAuthority {

	private static final long serialVersionUID = -3437421596950507232L;

	@Id
	@GeneratedValue(strategy = IDENTITY)
	private Long id;

	@Enumerated(STRING)
	private JwtRole role;

	@ManyToMany(fetch = EAGER, cascade = { DETACH, MERGE, REFRESH, PERSIST })
	private Set<JwtApplication> scope;

	public JwtAuthority() {
		super();
		setScope(new HashSet<JwtApplication>());
	}

	public JwtAuthority(Long id, JwtRole role, Set<JwtApplication> scope) {
		super();
		setId(id);
		setRole(role);
		setScope(scope);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public JwtRole getRole() {
		return role;
	}

	public void setRole(JwtRole role) {
		this.role = role;
	}

	public Set<JwtApplication> getScope() {
		return scope;
	}

	public void setScope(Set<JwtApplication> scope) {
		this.scope = scope;
	}

	public void addApplication(JwtApplication application) {
		scope.add(application);
	}

	public void removeApplication(JwtApplication application) {
		scope.remove(application);
	}

	@JsonIgnore
	@Override
	public String getAuthority() {
		return role.toString();
	}

}
