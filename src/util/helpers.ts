/*
 * Various helper functions used throughout the project.
 */
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
export function getRole (user) {
	user.getIdToken(true).then(function (token) {
		const requestOptions = {
			method: "GET",
			headers: { authorization: `Bearer ${token}` }
		};
		fetch(`${API_URL}/role/${user.uid}`, requestOptions)
			.then(res => res.json())
			.then(userRole => { return userRole.role; });
	}).catch(function (error) {
		console.log(`An error occured whilst fetching user role: ${error}`);
	});
}
