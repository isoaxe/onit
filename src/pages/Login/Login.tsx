import { useState } from "react";
import AuthUI from "./../../components/AuthUI/AuthUI";
import SignUpButton from "./../../components/SignUpButton/SignUpButton";
import CreateUser from "./../../components/CreateUser/CreateUser";
import CreateBusiness from "./../../components/CreateBusiness/CreateBusiness";
import { StyleSheet } from "./../../util/types";


function Login (): JSX.Element {
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
		backgroundColor: "#282C34",
	},
	loginHeader: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#3F4552",
		border: "2px solid #3f524c",
		borderRadius: "10px",
		paddingBottom: "25px",
		marginBottom: "30px",
		marginTop: "10px",
		fontSize: "20px",
		color: "white"
	},
	title: {
		fontFamily: "Lato-Black"
	},
	auth: {
		marginTop: "-15px",
		paddingBottom: "10px",
		borderBottom: "3px solid #3f524c"
	}
};


export default Login;
