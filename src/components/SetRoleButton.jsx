import firebase from "firebase/app";

import { API_URL } from "./../util/urls";


function SetRoleButton () {

	function setRole () {
		firebase.auth().currentUser.getIdToken(true).then(function (token) {
			const requestOptions = {
				method: "POST",
				headers: { authorization: `Bearer ${token}` }
			};
			fetch(`${API_URL}/loginsuccess/setrole`, requestOptions)
				.then(res => res.json())
				.then(data => console.log(data));
		}).catch(function (error) {
			console.log(`Uh oh. An error occured: ${error}`);
		});
	}

	return (
		<button onClick={setRole} style={styles.button}>
			Set Role
		</button>
	);
}

const styles = {
	button: {
		marginTop: "15px"
	}
};


export default SetRoleButton;
