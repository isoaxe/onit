import { useState } from "react";
import AuthUI from "./../../components/AuthUI/AuthUI";
import SignUpButton from "./../../components/SignUpButton/SignUpButton";
import CreateUser from "./../../components/CreateUser/CreateUser";
import CreateBusiness from "./../../components/CreateBusiness/CreateBusiness";
import "./Login.css";


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
		<div className="root">
			<AuthUI />
			<header className="login-header">
				<p className="title">Login</p>
				<div id="firebaseui-auth-container"></div>
				<p className="title">Sign Up</p>
				<SignUpButton label="Create User Account" onClick={userForm} />
				<SignUpButton label="Create Business Account" onClick={businessForm} />
			</header>
			{userFormActive && <CreateUser />}
			{businessFormActive && <CreateBusiness />}
		</div>
	);
}

export default Login;
