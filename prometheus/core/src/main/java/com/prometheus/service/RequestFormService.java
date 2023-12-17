package com.prometheus.service;

import java.io.IOException;
import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.prometheus.annotation.RequestPropertyInfo;
import com.prometheus.annotation.RequestPropertyInfo.ConditionalFormType;
import com.prometheus.request.Request;
import com.prometheus.request.from.RequestAlternateFormField;
import com.prometheus.request.from.RequestFormField;
import com.prometheus.request.from.RequestFormFieldOption;
import com.prometheus.request.from.RequestFormSelect;
import com.prometheus.request.type.FormType;
import com.prometheus.request.type.OptionType;

@Service
public class RequestFormService {

	@Autowired
	private ResourceLoader resourceLoader;

	@Autowired
	private ObjectMapper objectMapper;

	// TODO: decompose method

	public <R extends Request> List<RequestFormField> craftRequestForm(Class<R> clazz) {

		List<RequestFormField> requestForm = new ArrayList<RequestFormField>();

		for (Field field : clazz.getDeclaredFields()) {

			FormType type = FormType.TEXT;

			String property = field.getName();

			String label = String.join(".", property, "label");

			String language = "en_US";

			Boolean repeatable = Collection.class.isAssignableFrom(field.getType()) ? true : false;

			Map<String, Map<String, Object>> validations = new HashMap<String, Map<String, Object>>();

			Boolean formField = false;

			List<RequestAlternateFormField> alternateFormInputs = new ArrayList<RequestAlternateFormField>();

			Optional<OptionType> optionalOptionType = Optional.empty();

			Optional<String> optionalProperty = Optional.empty();

			Optional<String> optionalReference = Optional.empty();

			Optional<RequestFormFieldOption[]> optionalOptions = Optional.empty();

			for (Annotation annotation : field.getAnnotations()) {

				if (annotation instanceof RequestPropertyInfo) {
					RequestPropertyInfo propertyInfo = (RequestPropertyInfo) annotation;
					label = propertyInfo.label();
					language = propertyInfo.language();
					type = propertyInfo.type();

					for (ConditionalFormType conditionalFormTypeAnnotation : propertyInfo.conditionalFormTypes()) {
						RequestAlternateFormField alternateFormField = new RequestAlternateFormField(conditionalFormTypeAnnotation.type(), conditionalFormTypeAnnotation.property(), conditionalFormTypeAnnotation.value());

						Optional<OptionType> alertnateOptionalOptionType = Optional.empty();

						Optional<String> alternateOptionalProperty = Optional.empty();

						Optional<String> alternateOptionalReference = Optional.empty();

						Optional<RequestFormFieldOption[]> alternateOptionalOptions = Optional.empty();

						if (conditionalFormTypeAnnotation.type() == FormType.SELECT) {

							alertnateOptionalOptionType = Optional.of(conditionalFormTypeAnnotation.options().type());
							alternateOptionalProperty = Optional.of(conditionalFormTypeAnnotation.options().property());
							alternateOptionalReference = Optional.of(conditionalFormTypeAnnotation.options().reference());

							switch (conditionalFormTypeAnnotation.options().type()) {
							case ENTITY:

								break;
							case JSON:

								Resource optionsResource = resourceLoader.getResource("classpath:options/" + conditionalFormTypeAnnotation.options().reference());
								if (optionsResource.exists()) {

									// TODO: handle exception gracefully
									try {
										alternateOptionalOptions = Optional.of(objectMapper.readValue(optionsResource.getFile(), RequestFormFieldOption[].class));
									} catch (JsonParseException e) {
										e.printStackTrace();
									} catch (JsonMappingException e) {
										e.printStackTrace();
									} catch (IOException e) {
										e.printStackTrace();
									}
								}

								break;
							case CLIENT:

								break;
							default:
								break;
							}
						}

						if (alertnateOptionalOptionType.isPresent() && alternateOptionalReference.isPresent() && alternateOptionalProperty.isPresent()) {
							RequestFormSelect requestFormSelect = new RequestFormSelect(alertnateOptionalOptionType.get(), alternateOptionalReference.get(), alternateOptionalProperty.get());
							if (alternateOptionalOptions.isPresent()) {
								requestFormSelect.setOptions(new ArrayList<RequestFormFieldOption>(Arrays.asList(alternateOptionalOptions.get())));
							}
							alternateFormField.setSelect(requestFormSelect);
						}

						alternateFormInputs.add(alternateFormField);
					}

					if (type == FormType.SELECT) {

						optionalOptionType = Optional.of(propertyInfo.options().type());
						optionalProperty = Optional.of(propertyInfo.options().property());
						optionalReference = Optional.of(propertyInfo.options().reference());

						switch (propertyInfo.options().type()) {
						case ENTITY:

							break;
						case JSON:

							Resource optionsResource = resourceLoader.getResource("classpath:options/" + propertyInfo.options().reference());
							if (optionsResource.exists()) {

								// TODO: handle exception gracefully
								try {
									optionalOptions = Optional.of(objectMapper.readValue(optionsResource.getFile(), RequestFormFieldOption[].class));
								} catch (JsonParseException e) {
									e.printStackTrace();
								} catch (JsonMappingException e) {
									e.printStackTrace();
								} catch (IOException e) {
									e.printStackTrace();
								}
							}

							break;
						case CLIENT:

							break;
						default:
							break;
						}
					}

					formField = true;
				}

				else if (annotation instanceof NotNull) {
					Map<String, Object> requiredValidation = new HashMap<String, Object>();
					requiredValidation.put("value", true);
					requiredValidation.put("message", String.join(".", property, "validation", "required"));
					validations.put("required", requiredValidation);

					formField = true;
				}

				else if (annotation instanceof Pattern) {
					Pattern patternAnnotaiton = (Pattern) annotation;
					Map<String, Object> patternValidation = new HashMap<String, Object>();
					patternValidation.put("value", patternAnnotaiton.regexp());
					patternValidation.put("message", String.join(".", property, "validation", "pattern"));
					validations.put("pattern", patternValidation);

					formField = true;
				}

				else if (annotation instanceof Size) {
					Size sizeInfo = (Size) annotation;

					Map<String, Object> minLengthValidation = new HashMap<String, Object>();
					minLengthValidation.put("value", sizeInfo.min());
					minLengthValidation.put("message", String.join(".", property, "validation", "minLength"));
					validations.put("minLength", minLengthValidation);

					Map<String, Object> maxLengthValidation = new HashMap<String, Object>();
					maxLengthValidation.put("value", sizeInfo.max());
					maxLengthValidation.put("message", String.join(".", property, "validation", "maxLength"));
					validations.put("maxLength", maxLengthValidation);

					formField = true;
				}

			}

			if (formField) {
				RequestFormField requestFormField = new RequestFormField(type, property, label, language, repeatable, validations);

				requestFormField.setAlternateFormInputs(alternateFormInputs);

				if (optionalOptionType.isPresent() && optionalReference.isPresent() && optionalProperty.isPresent()) {
					RequestFormSelect requestFormSelect = new RequestFormSelect(optionalOptionType.get(), optionalReference.get(), optionalProperty.get());
					if (optionalOptions.isPresent()) {
						requestFormSelect.setOptions(new ArrayList<RequestFormFieldOption>(Arrays.asList(optionalOptions.get())));
					}
					requestFormField.setSelect(requestFormSelect);
				}

				requestForm.add(requestFormField);
			}

		}

		return requestForm;
	}

}
