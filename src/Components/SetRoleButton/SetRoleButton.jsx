import firebase from "firebase/app";


function SetRoleButton () {

	function setRole () {
		firebase.auth().currentUser.getIdToken(true).then(function (token) {
			const requestOptions = {
				method: "POST",
				headers: { authorization: `Bearer ${token}` }
			};
			// This works in the local environment only.
			// Need to detect if port is currently in use. If it is, fetch remote address:
			// https://us-central1-onit-aaa6e.cloudfunctions.net/api/loggedin/setrole
			fetch("http://localhost:5001/onit-aaa6e/us-central1/api/loggedin/setrole", requestOptions)
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
