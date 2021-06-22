import { useState } from "react";
import { Redirect } from "react-router-dom";
import firebase from "firebase/app";
import styled from "styled-components";
import { primaryLight, secondaryMain, secondaryLight, textMain, buttonShadow } from "./../util/colours";
import { postFormDataAsJson, validateSharedSignup, validateUserSignup, phoneTaken, emailTaken } from "./../util/helpers";
import { API_URL } from "./../util/urls";


function CreateUser () {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [businessId, setBusinessId] = useState("");
	const [user, setUser] = useState(null);

	function handleFirstName (event) {
		setFirstName(event.target.value);
	}

	function handleLastName (event) {
		setLastName(event.target.value);
	}

	function handlePhone (event) {
		setPhone(event.target.value);
	}

	function handleEmail (event) {
		setEmail(event.target.value);
	}

	function handlePassword (event) {
		setPassword(event.target.value);
	}

	function handleBusinessId (event) {
		setBusinessId(event.target.value);
	}

	async function createUser (event) {
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

			firebase.auth().signInWithEmailAndPassword(email, password)
				.then((userCredential) => {
					setUser(userCredential.user);
				});
		} catch (err) {
			console.log(err);
			if (err.message.indexOf("phone number already exists") !== -1) {
				phoneTaken(form);
			}
			if (err.message.indexOf("email address is already in use") !== -1) {
				emailTaken(form);
			}
		}
	}

	return (
		<div>
			<form onSubmit={createUser} style={styles.form}>
				<header style={styles.header}>Create Account</header>
				<input value={firstName} onChange={handleFirstName} style={styles.inputField} type="text" placeholder="First name" name="displayName"/>
				<input value={lastName} onChange={handleLastName} style={styles.inputField} type="text" placeholder="Last name" name="lastName"/>
				<input value={phone} onChange={handlePhone} style={styles.inputField} type="number" placeholder="Phone number"name="phoneNumber"/>
				<input value={email} onChange={handleEmail} style={styles.inputField} type="text" placeholder="Email address" name="email"/>
				<input value={password} onChange={handlePassword} style={styles.inputField} type="text" placeholder="Password" name="password"/>
				<input value={businessId} onChange={handleBusinessId} style={styles.inputField} type="number" placeholder="Business ID" name="businessId"/>
				<Button type="submit">Submit</Button>
			</form>
			{user && <Redirect to="loginsuccess" />}
		</div>
	);
}

const styles = {
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
