package com.prometheus.request.from;

import java.io.Serializable;

import com.prometheus.request.type.FormType;

public class RequestAlternateFormField implements Serializable {

	private static final long serialVersionUID = 2482980148491556816L;

	private final FormType type;

	private final String property;

	private final String value;

	private RequestFormSelect select;

	public RequestAlternateFormField(FormType type, String property, String value) {
		super();
		this.type = type;
		this.property = property;
		this.value = value;
		setSelect(new RequestFormSelect());
	}

	public FormType getType() {
		return type;
	}

	public String getProperty() {
		return property;
	}

	public String getValue() {
		return value;
	}

	public RequestFormSelect getSelect() {
		return select;
	}

	public void setSelect(RequestFormSelect select) {
		this.select = select;
	}

}
