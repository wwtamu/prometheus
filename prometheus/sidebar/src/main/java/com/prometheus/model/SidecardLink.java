package com.prometheus.model;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class SidecardLink {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	private Long id;

	@Column(nullable = false)
	private Boolean external;

	@Column(nullable = false)
	private String label;

	@Column(nullable = false)
	private String destination;

	@Column(nullable = true)
	private String icon;

	public SidecardLink() {

	}

	public SidecardLink(String label, String destination) {
		this();
		setLabel(label);
		setDestination(destination);
	}

	public SidecardLink(String label, String destination, String icon) {
		this(label, destination);
		setIcon(icon);
	}

	public SidecardLink(String label, String destination, String icon, Boolean external) {
		this(label, destination, icon);
		setExternal(external);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLabel() {
		return label;
	}

	public Boolean getExternal() {
		return external;
	}

	public void setExternal(Boolean external) {
		this.external = external;
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
