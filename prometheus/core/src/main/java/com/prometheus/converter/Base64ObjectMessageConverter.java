package com.prometheus.converter;

import static org.springframework.util.MimeTypeUtils.TEXT_PLAIN;

import java.util.Base64;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.converter.AbstractMessageConverter;
import org.springframework.util.SerializationUtils;

public class Base64ObjectMessageConverter extends AbstractMessageConverter {

	public Base64ObjectMessageConverter() {
		super(TEXT_PLAIN);
	}

	protected boolean supports(Class<?> clazz) {
		return true;
	}

	public Object convertFromInternal(Message<?> message, Class<?> targetClass) {
		return SerializationUtils.deserialize(Base64.getDecoder().decode((byte[]) message.getPayload()));
	}

	public Object convertToInternal(Object payload, MessageHeaders headers) {
		return Base64.getEncoder().encode(SerializationUtils.serialize(payload));
	}

}