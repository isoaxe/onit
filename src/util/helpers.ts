/*
 * Various helper functions used throughout the project.
 */
import firebase from "firebase/app";
import { API_URL } from "./../util/urls";


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


// GET assigned role for user.
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
		console.log(`An error occured whilst fetching claims: ${error}`);
	}
}


// Get business name associated with user.
export async function getBusinessName (user: firebase.User) {
	try {
		const token = await user.getIdToken(true);
		const requestOptions = {
			method: "GET",
			headers: { authorization: `Bearer ${token}` }
		};
		const response = await fetch(`${API_URL}/businessname/${user.uid}`, requestOptions);
		const jsonResponse = await response.json();
		return jsonResponse;
	} catch (error) {
		console.log(`An error occured whilst fetching business name: ${error}`);
	}
}
