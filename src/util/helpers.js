/*
 * Various helper functions used throughout the project.
 */
import validator from "validator";


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
export function validateSharedSignup (phone, email, password, element) {
	// Check field for valid input.
	if (!validator.isMobilePhone(`${phone}`)) {
		element.style.outline = "medium solid red";
		element.value = "";
		element.placeholder = "Enter a valid mobile number";
	} else { // Remove red box around fields when valid input.
		element.style.outline = 0;
	}

	if (!validator.isEmail(email)) {
		element.style.outline = "medium solid red";
		element.value = "";
		element.placeholder = "Please enter a valid email";
	} else {
		element.style.outline = 0;
	}

	if (password.length < 8) {
		element.style.outline = "medium solid red";
		element.value = "";
		element.placeholder = "Needs to be > 8 chars";
	} else {
		element.style.outline = 0;
	}

	// If all fields pass, then return true so message can be sent.
	return (validator.isMobilePhone(phone) && validator.isEmail(email) && password.length > 7);
}
