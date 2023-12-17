package com.prometheus.domain;

import static javax.persistence.CascadeType.MERGE;
import static javax.persistence.CascadeType.REFRESH;
import static javax.persistence.FetchType.EAGER;
import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
public class JwtAccount {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String email;

	@Column(nullable = false)
	private String firstName;

	@Column(nullable = false)
	private String lastName;

	@Column(nullable = false)
	private boolean active;

	@OneToOne(fetch = EAGER, cascade = { MERGE, REFRESH })
	@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, scope = JwtUser.class, property = "id")
	@JsonIdentityReference(alwaysAsId = true)
	private JwtUser user;

	public JwtAccount() {
		setActive(false);
	}

	public JwtAccount(String email, String firstName, String lastName) {
		this();
		setEmail(email);
		setFirstName(firstName);
		setLastName(lastName);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
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

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public JwtUser getUser() {
		return user;
	}

	public void setUser(JwtUser user) {
		this.user = user;
	}

}
