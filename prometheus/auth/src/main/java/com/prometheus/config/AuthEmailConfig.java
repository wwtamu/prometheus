package com.prometheus.config;

import static com.prometheus.constants.Constants.DEFAULT_CHARACTER_ENCODING;
import static com.prometheus.model.Profiles.PRODUCTION;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.prometheus.email.Emailer;

@Configuration
@Profile(PRODUCTION)
public class AuthEmailConfig {

	@Value("${prometheus.email.from}")
	private String from;

	@Value("${prometheus.email.replyTo}")
	private String replyTo;

	@Value("${prometheus.email.host}")
	private String host;

	@Value("${prometheus.email.port}")
	private int port;

	@Value("${prometheus.email.protocol}")
	private String protocol;

	@Value("${prometheus.email.username}")
	private String username;

	@Value("${prometheus.email.password}")
	private String password;

	@Value("${prometheus.email.channel}")
	private String channel;

	@Bean
	public Emailer emailer() {
		Emailer emailer = new Emailer(from, replyTo);
		emailer.setDefaultEncoding(DEFAULT_CHARACTER_ENCODING);
		emailer.setHost(host);
		emailer.setPort(port);
		emailer.setProtocol(protocol);
		emailer.setUsername(username);
		emailer.setPassword(password);
		emailer.setChannel(channel);
		return emailer;
	}

}
