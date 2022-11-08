import { useState, ChangeEvent, SyntheticEvent } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import {
  primaryLight,
  secondaryMain,
  secondaryLight,
  textMain,
  buttonShadow,
} from "./../util/colours";
import { postFormDataAsJson } from "./../util/helpers";
import {
  validateSharedSignup,
  validateBusinessSignup,
  phoneTaken,
  emailTaken,
} from "./../util/validation";
import PhoneNumber from "./PhoneNumber";
import { useAuth } from "./../util/useAuth";
import { StyleSheet } from "./../util/types";
import { API_URL } from "./../util/urls";

function CreateBusiness(): JSX.Element {
  const [businessName, setBusinessName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    } catch (err) {
      console.error(err);
      if (err.message.indexOf("phone number already exists") !== -1) {
        phoneTaken(form, 3);
      }
      if (err.message.indexOf("email address is already in use") !== -1) {
        emailTaken(form, 3);
      }
    }
  }

  return (
    <div>
      <form onSubmit={createBusiness} style={styles.form}>
        <header style={styles.header}>Create Account</header>
        <input
          value={businessName}
          onChange={handleBusiness}
          style={combinedSelectors}
          type="text"
          placeholder="Business name"
          name="displayName"
        />
        <input
          value={address1}
          onChange={handleAddress1}
          style={styles.inputField}
          type="text"
          placeholder="Address line 1"
          name="address1"
        />
        <input
          value={address2}
          onChange={handleAddress2}
          style={styles.inputField}
          type="text"
          placeholder="Address line 2"
          name="address2"
        />
        <input
          value={city}
          onChange={handleCity}
          style={styles.inputField}
          type="text"
          placeholder="City"
          name="city"
        />
        <input
          value={postcode}
          onChange={handlePostcode}
          style={combinedSelectors}
          type="text"
          placeholder="Postcode"
          name="postcode"
        />
        <PhoneNumber value={phone} onChange={setPhone} name="phoneNumber" />
        <input
          value={email}
          onChange={handleEmail}
          style={styles.inputField}
          type="text"
          placeholder="Email address"
          name="email"
        />
        <input
          value={password}
          onChange={handlePassword}
          style={styles.inputField}
          type="text"
          placeholder="Password"
          name="password"
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
    width: "250px",
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
