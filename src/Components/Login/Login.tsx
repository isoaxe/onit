import Authentication from "./../../util/auth";
import "./Login.css";


function Login (): JSX.Element {
	return (
		<div className="Login">
			<header className="Login-header">
				<p>
          Choose your preferred login method.
				</p>
				<div id="firebaseui-auth-container"></div>
				<Authentication />
			</header>
		</div>
	);
}

export default Login;
