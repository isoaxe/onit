import { useEffect } from "react";
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import { auth } from "firebaseui";
import "firebaseui/dist/firebaseui.css";


function Authentication (): null {
  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyD7OtnYqeu-9sEiEJKl1bkGpaRBEzTFfy0",
      authDomain: "onit-aaa6e.firebaseapp.com",
      projectId: "onit-aaa6e",
      storageBucket: "onit-aaa6e.appspot.com",
      messagingSenderId: "451988465101",
      appId: "1:451988465101:web:335beb05b535b1257d9084",
      measurementId: "G-CB3S63219R"
    };

    const uiConfig = {
      signInOptions: [
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          buttonColor: "#4353FF"
        },
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: "https://onit-main.web.app/",
      // Future config options...
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Initialize the FirebaseUI Widget using Firebase.
    const ui = new auth.AuthUI(firebase.auth());

    ui.start("#firebaseui-auth-container", uiConfig);
  }, []);
  return null;
}

export default Authentication;
