package com.prometheus.request;

import static com.prometheus.request.type.FormType.EMAIL;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import com.prometheus.annotation.RequestPropertyInfo;

public class VerifyRequest implements Request {

	private static final long serialVersionUID = -5801783552665078682L;

	@NotNull
	@Size(min = 5, max = 50)
	@Pattern(regexp = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$")
	@RequestPropertyInfo(label = "Email", type = EMAIL)
	private String email;

	@NotNull
	@Size(min = 2, max = 40)
	@RequestPropertyInfo(label = "First Name")
	private String firstName;

	@NotNull
	@Size(min = 2, max = 40)
	@RequestPropertyInfo(label = "Last Name")
	private String lastName;

	public VerifyRequest() {
		super();
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

}
