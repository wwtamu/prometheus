package com.prometheus.response;

public class ExceptionResponse implements Response {

	private static final long serialVersionUID = -3015872643756888175L;

	private final Class<?> clazz;

	private String message;

	private String i18n;

	public ExceptionResponse(Exception exception) {
		super();
		this.clazz = exception.getClass();
		setMessage(exception.getMessage());
	}

	public ExceptionResponse(Exception exception, String message) {
		this(exception);
		setMessage(message);
	}

	public ExceptionResponse(Class<?> clazz, String message) {
		super();
		this.clazz = clazz;
		setMessage(message);
	}

	@SuppressWarnings("unchecked")
	public Class<Exception> getClazz() {
		return (Class<Exception>) clazz;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getI18n() {
		return i18n;
	}

	public void setI18n(String i18n) {
		this.i18n = i18n;
	}

}
