import firebase from "firebase/app";

import { API_URL } from "./../../util/constants";


function SetRoleButton () {

	function setRole () {
		firebase.auth().currentUser.getIdToken(true).then(function (token) {
			const requestOptions = {
				method: "POST",
				headers: { authorization: `Bearer ${token}` }
			};
			fetch(`${API_URL}/loggedin/setrole`, requestOptions)
				.then(res => res.json())
				.then(data => console.log(data));
		}).catch(function (error) {
			console.log(`Uh oh. An error occured: ${error}`);
		});
	}

	return (
		<button onClick={setRole}>
			Set Role
		</button>
	);
}

export default SetRoleButton;
