import React, { useEffect } from "react";

import GetUsersButton from "./../../components/GetUsersButton/GetUsersButton";
import SetRoleButton from "./../../components/SetRoleButton/SetRoleButton";
import { API_URL } from "./../../util/constants";
import logo from "./../../logo.svg";
import "./LoginSuccess.css";


function LoginSuccess (): JSX.Element {
	useEffect(() => {
		fetch(`${API_URL}/loggedin`)
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
				<GetUsersButton />
				<SetRoleButton />
			</header>
		</div>
	);
}

export default LoginSuccess;
