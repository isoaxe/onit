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
import { validateLogin } from "./../util/validation";

function Login(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailHelperText, setEmailHelperText] = useState("");
  const [passwordHelperText, setPasswordHelperText] = useState("");
  const [emailNotFoundError, setEmailNotFoundError] = useState(false);
  const [passwordIncorrectError, setPasswordIncorrectError] = useState(false);
  const auth = useAuth();
  const user = auth.user;

  function handleEmail(event: ChangeEvent<HTMLInputElement>): void {
    setEmail(event.currentTarget.value);
    if (!validator.isEmail(email)) {
      setEmailNotFoundError(true);
      setEmailHelperText("Please enter a valid email");
    } else {
      setEmailNotFoundError(false);
      setEmailHelperText("");
    }
  }

  function handlePassword(event: ChangeEvent<HTMLInputElement>): void {
    setPassword(event.currentTarget.value);
  }

  async function login(
    event: SyntheticEvent<HTMLFormElement>
  ): Promise<void | boolean> {
    event.preventDefault();
    setEmailNotFoundError(false);
    setPasswordIncorrectError(false);
    setEmailHelperText("");
    setPasswordHelperText("");
    const form = event.currentTarget;
    const loginValidated = validateLogin(email, password, form);
    if (!loginValidated) {
      return false;
    }

    try {
      await auth.signIn(email, password);
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/user-not-found") {
        setEmailNotFoundError(true);
        setEmailHelperText("Email not found");
      }
      if (err.code === "auth/wrong-password") {
        setPasswordIncorrectError(true);
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
          error={emailNotFoundError}
          helperText={emailHelperText}
          sx={styles.inputField}
        />
        <TextField
          label="Password"
          value={password}
          onChange={handlePassword}
          error={passwordIncorrectError}
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
