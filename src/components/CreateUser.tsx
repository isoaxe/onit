import { useState, ChangeEvent, SyntheticEvent } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { primaryLight, secondaryMain, secondaryLight, textMain, buttonShadow } from "./../util/colours";
import { postFormDataAsJson } from "./../util/helpers";
import { validateSharedSignup, validateUserSignup, phoneTaken, emailTaken, idNotFound } from "./../util/validation";
import PhoneNumber from "./PhoneNumber";
import { useAuth } from "./../util/useAuth";
import { StyleSheet } from "./../util/types";
import { API_URL } from "./../util/urls";


function CreateUser (): JSX.Element {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [businessId, setBusinessId] = useState("");
	const auth = useAuth();
	const user = auth.user;


	function handleFirstName (event: ChangeEvent<HTMLInputElement>): void {
		setFirstName(event.currentTarget.value);
	}

	function handleLastName (event: ChangeEvent<HTMLInputElement>): void {
		setLastName(event.currentTarget.value);
	}

	function handleEmail (event: ChangeEvent<HTMLInputElement>): void {
		setEmail(event.currentTarget.value);
	}

	function handlePassword (event: ChangeEvent<HTMLInputElement>): void {
		setPassword(event.currentTarget.value);
	}

	function handleBusinessId (event: ChangeEvent<HTMLInputElement>): void {
		setBusinessId(event.currentTarget.value);
	}

	async function createUser (event: SyntheticEvent<HTMLFormElement>): Promise<void | boolean> {
		event.preventDefault();
		const form = event.currentTarget;
		const url = `${API_URL}/user`;

		const sharedSignupValidated = validateSharedSignup(phone, email, password, form);
		const userSignupValidated = validateUserSignup(firstName, lastName, businessId, form);
		if (!sharedSignupValidated || !userSignupValidated) {
			return false;
		}

		try {
			const formData = new FormData(form);
			const response = await postFormDataAsJson({ url, formData });
			console.log({ response });
			auth.signin(email, password);
		} catch (err) {
			console.log(err);
			if (err.message.indexOf("phone number already exists") !== -1) {
				phoneTaken(form);
			}
			if (err.message.indexOf("email address is already in use") !== -1) {
				emailTaken(form);
			}
			if (err.message.indexOf("businessId not found") !== -1) {
				idNotFound(form);
			}
		}
	}

	return (
		<div>
			<form onSubmit={createUser} style={styles.form}>
				<header style={styles.header}>Create Account</header>
				<input value={firstName} onChange={handleFirstName} style={styles.inputField} type="text" placeholder="First name" name="displayName"/>
				<input value={lastName} onChange={handleLastName} style={styles.inputField} type="text" placeholder="Last name" name="lastName"/>
				<PhoneNumber value={phone} onChange={setPhone} name="phoneNumber"/>
				<input value={email} onChange={handleEmail} style={styles.inputField} type="text" placeholder="Email address" name="email"/>
				<input value={password} onChange={handlePassword} style={styles.inputField} type="text" placeholder="Password" name="password"/>
				<input value={businessId} onChange={handleBusinessId} style={styles.inputField} type="number" placeholder="Business ID" name="businessId"/>
				<Button type="submit">Submit</Button>
			</form>
			{user && <Redirect to="loginsuccess" />}
		</div>
	);
}

const styles: StyleSheet = {
	form: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: primaryLight,
		border: `2px solid ${secondaryMain}`,
		borderRadius: "10px",
		paddingBottom: "25px",
		marginBottom: "30px",
		fontSize: "20px",
		color: textMain
	},
	header: {
		fontSize: "15px",
		padding: "8px"
	},
	inputField: {
		margin: "3px",
		padding: "3px",
		width: "80%",
		border: "0px",
		borderRadius: "3px"
	}
};

const Button = styled.button`
	background-color: ${secondaryMain};
	box-shadow: ${buttonShadow};
	border: 0px;
	border-radius: 3px;
	color: ${textMain};
	font-size: 14px;
	padding: 4px 13px 4px;
	margin-top: 10px;
	&:hover {
		background-color: ${secondaryLight};
	  cursor: pointer;
	}
`;


export default CreateUser;
