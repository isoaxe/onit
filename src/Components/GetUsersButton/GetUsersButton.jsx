import firebase from "firebase/app";

import { useAuth } from "./../../util/useAuth";


function GetUsersButton () {
	const auth = useAuth();

	function getUsers () {
		console.log(auth);
		firebase.auth().currentUser.getIdToken(true).then(function (token) {
			const requestOptions = {
				method: "GET",
				headers: { authorization: `Bearer ${token}` }
			};
			// This works in the local environment only.
			// Need to detect if port is currently in use. If it is, fetch remote address:
			// https://us-central1-onit-aaa6e.cloudfunctions.net/api/loggedin
			fetch("http://localhost:5001/onit-aaa6e/us-central1/api/users", requestOptions)
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
