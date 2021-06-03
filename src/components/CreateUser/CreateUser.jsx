import { useState } from "react";
import { useAuth } from "./../../util/useAuth";

import "./CreateUser.css";


function CreateBusiness () {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [phone, setPhone] = useState(0);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [businessId, setBusinessId] = useState(0);

	const auth = useAuth();

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

	function createUser () {
		validateForm();
		auth.signUpUser(email, password);
	}

	return (
		<form action="/createuser" method="POST" onSubmit={createUser} className="form" name="user-form">
			<header className="header">Create Account</header>
			<input id="first-name" value={firstName} onChange={handleFirstName} className="input-field" type="text" placeholder="First name" />
			<input id="last-name" value={lastName} onChange={handleLastName} className="input-field" type="text" placeholder="Address line 1"/>
			<input id="phone" value={phone} onChange={handlePhone} className="input-field" type="number" placeholder="Phone number"/>
			<input id="email" value={email} onChange={handleEmail} className="input-field" type="text" placeholder="Email address"/>
			<input id="password" value={password} onChange={handlePassword} className="input-field" type="text" placeholder="Password"/>
			<input id="postcode" value={businessId} onChange={handleBusinessId} className="input-field" type="number" placeholder="Business ID"/>
			<button type="submit" className="submit">Submit</button>
		</form>
	);
}

export default CreateBusiness;
