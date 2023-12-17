package com.prometheus.response;

public class AuthenticationResponse implements Response {

	private static final long serialVersionUID = -1130892845765832461L;

	private String token;

	public AuthenticationResponse() {
		super();
	}

	public AuthenticationResponse(String token) {
		this();
		setToken(token);
	}

	public String getToken() {
		return this.token;
	}

	public void setToken(String token) {
		this.token = token;
	}

}
