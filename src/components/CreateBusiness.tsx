import { useState, useEffect, ChangeEvent, SyntheticEvent } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import validator from "validator";
import { TextField } from "@mui/material";
import PhoneNumber from "./PhoneNumber";
import { postFormDataAsJson } from "./../util/helpers";
import { useAuth } from "./../util/useAuth";
import { StyleSheet } from "./../util/types";
import { API_URL } from "./../util/urls";
import {
  primaryLight,
  secondaryMain,
  secondaryLight,
  textMain,
  buttonShadow,
} from "./../util/colours";
import {
  validateSharedSignup,
  validateBusinessSignup,
  phoneTaken,
  emailTaken,
} from "./../util/validation";

function CreateBusiness(): JSX.Element {
  const [businessName, setBusinessName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [postcodeHelperText, setPostcodeHelperText] = useState("");
  const [phoneHelperText, setPhoneHelperText] = useState("");
  const [emailHelperText, setEmailHelperText] = useState("");
  const [passwordHelperText, setPasswordHelperText] = useState("");
  const auth = useAuth();
  const user = auth.user;

  function handleBusiness(event: ChangeEvent<HTMLInputElement>): void {
    setBusinessName(event.currentTarget.value);
  }

  function handleAddress1(event: ChangeEvent<HTMLInputElement>): void {
    setAddress1(event.currentTarget.value);
  }

  function handleAddress2(event: ChangeEvent<HTMLInputElement>): void {
    setAddress2(event.currentTarget.value);
  }

  function handleCity(event: ChangeEvent<HTMLInputElement>): void {
    setCity(event.currentTarget.value);
  }

  function handlePostcode(event: ChangeEvent<HTMLInputElement>): void {
    setPostcode(event.currentTarget.value);
  }

  function handleEmail(event: ChangeEvent<HTMLInputElement>): void {
    setEmail(event.currentTarget.value);
  }

  function handlePassword(event: ChangeEvent<HTMLInputElement>): void {
    setPassword(event.currentTarget.value);
  }

  async function createBusiness(
    event: SyntheticEvent<HTMLFormElement>
  ): Promise<void | boolean> {
    event.preventDefault();
    const url = `${API_URL}/business`;
    const form = event.currentTarget;

    const sharedSignupValidated = validateSharedSignup(
      phone,
      email,
      password,
      form
    );
    const businessSignupValidated = validateBusinessSignup(
      businessName,
      address1,
      address2,
      city,
      postcode,
      form
    );
    if (!sharedSignupValidated || !businessSignupValidated) {
      return false;
    }

    try {
      const formData = new FormData(form);
      await postFormDataAsJson({ url, formData });
      auth.signIn(email, password);
    } catch (err: any) {
      console.error(err);
      if (err.message.indexOf("phone number already exists") !== -1) {
        phoneTaken(form, 3);
      }
      if (err.message.indexOf("email address is already in use") !== -1) {
        emailTaken(form, 3);
      }
    }
  }

  // Display postcode validation in DOM as user types.
  useEffect(() => {
    const locale: any = "TH";
    const postcodeValid = validator.isPostalCode(postcode, locale);
    if (postcode && !postcodeValid) {
      setPostcodeHelperText("Please enter a valid postcode");
    } else {
      setPostcodeHelperText("");
    }
  }, [postcode]);

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

  return (
    <div>
      <form onSubmit={createBusiness} style={styles.form}>
        <header style={styles.header}>Create Account</header>
        <TextField
          label="Business Name"
          value={businessName}
          onChange={handleBusiness}
          sx={combinedSelectors}
        />
        <TextField
          label="Address Line 1"
          value={address1}
          onChange={handleAddress1}
          sx={styles.inputField}
        />
        <TextField
          label="Address Line 2"
          value={address2}
          onChange={handleAddress2}
          sx={styles.inputField}
        />
        <TextField
          label="City"
          value={city}
          onChange={handleCity}
          sx={styles.inputField}
        />
        <TextField
          label="Postcode"
          value={postcode}
          onChange={handlePostcode}
          error={!!postcodeHelperText}
          helperText={postcodeHelperText}
          sx={combinedSelectors}
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
        <Button type="submit">Submit</Button>
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
    margin: "3px",
    padding: "3px",
    width: "80%",
    border: "0px",
    borderRadius: "3px",
  },
  space: {
    marginBottom: "10px",
  },
};

const deepCopy = JSON.parse(JSON.stringify(styles.inputField));
const combinedSelectors = Object.assign(deepCopy, styles.space);

const Button = styled.button`
  background-color: ${secondaryMain};
  box-shadow: ${buttonShadow};
  border: 0px;
  border-radius: 3px;
  color: ${textMain};
  font-size: 14px;
  padding: 4px 13px 4px;
  margin-top: 10px;
  &:hover {
    background-color: ${secondaryLight};
    cursor: pointer;
  }
`;

export default CreateBusiness;
