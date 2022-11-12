import { useState, ChangeEvent, SyntheticEvent } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import validator from "validator";
import TextField from "@mui/material/TextField";
import { useAuth } from "./../util/useAuth";
import { StyleSheet } from "./../util/types";
import {
  secondaryMain,
  secondaryLight,
  textMain,
  buttonShadow,
} from "./../util/colours";

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
    if (!validator.isEmail(email)) {
      setEmailError(true);
      setEmailHelperText("Please enter a valid email");
    } else {
      setEmailError(false);
      setEmailHelperText("");
    }
  }

  function handlePassword(event: ChangeEvent<HTMLInputElement>): void {
    setPassword(event.currentTarget.value);
    if (password.length < 8) {
      setPasswordError(true);
      setPasswordHelperText("Needs to be > 7 characters");
    } else {
      setPasswordError(false);
      setPasswordHelperText("");
    }
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
        <Button type="submit">Login</Button>
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

const Button = styled.button`
  background-color: ${secondaryMain};
  box-shadow: ${buttonShadow};
  border: 0px;
  border-radius: 4px;
  color: ${textMain};
  font-size: 14px;
  padding: 10px 20px;
  margin: 20px 90px;
  &:hover {
    background-color: ${secondaryLight};
    cursor: pointer;
  }
`;

export default Login;
