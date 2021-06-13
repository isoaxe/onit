import firebase from "firebase/app";

import { useAuth } from "./../../util/useAuth";
import { API_URL } from "./../../util/urls";


function GetUsersButton () {
	const auth = useAuth();

	function getUsers () {
		console.log(auth);
		firebase.auth().currentUser.getIdToken(true).then(function (token) {
			const requestOptions = {
				method: "GET",
				headers: { authorization: `Bearer ${token}` }
			};
			fetch(`${API_URL}/users`, requestOptions)
				.then(res => res.json())
				.then(data => console.log(data));
		}).catch(function (error) {
			console.log(`Uh oh. An error occured: ${error}`);
		});
	}

	return (
		<button onClick={getUsers}>
			Get Users
		</button>
	);
}

export default GetUsersButton;
