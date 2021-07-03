import { useState, ChangeEvent, SyntheticEvent } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { secondaryMain, secondaryLight, textMain, buttonShadow } from "./../util/colours";
import { useAuth } from "./../util/useAuth";
import { validateLogin } from "./../util/validation";
import { StyleSheet } from "./../util/types";


function Login (): JSX.Element {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const auth = useAuth();
	const user = auth.user;

	function handleEmail (event: ChangeEvent<HTMLInputElement>): void {
		setEmail(event.currentTarget.value);
	}

	function handlePassword (event: ChangeEvent<HTMLInputElement>): void {
		setPassword(event.currentTarget.value);
	}

	function login (event: SyntheticEvent<HTMLFormElement>): void | boolean {
		event.preventDefault();
		const form = event.currentTarget;
		const loginValidated = validateLogin(email, password, form);
		if (!loginValidated) { return false; }
		auth.signin(email, password);
	}

	return (
		<div>
			<form onSubmit={login} style={styles.login}>
				<input value={email} onChange={handleEmail} style={styles.inputField} type="text" placeholder="Email" name="email"/>
				<input value={password} onChange={handlePassword} style={styles.inputField} type="text" placeholder="Password" name="password"/>
				<Button type="submit">Login</Button>
			</form>
			{user && <Redirect to="loginsuccess" />}
		</div>
	);
}

const styles: StyleSheet = {
	login: {
		borderBottom: `3px solid ${secondaryMain}`
	},
	inputField: {
		margin: "5px 10%",
		padding: "3px",
		height: "25px",
		width: "80%",
		fontSize: "14px",
		border: "0px",
		borderRadius: "3px"
	}
};

const Button = styled.button`
	background-color: ${secondaryMain};
	box-shadow: ${buttonShadow};
	border: 0px;
	border-radius: 4px;
	color: ${textMain};
	font-size: 14px;
	padding: 10px 20px;
	margin: 20px 90px;
	&:hover {
		background-color: ${secondaryLight};
		cursor: pointer;
	}
`;


export default Login;
