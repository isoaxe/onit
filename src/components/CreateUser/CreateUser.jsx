import { useState } from "react";
import { Redirect } from "react-router-dom";
import firebase from "firebase/app";
import { postFormDataAsJson } from "./../../util/helpers";
import { API_URL } from "./../../util/urls";


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
			<form onSubmit={createUser} className="form">
				<header className="header">Create Account</header>
				<input id="first-name" value={firstName} onChange={handleFirstName} className="input-field" type="text" placeholder="First name" name="displayName"/>
				<input id="last-name" value={lastName} onChange={handleLastName} className="input-field" type="text" placeholder="Last name" name="lastName"/>
				<input id="phone" value={phone} onChange={handlePhone} className="input-field" type="number" placeholder="Phone number"name="phoneNumber"/>
				<input id="email" value={email} onChange={handleEmail} className="input-field" type="text" placeholder="Email address" name="email"/>
				<input id="password" value={password} onChange={handlePassword} className="input-field" type="text" placeholder="Password" name="password"/>
				<input id="postcode" value={businessId} onChange={handleBusinessId} className="input-field" type="number" placeholder="Business ID" name="businessId"/>
				<button type="submit" className="submit">Submit</button>
			</form>
			{user && <Redirect to="loginsuccess" />}
		</div>
	);
}

export default CreateUser;
