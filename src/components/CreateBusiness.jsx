import { useState } from "react";
import { Redirect } from "react-router-dom";
import firebase from "firebase/app";
import styled from "styled-components";
import { postFormDataAsJson } from "./../util/helpers";
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

	function handlePhone (event) {
		setPhone(event.target.value);
	}

	function handleEmail (event) {
		setEmail(event.target.value);
	}

	function handlePassword (event) {
		setPassword(event.target.value);
	}

	function validateForm () {
		console.log("temp validation placeholder");
	}

	async function createBusiness (event) {
		validateForm();

		event.preventDefault();
		const form = event.currentTarget;
		const url = `${API_URL}/business`;

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
			<form onSubmit={createBusiness} style={styles.form}>
				<header style={styles.header}>Create Account</header>
				<input id="business-name" value={businessName} onChange={handleBusiness} style={combinedSelectors} type="text" placeholder="Business name" name="displayName"/>
				<input id="address1" value={address1} onChange={handleAddress1} style={styles.inputField} type="text" placeholder="Address line 1" name="address1"/>
				<input id="address2" value={address2} onChange={handleAddress2} style={styles.inputField} type="text" placeholder="Address line 2" name="address2"/>
				<input id="city" value={city} onChange={handleCity} style={styles.inputField} type="text" placeholder="City" name="city"/>
				<input id="postcode" value={postcode} onChange={handlePostcode} style={combinedSelectors} type="text" placeholder="Postcode" name="postcode"/>
				<input id="phone" value={phone} onChange={handlePhone} style={styles.inputField} type="number" placeholder="Phone number" name="phoneNumber"/>
				<input id="email" value={email} onChange={handleEmail} style={styles.inputField} type="text" placeholder="Email address" name="email"/>
				<input id="password" value={password} onChange={handlePassword} style={styles.inputField} type="text" placeholder="Password" name="password"/>
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
		backgroundColor: "#3F4552",
		border: "2px solid #3f524c",
		borderRadius: "10px",
		paddingBottom: "25px",
		marginBottom: "30px",
		fontSize: "20px",
		color: "white"
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
	background-color: #3F524C;
	box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
	border: 0px;
	border-radius: 3px;
	color: white;
	font-size: 14px;
	padding: 4px 13px 4px;
	margin-top: 10px;
	&:hover {
		background-color: #4A615A;
	  cursor: pointer;
	}
`;


export default CreateBusiness;
