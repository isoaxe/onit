import { Route } from "react-router-dom";
import Authentication from "./../../util/auth";
import LoginSuccess from "./../LoginSuccess/LoginSuccess";
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
			<div>
				<Route path="/loggedin" component={LoginSuccess} />
			</div>
		</div>
	);
}

export default Login;
