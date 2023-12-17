package com.prometheus.request;

import static com.prometheus.request.type.FormType.CHECKBOX;
import static com.prometheus.request.type.FormType.HIDDEN;
import static com.prometheus.request.type.FormType.SELECT;
import static com.prometheus.request.type.OptionType.CLIENT;
import static com.prometheus.request.type.OptionType.JSON;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.prometheus.annotation.RequestPropertyInfo;
import com.prometheus.annotation.RequestPropertyInfo.ConditionalFormType;
import com.prometheus.annotation.RequestPropertyInfo.Options;

public class SidecardLinkRequest implements Request {

	private static final long serialVersionUID = 5616046207229303379L;

	@RequestPropertyInfo(label = "Id", type = HIDDEN)
	private Long id;

	@NotNull
	@RequestPropertyInfo(label = "External", type = CHECKBOX)
	private Boolean external;

	@NotNull
	@Size(min = 2, max = 50)
	@RequestPropertyInfo(label = "Label")
	private String label;
	
	// TODO: conditional validator, if external then validate URL
	@NotNull
	@Size(min = 4, max = 200)
	@RequestPropertyInfo(label = "Destination", conditionalFormTypes = { @ConditionalFormType(property = "external", value = "false", type = SELECT, options = @Options(property = "path", reference = "routes", type = CLIENT)) })
	private String destination;

	@NotNull
	@Size(min = 2, max = 100)
	@RequestPropertyInfo(label = "Icon", type = SELECT, options = @Options(reference = "icons.json", type = JSON))
	private String icon;

	public SidecardLinkRequest() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Boolean getExternal() {
		return external;
	}

	public void setExternal(Boolean external) {
		this.external = external;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public String getDestination() {
		return destination;
	}

	public void setDestination(String destination) {
		this.destination = destination;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

}
