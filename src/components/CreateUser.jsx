import { useState } from "react";
import { Redirect } from "react-router-dom";
import firebase from "firebase/app";
import styled from "styled-components";
import { primaryLight, secondaryMain, secondaryLight, textMain, buttonShadow } from "./../util/colours";
import { postFormDataAsJson } from "./../util/helpers";
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

	function validateForm () {
		console.log("temp validation placeholder");
	}

	async function createUser (event) {
		validateForm();

		event.preventDefault();
		const form = event.currentTarget;
		const url = `${API_URL}/user`;

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
		}
	}

	return (
		<div>
			<form onSubmit={createUser} style={styles.form}>
				<header style={styles.header}>Create Account</header>
				<input id="first-name" value={firstName} onChange={handleFirstName} style={styles.inputField} type="text" placeholder="First name" name="displayName"/>
				<input id="last-name" value={lastName} onChange={handleLastName} style={styles.inputField} type="text" placeholder="Last name" name="lastName"/>
				<input id="phone" value={phone} onChange={handlePhone} style={styles.inputField} type="number" placeholder="Phone number"name="phoneNumber"/>
				<input id="email" value={email} onChange={handleEmail} style={styles.inputField} type="text" placeholder="Email address" name="email"/>
				<input id="password" value={password} onChange={handlePassword} style={styles.inputField} type="text" placeholder="Password" name="password"/>
				<input id="postcode" value={businessId} onChange={handleBusinessId} style={styles.inputField} type="number" placeholder="Business ID" name="businessId"/>
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