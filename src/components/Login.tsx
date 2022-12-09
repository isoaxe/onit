import { useState, ChangeEvent, SyntheticEvent, useEffect } from "react";
import { Redirect } from "react-router-dom";
import validator from "validator";
import TextField from "@mui/material/TextField";
import PrimaryButton from "./PrimaryButton";
import PasswordField from "./PasswordField";
import { useAuth } from "../util/useAuth";
import { StyleSheet } from "../util/types";
import { secondaryMain } from "../util/colours";

function Login(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailHelperText, setEmailHelperText] = useState("");
  const [passwordHelperText, setPasswordHelperText] = useState("");
  const [loginDisabled, setLoginDisabled] = useState(true);
  const auth = useAuth();
  const user = auth.user;

  function handleEmail(event: ChangeEvent<HTMLInputElement>): void {
    setEmail(event.currentTarget.value);
  }

  async function login(
    event: SyntheticEvent<HTMLFormElement>
  ): Promise<void | boolean> {
    event.preventDefault();
    setEmailHelperText("");
    setPasswordHelperText("");

    try {
      await auth.signIn(email, password);
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/user-not-found") {
        setEmailHelperText("Email not found");
      }
      if (err.code === "auth/wrong-password") {
        setPasswordHelperText("Password not correct");
      }
    }
  }

  // Display email validation in DOM as user types.
  useEffect(() => {
    if (email && !validator.isEmail(email)) {
      setEmailHelperText("Please enter a valid email");
    } else {
      setEmailHelperText("");
    }
  }, [email]);

  // Decide if the Login button should be disabled
  useEffect(() => {
    if (!email || !password || emailHelperText || passwordHelperText) {
      setLoginDisabled(true);
    } else {
      setLoginDisabled(false);
    }
  });

  return (
    <div style={styles.wrapper}>
      <form onSubmit={login} style={styles.login}>
        <TextField
          label="Email"
          value={email}
          onChange={handleEmail}
          error={emailHelperText ? true : false}
          helperText={emailHelperText}
          sx={styles.inputField}
        />
        <PasswordField
          password={password}
          setPassword={setPassword}
          passwordHelperText={passwordHelperText}
          setPasswordHelperText={setPasswordHelperText}
        />
        <PrimaryButton label="Login" type="submit" disabled={loginDisabled} />
      </form>
      {user && <Redirect to="home" />}
    </div>
  );
}

export default Login;

const styles: StyleSheet = {
  wrapper: {
    width: "102%",
  },
  login: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "15px",
    borderBottom: `3px solid ${secondaryMain}`,
  },
  inputField: {
    width: "80%",
    marginBottom: "15px",
  },
};
