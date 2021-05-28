import { useEffect } from "react";
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import { auth } from "firebaseui";
import "firebaseui/dist/firebaseui.css";


let baseUrl: string;
if (process.env.NODE_ENV === "development") {
	baseUrl = "http://localhost:3000/";
} else if (process.env.NODE_ENV === "production") {
	baseUrl = "http://localhost:5000/";
}

function Authentication (): null {

	useEffect(() => {

		const uiConfig = {
			signInOptions: [
				{
					provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
					buttonColor: "#4353FF"
				},
				firebase.auth.GoogleAuthProvider.PROVIDER_ID
			],
			signInSuccessUrl: baseUrl + "loggedin",
			// Future config options...
		};

		// Initialize the FirebaseUI Widget using Firebase.
		const ui = new auth.AuthUI(firebase.auth());

		ui.start("#firebaseui-auth-container", uiConfig);
	}, []);
	return null;
}

export default Authentication;
