package com.prometheus.request.from;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.prometheus.request.type.FormType;

public class RequestFormField implements Serializable {

	private static final long serialVersionUID = -2525120189598632158L;

	private final FormType type;

	private final String property;

	private final String label;

	private final String language;

	private final Boolean repeatable;

	private final Map<String, Map<String, Object>> validations;

	private RequestFormSelect select;

	private List<RequestAlternateFormField> alternateFormInputs;

	public RequestFormField(FormType type, String property, String label, String language, Boolean repeatable, Map<String, Map<String, Object>> validations) {
		super();
		this.type = type;
		this.property = property;
		this.language = language;
		this.label = label;
		this.repeatable = repeatable;
		this.validations = validations;
		setSelect(new RequestFormSelect());
		setAlternateFormInputs(new ArrayList<RequestAlternateFormField>());
	}

	public FormType getType() {
		return type;
	}

	public String getProperty() {
		return property;
	}

	public String getLabel() {
		return label;
	}

	public String getLanguage() {
		return language;
	}

	public Boolean getRepeatable() {
		return repeatable;
	}

	public Map<String, Map<String, Object>> getValidations() {
		return validations;
	}

	public RequestFormSelect getSelect() {
		return select;
	}

	public void setSelect(RequestFormSelect select) {
		this.select = select;
	}

	public List<RequestAlternateFormField> getAlternateFormInputs() {
		return alternateFormInputs;
	}

	public void setAlternateFormInputs(List<RequestAlternateFormField> alternateFormInputs) {
		this.alternateFormInputs = alternateFormInputs;
	}

}
