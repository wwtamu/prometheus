package com.prometheus.exception;

public class InvalidClaimsException extends TranslatableException {

	private static final long serialVersionUID = 7832665875670010675L;

	public InvalidClaimsException() {
		super("Claims are invalid!", "exception.invalid.claims");
	}

	public InvalidClaimsException(String message) {
		super(message);
	}
	
	public InvalidClaimsException(String message, String i18n) {
		super(message, i18n);
	}

}