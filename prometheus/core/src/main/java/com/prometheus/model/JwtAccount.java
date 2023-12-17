package com.prometheus.model;

public class JwtAccount {

	private Long id;

	private String email;

	private String firstName;

	private String lastName;

	private boolean active;

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
