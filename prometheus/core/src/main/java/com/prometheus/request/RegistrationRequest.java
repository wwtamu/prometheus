package com.prometheus.request;

import static com.prometheus.request.type.FormType.HIDDEN;
import static com.prometheus.request.type.FormType.PASSWORD;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.prometheus.annotation.RequestPropertyInfo;

public class RegistrationRequest implements Request {

	private static final long serialVersionUID = -2867349247709323519L;

	@NotNull
	@Size(min = 5, max = 20)
	@RequestPropertyInfo(label = "User Name")
	private String username;

	@NotNull
	@Size(min = 5, max = 20)
	@RequestPropertyInfo(label = "Password", type = PASSWORD)
	private String password;

	@NotNull
	@Size(min = 5, max = 20)
	@RequestPropertyInfo(label = "Confirm Password", type = PASSWORD)
	private String confirm;

	@RequestPropertyInfo(label = "Verification Token", type = HIDDEN)
	private String token;

	public RegistrationRequest() {
		super();
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

	public String getConfirm() {
		return confirm;
	}

	public void setConfirm(String confirm) {
		this.confirm = confirm;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

}
