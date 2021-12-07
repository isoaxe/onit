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
			// If user data has not been fetched, do not save to state.
			if (data.error) {
				console.error(data.error);
				return false;
			}
			setUsers(data);
			setRefresh(false);
			return data;
		} catch (error) {
			console.error(`GET request to /user failed: ${error}`);
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
			{users && <UserTable users={users} businessId={businessId} role={props.role} refresh={forceRefresh} />}
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
