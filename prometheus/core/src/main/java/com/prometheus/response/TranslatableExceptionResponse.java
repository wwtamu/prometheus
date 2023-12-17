package com.prometheus.response;

import com.prometheus.exception.TranslatableException;

public class TranslatableExceptionResponse extends ExceptionResponse {

	private static final long serialVersionUID = -3015872643756888175L;
	
	private String i18n;

	public TranslatableExceptionResponse(TranslatableException exception) {
		super(exception);
		setI18n(exception.getI18n());
	}

	public TranslatableExceptionResponse(TranslatableException exception, String message) {
		this(exception);
		setMessage(message);
	}
	
	public TranslatableExceptionResponse(TranslatableException exception, String message, String i18n) {
		this(exception, message);
		setI18n(i18n);
	}
	
	public TranslatableExceptionResponse(Exception exception, String message, String i18n) {
		super(exception);
		setMessage(message);
		setI18n(i18n);
	}
	
	public String getI18n() {
		return i18n;
	}

	public void setI18n(String i18n) {
		this.i18n = i18n;
	}

}