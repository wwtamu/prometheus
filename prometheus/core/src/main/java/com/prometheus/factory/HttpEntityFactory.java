package com.prometheus.factory;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;

import com.prometheus.request.Request;

public class HttpEntityFactory {

	public static <R extends Request> HttpEntity<R> requestWithBody(R request) {
		return new HttpEntity<R>(request);
	}

	public static HttpEntity<String> requestWithAuthentication(String token) {
		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", token);
		return new HttpEntity<String>(headers);
	}

}
