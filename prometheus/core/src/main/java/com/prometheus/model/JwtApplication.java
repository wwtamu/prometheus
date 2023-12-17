package com.prometheus.model;


public class JwtApplication {

	private Long id;

	private String name;

	private String description;

	public JwtApplication() {

	}

	public JwtApplication(String name) {
		this();
		setName(name);
	}

	public JwtApplication(String name, String description) {
		this(name);
		setDescription(description);
	}

	public JwtApplication(Long id, String name, String description) {
		this(name, description);
		setId(id);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
