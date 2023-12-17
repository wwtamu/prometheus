package com.prometheus.exception;

public class ExpiredTokenException extends TranslatableException {

	private static final long serialVersionUID = -5915452129673216645L;

	public ExpiredTokenException() {
		super("Token is expired!", "exception.expired.token");
	}

	public ExpiredTokenException(String message) {
		super(message);
	}
	
	public ExpiredTokenException(String message, String i18n) {
		super(message, i18n);
	}

}