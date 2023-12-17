package com.prometheus.request;

import static com.prometheus.request.type.FormType.HIDDEN;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.prometheus.annotation.RequestPropertyInfo;

public class SidecardRequest implements Request {

	private static final long serialVersionUID = -5047226952084544993L;

	@RequestPropertyInfo(label = "Id", type = HIDDEN)
	private Long id;

	@NotNull
	@Size(min = 2, max = 40)
	@RequestPropertyInfo(label = "Title")
	private String title;

	@Size(min = 5, max = 100)
	@RequestPropertyInfo(label = "Info")
	private String info;

	public SidecardRequest() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
