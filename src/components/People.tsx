import { useState, useEffect } from "react";
import firebase from "firebase/app";
import UserTable from "./UserTable";
import { API_URL } from "./../util/urls";
import { textMain } from "./../util/colours";
import { StyleSheet } from "./../util/types";


function People (props): JSX.Element {
	const [users, setUsers] = useState(null);
	const [refresh, setRefresh] = useState(false);
	const businessId = props.businessId;

	async function getUsers () {
		try {
			const token = await firebase.auth().currentUser.getIdToken(true);
			const requestOptions = {
				method: "GET",
				headers: { authorization: `Bearer ${token}` }
			};
			const res = await fetch(`${API_URL}/user/${businessId}`, requestOptions);
			const data = await res.json();
			setUsers(data);
			return data;
		} catch (error) {
			console.log(`GET request to /user failed: ${error}`);
		}
	}

	function forceRefresh () {
		setRefresh(true);
	}

	useEffect(() => {
		if (!users || refresh) {
			getUsers();
		}
	});

	return (
		<div style={styles.root}>
			{users && <UserTable users={users} businessId={businessId} refresh={forceRefresh} />}
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
