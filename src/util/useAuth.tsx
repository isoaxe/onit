import { useState, useEffect, useContext, createContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7OtnYqeu-9sEiEJKl1bkGpaRBEzTFfy0",
  authDomain: "onit-aaa6e.firebaseapp.com",
  projectId: "onit-aaa6e",
  storageBucket: "onit-aaa6e.appspot.com",
  messagingSenderId: "451988465101",
  appId: "1:451988465101:web:335beb05b535b1257d9084",
  measurementId: "G-CB3S63219R",
};

// Add Firebase credentials.
firebase.initializeApp(firebaseConfig);

const authContext = createContext(undefined); //or null?

// Provider component that wraps your app and makes auth object available to any
// child component that calls useAuth().
export function ProvideAuth({ children }): JSX.Element {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state.
function useProvideAuth() {
  const [user, setUser] = useState<firebase.User | null>(null);

  // Wrap any Firebase methods we want to use making sure to save the user to state.
  async function signIn(email: string, password: string) {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    setUser(response.user);
    return response.user;
  }

  async function signOut() {
    await firebase.auth().signOut();
    setUser(null);
  }

  async function sendPasswordResetEmail(email: string) {
    await firebase.auth().sendPasswordResetEmail(email);
    return true;
  }

  async function confirmPasswordReset(code: string, password: string) {
    await firebase.auth().confirmPasswordReset(code, password);
    return true;
  }

  // Subscribe to user on mount.
  // Because this sets state in the callback it will cause any component that
  // utilizes this hook to re-render with the latest auth object.
  useEffect(() => {
    function unsubscribe() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      });
    }

    // Cleanup subscription on unmount.
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods.
  return {
    user,
    signIn,
    signOut,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}
