package com.prometheus.exception;

public class ConfirmPasswordException extends TranslatableException {

	private static final long serialVersionUID = 6576957645008696359L;

	public ConfirmPasswordException() {
		super("Passwords do not match!", "exception.confirm.password");
	}

	public ConfirmPasswordException(String message) {
		super(message);
	}
	
	public ConfirmPasswordException(String message, String i18n) {
		super(message, i18n);
	}

}