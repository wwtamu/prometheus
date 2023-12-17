package com.prometheus.exception;

public abstract class TranslatableException extends RuntimeException {

	private static final long serialVersionUID = 6887430040395473928L;

	protected String i18n;
	
	public TranslatableException(String message) {
		super(message);
	}
	
	public TranslatableException(String message, String i18n) {
		super(message);
		setI18n(i18n);
	}

	public String getI18n() {
		return i18n;
	}

	public void setI18n(String i18n) {
		this.i18n = i18n;
	}

}
