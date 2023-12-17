package com.prometheus.exception;

public class UserWithEmailAlreadyExistsException extends TranslatableException {

	private static final long serialVersionUID = -3551008417978900983L;

	public UserWithEmailAlreadyExistsException(String email) {
		super("User with email " + email + " already exists!", "exception.email.exists");
	}
	
	public UserWithEmailAlreadyExistsException(String message, String i18n) {
		super(message, i18n);
	}

}