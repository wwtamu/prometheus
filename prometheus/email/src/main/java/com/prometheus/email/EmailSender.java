package com.prometheus.email;

import javax.mail.MessagingException;

import org.springframework.mail.javamail.JavaMailSender;

public interface EmailSender extends JavaMailSender {

	public void sendEmail(String to, String subject, String text) throws MessagingException;

}