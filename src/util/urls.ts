/*
 * Set URLS dynamically based on environment and host.
 */

// Set API_URL based on whether local hosted emulator is running or not.
const localApiUrl = "http://localhost:5001/onit-aaa6e/us-central1/api";
const remoteApiUrl = "https://us-central1-onit-aaa6e.cloudfunctions.net/api";

export const API_URL = ((window.location.hostname === "localhost") ? localApiUrl : remoteApiUrl);


// Set BASE_URL based on whether local hosted emulator is running or not.
// If running locally, also detect whether in development or production environment.
let localBaseUrl;
if (process.env.NODE_ENV === "development") {
	localBaseUrl = "http://localhost:3000/";
} else if (process.env.NODE_ENV === "production") {
	localBaseUrl = "http://localhost:5000/";
}

const remoteBaseUrl = "https://onit-main.web.app";
export const BASE_URL = ((window.location.hostname === "localhost") ? localBaseUrl : remoteBaseUrl);
