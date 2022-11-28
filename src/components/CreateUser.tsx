import { useState, ChangeEvent, SyntheticEvent, useEffect } from "react";
import { Redirect } from "react-router-dom";
import validator from "validator";
import TextField from "@mui/material/TextField";
import PhoneNumber from "./PhoneNumber";
import PrimaryButton from "./PrimaryButton";
import { postFormDataAsJson } from "./../util/helpers";
import { useAuth } from "./../util/useAuth";
import { StyleSheet } from "./../util/types";
import { API_URL } from "./../util/urls";
import { primaryLight, secondaryMain, textMain } from "./../util/colours";
import {
  validateSharedSignup,
  validateUserSignup,
  phoneTaken,
  emailTaken,
  idNotFound,
} from "./../util/validation";
import "./css/CreateUser.css";

function CreateUser(): JSX.Element {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessId, setBusinessId] = useState("");
  const [emailHelperText, setEmailHelperText] = useState("");
  const [passwordHelperText, setPasswordHelperText] = useState("");
  const [businessIdHelperText, setBusinessIdHelperText] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [businessIdError, setBusinessIdError] = useState(false);
  const auth = useAuth();
  const user = auth.user;

  function handleFirstName(event: ChangeEvent<HTMLInputElement>): void {
    setFirstName(event.currentTarget.value);
  }

  function handleLastName(event: ChangeEvent<HTMLInputElement>): void {
    setLastName(event.currentTarget.value);
  }

  function handleEmail(event: ChangeEvent<HTMLInputElement>): void {
    setEmail(event.currentTarget.value);
  }

  function handlePassword(event: ChangeEvent<HTMLInputElement>): void {
    setPassword(event.currentTarget.value);
  }

  function handleBusinessId(event: ChangeEvent<HTMLInputElement>): void {
    setBusinessId(event.currentTarget.value);
  }

  async function createUser(
    event: SyntheticEvent<HTMLFormElement>
  ): Promise<void | boolean> {
    event.preventDefault();
    const form = event.currentTarget;
    const url = `${API_URL}/user`;

    const sharedSignupValidated = validateSharedSignup(
      phone,
      email,
      password,
      form
    );
    const userSignupValidated = validateUserSignup(
      firstName,
      lastName,
      businessId,
      form
    );
    if (!sharedSignupValidated || !userSignupValidated) {
      return false;
    }

    try {
      const formData = new FormData(form);
      await postFormDataAsJson({ url, formData });
      auth.signIn(email, password);
    } catch (err: any) {
      console.error(err);
      if (err.message.indexOf("phone number already exists") !== -1) {
        phoneTaken(form);
      }
      if (err.message.indexOf("email address is already in use") !== -1) {
        emailTaken(form);
      }
      if (err.message.indexOf("businessId not found") !== -1) {
        idNotFound(form);
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

  // Display business ID validation in DOM as user types.
  useEffect(() => {
    if (businessId.length && businessId.length !== 6) {
      setBusinessIdError(true);
      setBusinessIdHelperText("Must be a six digit number");
    } else {
      setBusinessIdError(false);
      setBusinessIdHelperText("");
    }
  }, [businessId]);

  return (
    <div>
      <form onSubmit={createUser} style={styles.form}>
        <header style={styles.header}>Create Account</header>
        <TextField
          label="First Name"
          value={firstName}
          onChange={handleFirstName}
          sx={styles.inputField}
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={handleLastName}
          sx={styles.inputField}
        />
        <PhoneNumber value={phone} onChange={setPhone} name="phoneNumber" />
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
        <TextField
          label="Business ID"
          type="number"
          value={businessId}
          onChange={handleBusinessId}
          error={businessIdError}
          helperText={businessIdHelperText}
          sx={styles.inputField}
        />
        <PrimaryButton label="submit" type="submit" />
      </form>
      {user && <Redirect to="home" />}
    </div>
  );
}

const styles: StyleSheet = {
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: primaryLight,
    border: `2px solid ${secondaryMain}`,
    borderRadius: "10px",
    width: "270px",
    paddingBottom: "25px",
    marginBottom: "30px",
    fontSize: "20px",
    color: textMain,
  },
  header: {
    fontSize: "15px",
    padding: "8px",
  },
  inputField: {
    width: "80%",
    marginBottom: "15px",
  },
};

export default CreateUser;
