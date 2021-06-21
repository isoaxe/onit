/*
 * Various helper functions used throughout the project.
 */
import validator from "validator";
import { inputError } from "./../util/colours";


// Used to POST account creation data without using form attributes.
export async function postFormDataAsJson ({ url, formData }) {
	const plainFormData = Object.fromEntries(formData.entries());
	const formDataJsonString = JSON.stringify(plainFormData);
	const fetchConfig = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: formDataJsonString
	};

	const response = await fetch(url, fetchConfig);
	if (!response.ok) {
		const errorMessage = await response.text();
		throw new Error(errorMessage);
	}

	return response.json();
}


// Validate the input that is common to both User and Business account creation.
export function validateSharedSignup (phone, email, password, form) {
	// Check field for valid input.
	if (!validator.isMobilePhone(`${phone}`)) {
		form[6].style.outline = inputError;
		form[6].value = "";
		form[6].placeholder = "Enter a valid number";
	} else { // Remove red box around fields when valid input.
		form[6].style.outline = 0;
	}

	if (!validator.isEmail(email)) {
		form[7].style.outline = inputError;
		form[7].value = "";
		form[7].placeholder = "Please enter a valid email";
	} else {
		form[7].style.outline = 0;
	}

	if (password.length < 8) {
		form[8].style.outline = inputError;
		form[8].value = "";
		form[8].placeholder = "Needs to be > 8 chars";
	} else {
		form[8].style.outline = 0;
	}

	// If all fields pass, then return true so message can be sent.
	return (validator.isMobilePhone(phone) && validator.isEmail(email) && password.length > 7);
}

export function phoneTaken (form) {
	form[6].style.outline = inputError;
	form[6].value = "";
	form[6].placeholder = "Number already in use";
}

export function emailTaken (form) {
	form[7].style.outline = inputError;
	form[7].value = "";
	form[7].placeholder = "Email already in use";
}
