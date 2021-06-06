import { useEffect } from "react";
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import { auth } from "firebaseui";
import "firebaseui/dist/firebaseui.css";

import { BASE_URL } from "./../../util/constants";


function AuthUI (): null {

	useEffect(() => {

		const uiConfig = {
			signInOptions: [
				{
					provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
					buttonColor: "#4353FF"
				},
				firebase.auth.GoogleAuthProvider.PROVIDER_ID
			],
			signInSuccessUrl: BASE_URL + "loginsuccess",
			// Future config options...
		};

		// Initialize the FirebaseUI Widget using Firebase.
		const ui = new auth.AuthUI(firebase.auth());

		ui.start("#firebaseui-auth-container", uiConfig);
	}, []);
	return null;
}

export default AuthUI;
