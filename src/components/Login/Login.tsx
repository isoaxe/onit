import { useState } from "react";
import AuthUI from "./../AuthUI/AuthUI";
import SignUpButton from "./../SignUpButton/SignUpButton";
import "./Login.css";


function Login (): JSX.Element {
	const [userFormActive, setUserFormActive] = useState(false);
	const [businessFormActive, setBusinessFormActive] = useState(false);

	return (
		<div>
			<AuthUI />
			<header className="Login-header">
				<p>Login</p>
				<div id="firebaseui-auth-container"></div>
				<p>Sign Up</p>
				<SignUpButton label="Create User Account" onClick={() => setUserFormActive(true)} />
				<SignUpButton label="Create Business Account" onClick={() => setBusinessFormActive(true)} />
			</header>
		</div>
	);
}

export default Login;