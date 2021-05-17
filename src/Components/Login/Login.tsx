import Authentication from "./../../util/auth";
import logo from "./../../logo.svg";
import "./Login.css";


function Login (): JSX.Element {
	return (
		<div className="Login">
			<header className="Login-header">
				<img src={logo} className="Login-logo" alt="logo" />
				<p>
          Edit <code>src/Login.tsx</code> and save to reload.
				</p>
				<a
					className="Login-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
          Learn React
				</a>
				<div id="firebaseui-auth-container"></div>
				<Authentication />
			</header>
		</div>
	);
}

export default Login;
