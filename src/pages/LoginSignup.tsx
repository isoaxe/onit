import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import Login from "../components/Login";
import PrimaryButton from "../components/PrimaryButton";
import CreateUser from "../components/CreateUser";
import CreateBusiness from "../components/CreateBusiness";
import { primaryMain, primaryLight, secondaryMain } from "../util/colours";
import { textMain } from "../util/colours";
import { StyleSheet } from "../util/types";

function LoginSignup(props): JSX.Element {
  const [userFormActive, setUserFormActive] = useState(false);
  const [businessFormActive, setBusinessFormActive] = useState(false);

  const { showAlert, setShowAlert } = props;

  const vertical = "top";
  const horizontal = "center";

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
        <Snackbar
          open={showAlert}
          onClose={() => setShowAlert(false)}
          autoHideDuration={3000}
          anchorOrigin={{ vertical, horizontal }}
        >
          <Alert severity="info" variant="outlined">
            You have been logged out
          </Alert>
        </Snackbar>
      </header>
      {userFormActive && <CreateUser />}
      {businessFormActive && <CreateBusiness />}
    </div>
  );
}

export default LoginSignup;

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
