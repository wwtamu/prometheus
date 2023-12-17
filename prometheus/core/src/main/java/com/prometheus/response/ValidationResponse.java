package com.prometheus.response;

import java.util.HashMap;
import java.util.Map;

public class ValidationResponse implements Response {

	private static final long serialVersionUID = 4298399232914431998L;

	private final String message;

	private Map<String, Map<String, String>> errors;

	public ValidationResponse(String message) {
		super();
		this.message = message;
		setErrors(new HashMap<String, Map<String, String>>());
	}

	public String getMessage() {
		return message;
	}

	public Map<String, Map<String, String>> getErrors() {
		return errors;
	}

	public void setErrors(Map<String, Map<String, String>> errors) {
		this.errors = errors;
	}

	public void putError(String field, String code, String message) {
		Map<String, String> error;
		if ((error = errors.get(field)) == null) {
			error = new HashMap<String, String>();
		}
		error.put(code, message);
		errors.put(field, error);
	}

}
