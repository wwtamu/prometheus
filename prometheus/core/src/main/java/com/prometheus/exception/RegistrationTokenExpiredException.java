package com.prometheus.exception;

public class RegistrationTokenExpiredException extends TranslatableException {

	private static final long serialVersionUID = 8028712399034231686L;

	public RegistrationTokenExpiredException() {
		super("The registration token has expired!", "exception.registration.expired");
	}

	public RegistrationTokenExpiredException(String message) {
		super(message);
	}
	
	public RegistrationTokenExpiredException(String message, String i18n) {
		super(message, i18n);
	}

}