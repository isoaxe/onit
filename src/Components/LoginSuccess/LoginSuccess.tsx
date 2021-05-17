import logo from "./../../logo.svg";
import "./LoginSuccess.css";


function LoginSuccess (): JSX.Element {
	return (
		<div className="LoginSuccess">
			<header className="LoginSuccess-header">
				<img src={logo} className="LoginSuccess-logo" alt="logo" />
				<p>
          Edit <code>src/LoginSuccess.tsx</code> and save to reload.
				</p>
				<a
					className="LoginSuccess-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
          Learn React
				</a>
			</header>
		</div>
	);
}

export default LoginSuccess;
