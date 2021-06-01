import AuthUI from "./../AuthUI/AuthUI";
import "./Login.css";


function Login (): JSX.Element {
	return (
		<div>
			<AuthUI />
			<header className="Login-header">
				<p>Login</p>
				<div id="firebaseui-auth-container"></div>
				<p>New user? Signup</p>
			</header>
		</div>
	);
}

export default Login;
