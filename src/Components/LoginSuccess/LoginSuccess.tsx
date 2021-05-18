import logo from "./../../logo.svg";
import "./LoginSuccess.css";


function LoginSuccess (): JSX.Element {
	return (
		<div className="LoginSuccess">
			<header className="LoginSuccess-header">
				<img src={logo} className="LoginSuccess-logo" alt="logo" />
				<p>
          Login successful!
				</p>
			</header>
		</div>
	);
}

export default LoginSuccess;
