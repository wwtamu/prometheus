package com.prometheus.request;

import static com.prometheus.request.type.FormType.PASSWORD;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.prometheus.annotation.RequestPropertyInfo;

public class AuthenticationRequest implements Request {

	private static final long serialVersionUID = 4597323693946021077L;

	@NotNull
	@Size(min = 5, max = 20)
	@RequestPropertyInfo(label = "User Name")
	private String username;

	@NotNull
	@Size(min = 5, max = 20)
	@RequestPropertyInfo(label = "Password", type = PASSWORD)
	private String password;

	public AuthenticationRequest() {
		super();
	}

	public AuthenticationRequest(String username, String password) {
		this();
		setUsername(username);
		setPassword(password);
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}