package com.prometheus.deserializer;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.prometheus.factory.JwtUserDetailsJsonNodeFactory;
import com.prometheus.security.JwtUserDetails;

public class JwtUserDetailsDeserializer extends JsonDeserializer<JwtUserDetails> {

	@Override
	public JwtUserDetails deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JsonProcessingException {
		return JwtUserDetailsJsonNodeFactory.create((JsonNode) jsonParser.getCodec().readTree(jsonParser));
	}

}
