import { useState, ChangeEvent, SyntheticEvent, useEffect } from "react";
import { Redirect } from "react-router-dom";
import validator from "validator";
import { TextField } from "@mui/material";
import PhoneNumber from "./PhoneNumber";
import PrimaryButton from "./PrimaryButton";
import { postFormDataAsJson } from "./../util/helpers";
import { useAuth } from "./../util/useAuth";
import { StyleSheet } from "./../util/types";
import { API_URL } from "./../util/urls";
import { primaryLight, secondaryMain, textMain } from "./../util/colours";
import "./css/CreateUser.css";

function CreateUser(): JSX.Element {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessId, setBusinessId] = useState(null);
  const [loginDisabled, setLoginDisabled] = useState(true);
  const [phoneHelperText, setPhoneHelperText] = useState("");
  const [emailHelperText, setEmailHelperText] = useState("");
  const [passwordHelperText, setPasswordHelperText] = useState("");
  const [businessIdHelperText, setBusinessIdHelperText] = useState("");
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

    try {
      const formData = new FormData(form);
      await postFormDataAsJson({ url, formData });
      auth.signIn(email, password);
    } catch (err: any) {
      console.error(err);
      if (err.message.indexOf("phone number already exists") !== -1) {
        setPhoneHelperText("Number already in use");
      }
      if (err.message.indexOf("email address is already in use") !== -1) {
        setEmailHelperText("Email already in use");
      }
      if (err.message.indexOf("businessId not found") !== -1) {
        setBusinessIdHelperText("Business ID not found");
      }
    }
  }

  // Display phone number validation in DOM as user types.
  useEffect(() => {
    if (phone && !validator.isMobilePhone(phone)) {
      setPhoneHelperText("Please enter a valid phone number");
    } else {
      setPhoneHelperText("");
    }
  }, [phone]);

  // Display email validation in DOM as user types.
  useEffect(() => {
    if (email && !validator.isEmail(email)) {
      setEmailHelperText("Please enter a valid email");
    } else {
      setEmailHelperText("");
    }
  }, [email]);

  // Display password validation in DOM as user types.
  useEffect(() => {
    if (password && password.length < 8) {
      setPasswordHelperText("Needs to be > 7 characters");
    } else {
      setPasswordHelperText("");
    }
  }, [password]);

  // Display business ID validation in DOM as user types.
  useEffect(() => {
    const numCheck = businessId * 1; // Coalesce to number or NaN.
    if (isNaN(numCheck)) {
      setBusinessIdHelperText("Only numbers allowed for ID");
    } else if (businessId && businessId.length !== 6) {
      setBusinessIdHelperText("Must be a six digit number");
    } else {
      setBusinessIdHelperText("");
    }
  }, [businessId]);

  // Decide if the Submit button should be disabled.
  useEffect(() => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !businessId ||
      phoneHelperText ||
      emailHelperText ||
      passwordHelperText ||
      businessIdHelperText
    ) {
      setLoginDisabled(true);
    } else {
      setLoginDisabled(false);
    }
  });

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
        <PhoneNumber
          value={phone}
          onChange={setPhone}
          name="phoneNumber"
          helperText={phoneHelperText}
        />
        <TextField
          label="Email"
          value={email}
          onChange={handleEmail}
          error={!!emailHelperText}
          helperText={emailHelperText}
          sx={styles.inputField}
        />
        <TextField
          label="Password"
          value={password}
          onChange={handlePassword}
          error={!!passwordHelperText}
          helperText={passwordHelperText}
          sx={styles.inputField}
        />
        <TextField
          label="Business ID"
          type="text"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          value={businessId}
          onChange={handleBusinessId}
          error={!!businessIdHelperText}
          helperText={businessIdHelperText}
          sx={styles.inputField}
        />
        <PrimaryButton label="submit" type="submit" disabled={loginDisabled} />
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
    paddingBottom: "15px",
    marginBottom: "30px",
    fontSize: "20px",
    color: textMain,
  },
  header: {
    fontSize: "20px",
    padding: "14px",
  },
  inputField: {
    width: "80%",
    marginBottom: "15px",
  },
};

export default CreateUser;
