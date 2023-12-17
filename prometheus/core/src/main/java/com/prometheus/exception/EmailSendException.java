package com.prometheus.exception;

public class EmailSendException extends TranslatableException {

	private static final long serialVersionUID = 2172137715193313188L;

	public EmailSendException() {
		super("Unexpectedly failed to send email!", "exception.email.send");
	}

	public EmailSendException(String message) {
		super(message);
	}
	
	public EmailSendException(String message, String i18n) {
		super(message, i18n);
	}

}