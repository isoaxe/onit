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
	// Add 3 to index if the user is a business.
	let n = 0;
	if (form.length > 9) {
		n = 3;
	}

	// Check field for valid input.
	if (!validator.isMobilePhone(`${phone}`)) {
		form[3+n].style.outline = inputError;
		form[3+n].value = "";
		form[3+n].placeholder = "Enter a valid number";
	} else { // Remove red box around fields when valid input.
		form[3+n].style.outline = 0;
	}

	if (!validator.isEmail(email)) {
		form[4+n].style.outline = inputError;
		form[4+n].value = "";
		form[4+n].placeholder = "Please enter a valid email";
	} else {
		form[4+n].style.outline = 0;
	}

	if (password.length < 8) {
		form[5+n].style.outline = inputError;
		form[5+n].value = "";
		form[5+n].placeholder = "Needs to be > 8 chars";
	} else {
		form[5+n].style.outline = 0;
	}

	// If all fields pass, then return true so message can be sent.
	return (validator.isMobilePhone(phone) && validator.isEmail(email) && password.length > 7);
}

export function validateBusinessSignup (businessName, address1, address2, city, postcode, form) {
	if (businessName === "") {
		form[0].style.outline = inputError;
		form[0].placeholder = "Enter a business name";
	} else {
		form[0].style.outline = 0;
	}

	if (address1 === "") {
		form[1].style.outline = inputError;
		form[1].placeholder = "Enter an address";
	} else {
		form[1].style.outline = 0;
	}

	if (address2 === "") {
		form[2].style.outline = inputError;
		form[2].placeholder = "Enter an address";
	} else {
		form[2].style.outline = 0;
	}

	if (city === "") {
		form[3].style.outline = inputError;
		form[3].placeholder = "Enter a city";
	} else {
		form[3].style.outline = 0;
	}

	// Pass locale from phone dropdown menu as second param. Resolves to true if valid.
	const postcodeValid = validator.isPostalCode(postcode, form[5].value);
	if (!postcodeValid) {
		form[4].style.outline = inputError;
		form[4].value = "";
		form[4].placeholder = "Invalid postcode";
	} else {
		form[4].style.outline = 0;
	}

	// If all fields pass, then return true.
	return (!!businessName && address1 && address2 && city && postcodeValid);
}

export function validateUserSignup (firstName, lastName, businessId, form) {
	if (firstName === "") {
		form[0].style.outline = inputError;
		form[0].placeholder = "Enter your first name";
	} else {
		form[0].style.outline = 0;
	}

	if (lastName === "") {
		form[1].style.outline = inputError;
		form[1].placeholder = "Enter your surname";
	} else {
		form[1].style.outline = 0;
	}

	if (businessId.length !== 6) {
		form[6].style.outline = inputError;
		form[6].value = "";
		form[6].placeholder = "Must be 6 digit number";
	} else {
		form[6].style.outline = 0;
	}

	// If all fields pass, then return true.
	return (firstName && lastName && businessId.length === 6);
}

export function phoneTaken (form, n=0) {
	form[3+n].style.outline = inputError;
	form[3+n].value = "";
	form[3+n].placeholder = "Number already in use";
}

export function emailTaken (form, n=0) {
	form[4+n].style.outline = inputError;
	form[4+n].value = "";
	form[4+n].placeholder = "Email already in use";
}

export function idNotFound (form) {
	form[6].style.outline = inputError;
	form[6].value = "";
	form[6].placeholder = "Id not found";
}
