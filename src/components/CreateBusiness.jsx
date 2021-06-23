import { useState } from "react";
import { Redirect } from "react-router-dom";
import firebase from "firebase/app";
import styled from "styled-components";
import { primaryLight, secondaryMain, secondaryLight, textMain, buttonShadow } from "./../util/colours";
import { postFormDataAsJson, validateSharedSignup, validateBusinessSignup, phoneTaken, emailTaken } from "./../util/helpers";
import PhoneNumber from "./PhoneNumber";
import { API_URL } from "./../util/urls";


function CreateBusiness () {
	const [businessName, setBusinessName] = useState("");
	const [address1, setAddress1] = useState("");
	const [address2, setAddress2] = useState("");
	const [city, setCity] = useState("");
	const [postcode, setPostcode] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);


	function handleBusiness (event) {
		setBusinessName(event.target.value);
	}

	function handleAddress1 (event) {
		setAddress1(event.target.value);
	}

	function handleAddress2 (event) {
		setAddress2(event.target.value);
	}

	function handleCity (event) {
		setCity(event.target.value);
	}

	function handlePostcode (event) {
		setPostcode(event.target.value);
	}

	function handleEmail (event) {
		setEmail(event.target.value);
	}

	function handlePassword (event) {
		setPassword(event.target.value);
	}

	async function createBusiness (event) {
		event.preventDefault();
		const url = `${API_URL}/business`;
		const form = event.currentTarget;

		const sharedSignupValidated = validateSharedSignup(phone, email, password, form);
		const businessSignupValidated = validateBusinessSignup(businessName, address1, address2, city, postcode, form);
		if (!sharedSignupValidated || !businessSignupValidated) {
			return false;
		}

		try {
			const formData = new FormData(form);
			const response = await postFormDataAsJson({ url, formData });
			console.log(response);

			firebase.auth().signInWithEmailAndPassword(email, password)
				.then((userCredential) => {
					setUser(userCredential.user);
				});
		} catch (err) {
			console.log(err);
			if (err.message.indexOf("phone number already exists") !== -1) {
				phoneTaken(form, 3);
			}
			if (err.message.indexOf("email address is already in use") !== -1) {
				emailTaken(form, 3);
			}
		}
	}

	return (
		<div>
			<form onSubmit={createBusiness} style={styles.form}>
				<header style={styles.header}>Create Account</header>
				<input value={businessName} onChange={handleBusiness} style={combinedSelectors} type="text" placeholder="Business name" name="displayName"/>
				<input value={address1} onChange={handleAddress1} style={styles.inputField} type="text" placeholder="Address line 1" name="address1"/>
				<input value={address2} onChange={handleAddress2} style={styles.inputField} type="text" placeholder="Address line 2" name="address2"/>
				<input value={city} onChange={handleCity} style={styles.inputField} type="text" placeholder="City" name="city"/>
				<input value={postcode} onChange={handlePostcode} style={combinedSelectors} type="text" placeholder="Postcode" name="postcode"/>
				<PhoneNumber value={phone} onChange={setPhone} name="phoneNumber"/>
				<input value={email} onChange={handleEmail} style={styles.inputField} type="text" placeholder="Email address" name="email"/>
				<input value={password} onChange={handlePassword} style={styles.inputField} type="text" placeholder="Password" name="password"/>
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
	},
	space: {
		marginBottom: "10px"
	}
};

const deepCopy = JSON.parse(JSON.stringify(styles.inputField));
const combinedSelectors = Object.assign(deepCopy, styles.space);

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


export default CreateBusiness;
