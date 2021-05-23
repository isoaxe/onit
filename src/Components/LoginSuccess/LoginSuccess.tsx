import React, { useEffect } from "react";

import logo from "./../../logo.svg";
import "./LoginSuccess.css";


function LoginSuccess (): JSX.Element {
	useEffect(() => {
		// This works in the local environment only.
		// Need to detect if port is currently in use. If it is, fetch remote address:
		// https://us-central1-onit-aaa6e.cloudfunctions.net/api/loggedin
		fetch("http://localhost:5001/onit-aaa6e/us-central1/api/loggedin")
			.then(res => res.json())
			.then(data => console.log(data));
	}, []);

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
