import AuthUI from "./../AuthUI/AuthUI";
import SignUpButton from "./../SignUpButton/SignUpButton";
import "./Login.css";


function Login (): JSX.Element {
	return (
		<div>
			<AuthUI />
			<header className="Login-header">
				<p>Login</p>
				<div id="firebaseui-auth-container"></div>
				<p>Sign Up</p>
				<SignUpButton />
			</header>
		</div>
	);
}

export default Login;
