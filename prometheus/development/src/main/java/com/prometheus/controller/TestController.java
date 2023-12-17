package com.prometheus.controller;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

	private static final List<Test> tests = new ArrayList<Test>(Arrays.asList(new Test[] { new Test("Hello", "World"), new Test("Foo", "Bar") }));

	@RequestMapping(path = "/tests", method = GET)
	public static ResponseEntity<?> getTests() {
		return ResponseEntity.ok(tests);
	}

	@RequestMapping(path = "/test/{name}", method = GET)
	public static ResponseEntity<?> getTest(@PathVariable("name") String name) {
		return ResponseEntity.ok(tests.stream().filter(person -> name.equalsIgnoreCase(person.getName())).findAny().orElse(null));
	}

	static class Test {

		private String name;

		private String value;

		public Test(String name, String value) {
			this.name = name;
			this.value = value;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getValue() {
			return value;
		}

		public void setValue(String value) {
			this.value = value;
		}
	}

}