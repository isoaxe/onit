import { useState, ChangeEvent } from "react";
import styled from "styled-components";
import { secondaryMain, secondaryLight, buttonShadow } from "./../util/colours";
import { StyleSheet } from "./../util/types";


function Login (): JSX.Element {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function handleEmail (event: ChangeEvent<HTMLInputElement>): void {
		setEmail(event.currentTarget.value);
	}

	function handlePassword (event: ChangeEvent<HTMLInputElement>): void {
		setPassword(event.currentTarget.value);
	}

	return (
		<div>
			<input value={email} onChange={handleEmail} style={styles.inputField} type="text" placeholder="Email" name="email"/>
			<input value={password} onChange={handlePassword} style={styles.inputField} type="text" placeholder="Password" name="password"/>
			<Button>Submit</Button>
		</div>
	);
}

const styles: StyleSheet = {
	inputField: {
		margin: "3px",
		padding: "3px",
		width: "80%",
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
	margin-bottom: 12px;
	&:hover {
		background-color: ${secondaryLight};
		cursor: pointer;
	}
`;


export default Login;
