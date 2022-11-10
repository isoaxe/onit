import { useState, ChangeEvent, SyntheticEvent } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { useAuth } from "./../util/useAuth";
import { StyleSheet } from "./../util/types";
import {
  secondaryMain,
  secondaryLight,
  textMain,
  buttonShadow,
} from "./../util/colours";
import {
  validateLogin,
  emailNotFound,
  incorrectPassword,
} from "./../util/validation";

function Login(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        emailNotFound(form);
      }
      if (err.code === "auth/wrong-password") {
        incorrectPassword(form);
      }
    }
  }

  return (
    <div>
      <form onSubmit={login} style={styles.login}>
        <input
          value={email}
          onChange={handleEmail}
          style={styles.inputField}
          type="text"
          placeholder="Email"
          name="email"
        />
        <TextField
          label="Email"
          value={email}
          onChange={handleEmail}
          sx={styles.inputField}
        />
        <input
          value={password}
          onChange={handlePassword}
          style={styles.inputField}
          type="text"
          placeholder="Password"
          name="password"
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
