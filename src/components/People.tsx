import firebase from "firebase/app";
import { API_URL } from "./../util/urls";
import { textMain } from "./../util/colours";
import { StyleSheet } from "./../util/types";


function People (props): JSX.Element {

	async function getUsers () {
		try {
			const token = await firebase.auth().currentUser.getIdToken(true);
			const requestOptions = {
				method: "GET",
				headers: { authorization: `Bearer ${token}` }
			};
			const res = await fetch(`${API_URL}/user/${props.businessId}`, requestOptions);
			const data = await res.json();
			console.log(data);
		} catch (error) {
			console.log(`GET request to /user failed: ${error}`);
		}
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
