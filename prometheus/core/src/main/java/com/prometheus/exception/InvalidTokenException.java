package com.prometheus.exception;

public class InvalidTokenException extends TranslatableException {

	private static final long serialVersionUID = -7941644404384960780L;

	public InvalidTokenException() {
		this("Token is invalid!", "exception.invalid.token");
	}

	public InvalidTokenException(String message) {
		this(message, "exception.invalid.token");
	}
	
	public InvalidTokenException(String message, String i18n) {
		super(message, i18n);
	}

}