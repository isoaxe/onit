// Set apiUrl to be the local address is isLocal = true, otherwise set to remote address.
const localApiUrl = "http://localhost:5001/onit-aaa6e/us-central1/api";
const remoteApiUrl = "https://us-central1-onit-aaa6e.cloudfunctions.net/api";
const isLocal = true;

export const API_URL = (isLocal ? localApiUrl : remoteApiUrl);
