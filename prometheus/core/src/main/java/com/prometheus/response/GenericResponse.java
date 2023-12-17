package com.prometheus.response;

public class GenericResponse implements Response {

	private static final long serialVersionUID = -2797290340033129339L;

	private final String message;

	public GenericResponse(String message) {
		super();
		this.message = message;
	}

	public String getMessage() {
		return this.message;
	}

}
