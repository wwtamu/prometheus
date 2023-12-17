package com.prometheus.factory;

import static com.prometheus.constants.Constants.CLAIM_AUTHORITIES_KEY;
import static com.prometheus.constants.Constants.CLAIM_EMAIL_KEY;
import static com.prometheus.constants.Constants.CLAIM_ENABLED_KEY;
import static com.prometheus.constants.Constants.CLAIM_EXPIRATION_KEY;
import static com.prometheus.constants.Constants.CLAIM_FIRSTNAME_KEY;
import static com.prometheus.constants.Constants.CLAIM_ID_KEY;
import static com.prometheus.constants.Constants.CLAIM_LASTNAME_KEY;
import static com.prometheus.constants.Constants.CLAIM_ROLE_KEY;
import static com.prometheus.constants.Constants.CLAIM_SCOPE_DESCRIPTION_KEY;
import static com.prometheus.constants.Constants.CLAIM_SCOPE_KEY;
import static com.prometheus.constants.Constants.CLAIM_SCOPE_NAME_KEY;
import static com.prometheus.constants.Constants.CLAIM_USERNAME_KEY;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.databind.JsonNode;
import com.prometheus.model.JwtApplication;
import com.prometheus.model.JwtAuthority;
import com.prometheus.model.JwtRole;
import com.prometheus.security.JwtUserDetails;

public class JwtUserDetailsJsonNodeFactory {

	public static JwtUserDetails create(JsonNode userNode) {
		return new JwtUserDetails(userNode.get(CLAIM_ID_KEY).asLong(), userNode.get(CLAIM_USERNAME_KEY).asText(), userNode.get(CLAIM_FIRSTNAME_KEY).asText(), userNode.get(CLAIM_LASTNAME_KEY).asText(), userNode.get(CLAIM_EMAIL_KEY).asText(), mapToJwtAuthorities(userNode.get(CLAIM_AUTHORITIES_KEY)), userNode.get(CLAIM_ENABLED_KEY).asBoolean(), userNode.get(CLAIM_EXPIRATION_KEY).asLong());
	}

	private static List<JwtAuthority> mapToJwtAuthorities(JsonNode authoritiesNode) {
		List<JwtAuthority> jwtAuthorities = new ArrayList<JwtAuthority>();
		for (final JsonNode authorityNode : authoritiesNode) {
			Set<JwtApplication> scope = new HashSet<JwtApplication>();
			for (final JsonNode applicationNode : authorityNode.get(CLAIM_SCOPE_KEY)) {
				scope.add(new JwtApplication(applicationNode.get(CLAIM_ID_KEY).asLong(), applicationNode.get(CLAIM_SCOPE_NAME_KEY).asText(), applicationNode.get(CLAIM_SCOPE_DESCRIPTION_KEY).asText()));
			}
			jwtAuthorities.add(new JwtAuthority(authorityNode.get(CLAIM_ID_KEY).asLong(), JwtRole.valueOf(authorityNode.get(CLAIM_ROLE_KEY).asText()), scope));
		}
		return jwtAuthorities;
	}

}