// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import "firebase/auth";
import * as firebaseui from 'firebaseui';

function Auth() {
  const firebaseConfig = {
    apiKey: 'AIzaSyD7OtnYqeu-9sEiEJKl1bkGpaRBEzTFfy0',
    authDomain: 'onit-aaa6e.firebaseapp.com',
    projectId: 'onit-aaa6e',
    storageBucket: 'onit-aaa6e.appspot.com',
    messagingSenderId: '451988465101',
    appId: '1:451988465101:web:335beb05b535b1257d9084',
    measurementId: 'G-CB3S63219R'
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Initialize the FirebaseUI Widget using Firebase.
  const ui = new firebaseui.auth.AuthUI(firebase.auth());

  ui.start('#firebaseui-auth-container', {
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    signInSuccessUrl: 'https://onit-main.web.app/',
    // Future config options...
  });

  console.log('auth script executed...');
}

export default Auth;
