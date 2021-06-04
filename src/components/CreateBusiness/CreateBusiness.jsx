import { useState } from "react";
import { useAuth } from "./../../util/useAuth";
import { API_URL } from "./../../util/constants";

import "./CreateBusiness.css";


function CreateBusiness () {
	const [businessName, setBusinessName] = useState("");
	const [address1, setAddress1] = useState("");
	const [address2, setAddress2] = useState("");
	const [city, setCity] = useState("");
	const [postcode, setPostcode] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const auth = useAuth();

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

	function createBusiness () {
		validateForm();
		auth.signUpBusiness(email, password);
	}

	return (
		<form action={`${API_URL}/createbusiness`} method="POST" onSubmit={createBusiness} className="form" name="business-form">
			<header className="header">Create Account</header>
			<input id="business-name" value={businessName} onChange={handleBusiness} className="input-field" type="text" placeholder="Business name"/>
			<input id="address1" value={address1} onChange={handleAddress1} className="input-field" type="text" placeholder="Address line 1"/>
			<input id="address2" value={address2} onChange={handleAddress2} className="input-field" type="text" placeholder="Address line 2"/>
			<input id="city" value={city} onChange={handleCity} className="input-field" type="text" placeholder="City"/>
			<input id="postcode" value={postcode} onChange={handlePostcode} className="input-field" type="text" placeholder="Postcode"/>
			<input id="phone" value={phone} onChange={handlePhone} className="input-field" type="number" placeholder="Phone number"/>
			<input id="email" value={email} onChange={handleEmail} className="input-field" type="text" placeholder="Email address"/>
			<input id="password" value={password} onChange={handlePassword} className="input-field" type="text" placeholder="Password"/>
			<button type="submit" className="submit">Submit</button>
		</form>
	);
}

export default CreateBusiness;
