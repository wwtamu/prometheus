package com.prometheus.controller;

import static com.prometheus.constants.Constants.DEFAULT_EXCEPTION_TRANSLATION;
import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.HttpStatus.FORBIDDEN;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.prometheus.exception.IncorrectCredentialsException;
import com.prometheus.exception.TranslatableException;
import com.prometheus.factory.ValidationResponseFactory;
import com.prometheus.response.TranslatableExceptionResponse;
import com.prometheus.response.ValidationResponse;

public abstract class AuthenticationExceptionHandler {

	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseStatus(value = BAD_REQUEST)
	public ValidationResponse handleValidationException(MethodArgumentNotValidException exception) {
		return ValidationResponseFactory.create(exception.getBindingResult());
	}

	@ExceptionHandler(TranslatableException.class)
	@ResponseStatus(value = BAD_REQUEST)
	public TranslatableExceptionResponse handleTranslatableException(TranslatableException exception) {
		return new TranslatableExceptionResponse(exception);
	}

	@ExceptionHandler(DataIntegrityViolationException.class)
	@ResponseStatus(value = CONFLICT)
	public TranslatableExceptionResponse handleDataIntegrityViolation(DataIntegrityViolationException exception) {
		return new TranslatableExceptionResponse(exception, exception.getMostSpecificCause().getMessage(), DEFAULT_EXCEPTION_TRANSLATION);
	}

	@ExceptionHandler(BadCredentialsException.class)
	@ResponseStatus(value = FORBIDDEN)
	public TranslatableExceptionResponse handleBadCredentialsException(BadCredentialsException exception) {
		return new TranslatableExceptionResponse(new IncorrectCredentialsException());
	}

}
