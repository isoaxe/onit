import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7OtnYqeu-9sEiEJKl1bkGpaRBEzTFfy0",
  authDomain: "onit-aaa6e.firebaseapp.com",
  projectId: "onit-aaa6e",
  storageBucket: "onit-aaa6e.appspot.com",
  messagingSenderId: "451988465101",
  appId: "1:451988465101:web:335beb05b535b1257d9084",
  measurementId: "G-CB3S63219R",
};

// Initialise Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
