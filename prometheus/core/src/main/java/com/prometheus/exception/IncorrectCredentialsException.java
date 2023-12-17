package com.prometheus.exception;

public class IncorrectCredentialsException extends TranslatableException {

	private static final long serialVersionUID = 6410966802133737666L;

	public IncorrectCredentialsException() {
		super("Incorrect username or password!", "exception.incorrect.credentials");
	}

	public IncorrectCredentialsException(String message) {
		super(message);
	}
	
	public IncorrectCredentialsException(String message, String i18n) {
		super(message, i18n);
	}

}