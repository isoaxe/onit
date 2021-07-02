import { useState } from "react";
import AuthUI from "./../components/AuthUI";
import SignUpButton from "./../components/SignUpButton";
import CreateUser from "./../components/CreateUser";
import CreateBusiness from "./../components/CreateBusiness";
import { primaryMain, primaryLight, secondaryMain, textMain } from "./../util/colours";
import { StyleSheet } from "./../util/types";


function LoginSignup (): JSX.Element {
	const [userFormActive, setUserFormActive] = useState(false);
	const [businessFormActive, setBusinessFormActive] = useState(false);

	function userForm () {
		setUserFormActive(true);
		setBusinessFormActive(false);
	}

	function businessForm () {
		setBusinessFormActive(true);
		setUserFormActive(false);
	}

	return (
		<div style={styles.root}>
			<AuthUI />
			<header style={styles.loginHeader}>
				<p style={styles.title}>Login</p>
				<div id="firebaseui-auth-container" style={styles.auth}></div>
				<p style={styles.title}>Sign Up</p>
				<SignUpButton label="Create User Account" onClick={userForm} />
				<SignUpButton label="Create Business Account" onClick={businessForm} />
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
		borderRadius: "10px",
		paddingBottom: "25px",
		marginBottom: "30px",
		marginTop: "10px",
		fontSize: "20px",
		color: textMain
	},
	title: {
		fontFamily: "Lato-Black"
	},
	auth: {
		marginTop: "-15px",
		paddingBottom: "10px",
		borderBottom: `3px solid ${secondaryMain}`
	}
};


export default LoginSignup;
