package com.prometheus.request.from;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.prometheus.request.type.OptionType;

public class RequestFormSelect implements Serializable {

	private static final long serialVersionUID = -6507792126023719696L;

	private OptionType optionType;

	private String optionReference;

	private String optionProperty;

	private List<RequestFormFieldOption> options;
	
	public RequestFormSelect() {
		super();
		setOptions(new ArrayList<RequestFormFieldOption>());
	}
	
	public RequestFormSelect(OptionType optionType, String optionReference, String optionProperty) {
		this();
		setOptionType(optionType);
		setOptionReference(optionReference);
		setOptionProperty(optionProperty);
	}

	public OptionType getOptionType() {
		return optionType;
	}

	public void setOptionType(OptionType optionType) {
		this.optionType = optionType;
	}

	public String getOptionReference() {
		return optionReference;
	}

	public void setOptionReference(String optionReference) {
		this.optionReference = optionReference;
	}

	public String getOptionProperty() {
		return optionProperty;
	}

	public void setOptionProperty(String optionProperty) {
		this.optionProperty = optionProperty;
	}

	public List<RequestFormFieldOption> getOptions() {
		return options;
	}

	public void setOptions(List<RequestFormFieldOption> options) {
		this.options = options;
	}
	
}
