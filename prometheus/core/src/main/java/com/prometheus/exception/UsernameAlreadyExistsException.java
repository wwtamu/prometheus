package com.prometheus.exception;

public class UsernameAlreadyExistsException extends TranslatableException {

	private static final long serialVersionUID = 7379407565525608562L;

	public UsernameAlreadyExistsException(String username) {
		super("Username " + username + " already exists!", "exception.username.exists");
	}

	public UsernameAlreadyExistsException(String message, String i18n) {
		super(message, i18n);
	}

}