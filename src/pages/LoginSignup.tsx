import { useState } from "react";
import Login from "../components/Login";
import PrimaryButton from "../components/PrimaryButton";
import CreateUser from "../components/CreateUser";
import CreateBusiness from "../components/CreateBusiness";
import { primaryMain, primaryLight, secondaryMain } from "../util/colours";
import { textMain } from "../util/colours";
import { StyleSheet } from "../util/types";

function LoginSignup(): JSX.Element {
  const [userFormActive, setUserFormActive] = useState(false);
  const [businessFormActive, setBusinessFormActive] = useState(false);

  function userForm() {
    setUserFormActive(true);
    setBusinessFormActive(false);
  }

  function businessForm() {
    setBusinessFormActive(true);
    setUserFormActive(false);
  }

  return (
    <div style={styles.root}>
      <header style={styles.loginHeader}>
        <p style={styles.title}>Login</p>
        <Login />
        <p style={styles.title}>Sign Up</p>
        <PrimaryButton
          label="Create User Account"
          type="button"
          onClick={userForm}
        />
        <PrimaryButton
          label="Create Business Account"
          type="button"
          onClick={businessForm}
        />
      </header>
      {userFormActive && <CreateUser />}
      {businessFormActive && <CreateBusiness />}
    </div>
  );
}

const styles: StyleSheet = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: primaryMain,
  },
  loginHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: primaryLight,
    border: `2px solid ${secondaryMain}`,
    width: "270px",
    borderRadius: "10px",
    paddingBottom: "25px",
    marginBottom: "30px",
    marginTop: "10px",
    fontSize: "20px",
    color: textMain,
  },
  title: {
    fontFamily: "Lato-Black",
  },
};

export default LoginSignup;
