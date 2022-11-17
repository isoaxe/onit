import { useState, ChangeEvent, SyntheticEvent, useEffect } from "react";
import { Redirect } from "react-router-dom";
import validator from "validator";
import TextField from "@mui/material/TextField";
import PrimaryButton from "./PrimaryButton";
import { useAuth } from "./../util/useAuth";
import { StyleSheet } from "./../util/types";
import { secondaryMain } from "./../util/colours";

function Login(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailHelperText, setEmailHelperText] = useState("");
  const [passwordHelperText, setPasswordHelperText] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const auth = useAuth();
  const user = auth.user;

  function handleEmail(event: ChangeEvent<HTMLInputElement>): void {
    setEmail(event.currentTarget.value);
  }

  function handlePassword(event: ChangeEvent<HTMLInputElement>): void {
    setPassword(event.currentTarget.value);
  }

  async function login(
    event: SyntheticEvent<HTMLFormElement>
  ): Promise<void | boolean> {
    event.preventDefault();
    setEmailError(false);
    setPasswordError(false);
    setEmailHelperText("");
    setPasswordHelperText("");

    try {
      await auth.signIn(email, password);
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/user-not-found") {
        setEmailError(true);
        setEmailHelperText("Email not found");
      }
      if (err.code === "auth/wrong-password") {
        setPasswordError(true);
        setPasswordHelperText("Password not correct");
      }
    }
  }

  // Display email validation in DOM as user types.
  useEffect(() => {
    if (email.length && !validator.isEmail(email)) {
      setEmailError(true);
      setEmailHelperText("Please enter a valid email");
    } else {
      setEmailError(false);
      setEmailHelperText("");
    }
  }, [email]);

  // Display password validation in DOM as user types.
  useEffect(() => {
    if (password.length && password.length < 8) {
      setPasswordError(true);
      setPasswordHelperText("Needs to be > 7 characters");
    } else {
      setPasswordError(false);
      setPasswordHelperText("");
    }
  }, [password]);

  return (
    <div>
      <form onSubmit={login} style={styles.login}>
        <TextField
          label="Email"
          value={email}
          onChange={handleEmail}
          error={emailError}
          helperText={emailHelperText}
          sx={styles.inputField}
        />
        <TextField
          label="Password"
          value={password}
          onChange={handlePassword}
          error={passwordError}
          helperText={passwordHelperText}
          sx={styles.inputField}
        />
        <PrimaryButton label="login" type="submit" />
      </form>
      {user && <Redirect to="home" />}
    </div>
  );
}

const styles: StyleSheet = {
  login: {
    borderBottom: `3px solid ${secondaryMain}`,
  },
  inputField: {
    margin: "5px 10%",
    width: "80%",
  },
};

export default Login;
