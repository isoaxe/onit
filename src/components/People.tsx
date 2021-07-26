import firebase from "firebase/app";
import { API_URL } from "./../util/urls";
import { textMain } from "./../util/colours";
import { StyleSheet } from "./../util/types";


function People (props): JSX.Element {

	function getUsers () {
		firebase.auth().currentUser.getIdToken(true).then(function (token) {
			const requestOptions = {
				method: "GET",
				headers: { authorization: `Bearer ${token}` }
			};
			fetch(`${API_URL}/user/${props.businessId}`, requestOptions)
				.then(res => res.json())
				.then(data => console.log(data));
		}).catch(function (error) {
			console.log(`GET request to /user failed: ${error}`);
		});
	}

	getUsers();

	return (
		<div style={styles.root}>
		</div>
	);
}

const styles: StyleSheet = {
	root: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		textAlign: "center",
		padding: "10px",
		color: textMain
	}
};


export default People;
