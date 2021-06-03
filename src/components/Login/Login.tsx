import { useState } from "react";
import AuthUI from "./../AuthUI/AuthUI";
import SignUpButton from "./../SignUpButton/SignUpButton";
import CreateUser from "./../CreateUser/CreateUser";
import CreateBusiness from "./../CreateBusiness/CreateBusiness";
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
		<div>
			<AuthUI />
			<header className="login-header">
				<p>Login</p>
				<div id="firebaseui-auth-container"></div>
				<p>Sign Up</p>
				<SignUpButton label="Create User Account" onClick={userForm} />
				<SignUpButton label="Create Business Account" onClick={businessForm} />
			</header>
			{userFormActive && (<CreateUser />)}
			{businessFormActive && (<CreateBusiness />)}
		</div>
	);
}

export default Login;
