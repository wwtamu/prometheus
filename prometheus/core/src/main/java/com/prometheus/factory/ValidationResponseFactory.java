package com.prometheus.factory;

import org.springframework.validation.BindingResult;

import com.prometheus.response.ValidationResponse;

public final class ValidationResponseFactory {

	public static ValidationResponse create(BindingResult bindingResult) {
		ValidationResponse validationResponse = new ValidationResponse("Validation failed. " + bindingResult.getErrorCount() + " error(s)");
		bindingResult.getFieldErrors().forEach(error -> {
			validationResponse.putError(error.getField(), error.getCode(), error.getDefaultMessage());
		});
		return validationResponse;
	}

}
