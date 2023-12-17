package com.prometheus.exception;

public class DecodeTokenException extends TranslatableException {

	private static final long serialVersionUID = 2816495277509200453L;

	public DecodeTokenException() {
		super("Unexpectedly failed to decode token!", "exception.decode.token");
	}

	public DecodeTokenException(String message) {
		super(message);
	}
	
	public DecodeTokenException(String message, String i18n) {
		super(message, i18n);
	}

}