package com.prometheus.response;

public class ExpiredTokenResponse implements Response {

	private static final long serialVersionUID = -770035093941481742L;

	private final String message;

	public ExpiredTokenResponse() {
		this("Token is expired!");
	}

	public ExpiredTokenResponse(String message) {
		super();
		this.message = message;
	}

	public String getMessage() {
		return this.message;
	}

}