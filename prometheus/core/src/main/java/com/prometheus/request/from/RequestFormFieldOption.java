package com.prometheus.request.from;

import java.io.Serializable;

public class RequestFormFieldOption implements Serializable {

	private static final long serialVersionUID = -3593539374084703060L;

	private String gloss;

	private Object value;

	public RequestFormFieldOption() {
		super();
	}

	public RequestFormFieldOption(String gloss, Object value) {
		this();
		setGloss(gloss);
		setValue(value);
	}

	public String getGloss() {
		return gloss;
	}

	public void setGloss(String gloss) {
		this.gloss = gloss;
	}

	public Object getValue() {
		return value;
	}

	public void setValue(Object value) {
		this.value = value;
	}

}
