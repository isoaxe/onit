// Set API_URL based on whether local hosted emulator is running or not.
const localApiUrl = "http://localhost:5001/onit-aaa6e/us-central1/api";
const remoteApiUrl = "https://us-central1-onit-aaa6e.cloudfunctions.net/api";

export const API_URL = ((window.location.hostname === "localhost") ? localApiUrl : remoteApiUrl);
