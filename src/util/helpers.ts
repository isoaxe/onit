/*
 * Various helper functions used throughout the project.
 */
import firebase from "firebase/app";
import generator from "generate-password";
import { API_URL } from "./../util/urls";


// POST form data. Used for account and task creation.
export async function postFormDataAsJson ({ url, formData }) {
	const plainFormData = Object.fromEntries(formData.entries());
	const formDataJsonString = JSON.stringify(plainFormData);
	let token: string;
	try {
		token = await firebase.auth().currentUser.getIdToken(true);
	} catch {
		token = "no_token_found";
	}
	const fetchConfig = {
		method: "POST",
		headers: {
			authorization: `Bearer ${token}`,
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


// GET custom claims for the user.
export async function getClaims (user: firebase.User) {
	try {
		const token = await user.getIdToken(true);
		const requestOptions = {
			method: "GET",
			headers: { authorization: `Bearer ${token}` }
		};
		const response = await fetch(`${API_URL}/claims/${user.uid}`, requestOptions);
		const jsonResponse = await response.json();
		return jsonResponse;
	} catch (error) {
		console.error(`An error occured whilst fetching claims: ${error}`);
	}
}


// Get business data from the Firestore.
export async function getBusinessData (user: firebase.User, businessId: string) {
	try {
		const token = await user.getIdToken(true);
		const requestOptions = {
			method: "GET",
			headers: { authorization: `Bearer ${token}` }
		};
		const response = await fetch(`${API_URL}/business/${businessId}`, requestOptions);
		const jsonResponse = await response.json();
		return jsonResponse;
	} catch (error) {
		console.error(`An error occured whilst fetching business data: ${error}`);
	}
}

export async function getTasks (role, businessId, userId) {
	try {
		const token = await firebase.auth().currentUser.getIdToken(true);
		const requestOptions = {
			method: "GET",
			headers: { authorization: `Bearer ${token}` }
		};
		let res;
		if (role === "staff") {
			res = await fetch(`${API_URL}/tasks/${userId}/${businessId}`, requestOptions);
		} else {
			res = await fetch(`${API_URL}/tasks/${businessId}`, requestOptions);
		}
		const taskArray = await res.json();
		return taskArray;
	} catch (error) {
		console.error(`GET request to /tasks failed: ${error}`);
	}
}


// Add correct suffix to supplied date.
export function ordinal (number) {
	const ordinalRules = new Intl.PluralRules("en", {
		type: "ordinal"
	});
	const suffixes = {
		one: "st",
		two: "nd",
		few: "rd",
		other: "th"
	};
	const suffix = suffixes[ordinalRules.select(number)];
	return (number + suffix);
}


// Generate an id for tasks.
export function getId () {
	return generator.generate({
		length: 28,
		numbers: true
	});
}


// Get the supplied date as a ISO string with local time.
export function isoLocalDate (date) {
	const epochLocalTime = date.getTime() - date.getTimezoneOffset()*60*1000;
	return new Date(epochLocalTime).toISOString().substring(0, 19);
}
