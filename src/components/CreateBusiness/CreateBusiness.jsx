import { useState } from "react";

import "./CreateBusiness.css";


function CreateBusiness () {
	const [businessName, setBusinessName] = useState("");
	const [address1, setAddress1] = useState("");
	const [address2, setAddress2] = useState("");
	const [city, setCity] = useState("");
	const [postcode, setPostcode] = useState("");
	const [phone, setPhone] = useState(0);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function validateForm () {
		console.log("temp validation placeholder");
	}

	return (
		<form action="/createbusiness" method="POST" onSubmit={validateForm} className="form" name="business-form">
			<input id="business-name" value={businessName} onChange={setBusinessName} className="input-field" type="text" placeholder="Business name" />
			<input id="address1" value={address1} onChange={setAddress1} className="input-field" type="text" placeholder="Address line 1"/>
			<input id="address2" value={address2} onChange={setAddress2} className="input-field" type="text" placeholder="Address line 2"/>
			<input id="city" value={city} onChange={setCity} className="input-field" type="text" placeholder="City"/>
			<input id="postcode" value={postcode} onChange={setPostcode} className="input-field" type="text" placeholder="Postcode"/>
			<input id="phone" value={phone} onChange={setPhone} className="input-field" type="number" placeholder="Phone number"/>
			<input id="email" value={email} onChange={setEmail} className="input-field" type="text" placeholder="Email address"/>
			<input id="password" value={password} onChange={setPassword} className="input-field" type="text" placeholder="Password"/>
			<button type="submit" className="submit">Submit</button>
		</form>
	);
}

export default CreateBusiness;
