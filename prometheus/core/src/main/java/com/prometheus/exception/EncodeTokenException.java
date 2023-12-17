package com.prometheus.exception;

public class EncodeTokenException extends TranslatableException {

	private static final long serialVersionUID = 4941100230928993979L;

	public EncodeTokenException() {
		super("Unexpectedly failed to encode token!", "exception.encode.token");
	}

	public EncodeTokenException(String message) {
		super(message);
	}
	
	public EncodeTokenException(String message, String i18n) {
		super(message, i18n);
	}

}