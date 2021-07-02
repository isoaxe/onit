import { useState, ChangeEvent } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { secondaryMain, secondaryLight, buttonShadow } from "./../util/colours";
import { useAuth } from "./../util/useAuth";
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

	function login () {
		console.log(auth);
		auth.signin(email, password);
	}

	return (
		<div style={styles.login}>
			<input value={email} onChange={handleEmail} style={styles.inputField} type="text" placeholder="Email" name="email"/>
			<input value={password} onChange={handlePassword} style={styles.inputField} type="text" placeholder="Password" name="password"/>
			<Button onClick={login}>Login</Button>
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

const Button = styled.div`
	background-color: ${secondaryMain};
	box-shadow: ${buttonShadow};
	border-radius: 4px;
	text-align: center;
	font-size: 14px;
	padding: 10px;
	margin: 20px 80px;
	&:hover {
		background-color: ${secondaryLight};
		cursor: pointer;
	}
`;


export default Login;
