import { useState, useEffect, useContext, createContext } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../util/firebase";

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
  const [user, setUser] = useState(null);

  // Wrap any Firebase methods we want to use making sure to save the user to state.
  async function login(email: string, password: string) {
    const response = await signInWithEmailAndPassword(auth, email, password);
    setUser(response.user);
    return response.user;
  }

  async function logout() {
    await signOut(auth);
    setUser(null);
  }

  // Subscribe to user on mount.
  // Because this sets state in the callback it will cause any component that
  // utilizes this hook to re-render with the latest auth object.
  useEffect(() => {
    function unsubscribe() {
      onAuthStateChanged(auth, (user) => {
        if (user) setUser(user);
        else setUser(null);
      });
    }

    // Cleanup subscription on unmount.
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods.
  return { user, login, logout };
}
