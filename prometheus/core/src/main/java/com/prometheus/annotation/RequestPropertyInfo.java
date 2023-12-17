package com.prometheus.annotation;

import static com.prometheus.request.type.FormType.TEXT;
import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import com.prometheus.request.type.FormType;
import com.prometheus.request.type.OptionType;

@Documented
@Target(FIELD)
@Retention(RUNTIME)
public @interface RequestPropertyInfo {

	String label();

	String language() default "en_US";

	FormType type() default TEXT;

	ConditionalFormType[] conditionalFormTypes() default {};

	Options options() default @Options();

	@Target(FIELD)
	@Retention(RUNTIME)
	@Documented
	public @interface ConditionalFormType {

		String property();

		String value();

		FormType type();

		Options options() default @Options();

	}

	@Target(FIELD)
	@Retention(RUNTIME)
	@Documented
	public @interface Options {

		String property() default "";

		String reference() default "";

		OptionType type() default OptionType.JSON;

	}

}
