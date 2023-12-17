package com.prometheus.email;

import javax.mail.internet.MimeMessage;

import org.springframework.mail.MailException;

public class MockEmailer extends Emailer {

	public MockEmailer() {
		super(null, null);
	}

	@Override
	protected void doSend(MimeMessage[] mimeMessages, Object[] originalMessages) throws MailException {

	}

}
